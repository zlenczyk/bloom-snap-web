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
import { zodResolver } from "@hookform/resolvers/zod";
import { Leaf, Sprout } from "lucide-react";
import { useActionState, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { getCurrentIsoDate } from "../utils";
import addPlant, { AddPlantFormState } from "./actions";
import BasicInfoTab from "./BasicInfoTab";
import CareDetailsTab from "./CareDetailsTab";
import PlantStatusTab from "./PlantStatusTab";
import { AddPlantFormInputSchema } from "./schema";
// import AddPlantFormSchema from "./_schema";

//remove any from states!!!

type FormSchema = z.infer<typeof AddPlantFormInputSchema>;

const initialState: AddPlantFormState = {
  errors: {},
  message: "",
  success: false,
};

const AddPlant = () => {
  const [images, setImages] = useState<(File | null)[]>(Array(5).fill(null));

  const [state, formAction, isPending] = useActionState<
    AddPlantFormState,
    FormData
  >(addPlant, initialState);

  const form = useForm<FormSchema>({
    resolver: zodResolver(AddPlantFormInputSchema),
    defaultValues: {
      commonName: "",
      species: "",
      genus: "",
      nickname: "",
      description: "",
      source: "",
      ownedSince: undefined,
      lastRepotted: undefined,
      roomLocation: "",
      isPetSafe: "null",
      // isHealthy: "null" as unknown as null,
      // windowDirection: "null" as unknown as null,
      // lightExposure: "null" as unknown as null,
      // isBlooming: "null" as unknown as null,
      // isAirCleaning: "null" as unknown as null,
      // growingMedium: "null" as unknown as null,
      // pottingMix: [],
      // pictures: undefined,
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    console.log("data: ", JSON.stringify(data));
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof Date) {
        formData.append(key, getCurrentIsoDate(value));
      }

      if (value === undefined || value === null) {
        return;
      }

      formData.append(key, value.toString());
    });

    for (const [key, value] of formData.entries()) {
      console.log(key + ": " + value);
    }

    formAction(formData);
  };

  return (
    <div className="container mx-auto px-4">
      <Form {...form}>
        <form
          action={formAction}
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <Card className="max-w-3xl mx-auto">
            <CardHeader className="space-y-1 rounded-t-lg border-b">
              <div className="flex items-center gap-2">
                <Sprout className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                <CardTitle className="text-2xl">Add New Plant</CardTitle>
              </div>
              <CardDescription>
                Track your plant's details and care information
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6">
              <Tabs defaultValue="basic" className="w-full gap-6">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="care">Care Details</TabsTrigger>
                  <TabsTrigger value="status">Plant Status</TabsTrigger>
                </TabsList>

                <TabsContent
                  value="basic"
                  forceMount
                  className="data-[state=inactive]:hidden"
                >
                  <BasicInfoTab form={form} state={state} />
                </TabsContent>

                <TabsContent
                  value="care"
                  forceMount
                  className="data-[state=inactive]:hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CareDetailsTab form={form} state={state} />
                  </div>
                </TabsContent>

                <TabsContent
                  value="status"
                  forceMount
                  className="data-[state=inactive]:hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <PlantStatusTab form={form} state={state} />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>

            <CardFooter className="flex justify-end gap-2 border-t bg-muted/20 p-6">
              <Button variant="outline">Cancel</Button>
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Leaf className="mr-2 h-4 w-4" />
                Add Plant
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default AddPlant;
