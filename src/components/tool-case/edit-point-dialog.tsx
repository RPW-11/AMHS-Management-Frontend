import { RgvPathPoint } from "@/types/toolcase";
import { Option } from "@/types/general";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import SelectOption from "../select-option";
import { Button } from "../ui/button";
import { useState } from "react";
import { POINT_CATEGORY_OPTIONS, PointCategory } from "@/constants/tool-case";
import { getPointCategoryByStr } from "@/utils/tool-case/route-planning";

interface EditPointDialogProps {
    currPoint: RgvPathPoint;
    onEdit: (newPoint: RgvPathPoint | null) => void;
}

const EditPointDialog = ({
    currPoint,
    onEdit
}: EditPointDialogProps) => {
    const [localPoint, setLocalPoint] = useState<RgvPathPoint>(currPoint)

    const formatPointToOption = (): Option => {
        return localPoint.category === PointCategory.Obstacle ? POINT_CATEGORY_OPTIONS[0] : localPoint.category === PointCategory.Station ? POINT_CATEGORY_OPTIONS[1] : { name: "", value: "" }
    }

    const changePointType = (value: Option) => setLocalPoint({...localPoint, category:  getPointCategoryByStr(value.value)})

    const changePointName = (value: string) => setLocalPoint({...localPoint, name: value })

    const changeProcessingTime = (value: string) => setLocalPoint({...localPoint, time: Number(value)})

    const canSavePoint = () => {
        return localPoint.name !== "" && localPoint.category !== PointCategory.None
    }

    const handleSavePoint = () => onEdit(localPoint)

    return (
        <Dialog open={currPoint !== null} onOpenChange={() => onEdit(null)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Point</DialogTitle>
                    <DialogDescription>
                        Fill the information of the point
                    </DialogDescription>
                </DialogHeader>
                <div className='grid grid-cols-2 gap-4'>
                    <div className="col-span-2 space-y-2">
                        <Label>Point Name</Label>
                        <Input value={localPoint.name} onChange={(e) => changePointName(e.target.value)} placeholder='Enter the point name'/>
                    </div>
                    <div className="col-span-2 lg:col-span-1 space-y-2">
                        <Label>Point Type</Label>
                        <SelectOption 
                        value={formatPointToOption()}
                        options={POINT_CATEGORY_OPTIONS}
                        onValueChange={changePointType}
                        labelName='Point Type'
                        placeholder='Select point type'
                        />
                    </div>
                    <div className="col-span-2 lg:col-span-1 space-y-2">
                        <Label>Processing time (s)</Label>
                        <Input value={localPoint.time} onChange={(e) => changeProcessingTime(e.target.value)} placeholder='Enter the processing time' type='number'/>
                    </div>
                    <div className="col-span-2 flex justify-end">
                        <Button onClick={handleSavePoint} disabled={!canSavePoint()}>Save</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default EditPointDialog;