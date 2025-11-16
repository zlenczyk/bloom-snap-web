"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  EnvironmentFieldsEnum,
  NotesFieldsEnum,
  OverviewFieldsEnum,
  TabEnum,
  tabFieldInputs,
} from "@/lib/data/plantDetailsTypes";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Leaf, Sprout } from "lucide-react";
import { startTransition, useActionState, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { getCurrentIsoDate } from "../utils";
import addPlant, { AddPlantFormState } from "./actions";
import CareNotesTab from "./CareNotesTab";
import EnvironmentTab from "./EnvironmentTab";
import OverviewTab from "./OverviewTab";
import PhotosTab from "./PhotosTab";
import { AddPlantForm, AddPlantFormSchema } from "./schema";

const initialState: AddPlantFormState = {
  errors: {},
  message: "",
  success: false,
};

const AddPlant = () => {
  const [images, setImages] = useState<(File | null)[]>(Array(5).fill(null));
  const [activeTab, setActiveTab] = useState("overview");

  const [state, formAction, isPending] = useActionState<
    AddPlantFormState,
    FormData
  >(addPlant, initialState);

  const form = useForm<AddPlantForm>({
    resolver: zodResolver(AddPlantFormSchema),
    defaultValues: {
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
      // pictures: undefined,
    },
  });

  const getTabsWithErrors = () => {
    const errors = form.formState.errors;
    const errorFields = Object.keys(errors);

    const tabsWithErrors = [];

    for (const [tabName, fields] of Object.entries(tabFieldInputs)) {
      if (fields.some((field) => errorFields.includes(field))) {
        tabsWithErrors.push(tabName);
      }
    }

    return tabsWithErrors;
  };

  useEffect(() => {
    const tabsWithErrors = getTabsWithErrors();
    if (tabsWithErrors.length > 0) {
      setActiveTab(tabsWithErrors[0]);
    }
  }, [form.formState.errors]);

  const tabsWithErrors = getTabsWithErrors();

  const onSubmit: SubmitHandler<AddPlantForm> = async (data) => {
    console.log("data: ", JSON.stringify(data));
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof Date) {
        formData.append(key, getCurrentIsoDate(value));
      }

      if (value === true || value === false) {
        formData.append(key, value ? "true" : "false");
        return;
      }

      if (!value) {
        return;
      }

      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
        return;
      }

      formData.append(key, value.toString());
    });

    for (const [key, value] of formData.entries()) {
      console.log(key + ": " + value);
    }

    startTransition(() => formAction(formData));
  };

  return (
    <div
      className="max-w-3xl mx-auto p-4 flex justify-center items-center w-full h-screen"
      style={{
        maxHeight: "calc(100dvh - var(--header-height))",
      }}
    >
      <Card className="max-h-[720px] flex flex-col h-full">
        <CardHeader className="space-y-1 rounded-t-lg border-b shrink-0">
          <div className="flex items-center gap-2">
            <Sprout className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            <CardTitle className="text-2xl">Add New Plant</CardTitle>
          </div>
          <CardDescription>
            Track your plant's details and care information
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form
            action={formAction}
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col"
          >
            <CardContent className="flex-1 flex p-0">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full gap-6 overflow-y-auto px-6 pt-6"
              >
                <TabsList className="grid grid-cols-4 w-full shrink-0">
                  <TabsTrigger
                    value={TabEnum.Overview}
                    className={cn(
                      tabsWithErrors.includes(TabEnum.Overview) &&
                        "text-destructive",
                      activeTab === TabEnum.Overview &&
                        tabsWithErrors.includes(TabEnum.Overview) &&
                        "outline-1 outline-destructive outline-offset-[-1px] bg-destructive/10 hover:bg-destructive/20"
                    )}
                  >
                    Overview
                    {tabsWithErrors.includes(TabEnum.Overview) && (
                      <span className="text-destructive">●</span>
                    )}
                  </TabsTrigger>

                  <TabsTrigger
                    value={TabEnum.Environment}
                    className={cn(
                      tabsWithErrors.includes(TabEnum.Environment) &&
                        "text-destructive",
                      activeTab === TabEnum.Environment &&
                        tabsWithErrors.includes(TabEnum.Environment) &&
                        "outline-1 outline-destructive outline-offset-[-1px] bg-destructive/10 hover:bg-destructive/20"
                    )}
                  >
                    Environment
                    {tabsWithErrors.includes(TabEnum.Environment) && (
                      <span className="text-destructive">●</span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger
                    value={TabEnum.Notes}
                    className={cn(
                      tabsWithErrors.includes(TabEnum.Notes) &&
                        "text-destructive",
                      activeTab === TabEnum.Notes &&
                        tabsWithErrors.includes(TabEnum.Notes) &&
                        "outline-1 outline-destructive outline-offset-[-1px] bg-destructive/10 hover:bg-destructive/20"
                    )}
                  >
                    Care Notes
                    {tabsWithErrors.includes(TabEnum.Notes) && (
                      <span className="text-destructive">●</span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="photos">Photos</TabsTrigger>
                </TabsList>

                <TabsContent
                  value="overview"
                  forceMount
                  className="data-[state=inactive]:hidden p-1"
                >
                  <OverviewTab form={form} state={state} />
                </TabsContent>

                <TabsContent
                  value="environment"
                  forceMount
                  className="data-[state=inactive]:hidden p-1"
                >
                  <EnvironmentTab form={form} state={state} />
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
                  <PhotosTab form={form} state={state} />
                </TabsContent>
              </Tabs>
            </CardContent>

            <CardFooter className="flex justify-end gap-2 border-t bg-muted/20 p-6 shrink-0">
              <Button variant="outline">Cancel</Button>
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Leaf className="mr-2 h-4 w-4" />
                Add Plant
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default AddPlant;
