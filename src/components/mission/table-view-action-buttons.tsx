"use client";
import { Info, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useRouter } from "next/navigation";
import { MissionRoutes } from "@/constants/general";
import { Mission } from "@/types/mission";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";
import { toast } from "sonner";
import { useDeleteMission } from "@/hooks/mission/useDeleteMission";

interface TableViewActionButtonsProp {
    mission: Mission;
}

const TableViewActionButtons = ({ mission }: TableViewActionButtonsProp) => {
    const { deleteMissionApi } = useDeleteMission();
    const { push } = useRouter();
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const handleDeleteMission = () => {
        toast.promise(
            deleteMissionApi(mission.id),
            {
                loading: "Deleting mission...",
                success: () => {
                    setOpenDialog(false);
                    return "Mission deleted successfully.";
                },
                error: (err) => `Failed to delete mission. ${err}`,
            }
        );
    }

    const handleViewDetail = () => push(MissionRoutes.Detail(mission.id));

    return (
        <div>
            <div className="flex justify-end">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            size={"sm"}
                            variant={"ghost"}
                            onClick={handleViewDetail}
                        >
                            <Info />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>View Detail</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button size={"sm"} variant={"ghostDestructive"} onClick={() => setOpenDialog(true)}>
                            <Trash />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete</TooltipContent>
                </Tooltip>
                <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This will
                                permanently delete mission <span className="font-bold">{mission.name}</span> from the system.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button variant={"destructive"} onClick={handleDeleteMission} >Delete</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
};

export default TableViewActionButtons;
