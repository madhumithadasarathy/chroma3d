// src/App.jsx
import Header from "./Components/Header/Header.jsx";
import Hero from "./Components/Home/Hero.jsx";
<<<<<<< Updated upstream
import WhyUs from "./Components/Home/WhyUs.jsx"; // <-- add this
=======
import WhyUs from "./Components/Home/WhyUs.jsx";
>>>>>>> Stashed changes

export default function App() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero (top of page) */}
      <section id="home" className="scroll-mt-20">
        <Hero />
        <WhyUs />
      </section>
<<<<<<< Updated upstream

      {/* Why Us */}
      <section id="why-us" className="scroll-mt-20">
        <WhyUs />
      </section>
=======
      
      
>>>>>>> Stashed changes
    </main>
  );
}
