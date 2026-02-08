"use client";

import { useRef } from "react";
import ImageGallery from "react-image-gallery";
import type { GalleryItem, ImageGalleryRef } from "react-image-gallery";
import { useParams } from "next/navigation";
import React from "react";

const images: GalleryItem[] = [
  {
    original:
      "https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU",
    thumbnail:
      "https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU",
  },
  {
    original:
      "https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU",
    thumbnail:
      "https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU",
  },
  {
    original:
      "https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU",
    thumbnail:
      "https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU",
  },
  {
    original:
      "https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU",
    thumbnail:
      "https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU",
  },
  {
    original:
      "https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU",
    thumbnail:
      "https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU",
  },
  {
    original:
      "https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU",
    thumbnail:
      "https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU",
  },
  {
    original:
      "https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU",
    thumbnail:
      "https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU",
  },
  {
    original:
      "https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU",
    thumbnail:
      "https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU",
  },
  {
    original:
      "https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU",
    thumbnail:
      "https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU",
  },
  {
    original:
      "https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU",
    thumbnail:
      "https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU",
  },
  {
    original:
      "https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU",
    thumbnail:
      "https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU",
  },
  {
    original:
      "https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU",
    thumbnail:
      "https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU",
  },
  {
    original:
      "https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU",
    thumbnail:
      "https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU",
  },
  {
    original:
      "https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU",
    thumbnail:
      "https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU",
  },
  {
    original:
      "https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU",
    thumbnail:
      "https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU",
  },
  {
    original:
      "https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU",
    thumbnail:
      "https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU",
  },
];
export default function Album() {
  const { album } = useParams();

  const imageGalleryRef = useRef<ImageGalleryRef>(null);

  return <ImageGallery ref={imageGalleryRef} items={images} lazyLoad />;
}
