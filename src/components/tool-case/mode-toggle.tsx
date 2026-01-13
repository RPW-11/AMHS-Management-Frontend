import { LabellingMode } from "@/constants/tool-case";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { ArrowBigUp, Eraser, Plus, RotateCcw, SquarePen, Workflow } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";

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
    return (
        <div className="space-y-2">
            <Label>Map tools</Label>
            <div className="flex gap-2">
                <Button size={"icon"}
                title='Erase tile'
                onClick={() => onChangeMode(LabellingMode.Delete)} 
                variant={mode === LabellingMode.Delete ? "secondary" : "outline"}>
                    <Eraser/>
                </Button>
                <Button size={"icon"}
                title='Add obstacle' 
                onClick={() => onChangeMode(LabellingMode.Add)} 
                variant={mode === LabellingMode.Add ? "secondary" : "outline"}>
                    <Plus/>
                </Button>
                <Button size={"icon"}
                title='Edit tile' 
                onClick={() => onChangeMode(LabellingMode.Edit)} 
                variant={mode === LabellingMode.Edit ? "secondary" : "outline"}>
                    <SquarePen/>
                </Button>
                <Button size={"icon"}
                title='Add solution path' 
                onClick={() => onChangeMode(LabellingMode.Solve)} 
                variant={mode === LabellingMode.Solve ? "secondary" : "outline"}>
                    <ArrowBigUp/>
                </Button>
                <Separator orientation='vertical' className='h-5'/>
                <Button size={"icon"}
                title='Reset map' 
                onClick={handleResetMap} 
                variant={"outline"}>
                    <RotateCcw/>
                </Button>
                <Button size={"icon"}
                title='Automated labelling' 
                onClick={handleAutomatedLabelling} 
                variant={"outline"}>
                    <Workflow/>
                </Button>
            </div>
        </div>
    );
}
 
export default ModeToggle;