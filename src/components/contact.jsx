"use client"

import { useState, useRef } from "react"
import { useLanguage } from "./language-provider"
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react"
import { motion, useInView } from "framer-motion"
import emailjs from "@emailjs/browser" // Import EmailJS

export default function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Send email using EmailJS
      await emailjs.send(
        "service_urynada", // Replace with your EmailJS service ID
        "template_4jfhbhf", // Replace with your EmailJS template ID
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          date: new Date().toLocaleDateString(), // Add the current date
          time: new Date().toLocaleTimeString(), // Add the current time
        },
        "-4OVkyttlIm08uYsA" // Replace with your EmailJS user ID
      )

      setIsSubmitted(true)
      setFormData({ name: "", email: "", message: "" })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (error) {
      console.error("Failed to send email:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5" />,
      label: "phone",
      value: "+(55) 48 992259119",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "email",
      value: "iraldiban@gmail.com",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "location",
      value: "Santa Catarina, Brasil",
    },
  ]

  return (
    <section id="contact" className="py-16 relative" ref={sectionRef}>
      {/* Decorative background elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center mb-8">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "auto" } : { width: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="overflow-hidden"
          >
            <h2 className="text-3xl font-bold text-center">
              <span className="border-b-4 border-primary pb-2">{t("contact")}</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="card bg-base-200 shadow-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="card-body">
              <h3 className="card-title text-xl mb-6">{t("contact_info")}</h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-base-300/50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    whileHover={{ x: 2 }}
                  >
                    <div className="bg-primary p-3 rounded-full text-primary-content">{item.icon}</div>
                    <div>
                      <p className="text-sm opacity-70">{t(item.label)}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="card bg-base-200 shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="card-body">
              <h3 className="card-title text-xl mb-6">{t("send_message")}</h3>
              {isSubmitted ? (
                <motion.div
                  className="alert alert-success flex items-center gap-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle className="h-5 w-5" />
                  {t("message_sent")}
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="form-control">
                    <input
                      type="text"
                      name="name"
                      placeholder={t("your_name")}
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="form-control">
                    <input
                      type="email"
                      name="email"
                      placeholder={t("your_email")}
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="form-control">
                    <textarea
                      name="message"
                      placeholder={t("your_message")}
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      required
                      className="textarea textarea-bordered w-full"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className={`btn btn-primary w-full ${isSubmitting ? "loading" : ""}`}
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? t("sending") : t("send_message")}
                    {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

