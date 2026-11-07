/**
 * UNIVERSAL PREMIUM PORTFOLIO CONFIGURATION
 * Owner: Saranga Nuwan Hathurusinghe
 * Theme: Electric Tech Blue & Deep Obsidian
 * 
 * Central configuration file for all portfolio content, links, projects,
 * credentials, and appearance tokens.
 */

const SITE_CONFIG = {
  websiteUrl: "https://sara316129.github.io/MyPortfolio/",
  githubRepo: "https://github.com/sara316129/MyPortfolio",

  identity: {
    fullName: "Saranga Nuwan Hathurusinghe",
    displayName: "Saranga Nuwan",
    initials: "SNH",
    profession: "Computational Mathematics Undergraduate & Data Analyst",
    roleLine2: "Quantum Computing · Machine Learning · Motion Graphics · Quantitative Modeling",
    university: "University of Colombo · Faculty of Science",
    degree: "BSc (Hons) Computational Mathematics (2023 - 2027)",
    location: "Colombo / Kandy, Sri Lanka",
    availability: "Available for Research & Industry Roles",
    statusBadge: "OPEN FOR COLLABORATIONS",
    headline: "MATHEMATICAL LOGIC. CREATIVE PRECISION.",
    intro: "Undergraduate at the University of Colombo pursuing a BSc (Hons) in Computational Mathematics, focusing on quantum algorithms, machine learning, and quantitative modeling. Bridging analytical mathematics with high-impact motion design and visual communication.",
    about: {
      lead: "Hi, I'm Saranga — an undergraduate at the University of Colombo, Faculty of Science, pursuing a BSc (Hons) in Computational Mathematics.",
      paragraphs: [
        "My primary academic focus is on quantum computing, with a dedicated interest in quantum algorithms, structured circulant matrices, and their potential to overcome classical computational bottlenecks.",
        "In parallel, I immerse myself in data modeling, pattern recognition, and predictive machine learning. Beyond traditional coursework, I explore quantitative financial markets and algorithmic forex trading, analyzing price action dynamics, liquidity models, and data-driven strategies.",
        "On the creative front, I have served as a graphic designer and video editor with FOS Media (the official media unit of the Faculty of Science). I believe that mathematical rigor and visual storytelling are complementary — turning complex data structures into intuitive, compelling digital experiences."
      ],
      fosMedia: {
        unit: "FOS Media (Faculty of Science Media)",
        role: "Graphic Design · Video Editing · Motion Graphics",
        statement: "I do the math side and the design side — turns out they go together pretty well.",
        tools: ["Photoshop", "After Effects", "Premiere Pro", "InDesign"]
      }
    },
    portrait: "me.webp",
    resume: "resume.pdf",
    favicon: "icons/logo.png"
  },

  metrics: [
    { value: "4+", label: "Core Disciplines", sub: "Quantum, ML, Quant Math, Motion" },
    { value: "11", label: "Industry Credentials", sub: "DeepLearning.AI, Google, Microsoft" },
    { value: "300K+", label: "Monte Carlo Samples", sub: "O(N) 3D Voxelization Engine" },
    { value: "9,994", label: "Dataset Records Modeled", sub: "SQL & Multi-Page Power BI DAX" }
  ],

  typewriterRoles: [
    "Quantum Computing & Matrix Algorithms",
    "Data Analytics & Power BI Modeling",
    "Deep Learning & Survival Prognosis",
    "Monte Carlo 3D Simulation",
    "Cinematic Motion Graphics & Video Editing",
    "Quantitative Forex Modeling"
  ],

  contact: {
    email: "2022s19398@stu.cmb.ac.lk",
    phone: "+94 76 1981426",
    phoneDisplay: "+94 76 198 1426",
    linkedin: "https://www.linkedin.com/in/saranga-nuwan-hathurusinghe-0b599229a",
    linkedinDisplay: "linkedin.com/in/saranga-nuwan-hathurusinghe",
    github: "https://github.com/sara316129",
    githubDisplay: "github.com/sara316129",
    location: "Faculty of Science, University of Colombo, Sri Lanka",
    whatsapp: "+94761981426"
  },

  projects: [
    {
      id: "project-01",
      number: "01",
      title: "Superstore Sales & Customer Insights Dashboard",
      category: "data-ai",
      categoryLabel: "Data & Analytics",
      year: "2024",
      summary: "Multi-page interactive Power BI dashboard analyzing 9,994 transactions with SQL data cleansing, advanced DAX modeling, regional profitability mapping, and customer cohort analytics.",
      description: "Cleaned and transformed 9,994 transaction rows using SQL scripts, architected a star-schema relational model, engineered dynamic DAX measures for YTD/MTD metrics, and visualized executive KPIs, shipping modes, discount elasticity, and regional performance trends.",
      role: "Lead Data Analyst & BI Developer",
      tools: ["SQL", "Power BI", "DAX", "Data Modeling", "ETL"],
      coverImage: "projects/ppp1.webp",
      detailUrl: "p1/project1.html",
      metrics: "9,994 Rows · 4 Analytical Pages · 20+ DAX Measures",
      featured: true,
      caseStudy: {
        challenge: "Superstore management needed actionable intelligence from messy transactional records to determine why certain regional territories were operating at steep losses despite high gross revenues.",
        solution: "Engineered SQL cleaning procedures to sanitize null values and data types, followed by Power BI star-schema design with dynamic DAX calculations for profit ratios, shipping latency, and discount impact.",
        results: "Identified that aggressive discounting (>20%) in specific sub-categories was eroding margins by up to 34%, providing clear thresholds for regional sales managers."
      }
    },
    {
      id: "project-02",
      number: "02",
      title: "Center of Mass of 3D Objects via Monte Carlo Methods",
      category: "comp-math",
      categoryLabel: "Computational Math",
      year: "2024",
      summary: "Computational physics simulation applying Monte Carlo numerical integration, custom MRG random generators, Ray Casting, and 3D Voxelization to calculate centers of mass at O(N) complexity.",
      description: "A collaborative 3-member research project for the Random Number Theory course. We engineered a custom Multiple Recursive Generator (MRG), contrasted traditional Ray-Casting against 3D Voxelization algorithms, and achieved near-exact center of mass coordinates using 300,000 sample points with O(N) algorithmic efficiency.",
      role: "Algorithm Designer & Python Programmer",
      tools: ["Python", "NumPy", "Trimesh", "Tkinter", "Monte Carlo"],
      coverImage: "projects/ppp2.jpg",
      detailUrl: "p2/project2.html",
      metrics: "300K Samples · O(N) Complexity · Custom MRG RNG",
      featured: true,
      caseStudy: {
        challenge: "Determining center of mass for irregular non-convex 3D polyhedra analytically is intractable. Conventional boundary ray casting has high computational overhead (O(N·F) where F is polygon face count).",
        solution: "Implemented uniform stochastic sampling with a verified MRG generator and built a spatial voxelization grid that classifies interior points in O(1) per sample, achieving overall O(N) scaling.",
        results: "Achieved less than 0.28% relative error compared to analytical ground truth on complex geometric meshes with a 4.8x runtime speedup over naive ray casting."
      }
    },
    {
      id: "project-03",
      number: "03",
      title: "Motion Graphics & Kinetic Typography Showcase",
      category: "motion-creative",
      categoryLabel: "Motion & Creative",
      year: "2024",
      summary: "Commercial motion design portfolio featuring kinetic typography, Video Copilot Saber neon visual effects, 3D card flips, circular countdown HUDs, and cinematic monochrome narrative storytelling.",
      description: "Five comprehensive motion graphics productions: Nike brand kinetic typography ads, high-energy neon circuit line animations utilizing Video Copilot Saber, a dual glow-ring broadcast countdown timer, a food commercial with 3D product transitions, and an editorial black & white cinematic sequence.",
      role: "Motion Designer & Video Editor",
      tools: ["After Effects", "Saber Plugin", "Premiere Pro", "Photoshop", "Sound Design"],
      coverImage: "projects/ppp3.jpg",
      detailUrl: "p3/project3.html",
      metrics: "5 Commercial Productions · Custom VFX · 60fps Broadcast",
      featured: true,
      caseStudy: {
        challenge: "Produce broadcast-ready commercial motion pieces balancing high visual tempo, kinetic pacing, and crisp brand messaging without visual clutter.",
        solution: "Leveraged Video Copilot Saber for dynamic energy discharge paths, procedural easing curves, multi-plane 3D camera sweeps in After Effects, and tight audio-reactive cut rhythms.",
        results: "Delivered 5 polished video spots featured across university media channels and client campaign tests."
      }
    },
    {
      id: "project-04",
      number: "04",
      title: "Multimodal Cancer Prognosis with Deep Learning",
      category: "data-ai",
      categoryLabel: "Data & AI",
      year: "2024",
      summary: "End-to-end clinical survival prediction system combining 3D CT imaging features from pretrained MedicalNet encoders, PyRadiomics tumor descriptors, and clinical metrics with Cox models.",
      description: "A 6-member scientific computing machine learning research project. We integrated 3D CT scan latent embeddings (extracted via MedicalNet ResNet-10), PyRadiomics tumor texture variables, and patient clinical records. We benchmarked late, intermediate, and multi-head attention fusion with Cox proportional hazards survival modeling, validated through 5-fold cross-validation, and deployed an interactive FastAPI + React prototype.",
      role: "ML Pipeline Architect & Data Modeler",
      tools: ["Python", "PyTorch", "MedicalNet ResNet-10", "PyRadiomics", "FastAPI", "React"],
      coverImage: "projects/ppp4.jpg",
      detailUrl: "p4/project4.html",
      metrics: "3 Data Modalities · 5-Fold Cross-Val · React + FastAPI App",
      featured: true,
      caseStudy: {
        challenge: "Cancer prognosis models relying solely on clinical charts or 2D image slices miss critical spatial heterogeneity and non-linear risk interactions, leading to poor concordance indices.",
        solution: "Constructed a multimodal fusion architecture combining 3D volumetric embeddings from ResNet-10 with handcrafted radiomics features and clinical markers, trained under a Cox partial likelihood loss.",
        results: "Attention fusion demonstrated statistically significant concordance gains over single-modality baselines; presented as a research poster at the Faculty of Science."
      }
    }
  ],

  skillsArsenal: {
    marquee: [
      { name: "Python", icon: "icons/python.png" },
      { name: "SQL", icon: "icons/sql.png" },
      { name: "Power BI", icon: "icons/powerbi.png" },
      { name: "Excel", icon: "icons/excel.png" },
      { name: "IBM SPSS", icon: "icons/spss.png" },
      { name: "Machine Learning", icon: "icons/ml.png" },
      { name: "Data Viz", icon: "icons/dataviz.png" },
      { name: "Cryptography", icon: "icons/crypto.png" },
      { name: "VS Code", icon: "icons/vscode.png" },
      { name: "PyCharm", icon: "icons/pycharm.png" },
      { name: "IntelliJ IDEA", icon: "icons/intellij.png" },
      { name: "GitHub", icon: "icons/github.png" },
      { name: "Photoshop", icon: "icons/photoshop.png" },
      { name: "After Effects", icon: "icons/aftereffects.png" },
      { name: "Premiere Pro", icon: "icons/premiere.png" },
      { name: "InDesign", icon: "icons/indesign.png" }
    ],
    categories: [
      {
        title: "Mathematics & Computation",
        description: "Theoretical grounding and numerical computing for complex problem solving.",
        items: [
          "Quantum Algorithms",
          "Circulant & Structured Matrices",
          "Monte Carlo Simulation",
          "Numerical Optimization",
          "Cryptography & Number Theory",
          "Statistical Inference"
        ]
      },
      {
        title: "Data Science & Machine Learning",
        description: "End-to-end data pipelines, survival analysis, and predictive models.",
        items: [
          "Python (NumPy, SciPy, Pandas)",
          "PyTorch & Deep Learning",
          "Scikit-Learn Modeling",
          "Survival Analysis (Cox Models)",
          "SQL & Relational Schemas",
          "Power BI, DAX & ETL Modeling",
          "IBM SPSS Analytics"
        ]
      },
      {
        title: "Creative & Visual Media",
        description: "Editorial motion graphics, brand design, and video production.",
        items: [
          "Adobe After Effects (Saber, VFX)",
          "Adobe Premiere Pro Video Editing",
          "Adobe Photoshop Graphics & Retouching",
          "Adobe InDesign Editorial Layouts",
          "Kinetic Typography & Pacing",
          "Sound Design & Audio Synchronization"
        ]
      },
      {
        title: "Engineering & Tooling",
        description: "Modern developer environment and version control workflows.",
        items: [
          "Git & GitHub Workflows",
          "VS Code & JetBrains IDEs",
          "FastAPI Backend Services",
          "React Component Development",
          "Linux / Bash CLI & Automation"
        ]
      }
    ]
  },

  certificates: [
    {
      id: "cert-01",
      number: "01",
      title: "Specialization of Machine Learning",
      issuer: "DeepLearning.AI",
      date: "Issued Sep 2025",
      credentialId: "GCGJ7WNQL3TK",
      url: "https://www.coursera.org/account/accomplishments/specialization/GCGJ7WNQL3TK",
      image: "certs/cert1.jpg",
      category: "ai-ml",
      tags: ["Supervised Learning", "Deep Learning", "Data Ethics"]
    },
    {
      id: "cert-02",
      number: "02",
      title: "Advanced Learning Algorithms",
      issuer: "DeepLearning.AI",
      date: "Issued Jul 2025",
      credentialId: "40HAAUISH7JE",
      url: "https://www.coursera.org/account/accomplishments/verify/40HAAUISH7JE",
      image: "certs/cert3.jpg",
      category: "ai-ml",
      tags: ["Deep Learning", "TensorFlow", "Artificial Neural Networks"]
    },
    {
      id: "cert-03",
      number: "03",
      title: "Supervised Machine Learning: Regression and Classification",
      issuer: "DeepLearning.AI",
      date: "Issued Jul 2025",
      credentialId: "CV4UKB3RL6K5",
      url: "https://www.coursera.org/account/accomplishments/verify/CV4UKB3RL6K5",
      image: "certs/cert2.jpg",
      category: "ai-ml",
      tags: ["Jupyter", "Scikit-Learn", "Predictive Modeling"]
    },
    {
      id: "cert-04",
      number: "04",
      title: "Ask Questions to Make Data-Driven Decisions",
      issuer: "Google",
      date: "Issued Jul 2025",
      credentialId: "1FNXM7HFE5HK",
      url: "https://www.coursera.org/account/accomplishments/verify/1FNXM7HFE5HK",
      image: "certs/cert4.jpg",
      category: "data-analytics",
      tags: ["Problem Solving", "Analytical Thinking", "Dashboards"]
    },
    {
      id: "cert-05",
      number: "05",
      title: "Foundations: Data, Data, Everywhere",
      issuer: "Google",
      date: "Issued Jul 2025",
      credentialId: "6O5J2KK8HMP8",
      url: "https://www.coursera.org/account/accomplishments/verify/6O5J2KK8HMP8",
      image: "certs/cert5.jpg",
      category: "data-analytics",
      tags: ["Data Cleaning", "Data Analysis", "SQL Foundations"]
    },
    {
      id: "cert-06",
      number: "06",
      title: "Fundamentals of Digital Marketing",
      issuer: "Google",
      date: "Issued Apr 2024",
      credentialId: "279927777",
      url: "https://skillshop.exceedlms.com/student/award/yXjDRD5gyEctxBue3JD2NcH8",
      image: "certs/cert6.jpg",
      category: "creative-media",
      tags: ["Search Engine Marketing", "Analytics", "Campaigns"]
    },
    {
      id: "cert-07",
      number: "07",
      title: "Career Essentials in System Administration",
      issuer: "Microsoft & LinkedIn",
      date: "Issued Apr 2024",
      credentialId: "fbb120b1257c",
      url: "https://www.linkedin.com/learning/certificates/fbb120b1257caf0f7174e70fde8660dc65d49d8e92b173614dad98f56da39baa",
      image: "certs/cert7.jpg",
      category: "systems-dev",
      tags: ["Network Security", "System Admin", "Infrastructure"]
    },
    {
      id: "cert-08",
      number: "08",
      title: "Getting Started with R for Data Science",
      issuer: "LinkedIn",
      date: "Issued May 2024",
      credentialId: "cee6e83bf98c",
      url: "https://www.linkedin.com/learning/certificates/cee6e83bf98c0a9a587dd3a223f83ad6c6d38c401c15287e6fb91d3c62d6068b",
      image: "certs/cert8.jpg",
      category: "data-analytics",
      tags: ["R Programming", "Statistical Analysis", "Data Science"]
    },
    {
      id: "cert-09",
      number: "09",
      title: "Master Microsoft Excel",
      issuer: "LinkedIn",
      date: "Issued May 2024",
      credentialId: "45cfd1328cb6",
      url: "https://www.linkedin.com/learning/certificates/45cfd1328cb665c5463a5d14379ddeb56f5382a4bb0b66ff9f6603a645614cb1",
      image: "certs/cert9.jpg",
      category: "data-analytics",
      tags: ["Advanced Formulas", "Pivot Tables", "Financial Modeling"]
    },
    {
      id: "cert-10",
      number: "10",
      title: "Essential Skills in Adobe Premiere Pro",
      issuer: "Adobe & LinkedIn",
      date: "Issued May 2024",
      credentialId: "9f6537ed2378",
      url: "https://www.linkedin.com/learning/certificates/9f6537ed2378db8b4e691ba17376b29a65b7444034b6afeaffdf6cd8b8c4f223",
      image: "certs/cert10.jpg",
      category: "creative-media",
      tags: ["Video Editing", "Color Grading", "Audio Sync"]
    },
    {
      id: "cert-11",
      number: "11",
      title: "Advance Your Video Editing Skills",
      issuer: "LinkedIn",
      date: "Issued May 2024",
      credentialId: "0a36d27b3491",
      url: "https://www.linkedin.com/learning/certificates/0a36d27b34916721daffd20fb8f15d979fad6eb52cf2b3f9b035cf90dcd32fad",
      image: "certs/cert11.jpg",
      category: "creative-media",
      tags: ["Pacing", "Narrative Cutting", "Advanced Motion"]
    }
  ],

  education: [
    {
      id: "edu-01",
      institution: "University of Colombo",
      faculty: "Faculty of Science",
      degree: "BSc (Hons) in Computational Mathematics",
      level: "Undergraduate Degree",
      period: "May 2023 - May 2027",
      location: "Colombo, Sri Lanka",
      logo: "education/uoc.png",
      description: "Rigorous honors program integrating pure/applied mathematics, quantum algorithms, scientific computing, numerical analysis, data science, and mathematical statistics.",
      highlights: [
        "Quantum Algorithms Research Focus",
        "Scientific Computing with Machine Learning (AM 4087)",
        "Random Number Theory & Monte Carlo Simulations"
      ]
    },
    {
      id: "edu-02",
      institution: "Sri Rahula College Katugastota",
      faculty: "Physical Science / Mathematics Stream",
      degree: "G.C.E. Advanced Level (A/L)",
      level: "Secondary Education",
      period: "2018 - 2021",
      location: "Kandy, Sri Lanka",
      logo: "education/srck.png",
      description: "Intensive preparation in Combined Mathematics, Physics, and Chemistry, qualifying for direct faculty admission to the University of Colombo Faculty of Science.",
      highlights: ["Physical Science Stream", "Strong mathematical and physics foundation"]
    },
    {
      id: "edu-03",
      institution: "Sri Rahula College Katugastota",
      faculty: "General Secondary Curriculum",
      degree: "G.C.E. Ordinary Level (O/L)",
      level: "Primary & Junior Secondary",
      period: "2007 - 2018",
      location: "Kandy, Sri Lanka",
      logo: "education/srck.png",
      description: "Foundational academic training with academic distinction in science, mathematics, and English.",
      highlights: ["Distinction in Mathematics and Sciences", "Active participation in academic societies"]
    }
  ],

  appearance: {
    style: "cinematic minimal, tech editorial, electric cyan & blue",
    theme: "dark",
    background: "#08090d",
    surface: "#0f121a",
    surfaceAlt: "#141824",
    text: "#eef2f8",
    muted: "#94a3b8",
    dim: "#64748b",
    accent: "#00d2ff", // signature electric cyan/blue
    accent2: "#0070f3", // deep tech cobalt blue
    accentGlow: "rgba(0, 210, 255, 0.28)",
    border: "rgba(255, 255, 255, 0.08)",
    borderHover: "rgba(0, 210, 255, 0.45)",
    displayFont: "'Anton', sans-serif",
    bodyFont: "'Manrope', sans-serif",
    accentFont: "'Caveat', cursive",
    monoFont: "'Space Mono', monospace"
  }
};

// Export for module systems or attach to window
if (typeof module !== "undefined" && module.exports) {
  module.exports = SITE_CONFIG;
} else if (typeof window !== "undefined") {
  window.SITE_CONFIG = SITE_CONFIG;
}
