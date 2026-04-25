"use client";

import { Mail, Globe, Phone, MapPin, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { sendContactEmail } from "../../app/actions/send-email";
import { useState } from "react";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setFeedback(null);

    const result = await sendContactEmail(formData);

    setIsSubmitting(false);
    if (result.success) {
      setFeedback({ type: "success", message: "Your message has been sent successfully!" });
      // Reset form if needed, but since it's a server action, the browser might handle some of it
      // For better UX, we could reset manually if we used a ref
    } else {
      setFeedback({ type: "error", message: result.error || "Something went wrong." });
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-6 lg:px-10 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl">
        {/* Left Column: Form Card (Lilac) */}
        <div className="bg-[#E9D5FF] p-10 md:p-16">
          <h2 className="text-4xl font-extrabold text-black mb-10 tracking-tight">Fill the Form</h2>
          
          <form action={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Name</label>
              <input 
                name="name"
                type="text" 
                required
                className="w-full bg-white border-none rounded-sm h-12 px-4 shadow-sm focus:ring-2 focus:ring-black outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Email</label>
              <input 
                name="email"
                type="email" 
                required
                className="w-full bg-white border-none rounded-sm h-12 px-4 shadow-sm focus:ring-2 focus:ring-black outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Contact Number</label>
              <input 
                name="phone"
                type="tel" 
                className="w-full bg-white border-none rounded-sm h-12 px-4 shadow-sm focus:ring-2 focus:ring-black outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Message</label>
              <textarea 
                name="message"
                rows={4}
                required
                className="w-full bg-white border-none rounded-sm px-4 py-3 shadow-sm focus:ring-2 focus:ring-black outline-none transition-all resize-none"
              />
            </div>

            {feedback && (
              <div className={`p-4 rounded-lg flex items-center gap-3 ${
                feedback.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}>
                {feedback.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                <span className="text-sm font-bold">{feedback.message}</span>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="mt-6 px-12 py-4 bg-[#D9F99D] hover:bg-[#57AD43] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed text-black font-black uppercase tracking-[0.3em] text-[11px] rounded-full transition-all shadow-md transform active:scale-95 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Sending...
                </>
              ) : "Submit"}
            </button>
          </form>
        </div>

        {/* Right Column: Info Section (White) */}
        <div className="bg-white p-10 md:p-16 flex flex-col items-start justify-center">
          <h2 className="text-4xl font-extrabold text-black mb-6 tracking-tight">Contact Us</h2>
          <p className="text-sm font-medium text-gray-500 mb-12 max-w-md leading-relaxed">
            Have questions, need assistance, or want to share your feedback? Our team is here to help you feel free to reach out anytime.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 w-full">
            <ContactInfoItem 
              icon={<Mail className="text-black" size={20} />}
              label="Email"
              value="contact@texongo.com"
              href="mailto:contact@texongo.com"
            />
            <ContactInfoItem 
              icon={<Globe className="text-black" size={20} />}
              label="Website"
              value="https://texongo.com/"
              href="https://texongo.com/"
            />
            <ContactInfoItem 
              icon={<Phone className="text-black" size={20} />}
              label="Phone"
              value="+91 9910048498"
              href="tel:+919910048498"
            />
            <ContactInfoItem 
              icon={<MapPin className="text-black" size={20} />}
              label="Location"
              value="D 10/1, Pocket D, Okhla Industrial Area Phase II, New Delhi, Delhi 110020"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactInfoItem({ icon, label, value, href }: { icon: React.ReactNode, label: string, value: string, href?: string }) {
  const content = (
    <div className="flex items-start gap-4 group cursor-pointer">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-black group-hover:text-white transition-all duration-300 shadow-sm border border-gray-100 overflow-hidden">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-black uppercase tracking-widest text-black">{label}</span>
        <span className="text-xs font-bold text-gray-400 mt-1 max-w-[200px] leading-tight break-words group-hover:text-black transition-colors">{value}</span>
      </div>
    </div>
  );

  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>;
  }

  return content;
}
