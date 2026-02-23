import React, { useEffect } from "react";
import {
  FaFeatherAlt,
  FaUsers,
  FaLock,
  FaArrowRight,
  FaStar,
  FaQuoteRight,
  FaCrown,
} from "react-icons/fa";
import { MdOutlineAutoAwesome } from "react-icons/md";
import { BsGem } from "react-icons/bs";

const JournalingClub = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FFFAF0] min-h-screen text-gray-700">


      {/* ================= HERO ================= */}
      <section className="relative pt-24 pb-20 px-6 text-center max-w-5xl mx-auto">

        <div className="absolute top-10 left-10 text-[#DAA520]/10 text-7xl">
          <FaQuoteRight />
        </div>

        <span className="bg-[#2F4F4F]/5 text-[#2F4F4F] px-6 py-2 rounded-full text-sm font-semibold tracking-wider border border-[#2F4F4F]/20">
          ✦ EST. 2025 ✦
        </span>

        <p className="text-[#DAA520] font-serif italic text-xl mt-6 mb-4">
          Where Thinkers Gather. Where Legacies Begin.
        </p>

        <h1 className="text-5xl md:text-7xl font-serif text-[#2F4F4F] mb-8">
          Journaling Club
        </h1>

        <div className="flex justify-center gap-2 mb-8">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-[#DAA520]" />
          ))}
        </div>

        <p className="text-xl italic text-gray-600">
          This is not a membership.
          <span className="block mt-2 font-semibold text-[#2F4F4F]">
            It is a movement of minds choosing depth over distraction.
          </span>
        </p>
      </section>

      {/* ================= CARDS ================= */}
      <section className="max-w-6xl mx-auto px-6 mb-24 grid md:grid-cols-3 gap-8">

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <FaFeatherAlt className="text-3xl text-[#2F4F4F] mb-4" />
          <p>
            A private space for those who believe writing is more than a habit —
            it's a form of self-respect.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <MdOutlineAutoAwesome className="text-3xl text-[#2F4F4F] mb-4" />
          <p>
            Explore identity. Confront fears. Design your future with clarity.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <BsGem className="text-3xl text-[#2F4F4F] mb-4" />
          <p>
            Monthly curated prompts crafted to refine perception and strengthen
            emotional intelligence.
          </p>
        </div>

      </section>

      {/* ================= EXPERIENCE ================= */}
      <section className="bg-white py-20 px-6 mb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">

          <div>
            <h2 className="text-3xl font-serif text-[#2F4F4F] mb-6">
              What You'll Experience
            </h2>
            <ul className="space-y-4">
              <li>• Monthly themed journaling journeys</li>
              <li>• Guided reflection prompts</li>
              <li>• Live writing sessions</li>
              <li>• Members-only challenges</li>
              <li>• Early access to exclusive drops</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-serif text-[#2F4F4F] mb-6">
              Who It's For
            </h2>
            <p>
              Entrepreneurs building quietly.
              <br />
              Creatives who think deeply.
              <br />
              Individuals who value clarity.
            </p>

            <div className="mt-6 pl-6 border-l-4 border-[#DAA520] bg-[#DAA520]/5 p-4 rounded-r-xl">
              "You don't need to be a writer. You need to be willing to be honest."
            </div>
          </div>

        </div>
      </section>

      {/* ================= APPLY SECTION ================= */}
      <section
        id="apply-section"
        className="max-w-4xl mx-auto px-6 mb-32 text-center"
      >
        <div className="bg-white p-12 rounded-3xl shadow-xl">

          <FaLock className="text-4xl text-[#2F4F4F] mx-auto mb-6" />

          <h2 className="text-4xl font-serif text-[#2F4F4F] mb-4">
            Apply to Join the Inner Circle
          </h2>

          <p className="mb-8 text-gray-600">
            If you are ready to turn reflection into direction, this is your space.
          </p>

          <a
            href="https://docs.google.com/forms/d/1AW0s2MzLeplIT4zrLdq_rAgGkHl7iMJUQDQ0OGtSxQM/edit?pli=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#2F4F4F] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#DAA520] hover:text-[#2F4F4F] transition duration-300"
          >
            Apply Now
            <FaArrowRight />
          </a>

          <div className="mt-6 flex items-center justify-center gap-2">
            <FaCrown className="text-[#DAA520]" />
            <span>Limited to 50 founding members only</span>
          </div>

        </div>
      </section>

    </div>
  );
};

export default JournalingClub;