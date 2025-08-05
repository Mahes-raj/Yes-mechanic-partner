import React, { useRef, useEffect } from "react";
import oilcare from "../../assets/oilcare.mp4";
import breakcln from "../../assets/breakcln.mp4";
import airfilter from "../../assets/airfilter.mp4";
import battery from "../../assets/battery.mp4";
import waterwash from "../../assets/waterwash.mp4";

interface CareItem {
  video: string;
  title: string;
  description: string;
}

const careItems: CareItem[] = [
  {
    video: oilcare,
    title: "Engine Oil Replacement",
    description: "Keep your engine running smooth and clean.",
  },
  {
    video: breakcln,
    title: "Brake Pad Cleaning",
    description: "Safety ensured with clear and responsive brakes.",
  },
  {
    video: airfilter,
    title: "Air Filter Check",
    description: "Breathe clean—your engine and you.",
  },
  {
    video: battery,
    title: "Battery Check",
    description: "Avoid sudden breakdowns with routine battery checks.",
  },
  {
    video: waterwash,
    title: "Water Wash",
    description: "Get that showroom shine, every time.",
  },
];

const MustCare: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = 300;

  // Auto-scroll in circular fashion
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let isResetting = false;

    const scroll = () => {
      if (!slider || isResetting) return; // Now properly using isResetting

      if (
        slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - scrollByAmount
      ) {
        isResetting = true;

        // Disable smooth scroll temporarily
        slider.style.scrollBehavior = "auto";

        // Reset to beginning
        slider.scrollLeft = 0;

        // Restore smooth scroll after reset
        setTimeout(() => {
          slider.style.scrollBehavior = "smooth";
          isResetting = false;
        }, 50);
      } else {
        slider.scrollBy({ left: scrollByAmount, behavior: "smooth" });
      }
    };

    const interval = setInterval(scroll, 4000);

    return () => clearInterval(interval);
  }, []);

  // Duplicate items for smooth circular effect
  const extendedItems = [...careItems, ...careItems];

  return (
    <section className="w-full py-16 px-4 md:px-17 relative overflow-hidden">
      <div
        ref={sliderRef}
        className="flex w-full overflow-x-auto space-x-6 px-2 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {extendedItems.map((item, index) => (
          <div
            key={index}
            className="min-w-[300px] h-64 flex-shrink-0 rounded-xl overflow-hidden relative shadow-md hover:shadow-lg transition"
          >
            <video
              src={item.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 text-white">
              <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
              <p className="text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MustCare;