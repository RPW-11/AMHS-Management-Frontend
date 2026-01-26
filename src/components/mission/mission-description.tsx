import { Mission } from "@/types/mission";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useModifyMission } from "@/hooks/mission/useModifyMission";
import LoadingSpinner from "../loading-spinner";

interface MissionDescriptionProps {
    mission: Mission;
}

const MissionDescription = ({ mission }: MissionDescriptionProps) => {
    const { mutate: modifyDescription, isPending } = useModifyMission()
    const [localDescription, setLocalDescription] = useState<string>(
        mission.description,
    );
    const [isEditing, setIsEditing] = useState<boolean>(false);
    
    const handleSubmitDescription = () => {
        modifyDescription({
            missionId: mission.id,
            data: {
                ...mission,
                description: localDescription
            },
            onSuccessCb() {
                setIsEditing(false);
            },
        })
    }

    if (isEditing) {
        return (
            <div className="space-y-2 flex flex-col items-end">
                <Textarea
                    disabled={isPending}
                    value={localDescription}
                    onChange={(e) => setLocalDescription(e.target.value)}
                    placeholder="Write some description..."
                />
                <div className="flex gap-2 items-center">
                    <Button disabled={isPending} size={"sm"} variant={"ghost"} onClick={() => setIsEditing(false)}>Cancel</Button>
                    <Button disabled={isPending} size={"sm"} onClick={handleSubmitDescription}>
                        {isPending && <LoadingSpinner size="sm"/>}
                        Save
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div
            className="cursor-pointer hover:bg-gray-200 px-3 py-2 bg-gray-100 rounded-md w-full"
            onClick={() => setIsEditing(true)}
        >
            {localDescription ? (
                <p className="text-sm text-muted-foreground">
                    {localDescription}
                </p>
            ) : (
                <p className="text-sm italic text-center text-muted-foreground">
                    No description
                </p>
            )}
        </div>
    );
};

export default MissionDescription;
