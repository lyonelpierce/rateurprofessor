import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { UniversityData } from "@/constants/UniversityType";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    if (!params?.id) {
      throw new Error("University ID is missing.");
    }

    const res = await fetch(`/api/profile/university/${params.id}`);
    console.log("res", res);

    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status code: ${res.status}`);
    }

    const repo: UniversityData = await res.json();

    return { props: { repo } };
  } catch (error: any) {
    // console.error(error.message);

    return { props: { repo: null } };
  }
};

export default function Page({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  //   console.log(repo);
  return <div>index</div>;
}
