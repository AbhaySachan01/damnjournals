import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FFFAF0] min-h-screen py-16 md:py-24 font-sans text-gray-700">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-serif text-[#2F4F4F] mb-4 uppercase tracking-[0.2em]">
            Privacy Policy
          </h1>
          <div className="w-20 h-1 bg-[#DAA520] mx-auto"></div>
        </div>

        {/* Content */}
        <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100 rounded-sm space-y-8">
          
          <section>
            <h2 className="text-xl font-serif text-[#2F4F4F] mb-3 uppercase tracking-wide">1. Information We Collect</h2>
            <p className="text-gray-600 font-light leading-relaxed">
              When you visit Damn Journals or place an order via WhatsApp, we may collect basic information such as your name, phone number, and shipping address. We do not store sensitive payment information as transactions are handled externally.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif text-[#2F4F4F] mb-3 uppercase tracking-wide">2. How We Use Your Information</h2>
            <p className="text-gray-600 font-light leading-relaxed">
              We use your details solely for:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Processing and delivering your handmade journals.</li>
                <li>Communicating order updates via WhatsApp or Email.</li>
                <li>Improving our products and customer experience.</li>
              </ul>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif text-[#2F4F4F] mb-3 uppercase tracking-wide">3. Third-Party Sharing</h2>
            <p className="text-gray-600 font-light leading-relaxed">
              We respect your privacy. We <strong>never</strong> sell, trade, or rent your personal information to others. Your data is shared only with trusted delivery partners (courier services) to ensure your package reaches you safely.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif text-[#2F4F4F] mb-3 uppercase tracking-wide">4. Cookies</h2>
            <p className="text-gray-600 font-light leading-relaxed">
              Our website may use standard cookies to enhance your browsing experience (like remembering your cart items). You can choose to disable cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif text-[#2F4F4F] mb-3 uppercase tracking-wide">5. Contact Us</h2>
            <p className="text-gray-600 font-light leading-relaxed">
              If you have any questions regarding our privacy practices, please contact us at: <br/>
              <span className="font-medium text-[#2F4F4F]">Email: damnjournals777@gmail.com</span>
            </p>
          </section>

        </div>
        
        <p className="text-center text-xs text-gray-400 mt-8 uppercase tracking-widest">
          Last Updated: {new Date().getFullYear()}
        </p>

      </div>
    </div>
  );
};

export default PrivacyPolicy;