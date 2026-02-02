import { useDeleteBulkMissions } from "@/hooks/mission/useDeleteBulkMissions"
import { Button } from "../ui/button"

interface SelectedMissionProps {
    selectedIds: string[],
    onDelete: () => void
}

const SelectedMissionActions = ({
    selectedIds,
    onDelete
}: SelectedMissionProps) => {
    const { mutate: deleteBulkMissions, isPending } = useDeleteBulkMissions(onDelete)

    const handleDeleteBulkMissions = () => deleteBulkMissions(selectedIds)

    return (
        <div className="fixed left-1/2 bottom-0 -translate-x-1/2 z-10 rounded-md py-1 px-4 border bg-white shadow">
            <div className="flex items-center gap-2">
                <h3 className="text-xs font-medium">
                    { selectedIds.length } missions selected
                </h3>
                <Button size={"sm"} variant={"destructive"} className="text-xs" disabled={isPending} onClick={handleDeleteBulkMissions}>
                    Delete
                </Button>
            </div>
        </div>
    )
}

export default SelectedMissionActions