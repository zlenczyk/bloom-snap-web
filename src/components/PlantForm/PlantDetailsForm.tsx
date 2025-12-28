"use client";

import addPlant from "@/app/add-plant/actions";
import updatePlant from "@/app/my-collection/[id]/actions/updatePlant";
import {
  EnvironmentFieldsEnum,
  GrowingMediumEnum,
  LightExposureEnum,
  NotesFieldsEnum,
  OverviewFieldsEnum,
  PhotosFieldsEnum,
  TabEnum,
  tabFieldInputs,
  WindowDirectionEnum,
} from "@/app/my-collection/[id]/PlantDetails/types";
import { PlantWithAbsolutePhotoUrls } from "@/app/my-collection/types";
import CareNotesTab from "@/components/PlantForm/CareNotesTab";
import EnvironmentTab from "@/components/PlantForm/EnvironmentTab";
import OverviewTab from "@/components/PlantForm/OverviewTab";
import PhotosTab from "@/components/PlantForm/PhotosTab";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, getCurrentIsoDate } from "@/lib/utils";
import { PlantForm } from "@/lib/validations/plant";
import { Image as ImageIcon, Leaf, Notebook, Sprout, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { PlantFormState } from "./types";

const initialState: PlantFormState = {
  errors: {},
  message: "",
  success: false,
};

const TabIcons: Record<string, React.ReactNode> = {
  overview: <Sprout className="w-5 h-5" />,
  environment: <Sun className="w-5 h-5" />,
  notes: <Notebook className="w-5 h-5" />,
  photos: <ImageIcon className="w-5 h-5" />,
};

const defaultValues: PlantForm = {
  [OverviewFieldsEnum.CommonName]: "",
  [OverviewFieldsEnum.Species]: "",
  [OverviewFieldsEnum.Genus]: "",
  [OverviewFieldsEnum.Nickname]: "",
  [OverviewFieldsEnum.Description]: "",
  [OverviewFieldsEnum.Source]: "",
  [OverviewFieldsEnum.OwnedSince]: undefined,
  [OverviewFieldsEnum.IsSafe]: undefined,
  [OverviewFieldsEnum.IsAirPurifying]: undefined,
  [EnvironmentFieldsEnum.CurrentHeight]: "",
  [EnvironmentFieldsEnum.CurrentPotSize]: "",
  [NotesFieldsEnum.WateringNotes]: "",
  [NotesFieldsEnum.MistingNotes]: "",
  [NotesFieldsEnum.LeafCleaningNotes]: "",
  [NotesFieldsEnum.FertilizingNotes]: "",
  [NotesFieldsEnum.AdditionalNotes]: "",
  [EnvironmentFieldsEnum.Humidity]: "",
  [EnvironmentFieldsEnum.Temperature]: "",
  [EnvironmentFieldsEnum.LastRepotted]: undefined,
  [EnvironmentFieldsEnum.RoomLocation]: "",
  [EnvironmentFieldsEnum.WindowDirection]: undefined,
  [EnvironmentFieldsEnum.LightExposure]: undefined,
  [EnvironmentFieldsEnum.GrowingMedium]: undefined,
  [EnvironmentFieldsEnum.PottingMix]: [],
  [PhotosFieldsEnum.Photos]: [],
};

interface PlantFormProps {
  existingPlant?: PlantWithAbsolutePhotoUrls | null;
}

const PlantDetailsForm = ({ existingPlant }: PlantFormProps) => {
  const router = useRouter();
  const isEditing = !!existingPlant;
  const [activeTab, setActiveTab] = useState("overview");
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const today = new Date();
  const endMonth = new Date(
    today.getFullYear() + 100,
    today.getMonth(),
    today.getDate()
  );

  const action = isEditing
    ? updatePlant.bind(null, existingPlant.id)
    : addPlant;

  const [state, formAction, isPending] = useActionState(action, initialState);

  const form = useForm<PlantForm>({ defaultValues });
  const { reset, formState } = form;
  const { isDirty } = formState;

  useEffect(() => {
    if (!existingPlant) return;

    reset({
      [OverviewFieldsEnum.CommonName]: existingPlant.commonName ?? "",
      [OverviewFieldsEnum.Species]: existingPlant.species ?? "",
      [OverviewFieldsEnum.Genus]: existingPlant.genus ?? "",
      [OverviewFieldsEnum.Nickname]: existingPlant.nickname ?? "",
      [OverviewFieldsEnum.Description]: existingPlant.description ?? "",
      [OverviewFieldsEnum.Source]: existingPlant.source ?? "",
      [OverviewFieldsEnum.OwnedSince]: existingPlant.ownedSince
        ? new Date(existingPlant.ownedSince)
        : undefined,
      [OverviewFieldsEnum.IsSafe]: existingPlant.isSafe ?? undefined,
      [OverviewFieldsEnum.IsAirPurifying]:
        existingPlant.isAirPurifying ?? undefined,
      [EnvironmentFieldsEnum.CurrentHeight]: existingPlant.currentHeight ?? "",
      [EnvironmentFieldsEnum.CurrentPotSize]:
        existingPlant.currentPotSize ?? "",
      [EnvironmentFieldsEnum.Humidity]: existingPlant.humidity ?? "",
      [EnvironmentFieldsEnum.Temperature]: existingPlant.temperature ?? "",
      [EnvironmentFieldsEnum.LastRepotted]: existingPlant.lastRepotted
        ? new Date(existingPlant.lastRepotted)
        : undefined,
      [EnvironmentFieldsEnum.RoomLocation]: existingPlant.roomLocation ?? "",
      [EnvironmentFieldsEnum.WindowDirection]:
        existingPlant.windowDirection as WindowDirectionEnum | null,
      [EnvironmentFieldsEnum.LightExposure]:
        existingPlant.lightExposure as LightExposureEnum | null,
      [EnvironmentFieldsEnum.GrowingMedium]:
        existingPlant.growingMedium as GrowingMediumEnum | null,
      [EnvironmentFieldsEnum.PottingMix]: existingPlant.pottingMix ?? [],
      [NotesFieldsEnum.WateringNotes]: existingPlant.wateringNotes ?? "",
      [NotesFieldsEnum.MistingNotes]: existingPlant.mistingNotes ?? "",
      [NotesFieldsEnum.LeafCleaningNotes]:
        existingPlant.leafCleaningNotes ?? "",
      [NotesFieldsEnum.FertilizingNotes]: existingPlant.fertilizingNotes ?? "",
      [NotesFieldsEnum.AdditionalNotes]: existingPlant.additionalNotes ?? "",
      [PhotosFieldsEnum.Photos]: existingPlant.photos.map((p) => p.url),
    });
  }, [existingPlant, reset]);

  const getTabsWithErrors = () => {
    const errorFields = Object.keys(state.errors ?? {});
    return Object.entries(tabFieldInputs)
      .filter(([_, fields]) => fields.some((f) => errorFields.includes(f)))
      .map(([tab]) => tab);
  };

  const tabsWithErrors = getTabsWithErrors();

  useEffect(() => {
    if (tabsWithErrors.length > 0) setActiveTab(tabsWithErrors[0]);
  }, [state.errors]);

  const onSubmit: SubmitHandler<PlantForm> = (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof Date) {
        formData.append(key, getCurrentIsoDate(value));
      }

      if (value === true || value === false) {
        formData.append(key, value ? "true" : "false");
      }

      if (Array.isArray(value)) {
        value.forEach((v) => formData.append(key, v));
      }

      if (value) {
        formData.append(key, value.toString());
      }
    });

    startTransition(() => formAction(formData));
  };

  useEffect(() => {
    if (!state.message) {
      return;
    }

    if (state.success) {
      toast.success(state.message);

      router.push(`/my-collection/${state.id}`);
    } else {
      toast.error(state?.message || "Something went wrong");
    }
  }, [state.message]);

  const handleCancelClick = () => {
    if (isDirty) {
      setShowCancelDialog(true);

      return;
    }

    router.push(
      existingPlant ? `/my-collection/${existingPlant.id}` : "/my-collection"
    );
  };

  const handleConfirmCancel = () => {
    setShowCancelDialog(false);

    if (isEditing) {
      router.push(`/my-collection/${existingPlant!.id}`);

      return;
    }

    router.push("/my-collection");
  };

  return (
    <div
      className="max-w-3xl mx-auto w-full h-screen flex flex-col sm:justify-center sm:items-center p-0 sm:p-4"
      style={{ maxHeight: "calc(100dvh - var(--header-height))" }}
    >
      <Card className="w-full flex flex-col h-full max-h-[100dvh] sm:max-h-[720px] shadow-none sm:shadow rounded-none sm:rounded-lg">
        <CardHeader className="space-y-1 border-b p-4 sm:p-6 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-emerald-600 dark:text-emerald-400 text-2xl sm:text-3xl">
              🪴
            </span>
            <CardTitle className="text-xl sm:text-2xl">
              {isEditing ? "Edit Plant" : "Add New Plant"}
            </CardTitle>
          </div>
          <CardDescription className="text-sm sm:text-base">
            {isEditing
              ? "Update your plant's details"
              : "Track your plant's details and care information"}
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col flex-1"
          >
            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden relative">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full min-w-0 gap-6 overflow-y-auto px-4 pt-4 sm:px-6 sm:pt-6"
              >
                <TabsList className="grid grid-cols-4 w-full shrink-0">
                  {Object.values(TabEnum).map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className={cn(
                        tabsWithErrors.includes(tab) && "text-destructive",
                        activeTab === tab &&
                          tabsWithErrors.includes(tab) &&
                          "outline-1 outline-destructive outline-offset-[-1px] bg-destructive/10 hover:bg-destructive/20",
                        "flex items-center justify-center gap-2"
                      )}
                    >
                      <span className="sm:hidden">{TabIcons[tab]}</span>
                      <span className="hidden sm:inline">{tab}</span>
                      {tabsWithErrors.includes(tab) && (
                        <span className="text-destructive">●</span>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent
                  value="overview"
                  forceMount
                  className="data-[state=inactive]:hidden p-1"
                >
                  <OverviewTab form={form} state={state} endMonth={endMonth} />
                </TabsContent>
                <TabsContent
                  value="environment"
                  forceMount
                  className="data-[state=inactive]:hidden p-1"
                >
                  <EnvironmentTab
                    form={form}
                    state={state}
                    endMonth={endMonth}
                  />
                </TabsContent>
                <TabsContent
                  value="notes"
                  forceMount
                  className="data-[state=inactive]:hidden p-1"
                >
                  <CareNotesTab form={form} state={state} />
                </TabsContent>
                <TabsContent
                  value="photos"
                  forceMount
                  className="data-[state=inactive]:hidden p-1"
                >
                  <PhotosTab
                    form={form}
                    state={state}
                    existingPlant={existingPlant}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>

            <CardFooter className="flex justify-end gap-2 border-t bg-muted/20 p-4 sm:p-6 shrink-0">
              <Button
                variant="outline"
                type="button"
                onClick={handleCancelClick}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Leaf className="h-4 w-4" />
                {isPending
                  ? isEditing
                    ? "Saving..."
                    : "Adding..."
                  : isEditing
                  ? "Save Changes"
                  : "Add Plant"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Discard changes?" : "Abandon this plant?"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? "💔 Your fresh updates won’t reach this plant! Leaving now will keep it as it was."
                : "🌿 This plant isn’t part of your collection yet! Leaving now will send it back to the wild."}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCancelDialog(false)}
            >
              Keep Editing
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleConfirmCancel}
            >
              Discard changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlantDetailsForm;
