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
import { Popover, PopoverContent } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarIcon, ImagePlus, Trash } from "lucide-react";
import { useState } from "react";
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

type FormSchema = z.infer<typeof NewPlantFormSchema>;

const NewPlant = () => {
  const [images, setImages] = useState<(File | null)[]>(Array(5).fill(null));
  const [date, setDate] = useState<Date>();
  // const [isAirCleaner, setIsAirCleaner] = useState<boolean | null>(null);

  const [formValues, setFormValues] = useState<FormSchema>();

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
      species: null,
      genus: null,
      commonName: null,
      nickname: null,
      description: null,
      source: null,
      date: null,
      lastRepotted: null,
      roomLocation: null,
      petSafe: null,
      healthStatus: null,
      windowDirection: null,
      isBlooming: null,
      airCleaner: null,
      pictures: [],
    },
  });

  return (
    <div className="w-full p-8 max-w-6xl">
      <h2 className="text-2xl font-bold mb-6">Add new plant</h2>
      <Form {...form}>
        <form className="space-y-6 mx-auto p-6 bg-white rounded-lg shadow-sm">
          <div className="grid grid-cols-5 gap-8">
            <div className="col-start-1 col-end-4 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="species"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Species</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Philodendron"
                          autoComplete="on"
                          onChange={() => handleInputChange("species")}
                          {...field}
                        />
                      </FormControl>
                      {/* <FormInputErrorMessage inputName="username" /> */}
                    </FormItem>
                  )}

                  <Input
                          placeholder="Philodendron"
                          autoComplete="on"
                          onChange={() => handleInputChange("species")}
                          {...field}
                        />

                />
                <FormField
                  control={form.control}
                  name="genus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Genus</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="P. erubescens 'Pink Princess'"
                          autoComplete="on"
                          {...field}
                        />
                      </FormControl>
                      {/* <FormInputErrorMessage inputName="username" /> */}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="commonName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Common name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Philodendron pink princess"
                          autoComplete="on"
                          {...field}
                        />
                      </FormControl>
                      {/* <FormInputErrorMessage inputName="username" /> */}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nickname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nickname</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Sorceress of the Pink Grove"
                          autoComplete="on"
                          {...field}
                        />
                      </FormControl>
                      {/* <FormInputErrorMessage inputName="username" /> */}
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How’s It Growing?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share anything you’d like - how it makes you feel, any stories you have, or tips for caring for it. Enter up to 250 characters."
                        autoComplete="on"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormInputErrorMessage inputName="username" /> */}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Where you get it?</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name of the shop, a gift from a friend, or a special find"
                        autoComplete="on"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormInputErrorMessage inputName="username" /> */}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastRepotted"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last time repotted</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon />
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            startMonth={new Date(1950, 0, 1)}
                            endMonth={new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roomLocation"
                render={({ field }) => (
                  <FormItem>
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
                name="airCleaner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is it an air cleaner?</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                      {isAirCleaner && (
                        <InputClearButton
                          className="absolute right-8 top-0 h-full"
                          onClear={handleClear}
                        />
                      )}
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="petSafe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is it safe for pets?</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="healthStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Is it healthy / does it have some problems?
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe any issues like yellowing leaves, pests, or if it's thriving"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="windowDirection"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Window direction</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a direction" />
                        </SelectTrigger>
                        <SelectContent>
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
                  <FormItem>
                    <FormLabel>Is it blooming?</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
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
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>When did you get the plant?</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon />
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            startMonth={new Date(1950, 0, 1)}
                            endMonth={new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pictures"
                render={({ field }) => (
                  <FormItem>
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
              />
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
