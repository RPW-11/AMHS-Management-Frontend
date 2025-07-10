import { LayoutDashboard, ToolCase, Users, Warehouse } from "lucide-react";

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
        name: "Materials Inventory",
        icon: Warehouse,
        path: "/materials-inventory"
    },
    {
        name: "Tools",
        icon: ToolCase,
        path: "/tool-case"
    }
]