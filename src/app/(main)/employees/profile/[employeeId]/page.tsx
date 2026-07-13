"use client"
import CustomDatePicker from "@/components/custom-date-picker"
import InputWithValidation from "@/components/input-with-validation"
import LoadingSpinner from "@/components/loading-spinner"
import SelectOption from "@/components/select-option"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import UserAvatar from "@/components/user-avatar"
import { useEmployeeProfile } from "@/hooks/employee/useEmployeeProfile"
import { useUserStore } from "@/stores/useAuthStore"
import { Option } from "@/types/general"
import { formatEmployeePosition, getPositionEnumByStr, getTranslatedEmployeePositions } from "@/utils/employee/employee-util"
import { useParams } from "next/navigation"
import { toast } from "sonner"
import { useTranslation } from "react-i18next"

const EmployeeProfilePage = () => {
    const { employeeId } = useParams()
    const { user } = useUserStore()
    const { t } = useTranslation()

    const resolvedEmployeeId = employeeId?.toString() === "me" ? user?.id : employeeId?.toString();

    const { isFetchingProfile, fetchError, employeeDetails, updateField, errors, canSaveProfile } = useEmployeeProfile(
        resolvedEmployeeId
    );

    const isMyProfile = (): boolean => resolvedEmployeeId === user?.id
    const employeePositions = getTranslatedEmployeePositions(t)

    if (fetchError) {
        return (
            <div className="flex justify-center items-center w-full h-full text-4xl font-semibold text-muted-foreground">
                {t("employees.profile.notFound")}
            </div>
        )
    }

    if (isFetchingProfile) {
        return (
            <div className="flex justify-center items-center w-full h-full">
                <LoadingSpinner size="xl"/>
            </div>
        )
    }

    return (
        <div className="rounded-md border bg-white p-4 space-y-6">
            <h1 className="font-semibold text-2xl">{t("employees.profile.title")}</h1>
            <div className="space-y-4">
                <Label>{t("employees.profile.profileImage")}</Label>
                <UserAvatar
                size="custom"
                customSize="h-48 w-48 text-4xl"
                userData={employeeDetails}
                hideNames
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>{t("employees.profile.firstName")}</Label>
                    <InputWithValidation
                    disabled={!isMyProfile()}
                    value={employeeDetails.firstName}
                    onChange={(val) => updateField('firstName', val)}
                    placeholder={t("employees.profile.firstNamePlaceholder")}
                    errorMessage={errors.firstName}/>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>{t("employees.profile.lastName")}</Label>
                    <InputWithValidation
                    disabled={!isMyProfile()}
                    value={employeeDetails.lastName}
                    onChange={(val) => updateField('lastName', val)}
                    placeholder={t("employees.profile.lastNamePlaceholder")}
                    errorMessage={errors.lastName}/>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>{t("employees.profile.email")}</Label>
                    <InputWithValidation
                    disabled={!isMyProfile()}
                    value={employeeDetails.email}
                    onChange={(val) => updateField('email', val)}
                    placeholder={t("employees.profile.emailPlaceholder")}
                    errorMessage={errors.email}/>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>{t("employees.profile.phoneNumber")}</Label>
                    <InputWithValidation
                    disabled={!isMyProfile()}
                    value={employeeDetails.phoneNumber}
                    onChange={(val) => updateField('phoneNumber', val)}
                    placeholder={t("employees.profile.phoneNumberPlaceholder")}
                    errorMessage={errors.phoneNumber}/>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label htmlFor="position" aria-label="position">{t("employees.profile.position")}</Label>
                    <SelectOption
                    disabled
                    value={{ name: formatEmployeePosition(t, getPositionEnumByStr(employeeDetails.position)), value: employeeDetails.position }}
                    options={employeePositions}
                    onValueChange={(val:Option) => { toast.error(t("employees.profile.notImplemented", { value: val.value }))}}
                    placeholder={t("employees.profile.positionPlaceholder")}
                    labelName={t("employees.profile.position")}
                    />
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>{t("employees.profile.dateOfBirth")}</Label>
                    <CustomDatePicker
                    date={new Date(employeeDetails.dateOfBirth)}/>
                </div>
            </div>
            {isMyProfile() && <div className="flex justify-end">
                <Button size={"sm"} disabled={!canSaveProfile}>{t("employees.profile.save")}</Button>
            </div>}
        </div>
    )
}

export default EmployeeProfilePage