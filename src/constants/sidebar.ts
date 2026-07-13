import { Bell, LayoutDashboard, LayoutList, Users } from "lucide-react";
import { Routes } from "./general";
import { SidebarItemType } from "@/types/general";

export const SIDEBAR_MENU: SidebarItemType[] = [
    {
        name: "dashboard",
        icon: LayoutDashboard,
        path: Routes.Dashboard
    },
    {
        name: "employees",
        icon: Users,
        path: Routes.Employees
    },
    {
        name: "missions",
        icon: LayoutList,
        path: Routes.Missions
    },
    {
        name: "notification",
        icon: Bell,
        path: Routes.Notification
    }
]
