# Modern Portfolio Website

A production-ready portfolio website built with **Next.js 13+**, **TailwindCSS**, **Framer Motion**, and **TypeScript**.

---

## ✨ Features

* **Modern Tech Stack**: Next.js 13+ with App Router, TypeScript, TailwindCSS
* **Smooth Animations**: Framer Motion for page transitions and micro-interactions
* **Dark/Light Theme**: Built-in theme switching
* **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
* **SEO Optimized**: Meta tags, Open Graph, Twitter Cards
* **Configuration-Based**: Easy content management through config files
* **Form Handling**: Contact form with validation and API route
* **Type Safe**: Full TypeScript implementation
* **Accessibility**: WCAG compliant with ARIA labels and keyboard navigation

---

## 🚀 Quick Start

### Prerequisites

* Node.js 18+
* npm, yarn, or pnpm

### Installation

```bash
git clone <repository-url>
cd portfolio-website
npm install
npm run dev
```

Open your browser at [http://localhost:3000](http://localhost:3000)

---

## 🌚 Customization

### Site Configuration

Edit `config/site.config.ts` to update:

* Name, title, description
* Hero/About/Contact information
* Skills, projects, experience, and education

### Theme Configuration

Modify `config/theme.config.ts` to adjust colors or theme options.

### Content Sections

* **Personal Info**: Hero, About, Contact
* **Skills**: Technical skills with proficiency
* **Projects**: Images, descriptions, links
* **Experience & Education**: Professional & academic background

### Styling and Layout

* Colors: `tailwind.config.ts`
* Typography: `app/layout.tsx`
* Components: Modify files in `components/`
* Animations: Framer Motion per section

---

## 📁 Project Structure

```
├── app/
│   ├── api/contact/          # Contact form API route
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page
├── components/
│   ├── layout/               # Navigation components
│   ├── sections/             # Page sections
│   └── ui/                   # Reusable UI components
├── config/                   # Site and theme configurations
└── lib/
    └── utils.ts              # Utility functions
```

---

## 🚀 Deployment

Deploy to **Vercel, Netlify, or any static hosting service** using standard Next.js deployment steps.

---

## 📧 Contact Form Setup

* Client-side validation with React Hook Form and Zod
* API route for handling submissions
* Supports integration with SendGrid, AWS SES, Nodemailer, or Resend

---

## 🛠️ Development Commands

```bash
# Start dev server
npm run dev

# Build production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

---

## 🗒 License

**All Rights Reserved © 2025 Ronak Malam**

This repository and its contents, including all code, designs, and assets, are the exclusive property of Ronak Malam.
No part of this repository may be copied, modified, distributed, or used in any form without explicit written permission.

**For inquiries:**
**Email:** [itzronakmalam94@gmail.com](mailto:itzronakmalam94@gmail.com)
**GitHub:** [https://github.com/Ronakmalam333](https://github.com/Ronakmalam333)
