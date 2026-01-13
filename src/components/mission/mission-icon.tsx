import { CATEGORY_ICON, MissionCategory } from "@/constants/mission";

interface MissionIconProps {
    category: MissionCategory,
    size?: number
}
const MissionIcon = ({ category, size }: MissionIconProps) => {
    const Icon = CATEGORY_ICON[category]
    return (
        <Icon size={size} />
    );
}
 
export default MissionIcon;