import Link from "next/link";

export default function header() {
  return (
    <header className="bg-gray-500">
      <div className="flex flex-col items-center py-3 text-center sm:flex-row sm:justify-between xl:container xl:mx-auto">
        <div className="w-80 shrink sm:order-1">
          <Link href={"/"} className="text-2xl font-bold">
            Danger Close! Painting
          </Link>
        </div>
        <div className="order-2 flex w-96 justify-center">
          <div className="flex gap-6">
            <Link href={"/"}>Instagram</Link>
            <Link href={"/"}>Instagram</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
