"use client";

import Typewriter from "typewriter-effect";

export function TypewriterTitle() {
  return (
    <h1 className="font-height text-center text-5xl leading-normal font-extrabold tracking-tight [text-shadow:-0.5px_-0.5px_0_#000,-0.5px_0.5px_0_#000,0.5px_-0.5px_0_#000,0.5px_0.5px_0_#000] sm:text-[5rem]">
      <Typewriter
        options={{
          strings: ["Digital Scrapbook of Analog Pictures"],
          autoStart: true,
          loop: false,
          delay: 100,
          cursor: "",
          deleteSpeed: Infinity,
        }}
      />
    </h1>
  );
}
