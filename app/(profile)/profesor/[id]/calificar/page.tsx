"use client";

import * as z from "zod";
import Link from "next/link";
import { useState } from "react";
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
import ProfileInfo from "@/components/ProfessorInfo";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const RateProfessor = ({ params }: { params: { id: string } }) => {
  const {
    data: professor,
    error,
    isLoading,
  } = useSWR(`/api/profile/professor/${params.id}`, fetcher);

  if (error) {
    notFound();
  }

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rate: "",
      difficulty: "",
      again: "",
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

  const difficulty = [
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

  const [safety, setSafety] = useState(0);
  const [hoverSafety, setHoverSafety] = useState(0);
  const [selectedSafety, setSelectedSafety] = useState(0);

  const [facilities, setFacilities] = useState(0);
  const [hoverFacilities, setHoverFacilities] = useState(0);
  const [selectedFacilities, setSelectedFacilities] = useState(0);

  const isFormLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch(
        `/api/profile/professor/${params.id}/rate/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (response.ok) {
        router.push(`/profesor/${params.id}`);
      }
    } catch (error) {}
  };

  const values = form.getValues();
  const isFormFilled = Object.values(values).includes("");

  return (
    <section className="h-full">
      {!isLoading && (
        <>
          <ProfileInfo professor={professor} />
          <div className="max-w-7xl mx-auto py-60 h-full">
            {professor.isReviewed ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="pt-64">
                  <div className="grid gap-4">
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
                                      (facilities >= 1 ||
                                        hoverFacilities >= 1) &&
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
                                      (facilities >= 2 ||
                                        hoverFacilities >= 2) &&
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
                                      (facilities >= 3 ||
                                        hoverFacilities >= 3) &&
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
                                      (facilities >= 4 ||
                                        hoverFacilities >= 4) &&
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
                                      (facilities === 5 ||
                                        hoverFacilities === 5) &&
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
                                        rate.find(
                                          (r) => r.id === selectedFacilities
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
                                    difficulty.find((r) => r.id === hoverSafety)
                                      ?.description
                                  }
                                </div>
                              ) : (
                                <>
                                  {selectedSafety ? (
                                    <div className="flex mx-auto justify-center w-full font-medium text-sm">
                                      {selectedSafety} -{" "}
                                      {
                                        difficulty.find(
                                          (r) => r.id === selectedSafety
                                        )?.description
                                      }
                                    </div>
                                  ) : (
                                    <div className="flex mx-auto justify-between w-2/3 font-medium text-sm text-muted-foreground">
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
                                    value="0"
                                    id="option-one"
                                    className="h-8 w-8"
                                  />
                                  <Label htmlFor="option-one">Si</Label>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                  <RadioGroupItem
                                    value="1"
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
                            Escribe una Reseña{" "}
                            <span className="text-red-600">*</span>
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
                        Al hacer click en el boton Calificar, reconozco que he
                        leido y estoy de acuerdo con los{" "}
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
            ) : (
              <div className="flex items-center justify-center pt-52 p-5 h-full w-full">
                <p className="flex flex-col justify-center items-center font-medium text-base gap-2 w-full">
                  <span className="text-2xl font-semibold">
                    Ya calificaste a este profesor.
                  </span>
                  <span>
                    Podras volver a calificar a este profesor dentro de 6 meses.
                  </span>
                  <Link href={`/profesor/${params.id}`}>
                    <Button className="border-0 font-bold bg-blue-600 hover:bg-blue-600/90 hover:text-white">
                      Regresar
                    </Button>
                  </Link>
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default RateProfessor;
