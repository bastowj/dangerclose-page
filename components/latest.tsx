import Image from "next/image";
import Link from "next/link";

export default function latest() {
  return (
    <div className="container mx-auto py-16 md:px-20">
      <>
        <h1 className="pb-12 text-center text-3xl font-bold">Latest Posts</h1>
        <div className="grid gap-14 md:grid-cols-3 lg:grid-cols-4">
          {Post()}
          {Post()}
          {Post()}
          {Post()}
          {Post()}
          {Post()}
          {Post()}
          {Post()}
        </div>
      </>
    </div>
  );
}

function Post() {
  return (
    <div className="item">
      <div className="image">
        {" "}
        <Link href={"/"}>
          <Image
            src={"/images/showcase1.jpg"}
            width={200}
            height={200}
            alt="image"
            className="rounded-full "
          />
        </Link>
      </div>
      <div className="info flex flex-col justify-center py-4">
        <div className="cat mb-2">
          <Link href={"/"}>Categories - Date</Link>
        </div>
        <div className="title mb-5">
          <Link href={"/"} className="text-2xl md:text-3xl">
            Lorem ipsum
          </Link>
        </div>
        <div className="description">
          <Link href={"/"} className="">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </Link>
        </div>
      </div>
    </div>
  );
}
