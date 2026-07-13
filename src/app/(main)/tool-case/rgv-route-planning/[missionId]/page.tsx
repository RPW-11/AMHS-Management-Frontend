"use client";
import ImageGridOverlay from "@/components/tool-case/image-grid-overlay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MissionRoutes } from "@/constants/general";
import { RoutePlanningAlgorithm } from "@/constants/tool-case";
import { useRgvRouteSolver } from "@/hooks/tool-case/useRgvRouteSolver";
import { createRoutePlanningFormStore } from "@/stores/useRoutePlanningFormStore";
import { getTranslatedRoutePlanningAlgorithms } from "@/utils/tool-case/route-planning";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const RgvRoutePlanningPage = () => {
    const queryClient = useQueryClient();
    const { submitRgvRoutePlan } = useRgvRouteSolver();
    const { push } = useRouter();
    const { missionId } = useParams();
    const { t } = useTranslation();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const routePlanningAlgorithms = useMemo(() => getTranslatedRoutePlanningAlgorithms(t), [t]);

    const useFormStore = useMemo(
        () => createRoutePlanningFormStore(missionId as string),
        [missionId]
    )
    const { form, setForm, resetForm } = useFormStore()
    
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setForm({ image: file});
        }
    };

    const handleRowDimChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ rowDim: Number(e.target.value) });
    };

    const handleColDimChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ colDim: Number(e.target.value) });
    };

    const handleWidthLengthChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setForm({ widthLength: Number(e.target.value) });
    };

    const handleHeightLengthChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setForm({ heightLength: Number(e.target.value) });
    };

    const handleChangeAlgorithm = (algorithm: RoutePlanningAlgorithm) =>
        setForm({ algorithm: algorithm });

    const getAlgorithmCardStyle = (algoName: string): string => {
        if (algoName === form.algorithm) {
            return "border-primary bg-accent text-primary";
        }
        return "hover:bg-gray-100";
    };

    const isAbleToProceed = (): boolean => {
        return (
            form.algorithm !== "" &&
            form.rowDim > 0 &&
            form.colDim > 0 &&
            form.image !== null &&
            form.points.length > 0 &&
            form.clusters.every((cluster) => cluster.stations.length > 0) &&
            form.clusterFlows.every((clusterFlow) => clusterFlow.clusterOrder.length > 1)
        );
    };

    const handleSubmitRgvPlan = async () => {
        if (!form.image || !missionId)
            throw new Error(t("toolCase.rgvRoutePlanning.toast.missingImageOrMission"));

        setIsSubmitting(true);

        const error = await submitRgvRoutePlan(
            { image: form.image, routeMetaData: { ...form } },
            missionId.toString(),
        );
        
        setIsSubmitting(false);

        if (error) {
            throw new Error(error.title);
        } else {
            queryClient.invalidateQueries({ queryKey: ["missions"] });
        }
    };

    const handleSubmitRgvPlanWithToast = () => {
        if (!missionId) return;
        toast.promise(handleSubmitRgvPlan, {
            success: () => {
                resetForm()
                push(MissionRoutes.Missions);
                return t("toolCase.rgvRoutePlanning.toast.processing");
            },
            loading: t("toolCase.rgvRoutePlanning.toast.solving"),
            error: (err) => (err as Error).message,
        });
    };

    return (
        <div className="bg-white rounded-md p-4 border space-y-4">
            <div>
                <h1 className="font-bold text-lg">{t("toolCase.rgvRoutePlanning.title")}</h1>
                <p className="text-muted-foreground text-sm">
                    {t("toolCase.rgvRoutePlanning.pageSubtitle")}
                </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                    <Label>{t("toolCase.rgvRoutePlanning.uploadImage")}</Label>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>{t("toolCase.rgvRoutePlanning.rowDimension")}</Label>
                    <Input
                        type="number"
                        value={form.rowDim}
                        onChange={handleRowDimChange}
                    />
                    <p className="text-xs text-muted-foreground">
                        {t("toolCase.rgvRoutePlanning.rowDimensionHelper")}
                    </p>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>{t("toolCase.rgvRoutePlanning.columnDimension")}</Label>
                    <Input
                        type="number"
                        value={form.colDim}
                        onChange={handleColDimChange}
                    />
                    <p className="text-xs text-muted-foreground">
                        {t("toolCase.rgvRoutePlanning.columnDimensionHelper")}
                    </p>
                </div>

                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>{t("toolCase.rgvRoutePlanning.widthLength")}</Label>
                    <Input
                        type="number"
                        value={form.widthLength}
                        onChange={handleWidthLengthChange}
                    />
                    <p className="text-xs text-muted-foreground">
                        {t("toolCase.rgvRoutePlanning.widthLengthHelper")}
                    </p>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>{t("toolCase.rgvRoutePlanning.heightLength")}</Label>
                    <Input
                        type="number"
                        value={form.heightLength}
                        onChange={handleHeightLengthChange}
                    />
                    <p className="text-xs text-muted-foreground">
                        {t("toolCase.rgvRoutePlanning.heightLengthHelper")}
                    </p>
                </div>

                <div className="col-span-2 space-y-2">
                    <Label>{t("toolCase.rgvRoutePlanning.algorithms")}</Label>
                    <div className="grid grid-cols-2 gap-2">
                        {routePlanningAlgorithms.map((algo) => (
                            <Label
                                key={algo.value}
                                className={`col-span-3 lg:col-span-1 p-4 rounded-md border items-start cursor-pointer ${getAlgorithmCardStyle(algo.value)}`}
                                onClick={() => handleChangeAlgorithm(algo.value)}
                            >
                                <div className="space-y-1 font-normal">
                                    <h3 className="font-medium">{algo.name}</h3>
                                    <p className="text-muted-foreground text-sm">
                                        {algo.description}
                                    </p>
                                </div>
                            </Label>
                        ))}
                    </div>
                </div>
            </div>
            {form.image && (
                <ImageGridOverlay
                    rgvPathPlan={{ ...form }}
                    onChangePlan={setForm}
                />
            )}
            <div className="flex justify-end">
                <Button
                    disabled={!isAbleToProceed() || isSubmitting}
                    onClick={handleSubmitRgvPlanWithToast}
                >
                    {t("toolCase.rgvRoutePlanning.submit")}
                </Button>
            </div>
        </div>
    );
};

export default RgvRoutePlanningPage;
