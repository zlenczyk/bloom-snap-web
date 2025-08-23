"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Leaf,
  MapPin,
  Shield,
  Heart,
  Wind,
  Calendar,
  Edit,
  PanelLeft,
  Droplet,
  Ruler,
  Maximize,
  Cloud,
  Thermometer,
  ImageIcon,
  Sun,
  Flower,
  Syringe,
  Compass,
} from "lucide-react";
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Helper function to format time ago
const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 30) {
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  } else if (diffDays <= 365) {
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths} month${diffMonths === 1 ? "" : "s"} ago`;
  } else {
    const diffYears = Math.floor(diffDays / 365);
    return `${diffYears} year${diffYears === 1 ? "" : "s"} ago`;
  }
};

export default function PlantDetail() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const plantImages = [
    "/assets/spider-plant-1.jpg",
    "/assets/spider-plant-2.webp",
    "/assets/fiddle-leaf-fig-1.webp",
    "/assets/fiddle-leaf-fig-2.jpg",
    "/assets/fiddle-leaf-fig-3.webp",
  ];

  const pottingMixComponents = [
    "Peat moss",
    "Perlite",
    "Vermiculite",
    "Bark chips",
    "Coconut coir",
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % plantImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + plantImages.length) % plantImages.length
    );
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        prevImage();
      } else if (event.key === "ArrowRight") {
        nextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleScrollToTimeline = () => {
    document
      .getElementById("plant-timeline")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const ownedSinceDate = "Mar 15, 2022";
  const lastRepottedDate = "May 10, 2023";

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50">
        <Sidebar side="left" variant="sidebar" collapsible="icon">
          <SidebarContent className="py-6">
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a
                      href="#plant-identity"
                      aria-label="Go to Plant Identity section"
                    >
                      <Leaf className="h-5 w-5" />
                      <span>Identity</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a
                      href="#plant-description"
                      aria-label="Go to Plant Description section"
                    >
                      <Leaf className="h-5 w-5" />
                      <span>Description</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a
                      href="#environmental-conditions"
                      aria-label="Go to Environmental Conditions section"
                    >
                      <Cloud className="h-5 w-5" />
                      <span>Environment</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a
                      href="#care-schedule"
                      aria-label="Go to Care Schedule section"
                    >
                      <Droplet className="h-5 w-5" />
                      <span>Care Schedule</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a
                      href="#physical-attributes"
                      aria-label="Go to Physical Attributes section"
                    >
                      <Ruler className="h-5 w-5" />
                      <span>Physical</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#attributes" aria-label="Go to Attributes section">
                      <Shield className="h-5 w-5" />
                      <span>Attributes</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a
                      href="#ownership-history"
                      aria-label="Go to Ownership & History section"
                    >
                      <Heart className="h-5 w-5" />
                      <span>Ownership</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#location" aria-label="Go to Location section">
                      <MapPin className="h-5 w-5" />
                      <span>Location</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a
                      href="#growing-medium"
                      aria-label="Go to Growing Medium section"
                    >
                      <Wind className="h-5 w-5" />
                      <span>Growing Medium</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a
                      href="#plant-timeline"
                      aria-label="Go to Plant Timeline section"
                    >
                      <Calendar className="h-5 w-5" />
                      <span>Timeline</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content Area */}
        <SidebarInset className="flex-1 overflow-auto pb-8">
          <div className="mx-auto px-6 py-8">
            {/* Top Bar for Edit Button and Sidebar Trigger */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="-ml-1" aria-label="Toggle Sidebar">
                  <PanelLeft />
                  <span className="sr-only">Toggle Sidebar</span>
                </SidebarTrigger>
                <Separator
                  orientation="vertical"
                  className="h-6 mx-2 bg-gray-200"
                />
                <h1 className="text-3xl font-bold text-gray-900">
                  Fiddle Leaf Fig
                </h1>
                {/* Needs Attention Badge */}
                <button
                  onClick={handleScrollToTimeline}
                  className="ml-4 px-4 py-2 rounded-full bg-red-500 text-white text-sm font-medium flex items-center gap-2 shadow-md hover:bg-red-600 transition-colors"
                  aria-label="Needs attention, click to see timeline"
                >
                  <Flower className="h-4 w-4" /> Needs attention
                </button>
              </div>
              <Button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium shadow-md transition-colors">
                <Edit className="h-4 w-4 mr-2" />
                Edit Plant Info
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Image Gallery & Description */}
              <div className="col-span-1 lg:col-span-5 flex flex-col gap-8">
                {/* Image Gallery Section */}
                <section id="image-gallery" className="flex flex-col">
                  <div className="flex-1 flex flex-col space-y-4">
                    {/* Main Image */}
                    <div className="relative flex-1 min-h-[600px] rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={
                          plantImages[currentImageIndex] || "/placeholder.svg"
                        }
                        alt="Fiddle Leaf Fig"
                        fill
                        className="object-contain"
                      />

                      {/* Navigation Arrows */}
                      <button
                        onClick={prevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-black/50 text-white hover:bg-black/70 transition-colors"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>

                      <button
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-black/50 text-white hover:bg-black/70 transition-colors"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>

                      {/* Image Counter */}
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 text-white text-sm font-medium">
                        {currentImageIndex + 1} / {plantImages.length}
                      </div>
                    </div>

                    {/* Thumbnail Strip */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {plantImages.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`shrink-0 w-30 h-30 rounded-md overflow-hidden border-2 transition-all ${
                            index === currentImageIndex
                              ? "border-green-500"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          aria-label={`View image ${index + 1}`}
                        >
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Plant view ${index + 1}`}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Plant Description Card - fills space below gallery */}
                <section
                  id="plant-description"
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-200"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-green-100">
                      <Leaf className="h-5 w-5 text-green-700" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Description
                    </h2>
                  </div>
                  <p className="text-base text-gray-700 leading-relaxed">
                    The Fiddle Leaf Fig (Ficus lyrata) is a popular indoor plant
                    known for its large, violin-shaped leaves. Native to western
                    Africa, it thrives in warm, humid conditions with bright,
                    indirect light. It's a stunning statement plant that can
                    grow quite tall, adding dramatic flair to any room.
                  </p>
                </section>
              </div>

              {/* Right Columns: Info Sections */}
              <div className="col-span-1 lg:col-span-7 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 auto-rows-min">
                {/* Plant Identity (Core Names) */}
                <section
                  id="plant-identity"
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-200 md:col-span-2 xl:col-span-3"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-green-100">
                      <Leaf className="h-5 w-5 text-green-700" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Plant Identity
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Common Name
                      </label>
                      <p className="text-lg font-semibold text-gray-900 mt-1">
                        Fiddle Leaf Fig
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Species
                      </label>
                      <p className="text-base italic text-gray-700 mt-1">
                        Ficus lyrata
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Genus
                      </label>
                      <p className="text-base text-gray-900 mt-1">Ficus</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Nickname
                      </label>
                      <p className="text-base text-gray-900 mt-1 font-medium">
                        "Figgy"
                      </p>
                    </div>
                  </div>
                </section>

                {/* Environmental Conditions */}
                <section
                  id="environmental-conditions"
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-200 md:col-span-2 xl:col-span-3"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-cyan-100">
                      <Cloud className="h-5 w-5 text-cyan-700" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Environmental Conditions
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Light Exposure */}
                    <div className="flex flex-col items-center p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-center">
                      <div className="p-3 rounded-full bg-yellow-200 mb-2">
                        <Sun className="h-6 w-6 text-yellow-700" />
                      </div>
                      <p className="text-sm font-medium text-gray-600">Light</p>
                      <p className="text-base font-bold text-gray-900">
                        Bright Indirect
                      </p>
                    </div>
                    {/* Window Direction */}
                    <div className="flex flex-col items-center p-4 rounded-lg bg-amber-50 border border-amber-200 text-center">
                      <div className="p-3 rounded-full bg-amber-200 mb-2">
                        <Compass className="h-6 w-6 text-amber-700" />
                      </div>
                      <p className="text-sm font-medium text-gray-600">
                        Window
                      </p>
                      <p className="text-base font-bold text-gray-900">
                        East-facing
                      </p>
                    </div>
                    {/* Temperature */}
                    <div className="flex flex-col items-center p-4 rounded-lg bg-red-50 border border-red-200 text-center">
                      <div className="p-3 rounded-full bg-red-200 mb-2">
                        <Thermometer className="h-6 w-6 text-red-700" />
                      </div>
                      <p className="text-sm font-medium text-gray-600">
                        Temperature
                      </p>
                      <p className="text-base font-bold text-gray-900">22°C</p>
                    </div>
                    {/* Humidity */}
                    <div className="flex flex-col items-center p-4 rounded-lg bg-blue-50 border border-blue-200 text-center">
                      <div className="p-3 rounded-full bg-blue-200 mb-2">
                        <Cloud className="h-6 w-6 text-blue-700" />
                      </div>
                      <p className="text-sm font-medium text-gray-600">
                        Humidity
                      </p>
                      <p className="text-base font-bold text-gray-900">60%</p>
                    </div>
                  </div>
                </section>

                {/* Care Schedule */}
                <section
                  id="care-schedule"
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-200 md:col-span-2 xl:col-span-3"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-emerald-100">
                      <Droplet className="h-5 w-5 text-emerald-700" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Care Schedule
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    {/* Watering */}
                    <div className="flex flex-col items-center p-4 rounded-lg bg-green-50 border border-green-200 text-center">
                      <div className="p-3 rounded-full bg-green-200 mb-2">
                        <Droplet className="h-6 w-6 text-green-700" />
                      </div>
                      <p className="text-sm font-medium text-gray-600">
                        Watering
                      </p>
                      <p className="text-base font-bold text-gray-900">
                        7-10 days
                      </p>
                    </div>
                    {/* Fertilizing */}
                    <div className="flex flex-col items-center p-4 rounded-lg bg-purple-50 border border-purple-200 text-center">
                      <div className="p-3 rounded-full bg-purple-200 mb-2">
                        <Syringe className="h-6 w-6 text-purple-700" />
                      </div>
                      <p className="text-sm font-medium text-gray-600">
                        Fertilizing
                      </p>
                      <p className="text-base font-bold text-gray-900">
                        Monthly
                      </p>
                    </div>
                  </div>
                </section>

                {/* Physical Attributes Card */}
                <section
                  id="physical-attributes"
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-200"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-purple-100">
                      <Ruler className="h-5 w-5 text-purple-700" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Physical Attributes
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col items-center p-4 rounded-lg bg-purple-50 border border-purple-200 text-center">
                      <div className="p-3 rounded-full bg-purple-200 mb-2">
                        <Ruler className="h-6 w-6 text-purple-700" />
                      </div>
                      <p className="text-sm font-medium text-gray-600">
                        Height
                      </p>
                      <p className="text-base font-bold text-gray-900">
                        1.5 meters
                      </p>
                    </div>
                    <div className="flex flex-col items-center p-4 rounded-lg bg-purple-50 border border-purple-200 text-center">
                      <div className="p-3 rounded-full bg-purple-200 mb-2">
                        <Maximize className="h-6 w-6 text-purple-700" />
                      </div>
                      <p className="text-sm font-medium text-gray-600">
                        Pot Size
                      </p>
                      <p className="text-base font-bold text-gray-900">30 cm</p>
                    </div>
                  </div>
                </section>

                {/* Attributes Card */}
                <section
                  id="attributes"
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-200"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-green-100">
                      <Shield className="h-5 w-5 text-green-700" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Attributes
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col items-center p-4 rounded-lg bg-red-50 border border-red-200 text-center">
                      <div className="p-3 rounded-full bg-red-200 mb-2">
                        <Shield className="h-6 w-6 text-red-700" />
                      </div>
                      <p className="text-sm font-medium text-gray-600">
                        Pet Safe
                      </p>
                      <p className="text-base font-bold text-red-700">
                        No - Toxic
                      </p>
                    </div>
                    <div className="flex flex-col items-center p-4 rounded-lg bg-green-50 border border-green-200 text-center">
                      <div className="p-3 rounded-full bg-green-200 mb-2">
                        <Leaf className="h-6 w-6 text-green-700" />
                      </div>
                      <p className="text-sm font-medium text-gray-600">
                        Air Cleaning
                      </p>
                      <p className="text-base font-bold text-green-700">Yes</p>
                    </div>
                  </div>
                </section>

                {/* Ownership & History Card */}
                <section
                  id="ownership-history"
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-200"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-red-100">
                      <Heart className="h-5 w-5 text-red-700" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Ownership & History
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Source
                      </label>
                      <p className="text-base text-gray-900 mt-1">
                        Local nursery
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Owned Since
                      </label>
                      <p className="text-base text-gray-900 mt-1">
                        {ownedSinceDate}
                        <span className="ml-2 text-sm text-gray-600 font-normal">
                          ({formatTimeAgo(ownedSinceDate)})
                        </span>
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Last Repotted
                      </label>
                      <p className="text-base text-gray-900 mt-1">
                        {lastRepottedDate}
                        <span className="ml-2 text-sm text-gray-600 font-normal">
                          ({formatTimeAgo(lastRepottedDate)})
                        </span>
                      </p>
                    </div>
                  </div>
                </section>

                {/* Location Details Card */}
                <section
                  id="location"
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-200"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-amber-100">
                      <MapPin className="h-5 w-5 text-amber-700" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Location Details
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-amber-600" />
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Room Location
                        </label>
                        <p className="text-base font-semibold text-gray-900">
                          Living Room
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Sun className="h-5 w-5 text-amber-600" />
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Light Exposure
                        </label>
                        <p className="text-base font-semibold text-gray-900">
                          Morning bright indirect light
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Growing Medium Card */}
                <section
                  id="growing-medium"
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-200"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-emerald-100">
                      <Wind className="h-5 w-5 text-emerald-700" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Growing Medium
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Growing Medium
                      </label>
                      <p className="text-base text-gray-900 mt-1">Soil</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Potting Mix Components
                      </label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {pottingMixComponents.map((component, index) => (
                          <div
                            key={index}
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200"
                          >
                            {component}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Plant Timeline Section - full width at the bottom */}
            <section id="plant-timeline" className="mt-8 col-span-full">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gray-100">
                    <Calendar className="h-5 w-5 text-gray-700" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Plant Timeline
                  </h2>
                  <span className="px-3 py-1 rounded-full text-xs font-medium text-gray-600 bg-gray-100 border border-gray-200">
                    Coming Soon
                  </span>
                </div>
                <p className="text-gray-700">
                  This section will display a detailed timeline of plant events,
                  including blooming status and urgent care alerts.
                </p>
              </div>
            </section>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
