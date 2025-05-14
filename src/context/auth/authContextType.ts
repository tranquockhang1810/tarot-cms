import { UserModel } from "@/api/features/profile/models/UserModel";
import { LoginResponseModel } from "@/api/features/login/models/LoginModel";

export interface AuthContextType {
  onLogin: (user: LoginResponseModel) => void;
  onUpdateProfile: (user: UserModel) => void;
  onLogout: () => void;
  user: UserModel | null;
  isAuthenticated: boolean;
  isLoginUser: (userId: string) => boolean;
  checkAuthLoading: boolean;
  getUser: () => Promise<void>;
}