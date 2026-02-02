import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { SidebarItemType } from "@/types/general";

const SidebarItem = ({
    menu,
    isOpen,
    isActive,
}: {
    menu: SidebarItemType;
    isOpen: boolean;
    isActive: boolean;
}) => {
    return (
        <Tooltip delayDuration={0} disableHoverableContent={isOpen}>
            <TooltipTrigger asChild>
                <Link
                    href={menu.path}
                    className={`flex items-center gap-3 py-2 h-9 px-3 rounded-md transition-colors ${
                        isActive
                            ? "bg-primary text-white font-semibold"
                            : "hover:text-primary hover:bg-secondary font-medium"
                    }`}
                >
                    <menu.icon size={16} className="shrink-0" />
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
                                {menu.name}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Link>
            </TooltipTrigger>
            {!isOpen && (
                <TooltipContent side="right" sideOffset={10}>
                    {menu.name}
                </TooltipContent>
            )}
        </Tooltip>
    );
};

export default SidebarItem;
