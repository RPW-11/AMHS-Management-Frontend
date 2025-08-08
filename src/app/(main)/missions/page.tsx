"use client"
import { Button } from "@/components/ui/button"
import { MissionRoutes } from "@/constants/general";
import { useRouter } from "next/navigation"


const MissionPage = () => {
    const { push } = useRouter();
    return (
        <div className="rounded-md p-4 bg-white border space-y-4">
            <Button onClick={() => push(MissionRoutes.Add)}>Add mission</Button>
        </div>
    )
}

export default MissionPage