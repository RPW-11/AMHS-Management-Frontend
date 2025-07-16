import { LayoutDashboard, LayoutList, ToolCase, Users, Warehouse } from "lucide-react";

export const SIDEBAR_MENU = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard"
    },
    {
        name: "Employees",
        icon: Users,
        path: "/employees"
    },
    {
        name: "Tasks",
        icon: LayoutList,
        path: "/tasks"
    },
    {
        name: "Tools",
        icon: ToolCase,
        path: "/tool-case"
    }
]