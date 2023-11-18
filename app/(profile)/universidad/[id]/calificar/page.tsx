// "use client";

// import * as z from "zod";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import useSWR from "swr";
// import { notFound } from "next/navigation";

// import { Button } from "@/components/ui/button";
// import { formSchema } from "./constants";
// import ProfileInfo from "@/components/UniversityInfo";
// import UniversityRate from "@/components/UniversityRate";

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

// const RateUniversity = ({ params }: { params: { id: string } }) => {
//   const {
//     data: university,
//     error,
//     isLoading,
//   } = useSWR(`/api/profile/university/${params.id}`, fetcher);

//   if (error) {
//     notFound();
//   }

//   const router = useRouter();

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       const response = await fetch(
//         `/api/profile/university/${params.id}/rate/`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(values),
//         }
//       );
//       if (response.ok) {
//         router.push(`/universidad/${params.id}`);
//       }
//     } catch (error) {}
//   };

//   return (
//     <section className="flex-grow h-full">
//       {!isLoading && (
//         <>
//           <ProfileInfo university={university} />
//           <div className="max-w-7xl mx-auto h-full px-4">
//             {university.isReviewed ? (
//               <UniversityRate onSubmit={onSubmit} />
//             ) : (
//               <div className="flex items-center justify-center p-5 h-full">
//                 <p className="flex flex-col justify-center items-center font-medium text-base gap-2 pt-64 text-center">
//                   <span className="text-xl md:text-2xl font-semibold">
//                     Ya calificaste esta universidad.
//                   </span>
//                   <span>
//                     Podras volver a calificar esta univesidad dentro de 6 meses.
//                   </span>
//                   <Link href={`/universidad/${params.id}`}>
//                     <Button className="border-0 font-bold bg-blue-600 hover:bg-blue-600/90 hover:text-white">
//                       Regresar
//                     </Button>
//                   </Link>
//                 </p>
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </section>
//   );
// };

// export default RateUniversity;

import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { auth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { UniversityData } from "@/constants/UniversityType";
import ProfileInfo from "@/components/UniversityInfo";
import UniversityRate from "@/components/UniversityRate";

export const revalidate = 0;

async function getUniversity({
  params,
}: {
  params: { id: string };
}): Promise<UniversityData> {
  const { userId } = auth();

  const response = await fetch(
    `${process.env.URL}/api/profile/university/${params.id}`
  );

  if (response.status === 404) notFound();

  return await response.json();
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const university = await getUniversity({ params });

  return {
    title: "Calificar - " + university.universities.name + " | Calificatuprofe",
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const university = await getUniversity({ params });

  return (
    <section className="flex-grow h-full">
      <ProfileInfo university={university} />
      <div className="max-w-7xl mx-auto h-full px-4">
        <UniversityRate params={params} />
      </div>
    </section>
  );
}
