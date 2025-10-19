// src/Components/Home/Home.jsx
import Hero from "./Hero.jsx";
import WhyUs from "./WhyUs.jsx";
import Vision from "./Vision.jsx";
import Working from "./Working.jsx"; // ⬅️ Added import

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section id="home" className="scroll-mt-20">
        <Hero />
      </section>

      {/* Vision & Mission — tiny overlap to avoid any seam */}
      <section id="vision" className="scroll-mt-20 -mt-[2px]">
        <Vision />
      </section>

      {/* Why Us */}
      <section id="why-us" className="scroll-mt-20 -mt-[2px]">
        <WhyUs />
      </section>

      {/* Working Section */}
      <section id="working" className="scroll-mt-20 -mt-[2px]">
        <Working />
      </section>
    </main>
  );
}
