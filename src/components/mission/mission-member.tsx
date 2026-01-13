import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface MissionMemberProps {
    firstName: string
    lastName: string
    imgUrl?: string
}

const MissionMember = ({
    firstName,
    lastName,
    imgUrl
}: MissionMemberProps) => {
    return (
        <div className="flex gap-2 items-center text-sm">
            <Avatar className={`h-8.5 w-8.5 rounded-md`}>
                <AvatarImage src={imgUrl} className="object-cover"/>
                <AvatarFallback className="rounded-md">{firstName.slice(0, 1).toUpperCase() + lastName.slice(0, 1).toUpperCase()}</AvatarFallback>
            </Avatar>
            {`${firstName} ${lastName}`}
        </div>
    );
}
 
export default MissionMember;