import Image from "next/image";
import Link from "next/link";

export default function latest() {
  return (
    <div className="container mx-auto py-16 md:px-20">
      <>
        <h1 className="pb-12 text-center text-3xl font-bold">Latest Posts</h1>
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-3"></div>
        {Post()}
      </>
    </div>
  );
}

function Post() {}
