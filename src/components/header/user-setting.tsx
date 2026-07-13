"use client"
import { CircleUserRound, LogOut, UserRoundCog } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useRouter } from "next/navigation";
import { EmployeeRoutes, Routes } from "@/constants/general";
import { useUserStore } from "@/stores/useAuthStore";
import { useTranslation } from "react-i18next";


const UserSetting = () => {
    const { push } = useRouter()
    const { logout } = useUserStore()
    const { t } = useTranslation()

    const handleLogout = () => {
        logout()
        push(Routes.Login)
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"} size={"icon"} className="text-muted-foreground">
                    <CircleUserRound/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-36 p-1">
                <Button
                onClick={() => push(EmployeeRoutes.Profile("me"))}
                variant={"ghost"}
                size={"sm"}
                className="w-full font-normal justify-start">
                    <UserRoundCog />
                    {t("header.profileSettings")}
                </Button>
                <Button
                onClick={handleLogout}
                variant={"ghostDestructive"}
                size={"sm"}
                className="w-full font-normal justify-start text-destructive">
                    <LogOut />
                    {t("sidebar.logout")}
                </Button>
            </PopoverContent>
        </Popover>
    )
}

export default UserSetting;