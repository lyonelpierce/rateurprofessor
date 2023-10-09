"use client";

import * as z from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { notFound } from "next/navigation";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { formSchema } from "./constants";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import ProfileInfo from "@/components/ProfileInfo";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const RateUniversity = ({ params }: any) => {
  const {
    data: university,
    error,
    isLoading,
  } = useSWR(`/api/profile/university/${params.id}`, fetcher);

  const router = useRouter();

  if (error) {
    notFound();
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      safety: "",
      location: "",
      happiness: "",
      opportunities: "",
      reputation: "",
      clubs: "",
      facilities: "",
      internet: "",
      food: "",
      social: "",
      content: "",
    },
  });

  const rate = [
    {
      id: 1,
      description: "Pesimo",
    },
    {
      id: 2,
      description: "Malo",
    },
    {
      id: 3,
      description: "Regular",
    },
    {
      id: 4,
      description: "Bueno",
    },
    {
      id: 5,
      description: "Excelente",
    },
  ];

  const [safety, setSafety] = useState(0);
  const [hoverSafety, setHoverSafety] = useState(0);
  const [selectedSafety, setSelectedSafety] = useState(0);

  const [internet, setInternet] = useState(0);
  const [hoverInternet, setHoverInternet] = useState(0);
  const [selectedInternet, setSelectedInternet] = useState(0);

  const [social, setSocial] = useState(0);
  const [hoverSocial, setHoverSocial] = useState(0);
  const [selectedSocial, setSelectedSocial] = useState(0);

  const [clubs, setClubs] = useState(0);
  const [hoverClubs, setHoverClubs] = useState(0);
  const [selectedClubs, setSelectedClubs] = useState(0);

  const [food, setFood] = useState(0);
  const [hoverFood, setHoverFood] = useState(0);
  const [selectedFood, setSelectedFood] = useState(0);

  const [happiness, setHappiness] = useState(0);
  const [hoverHappiness, setHoverHappiness] = useState(0);
  const [selectedHappiness, setSelectedHappiness] = useState(0);

  const [reputation, setReputation] = useState(0);
  const [hoverReputation, setHoverReputation] = useState(0);
  const [selectedReputation, setSelectedReputation] = useState(0);

  const [location, setLocation] = useState(0);
  const [hoverLocation, setHoverLocation] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(0);

  const [opportunities, setOpportunities] = useState(0);
  const [hoverOpportunities, setHoverOpportunities] = useState(0);
  const [selectedOpportunities, setSelectedOpportunities] = useState(0);

  const [facilities, setFacilities] = useState(0);
  const [hoverFacilities, setHoverFacilities] = useState(0);
  const [selectedFacilities, setSelectedFacilities] = useState(0);

  const isFormLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch(
        `/api/profile/university/rate/${params.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (response.ok) {
        router.push(`/universidad/${params.id}`);
      }
    } catch (error) {}
  };

  const values = form.getValues();
  const isFormFilled = Object.values(values).includes("");
  console.log(values);

  return (
    <section>
      {!isLoading && <ProfileInfo university={university} />}
      <div className="max-w-7xl mx-auto py-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="pt-52">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="facilities"
                render={({ field }) => (
                  <FormItem className="border p-4 shadow-md rounded-md">
                    <FormLabel className="font-semibold">
                      Instalaciones <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <>
                        <RadioGroup
                          className="flex items-center justify-center gap-0"
                          onValueChange={field.onChange}
                          disabled={isFormLoading}
                        >
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="1"
                              id="fac1"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="fac1"
                              className={cn(
                                "rounded-l-3xl h-12 w-16 bg-gray-200 hover:bg-red-400/70 cursor-pointer border border-white",
                                (facilities >= 1 || hoverFacilities >= 1) &&
                                  "bg-red-400"
                              )}
                              onClick={() => {
                                setFacilities(1);
                                setSelectedFacilities(1);
                              }}
                              onMouseEnter={() => setHoverFacilities(1)}
                              onMouseLeave={() => setHoverFacilities(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="2"
                              id="fac2"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="fac2"
                              className={cn(
                                "rounded-none h-12 w-16 bg-gray-200 hover:bg-orange-400/70 cursor-pointer border border-white",
                                (facilities >= 2 || hoverFacilities >= 2) &&
                                  "bg-orange-400"
                              )}
                              onClick={() => {
                                setFacilities(2);
                                setSelectedFacilities(2);
                              }}
                              onMouseEnter={() => setHoverFacilities(2)}
                              onMouseLeave={() => setHoverFacilities(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="3"
                              id="fac3"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="fac3"
                              className={cn(
                                "rounded-none h-12 w-16 bg-gray-200 hover:bg-yellow-400/70 cursor-pointer border border-white",
                                (facilities >= 3 || hoverFacilities >= 3) &&
                                  "bg-yellow-400"
                              )}
                              onClick={() => {
                                setFacilities(3);
                                setSelectedFacilities(3);
                              }}
                              onMouseEnter={() => setHoverFacilities(3)}
                              onMouseLeave={() => setHoverFacilities(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="4"
                              id="fac4"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="fac4"
                              className={cn(
                                "rounded-none h-12 w-16 bg-gray-200 hover:bg-green-400/70 cursor-pointer border border-white",
                                (facilities >= 4 || hoverFacilities >= 4) &&
                                  "bg-green-400"
                              )}
                              onClick={() => {
                                setFacilities(4);
                                setSelectedFacilities(4);
                              }}
                              onMouseEnter={() => setHoverFacilities(4)}
                              onMouseLeave={() => setHoverFacilities(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="5"
                              id="fac5"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="fac5"
                              className={cn(
                                "rounded-r-3xl h-12 w-16 bg-gray-200 hover:bg-green-600/70 cursor-pointer border border-white",
                                (facilities === 5 || hoverFacilities === 5) &&
                                  "bg-green-600"
                              )}
                              onClick={() => {
                                setFacilities(5);
                                setSelectedFacilities(5);
                              }}
                              onMouseEnter={() => setHoverFacilities(5)}
                              onMouseLeave={() => setHoverFacilities(0)}
                            />
                          </div>
                        </RadioGroup>
                        {hoverFacilities ? (
                          <div className="flex mx-auto justify-center w-full font-medium text-sm text-muted-foreground">
                            {hoverFacilities} -{" "}
                            {
                              rate.find((r) => r.id === hoverFacilities)
                                ?.description
                            }
                          </div>
                        ) : (
                          <>
                            {selectedFacilities ? (
                              <div className="flex mx-auto justify-center w-full font-medium text-sm">
                                {selectedFacilities} -{" "}
                                {
                                  rate.find((r) => r.id === selectedFacilities)
                                    ?.description
                                }
                              </div>
                            ) : (
                              <div className="flex mx-auto justify-between w-2/3 font-medium text-sm text-muted-foreground">
                                <p>1 - Pesimo</p>
                                <p>5 - Excelente</p>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="safety"
                render={({ field }) => (
                  <FormItem className="border p-4 shadow-md rounded-md">
                    <FormLabel className="font-semibold">
                      Seguridad <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <>
                        <RadioGroup
                          className="flex items-center justify-center gap-0"
                          onValueChange={field.onChange}
                          disabled={isFormLoading}
                        >
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="1"
                              id="saf1"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="saf1"
                              className={cn(
                                "rounded-l-3xl h-12 w-16 bg-gray-200 hover:bg-red-400/70 cursor-pointer border border-white",
                                (safety >= 1 || hoverSafety >= 1) &&
                                  "bg-red-400"
                              )}
                              onClick={() => {
                                setSafety(1);
                                setSelectedSafety(1);
                              }}
                              onMouseEnter={() => setHoverSafety(1)}
                              onMouseLeave={() => setHoverSafety(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="2"
                              id="saf2"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="saf2"
                              className={cn(
                                "rounded-none h-12 w-16 bg-gray-200 hover:bg-orange-400/70 cursor-pointer border border-white",
                                (safety >= 2 || hoverSafety >= 2) &&
                                  "bg-orange-400"
                              )}
                              onClick={() => {
                                setSafety(2);
                                setSelectedSafety(2);
                              }}
                              onMouseEnter={() => setHoverSafety(2)}
                              onMouseLeave={() => setHoverSafety(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="3"
                              id="saf3"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="saf3"
                              className={cn(
                                "rounded-none h-12 w-16 bg-gray-200 hover:bg-yellow-400/70 cursor-pointer border border-white",
                                (safety >= 3 || hoverSafety >= 3) &&
                                  "bg-yellow-400"
                              )}
                              onClick={() => {
                                setSafety(3);
                                setSelectedSafety(3);
                              }}
                              onMouseEnter={() => setHoverSafety(3)}
                              onMouseLeave={() => setHoverSafety(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="4"
                              id="saf4"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="saf4"
                              className={cn(
                                "rounded-none h-12 w-16 bg-gray-200 hover:bg-green-400/70 cursor-pointer border border-white",
                                (safety >= 4 || hoverSafety >= 4) &&
                                  "bg-green-400"
                              )}
                              onClick={() => {
                                setSafety(4);
                                setSelectedSafety(4);
                              }}
                              onMouseEnter={() => setHoverSafety(4)}
                              onMouseLeave={() => setHoverSafety(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="5"
                              id="saf5"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="saf5"
                              className={cn(
                                "rounded-r-3xl h-12 w-16 bg-gray-200 hover:bg-green-600/70 cursor-pointer border border-white",
                                (safety === 5 || hoverSafety === 5) &&
                                  "bg-green-600"
                              )}
                              onClick={() => {
                                setSafety(5);
                                setSelectedSafety(5);
                              }}
                              onMouseEnter={() => setHoverSafety(5)}
                              onMouseLeave={() => setHoverSafety(0)}
                            />
                          </div>
                        </RadioGroup>
                        {hoverSafety ? (
                          <div className="flex mx-auto justify-center w-full font-medium text-sm text-muted-foreground">
                            {hoverSafety} -{" "}
                            {
                              rate.find((r) => r.id === hoverSafety)
                                ?.description
                            }
                          </div>
                        ) : (
                          <>
                            {selectedSafety ? (
                              <div className="flex mx-auto justify-center w-full font-medium text-sm">
                                {selectedSafety} -{" "}
                                {
                                  rate.find((r) => r.id === selectedSafety)
                                    ?.description
                                }
                              </div>
                            ) : (
                              <div className="flex mx-auto justify-between w-2/3 font-medium text-sm text-muted-foreground">
                                <p>1 - Pesimo</p>
                                <p>5 - Excelente</p>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="internet"
                render={({ field }) => (
                  <FormItem className="border p-4 shadow-md rounded-md">
                    <FormLabel className="font-semibold">
                      Internet <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <>
                        <RadioGroup
                          className="flex items-center justify-center gap-0"
                          onValueChange={field.onChange}
                          disabled={isFormLoading}
                        >
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="1"
                              id="int1"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="int1"
                              className={cn(
                                "rounded-l-3xl h-12 w-16 bg-gray-200 hover:bg-red-400/70 cursor-pointer border border-white",
                                (internet >= 1 || hoverInternet >= 1) &&
                                  "bg-red-400"
                              )}
                              onClick={() => {
                                setInternet(1);
                                setSelectedInternet(1);
                              }}
                              onMouseEnter={() => setHoverInternet(1)}
                              onMouseLeave={() => setHoverInternet(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="2"
                              id="int2"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="int2"
                              className={cn(
                                "rounded-none h-12 w-16 bg-gray-200 hover:bg-orange-400/70 cursor-pointer border border-white",
                                (internet >= 2 || hoverInternet >= 2) &&
                                  "bg-orange-400"
                              )}
                              onClick={() => {
                                setInternet(2);
                                setSelectedInternet(2);
                              }}
                              onMouseEnter={() => setHoverInternet(2)}
                              onMouseLeave={() => setHoverInternet(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="3"
                              id="int3"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="int3"
                              className={cn(
                                "rounded-none h-12 w-16 bg-gray-200 hover:bg-yellow-400/70 cursor-pointer border border-white",
                                (internet >= 3 || hoverInternet >= 3) &&
                                  "bg-yellow-400"
                              )}
                              onClick={() => {
                                setInternet(3);
                                setSelectedInternet(3);
                              }}
                              onMouseEnter={() => setHoverInternet(3)}
                              onMouseLeave={() => setHoverInternet(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="4"
                              id="int4"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="int4"
                              className={cn(
                                "rounded-none h-12 w-16 bg-gray-200 hover:bg-green-400/70 cursor-pointer border border-white",
                                (internet >= 4 || hoverInternet >= 4) &&
                                  "bg-green-400"
                              )}
                              onClick={() => {
                                setInternet(4);
                                setSelectedInternet(4);
                              }}
                              onMouseEnter={() => setHoverInternet(4)}
                              onMouseLeave={() => setHoverInternet(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="5"
                              id="int5"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="int5"
                              className={cn(
                                "rounded-r-3xl h-12 w-16 bg-gray-200 hover:bg-green-600/70 cursor-pointer border border-white",
                                (internet === 5 || hoverInternet === 5) &&
                                  "bg-green-600"
                              )}
                              onClick={() => {
                                setInternet(5);
                                setSelectedInternet(5);
                              }}
                              onMouseEnter={() => setHoverInternet(5)}
                              onMouseLeave={() => setHoverInternet(0)}
                            />
                          </div>
                        </RadioGroup>
                        {hoverInternet ? (
                          <div className="flex mx-auto justify-center w-full font-medium text-sm text-muted-foreground">
                            {hoverInternet} -{" "}
                            {
                              rate.find((r) => r.id === hoverInternet)
                                ?.description
                            }
                          </div>
                        ) : (
                          <>
                            {selectedInternet ? (
                              <div className="flex mx-auto justify-center w-full font-medium text-sm">
                                {selectedInternet} -{" "}
                                {
                                  rate.find((r) => r.id === selectedInternet)
                                    ?.description
                                }
                              </div>
                            ) : (
                              <div className="flex mx-auto justify-between w-2/3 font-medium text-sm text-muted-foreground">
                                <p>1 - Pesimo</p>
                                <p>5 - Excelente</p>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reputation"
                render={({ field }) => (
                  <FormItem className="border p-4 shadow-md rounded-md">
                    <FormLabel className="font-semibold">
                      Reputación <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <>
                        <RadioGroup
                          className="flex items-center justify-center gap-0"
                          onValueChange={field.onChange}
                          disabled={isFormLoading}
                        >
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="1"
                              id="rep1"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="rep1"
                              className={cn(
                                "rounded-l-3xl h-12 w-16 bg-gray-200 hover:bg-red-400/70 cursor-pointer border border-white",
                                (reputation >= 1 || hoverReputation >= 1) &&
                                  "bg-red-400"
                              )}
                              onClick={() => {
                                setReputation(1);
                                setSelectedReputation(1);
                              }}
                              onMouseEnter={() => setHoverReputation(1)}
                              onMouseLeave={() => setHoverReputation(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="2"
                              id="rep2"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="rep2"
                              className={cn(
                                "rounded-none h-12 w-16 bg-gray-200 hover:bg-orange-400/70 cursor-pointer border border-white",
                                (reputation >= 2 || hoverReputation >= 2) &&
                                  "bg-orange-400"
                              )}
                              onClick={() => {
                                setReputation(2);
                                setSelectedReputation(2);
                              }}
                              onMouseEnter={() => setHoverReputation(2)}
                              onMouseLeave={() => setHoverReputation(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="3"
                              id="rep3"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="rep3"
                              className={cn(
                                "rounded-none h-12 w-16 bg-gray-200 hover:bg-yellow-400/70 cursor-pointer border border-white",
                                (reputation >= 3 || hoverReputation >= 3) &&
                                  "bg-yellow-400"
                              )}
                              onClick={() => {
                                setReputation(3);
                                setSelectedReputation(3);
                              }}
                              onMouseEnter={() => setHoverReputation(3)}
                              onMouseLeave={() => setHoverReputation(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="4"
                              id="rep4"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="rep4"
                              className={cn(
                                "rounded-none h-12 w-16 bg-gray-200 hover:bg-green-400/70 cursor-pointer border border-white",
                                (reputation >= 4 || hoverReputation >= 4) &&
                                  "bg-green-400"
                              )}
                              onClick={() => {
                                setReputation(4);
                                setSelectedReputation(4);
                              }}
                              onMouseEnter={() => setHoverReputation(4)}
                              onMouseLeave={() => setHoverReputation(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="5"
                              id="rep5"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="rep5"
                              className={cn(
                                "rounded-r-3xl h-12 w-16 bg-gray-200 hover:bg-green-600/70 cursor-pointer border border-white",
                                (reputation === 5 || hoverReputation === 5) &&
                                  "bg-green-600"
                              )}
                              onClick={() => {
                                setReputation(5);
                                setSelectedReputation(5);
                              }}
                              onMouseEnter={() => setHoverReputation(5)}
                              onMouseLeave={() => setHoverReputation(0)}
                            />
                          </div>
                        </RadioGroup>
                        {hoverReputation ? (
                          <div className="flex mx-auto justify-center w-full font-medium text-sm text-muted-foreground">
                            {hoverReputation} -{" "}
                            {
                              rate.find((r) => r.id === hoverReputation)
                                ?.description
                            }
                          </div>
                        ) : (
                          <>
                            {selectedReputation ? (
                              <div className="flex mx-auto justify-center w-fill font-medium text-sm">
                                {selectedReputation} -{" "}
                                {
                                  rate.find((r) => r.id === selectedReputation)
                                    ?.description
                                }
                              </div>
                            ) : (
                              <div className="flex mx-auto justify-between w-2/3 font-medium text-sm text-muted-foreground">
                                <p>1 - Pesimo</p>
                                <p>5 - Excelente</p>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="border p-4 shadow-md rounded-md">
                    <FormLabel className="font-semibold">
                      Ubicación <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <>
                        <RadioGroup
                          className="flex items-center justify-center gap-0"
                          onValueChange={field.onChange}
                          disabled={isFormLoading}
                        >
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="1"
                              id="loc1"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="loc1"
                              className={cn(
                                "rounded-l-3xl h-12 w-16 bg-gray-200 hover:bg-red-400/70 cursor-pointer border border-white",
                                (location >= 1 || hoverLocation >= 1) &&
                                  "bg-red-400"
                              )}
                              onClick={() => {
                                setLocation(1);
                                setSelectedLocation(1);
                              }}
                              onMouseEnter={() => setHoverLocation(1)}
                              onMouseLeave={() => setHoverLocation(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="2"
                              id="loc2"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="loc2"
                              className={cn(
                                "rounded-none h-12 w-16 bg-gray-200 hover:bg-orange-400/70 cursor-pointer border border-white",
                                (location >= 2 || hoverLocation >= 2) &&
                                  "bg-orange-400"
                              )}
                              onClick={() => {
                                setLocation(2);
                                setSelectedLocation(2);
                              }}
                              onMouseEnter={() => setHoverLocation(2)}
                              onMouseLeave={() => setHoverLocation(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="3"
                              id="loc3"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="loc3"
                              className={cn(
                                "rounded-none h-12 w-16 bg-gray-200 hover:bg-yellow-400/70 cursor-pointer border border-white",
                                (location >= 3 || hoverLocation >= 3) &&
                                  "bg-yellow-400"
                              )}
                              onClick={() => {
                                setLocation(3);
                                setSelectedLocation(3);
                              }}
                              onMouseEnter={() => setHoverLocation(3)}
                              onMouseLeave={() => setHoverLocation(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="4"
                              id="loc4"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="loc4"
                              className={cn(
                                "rounded-none h-12 w-16 bg-gray-200 hover:bg-green-400/70 cursor-pointer border border-white",
                                (location >= 4 || hoverLocation >= 4) &&
                                  "bg-green-400"
                              )}
                              onClick={() => {
                                setLocation(4);
                                setSelectedLocation(4);
                              }}
                              onMouseEnter={() => setHoverLocation(4)}
                              onMouseLeave={() => setHoverLocation(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="5"
                              id="loc5"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="loc5"
                              className={cn(
                                "rounded-r-3xl h-12 w-16 bg-gray-200 hover:bg-green-600/70 cursor-pointer border border-white",
                                (location === 5 || hoverLocation === 5) &&
                                  "bg-green-600"
                              )}
                              onClick={() => {
                                setLocation(5);
                                setSelectedLocation(5);
                              }}
                              onMouseEnter={() => setHoverLocation(5)}
                              onMouseLeave={() => setHoverLocation(0)}
                            />
                          </div>
                        </RadioGroup>
                        {hoverLocation ? (
                          <div className="flex mx-auto justify-center w-full font-medium text-sm text-muted-foreground">
                            {hoverLocation} -{" "}
                            {
                              rate.find((r) => r.id === hoverLocation)
                                ?.description
                            }
                          </div>
                        ) : (
                          <>
                            {selectedLocation ? (
                              <div className="flex mx-auto justify-center w-full font-medium text-sm">
                                {selectedLocation} -{" "}
                                {
                                  rate.find((r) => r.id === selectedLocation)
                                    ?.description
                                }
                              </div>
                            ) : (
                              <div className="flex mx-auto justify-between w-2/3 font-medium text-sm text-muted-foreground">
                                <p>1 - Pesimo</p>
                                <p>5 - Excelente</p>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="opportunities"
                render={({ field }) => (
                  <FormItem className="border p-4 shadow-md rounded-md">
                    <FormLabel className="font-semibold">
                      Oportunidades <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <>
                        <RadioGroup
                          className="flex items-center justify-center gap-0"
                          onValueChange={field.onChange}
                          disabled={isFormLoading}
                        >
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="1"
                              id="opt1"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="opt1"
                              className={cn(
                                "rounded-l-3xl h-12 w-16 bg-gray-200 hover:bg-red-400/70 cursor-pointer border border-white",
                                (opportunities >= 1 ||
                                  hoverOpportunities >= 1) &&
                                  "bg-red-400"
                              )}
                              onClick={() => {
                                setOpportunities(1);
                                setSelectedOpportunities(1);
                              }}
                              onMouseEnter={() => setHoverOpportunities(1)}
                              onMouseLeave={() => setHoverOpportunities(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="2"
                              id="opt2"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="opt2"
                              className={cn(
                                "rounded-none h-12 w-16 bg-gray-200 hover:bg-orange-400/70 cursor-pointer border border-white",
                                (opportunities >= 2 ||
                                  hoverOpportunities >= 2) &&
                                  "bg-orange-400"
                              )}
                              onClick={() => {
                                setOpportunities(2);
                                setSelectedOpportunities(2);
                              }}
                              onMouseEnter={() => setHoverOpportunities(2)}
                              onMouseLeave={() => setHoverOpportunities(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="3"
                              id="opt3"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="opt3"
                              className={cn(
                                "rounded-none h-12 w-16 bg-gray-200 hover:bg-yellow-400/70 cursor-pointer border border-white",
                                (opportunities >= 3 ||
                                  hoverOpportunities >= 3) &&
                                  "bg-yellow-400"
                              )}
                              onClick={() => {
                                setOpportunities(3);
                                setSelectedOpportunities(3);
                              }}
                              onMouseEnter={() => setHoverOpportunities(3)}
                              onMouseLeave={() => setHoverOpportunities(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="4"
                              id="opt4"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="opt4"
                              className={cn(
                                "rounded-none h-12 w-16 bg-gray-200 hover:bg-green-400/70 cursor-pointer border border-white",
                                (opportunities >= 4 ||
                                  hoverOpportunities >= 4) &&
                                  "bg-green-400"
                              )}
                              onClick={() => {
                                setOpportunities(4);
                                setSelectedOpportunities(4);
                              }}
                              onMouseEnter={() => setHoverOpportunities(4)}
                              onMouseLeave={() => setHoverOpportunities(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="5"
                              id="opt5"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="opt5"
                              className={cn(
                                "rounded-r-3xl h-12 w-16 bg-gray-200 hover:bg-green-600/70 cursor-pointer border border-white",
                                (opportunities >= 5 ||
                                  hoverOpportunities >= 5) &&
                                  "bg-green-600"
                              )}
                              onClick={() => {
                                setOpportunities(5);
                                setSelectedOpportunities(5);
                              }}
                              onMouseEnter={() => setHoverOpportunities(5)}
                              onMouseLeave={() => setHoverOpportunities(0)}
                            />
                          </div>
                        </RadioGroup>
                        {hoverOpportunities ? (
                          <div className="flex mx-auto justify-center w-full font-medium text-sm text-muted-foreground">
                            {hoverOpportunities} -{" "}
                            {
                              rate.find((r) => r.id === hoverOpportunities)
                                ?.description
                            }
                          </div>
                        ) : (
                          <>
                            {selectedOpportunities ? (
                              <div className="flex mx-auto justify-center w-full font-medium text-sm">
                                {selectedOpportunities} -{" "}
                                {
                                  rate.find(
                                    (r) => r.id === selectedOpportunities
                                  )?.description
                                }
                              </div>
                            ) : (
                              <div className="flex mx-auto justify-between w-2/3 font-medium text-sm text-muted-foreground">
                                <p>1 - Pesimo</p>
                                <p>5 - Excelente</p>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="happiness"
                render={({ field }) => (
                  <FormItem className="border p-4 shadow-md rounded-md">
                    <FormLabel className="font-semibold">
                      Felicidad <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <>
                        <RadioGroup
                          className="flex items-center justify-center gap-0"
                          onValueChange={field.onChange}
                          disabled={isFormLoading}
                        >
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="1"
                              id="fel1"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="fel1"
                              className={cn(
                                "rounded-l-3xl h-12 w-16 bg-gray-200 hover:bg-red-400/70 cursor-pointer border border-white",
                                (happiness >= 1 || hoverHappiness >= 1) &&
                                  "bg-red-400"
                              )}
                              onClick={() => {
                                setHappiness(1);
                                setSelectedHappiness(1);
                              }}
                              onMouseEnter={() => setHoverHappiness(1)}
                              onMouseLeave={() => setHoverHappiness(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="2"
                              id="fel2"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="fel2"
                              className={cn(
                                "rounded-none h-12 w-16 bg-gray-200 hover:bg-orange-400/70 cursor-pointer border border-white",
                                (happiness >= 2 || hoverHappiness >= 2) &&
                                  "bg-orange-400"
                              )}
                              onClick={() => {
                                setHappiness(2);
                                setSelectedHappiness(2);
                              }}
                              onMouseEnter={() => setHoverHappiness(2)}
                              onMouseLeave={() => setHoverHappiness(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="3"
                              id="fel3"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="fel3"
                              className={cn(
                                "rounded-none h-12 w-16 bg-gray-200 hover:bg-yellow-400/70 cursor-pointer border border-white",
                                (happiness >= 3 || hoverHappiness >= 3) &&
                                  "bg-yellow-400"
                              )}
                              onClick={() => {
                                setHappiness(3);
                                setSelectedHappiness(3);
                              }}
                              onMouseEnter={() => setHoverHappiness(3)}
                              onMouseLeave={() => setHoverHappiness(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="4"
                              id="fel4"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="fel4"
                              className={cn(
                                "rounded-none h-12 w-16 bg-gray-200 hover:bg-green-400/70 cursor-pointer border border-white",
                                (happiness >= 4 || hoverHappiness >= 4) &&
                                  "bg-green-400"
                              )}
                              onClick={() => {
                                setHappiness(4);
                                setSelectedHappiness(4);
                              }}
                              onMouseEnter={() => setHoverHappiness(4)}
                              onMouseLeave={() => setHoverHappiness(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="5"
                              id="fel5"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="fel5"
                              className={cn(
                                "rounded-r-3xl h-12 w-16 bg-gray-200 hover:bg-green-600/70 cursor-pointer border border-white",
                                (happiness === 5 || hoverHappiness === 5) &&
                                  "bg-green-600"
                              )}
                              onClick={() => {
                                setHappiness(5);
                                setSelectedHappiness(5);
                              }}
                              onMouseEnter={() => setHoverHappiness(5)}
                              onMouseLeave={() => setHoverHappiness(0)}
                            />
                          </div>
                        </RadioGroup>
                        {hoverHappiness ? (
                          <div className="flex mx-auto justify-center w-full font-medium text-sm text-muted-foreground">
                            {hoverHappiness} -{" "}
                            {
                              rate.find((r) => r.id === hoverHappiness)
                                ?.description
                            }
                          </div>
                        ) : (
                          <>
                            {selectedHappiness ? (
                              <div className="flex mx-auto justify-center w-full font-medium text-sm">
                                {selectedHappiness} -{" "}
                                {
                                  rate.find((r) => r.id === selectedHappiness)
                                    ?.description
                                }
                              </div>
                            ) : (
                              <div className="flex mx-auto justify-between w-2/3 font-medium text-sm text-muted-foreground">
                                <p>1 - Pesimo</p>
                                <p>5 - Excelente</p>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="social"
                render={({ field }) => (
                  <FormItem className="border p-4 shadow-md rounded-md">
                    <FormLabel className="font-semibold">
                      Social <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <>
                        <RadioGroup
                          className="flex items-center justify-center gap-0"
                          onValueChange={field.onChange}
                          disabled={isFormLoading}
                        >
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="1"
                              id="soc1"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="soc1"
                              className={cn(
                                "rounded-l-3xl h-12 w-16 bg-gray-200 hover:bg-red-400/70 cursor-pointer border border-white",
                                (social >= 1 || hoverSocial >= 1) &&
                                  "bg-red-400"
                              )}
                              onClick={() => {
                                setSocial(1);
                                setSelectedSocial(1);
                              }}
                              onMouseEnter={() => setHoverSocial(1)}
                              onMouseLeave={() => setHoverSocial(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="2"
                              id="soc2"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="soc2"
                              className={cn(
                                "rounded-none h-12 w-16 bg-gray-200 hover:bg-orange-400/70 cursor-pointer border border-white",
                                (social >= 2 || hoverSocial >= 2) &&
                                  "bg-orange-400"
                              )}
                              onClick={() => {
                                setSocial(2);
                                setSelectedSocial(2);
                              }}
                              onMouseEnter={() => setHoverSocial(2)}
                              onMouseLeave={() => setHoverSocial(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="3"
                              id="soc3"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="soc3ee"
                              className={cn(
                                "rounded-none h-12 w-16 bg-gray-200 hover:bg-yellow-400/70 cursor-pointer border border-white",
                                (social >= 3 || hoverSocial >= 3) &&
                                  "bg-yellow-400"
                              )}
                              onClick={() => {
                                setSocial(3);
                                setSelectedSocial(3);
                              }}
                              onMouseEnter={() => setHoverSocial(3)}
                              onMouseLeave={() => setHoverSocial(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="4"
                              id="soc4"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="soc4"
                              className={cn(
                                "rounded-none h-12 w-16 bg-gray-200 hover:bg-green-400/70 cursor-pointer border border-white",
                                (social >= 4 || hoverSocial >= 4) &&
                                  "bg-green-400"
                              )}
                              onClick={() => {
                                setSocial(4);
                                setSelectedSocial(4);
                              }}
                              onMouseEnter={() => setHoverSocial(4)}
                              onMouseLeave={() => setHoverSocial(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="5"
                              id="soc5"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="soc5"
                              className={cn(
                                "rounded-r-3xl h-12 w-16 bg-gray-200 hover:bg-green-600/70 cursor-pointer border border-white",
                                (social === 5 || hoverSocial === 5) &&
                                  "bg-green-600"
                              )}
                              onClick={() => {
                                setSocial(5);
                                setSelectedSocial(5);
                              }}
                              onMouseEnter={() => setHoverSocial(5)}
                              onMouseLeave={() => setHoverSocial(0)}
                            />
                          </div>
                        </RadioGroup>
                        {hoverSocial ? (
                          <div className="flex mx-auto justify-center w-full font-medium text-sm text-muted-foreground">
                            {hoverSocial} -{" "}
                            {
                              rate.find((r) => r.id === hoverSocial)
                                ?.description
                            }
                          </div>
                        ) : (
                          <>
                            {selectedSocial ? (
                              <div className="flex mx-auto justify-center w-full font-medium text-sm">
                                {selectedSocial} -{" "}
                                {
                                  rate.find((r) => r.id === selectedSocial)
                                    ?.description
                                }
                              </div>
                            ) : (
                              <div className="flex mx-auto justify-between w-2/3 font-medium text-sm text-muted-foreground">
                                <p>1 - Pesimo</p>
                                <p>5 - Excelente</p>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="food"
                render={({ field }) => (
                  <FormItem className="border p-4 shadow-md rounded-md">
                    <FormLabel className="font-semibold">
                      Comida <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <>
                        <RadioGroup
                          className="flex items-center justify-center gap-0"
                          onValueChange={field.onChange}
                          disabled={isFormLoading}
                        >
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="1"
                              id="foo1"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="foo1"
                              className={cn(
                                "rounded-l-3xl h-12 w-16 bg-gray-200 hover:bg-red-400/70 cursor-pointer border border-white",
                                (food >= 1 || hoverFood >= 1) && "bg-red-400"
                              )}
                              onClick={() => {
                                setFood(1);
                                setSelectedFood(1);
                              }}
                              onMouseEnter={() => setHoverFood(1)}
                              onMouseLeave={() => setHoverFood(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="2"
                              id="foo2"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="foo2"
                              className={cn(
                                "rounded-none h-12 w-16 bg-gray-200 hover:bg-orange-400/70 cursor-pointer border border-white",
                                (food >= 2 || hoverFood >= 2) && "bg-orange-400"
                              )}
                              onClick={() => {
                                setFood(2);
                                setSelectedFood(2);
                              }}
                              onMouseEnter={() => setHoverFood(2)}
                              onMouseLeave={() => setHoverFood(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="3"
                              id="foo3"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="foo3"
                              className={cn(
                                "rounded-none h-12 w-16 bg-gray-200 hover:bg-yellow-400/70 cursor-pointer border border-white",
                                (food >= 3 || hoverFood >= 3) && "bg-yellow-400"
                              )}
                              onClick={() => {
                                setFood(3);
                                setSelectedFood(3);
                              }}
                              onMouseEnter={() => setHoverFood(3)}
                              onMouseLeave={() => setHoverFood(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="4"
                              id="foo4"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="foo4"
                              className={cn(
                                "rounded-none h-12 w-16 bg-gray-200 hover:bg-green-400/70 cursor-pointer border border-white",
                                (food >= 4 || hoverFood >= 4) && "bg-green-400"
                              )}
                              onClick={() => {
                                setFood(4);
                                setSelectedFood(4);
                              }}
                              onMouseEnter={() => setHoverFood(4)}
                              onMouseLeave={() => setHoverFood(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="5"
                              id="foo5"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="foo5"
                              className={cn(
                                "rounded-r-3xl h-12 w-16 bg-gray-200 hover:bg-green-600/70 cursor-pointer border border-white",
                                (food === 5 || hoverFood === 5) &&
                                  "bg-green-600"
                              )}
                              onClick={() => {
                                setFood(5);
                                setSelectedFood(5);
                              }}
                              onMouseEnter={() => setHoverFood(5)}
                              onMouseLeave={() => setHoverFood(0)}
                            />
                          </div>
                        </RadioGroup>
                        {hoverFood ? (
                          <div className="flex mx-auto justify-center w-full font-medium text-sm text-muted-foreground">
                            {hoverFood} -{" "}
                            {rate.find((r) => r.id === hoverFood)?.description}
                          </div>
                        ) : (
                          <>
                            {selectedFood ? (
                              <div className="flex mx-auto justify-center w-full font-medium text-sm">
                                {selectedFood} -{" "}
                                {
                                  rate.find((r) => r.id === selectedFood)
                                    ?.description
                                }
                              </div>
                            ) : (
                              <div className="flex mx-auto justify-between w-2/3 font-medium text-sm text-muted-foreground">
                                <p>1 - Pesimo</p>
                                <p>5 - Excelente</p>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="clubs"
                render={({ field }) => (
                  <FormItem className="border p-4 shadow-md rounded-md">
                    <FormLabel className="font-semibold">
                      Clubs <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <>
                        <RadioGroup
                          className="flex items-center justify-center gap-0"
                          onValueChange={field.onChange}
                          disabled={isFormLoading}
                        >
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="1"
                              id="clu1"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="clu1"
                              className={cn(
                                "rounded-l-3xl h-12 w-16 bg-gray-200 hover:bg-red-400/70 cursor-pointer border border-white",
                                (clubs >= 1 || hoverClubs >= 1) && "bg-red-400"
                              )}
                              onClick={() => {
                                setClubs(1);
                                setSelectedClubs(1);
                              }}
                              onMouseEnter={() => setHoverClubs(1)}
                              onMouseLeave={() => setHoverClubs(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="2"
                              id="clu2"
                              className="peer sr-only"
                              disabled={isFormLoading}
                            />
                            <Label
                              htmlFor="clu2"
                              className={cn(
                                "rounded-none h-12 w-16 bg-gray-200 hover:bg-orange-400/70 cursor-pointer border border-white",
                                (clubs >= 2 || hoverClubs >= 2) &&
                                  "bg-orange-400"
                              )}
                              onClick={() => {
                                setClubs(2);
                                setSelectedClubs(2);
                              }}
                              onMouseEnter={() => setHoverClubs(2)}
                              onMouseLeave={() => setHoverClubs(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="3"
                              id="clu3"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="clu3"
                              className={cn(
                                "rounded-none h-12 w-16 bg-gray-200 hover:bg-yellow-400/70 cursor-pointer border border-white",
                                (clubs >= 3 || hoverClubs >= 3) &&
                                  "bg-yellow-400"
                              )}
                              onClick={() => {
                                setClubs(3);
                                setSelectedClubs(3);
                              }}
                              onMouseEnter={() => setHoverClubs(3)}
                              onMouseLeave={() => setHoverClubs(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="4"
                              id="clu4"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="clu4"
                              className={cn(
                                "rounded-none h-12 w-16 bg-gray-200 hover:bg-green-400/70 cursor-pointer border border-white",
                                (clubs >= 4 || hoverClubs >= 4) &&
                                  "bg-green-400"
                              )}
                              onClick={() => {
                                setClubs(4);
                                setSelectedClubs(4);
                              }}
                              onMouseEnter={() => setHoverClubs(4)}
                              onMouseLeave={() => setHoverClubs(0)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <RadioGroupItem
                              value="5"
                              id="clu5"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="clu5"
                              className={cn(
                                "rounded-r-3xl h-12 w-16 bg-gray-200 hover:bg-green-600/70 cursor-pointer border border-white",
                                (clubs === 5 || hoverClubs === 5) &&
                                  "bg-green-600"
                              )}
                              onClick={() => {
                                setClubs(5);
                                setSelectedClubs(5);
                              }}
                              onMouseEnter={() => setHoverClubs(5)}
                              onMouseLeave={() => setHoverClubs(0)}
                            />
                          </div>
                        </RadioGroup>
                        {hoverClubs ? (
                          <div className="flex mx-auto justify-center w-full font-medium text-sm text-muted-foreground">
                            {hoverClubs} -{" "}
                            {rate.find((r) => r.id === hoverClubs)?.description}
                          </div>
                        ) : (
                          <>
                            {selectedClubs ? (
                              <div className="flex mx-auto justify-center w-full font-medium text-sm">
                                {selectedClubs} -{" "}
                                {
                                  rate.find((r) => r.id === selectedClubs)
                                    ?.description
                                }
                              </div>
                            ) : (
                              <div className="flex mx-auto justify-between w-2/3 font-medium text-sm text-muted-foreground">
                                <p>1 - Pesimo</p>
                                <p>5 - Excelente</p>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-4 mt-4">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="border p-4 shadow-md rounded-md">
                    <FormLabel className="font-semibold">
                      Escribe una Reseña <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Que quieres compartir con otros estudiantes sobre esta universidad?"
                        className="h-40"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormDescription className="flex flex-col gap-4 items-center justify-center border shadow-md rounded-md p-4">
                <span className="w-2/3 text-center font-medium">
                  Al hacer click en el boton "Calificar", reconozco que he leido
                  y estoy de acuerdo con los{" "}
                  <Link
                    href="/"
                    className="text-blue-600 hover:text-blue-600/90"
                  >
                    Terminos y Condiciones
                  </Link>{" "}
                  y las{" "}
                  <Link
                    href="/"
                    className="text-blue-600 hover:text-blue-600/90"
                  >
                    Politicas de Privacidad
                  </Link>{" "}
                  de Califica Tu Profesor.
                </span>
                <Button
                  type="submit"
                  className="font-semibold px-12"
                  disabled={isFormFilled || isFormLoading}
                >
                  Calificar
                </Button>
              </FormDescription>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default RateUniversity;
