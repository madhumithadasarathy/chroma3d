import Header from "./Components/Header/Header.jsx";
import Hero from "./Components/Home/Hero.jsx";

export default function App() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero (top of page) */}
      <section id="home" className="scroll-mt-20">
        <Hero />
      </section>

      
    </main>
  );
}
