import { Ellipsis } from "lucide-react"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

interface ActionsButtonProp {
    children: React.ReactNode
}
const ActionsButton = ({
    children
}: ActionsButtonProp) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size={"icon"} variant={"ghost"} className="w-fit h-fit p-1">
                    <Ellipsis/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-36 p-1.5" align="end">
                { children }
            </PopoverContent>
        </Popover>
    )
}

export default ActionsButton;