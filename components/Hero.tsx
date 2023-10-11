"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import useSWR from "swr";

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
    <section className="flex items-center w-full bg-zinc-400 h-full bg-[url('/images/hero.jpg')] bg-cover bg-center bg-no-repeat bg-blend-multiply">
      <div className="flex flex-col items-center justify-center backdrop-blur w-full h-full">
        <div>
          <p className="text-3xl font-semibold mb-5 text-center text-white">
            Empieza encontrando tu{" "}
            <span className="font-bold text-white"> Universidad</span>
          </p>
          <div className="flex w-full">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger
                asChild
                className="flex w-full"
                onClick={(e) => e.preventDefault()}
              >
                <div className="w-full">
                  <Input
                    placeholder="Buscar universidad..."
                    className="rounded-full p-7 focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent
                className="border-0 p-0"
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
                            className="flex items-center gap-4 p-1 w-full text-sm transition-colors hover:bg-blue-600 cursor-pointer hover:text-white"
                          >
                            <GraduationCap className="ml-4" />
                            <div className="p-4">
                              <p className="font-bold">{item.name}</p>
                              <p className="font-semibold">{item.location}</p>
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
