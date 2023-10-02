"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const Hero = () => {
  const [suggestions, setSuggestions] = useState<Search[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("profesor");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchSuggestions();
  }, [selectedOption, searchText]);

  const fetchSuggestions = async () => {
    if (searchText.length > 0) {
      setOpen(true);
    }

    try {
      let endpoint = "";
      if (selectedOption === "profesor") {
        endpoint = "/api/professor";
      } else if (selectedOption === "universidad") {
        endpoint = "/api/university";
      }

      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();

        const filteredSuggestions = data.filter((item: Search) =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        );

        setSuggestions(filteredSuggestions);
      }
    } catch (error) {
      console.error("Error fetching suggestions", error);
    }
  };

  return (
    <section className="flex items-center w-full bg-gray-100 h-full">
      <div className="flex flex-col items-center justify-center max-w-7xl mx-auto">
        <p className="text-3xl font-semibold mb-5 text-center">
          Encuentra tu <span className="font-bold"> Universidad/Profesor </span>
        </p>
        <div className="flex w-full">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              asChild
              className="flex w-full"
              onClick={(e) => e.preventDefault()}
            >
              <div className="w-full">
                <Select
                  defaultValue={selectedOption}
                  onValueChange={(value) => setSelectedOption(value)}
                >
                  <SelectTrigger className="w-[250px] p-7 rounded-l-full focus:ring-0 focus:ring-offset-0 border-r-0">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="profesor" className="cursor-pointer">
                      Profesor
                    </SelectItem>
                    <SelectItem value="universidad" className="cursor-pointer">
                      Universidad
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Buscar..."
                  className="rounded-r-full p-7 focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="p-0"
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
                      <Link
                        href={
                          selectedOption === "profesor"
                            ? `/profesor/${item.id}`
                            : `/universidad/${item.id}`
                        }
                        key={i}
                      >
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
    </section>
  );
};

export default Hero;
