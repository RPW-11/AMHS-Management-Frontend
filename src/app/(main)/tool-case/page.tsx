"use client"
import { Route } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const ToolCasePage = () => {
    const pathname = usePathname()
    return (
        <div className="bg-white rounded-md p-4 border space-y-4">
            <div>
                <h1 className="font-bold text-lg">AMHS Tools</h1>
                <p className="text-muted-foreground text-sm">A list of tools related to Automated Material Handling System (AMHS) </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <Link href={`${pathname}/rgv-route-planning`} className="col-span-2 lg:col-span-1 flex justify-start px-4 py-2 rounded-md gap-4 border hover:bg-secondary hover:text-primary">
                    <Route size={40}/>
                    <div>
                        <h3 className="font-semibold">RGV Route Planning</h3>
                        <p className="text-xs">Find the most optimal RGV route (track) based on the chosen algorithm</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default ToolCasePage