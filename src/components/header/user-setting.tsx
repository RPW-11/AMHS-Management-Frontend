import { Settings, UserRoundCog } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";


const UserSetting = () => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"} size={"icon"} className="text-muted-foreground">
                    <Settings/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-36 p-1">
                <Button variant={"ghost"} size={"sm"} className="w-full font-normal justify-start">
                    <UserRoundCog />
                    Profile Settings
                </Button>
            </PopoverContent>
        </Popover>
    )
}

export default UserSetting;