export const DATA = {
  profile: {
    name: "Tejas Thange",
    title: "AI & ML Engineer",
    location: "Pune, India",
    bio: "Building intelligent systems with machine learning and modern web technologies. Passionate about creating scalable AI solutions.",
    email: "tejas.thange@example.com",
    social: {
      github: "https://github.com/tejasthange",
      linkedin: "https://linkedin.com/in/tejasthange",
      twitter: "https://twitter.com/tejasthange",
    },
  },
  skills: [
    "Python",
    "TensorFlow",
    "React",
    "Next.js",
    "TypeScript",
    "Machine Learning",
    "Docker",
    "AWS",
    "PyTorch",
    "Node.js",
  ],
  projects: [
    {
      slug: "ai-analytics-platform",
      title: "AI-Powered Analytics Platform",
      tagline: "Real-time insights with predictive ML models",
      description: "An enterprise analytics platform that uses machine learning to transform raw data into actionable business insights with 85% prediction accuracy.",
      imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800",
      tech: ["Python", "TensorFlow", "React", "Node.js"],
      link: "https://example.com",
      repo: "https://github.com/tejasthange/ai-analytics",
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
            "ML-powered anomaly detection using TensorFlow",
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
      slug: "modern-ecommerce",
      title: "Next-Gen E-Commerce Platform",
      tagline: "AI-powered shopping with instant checkout",
      description: "A modern e-commerce platform with AI-driven product recommendations, instant checkout, and real-time inventory management.",
      imageUrl: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=800",
      tech: ["Next.js", "Stripe", "PostgreSQL", "Redis"],
      link: "https://example.com",
      repo: "https://github.com/tejasthange/ecommerce",
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
            "Advanced admin dashboard with analytics",
            "Multi-currency and multi-language support",
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
    {
      slug: "distributed-systems",
      title: "Distributed System Architecture",
      tagline: "Scalable microservices with real-time processing",
      description: "A highly scalable distributed system built with microservices architecture, handling millions of requests per day with 99.99% uptime.",
      imageUrl: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=800",
      tech: ["Docker", "Kubernetes", "Python", "AWS"],
      link: "https://example.com",
      repo: "https://github.com/tejasthange/distributed-system",
      caseStudy: {
        problem: {
          title: "The Problem",
          description: "Monolithic applications struggled to handle increasing traffic loads, resulting in frequent downtime, slow response times, and difficulty in scaling individual components.",
        },
        solution: {
          title: "The Solution",
          description: "I architected a distributed system using microservices, containerization with Docker, orchestration with Kubernetes, and deployed on AWS for high availability and auto-scaling.",
          features: [
            "Microservices architecture with independent scaling",
            "Container orchestration with Kubernetes",
            "Auto-scaling based on traffic patterns",
            "Real-time monitoring and alerting",
            "CI/CD pipeline with zero-downtime deployments",
          ],
        },
        impact: {
          title: "The Impact",
          description: "The new architecture improved system reliability, reduced costs, and enabled the team to deploy features faster with greater confidence.",
          stats: [
            { label: "Uptime", value: "99.99%" },
            { label: "Requests/Day", value: "5M+" },
            { label: "Deployment Time", value: "<5min" },
            { label: "Cost Reduction", value: "35%" },
          ],
        },
      },
    },
  ],
};
