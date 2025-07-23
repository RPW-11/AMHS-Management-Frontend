"use client"
import { Search } from "lucide-react"
import Notification from "./notification"
import UserAvatar from "../user-avatar"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import UserSetting from "./user-setting"
import { useUserStore } from "@/stores/useAuthStore"

const Header = () => {
    const isLargeScreen = useMediaQuery('lg')
    const { user } = useUserStore()
    
    return (
        <div className="pl-6 pr-10 py-4 h-18  flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-2 w-2/5 xl:w-3/5 bg-white rounded-md border text-sm">
                <Search size={16} className="text-muted-foreground" />
                <input placeholder="Search for anything" className="focus:outline-none w-full"/>
            </div>
            {user && <div className="flex items-center gap-2 lg:gap-4">
                <Notification />
                <UserSetting />
                <UserAvatar
                size={isLargeScreen ? "lg" : "sm"}
                hideNames={!isLargeScreen}
                userData={user}
                />
            </div>}
        </div>
    )
}

export default Header