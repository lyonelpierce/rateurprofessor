"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import * as z from "zod";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../app/(profile)/profesor/[id]/calificar/constants";
import TermsAndConditions from "./TermsAndConditions";

const ProfessorRate = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course: "",
      rate: "",
      difficulty: "",
      again: "",
      content: "",
    },
  });

  const rates = [
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

  const difficulties = [
    {
      id: 1,
      description: "Muy Fácil",
    },
    {
      id: 2,
      description: "Fácil",
    },
    {
      id: 3,
      description: "Regular",
    },
    {
      id: 4,
      description: "Difícil",
    },
    {
      id: 5,
      description: "Muy Difícil",
    },
  ];

  const [open, setOpen] = useState(false);

  const [difficulty, setDifficulty] = useState(0);
  const [hoverDifficulty, setHoverDifficulty] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState(0);

  const [rate, setRate] = useState(0);
  const [hoverRate, setHoverRate] = useState(0);
  const [selectedRate, setSelectedRate] = useState(0);

  const isFormLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch(
        `/api/profile/university/${params.id}/rate/`,
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

  return (
    <>
      <TermsAndConditions open={open} onOpenChange={() => setOpen(false)} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="pt-72 pb-8">
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem className="border p-4 shadow-md rounded-md">
                  <FormLabel className="font-semibold">
                    Que materia dicta este docente?{" "}
                    <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-center">
                      <Input
                        placeholder="Nombre de la materia"
                        className="p-6 w-[300px] rounded-full"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rate"
              render={({ field }) => (
                <FormItem className="border p-4 shadow-md rounded-md">
                  <FormLabel className="font-semibold">
                    Calificación del profesor{" "}
                    <span className="text-red-600">*</span>
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
                              (rate >= 1 || hoverRate >= 1) && "bg-red-400"
                            )}
                            onClick={() => {
                              setRate(1);
                              setSelectedRate(1);
                            }}
                            onMouseEnter={() => setHoverRate(1)}
                            onMouseLeave={() => setHoverRate(0)}
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
                              (rate >= 2 || hoverRate >= 2) && "bg-orange-400"
                            )}
                            onClick={() => {
                              setRate(2);
                              setSelectedRate(2);
                            }}
                            onMouseEnter={() => setHoverRate(2)}
                            onMouseLeave={() => setHoverRate(0)}
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
                              (rate >= 3 || hoverRate >= 3) && "bg-yellow-400"
                            )}
                            onClick={() => {
                              setRate(3);
                              setSelectedRate(3);
                            }}
                            onMouseEnter={() => setHoverRate(3)}
                            onMouseLeave={() => setHoverRate(0)}
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
                              (rate >= 4 || hoverRate >= 4) && "bg-green-400"
                            )}
                            onClick={() => {
                              setRate(4);
                              setSelectedRate(4);
                            }}
                            onMouseEnter={() => setHoverRate(4)}
                            onMouseLeave={() => setHoverRate(0)}
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
                              (rate === 5 || hoverRate === 5) && "bg-green-600"
                            )}
                            onClick={() => {
                              setRate(5);
                              setSelectedRate(5);
                            }}
                            onMouseEnter={() => setHoverRate(5)}
                            onMouseLeave={() => setHoverRate(0)}
                          />
                        </div>
                      </RadioGroup>
                      {hoverRate ? (
                        <div className="flex mx-auto justify-center w-full font-medium text-sm text-muted-foreground">
                          {hoverRate} -{" "}
                          {rates.find((r) => r.id === hoverRate)?.description}
                        </div>
                      ) : (
                        <>
                          {selectedRate ? (
                            <div className="flex mx-auto justify-center w-full font-medium text-sm">
                              {selectedRate} -{" "}
                              {
                                rates.find((r) => r.id === selectedRate)
                                  ?.description
                              }
                            </div>
                          ) : (
                            <div className="flex mx-auto justify-between md:w-2/3 font-medium text-sm text-muted-foreground">
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
              name="difficulty"
              render={({ field }) => (
                <FormItem className="border p-4 shadow-md rounded-md">
                  <FormLabel className="font-semibold">
                    Que tan dificil fue este profesor?{" "}
                    <span className="text-red-600">*</span>
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
                              (difficulty >= 1 || hoverDifficulty >= 1) &&
                                "bg-red-400"
                            )}
                            onClick={() => {
                              setDifficulty(1);
                              setSelectedDifficulty(1);
                            }}
                            onMouseEnter={() => setHoverDifficulty(1)}
                            onMouseLeave={() => setHoverDifficulty(0)}
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
                              (difficulty >= 2 || hoverDifficulty >= 2) &&
                                "bg-orange-400"
                            )}
                            onClick={() => {
                              setDifficulty(2);
                              setSelectedDifficulty(2);
                            }}
                            onMouseEnter={() => setHoverDifficulty(2)}
                            onMouseLeave={() => setHoverDifficulty(0)}
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
                              (difficulty >= 3 || hoverDifficulty >= 3) &&
                                "bg-yellow-400"
                            )}
                            onClick={() => {
                              setDifficulty(3);
                              setSelectedDifficulty(3);
                            }}
                            onMouseEnter={() => setHoverDifficulty(3)}
                            onMouseLeave={() => setHoverDifficulty(0)}
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
                              (difficulty >= 4 || hoverDifficulty >= 4) &&
                                "bg-green-400"
                            )}
                            onClick={() => {
                              setDifficulty(4);
                              setSelectedDifficulty(4);
                            }}
                            onMouseEnter={() => setHoverDifficulty(4)}
                            onMouseLeave={() => setHoverDifficulty(0)}
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
                              (difficulty === 5 || hoverDifficulty === 5) &&
                                "bg-green-600"
                            )}
                            onClick={() => {
                              setDifficulty(5);
                              setSelectedDifficulty(5);
                            }}
                            onMouseEnter={() => setHoverDifficulty(5)}
                            onMouseLeave={() => setHoverDifficulty(0)}
                          />
                        </div>
                      </RadioGroup>
                      {hoverDifficulty ? (
                        <div className="flex mx-auto justify-center w-full font-medium text-sm text-muted-foreground">
                          {hoverDifficulty} -{" "}
                          {
                            difficulties.find((r) => r.id === hoverDifficulty)
                              ?.description
                          }
                        </div>
                      ) : (
                        <>
                          {selectedDifficulty ? (
                            <div className="flex mx-auto justify-center w-full font-medium text-sm">
                              {selectedDifficulty} -{" "}
                              {
                                difficulties.find(
                                  (r) => r.id === selectedDifficulty
                                )?.description
                              }
                            </div>
                          ) : (
                            <div className="flex mx-auto justify-between md:w-2/3 font-medium text-sm text-muted-foreground">
                              <p>1 - Muy Fácil</p>
                              <p>5 - Muy Díficil</p>
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
              name="again"
              render={({ field }) => (
                <FormItem className="border p-4 shadow-md rounded-md">
                  <FormLabel className="font-semibold">
                    Tomarias otra clase con este profesor?{" "}
                    <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <>
                      <RadioGroup
                        className="flex justify-center p-5 gap-10"
                        onValueChange={field.onChange}
                        disabled={isFormLoading}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <RadioGroupItem
                            value="1"
                            id="option-one"
                            className="h-8 w-8"
                          />
                          <Label htmlFor="option-one">Si</Label>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <RadioGroupItem
                            value="0"
                            id="option-two"
                            className="h-8 w-8"
                          />
                          <Label htmlFor="option-two">No</Label>
                        </div>
                      </RadioGroup>
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
                      disabled={isFormLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormDescription className="flex flex-col gap-4 items-center justify-center border shadow-md rounded-md p-4">
              <span className="md:w-2/3 text-center font-medium">
                Al hacer click en el boton Calificar, reconozco que he leido y
                estoy de acuerdo con los{" "}
                <span
                  className="text-blue-600 hover:text-blue-600/90 cursor-pointer hover:underline"
                  onClick={() => setOpen(true)}
                >
                  Terminos y Condiciones{" "}
                </span>{" "}
                y{" "}
                <span className="text-blue-600 hover:text-blue-600/90 cursor-pointer hover:underline">
                  Políticas de Privacidad{" "}
                </span>
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
    </>
  );
};

export default ProfessorRate;
