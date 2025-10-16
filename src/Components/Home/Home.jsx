// src/Components/Home/Home.jsx
import Hero from "./Hero.jsx";
import WhyUs from "./WhyUs.jsx";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section id="home" className="scroll-mt-20">
        <Hero />
      </section>

      {/* Why Us */}
      <section id="why-us" className="scroll-mt-20">
        <WhyUs />
      </section>
    </main>
  );
}
