# Modern Portfolio Website Template

A fully customizable, production-ready portfolio website template built with Next.js 13+, TailwindCSS, Framer Motion, and TypeScript.

## ✨ Features

- **Modern Tech Stack**: Next.js 13+ with App Router, TypeScript, TailwindCSS
- **Smooth Animations**: Framer Motion for beautiful page transitions and micro-interactions
- **Dark/Light Theme**: Built-in theme switching with next-themes
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **SEO Optimized**: Meta tags, Open Graph, Twitter Cards, and structured data
- **Configuration-Based**: Easy content management through config files
- **Form Handling**: Contact form with validation and API route
- **Type Safe**: Full TypeScript implementation with strict typing
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd portfolio-website
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### 1. Site Configuration

Edit `config/site.config.ts` to customize your portfolio content:

```typescript
export const siteConfig: SiteConfig = {
  name: "Your Name",
  title: "Your Title",
  description: "Your description",
  // ... more configuration options
}
```

### 2. Theme Configuration

Customize colors and themes in `config/theme.config.ts`:

```typescript
export const themes = {
  default: 'blue',
  options: [
    { name: 'blue', color: '#3b82f6', label: 'Blue' },
    { name: 'purple', color: '#8b5cf6', label: 'Purple' },
    // Add more themes
  ]
}
```

### 3. Content Sections

#### Personal Information
- Update `hero`, `about`, and contact information in the config
- Replace the avatar image URL with your photo
- Add your social media links and resume

#### Skills
Add your technical skills with proficiency levels:

```typescript
skills: [
  { name: "React", icon: "⚛️", level: 95, category: "frontend" },
  // Add more skills
]
```

#### Projects
Showcase your projects with images, descriptions, and links:

```typescript
projects: [
  {
    id: "project-1",
    title: "Project Title",
    description: "Project description",
    image: "image-url",
    tags: ["React", "TypeScript"],
    links: {
      github: "github-url",
      live: "live-url"
    },
    featured: true
  }
]
```

#### Experience & Education
Add your professional experience and educational background in the respective arrays.

### 4. Styling and Layout

- **Colors**: Customize the color palette in `tailwind.config.ts`
- **Typography**: Fonts are configured in `app/layout.tsx`
- **Components**: Individual components can be styled in their respective files
- **Animations**: Modify Framer Motion animations in each section component

## 📁 Project Structure

```
├── app/
│   ├── api/contact/          # Contact form API route
│   ├── globals.css          # Global styles and CSS variables
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page component
├── components/
│   ├── layout/
│   │   └── Navbar.tsx       # Navigation component
│   ├── sections/            # All page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   └── ui/                  # Reusable UI components
│       └── theme-toggle.tsx
├── config/
│   ├── site.config.ts       # Main configuration file
│   └── theme.config.ts      # Theme configuration
└── lib/
    └── utils.ts             # Utility functions
```

## 🎯 Customization Examples

### Adding a New Section

1. Create a new component in `components/sections/`
2. Add the section data to `site.config.ts`
3. Import and add the component to `app/page.tsx`
4. Update the navigation links if needed

### Changing Color Scheme

1. Modify the color values in `config/theme.config.ts`
2. Update CSS variables in `app/globals.css` if needed
3. Adjust component-specific colors as desired

### Adding Animation Effects

All sections use Framer Motion for animations. You can:
- Modify existing animation variants
- Add new animation triggers
- Customize timing and easing functions

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Netlify

1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify

### Other Platforms

The project outputs static files and can be deployed to any static hosting service.

## 📧 Contact Form Setup

The contact form includes:
- Client-side validation with React Hook Form and Zod
- API route for handling submissions
- Success/error states with animations

To enable email sending, integrate with services like:
- SendGrid
- AWS SES  
- Nodemailer
- Resend

## 🛠️ Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📝 License

MIT License - feel free to use this template for your portfolio!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and enhancement requests.

## 🙋‍♂️ Support

If you have any questions or need help customizing the template, please:
- Open an issue on GitHub
- Check the documentation
- Review the configuration examples

---

**Happy coding!** 🚀