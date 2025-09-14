"use client";

import { motion, Variants, easeOut } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { siteConfig } from "@/config/site.config";
import { useMemo } from "react";

const categories = {
  frontend: { name: "Frontend", color: "from-blue-400 to-cyan-500" },
  backend: { name: "Backend", color: "from-green-400 to-blue-500" },
  tools: { name: "Tools & DevOps", color: "from-purple-400 to-pink-500" },
  other: { name: "Other", color: "from-orange-400 to-red-500" },
  "ai-ml": { name: "AI/ML", color: "from-yellow-400 to-green-500" },
  devops: { name: "DevOps", color: "from-indigo-400 to-blue-600" },
  design: { name: "Design", color: "from-pink-400 to-yellow-500" },
  mobile: { name: "Mobile", color: "from-green-400 to-blue-400" },
  cloud: { name: "Cloud", color: "from-blue-300 to-indigo-500" },
  database: { name: "Database", color: "from-yellow-600 to-orange-500" },
  testing: { name: "Testing", color: "from-red-400 to-pink-500" },
  security: { name: "Security", color: "from-gray-700 to-red-700" },
  "project-management": { name: "Project Management", color: "from-blue-500 to-green-500" },
  "data-science": { name: "Data Science", color: "from-purple-500 to-blue-400" },
  blockchain: { name: "Blockchain", color: "from-yellow-500 to-gray-700" },
  "game-development": { name: "Game Development", color: "from-pink-500 to-purple-700" },
} as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
};

export function Skills() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  // Memoize the grouped skills for performance (prevents recalculation on every render)
  // © 2025 Ronak Malam – Portfolio Code. Signature ID: RM-PORT-2025

  const groupedSkills = useMemo(() => {
    return siteConfig.skills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, typeof siteConfig.skills>);
  }, [siteConfig.skills]);

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold text-center mb-4"
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground text-center mb-16 max-w-3xl mx-auto"
          >
            Here are the technologies and tools I work with to bring ideas to life
          </motion.p>
          {Object.entries(groupedSkills).map(([category, skills]) => {
            const cat = categories[category as keyof typeof categories] ?? {
              name: category,
              color: "from-gray-400 to-gray-600",
            };
            return (
              <motion.div
                key={category}
                variants={itemVariants}
                className="mb-12 last:mb-0"
              >
                <h3 className="text-xl font-semibold mb-6 text-center">
                  <span
                    className={`bg-gradient-to-r ${cat.color} bg-clip-text text-transparent`}
                  >
                    {cat.name}
                  </span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      variants={itemVariants}
                      className="group relative"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="bg-card border border-border rounded-xl p-3 sm:p-4 md:p-6 text-center hover:shadow-lg transition-all duration-100 hover:border-primary/50 min-h-[120px] sm:min-h-[140px] flex flex-col justify-center">
                        <div className="text-2xl sm:text-3xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                          {skill.icon}
                        </div>
                        <h4 className="font-semibold mb-2 text-xs sm:text-sm leading-tight">
                          {skill.name}
                        </h4>
                        {/* Skill level bar */}
                        <div className="w-full bg-muted rounded-full h-2 mb-2">
                          <motion.div
                            className={`h-2 rounded-full bg-gradient-to-r ${
                              (categories[skill.category as keyof typeof categories]?.color) ?? "from-gray-400 to-gray-600"
                            }`}
                            initial={{ width: 0 }}
                            animate={
                              inView ? { width: `${skill.level}%` } : { width: 0 }
                            }
                            transition={{
                              duration: 1,
                              delay: index * 0.1,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground font-medium">
                          {skill.level}%
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}