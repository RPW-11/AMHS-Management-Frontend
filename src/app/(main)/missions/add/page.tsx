"use client";
import CustomDatePicker from "@/components/custom-date-picker";
import SelectOption from "@/components/select-option";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    MISSION_CATEGORIES_OPTIONS,
    MissionCategory,
} from "@/constants/mission";
import { useAddMission } from "@/hooks/mission/useAddMission";
import { getOption } from "@/utils/general-util";
import { useTranslation } from "react-i18next";

const AddMissionPage = () => {
    const { t } = useTranslation();
    const {
        addMissionForm,
        setAddMissionForm,
        errorsForm,
        mutate: addMissionApi,
        isPending,
        validateMissionForm,
    } = useAddMission();

    const handleAddMission = async () => {
        if (!validateMissionForm(addMissionForm)) {
            return;
        }

        addMissionApi(addMissionForm);
    };

    return (
        <div className="rounded-md p-4 bg-white border space-y-4">
            <div className="space-y-2">
                <h2 className="font-semibold text-lg">{t("missions.add.title")}</h2>
            </div>
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-4 lg:col-span-2 space-y-2">
                    <Label>{t("missions.add.name")}</Label>
                    <Input
                        value={addMissionForm.name}
                        onChange={(e) =>
                            setAddMissionForm({
                                ...addMissionForm,
                                name: e.target.value,
                            })
                        }
                        placeholder={t("missions.add.namePlaceholder")}
                        className="text-sm"
                    />
                    <p className="text-destructive text-xs">
                        {errorsForm.name}
                    </p>
                </div>
                <div className="col-span-4 lg:col-span-2 space-y-2">
                    <Label>{t("missions.add.category")}</Label>
                    <SelectOption
                        value={getOption(
                            MISSION_CATEGORIES_OPTIONS,
                            addMissionForm.category.toString(),
                        )}
                        options={MISSION_CATEGORIES_OPTIONS}
                        onValueChange={(option) =>
                            setAddMissionForm({
                                ...addMissionForm,
                                category: option.value as MissionCategory,
                            })
                        }
                        labelName={t("missions.add.missionCategory")}
                        placeholder={t("missions.add.selectMissionCategory")}
                    />
                    <p className="text-destructive text-xs">
                        {errorsForm.category}
                    </p>
                </div>
                <div className="col-span-4 space-y-2">
                    <Label>{t("missions.add.description")}</Label>
                    <Textarea
                        value={addMissionForm.description}
                        onChange={(e) =>
                            setAddMissionForm({
                                ...addMissionForm,
                                description: e.target.value,
                            })
                        }
                        placeholder={t("missions.add.descriptionPlaceholder")}
                        className="text-sm"
                    />
                </div>
                <div className="col-span-4 lg:col-span-2 space-y-2">
                    <Label>{t("missions.add.dueDate")}</Label>
                    <CustomDatePicker
                        date={addMissionForm.dueDate}
                        onDateChange={(newDate) =>
                            setAddMissionForm({
                                ...addMissionForm,
                                dueDate: newDate,
                            })
                        }
                    />
                </div>
                <div className="col-span-4 lg:col-span-2 space-y-2">
                    <Label>{t("missions.add.dueTime")}</Label>
                    <Input
                        type="time"
                        value={addMissionForm.dueTime}
                        onChange={(e) =>
                            setAddMissionForm({
                                ...addMissionForm,
                                dueTime: e.target.value,
                            })
                        }
                    />
                </div>
                <p className="col-span-4 text-destructive text-xs">
                    {errorsForm.dueDateTime}
                </p>
            </div>
            <div className="flex justify-end">
                <Button size={"sm"} onClick={handleAddMission} disabled={isPending}>
                    {t("missions.add.addButton")}
                </Button>
            </div>
        </div>
    );
};

export default AddMissionPage;
