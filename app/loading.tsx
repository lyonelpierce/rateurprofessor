import { NewtonsCradle } from "@uiball/loaders";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-full w-full z-50">
      <NewtonsCradle size={40} speed={1.4} color="black" />;
    </div>
  );
}
