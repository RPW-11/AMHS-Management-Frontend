import { MissionCategory } from "@/constants/mission";
import MissionIcon from "./mission-icon";

interface MissionCategoryBadgeProps {
    category: MissionCategory
}

const MissionCategoryBadge = ({
    category
}: MissionCategoryBadgeProps) => {
    const getFormattedMissionCategory = (): string => {
        switch (category) {
            case MissionCategory.RoutePlanning:
                return "Route Planning"
        
            case MissionCategory.Normal:
                return "Normal"
            
            default:
                return "Not found"
        }
    }
    return (
        <div className="bg-gray-200 rounded-md flex gap-2 p-2 h-fit items-center">
            <MissionIcon category={category} size={14}/>
            <h3 className="font-medium text-sm">{ getFormattedMissionCategory() }</h3>
        </div>
    );
}
 
export default MissionCategoryBadge;