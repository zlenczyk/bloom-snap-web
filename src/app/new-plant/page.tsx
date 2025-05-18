"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
// import { PopoverTrigger } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarIcon, ImagePlus, Trash } from "lucide-react";
import { useActionState, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CultivationType } from "./CultivationType";
import NewPlantFormSchema from "./schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputClearButton } from "./InputClearButton";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { RadioGroupItem } from "@radix-ui/react-radio-group";
import addPlant, { AddPlantFormState } from "./actions";
import { Separator } from "@/components/ui/separator";

type FormSchema = z.infer<typeof NewPlantFormSchema>;

const initialState: AddPlantFormState = {
  errors: {},
  message: "",
  success: false,
};

const NewPlant = () => {
  const [images, setImages] = useState<(File | null)[]>(Array(5).fill(null));
  // const [date, setDate] = useState<Date>();
  // const [isisAirCleaning, setIsisAirCleaning] = useState<boolean | null>(null);

  const [formValues, setFormValues] = useState<FormSchema>();

  const [state, formAction, isPending] = useActionState<
    AddPlantFormState,
    FormData
  >(addPlant, initialState);

  const handleUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = file;
      setImages(updatedImages);
    }
  };

  const handleDelete = (index: number) => {
    const updatedImages = [...images];
    updatedImages[index] = null;
    setImages(updatedImages);
  };

  const handleInputChange =
    (field: keyof FormSchema) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      setFormValues((prev) => {
        return { ...prev, [field]: value };
      });
    };

  const handleClear = (field: keyof FormSchema) => () => {
    setFormValues((prev) => {
      return { ...prev, [field]: null };
    });
  };

  // const form = useForm<z.infer<typeof NewPlantFormSchema>>({
  //   resolver: zodResolver(NewPlantFormSchema),
  //   defaultValues: {
  //     commonName: "",
  //     date: new Date(),
  //     description: "",
  //     genus: "",
  //     nickname: "",
  //     pictures: [],
  //     source: "",
  //     species: "",
  //   },
  // });

  const form = useForm<z.infer<typeof NewPlantFormSchema>>({
    resolver: zodResolver(NewPlantFormSchema),
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
      isHealthy: "null",
      windowDirection: "null",
      isBlooming: "null",
      isAirCleaning: "null",
      // pictures: undefined,
    },
  });

  return (
    <div className="w-full p-8 max-w-6xl">
      <h2 className="text-2xl font-bold mb-6">Add new plant</h2>
      <Form {...form}>
        <form
          action={formAction}
          className="space-y-6 mx-auto p-6 bg-white rounded-lg shadow-sm"
        >
          <div className="grid grid-cols-5 gap-8">
            <div className="col-start-1 col-end-4 flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="commonName"
                  render={({ field }) => (
                    <FormItem className="gap-3">
                      <FormLabel>
                        Common name *
                        <span className="font-light text-gray-500 leading-none">
                          (required)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Philodendron pink princess"
                          autoComplete="on"
                          {...field}
                        />
                      </FormControl>
                      {/* <FormInputErrorMessage inputName="username" /> */}
                      {state?.errors?.commonName && (
                        <p className="text-sm text-destructive">
                          {state.errors.commonName[0]}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="species"
                  render={({ field }) => (
                    <FormItem className="gap-3">
                      <FormLabel>Species</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Philodendron"
                          autoComplete="on"
                          {...field}
                        />
                      </FormControl>
                      {/* <FormInputErrorMessage inputName="username" /> */}
                      {state?.errors?.species && (
                        <p className="text-sm text-destructive">
                          {state.errors.species[0]}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="genus"
                  render={({ field }) => (
                    <FormItem className="gap-3">
                      <FormLabel>Genus</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="P. erubescens 'Pink Princess'"
                          autoComplete="on"
                          {...field}
                        />
                      </FormControl>
                      {state?.errors?.genus && (
                        <p className="text-sm text-destructive">
                          {state.errors.genus[0]}
                        </p>
                      )}
                      {/* <FormInputErrorMessage inputName="username" /> */}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nickname"
                  render={({ field }) => (
                    <FormItem className="gap-3">
                      <FormLabel>Nickname</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Sorceress of the Pink Grove"
                          autoComplete="on"
                          {...field}
                        />
                      </FormControl>
                      {state?.errors?.nickname && (
                        <p className="text-sm text-destructive">
                          {state.errors.nickname[0]}
                        </p>
                      )}
                      {/* <FormInputErrorMessage inputName="username" /> */}
                    </FormItem>
                  )}
                />
              </div>
              <Separator />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="gap-3">
                    <FormLabel>How’s It Growing?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share anything you’d like - how it makes you feel, any stories you have, or tips for caring for it. Enter up to 250 characters."
                        autoComplete="on"
                        {...field}
                      />
                    </FormControl>
                    {state?.errors?.description && (
                      <p className="text-sm text-destructive">
                        {state.errors.description[0]}
                      </p>
                    )}
                    {/* <FormInputErrorMessage inputName="username" /> */}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem className="gap-3">
                    <FormLabel>Where you get it?</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name of the shop, a gift from a friend, or a special find"
                        autoComplete="on"
                        {...field}
                      />
                    </FormControl>
                    {state?.errors?.source && (
                      <p className="text-sm text-destructive">
                        {state.errors.source[0]}
                      </p>
                    )}
                    {/* <FormInputErrorMessage inputName="username" /> */}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastRepotted"
                render={({ field }) => (
                  <FormItem className="gap-3">
                    <FormLabel>Last time repotted</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon />
                            {/* {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )} */}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            startMonth={new Date(1950, 0, 1)}
                            endMonth={new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    {state?.errors?.lastRepotted && (
                      <p className="text-sm text-destructive">
                        {state.errors.lastRepotted[0]}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roomLocation"
                render={({ field }) => (
                  <FormItem className="gap-3">
                    <FormLabel>Which room/place is it in?</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Living room, bedroom, office, balcony, outdoor, etc."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isAirCleaning"
                render={({ field }) => (
                  <FormItem className="gap-3">
                    <FormLabel>Does it purify the air?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        id="isAirCleaning"
                        defaultValue={formValues?.isAirCleaning}
                        onValueChange={field.onChange}
                        value={field.value}
                        // className="flex flex-col space-y-1"
                        className="flex flex-col"
                      >
                        <FormItem className="flex items-center space-y-0">
                          <FormControl>
                            <RadioGroupItem value="null" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Do not specify
                          </FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-y-0">
                          <FormControl>
                            <RadioGroupItem value="true" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-y-0">
                          <FormControl>
                            <RadioGroupItem value="false" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isPetSafe"
                render={({ field }) => (
                  <FormItem className="gap-3">
                    <FormLabel>Is it safe for pets?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        id="isPetSafe"
                        defaultValue={formValues?.isPetSafe}
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-y-0">
                          <FormControl>
                            <RadioGroupItem value="null" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Do not specify
                          </FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-y-0">
                          <FormControl>
                            <RadioGroupItem value="true" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-y-0">
                          <FormControl>
                            <RadioGroupItem value="false" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isHealthy"
                render={({ field }) => (
                  <FormItem className="gap-3">
                    <FormLabel>Is it healthy now?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        id="isHealthy"
                        defaultValue={formValues?.isHealthy}
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-y-0">
                          <FormControl>
                            <RadioGroupItem value="null" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Do not specify
                          </FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-y-0">
                          <FormControl>
                            <RadioGroupItem value="true" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-y-0">
                          <FormControl>
                            <RadioGroupItem value="false" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="windowDirection"
                render={({ field }) => (
                  <FormItem className="gap-3">
                    <FormLabel>Window direction</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a direction" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="null">Do not specify</SelectItem>
                          <SelectItem value="north">North</SelectItem>
                          <SelectItem value="south">South</SelectItem>
                          <SelectItem value="east">East</SelectItem>
                          <SelectItem value="west">West</SelectItem>
                          <SelectItem value="northeast">Northeast</SelectItem>
                          <SelectItem value="northwest">Northwest</SelectItem>
                          <SelectItem value="southeast">Southeast</SelectItem>
                          <SelectItem value="southwest">Southwest</SelectItem>
                          <SelectItem value="artificial">
                            Artificial light only
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isBlooming"
                render={({ field }) => (
                  <FormItem className="gap-3">
                    <FormLabel>Is it blooming now?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        id="isBlooming"
                        defaultValue={formValues?.isBlooming}
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-y-0">
                          <FormControl>
                            <RadioGroupItem value="null" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Do not specify
                          </FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-y-0">
                          <FormControl>
                            <RadioGroupItem value="true" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-y-0">
                          <FormControl>
                            <RadioGroupItem value="false" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem className="gap-3">
                    <FormLabel>Cultivation type</FormLabel>
                    <FormControl>
                      {/* <Input
                        placeholder="Name of the shop, a gift from a friend, or a special find"
                        autoComplete="on"
                        {...field}
                      /> */}
                      <CultivationType />
                    </FormControl>
                    {/* <FormInputErrorMessage inputName="username" /> */}
                  </FormItem>
                )}
              />
            </div>

            <div className="col-start-4 col-end-6">
              <FormField
                control={form.control}
                name="ownedSince"
                render={({ field }) => (
                  <FormItem className="gap-3">
                    <FormLabel>When did you get the plant?</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon />
                            {/* {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )} */}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            startMonth={new Date(1950, 0, 1)}
                            endMonth={new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="pictures"
                render={({ field }) => (
                  <FormItem className="gap-3">
                    <FormLabel>Pictures (up to 5)</FormLabel>
                    <FormControl>
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          {images.map((image, index) => (
                            <Card
                              key={index}
                              className="relative aspect-square overflow-hidden p-0"
                            >
                              <CardContent className="p-0">
                                {image ? (
                                  <div className="relative w-full h-full">
                                    <img
                                      src={URL.createObjectURL(image)}
                                      alt={`Preview ${index + 1}`}
                                      className="object-cover w-full h-full"
                                    />
                                    <Button
                                      variant="ghost"
                                      className="absolute top-2 right-2"
                                      onClick={() => handleDelete(index)}
                                    >
                                      <Trash className="h-6 w-6 text-red-500" />
                                      <span className="sr-only">
                                        Delete image
                                      </span>
                                    </Button>
                                  </div>
                                ) : (
                                  <Button
                                    variant="ghost"
                                    className="absolute inset-0 w-full h-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                                  >
                                    <ImagePlus className="h-6 w-6" />
                                    <input
                                      type="file"
                                      accept="image/*,application/pdf"
                                      className="absolute inset-0 opacity-0 cursor-pointer"
                                      onChange={(event) =>
                                        handleUpload(event, index)
                                      }
                                    />
                                    <span className="sr-only">Add image</span>
                                  </Button>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              /> */}
            </div>
          </div>

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewPlant;
