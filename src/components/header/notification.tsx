"use client"
import { Bell, CheckCheck } from "lucide-react"
import { Button } from "../ui/button"
import { Popover, PopoverContent } from "../ui/popover"
import { PopoverTrigger } from "@radix-ui/react-popover"
import { Label } from "../ui/label"
import { useCallback, useEffect, useState } from "react"
import { Separator } from "../ui/separator"
import { NotificationData } from "@/types/general"
import NotificationCard from "./notification-card"

const Notification = () => {
    const DISPLAY_TYPES = ["ALL", "UNREAD", "READ"]
    const [displayType, setDisplayType] = useState<string>("ALL")
    const [notifications, setNotifications] = useState<NotificationData[]>([
        {
            id:"1",
            userName: "John Doe",
            description: "Sent you a connection request",
            dayWithTime: "Monday, 10:30 AM",
            date: "July 10, 2023",
            isRead: false
        },
        {
            id:"2",
            userName: "Sarah Smith",
            description: "Liked your recent post",
            dayWithTime: "Tuesday, 2:15 PM",
            date: "July 11, 2023",
            isRead: true
        },
        {
            id:"3",
            userName: "TechCorp Inc.",
            description: "Posted a new job opportunity",
            dayWithTime: "Wednesday, 9:45 AM",
            date: "July 12, 2023",
            isRead: false
        },
        {
            id:"4",
            userName: "Alex Johnson",
            description: "Commented on your article",
            dayWithTime: "Thursday, 5:20 PM",
            date: "July 13, 2023",
            isRead: true
        },
        {
            id:"5",
            userName: "Maria Garcia",
            description: "Shared your profile with her network",
            dayWithTime: "Friday, 11:10 AM",
            date: "July 14, 2023",
            isRead: false
        },
        {
            id:"6",
            userName: "David Wilson",
            description: "Reacted to your comment",
            dayWithTime: "Saturday, 3:45 PM",
            date: "July 15, 2023",
            isRead: true
        },
        {
            id:"7",
            userName: "Linda Brown",
            description: "Mentioned you in a post",
            dayWithTime: "Sunday, 7:30 AM",
            date: "July 16, 2023",
            isRead: false
        },
        {
            id:"8",
            userName: "Michael Taylor",
            description: "Started following you",
            dayWithTime: "Monday, 4:55 PM",
            date: "July 17, 2023",
            isRead: true
        },
        {
            id:"9",
            userName: "Emily Davis",
            description: "Sent you a private message",
            dayWithTime: "Tuesday, 1:25 PM",
            date: "July 18, 2023",
            isRead: false
        },
        {
            id:"10",
            userName: "Robert Martinez",
            description: "Endorsed your skills",
            dayWithTime: "Wednesday, 6:40 PM",
            date: "July 19, 2023",
            isRead: true
        }
    ])
    const [filteredNotifications, setFilteredNotifications] = useState<NotificationData[]>(notifications)

    const filterNotifications = useCallback(() => {
        let newNotifcations: NotificationData[] = []
        if (displayType === "READ") {
            newNotifcations = notifications.filter(item => item.isRead)
        }
        else if (displayType === "UNREAD") {
            newNotifcations = notifications.filter(item => !item.isRead)
        }
        setFilteredNotifications(displayType === "ALL" ? notifications : newNotifcations)
    }, [displayType, notifications])

    const readNotificaton = (id: string) => setNotifications(prev => prev.map(item => item.id === id ? ({...item, isRead: true}) : item)) 

    const hasUnreadNotification = (): boolean => notifications.some(item => !item.isRead)

    useEffect(() => {
        filterNotifications()
    }, [filterNotifications])


    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"} size={"icon"} className="text-muted-foreground relative">
                    <Bell/>
                    {hasUnreadNotification() && <div className="absolute top-[6px] right-[6px] rounded-full h-1.5 w-1.5 bg-primary"></div>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 h-96 overflow-hidden">
                <div className="space-y-1 flex flex-col h-full">
                    <h2 className="text-lg font-semibold">Notifications</h2>
                    <div className="flex-1 flex flex-col justify-between gap-2 overflow-hidden">
                        <div className="flex items-center">
                            {DISPLAY_TYPES.map(type => (
                                <Label onClick={() =>setDisplayType(type)} key={type} className={`cursor-pointer text-sm w-16 py-0.5 px-2 border-b-2 transition-all duration-200 ${displayType === type ? "border-primary text-primary" : "border-white hover:text-primary text-muted-foreground font-normal"}`}>{ type.slice(0,1).toUpperCase() + type.slice(1).toLowerCase() }</Label>
                            ))}
                        </div>
                        <div className="flex-1 overflow-auto space-y-2">
                            {filteredNotifications.length === 0 ?
                            <div className="text-muted-foreground text-sm font-medium h-full flex justify-center items-center">
                                No notifications
                            </div>
                            :
                            filteredNotifications.map(item => (
                                <NotificationCard key={item.id} data={item} onRead={readNotificaton}/>
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

export default Notification