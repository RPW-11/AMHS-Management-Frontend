import { Bell, LayoutDashboard, LayoutList, ToolCase, Users } from "lucide-react";
import { Routes } from "./general";
import { SidebarItemType } from "@/types/general";

export const SIDEBAR_MENU: SidebarItemType[] = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: Routes.Dashboard
    },
    {
        name: "Employees",
        icon: Users,
        path: Routes.Employees
    },
    {
        name: "Missions",
        icon: LayoutList,
        path: Routes.Missions
    },
    {
        name: "Tools",
        icon: ToolCase,
        path: Routes.ToolCase
    },
    {
        name: "Notification",
        icon: Bell,
        path: Routes.Notification
    }
]
