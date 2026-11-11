export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  description: string;
  role: string;
  deliverables: string[];
  techStack: string[];
  metrics: { label: string; value: string }[];
  liveUrl?: string;
  githubUrl?: string;
  accentColor: string;
  accentBorder: string;
  gradient: string;
}

export const PROJECTS: Project[] = [
  {
    id: "braillebook-pro",
    title: "BrailleBook Pro",
    subtitle: "AI Text-to-Braille & Speech Assistive Platform",
    category: "Accessibility & Vision AI",
    year: "2026",
    description:
      "An intelligent assistive reading platform engineered for visually impaired individuals. Converts English and Hindi documents (.TXT/.PDF) or text into tactile Unicode Grade 1 & Bharati Braille with real-time speech synthesis, dual-theme glassmorphism UI, and interactive reference grids.",
    role: "Full-Stack & Systems Developer",
    deliverables: [
      "Grade 1 & Bharati Braille Engine",
      "Multi-Format Document OCR & Reader (.TXT/.PDF)",
      "Real-Time Web Speech Synthesizer",
    ],
    techStack: ["Python", "Flask", "OpenCV", "Web Speech API", "JavaScript", "Vercel"],
    metrics: [
      { label: "Braille Standards", value: "Grade 1 & Bharati" },
      { label: "Synthesis Latency", value: "<150ms" },
      { label: "Compliance", value: "WCAG AAA" },
    ],
    liveUrl: "https://braille-book-pro.vercel.app",
    githubUrl: "https://github.com/amanmaurya18/BrailleBookPro",
    accentColor: "from-[#710014] to-[#8c0019]",
    accentBorder: "hover:border-[#710014]",
    gradient: "radial-gradient(ellipse at top, rgba(113, 0, 20, 0.35), transparent 70%)",
  },
  {
    id: "careecho",
    title: "CareEcho",
    subtitle: "Real-Time Multimodal Health Companion",
    category: "Healthcare & Multimodal AI",
    year: "2026",
    description:
      "An accessible multimodal health companion for seniors and caregivers. Features Google Gemini 1.5 Flash prescription vision OCR, conversational voice assistance, dual senior/caregiver portals, Web Audio feedback, and SMS/WhatsApp caregiver alert simulation.",
    role: "Full-Stack & Systems Engineer",
    deliverables: [
      "Gemini 1.5 Flash Prescription Vision OCR",
      "Senior Companion & Conversational Voice Orb",
      "Caregiver Portal & SMS/WhatsApp Alert Simulator",
    ],
    techStack: ["Next.js 14", "TypeScript", "Google Gemini AI", "Web Audio API", "Tailwind CSS", "Vercel"],
    metrics: [
      { label: "Prescription OCR", value: "Gemini Vision" },
      { label: "Voice Latency", value: "Real-time" },
      { label: "Accessibility", value: "High-Contrast AAA" },
    ],
    liveUrl: "https://care-echo-omega.vercel.app",
    githubUrl: "https://github.com/amanmaurya18/CareEcho",
    accentColor: "from-[#8c0019] to-[#710014]",
    accentBorder: "hover:border-[#710014]",
    gradient: "radial-gradient(ellipse at top, rgba(113, 0, 20, 0.35), transparent 70%)",
  },
  {
    id: "codereviewx",
    title: "CodeReviewX",
    subtitle: "AI Senior Code Auditor & Quality Reviewer",
    category: "Developer Tools & AI Systems",
    year: "2026",
    description:
      "An automated multi-language code review ecosystem providing instant senior-level audits across JavaScript, Python, C++, Java, and C. Powered by Google Gemini 2.0/1.5 Flash with resilient model fallbacks, AST semantic vulnerability checks, and an interactive Prism.js split-view editor.",
    role: "Full-Stack & AI Systems Developer",
    deliverables: [
      "Multi-Language Automated Code Auditor",
      "Resilient Gemini Model Fallback Pipeline",
      "Interactive Split Code Editor & Syntax Engine",
    ],
    techStack: ["Next.js", "React", "Node.js", "Gemini 2.0 Flash", "Prism.js", "Tailwind CSS", "Vercel"],
    metrics: [
      { label: "Languages", value: "5+ (JS, PY, C++, Java, C)" },
      { label: "Audit Latency", value: "<3s" },
      { label: "Architecture", value: "Multi-Model Fallback" },
    ],
    liveUrl: "https://code-review-x-umber.vercel.app",
    githubUrl: "https://github.com/amanmaurya18/Code_ReviewX",
    accentColor: "from-[#710014] via-[#8c0019] to-[#710014]",
    accentBorder: "hover:border-[#710014]",
    gradient: "radial-gradient(ellipse at top, rgba(113, 0, 20, 0.35), transparent 70%)",
  },
  {
    id: "fake-news-detector",
    title: "Fake News Detector",
    subtitle: "Real-Time NLP Misinformation Classifier",
    category: "NLP & Machine Learning",
    year: "2025",
    description:
      "A high-precision verification pipeline and machine learning detector designed to combat digital misinformation in real time. Evaluates linguistic sentiment, stylistic markers, and lexical credibility using TF-IDF and deep classification models (Scikit-learn, TensorFlow/PyTorch) to identify authentic versus fabricated claims.",
    role: "Machine Learning & NLP Developer",
    deliverables: [
      "TF-IDF & NLTK Linguistic Preprocessing Pipeline",
      "Multi-Class Fake vs. Real News Classification Engine",
      "Real-Time News Credibility Assessment Dashboard",
    ],
    techStack: ["Python", "Scikit-learn", "NLTK", "TensorFlow", "Pandas", "Streamlit/Flask"],
    metrics: [
      { label: "Classification Accuracy", value: "85% - 95%" },
      { label: "Inference Latency", value: "<80ms" },
      { label: "Analysis Pipeline", value: "NLP & Feature Scoring" },
    ],
    githubUrl: "https://github.com/amanmaurya18",
    accentColor: "from-[#8c0019] to-[#710014]",
    accentBorder: "hover:border-[#710014]",
    gradient: "radial-gradient(ellipse at top, rgba(113, 0, 20, 0.35), transparent 70%)",
  },
];
