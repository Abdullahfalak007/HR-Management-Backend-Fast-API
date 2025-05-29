import Image from "next/image";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-full">
      <Image
        src="/loader.gif"
        alt="Loading…"
        width={288}
        height={288}
        className="w-72 h-72"
      />
    </div>
  );
}
