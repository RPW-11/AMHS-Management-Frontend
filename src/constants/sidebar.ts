import { LayoutDashboard, LayoutList, ToolCase, Users } from "lucide-react";
import { Routes } from "./general";

export const SIDEBAR_MENU = [
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
    }
]