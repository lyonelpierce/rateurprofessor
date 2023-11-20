"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import useSWR from "swr";
import TypewriterComponent from "typewriter-effect";

import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { GraduationCap } from "lucide-react";

interface Search {
  id: number;
  name: string;
  location?: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Hero = () => {
  const [suggestions, setSuggestions] = useState<Search[]>([]);
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const { data, error } = useSWR(
    searchText.length > 0 ? "/api/search/university" : null,
    fetcher
  );

  useEffect(() => {
    setOpen(searchText.length > 0);
    if (data) {
      const filteredSuggestions = data.filter((item: Search) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  }, [data, searchText]);

  return (
    <section className="flex mt-20 h-52 md:h-[32rem] w-full bg-zinc-500 bg-[url('/images/hero.jpg')] bg-cover md:bg-center bg-no-repeat bg-blend-multiply">
      <div className="flex flex-col items-center justify-center backdrop-blur-sm w-full h-full">
        <div>
          <p className="text-2xl md:text-3xl font-semibold text-center text-white tracking-wide">
            Encuentra tu <br className="md:hidden" />
          </p>
          <div className="text-center font-bold text-white text-4xl md:text-6xl mb-5">
            <TypewriterComponent
              options={{
                strings: ["Universidad", "Instituto"],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
          <div className="flex w-full">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger
                asChild
                className="flex w-full"
                onClick={(e) => e.preventDefault()}
              >
                <div className="flex items-center justify-center">
                  <Input
                    placeholder="Buscar universidad..."
                    className="rounded-full text-sm md:text-base p-7 focus-visible:ring-0 focus-visible:ring-offset-0 w-[350px] md:w-[515px]"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent
                className="border-0 p-0 w-[350px] md:w-[515px]"
                onOpenAutoFocus={(e) => e.preventDefault()}
              >
                <ul className="rounded-3xl overflow-hidden">
                  {suggestions.length === 0 ? (
                    <li className="flex items-center justify-center text-sm p-4">
                      No se encontraron resultados.
                    </li>
                  ) : (
                    suggestions
                      .filter((_, index) => index < 5)
                      .map((item, i) => (
                        <Link href={`/universidad/${item.id}`} key={i}>
                          <li
                            key={item.id}
                            className="flex items-center md:p-1 w-full text-xs md:text-sm transition-colors hover:bg-blue-600 cursor-pointer hover:text-white"
                          >
                            <div className="md:flex justify-center hidden md:w-[15%]">
                              <GraduationCap className="w-5 h-5 md:w-7 md:h-7" />
                            </div>
                            <div className="p-2 md:p-4 w-[100%] md:w-[85%] px-4 md:px-0">
                              <p className="font-bold capitalize">
                                {item.name}
                              </p>
                              <p className="font-semibold hidden md:flex">
                                {item.location}
                              </p>
                            </div>
                          </li>
                        </Link>
                      ))
                  )}
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
