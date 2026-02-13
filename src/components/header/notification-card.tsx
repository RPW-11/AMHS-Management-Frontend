import { NotificationData } from "@/types/general";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { parsedTimeStampToDateTime } from "@/utils/general-util";
import { Button } from "../ui/button";
import { MailOpen } from "lucide-react";
import { useState } from "react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { useDeleteNotification } from "@/hooks/notification/useDeleteNotification";

interface NotificationCardProps {
    data: NotificationData;
    onRead: (id: string) => void;
    onMarkAsRead: (id: string) => void;
}

const NotificationCard = ({
    data,
    onRead,
    onMarkAsRead,
}: NotificationCardProps) => {
    const { mutate:deleteNotification, isPending } = useDeleteNotification()
    const [isReadLocal, setIsLocalRead] = useState<boolean>(
        data.isRead || false,
    );
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

    const handleMarkAsRead = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onMarkAsRead(data.id);
        setIsLocalRead(true);
    };
    

    function handleDeleteNotification(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.stopPropagation();
        setOpenDeleteDialog(false);
        deleteNotification(data.id);
    }

    return (
        <div
            className={`p-2 rounded-md flex gap-3 hover:bg-gray-100 cursor-pointer relative`}
            onClick={() => onRead(data.id)}
        >
            <Avatar className="rounded-md mt-1">
                <AvatarImage src={data.actorAvatarUrl} />
                <AvatarFallback className="rounded-md">{`${data.actorName.substring(0, 2).toUpperCase()}`}</AvatarFallback>
            </Avatar>
            <div className="w-full space-y-2">
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <div>
                            <h3 className="font-medium text-sm">
                                {data.actorName}
                            </h3>
                            <p className="text-xs whitespace-wrap">
                                {data.message}
                            </p>
                        </div>
                    </div>
                    {!isReadLocal && (
                        <div className="rounded-full min-h-2 min-w-2 max-h-2 max-w-2 bg-primary"></div>
                    )}
                </div>
                <div className="flex justify-between text-xs">
                    <p>{parsedTimeStampToDateTime(data.createdAt)}</p>
                    <div className="flex items-center">
                        {!isReadLocal && (
                            <Button
                                variant={"ghost"}
                                size={"sm"}
                                className="text-xs"
                                onClick={handleMarkAsRead}
                            >
                                <MailOpen /> Mark as read
                            </Button>
                        )}
                        <Button
                            variant={"ghostDestructive"}
                            size={"sm"}
                            className="text-xs"
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenDeleteDialog(true);
                            }}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
                <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This will
                                permanently delete thi notification from the system.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button variant={"destructive"} onClick={handleDeleteNotification} >Delete</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
};

export default NotificationCard;
