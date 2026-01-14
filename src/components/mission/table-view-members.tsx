import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const TableViewMembers = () => {
    return (
        <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
                <AvatarImage
                    src="https://github.com/maxleiter.png"
                    alt="@maxleiter"
                />
                <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar>
                <AvatarImage
                    src="https://github.com/evilrabbit.png"
                    alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
            </Avatar>
        </div>
    )
}

export default TableViewMembers