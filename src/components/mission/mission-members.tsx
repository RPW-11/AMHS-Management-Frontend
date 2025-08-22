"use client"

import { AssignedEmployee, Mission } from "@/types/mission";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import MissionMember from "./mission-member";
import SelectOption from "../select-option";
import { Option } from "@/types/general";
import { useUserStore } from "@/stores/useAuthStore";
import { MISSION_ROLES_OPTIONS } from "@/constants/mission";
import { getOption } from "@/utils/general-util";
import { Trash } from "lucide-react";
import MemberSearch from "./member-search";

interface MissionMembersProps {
    mission: Mission,
    leader: AssignedEmployee
}

const MissionMembers = ({
    mission,
    leader
}: MissionMembersProps) => {
    const { user } = useUserStore()
    const handleChangeRole = (option: Option) => {

    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"sm"} variant={"ghost"}>
                    { `${mission.assignedEmployees.length} members` }
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Project members</DialogTitle>
                    <DialogDescription>Manage the members in your mission</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <MemberSearch />
                    <div className="flex flex-col gap-2">
                        {mission.assignedEmployees.map(emp => (
                            <div key={emp.id} className="grid grid-cols-6 gap-2">
                                <div className="col-span-4">
                                    <MissionMember {...emp}/>
                                </div>
                                <div className="col-span-2 flex items-center gap-2">
                                    <SelectOption
                                        disabled={user?.id !== leader.id || emp.id === user.id} 
                                        value={getOption(MISSION_ROLES_OPTIONS, emp.role)}
                                        options={MISSION_ROLES_OPTIONS}
                                        onValueChange={handleChangeRole}
                                        labelName={"Mission Role"}
                                        placeholder={"Change Role"} 
                                    />
                                    {emp.id !== user?.id
                                    &&
                                    <Button 
                                    title="Remove member"
                                    variant={"ghostDestructive"} 
                                    size={"icon"}
                                    >
                                        <Trash />
                                    </Button>}                         
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
 
export default MissionMembers;