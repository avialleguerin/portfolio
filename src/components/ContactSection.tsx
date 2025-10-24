import { useState, useEffect } from 'react'
import Logo from './Logo'
import Navigation from './Navigation'
import SocialLinks from './SocialLinks'
import ScrollIndicator from './ScrollIndicator'
import { CONTACT_EMAIL, EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID } from '../data/constants'

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })

  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' })

  // Auto-hide success message after 3 seconds
  useEffect(() => {
    if (status.type === 'success') {
      const t = setTimeout(() => {
        setStatus({ type: null, message: '' })
      }, 3000)
      return () => clearTimeout(t)
    }
  }, [status.type])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ type: null, message: '' })

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Veuillez remplir tous les champs requis.' })
      return
    }

    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
      console.error('EmailJS keys are missing. Please fill them in src/data/constants.ts')
      setStatus({ type: 'error', message: "Configuration d'envoi d'email manquante. Contactez l'administrateur." })
      return
    }

    try {
      setIsSending(true)
      const emailjs = (window as any).emailjs
      if (!emailjs) throw new Error('EmailJS SDK not loaded')
      // Initialize (idempotent)
      if (emailjs && emailjs.init) {
        emailjs.init(EMAILJS_PUBLIC_KEY)
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        to_email: CONTACT_EMAIL
      }

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)

      setStatus({ type: 'success', message: 'Merci ! Votre message a été envoyé avec succès.' })
      setFormData({ name: '', phone: '', email: '', message: '' })
    } catch (err) {
      console.error('Email send error:', err)
      setStatus({ type: 'error', message: "Une erreur s'est produite lors de l'envoi. Réessayez plus tard." })
    } finally {
      setIsSending(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section 
      id="contact" 
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center relative overflow-hidden"
      style={{ backgroundImage: 'url(/background.jpg)' }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 z-0 pointer-events-none"></div>
      
      <Logo />
      <Navigation />
      <SocialLinks />
      <ScrollIndicator className="scroll-indicator-contact" />

      {/* Contact Content - Two Columns */}
      <div className="relative z-10 w-full max-w-[90rem] m-auto grid grid-cols-2 gap-20">
        
        {/* Left Column - Contact Info */}
        <div className="text-center m-auto">
          <h1 className="font-lemon text-[60px] font-black tracking-[6px] text-white mb-12 [text-shadow:0_15px_40px_rgba(0,0,0,0.9)]">
            CONTACT
          </h1>
          
          <p className="font-antario font-bold text-white/70  mb-16">
            N'hésitez pas à me contacter pour discuter de vos projets, collaborations ou simplement pour échanger. Je serai ravie de vous répondre dans les plus brefs délais.
          </p>

          {/* Contact Details */}
          <div className="space-y-10">
            {/* Adresse */}
            <div>
              <h3 className="font-antario text-md font-bold tracking-[3px] text-white mb-3">
                Adresse
              </h3>
              <p className="font-antario text-base font-bold text-white/60">
                Lyon, France
              </p>
            </div>

            {/* Téléphone */}
            <div>
              <h3 className="font-antario text-md font-bold tracking-[3px] text-white mb-3">
                Téléphone
              </h3>
              <a 
                href="tel:+33612345678" 
                className="font-antario text-base font-bold text-white/60 hover:text-white transition-colors duration-300"
              >
                +33 7 83 77 87 79
              </a>
            </div>

            {/* Email */}
            <div>
              <h3 className="font-antario text-md font-bold tracking-[3px] text-white mb-3">
                Email
              </h3>
              <a 
                href="mailto:avialleguerin@gmail.com" 
                className="font-antario text-base font-bold text-white/60 hover:text-white transition-colors duration-300"
              >
                avialleguerin@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="text-center my-auto font-antario py-[40px] px-[50px] tracking-[3px] text-white/80 bg-[#222] border-none
                          shadow-[5px_8px_20px_rgba(0,0,0,0.4)] uppercase">
          {/* <h2 className="font-lemon text-[50px] font-black tracking-[6px] text-white mb-12 [text-shadow:0_15px_40px_rgba(0,0,0,0.9)]">
            CONTACT FORM
          </h2> */}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Input */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your name*"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-white/20 py-4 px-0 text-white/70 font-antario font-bold text-base
                          placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors duration-300"
              />
            </div>

            {/* Phone Input */}
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Your phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 py-4 px-0 text-white/70 font-antario font-bold text-base
                          placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors duration-300"
              />
            </div>

            {/* Email Input */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your e-mail*"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-white/20 py-4 px-0 text-white/70 font-antario font-bold text-base
                          placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors duration-300"
              />
            </div>

            {/* Message Textarea */}
            <div>
              <textarea
                name="message"
                placeholder="Message*"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-transparent border-b border-white/20 py-4 px-0 text-white/70 font-antario font-bold text-base
                          placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors duration-300 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="font-lagu font-medium py-[15px] px-[50px] text-sm tracking-[3px] text-white/80 bg-[#222] border-none
                          shadow-[5px_8px_20px_rgba(0,0,0,0.4)] cursor-pointer transition-all duration-300 uppercase pointer-events-auto
                          hover:text-white hover:bg-[#333] hover:shadow-[6px_10px_25px_rgba(0,0,0,0.5)] disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-3"
                disabled={isSending}
              >{isSending ? 'ENVOI...' : 'SEND MESSAGE'} <img src="/send.png" alt="Arrow" className="inline-block w-5 h-5" />
              </button>
            </div>
            {status.message && (
              <div className={`mt-4 text-sm ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {status.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
