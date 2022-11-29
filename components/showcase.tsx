import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";

export default function showcase() {
  SwiperCore.use([Autoplay]);
  return (
    <div className="container mx-auto py-16 md:px-20">
      <h1 className="pb-12 text-center text-3xl font-bold">Showcase</h1>
      <Swiper
        className="container mx-auto"
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
    <div className="grid md:grid-cols-2 place-items-center">
      <div className="image">
        <Link href={"/"}>
          <Image
            src={"/images/showcase1.jpg"}
            width={600}
            height={600}
            alt="image"
            className="rounded-full"
          />
        </Link>
      </div>
      <div className="info">
        <div className="cat">
          <Link href={"/"}>Categories - Date</Link>
        </div>
        <div className="title">
          <Link href={"/"} className="text-3xl md:text-6xl">
            Title
          </Link>
        </div>
      </div>
    </div>
  );
}
