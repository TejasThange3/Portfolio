export const DATA = {
  profile: {
    name: "John Doe",
    title: "Full Stack Engineer",
    location: "San Francisco, CA",
    bio: "Building digital products with a focus on user experience and performance.",
    email: "hello@example.com",
    social: {
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      twitter: "https://twitter.com/johndoe",
    },
  },
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
  ],
  projects: [
    {
      slug: "project-one",
      title: "AI-Powered Analytics Dashboard",
      tagline: "Real-time insights for data-driven decisions",
      description: "A comprehensive analytics platform that transforms raw data into actionable insights using machine learning.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
      tech: ["React", "Node.js", "Python", "TensorFlow"],
      link: "https://example.com",
      repo: "https://github.com/example/project-one",
      caseStudy: {
        problem: {
          title: "The Problem",
          description: "Businesses were drowning in data but struggling to extract meaningful insights. Traditional analytics tools required manual configuration and lacked predictive capabilities, leading to delayed decision-making and missed opportunities.",
        },
        solution: {
          title: "The Solution",
          description: "I built an AI-powered analytics dashboard that automatically identifies trends, anomalies, and patterns in real-time. The platform uses machine learning to predict future trends and provides actionable recommendations.",
          features: [
            "Real-time data processing with sub-second latency",
            "ML-powered anomaly detection",
            "Predictive analytics with 85% accuracy",
            "Customizable dashboards with drag-and-drop interface",
            "RESTful API for seamless integrations",
          ],
        },
        impact: {
          title: "The Impact",
          description: "The platform transformed how businesses interact with their data, leading to faster decision-making and improved outcomes.",
          stats: [
            { label: "Faster Insights", value: "70%" },
            { label: "User Adoption", value: "500+" },
            { label: "Data Processed", value: "10TB+" },
            { label: "Prediction Accuracy", value: "85%" },
          ],
        },
      },
    },
    {
      slug: "project-two",
      title: "E-Commerce Platform",
      tagline: "Seamless shopping experience with instant checkout",
      description: "A modern e-commerce platform with advanced features like instant checkout, inventory management, and personalized recommendations.",
      imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800",
      tech: ["Next.js", "Stripe", "PostgreSQL", "Redis"],
      link: "https://example.com",
      repo: "https://github.com/example/project-two",
      caseStudy: {
        problem: {
          title: "The Problem",
          description: "Traditional e-commerce platforms had slow checkout processes, poor inventory management, and lacked personalization, resulting in high cart abandonment rates and poor user experience.",
        },
        solution: {
          title: "The Solution",
          description: "I developed a next-generation e-commerce platform with instant checkout, real-time inventory sync, and AI-powered product recommendations that adapt to user behavior.",
          features: [
            "One-click checkout with Stripe integration",
            "Real-time inventory synchronization",
            "AI-powered product recommendations",
            "Advanced admin dashboard",
            "Multi-currency support",
          ],
        },
        impact: {
          title: "The Impact",
          description: "The platform significantly improved conversion rates and customer satisfaction while reducing operational overhead.",
          stats: [
            { label: "Cart Abandonment Reduced", value: "40%" },
            { label: "Monthly Transactions", value: "50K+" },
            { label: "Average Load Time", value: "<1s" },
            { label: "Customer Satisfaction", value: "4.8/5" },
          ],
        },
      },
    },
  ],
};
