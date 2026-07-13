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
import { Trans, useTranslation } from "react-i18next";

interface TableViewActionButtonsProp {
    mission: Mission;
}

const TableViewActionButtons = ({ mission }: TableViewActionButtonsProp) => {
    const { mutate: deleteMission  } = useDeleteMission();
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const { t } = useTranslation();

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
                    <TooltipContent>{t("missions.actions.viewDetail")}</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button size={"sm"} variant={"ghostDestructive"} onClick={() => setOpenDialog(true)}>
                            <Trash />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>{t("missions.actions.delete")}</TooltipContent>
                </Tooltip>
                <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                {t("missions.actions.confirmDeleteTitle")}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                <Trans
                                    i18nKey="missions.actions.confirmDeleteDescription"
                                    values={{ name: mission.name }}
                                    components={{ b: <span className="font-bold" /> }}
                                />
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>{t("missions.actions.cancel")}</AlertDialogCancel>
                            <Button variant={"destructive"} onClick={handleDeleteMission} >{t("missions.actions.delete")}</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
};

export default TableViewActionButtons;
