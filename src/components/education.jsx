"use client"

import { useLanguage } from "./language-provider"
import { GraduationCap } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function Education() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section id="education" className="py-16 hidden" ref={sectionRef}>
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
              <span className="border-b-4 border-primary pb-2">{t("education")}</span>
            </h2>
          </motion.div>
        </div>

        <motion.div
          className="card bg-base-200 shadow-xl"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="card-body">
            <div className="flex items-start gap-4">
              <div className="bg-primary p-3 rounded-full text-primary-content">
                <GraduationCap size={24} />
              </div>
              <div>
                <h3 className="card-title text-xl">{t("full_stack_web_development")}</h3>
                <p className="text-lg opacity-70">Henry</p>
                <div className="badge badge-primary badge-outline mt-2 mb-4">05-2022</div>
                <ul className="list-disc pl-5 space-y-2">
                  <motion.li
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    {t("education_desc1")}
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    {t("education_desc2")}
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    {t("education_desc3")}
                  </motion.li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

