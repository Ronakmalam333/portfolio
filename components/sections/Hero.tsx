"use client";

import { motion, easeOut } from 'framer-motion';
import { ArrowDown, Download, Mail } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { Button } from '@/components/ui/button';

export function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
      },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-cyan-500/10" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-24 h-24 bg-purple-500/20 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-muted-foreground mb-4"
        >
          {siteConfig.hero.greeting}
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            {siteConfig.hero.name}
          </span>
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-medium mb-8"
        >
          {siteConfig.hero.role}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          {siteConfig.hero.description}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Button
            size="lg"
            onClick={() => scrollToSection('#projects')}
            className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg"
          >
            <span className="relative z-10 flex items-center gap-2">
              {siteConfig.hero.cta.primary}
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </span>
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection('#contact')}
            className="group px-8 py-4 text-lg border-2"
          >
            <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            {siteConfig.hero.cta.secondary}
          </Button>

          <Button
            size="lg"
            variant="ghost"
            asChild
            className="px-8 py-4 text-lg"
          >
            <a
              href={siteConfig.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Resume
            </a>
          </Button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex justify-center"
        >
          <motion.button
            onClick={() => scrollToSection('#about')}
            className="text-muted-foreground hover:text-foreground transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-8 h-8" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}