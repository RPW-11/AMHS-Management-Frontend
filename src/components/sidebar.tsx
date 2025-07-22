"use client"
import { Button } from "./ui/button";
import { SIDEBAR_MENU } from "@/constants/sidebar";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
    const { push } = useRouter()
    const pathname = usePathname();
    const currPath = "/" + pathname.split("/")[1]

    const handleLogout = () => {
        push("/login")
    }
    return (
        <div className="fixed p-6 w-64 h-screen bg-gray-100 border-r flex flex-col justify-between">
            <div className="space-y-8">
                <div className="">
                    <h1 className="font-bold text-2xl text-primary">SAA Inc.</h1>
                </div>
                <div className="flex flex-col gap-2">
                    {SIDEBAR_MENU.map(menu => (
                        <Link key={menu.name} href={menu.path} className={`flex items-center gap-3 px-4 py-2 text-sm rounded-md ${currPath === menu.path ? "bg-primary text-white font-semibold" : "hover:text-primary hover:bg-secondary font-medium"}`}>
                            <menu.icon size={16}/>
                            { menu.name }
                        </Link>
                    ))}
                </div>
            </div>
            <Button onClick={handleLogout} variant={"ghost"} className="w-full justify-start gap-3">
                <LogOut />
                Log out
            </Button>
        </div>
    )
}
export default Sidebar;