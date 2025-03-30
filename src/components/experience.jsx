"use client"

import { useLanguage } from "./language-provider"
import { motion, useInView } from "framer-motion"
import { Briefcase, Calendar, Building, ArrowRight } from "lucide-react"
import { useRef } from "react"

export default function Experience() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const experiences = [
  
    {
      title: "full_stack_tutor_title",
      company: "Desafío Latam",
      period: "SEP 2023 - PRESENT",
      description: "full_stack_tutor_description",
      responsibilities: ["full_stack_tutor_resp1", "full_stack_tutor_resp2", "full_stack_tutor_resp3"],
    },
    {
      title: "back_end_tutor_title",
      company: "Coderhouse",
      period: "MAY 2022 - SEP 2024",
      description: "back_end_tutor_description",
      responsibilities: [
        "back_end_tutor_resp1",
        "back_end_tutor_resp2",
        "back_end_tutor_resp3",
        "back_end_tutor_resp4",
      ],
    },
    {
      title: "freelance_title",
      company: "Freelance",
      period: "APR 2022 - PRESENT",
      description: "freelance_description",
      responsibilities: ["freelance_resp1", "freelance_resp2", "freelance_resp3", "freelance_resp4"],
    },
    {
      title: "ecommerce_title",
      company: "Henry",
      period: "MAR 2022 - APR 2022",
      description: "ecommerce_description",
      responsibilities: ["ecommerce_resp1", "ecommerce_resp2", "ecommerce_resp3", "ecommerce_resp4"],
    },
  ]

  return (
    <section id="experience" className="py-16 relative" ref={sectionRef}>
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10"></div>

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
            <h2 className="text-3xl font-bold text-center font-serif">
              <span className="border-b-4 border-primary pb-2">{t("experience")}</span>
            </h2>
          </motion.div>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card bg-base-200 shadow-xl overflow-hidden"
            >
              <div className="card-body">
                <div className="flex items-start gap-4">
                  <div className="bg-primary p-3 rounded-full text-primary-content shadow-md shadow-primary/20">
                    <Briefcase size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <div>
                        <h3 className="card-title text-xl font-serif">{t(exp.title)}</h3>
                        <p className="flex items-center gap-1 text-lg opacity-70 mt-1">
                          <Building size={16} className="text-primary" />
                          {exp.company}
                        </p>
                      </div>
                      <div className="badge badge-primary badge-outline p-3 flex items-center gap-1">
                        <Calendar size={14} />
                        {exp.period}
                      </div>
                    </div>
                    <p className="mt-4 mb-4 leading-relaxed">{t(exp.description)}</p>
                    <ul className="list-none space-y-2">
                      {exp.responsibilities.map((resp, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start gap-2"
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ delay: idx * 0.1 + index * 0.2 }}
                        >
                          <ArrowRight className="text-primary mt-1 h-4 w-4 flex-shrink-0" />
                          <span>{t(resp)}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              {/* Decorative accent line */}
              <div className="h-1 w-full bg-gradient-to-r from-primary to-accent"></div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

