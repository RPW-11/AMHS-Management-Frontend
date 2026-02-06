import { ContactRound, Mail } from "lucide-react";
import ActionsButton from "../actions-button";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { EmployeeRoutes } from "@/constants/general";

interface EmployeeActionButtonProps {
    employeeId: string
}

const EmployeeActionButton = ({
    employeeId
}: EmployeeActionButtonProps) => {
    const { push } = useRouter()

    return (
        <ActionsButton>
            <Button
            onClick={() => push(EmployeeRoutes.Profile(employeeId))}
            className="w-full justify-start" 
            size={"sm"} variant={"ghost"}>
                <ContactRound />
                Profile
            </Button>
            <Button className="w-full justify-start" 
            size={"sm"} variant={"ghost"}>
                <Mail />
                Email
            </Button>
        </ActionsButton>
    )
}

export default EmployeeActionButton;