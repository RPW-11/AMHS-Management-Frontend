import { MissionCategory } from "@/constants/mission";
import MissionIcon from "./mission-icon";
import { useTranslation } from "react-i18next";

interface MissionCategoryBadgeProps {
    category: MissionCategory
}

const MissionCategoryBadge = ({
    category
}: MissionCategoryBadgeProps) => {
    const { t } = useTranslation();
    const getFormattedMissionCategory = (): string => {
        switch (category) {
            case MissionCategory.RoutePlanning:
                return t("missions.category.routePlanning")

            case MissionCategory.Normal:
                return t("missions.category.normal")

            default:
                return t("missions.category.notFound")
        }
    }
    return (
        <div className="bg-gray-200 rounded-md flex gap-1 px-2 py-1 h-fit w-fit items-center">
            <MissionIcon category={category} size={12}/>
            <h3 className="font-medium text-xs">{ getFormattedMissionCategory() }</h3>
        </div>
    );
}
 
export default MissionCategoryBadge;