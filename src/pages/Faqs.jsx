import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus, FaWhatsapp } from 'react-icons/fa';
import { faqs } from '../data/faqs'; // <--- Data Import kiya

const Faqs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#FFFAF0] min-h-screen py-16 md:py-24 font-sans text-gray-700">
      
      {/* --- HEADER --- */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-[#2F4F4F] mb-4 uppercase tracking-[0.2em]">
          FAQs
        </h1>
        <p className="text-[#DAA520] font-serif italic text-xl mb-8">
          "We believe clarity builds trust."
        </p>
        <div className="w-24 h-1 bg-[#2F4F4F] mx-auto mb-8"></div>
        <p className="text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
          Below are answers to the most frequently asked questions about Damn Journals, our handcrafted process, orders, and policies. If you still need help, our team is always just a message away.
        </p>
      </div>

      {/* --- ACCORDION SECTION --- */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 mb-20">
        
        {/* Yahan 'faqs' variable use ho raha hai jo import kiya hai */}
        {faqs.map((item, index) => (
          <div key={index} className="mb-4 border border-gray-200 bg-white rounded-sm shadow-sm hover:shadow-md transition-all duration-300">
            
            {/* Question Header */}
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-6 text-left focus:outline-none group"
            >
              <span className={`font-serif text-lg md:text-xl transition-colors duration-300 ${openIndex === index ? 'text-[#DAA520]' : 'text-[#2F4F4F]'}`}>
                {item.question}
              </span>
              <span className={`text-[#DAA520] transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                {openIndex === index ? <FaMinus /> : <FaPlus />}
              </span>
            </button>

            {/* Answer Content */}
            <div 
              className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="p-6 pt-0 text-gray-600 font-light leading-7 border-t border-gray-100 mt-2">
                {item.answer}
              </div>
            </div>
          </div>
        ))}

        {/* --- Special 'Why Choose' Section --- */}
        <div className="mt-8 bg-[#2F4F4F] text-white p-8 md:p-10 rounded-sm shadow-lg">
          <h3 className="font-serif text-2xl text-[#DAA520] mb-6 uppercase tracking-widest">Why choose Damn Journals?</h3>
          <p className="font-light mb-4 text-lg">Because we believe journaling is not just writing, it’s a ritual. Our journals combine:</p>
          <ul className="space-y-3 mb-8 text-gray-300 font-light">
            <li className="flex items-center gap-3"><span className="text-[#DAA520]">✦</span> Luxury aesthetics</li>
            <li className="flex items-center gap-3"><span className="text-[#DAA520]">✦</span> Handcrafted Indian artistry</li>
            <li className="flex items-center gap-3"><span className="text-[#DAA520]">✦</span> Recycled, sustainable materials</li>
            <li className="flex items-center gap-3"><span className="text-[#DAA520]">✦</span> Deep storytelling and intention</li>
          </ul>
          <p className="font-serif italic text-xl text-[#DAA520]">
            "You’re not buying stationery. You’re choosing a writing legacy."
          </p>
        </div>
      </div>

      {/* --- CONTACT & LEGACY --- */}
      <div className="text-center px-6">
        <h3 className="text-xl font-serif text-[#2F4F4F] mb-6">Still have questions?</h3>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12">
           <a 
              href="https://wa.me/919713631331" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-md"
            >
              <FaWhatsapp size={18} /> Chat on WhatsApp
            </a>
            <a 
              href="mailto:damnjournals777@gmail.com" 
              className="text-[#2F4F4F] font-bold border-b border-[#2F4F4F] hover:text-[#DAA520] hover:border-[#DAA520] transition pb-1"
            >
              Email: damnjournals777@gmail.com
            </a>
        </div>

        <div className="inline-block border-y border-[#DAA520] py-4 px-8">
           <span className="block text-[#2F4F4F] font-serif text-lg md:text-2xl font-bold uppercase tracking-[0.2em]">
             Not Just a Journal, It’s a Damn Legacy.
           </span>
        </div>
      </div>

    </div>
  );
};

export default Faqs;