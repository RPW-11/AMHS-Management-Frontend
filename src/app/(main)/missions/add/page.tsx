"use client";
import CustomDatePicker from "@/components/custom-date-picker";
import SelectOption from "@/components/select-option";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToolCaseRoutes } from "@/constants/general";
import {
  MISSION_CATEGORIES_OPTIONS,
  MissionCategory,
} from "@/constants/mission";
import { useAddMission } from "@/hooks/mission/useAddMission";
import { getOption } from "@/utils/general-util";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AddMissionPage = () => {
  const { push } = useRouter();
  const {
    addMissionForm,
    setAddMissionForm,
    errorsForm,
    addMissionApi,
    validateMissionForm,
  } = useAddMission();

  const handleAddMission = async () => {
    if(!validateMissionForm(addMissionForm)){
        return
    }
    
    const error = await addMissionApi(addMissionForm);
    if (error) {
        toast.error(error.title)
        return
    }
    toast.success(`The mission ${addMissionForm.name} has been created`)
    push(ToolCaseRoutes.RgvRoutePlanning);
  };

  return (
    <div className="rounded-md p-4 bg-white border space-y-4">
      <div className="space-y-2">
        <h2 className="font-semibold text-lg">Add a mission.</h2>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-4 lg:col-span-2 space-y-2">
          <Label>Name</Label>
          <Input
            value={addMissionForm.name}
            onChange={(e) =>
              setAddMissionForm({ ...addMissionForm, name: e.target.value })
            }
            placeholder="Enter the mission's name..."
            className="text-sm"
          />
          <p className="text-destructive text-xs">{ errorsForm.name }</p>
        </div>
        <div className="col-span-4 lg:col-span-2 space-y-2">
          <Label>Category</Label>
          <SelectOption
            value={getOption(
              MISSION_CATEGORIES_OPTIONS,
              addMissionForm.category.toString()
            )}
            options={MISSION_CATEGORIES_OPTIONS}
            onValueChange={(option) =>
              setAddMissionForm({
                ...addMissionForm,
                category: option.value as MissionCategory,
              })
            }
            labelName={"Mission Category"}
            placeholder={"Select mission category"}
          />
          <p className="text-destructive text-xs">{ errorsForm.category }</p>
        </div>
        <div className="col-span-4 space-y-2">
          <Label>Description</Label>
          <Textarea
            value={addMissionForm.description}
            onChange={(e) =>
              setAddMissionForm({
                ...addMissionForm,
                description: e.target.value,
              })
            }
            placeholder="Enter the mission's description..."
            className="text-sm"
          />
        </div>
        <div className="col-span-4 lg:col-span-2 space-y-2">
          <Label>Due Date</Label>
          <CustomDatePicker
            date={addMissionForm.dueDate}
            onDateChange={(newDate) =>
              setAddMissionForm({ ...addMissionForm, dueDate: newDate })
            }
          />
        </div>
        <div className="col-span-4 lg:col-span-2 space-y-2">
          <Label>Due Time</Label>
          <Input
            type="time"
            value={addMissionForm.dueTime}
            onChange={(e) =>
              setAddMissionForm({ ...addMissionForm, dueTime: e.target.value })
            }
          />
        </div>
        <p className="col-span-4 text-destructive text-xs">{ errorsForm.dueDateTime }</p>
      </div>
      <div className="flex justify-end">
        <Button size={"sm"} onClick={handleAddMission}>
          Add
        </Button>
      </div>
    </div>
  );
};

export default AddMissionPage;
