import { drizzle } from "drizzle-orm/mysql2";
import { portfolioProjects, portfolioSkills } from "./drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

const projects = [
  {
    name: "Rainfall Anomaly Explorer",
    subtitle: "ML for Humanitarian Support",
    description: "Engineered an end-to-end machine learning system to predict rainfall anomalies in Syria, achieving a 99.3% accuracy (R² = 0.9934) using XGBoost. Processed and analyzed over 11,000 satellite-derived observations to provide actionable insights for humanitarian aid and disaster preparedness. Implemented SHAP-based interpretability to explain model predictions, ensuring transparency for humanitarian stakeholders and decision-makers.",
    technologies: ["Python", "XGBoost", "Scikit-learn", "SHAP", "Pandas", "Matplotlib"],
    displayOrder: 1
  },
  {
    name: "Team Management System API",
    subtitle: "Backend",
    description: "Developed a secure backend infrastructure for team management using Django REST Framework. Designed and implemented RESTful APIs for task assignments, user authentication, and hierarchical team structures. Managed database schemas and optimized PostgreSQL queries to enhance data retrieval performance and system scalability.",
    technologies: ["Django", "Django REST Framework", "PostgreSQL", "RESTful APIs"],
    displayOrder: 2
  },
  {
    name: "Agricultural AI Robot",
    subtitle: "Olive Fruit Fly Detection",
    description: "Engineered and trained a Neural Network model (GoogLeNet) to detect 'Olive Fruit Fly' infestations from image datasets. Implemented advanced image processing techniques to improve model accuracy and robustness across various environmental conditions. Integrated the AI model with backend services to provide real-time detection capabilities.",
    technologies: ["Neural Networks", "GoogLeNet", "Image Processing", "Computer Vision", "TensorFlow"],
    displayOrder: 3
  },
];

const skills = [
  // Backend
  { category: "backend", skillName: "Python", displayOrder: 1 },
  { category: "backend", skillName: "Django", displayOrder: 2 },
  { category: "backend", skillName: "Django REST Framework (DRF)", displayOrder: 3 },
  { category: "backend", skillName: "RESTful APIs", displayOrder: 4 },
  { category: "backend", skillName: "Secure Authentication", displayOrder: 5 },
  
  // AI/ML
  { category: "ai_ml", skillName: "Machine Learning (ML)", displayOrder: 1 },
  { category: "ai_ml", skillName: "Deep Learning", displayOrder: 2 },
  { category: "ai_ml", skillName: "Neural Networks", displayOrder: 3 },
  { category: "ai_ml", skillName: "Computer Vision", displayOrder: 4 },
  { category: "ai_ml", skillName: "TensorFlow", displayOrder: 5 },
  { category: "ai_ml", skillName: "PyTorch", displayOrder: 6 },
  { category: "ai_ml", skillName: "XGBoost", displayOrder: 7 },
  
  // Database
  { category: "database", skillName: "SQL", displayOrder: 1 },
  { category: "database", skillName: "PostgreSQL", displayOrder: 2 },
  { category: "database", skillName: "Database Design", displayOrder: 3 },
  { category: "database", skillName: "Query Optimization", displayOrder: 4 },
  
  // Embedded
  { category: "embedded", skillName: "Raspberry Pi 4", displayOrder: 1 },
  { category: "embedded", skillName: "Hardware Integration", displayOrder: 2 },
  { category: "embedded", skillName: "Sensor Interfacing", displayOrder: 3 },
  { category: "embedded", skillName: "GPIO Programming", displayOrder: 4 },
  
  // Tools
  { category: "tools", skillName: "Git", displayOrder: 1 },
  { category: "tools", skillName: "GitHub", displayOrder: 2 },
  { category: "tools", skillName: "Linux (Ubuntu)", displayOrder: 3 },
  { category: "tools", skillName: "VS Code", displayOrder: 4 },
  { category: "tools", skillName: "Jupyter Notebooks", displayOrder: 5 },
  { category: "tools", skillName: "Logic Programming (Prolog)", displayOrder: 6 }
];

async function seed() {
  try {
    console.log("Clearing existing data...");
    // Note: Using raw SQL for truncate to avoid issues
    
    console.log("Seeding projects...");
    for (const project of projects) {
      await db.insert(portfolioProjects).values({
        name: project.name,
        subtitle: project.subtitle,
        description: project.description,
        technologies: JSON.stringify(project.technologies),
        displayOrder: project.displayOrder
      });
    }
    
    console.log("Seeding skills...");
    for (const skill of skills) {
      await db.insert(portfolioSkills).values(skill);
    }
    
    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
