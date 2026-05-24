"use client";

import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export interface ShowcaseSlide {
  slug: string;
  src: string;
  alt: string;
  caption?: string;
  date: string;
  categories: string[];
  title: string;
  href: string | null;
}

export default function Showcase({ slides }: { slides: ShowcaseSlide[] }) {
  if (slides.length === 0) return null;
  return (
    <div className="showcase">
      <h1 className="showcase-title">Showcase</h1>
      <Swiper
        slidesPerView={1}
        loop={slides.length > 1}
        modules={[Autoplay]}
        autoplay={{ delay: 4000 }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.slug}>
            <Slide slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function Slide({ slide }: { slide: ShowcaseSlide }) {
  const img = (
    <Image
      src={slide.src}
      width={400}
      height={400}
      alt={slide.alt}
      className="showcase-image"
    />
  );
  const title = <span className="showcase-card-title">{slide.title}</span>;
  return (
    <div className="showcase-slide">
      <div className="showcase-image-wrap">
        {slide.href ? <Link href={slide.href}>{img}</Link> : img}
      </div>
      <div className="showcase-info">
        <div className="showcase-meta">
          {slide.categories.length > 0 && (
            <span>{slide.categories.join(", ")} · </span>
          )}
          <span>{slide.date}</span>
        </div>
        <div className="showcase-card-title-wrap">
          {slide.href ? <Link href={slide.href}>{title}</Link> : title}
        </div>
        {slide.caption && <p className="showcase-caption">{slide.caption}</p>}
      </div>
    </div>
  );
}
