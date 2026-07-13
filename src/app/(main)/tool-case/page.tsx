"use client"
import { Route } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslation } from "react-i18next"

const ToolCasePage = () => {
    const pathname = usePathname()
    const { t } = useTranslation()
    return (
        <div className="bg-white rounded-md p-4 border space-y-4">
            <div>
                <h1 className="font-bold text-lg">{t("toolCase.title")}</h1>
                <p className="text-muted-foreground text-sm">{t("toolCase.subtitle")}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <Link href={`${pathname}/rgv-route-planning`} className="col-span-2 lg:col-span-1 flex justify-start px-4 py-2 rounded-md gap-4 border hover:bg-secondary hover:text-primary">
                    <Route size={40}/>
                    <div>
                        <h3 className="font-semibold">{t("toolCase.rgvRoutePlanning.title")}</h3>
                        <p className="text-xs">{t("toolCase.rgvRoutePlanning.description")}</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default ToolCasePage