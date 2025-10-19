import { motion } from "framer-motion";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Contact() {
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      q: "Do you handle bulk 3D printing orders?",
      a: "Yes! We specialize in both single prototypes and large batch productions with consistent quality and precision.",
    },
    {
      q: "Can you help refine or redesign my model?",
      a: "Absolutely — our in-house design team can optimize your CAD files for printability, strength, and aesthetics.",
    },
    {
      q: "What materials do you print with?",
      a: "We support PLA, ABS, PETG, Nylon, TPU, and advanced composites like carbon-fiber-filled filaments.",
    },
    {
      q: "How long does an average order take?",
      a: "Depending on complexity, most prints are ready within 24-72 hours after design confirmation.",
    },
  ];

  const whatsappNumber = "919342972807";

  const handleWhatsAppMessage = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const subject = e.target.subject.value;
    const message = e.target.message.value;
    const fullMessage = encodeURIComponent(
      `Hi, I have a query about Chroma3D!\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${fullMessage}`, "_blank");
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-black text-neutral-200 overflow-hidden px-6 py-16 md:px-12">
      {/* === Ambient Background === */}
      <div className="absolute inset-0 bg-black" />
      <div className="pointer-events-none absolute -top-20 left-10 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-20 h-[400px] w-[400px] rounded-full bg-orange-500/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background:repeating-linear-gradient(90deg,transparent_0_20px,rgba(255,255,255,0.05)_21px,transparent_22px)]" />

      {/* === Header === */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center mb-10"
      >
        <div className="mb-3 inline-flex items-center gap-3 text-[13px] tracking-[0.4em] text-orange-500/80">
          <span className="h-[1px] w-8 bg-orange-500/60" /> CONTACT US{" "}
          <span className="h-[1px] w-8 bg-orange-500/60" />
        </div>
        <h1
          className="text-4xl md:text-5xl font-semibold text-white"
          style={{ fontFamily: "StardusterLasital, Poppins, sans-serif" }}
        >
          Let’s <span className="text-orange-500">Create</span> Something Amazing
        </h1>
        <p className="mt-3 text-neutral-400 text-sm md:text-base max-w-lg mx-auto">
          Have an idea, project, or question? Reach out — we’re always excited
          to collaborate and bring imagination to form.
        </p>
      </motion.div>

      {/* === Contact Form === */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
        className="relative z-10 w-full max-w-2xl rounded-2xl border border-neutral-800/80 bg-white/5 backdrop-blur-xl shadow-[0_0_60px_rgba(249,115,22,0.05)] p-8 md:p-10"
      >
        <form className="flex flex-col gap-5 text-sm" onSubmit={handleWhatsAppMessage}>
          <div className="flex flex-col md:flex-row gap-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="flex-1 rounded-lg bg-black/60 border border-neutral-700/80 px-4 py-3 text-white focus:outline-none focus:border-orange-500/80 transition"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="flex-1 rounded-lg bg-black/60 border border-neutral-700/80 px-4 py-3 text-white focus:outline-none focus:border-orange-500/80 transition"
              required
            />
          </div>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            className="rounded-lg bg-black/60 border border-neutral-700/80 px-4 py-3 text-white focus:outline-none focus:border-orange-500/80 transition"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            className="rounded-lg bg-black/60 border border-neutral-700/80 px-4 py-3 text-white focus:outline-none focus:border-orange-500/80 transition resize-none"
            required
          ></textarea>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-2 self-center md:self-start bg-orange-600/90 hover:bg-orange-500 text-white font-medium px-6 py-3 rounded-lg transition"
          >
            Send Message →
          </motion.button>
        </form>
      </motion.div>

      {/* === Location Section === */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
        className="relative z-10 mt-20 w-full max-w-3xl text-center"
      >
        <h2
          className="text-3xl md:text-4xl font-semibold text-white mb-6"
          style={{ fontFamily: "StardusterLasital, Poppins, sans-serif" }}
        >
          Our <span className="text-orange-500">Location</span>
        </h2>
        <p className="text-sm md:text-base text-neutral-400 mb-6">
          Visit us at our studio in Chennai — where creativity meets precision.
        </p>
        <div className="rounded-xl overflow-hidden border border-neutral-800 shadow-[0_0_40px_rgba(249,115,22,0.05)]">
          <iframe
            title="Chroma3D Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.226639278774!2d80.217431775076!3d13.045587687264457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52673e0bce8d61%3A0x7f3e5c09aee6e9df!2sWest%20Mambalam%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1708863500000!5m2!1sen!2sin"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </motion.div>

      {/* === FAQ Section === */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        className="relative z-10 mt-20 w-full max-w-3xl"
      >
        <h2
          className="text-center text-3xl md:text-4xl font-semibold text-white mb-8"
          style={{ fontFamily: "StardusterLasital, Poppins, sans-serif" }}
        >
          <span className="text-orange-500">FAQs</span> — What People Ask Us
        </h2>

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <motion.div
              key={index}
              className={`rounded-xl border border-neutral-800/80 backdrop-blur-lg px-6 py-4 transition-all ${
                open === index ? "bg-orange-500/5" : "bg-white/5"
              }`}
            >
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="flex justify-between items-center w-full text-left"
              >
                <span className="text-sm md:text-base font-medium text-white">
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: open === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-orange-500"
                >
                  <ExpandMoreIcon />
                </motion.span>
              </button>

              {open === index && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 text-sm text-neutral-300 leading-relaxed"
                >
                  {item.a}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
