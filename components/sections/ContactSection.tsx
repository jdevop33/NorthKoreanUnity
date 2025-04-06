'use client';

import { ContactForm } from '@/components/features/ContactForm';

export function ContactSection() {
  return (
    <section id="contact" className="py-16 bg-content-bg-off">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-warm-gray-dark mb-4 font-serif-kr">
              Contact Us
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Have questions about North Korean culture or interested in contributing to our cultural preservation efforts? 
              Reach out to us.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-3 text-primary-red">Our Mission</h3>
                <p className="text-text-secondary mb-4">
                  We&apos;re dedicated to preserving and sharing the rich cultural heritage of North Korea. 
                  Your interest and support help us document and protect these valuable traditions for future generations.
                </p>
                <p className="text-text-secondary">
                  Whether you have resources to share, questions about our work, or want to collaborate, 
                  we welcome all inquiries.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-primary-red">Connect With Us</h3>
                <div className="space-y-4">
                  <p className="flex items-center">
                    <span className="text-primary-blue mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <span>info@northkoreanunity.org</span>
                  </p>
                  <p className="flex items-center">
                    <span className="text-primary-blue mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </span>
                    <span>Cultural Heritage Center, Seoul, South Korea</span>
                  </p>
                </div>

                {/* Direct form link for HeroTofu */}
                <div className="mt-8 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-600 mb-2">Or send us a message directly:</p>
                  <form 
                    action="https://public.herotofu.com/v1/cb3ceee0-1058-11f0-8dc2-010227905b4a" 
                    method="post" 
                    acceptCharset="UTF-8"
                    className="space-y-3"
                  >
                    <div>
                      <input 
                        name="name" 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                        placeholder="Your Name" 
                        required 
                      />
                    </div>
                    <div>
                      <input 
                        name="email" 
                        type="email" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                        placeholder="Email Address" 
                        required 
                      />
                    </div>
                    <div>
                      <textarea 
                        name="message" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                        rows={3} 
                        placeholder="Your Message" 
                        required
                      ></textarea>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-primary-blue text-white rounded-md hover:bg-blue-600 transition"
                      >
                        Quick Send
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            
            {/* Main contact form */}
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}