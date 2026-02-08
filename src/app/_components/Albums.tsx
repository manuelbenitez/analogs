import React, { useRef } from "react";

interface AlbumCardProps {
  album: string;
}

const AlbumCard = ({ album }: AlbumCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const reflectionRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !reflectionRef.current) return;

    const card = cardRef.current;
    const reflection = reflectionRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Reduced rotation angles for subtlety (±5 degrees instead of ±15)
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    // Apply transform directly to the element for smoother performance
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // Calculate reflection angle based on mouse position
    // Map mouse X position to rotation angle (from top-left to top-right diagonal)
    const normalizedX = x / rect.width; // 0 to 1

    // Calculate position - moves horizontally across the card
    const reflectionX = ((x - centerX) / centerX) * 150; // -150 to 150 for wider range

    // Rotate based on mouse position to create diagonal sweep effect
    const rotationAngle = -45 + normalizedX * 90; // -45deg to 45deg

    // Position and rotate the reflection bar
    reflection.style.transform = `translateX(${reflectionX}%) rotate(${rotationAngle}deg)`;
    reflection.style.opacity = "0.4";
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !reflectionRef.current) return;
    // Apply neutral transform instead of removing it for smooth transition
    cardRef.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    cardRef.current.style.transitionDuration = "0.35s";
    // Reset reflection
    reflectionRef.current.style.transform = "translateX(0) rotate(0deg)";
    reflectionRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={cardRef}
      key={album}
      className="flex cursor-pointer flex-col rounded-lg bg-white p-3 pb-4 shadow-sm shadow-white transition-transform duration-150 ease-out"
      style={{
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Photo area - black placeholder for now */}
      <div
        className="relative aspect-square w-full overflow-hidden bg-black"
        style={{
          backgroundImage:
            "url(https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU)",
        }}
      >
        {/* Reflection overlay - diagonal bar that follows mouse */}
        <div
          ref={reflectionRef}
          className="pointer-events-none absolute opacity-0 transition-all duration-150 ease-out"
          style={{
            top: "-50%",
            left: "50%",
            width: "80%",
            height: "200%",
            background:
              "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2) 50%, transparent)",
            filter: "blur(20px)",
          }}
        />
      </div>

      {/* Title area on white background */}
      <div className="mt-3 flex items-center justify-center">
        <h3 className="font-comforter-brush text-[5rem] text-black">{album}</h3>
      </div>
    </div>
  );
};

export const Albums = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
        {[
          "Japan",
          "New Zealand",
          "Austria",
          "Argentina",
          "France",
          "España",
          "Andorra",
          "Indonesia",
          "Australia",
          "Random",
          "About",
        ].map((album) => (
          <AlbumCard key={album} album={album} />
        ))}
      </div>
    </div>
  );
};
