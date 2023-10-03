"use client";

import { usePathname } from "next/navigation";

const University = () => {
  const pathname = usePathname();
  const id = pathname.split("/universidad/")[1];

  return <div className="py-8 max-w-7xl mx-auto">University</div>;
};

export default University;
