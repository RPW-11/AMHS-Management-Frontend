import { Bell, Search, Settings } from "lucide-react"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import Notification from "./notification"

const Header = () => {
    return (
        <div className="pl-6 pr-10 py-4 h-18  flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-2 w-2/5 xl:w-3/5 bg-white rounded-md border text-sm">
                <Search size={16} className="text-muted-foreground" />
                <input placeholder="Search for anything" className="focus:outline-none w-full"/>
            </div>
            <div className="flex items-center gap-4">
                <Notification />
                <Button variant={"outline"} size={"icon"} className="text-muted-foreground">
                    <Settings/>
                </Button>
                <div className="flex items-center gap-2">
                    <Avatar className="h-9.5 w-9.5 rounded-md">
                        <AvatarImage src="https://media.licdn.com/dms/image/v2/D5603AQEw05-cUCsC_Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1721522133019?e=2147483647&v=beta&t=qoMqARcOgZR_r6PuWK4uBCjsUyhmzr7wKrjNxKu05Sc"/>
                        <AvatarFallback>RP</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-medium text-sm">Rainata Putra</h3>
                        <p className="text-muted-foreground text-xs">
                            Staff
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header