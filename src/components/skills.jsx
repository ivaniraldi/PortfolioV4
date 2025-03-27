"use client"

import { useLanguage } from "./language-provider"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Code, Users, CheckCircle } from "lucide-react"
import { useState, useRef } from "react"

export default function Skills() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("technical")
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const technicalSkills = [
    "JavaScript",
    "React",
    "SQL",
    "HTML / CSS",
    "PostgreSQL",
    "Redux",
    "Git / GitHub",
    "Bootstrap / Tailwind CSS",
    "Node.js",
  ]

  const softSkills = [
    "scrum",
    "effective_communication",
    "teamwork",
    "patience",
    "positive_attitude",
    "continuous_learning",
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.2 },
    },
  }

  return (
    <section id="skills" className="py-16" ref={sectionRef}>
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
              <span className="border-b-4 border-primary pb-2">{t("skills")}</span>
            </h2>
          </motion.div>
        </div>

        <div className="tabs tabs-boxed flex justify-center mb-8">
          <button
            className={`tab ${activeTab === "technical" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("technical")}
            aria-selected={activeTab === "technical"}
            role="tab"
          >
            <Code className="mr-2 h-4 w-4" />
            {t("technical_skills")}
          </button>
          <button
            className={`tab ${activeTab === "soft" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("soft")}
            aria-selected={activeTab === "soft"}
            role="tab"
          >
            <Users className="mr-2 h-4 w-4" />
            {t("soft_skills")}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "technical" ? (
            <motion.div
              key="technical"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="card bg-base-200 shadow-xl"
            >
              <div className="card-body">
                <h3 className="card-title text-xl mb-4">{t("technical_skills")}</h3>
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  {technicalSkills.map((skill, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2 p-3 rounded-lg bg-base-300/50"
                      variants={itemVariants}
                      whileHover={{ scale: 1.03, backgroundColor: "rgba(var(--primary-rgb), 0.1)" }}
                    >
                      <CheckCircle className="text-primary h-5 w-5" />
                      <span className="font-medium">{skill}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="soft"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="card bg-base-200 shadow-xl"
            >
              <div className="card-body">
                <h3 className="card-title text-xl mb-4">{t("soft_skills")}</h3>
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  {softSkills.map((skill, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2 p-3 rounded-lg bg-base-300/50"
                      variants={itemVariants}
                      whileHover={{ scale: 1.03, backgroundColor: "rgba(var(--accent-rgb), 0.1)" }}
                    >
                      <CheckCircle className="text-accent h-5 w-5" />
                      <span className="font-medium">{t(skill)}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

