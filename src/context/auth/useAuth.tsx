"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AuthContextType } from './authContextType';
import { UserModel } from '../../api/features/profile/models/UserModel';
import { LoginResponseModel } from '@/api/features/login/models/LoginModel';
import { defaultProfileRepo } from '@/api/features/profile/ProfileRepo';
import { useRouter } from 'next/navigation';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<UserModel | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [checkAuthLoading, setCheckAuthLoading] = useState(true);

  const onLogin = async (user: LoginResponseModel) => {
    localStorage.setItem('accesstoken', user?.accessToken || '');
    setIsAuthenticated(true);
    setUser(user?.user || null);
    router.replace('/home');
  }

  const onUpdateProfile = async (user: UserModel) => {
    setUser(user);
  }

  const onLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accesstoken');
    setIsAuthenticated(false);
    setUser(null);
    router.replace('/login');
  }

  const isLoginUser = (userId: string) => {
    return user?.id === userId;
  }

  const getUser = async () => {
    try {
      const res = await defaultProfileRepo.getProfile();
      if (res?.code === 200 && res?.data) {
        setUser(res?.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const storedAccessToken = localStorage.getItem('accesstoken');
        if (storedAccessToken) {
          setIsAuthenticated(true);
          getUser();
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setCheckAuthLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{
      onLogin,
      onLogout,
      isAuthenticated,
      user,
      onUpdateProfile,
      isLoginUser,
      checkAuthLoading,
      getUser,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
