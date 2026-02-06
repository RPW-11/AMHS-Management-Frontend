import { Button } from "../ui/button"

interface SelectedEmployeeActionsProps {
    selectedIds: string[]
}

const SelectedEmployeeActions = ({
    selectedIds
}: SelectedEmployeeActionsProps) => {
    return (
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 z-10 rounded-md py-1 px-4 border bg-white shadow">
            <div className="flex items-center gap-2">
                <h3 className="text-xs font-medium">
                    { selectedIds.length } employees selected
                </h3>
                <Button size={"sm"} variant={"secondary"} className="text-xs">
                    Email
                </Button>
            </div>
        </div>
    )
}

export default SelectedEmployeeActions