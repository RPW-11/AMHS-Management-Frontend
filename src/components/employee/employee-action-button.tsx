import { ContactRound, Mail } from "lucide-react";
import ActionsButton from "../actions-button";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { EmployeeRoutes } from "@/constants/general";
import { useTranslation } from "react-i18next";

interface EmployeeActionButtonProps {
    employeeId: string
}

const EmployeeActionButton = ({
    employeeId
}: EmployeeActionButtonProps) => {
    const { push } = useRouter()
    const { t } = useTranslation()

    return (
        <ActionsButton>
            <Button
            onClick={() => push(EmployeeRoutes.Profile(employeeId))}
            className="w-full justify-start"
            size={"sm"} variant={"ghost"}>
                <ContactRound />
                {t("employees.actions.profile")}
            </Button>
            <Button className="w-full justify-start"
            size={"sm"} variant={"ghost"}>
                <Mail />
                {t("employees.actions.email")}
            </Button>
        </ActionsButton>
    )
}

export default EmployeeActionButton;