"use client";

import { motion, easeOut } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Calendar } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { Badge } from '@/components/ui/badge';

export function Experience() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
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
              Experience & Education
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground text-center mb-16 max-w-3xl mx-auto"
          >
            My professional journey and educational background
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Experience */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold mb-8 text-center lg:text-left">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                  Professional Experience
                </span>
              </h3>

              <div className="space-y-8">
                {siteConfig.experience.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    variants={itemVariants}
                    className="relative pl-8 border-l-2 border-primary/20"
                  >
                    {/* Timeline dot */}
                    <div className="absolute w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full -left-2 top-2" />
                    
                    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/50">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h4 className="text-lg font-semibold">{exp.position}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {exp.duration}
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                        <h5 className="text-primary font-medium">{exp.company}</h5>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {exp.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold mb-8 text-center lg:text-left">
                <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  Education
                </span>
              </h3>

              <div className="space-y-8">
                {siteConfig.education.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    variants={itemVariants}
                    className="relative pl-8 border-l-2 border-purple-500/20"
                  >
                    {/* Timeline dot */}
                    <div className="absolute w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full -left-2 top-2" />
                    
                    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-purple-500/50">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h4 className="text-lg font-semibold">{edu.degree}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {edu.duration}
                        </div>
                      </div>
                      
                      <h5 className="text-purple-500 font-medium mb-2">{edu.institution}</h5>
                      
                      <p className="text-muted-foreground mb-2">{edu.field}</p>
                      
                      {edu.gpa && (
                        <p className="text-sm text-muted-foreground">
                          GPA: <span className="font-medium">{edu.gpa}</span>
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}