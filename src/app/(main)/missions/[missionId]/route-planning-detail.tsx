import { RoutePlanningSummary } from "@/types/mission";
import Image from "next/image";

interface RoutePlanningSummaryProps {
    routePlanningSumarry: RoutePlanningSummary
    resourceLink: string
}
const RoutePlanningSummarySection = ({ 
    routePlanningSumarry,
    resourceLink 
}: RoutePlanningSummaryProps) => {
    const imageUrl = `data:image/jpeg;base64,${routePlanningSumarry.imageUrl}`
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 w-4/5 lg:w-1/4 items-center">
                <div className="col-span-1">Algorithm</div>
                <div className="col-span-1 rounded-md bg-accent py-1 px-3 w-fit text-primary">
                    { routePlanningSumarry.algorithm }
                </div>
                <div className="col-span-1">Detailed JSON File</div>
                <div className="col-span-1 rounded-md bg-accent py-1 px-3 w-fit text-primary">
                    { resourceLink }
                </div>
            </div>
            <Image 
            src={imageUrl} 
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            alt="route-planning-resutlt-image"
            />
        </div>
    );
}
 
export default RoutePlanningSummarySection;