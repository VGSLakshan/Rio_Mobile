import React, { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import heroVideo2Mp4 from "../assets/videos/hero-video2.mp4";
import Footer from "./Footer";

// ---------------------------------------------
// Data
// ---------------------------------------------
const videos = [
  {
    id: "XkXbkxtBlwY",
    title: "iPhone 15 Pro Max",
    brand: "Apple",
    price: "From Rs. 545,000",
  },
  {
    id: "MJwawT9BHWc",
    title: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    price: "From Rs. 468,000",
  },
  {
    id: "keYat4iSYAQ",
    title: "iPhone 15 Pro",
    brand: "Apple",
    price: "From Rs. 475,000",
  },
  {
    id: "FAH0ZtCh1ls",
    title: "OnePlus 12",
    brand: "OnePlus",
    price: "From Rs. 329,000",
  },
  {
    id: "nzeLG1XO3JM",
    title: "Xiaomi 14 Ultra",
    brand: "Xiaomi",
    price: "From Rs. 389,000",
  },
];

const features = [
  {
    title: "Genuine Warranty",
    desc: "Authorized Sri Lanka warranty & support",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 3l7 4v6a7 7 0 11-14 0V7l7-4z" />
        <path
          d="M9 12l2 2 4-4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Trade‑In Ready",
    desc: "Exchange your old phone instantly",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M16 3h5v5" strokeLinecap="round" />
        <path d="M21 3l-7 7" />
        <path d="M8 21H3v-5" strokeLinecap="round" />
        <path d="M3 21l7-7" />
      </svg>
    ),
  },
  {
    title: "Fast Delivery",
    desc: "Island‑wide shipping in 24–48h",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M3 7h13v10H3z" />
        <path d="M16 10h4l1 2v5h-5V10z" />
        <circle cx="7.5" cy="18.5" r="1.5" />
        <circle cx="17.5" cy="18.5" r="1.5" />
      </svg>
    ),
  },
];

// ---------------------------------------------
// Helpers
// ---------------------------------------------
const ytThumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

// ---------------------------------------------
// Components
// ---------------------------------------------
function StatPill({ label }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs tracking-wide text-white/90 backdrop-blur">
      {label}
    </span>
  );
}

function PlayBadge() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="grid place-items-center rounded-full bg-white/90 p-4 shadow-xl transition-transform group-hover:scale-110">
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  );
}

function VideoModal({ id, title, onClose }) {
  const ref = useRef(null);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] grid place-items-center bg-black/70 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      ref={ref}
    >
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        className="w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10"
      >
        <div className="relative w-full pt-[56.25%]">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="flex items-center justify-between px-4 py-3 text-white/90">
          <p className="text-sm md:text-base font-medium">{title}</p>
          <button
            onClick={onClose}
            className="rounded-lg border border-white/20 px-3 py-1.5 text-sm hover:bg-white/10"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function HomeMain() {
  const [activeVideo, setActiveVideo] = useState(null);

  const phoneNumber = "94764845882"; // country code + number
  const whatsappMessage = useMemo(
    () =>
      encodeURIComponent(
        "Hello Rio Mobile! I'm interested in your services. Can you help me?"
      ),
    []
  );

  const scrollToProducts = () => {
    document
      .getElementById("products-section")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openWhatsAppChat = () => {
    const url = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
    window.open(url, "_blank");
  };

  return (
    <>
      {/* --------------------------------------------- */}
      {/* Hero */}
      {/* --------------------------------------------- */}
      <section className="relative h-[92vh] w-full overflow-hidden">
        {/* BG video */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={heroVideo2Mp4} type="video/mp4" />
        </video>

        {/* Layered gradients & grid */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,.06)_50%,transparent_100%)] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-emerald-900 via-emerald-400 to-teal-300 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl"
          >
            Rio Mobile
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-5 max-w-2xl text-balance text-lg leading-relaxed text-white/85 md:text-2xl"
          >
            Premium smartphones. Local warranty. Trade‑in made simple.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
          >
            <button
              onClick={scrollToProducts}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-4 text-lg font-semibold text-white shadow-2xl ring-1 ring-white/10 transition-all hover:from-emerald-400 hover:to-teal-500 hover:shadow-emerald-500/20"
            >
              Explore Products
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M5 12h14" strokeLinecap="round" />
                <path d="M13 5l7 7-7 7" strokeLinecap="round" />
              </svg>
            </button>

            <button
              onClick={openWhatsAppChat}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-4 text-white backdrop-blur transition hover:bg-white/10"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                <path d="M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.905 3.488 11.815 11.815 0 0012.05 0z" />
              </svg>
              WhatsApp
            </button>
          </motion.div>

          {/* Stat bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <StatPill label="0% Installments" />
            <StatPill label="Official Warranty" />
            <StatPill label="Island‑wide Delivery" />
          </motion.div>

          {/* Scroll cue */}
          <button
            onClick={scrollToProducts}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-emerald-300/80 transition hover:text-emerald-200"
          >
            <svg
              className="h-6 w-6 animate-bounce"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* --------------------------------------------- */}
      {/* Trust features */}
      {/* --------------------------------------------- */}
      <section className="border-y border-white/10 bg-gradient-to-b from-black via-black to-gray-950">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-10 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-white/90 shadow-xl shadow-black/30"
            >
              <div className="text-emerald-300">{f.icon}</div>
              <div>
                <p className="text-base font-semibold text-white">{f.title}</p>
                <p className="text-sm text-white/70">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --------------------------------------------- */}
      {/* Products */}
      {/* --------------------------------------------- */}
      <section
        id="products-section"
        className="bg-gradient-to-b from-gray-950 to-black py-16"
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h2 className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
              Our Mobile Collection
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/70 md:text-lg">
              Discover premium smartphones with expert local support.
            </p>
          </div>

          {/* Grid: use thumbnails to avoid heavy autoplay iframes */}
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map(({ id, title, brand, price }) => (
              <motion.article
                key={id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-2xl shadow-black/30 ring-1 ring-white/5"
              >
                <div className="relative w-full pt-[56.25%]">
                  <img
                    src={ytThumb(id)}
                    alt={title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <PlayBadge />
                </div>

                <div className="flex items-start justify-between gap-2 p-4">
                  <div>
                    <p className="text-sm text-white/60">{brand}</p>
                    <h3 className="text-lg font-semibold text-white">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm text-emerald-300/90">{price}</p>
                  </div>

                  <button
                    onClick={() => setActiveVideo({ id, title })}
                    className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/90 backdrop-blur transition hover:bg-white/10"
                  >
                    Watch
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-4 text-lg font-semibold text-white shadow-2xl ring-1 ring-white/10 transition hover:from-emerald-400 hover:to-teal-500"
            >
              View All Products
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M5 12h14" strokeLinecap="round" />
                <path d="M13 5l7 7-7 7" strokeLinecap="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* --------------------------------------------- */}
      {/* Floating WhatsApp */}
      {/* --------------------------------------------- */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={openWhatsAppChat}
          className="group relative grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white shadow-2xl shadow-emerald-500/30 transition hover:scale-105 hover:bg-emerald-600"
          title="Chat with us on WhatsApp"
        >
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
            <path d="M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.905 3.488 11.815 11.815 0 0012.05 0z" />
          </svg>
          <div className="pointer-events-none absolute -top-2 right-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-emerald-600 shadow">
            Live
          </div>
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 origin-bottom-right scale-95 rounded-lg border border-white/10 bg-black/80 px-3 py-2 text-xs text-white opacity-0 backdrop-blur transition group-hover:scale-100 group-hover:opacity-100">
            Chat with us on WhatsApp
          </div>
        </button>
      </div>

      <Footer />

      {/* Modal */}
      <AnimatePresence>
        {activeVideo && (
          <VideoModal
            id={activeVideo.id}
            title={activeVideo.title}
            onClose={() => setActiveVideo(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
