import { RgvPathPoint } from "@/types/toolcase";
import { Option } from "@/types/general";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import SelectOption from "../select-option";
import { Button } from "../ui/button";
import { useMemo, useState } from "react";
import { PointCategory } from "@/constants/tool-case";
import { getPointCategoryByStr, getTranslatedPointCategoryOptions } from "@/utils/tool-case/route-planning";
import { useTranslation } from "react-i18next";

interface EditPointDialogProps {
    currPoint: RgvPathPoint;
    onEdit: (newPoint: RgvPathPoint | null) => void;
}

const EditPointDialog = ({ currPoint, onEdit }: EditPointDialogProps) => {
    const [localPoint, setLocalPoint] = useState<RgvPathPoint>({...currPoint, category: PointCategory.Station });
    const { t } = useTranslation();
    const pointCategoryOptions = useMemo(() => getTranslatedPointCategoryOptions(t), [t]);

    const formatPointToOption = (): Option => {
        return localPoint.category === PointCategory.Obstacle
            ? pointCategoryOptions[0]
            : pointCategoryOptions[1];
    };

    const changePointType = (value: Option) =>
        setLocalPoint({
            ...localPoint,
            category: getPointCategoryByStr(value.value),
        });

    const changePointName = (value: string) =>
        setLocalPoint({ ...localPoint, name: value });

    const changeProcessingTime = (value: string) =>
        setLocalPoint({ ...localPoint, time: localPoint.category === PointCategory.Obstacle ? 0 : Number(value) });

    const canSavePoint = () => {
        return (
            localPoint.name !== "" && localPoint.category !== PointCategory.None
        );
    };

    const handleSavePoint = () => onEdit(localPoint);

    return (
        <Dialog open={currPoint !== null} onOpenChange={() => onEdit(null)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("toolCase.rgvRoutePlanning.editPointDialog.title")}</DialogTitle>
                    <DialogDescription>
                        {t("toolCase.rgvRoutePlanning.editPointDialog.description")}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 space-y-2">
                        <Label>{t("toolCase.rgvRoutePlanning.editPointDialog.pointName")}</Label>
                        <Input
                            value={localPoint.name}
                            onChange={(e) => changePointName(e.target.value)}
                            placeholder={t("toolCase.rgvRoutePlanning.editPointDialog.pointNamePlaceholder")}
                        />
                    </div>
                    <div className="col-span-2 lg:col-span-1 space-y-2">
                        <Label>{t("toolCase.rgvRoutePlanning.editPointDialog.pointType")}</Label>
                        <SelectOption
                            value={formatPointToOption()}
                            options={pointCategoryOptions}
                            onValueChange={changePointType}
                            labelName={t("toolCase.rgvRoutePlanning.editPointDialog.pointType")}
                            placeholder={t("toolCase.rgvRoutePlanning.editPointDialog.selectPointType")}
                        />
                    </div>
                    <div className="col-span-2 lg:col-span-1 space-y-2">
                        <Label>{t("toolCase.rgvRoutePlanning.editPointDialog.processingTime")}</Label>
                        <Input
                            disabled={localPoint.category === PointCategory.Obstacle}
                            value={localPoint.category === PointCategory.Obstacle ? 0 : localPoint.time}
                            onChange={(e) =>
                                changeProcessingTime(e.target.value)
                            }
                            placeholder={t("toolCase.rgvRoutePlanning.editPointDialog.processingTimePlaceholder")}
                            type="number"
                        />
                    </div>
                    <div className="col-span-2 flex justify-end">
                        <Button
                            onClick={handleSavePoint}
                            disabled={!canSavePoint()}
                        >
                            {t("toolCase.rgvRoutePlanning.editPointDialog.save")}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EditPointDialog;
