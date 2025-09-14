"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github, Play } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Projects() {
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
        ease: "easeOut",
      },
    },
  };

  const featuredProjects = siteConfig.projects.filter(
    (project) => project.featured
  );
  const otherProjects = siteConfig.projects.filter(
    (project) => !project.featured
  );

  return (
    <section id='projects' className='py-20 relative overflow-hidden'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial='hidden'
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2
            variants={itemVariants}
            className='text-3xl sm:text-4xl font-bold text-center mb-4'
          >
            <span className='bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
              Featured Projects
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className='text-lg text-muted-foreground text-center mb-16 max-w-3xl mx-auto'
          >
            A collection of projects that showcase my skills and passion for
            creating meaningful solutions
          </motion.p>

          {/* Featured Projects */}
          <div className='space-y-20 mb-20'>
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Project Image */}
                <motion.div
                  className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className='relative group overflow-hidden rounded-xl'>
                    <img
                      src={project.image}
                      alt={project.title}
                      className='w-full h-64 sm:h-80 object-cover transition-transform duration-500 group-hover:scale-110'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                    <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                      <div className='flex gap-4'>
                        {project.links.github && (
                          <Button
                            size='sm'
                            variant='secondary'
                            asChild
                            className='bg-white/20 backdrop-blur-sm hover:bg-white/30'
                          >
                            <a
                              href={project.links.github}
                              target='_blank'
                              rel='noopener noreferrer'
                            >
                              <Github className='w-4 h-4 mr-2' />
                              Code
                            </a>
                          </Button>
                        )}
                        {(project.links.live || project.links.demo) && (
                          <Button
                            size='sm'
                            asChild
                            className='bg-primary/80 backdrop-blur-sm hover:bg-primary'
                          >
                            <a
                              href={project.links.live || project.links.demo}
                              target='_blank'
                              rel='noopener noreferrer'
                            >
                              {project.links.demo ? (
                                <Play className='w-4 h-4 mr-2' />
                              ) : (
                                <ExternalLink className='w-4 h-4 mr-2' />
                              )}
                              {project.links.demo ? "Demo" : "Live"}
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Project Content */}
                <div
                  className={`${
                    index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                  }`}
                >
                  <motion.h3
                    className='text-2xl sm:text-3xl font-bold mb-4'
                    initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {project.title}
                  </motion.h3>

                  <motion.p
                    className='text-lg text-muted-foreground mb-6 leading-relaxed'
                    initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {project.description}
                  </motion.p>

                  <motion.div
                    className='flex flex-wrap gap-2 mb-6'
                    initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {project.tags.map((tag, index) => (
                      <Badge
                        key={`${tag}-${index}`}
                        variant='secondary'
                        className='text-xs'
                      >
                        {tag}
                      </Badge>
                    ))}
                  </motion.div>

                  <motion.div
                    className='flex gap-4'
                    initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    {project.tags.map((tag, index) => (
                      <Badge
                        key={`${tag}-${index}`}
                        variant='outline'
                        className='text-xs'
                      >
                        {tag}
                      </Badge>
                    ))}

                    {(project.links.live || project.links.demo) && (
                      <Button asChild>
                        <a
                          href={project.links.live || project.links.demo}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {project.links.demo ? (
                            <Play className='w-4 h-4 mr-2' />
                          ) : (
                            <ExternalLink className='w-4 h-4 mr-2' />
                          )}
                          {project.links.demo ? "Demo" : "Live"}
                        </a>
                      </Button>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <motion.div variants={itemVariants}>
              <h3 className='text-2xl font-bold text-center mb-12'>
                <span className='bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent'>
                  Ongoing Projects
                </span>
              </h3>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {otherProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    variants={itemVariants}
                    className='group bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/50'
                    whileHover={{ y: -5 }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className='w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300'
                    />

                    <h4 className='text-xl font-semibold mb-2'>
                      {project.title}
                    </h4>

                    <p className='text-muted-foreground mb-4 leading-relaxed'>
                      {project.description}
                    </p>

                    <div className='flex flex-wrap gap-2 mb-4'>
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant='outline' className='text-xs'>
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className='flex gap-3'>
                      {project.links.github && (
                        <Button size='sm' variant='outline' asChild>
                          <a
                            href={project.links.github}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <Github className='w-4 h-4' />
                          </a>
                        </Button>
                      )}
                      {(project.links.live || project.links.demo) && (
                        <Button size='sm' asChild>
                          <a
                            href={project.links.live || project.links.demo}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <ExternalLink className='w-4 h-4' />
                          </a>
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
