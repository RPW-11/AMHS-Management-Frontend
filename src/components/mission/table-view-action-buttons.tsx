"use client";
import { Info, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { MissionRoutes } from "@/constants/general";
import { Mission } from "@/types/mission";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";
import { useDeleteMission } from "@/hooks/mission/useDeleteMission";
import Link from "next/link";

interface TableViewActionButtonsProp {
    mission: Mission;
}

const TableViewActionButtons = ({ mission }: TableViewActionButtonsProp) => {
    const { mutate: deleteMission  } = useDeleteMission();
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const handleDeleteMission = () => {
        setOpenDialog(false);
        deleteMission(mission.id);
    }

    return (
        <div>
            <div className="flex justify-end">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href={MissionRoutes.Detail(mission.id)}
                            className="h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 flex items-center justify-center"
                        >
                            <Info size={17}/>
                        </Link>
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
