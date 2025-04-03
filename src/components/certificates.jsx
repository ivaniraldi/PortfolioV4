"use client"

import { useLanguage } from "./language-provider"
import { ExternalLink, Award } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function Certificates() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const certificates = [
    {
      title: "full_stack_certificate_title",
      issuer: "Henry",
      link: "https://certificates.soyhenry.com/cert?id=0dae7c64-9db7-44f5-874e-82fa8e3f1548",
      icon: <Award className="h-8 w-8" />,
    },
    {
      title: "english_certificate_title",
      issuer: "EFSET",
      link: "https://www.efset.org/cert/zEYexh",
      icon: <Award className="h-8 w-8" />,
    },
  ]

  return (
    <section id="certificates" className="py-16" ref={sectionRef}>
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
              <span className="border-b-4 border-primary pb-2">{t("certificates")}</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              className="card bg-base-200 shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary p-3 rounded-full text-primary-content">{cert.icon}</div>
                  <div>
                    <h3 className="card-title">{t(cert.title)}</h3>
                    <p className="opacity-70">{cert.issuer}</p>
                  </div>
                </div>
                <div className="card-actions justify-end">
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    {t("view_certificate")}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

