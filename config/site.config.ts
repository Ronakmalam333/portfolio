export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  tagline: string;
  email: string;
  location: string;
  avatar: string;
  resume: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    website: string;
  };
  navbar: {
    title: string;
    links: Array<{
      href: string;
      label: string;
    }>;
  };
  hero: {
    greeting: string;
    name: string;
    role: string;
    description: string;
    cta: {
      primary: string;
      secondary: string;
    };
  };
  about: {
    title: string;
    description: string;
    highlights: string[];
  };
  skills: Array<{
    name: string;
    icon: string;
    level: number;
    category:
      | "frontend"
      | "backend"
      | "tools"
      | "other"
      | "ai-ml"
  }>;
  projects: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    links: {
      github?: string;
      live?: string;
      demo?: string;
    };
    featured: boolean;
  }>;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    duration: string;
    description: string;
    location: string;
    technologies: string[];
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    duration: string;
    gpa?: string;
  }>;
}

export const siteConfig: SiteConfig = {
  name: "Ronak Malam",
  title: "Full-Stack Developer | AI Enthusiast",
  description:
    "Passionate full-stack developer with 2 years of experience building scalable web applications and AI-powered solutions.",
  tagline: "Building the future, one line of code at a time",
  email: "itzronakmalam94@gmail.com",
  location: "Ahmedabad, Gujarat, India",
  avatar: "/ronak.png",
  resume: "/resume.pdf",
  social: {
    github: "https://github.com/Ronakmalam333",
    linkedin: "https://linkedin.com/in/ronak-malam",
    twitter: "https://x.com/ronak_malam",
    website: "https://github.com/Ronakmalam333",
  },
  navbar: {
    title: "RM",
    links: [
      { href: "#about", label: "About" },
      { href: "#skills", label: "Skills" },
      { href: "#projects", label: "Projects" },
      { href: "#experience", label: "Experience" },
      { href: "#contact", label: "Contact" },
    ],
  },
  hero: {
    greeting: "Hi there, I'm",
    name: "Ronak Malam",
    role: "Full-Stack Developer & AI Enthusiast",
    description:
      "I create exceptional digital experiences that solve real-world problems. Passionate about clean code, innovative solutions, and continuous learning.",
    cta: {
      primary: "View My Work",
      secondary: "Get In Touch",
    },
  },
  about: {
    title: "About Me",
    description:
      "I'm a passionate full-stack developer with over 2 year of experience creating digital solutions that make a difference. I specialize in modern web technologies and have a keen interest in AI/ML applications. When I'm not coding, you'll find me exploring new technologies, contributing to open source, or hiking in the mountains.",
    highlights: [
      "2 years of full-stack development experience",
      "Expert in React, Next.js, Node.js, and JavaScript",
      "AI/ML enthusiast with hands-on experience",
      "Open source contributor and tech community member",
      "Strong focus on user experience and accessibility",
    ],
  },
  skills: [
    // ---------- FRONTEND ----------
    { name: "HTML5", icon: "📄", level: 95, category: "frontend" },
    { name: "CSS3", icon: "🎨", level: 90, category: "frontend" },
    { name: "JavaScript (ES6+)", icon: "📜", level: 90, category: "frontend" },
    { name: "TypeScript", icon: "📘", level: 70, category: "frontend" },
    { name: "React", icon: "⚛️", level: 95, category: "frontend" },
    { name: "Next.js", icon: "▲", level: 60, category: "frontend" },
    { name: "Tailwind CSS", icon: "🌊", level: 85, category: "frontend" },
    { name: "Material UI", icon: "📐", level: 35, category: "frontend" },
    { name: "Framer Motion", icon: "🎞️", level: 35, category: "frontend" },

    // ---------- BACKEND ----------
    { name: "Node.js", icon: "🟩", level: 85, category: "backend" },
    { name: "Express.js", icon: "🚄", level: 80, category: "backend" },
    { name: "Python", icon: "🐍", level: 75, category: "backend" },
    { name: "Java", icon: "☕", level: 60, category: "backend" },
    { name: "MySQL", icon: "🐬", level: 60, category: "backend" },
    { name: "MongoDB", icon: "🍃", level: 80, category: "backend" },
    { name: "PostgreSQL", icon: "🐘", level: 15, category: "backend" },

    // ---------- TOOLS & DEVOPS ----------
    { name: "Git", icon: "😺", level: 95, category: "tools" },
    { name: "GitHub", icon: "🐙", level: 95, category: "tools" },
    { name: "Docker", icon: "🐳", level: 80, category: "tools" },
    { name: "AWS", icon: "☁️", level: 70, category: "tools" },
    { name: "GCP", icon: "🌐", level: 70, category: "tools" },
    { name: "Linux", icon: "🐧", level: 65, category: "tools" },
    { name: "Postman", icon: "📮", level: 85, category: "tools" },
    {
      name: "CI/CD",
      icon: "🔄",
      level: 70,
      category: "tools",
    },

    // ---------- AI / ML ----------
    { name: "AI/ML (General)", icon: "🤖", level: 65, category: "ai-ml" },
    { name: "NumPy", icon: "🔢", level: 25, category: "ai-ml" },
    { name: "Pandas", icon: "🐼", level: 20, category: "ai-ml" },
    { name: "Scikit-learn", icon: "📊", level: 35, category: "ai-ml" },
    { name: "PyTorch", icon: "🔥", level: 60, category: "ai-ml" },
    { name: "TensorFlow", icon: "🧠", level: 50, category: "ai-ml" },
    { name: "OpenCV", icon: "👁️", level: 45, category: "ai-ml" },

    // ---------- OTHER ----------
    { name: "Problem Solving", icon: "🧩", level: 90, category: "other" },
    { name: "DSA (C++/Python)", icon: "📚", level: 75, category: "other" },
    { name: "OOP Concepts", icon: "📦", level: 80, category: "other" },
    { name: "Agile / Scrum", icon: "🌀", level: 65, category: "other" },
    { name: "UI/UX Design (Figma)", icon: "🎨", level: 60, category: "other" },
  ],
  projects: [
    {
      id: "attandance-management-system",
      title: "Attendance Management System",
      description:
        "AI-powered attendance management system with real-time attendance tracking, and analytics dashboard.",
      image:
        "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: [
        "React.js",
        "Node.js",
        "GeminiAPI",
        "MongoDB",
        "Express.js",
        "JWT",
        "Bcrypt",
      ],
      links: {
        github: "https://github.com/Ronakmalam333/Attendance-Project",
        // live: "https://ai-dashboard.alexjohnson.dev",
      },
      featured: true,
    },
    {
      id: "student-productivity-dashboard",
      title: "Student Productivity Dashboard",
      description:
        "Full-stack e-commerce solution with payment processing, inventory management, and admin dashboard.",
      image:
        "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: ["React.js", "Node.js", "MongoDB", "Express", "Express"],
      links: {
        github: "https://github.com/alexjohnson/ecommerce",
        // demo: "https://demo.ecommerce-platform.dev",
      },
      featured: true,
    },
    {
      id: "task-manager",
      title: "Task Management App",
      description:
        "Collaborative task management application with real-time updates, team collaboration features, and project tracking.",
      image:
        "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: ["Next.js", "Firebase", "TypeScript", "MUI", "Framer Motion", "Vercel"],
      links: {
        // github: "https://github.com/alexjohnson/task-manager",
        // live: "https://tasks.alexjohnson.dev",
      },        
      featured: false,
    },
    {
      id: "weather-app",
      title: "Weather Forecast App",
      description:
        "Beautiful weather application with detailed forecasts, interactive maps, and location-based services.",
      image:
        "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: ["React Native", "OpenWeather API", "Redux", "Maps"],
      links: {
        // github: "https://github.com/alexjohnson/weather-app",
      },
      featured: false,
    },
  ],
  experience: [
    {
      id: "remote-genai-trainee",
      company: "Google Cloud SkillBoost",
      position: "GenAI Trainee & Intern",
      duration: "2024 - 2024",
      location: "Remote",
      description:
        "Completed intensive training on Generative AI technologies, including hands-on projects using Gemini API and other AI tools.",
      technologies: [
        "Gemini API",
        "Python",
        "TensorFlow",
        "Keras",
        "Jupyter",
        "Google Cloud",
        "Colab",
        "Git",
        "GitHub",
      ],
    },
    {
      id: "personal-startup",
      company: "MayaMatrix",
      position: "CEO & Founder",
      duration: "2024 - Current",
      location: "Ahmedabad & Junagadh, India",
      description:
        "Founded and lead a tech startup focused on developing AI-driven solutions for small businesses. Oversee product development, marketing, and operations.",
      technologies: ["Python", "JavaScript", "MySQL", "MongoDB", "Redis"],
    },
    // {
    //   id: "frontend-agency",
    //   company: "Digital Agency Pro",
    //   position: "Frontend Developer",
    //   duration: "2023 - 2024",
    //   location: "Gujarat, India",
    //   description: "Developed responsive websites and web applications for diverse clients. Specialized in performance optimization and cross-browser compatibility.",
    //   technologies: ["JavaScript", "React", "Sass", "Webpack", "PHP"]
    // }
  ],
  education: [
    {
      id: "higher-secondary-school",
      institution: "Alpha High School, Junagadh",
      degree: "Higher Secondary School",
      field: "Science (Mathematics) ",
      duration: "2023 - 2024",
      gpa: "8.00",
    },
    {
      id: "cs-degree",
      institution: "Rai University, Ahmedabad",
      degree: "Bachelor of Technology",
      field: "Computer Science and Engineering",
      duration: "2024 - 2028",
      gpa: "8.37",
    },
  ],
};

// © 2025 Ronak Malam – Portfolio Code. Signature ID: RM-PORT-2025
