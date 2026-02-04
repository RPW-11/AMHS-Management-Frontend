import { NotificationData } from "@/types/general";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { parsedTimeStampToDateTime } from "@/utils/general-util";

interface NotificationCardProps {
    data: NotificationData
    onRead: (id: string) => void
}

const NotificationCard = ({ data, onRead }: NotificationCardProps) => {
    return (
        <div className={`p-2 rounded-md flex gap-3 ${data.isRead && "bg-gray-100"} hover:bg-gray-100 cursor-pointer`} onClick={() => onRead(data.id)}>
            <Avatar className="rounded-md mt-1">
                <AvatarImage src={data.actorAvatarUrl}/>
                <AvatarFallback className="rounded-md">{`${data.actorName.substring(0, 2).toUpperCase()}`}</AvatarFallback>
            </Avatar>
            <div className="w-full space-y-2">
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <div>
                            <h3 className="font-medium text-sm">{ data.actorName }</h3>
                            <p className="text-xs whitespace-wrap">{ data.message }</p>
                        </div>
                    </div>
                    {!data.isRead && <div className="rounded-full min-h-2 min-w-2 max-h-2 max-w-2 bg-primary"></div>}
                </div>
                <div className="flex justify-between text-xs">
                    <p>{ parsedTimeStampToDateTime(data.createdAt) }</p>
                </div>
            </div>
        </div>
    )
}

export default NotificationCard;