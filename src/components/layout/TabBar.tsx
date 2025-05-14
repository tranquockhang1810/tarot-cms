import { ConfigProvider, Menu } from "antd"
import { FaHouseUser, FaUserTie } from "react-icons/fa6"
import ProfileView from "../screens/profile/view/ProfileView"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FaUsersCog } from "react-icons/fa"
import { MdHistory } from "react-icons/md"
import { BsFillFileEarmarkPostFill } from "react-icons/bs"
import Image from "next/image"
import logo from "@/app/icon.png"

const TabBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [current, setCurrent] = useState("");
  const [profileModal, setProfileModal] = useState(false);

  useEffect(() => {
    setCurrent(pathname);
  }, [pathname]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            iconSize: 24,
            fontSize: 24,
            itemHeight: 60,
            itemMarginBlock: 20
          }
        }
      }}
    >
      {/* Logo */}
      <div className="flex justify-center">
        <div className="flex flex-col items-center">
          <Image
            src={logo}
            alt="Logo"
            width={120}
            height={120}
          />
          <h1 className="text-xl font-bold text-white">{"Tarot CMS"}</h1>
        </div>
      </div>
      <Menu
        mode="inline"
        items={[
          { key: '/home', label: <span className="ml-4">{"Trang chủ"}</span>, icon: <FaHouseUser /> },
          { key: '/transactions', label: <span className="ml-4">{"Lịch sử giao dịch"}</span>, icon: <MdHistory /> },
          { key: '/posts', label: <span className="ml-4">{"Bài viết"}</span>, icon: <BsFillFileEarmarkPostFill /> },
          { key: '/users', label: <span className="ml-4">{"Người dùng"}</span>, icon: <FaUsersCog /> },
          { key: '/profile', label: <span className="ml-4">{"Tài khoản"}</span>, icon: <FaUserTie /> },
        ]}
        theme='dark'
        selectedKeys={[current]}
        onClick={(e: any) => {
          if (e.key !== '/profile') {
            router.push(e?.key)
          } else {
            setProfileModal(true)
          }
        }}
      />
      {profileModal && <ProfileView open={profileModal} onClose={() => setProfileModal(false)}/>}
    </ConfigProvider>
  )
}

export default TabBar