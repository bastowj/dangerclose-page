import { FaInstagram, FaMastodon } from "react-icons/fa";
import Link from "next/link";

export default function header() {
  return (
    <header className="bg-gray-50">
      <div className="flex flex-col items-center py-3 text-center sm:flex-row sm:justify-between xl:container xl:mx-auto">
        <div className="w-80 shrink sm:order-1">
          <Link href={"/"} className="text-2xl font-bold">
            Danger Close! Painting
          </Link>
        </div>
        <div className="order-2 flex w-96 justify-center">
          <div className="flex gap-6">
            <Link href={"/"}>
              <FaInstagram color="c0c0c0" />
            </Link>
            <Link href={"/"}>
              <FaMastodon color="c0c0c0" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
