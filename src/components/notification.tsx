"use client"
import { Bell, CheckCheck } from "lucide-react"
import { Button } from "./ui/button"
import { Popover, PopoverContent } from "./ui/popover"
import { PopoverTrigger } from "@radix-ui/react-popover"
import { Label } from "./ui/label"
import { useState } from "react"
import { Separator } from "./ui/separator"
import { NotificationData } from "@/types/general"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const Notification = () => {
    const DISPLAY_TYPES = ["ALL", "UNREAD", "READ"]
    const [displayType, setDisplayType] = useState<string>("ALL")
    const [notifications, setNotifications] = useState<NotificationData[]>([
        {
            userName: "John Doe",
            description: "Sent you a connection request",
            dayWithTime: "Monday, 10:30 AM",
            date: "July 10, 2023",
            isRead: false
        },
        {
            userName: "Sarah Smith",
            description: "Liked your recent post",
            dayWithTime: "Tuesday, 2:15 PM",
            date: "July 11, 2023",
            isRead: true
        },
        {
            userName: "TechCorp Inc.",
            description: "Posted a new job opportunity",
            dayWithTime: "Wednesday, 9:45 AM",
            date: "July 12, 2023",
            isRead: false
        },
        {
            userName: "Alex Johnson",
            description: "Commented on your article",
            dayWithTime: "Thursday, 5:20 PM",
            date: "July 13, 2023",
            isRead: true
        },
        {
            userName: "Maria Garcia",
            description: "Shared your profile with her network",
            dayWithTime: "Friday, 11:10 AM",
            date: "July 14, 2023",
            isRead: false
        },
        {
            userName: "David Wilson",
            description: "Reacted to your comment",
            dayWithTime: "Saturday, 3:45 PM",
            date: "July 15, 2023",
            isRead: true
        },
        {
            userName: "Linda Brown",
            description: "Mentioned you in a post",
            dayWithTime: "Sunday, 7:30 AM",
            date: "July 16, 2023",
            isRead: false
        },
        {
            userName: "Michael Taylor",
            description: "Started following you",
            dayWithTime: "Monday, 4:55 PM",
            date: "July 17, 2023",
            isRead: true
        },
        {
            userName: "Emily Davis",
            description: "Sent you a private message",
            dayWithTime: "Tuesday, 1:25 PM",
            date: "July 18, 2023",
            isRead: false
        },
        {
            userName: "Robert Martinez",
            description: "Endorsed your skills",
            dayWithTime: "Wednesday, 6:40 PM",
            date: "July 19, 2023",
            isRead: true
        }
    ])

    const filteredNotifications = (): NotificationData[] => {
        if (displayType === "READ") return notifications.filter(item => item.isRead)
        else if (displayType === "UNREAD") return notifications.filter(item => !item.isRead)
        return notifications
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"} size={"icon"} className="text-muted-foreground">
                    <Bell/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 h-96 overflow-hidden">
                <div className="space-y-1 flex flex-col h-full">
                    <h2 className="text-lg font-semibold">Notifications</h2>
                    <div className="flex-1 flex flex-col justify-between gap-2 overflow-hidden">
                        <div className="flex items-center">
                            {DISPLAY_TYPES.map(type => (
                                <Label onClick={() =>setDisplayType(type)} key={type} className={`cursor-pointer text-sm w-16 py-0.5 px-2 transition-all duration-200 ${displayType === type ? "border-b-2 border-primary text-primary" : "hover:text-primary text-muted-foreground font-normal"}`}>{ type.slice(0,1).toUpperCase() + type.slice(1).toLowerCase() }</Label>
                            ))}
                        </div>
                        <div className="flex-1 overflow-auto">
                            {filteredNotifications().map((item, i) => (
                                <NotificationCard key={i} item={item}/>
                            ))}
                        </div>
                        <div className="space-y-2">
                            <Separator/>
                            <div className="flex justify-between gap-4">
                                <Button variant={"ghost"} size={"sm"} className="text-xs text-primary">
                                    <CheckCheck />
                                    Mark all as read
                                </Button>
                                <Button variant={"default"} size={"sm"} className="text-xs">
                                    View all notification
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

const NotificationCard = ({ item }: { item: NotificationData}) => {
    return (
        <div className="p-2 rounded-md flex gap-2 hover:bg-gray-100 cursor-pointer">
            <Avatar className="rounded-md">
                <AvatarImage src="https://media.licdn.com/dms/image/v2/D5603AQEw05-cUCsC_Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1721522133019?e=2147483647&v=beta&t=qoMqARcOgZR_r6PuWK4uBCjsUyhmzr7wKrjNxKu05Sc"/>
                <AvatarFallback>RP</AvatarFallback>
            </Avatar>
            <div className="w-full space-y-2">
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <div>
                            <h3 className="font-medium text-sm">{ item.userName }</h3>
                            <p className="text-xs">{ item.description }</p>
                        </div>
                    </div>
                    {item.isRead && <div className="rounded-full h-2 w-2 bg-primary"></div>}
                </div>
                <div className="flex justify-between text-xs">
                    <p>{ item.dayWithTime }</p>
                    <p>{ item.date }</p>
                </div>
            </div>
        </div>
    )
}

export default Notification