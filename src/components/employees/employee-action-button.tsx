import { ContactRound, Mail } from "lucide-react";
import ActionsButton from "../actions-button";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

interface EmployeeActionButtonProps {
    employeeId: string
}

const EmployeeActionButton = ({
    employeeId
}: EmployeeActionButtonProps) => {
    const { push } = useRouter()
    const pathname = usePathname()

    return (
        <ActionsButton>
            <Button
            onClick={() => push(`${pathname}/profile/${employeeId}`)}
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