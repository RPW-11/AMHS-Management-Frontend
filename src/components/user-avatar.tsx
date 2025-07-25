import { User } from "@/types/general"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { formatEmployeePosition } from "@/utils/employee/employee-util"

interface UserAvatarProps {
    userData: User
    size: keyof typeof userAvatarVariants.size
    customSize?: string
    hideNames?: boolean
}

const userAvatarVariants = {
    size: {
        sm: "h-8.5 w-8.5",
        lg: "h-9.5 w-9.5",
        xl: "h-13 w-13",
        custom: ""
    }
}

const UserAvatar = ({
    userData,
    size = "lg",
    customSize,
    hideNames = false
}: UserAvatarProps) => {
    const sizeClass = size === "custom" ? customSize : userAvatarVariants.size[size]
    return (
        <div className={`flex items-center gap-2`}>
            <Avatar className={`${sizeClass} rounded-md`}>
                <AvatarImage src={userData.imgUrl} className="object-cover"/>
                <AvatarFallback className="rounded-md">{userData.firstName.slice(0, 1).toUpperCase() + userData.lastName.slice(0, 1).toUpperCase()}</AvatarFallback>
            </Avatar>
        {!hideNames && 
        <div>
            <h3 className="font-medium text-sm">
                { `${userData.firstName.slice(0, 1).toUpperCase()}${userData.firstName.slice(1).toLowerCase()} ${userData.lastName.slice(0, 1).toUpperCase()}${userData.lastName.slice(1).toLowerCase()}`}
            </h3>
            <p className="text-muted-foreground text-xs">
                { formatEmployeePosition(userData.position) }
            </p>
        </div>}
    </div>
    )
}

export default UserAvatar