"use client"
import { Routes } from "@/constants/general";
import { SIDEBAR_MENU } from "@/constants/sidebar";
import { useUserStore } from "@/stores/useAuthStore";
import { motion, AnimatePresence } from "framer-motion";
import { PanelRightOpen, PanelRightClose, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import SidebarItem from "./sidebar-item";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";

interface SidebarProps {
    isOpen: boolean,
    onOpenChange: (val: boolean) => void
    sidebarWidth: number;
}

const Sidebar = ({ isOpen, onOpenChange, sidebarWidth }: SidebarProps) => {
    const { push } = useRouter();
    const { logout } = useUserStore();
    const pathname = usePathname();
    const currPath = "/" + pathname.split("/")[1];

    const handleLogout = () => {
        logout();
        push(Routes.Login);
    };

    return (
        <TooltipProvider delayDuration={0}>
            <motion.nav
                layout
                animate={{ width: sidebarWidth }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed z-10 p-4 h-screen bg-white border-r flex flex-col justify-between overflow-hidden"
            >
                <div className="space-y-8">
                    <div className="flex justify-between items-center h-10">
                        <AnimatePresence mode="sync">
                            {isOpen && (
                                <motion.h1
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="font-bold text-xl text-primary whitespace-nowrap"
                                >
                                    SAA Inc.
                                </motion.h1>
                            )}
                        </AnimatePresence>
                        <Button
                            variant="ghost"
                            onClick={() => onOpenChange(!isOpen)}
                            className="transition-all"
                        >
                            {isOpen ? <PanelRightOpen /> : <PanelRightClose />}
                        </Button>
                    </div>

                    <div className="flex flex-col gap-2">
                        {SIDEBAR_MENU.map((menu) => (
                            <SidebarItem 
                                key={menu.name} 
                                menu={menu} 
                                isOpen={isOpen} 
                                isActive={currPath === menu.path} 
                            />
                        ))}
                    </div>
                </div>

                <Tooltip delayDuration={0} disableHoverableContent={isOpen}>
                    <TooltipTrigger asChild>
                        <Button
                            onClick={handleLogout}
                            variant="ghost"
                            className={`w-full gap-3 transition-all justify-start`}
                        >
                            <LogOut size={16} className="shrink-0" />
                            <AnimatePresence mode="wait">
                            {isOpen && (
                                <motion.span
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: "auto" }}
                                    exit={{
                                        opacity: 0,
                                        width: 0,
                                        transition: {
                                            duration: 0.3,
                                            ease: "easeOut",
                                            opacity: { duration: 0.25 },
                                            width: { duration: 0.35, delay: 0.05 },
                                        },
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        delay: 0.1,
                                        ease: "easeOut",
                                    }}
                                    className="whitespace-nowrap overflow-hidden text-sm"
                                >
                                    Log out
                                </motion.span>
                            )}
                        </AnimatePresence>
                        </Button>
                    </TooltipTrigger>
                    {!isOpen && <TooltipContent side="right">Log out</TooltipContent>}
                </Tooltip>
            </motion.nav>
        </TooltipProvider>
    );
};

export default Sidebar;