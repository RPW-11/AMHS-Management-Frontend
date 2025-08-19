import { AssignedEmployee } from "@/types/mission";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface MissionMemberProps {
    member: AssignedEmployee
}

const MissionMember = ({
    member
}: MissionMemberProps) => {
    return (
        <div className="flex gap-2 items-center">
            <Avatar className={`h-8.5 w-8.5 rounded-md`}>
                <AvatarImage src={member.imgUrl} className="object-cover"/>
                <AvatarFallback className="rounded-md">{member.firstName.slice(0, 1).toUpperCase() + member.lastName.slice(0, 1).toUpperCase()}</AvatarFallback>
            </Avatar>
            {`${member.firstName} ${member.lastName}`}
        </div>
    );
}
 
export default MissionMember;