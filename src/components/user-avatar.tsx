import { User } from "@/types/general"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface UserAvatarProps {
    userData: User
    size: keyof typeof userAvatarVariants.size
    hideNames?: boolean
}

const userAvatarVariants = {
    size: {
        sm: "h-8.5 w-8.5 rounded-md",
        lg: "h-9.5 w-9.5 rounded-md",
        xl: "h-13 w-13 rounded-md"
    }
}

const UserAvatar = ({
    userData,
    size = "lg",
    hideNames = false
}: UserAvatarProps) => {
    const sizeClass = userAvatarVariants.size[size]
    return (
        <div className={`flex items-center gap-2`}>
            <Avatar className={sizeClass}>
                <AvatarImage src={userData.imgUrl}/>
                <AvatarFallback className="rounded-md">{userData.firstName.slice(0, 1).toUpperCase() + userData.lastName.slice(0, 1).toUpperCase()}</AvatarFallback>
            </Avatar>
        {!hideNames && 
        <div>
            <h3 className="font-medium text-sm">
                { `${userData.firstName.slice(0, 1).toUpperCase()}${userData.firstName.slice(1).toLowerCase()} ${userData.lastName.slice(0, 1).toUpperCase()}${userData.lastName.slice(1).toLowerCase()}`}
            </h3>
            <p className="text-muted-foreground text-xs">
                { userData.position }
            </p>
        </div>}
    </div>
    )
}

export default UserAvatar