import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";

export default function showcase() {
  SwiperCore.use([Autoplay]);
  return (
    <div className="container mx-auto max-w-6xl pt-8 pb-16 md:px-20 md:pt-16">
      <h1 className="pb-12 text-center text-3xl font-bold">Showcase</h1>
      <Swiper
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
        }}
      >
        <SwiperSlide>{Slide()}</SwiperSlide>
        <SwiperSlide>{Slide()}</SwiperSlide>
        <SwiperSlide>{Slide()}</SwiperSlide>
        <SwiperSlide>{Slide()}</SwiperSlide>
        <SwiperSlide>{Slide()}</SwiperSlide>
      </Swiper>
    </div>
  );
}

function Slide() {
  return (
    <div className="mx-20 grid grid-cols-1 place-items-center md:grid-cols-2 gap-10">
      <div className="image">
        <Link href={"/"}>
          <Image
            src={"/images/showcase1.jpg"}
            width={400}
            height={400}
            alt="image"
            className="rounded-full "
          />
        </Link>
      </div>
      <div className="info">
        <div className="cat mb-2">
          <Link href={"/"}>Categories - Date</Link>
        </div>
        <div className="title mb-5">
          <Link href={"/"} className="text-3xl md:text-4xl">
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
