"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UniversityData } from "@/constants/UniversityType";
import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "next-share";

type ProfileInfoProps = {
  university: UniversityData;
};

const ProfileInfo = ({ university }: ProfileInfoProps) => {
  const pathname = usePathname();

  return (
    <section className="fixed mt-20 w-full bg-white shadow-md py-8 z-20">
      <div className="flex max-w-7xl justify-between items-center mx-auto px-4">
        <div className="flex flex-col w-full">
          <p className="text-base font-semibold text-muted-foreground">
            {university.universities.location}
          </p>
          <h2 className="text-xl md:text-3xl font-bold">
            {pathname.includes("profesores") && "Profesores - "}
            {pathname.includes("calificar") && "Calificar - "}
            {pathname.includes("nuevo") && "Nuevo Profesor - "}
            {university.universities.name}
          </h2>
          <div className="flex gap-2">
            {!pathname.includes("profesores") &&
              !pathname.includes("calificar") &&
              !pathname.includes("nuevo") && (
                <Link
                  href={`/universidad/${university.universities.id}/calificar`}
                >
                  <Button className="font-semibold mt-2 bg-blue-600 hover:bg-blue-600/90">
                    Calificar
                  </Button>
                </Link>
              )}
            <Link
              href={
                pathname.includes("profesores") ||
                pathname.includes("calificar")
                  ? `/universidad/${university.universities.id}`
                  : `/universidad/${university.universities.id}/profesores`
              }
            >
              <Button
                variant="outline"
                className="font-semibold mt-2 text-blue-600 border-blue-600 hover:bg-blue-600/90 hover:text-white"
              >
                {pathname.includes("profesores") ||
                pathname.includes("calificar")
                  ? "Ver Universidad"
                  : "Ver Profesores"}
              </Button>
            </Link>
          </div>
        </div>
        <ul className="md:grid grid-cols-4 gap-2 hidden">
          <li>
            <FacebookShareButton
              url={`https://califcatuprofe.ec/${pathname}`}
              quote={
                "Califica a tu profesor y ayuda a otros estudiantes a elegir a los mejores profesores de tu universidad."
              }
              hashtag={"#calificatuprofe"}
            >
              <FacebookIcon size={35} round />
            </FacebookShareButton>
          </li>
          <li>
            <FacebookMessengerShareButton
              url={`https://califcatuprofe.ec/${pathname}`}
              appId={""}
            >
              <FacebookMessengerIcon size={35} round />
            </FacebookMessengerShareButton>
          </li>
          <li>
            <WhatsappShareButton
              url={`https://califcatuprofe.ec/${pathname}`}
              title={
                "Califica a tu profesor y ayuda a otros estudiantes a elegir a los mejores profesores de tu universidad."
              }
              separator=":: "
            >
              <WhatsappIcon size={35} round />
            </WhatsappShareButton>
          </li>
          <li>
            <TwitterShareButton
              url={`https://califcatuprofe.ec/${pathname}`}
              title={
                "Califica a tu profesor y ayuda a otros estudiantes a elegir a los mejores profesores de tu universidad."
              }
            >
              <TwitterIcon size={35} round />
            </TwitterShareButton>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ProfileInfo;
