// src/Components/Home/Home.jsx
import Hero from "./Hero.jsx";
import WhyUs from "./WhyUs.jsx";
import Vision from "./Vision.jsx";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section id="home" className="scroll-mt-20">
        <Hero />
      </section>

      {/* Why Us */}

      {/* Vision & Mission */}
      <section id="vision" className="scroll-mt-20">
        <Vision />
      </section>

      <section id="why-us" className="scroll-mt-20">
        <WhyUs />
      </section>
    </main>
  );
}
