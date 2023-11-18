"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
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

const ProfileInfo = ({ professor }: any) => {
  const pathname = usePathname();

  return (
    <section className="fixed mt-20 w-full bg-white shadow-md py-4 z-20">
      <div className="flex max-w-7xl justify-between items-center mx-auto h-36 px-4">
        <div className="flex flex-col w-full">
          <h2 className="text-3xl font-bold">
            {pathname.includes("calificar") ? "Calificar - " : ""}
            {professor.professors.name}
          </h2>
          <p className="font-semibold text-muted-foreground">
            {professor.professors.university.name}
          </p>
          <div className="flex gap-2">
            {!pathname.includes("calificar") && (
              <Link href={`/profesor/${professor.professors.id}/calificar`}>
                <Button className="font-semibold mt-2 bg-blue-600 hover:bg-blue-600/90">
                  Calificar
                </Button>
              </Link>
            )}
            <Link
              href={
                pathname.includes("calificar")
                  ? `/profesor/${professor.professors.id}`
                  : `/universidad/${professor.professors.university.id}`
              }
            >
              <Button
                variant="outline"
                className="font-semibold mt-2 text-blue-600 border-blue-600 hover:bg-blue-600/90 hover:text-white"
              >
                {pathname.includes("calificar")
                  ? "Ver Profesor"
                  : "Ver Universidad"}
              </Button>
            </Link>
          </div>
        </div>
        {/* <ul className="md:grid grid-cols-4 gap-2 hidden">
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
        </ul> */}
      </div>
    </section>
  );
};

export default ProfileInfo;
