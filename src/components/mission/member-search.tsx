"use client"
import { Search } from "lucide-react";
import LoadingSpinner from "../loading-spinner";
import { useSearchEmployeesByName } from "@/hooks/employee/useSearchEmployeesByName";
import MissionMember from "./mission-member";
import { useParams } from "next/navigation";
import { useMissionMember } from "@/hooks/mission/useMissionMember";

const MemberSearch = () => {
    const { missionId } = useParams();
    const { employees, isFetching, fetchError, searchedName, setSearchedName } = useSearchEmployeesByName()
    const { addMemberToMission } = useMissionMember(typeof missionId === 'string' ? missionId : undefined)
    return (
        <div className="relative">
            <div className="flex items-center gap-2 px-3 py-2 w-full bg-white rounded-md border text-sm">
                <Search size={16} className="text-muted-foreground" />
                <input
                value={searchedName}
                onChange={(e) => setSearchedName(e.target.value)} 
                placeholder="Search or add members"
                className="focus:outline-none w-full"
                />
            </div>
            {searchedName && <div className="absolute z-10 top-12 flex items-center justify-center w-full p-2 rounded-md border bg-white shadow">
                {isFetching ? 
                <LoadingSpinner size="sm"/>
                :
                fetchError
                ?
                <h3 className="text-sm text-destructive">{ fetchError }</h3>
                :
                employees.length === 0
                ?
                <h3 className="text-sm text-muted-foreground">No employee found</h3>
                :
                <div className="space-y-2 w-full">
                    {employees.map((emp) => (
                        <div onClick={() => addMemberToMission(emp.id)} key={emp.id} className="flex justify-start hover:bg-gray-100 cursor-pointer rounded-md">
                            <MissionMember {...emp}/>
                        </div>
                    ))}
                </div>
                }
            </div>}
        </div>
    );
}
 
export default MemberSearch;