import { LabellingMode } from "@/constants/tool-case";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { ArrowBigUp, Eraser, Plus, RotateCcw, SquarePen, Workflow } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { useTranslation } from "react-i18next";

interface ModeToggleProps {
    mode: LabellingMode,
    onChangeMode: (mode: LabellingMode) => void
    handleResetMap: () => void
    handleAutomatedLabelling: () => void
}

const ModeToggle = ({
    mode,
    onChangeMode,
    handleResetMap,
    handleAutomatedLabelling
}: ModeToggleProps) => {
    const { t } = useTranslation();

    return (
        <div className="space-y-2">
            <Label>{t("toolCase.rgvRoutePlanning.modeToggle.mapTools")}</Label>
            <div className="flex gap-2">
                <Button size={"icon"}
                title={t("toolCase.rgvRoutePlanning.modeToggle.eraseTile")}
                onClick={() => onChangeMode(LabellingMode.Delete)}
                variant={mode === LabellingMode.Delete ? "secondary" : "outline"}>
                    <Eraser/>
                </Button>
                <Button size={"icon"}
                title={t("toolCase.rgvRoutePlanning.modeToggle.addObstacle")}
                onClick={() => onChangeMode(LabellingMode.Add)}
                variant={mode === LabellingMode.Add ? "secondary" : "outline"}>
                    <Plus/>
                </Button>
                <Button size={"icon"}
                title={t("toolCase.rgvRoutePlanning.modeToggle.editTile")}
                onClick={() => onChangeMode(LabellingMode.Edit)}
                variant={mode === LabellingMode.Edit ? "secondary" : "outline"}>
                    <SquarePen/>
                </Button>
                <Button size={"icon"}
                title={t("toolCase.rgvRoutePlanning.modeToggle.addSolutionPath")}
                onClick={() => onChangeMode(LabellingMode.Solve)}
                variant={mode === LabellingMode.Solve ? "secondary" : "outline"}>
                    <ArrowBigUp/>
                </Button>
                <Separator orientation='vertical' className='h-5'/>
                <Button size={"icon"}
                title={t("toolCase.rgvRoutePlanning.modeToggle.resetMap")}
                onClick={handleResetMap}
                variant={"outline"}>
                    <RotateCcw/>
                </Button>
                <Button size={"icon"}
                title={t("toolCase.rgvRoutePlanning.modeToggle.automatedLabelling")}
                onClick={handleAutomatedLabelling}
                variant={"outline"}>
                    <Workflow/>
                </Button>
            </div>
        </div>
    );
}
 
export default ModeToggle;