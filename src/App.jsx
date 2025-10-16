// src/App.jsx
import Header from "./Components/Header/Header.jsx";
import Hero from "./Components/Home/Hero.jsx";
import WhyUs from "./Components/Home/WhyUs.jsx"; // <-- add this

export default function App() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero (top of page) */}
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
