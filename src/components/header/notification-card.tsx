import { NotificationData } from "@/types/general";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface NotificationCardProps {
    data: NotificationData
    onRead: (id: string) => void
}

const NotificationCard = ({ data, onRead }: NotificationCardProps) => {
    return (
        <div className={`p-2 rounded-md flex gap-2 ${data.isRead && "bg-gray-100"} hover:bg-gray-100 cursor-pointer`} onClick={() => onRead(data.id)}>
            <Avatar className="rounded-md">
                <AvatarImage src="https://media.licdn.com/dms/image/v2/D5603AQEw05-cUCsC_Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1721522133019?e=2147483647&v=beta&t=qoMqARcOgZR_r6PuWK4uBCjsUyhmzr7wKrjNxKu05Sc"/>
                <AvatarFallback>RP</AvatarFallback>
            </Avatar>
            <div className="w-full space-y-2">
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <div>
                            <h3 className="font-medium text-sm">{ data.userName }</h3>
                            <p className="text-xs">{ data.description }</p>
                        </div>
                    </div>
                    {!data.isRead && <div className="rounded-full h-2 w-2 bg-primary"></div>}
                </div>
                <div className="flex justify-between text-xs">
                    <p>{ data.dayWithTime }</p>
                    <p>{ data.date }</p>
                </div>
            </div>
        </div>
    )
}

export default NotificationCard;