import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Image src="/images/404.svg" alt="Not found" width={500} height={500} />
      <p className="mt-5 font-semibold">
        Page Not Found |
        <Link href="/" className="text-blue-600 hover:text-blue-600/90">
          {" "}
          Return Home
        </Link>
      </p>
    </div>
  );
}
