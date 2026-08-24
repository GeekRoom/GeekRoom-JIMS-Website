// Import choice event & highlight photos using Vite glob
const allImages = import.meta.glob(
  "../assets/Events/**/*.{png,jpg,jpeg,webp,avif}",
  {
    eager: true,
    import: "default",
  }
);

// Helper function to resolve relative image path safely
const resolveImg = (relativePath) => {
  for (const path in allImages) {
    if (path.includes(relativePath)) {
      return allImages[path];
    }
  }
  return Object.values(allImages)[0] || "";
};

export const coverflowPhotos = [
  {
    id: "cf1",
    title: "Gear Up",
    subtitle: "Hands-on Technical Demonstration",
    src: resolveImg("prastuti/Screenshot 2026-08-09 211505.png"),
  },
  {
    id: "cf2",
    title: "Git & GitHub Masterclass",
    subtitle: "Version Control Workshop",
    src: resolveImg("prastuti/Screenshot 2026-08-09 211533.png"),
  },
  {
    id: "cf3",
    title: "Tensorflow Workshop",
    subtitle: "Machine Learning Foundations",
    src: resolveImg("prastuti/Screenshot 2026-08-09 211523.png"),
  },
  {
    id: "cf4",
    title: "Code Clash",
    subtitle: "Competitive Programming Contest",
    src: resolveImg("Unwanted/hack4.png"),
  },
  {
    id: "cf5",
    title: "SIH Grand Finale",
    subtitle: "Ministry of Education 1st Winner",
    src: resolveImg("prastuti/Screenshot 2026-08-09 211125.png"),
  },
  {
    id: "cf6",
    title: "Hack Vortex 2.0",
    subtitle: "24-Hour Non-stop Hackathon",
    src: resolveImg("vortex 2.0/hackvortex2.png"),
  },
  {
    id: "cf7",
    title: "Prastuti Ideathon",
    subtitle: "National Startup Pitch",
    src: resolveImg("prastuti/IMG_20260314_123226945.jpg"),
  },
  {
    id: "cf8",
    title: "CodeKshetra 2025",
    subtitle: "NSUT Hackathon Finale",
    src: resolveImg("prastuti/Screenshot 2026-08-09 211406.png"),
  },
  {
    id: "cf9",
    title: "CodeCubicle Hackathon",
    subtitle: "Zero-Trust Security Track Winner",
    src: resolveImg("CodeCubicle/CodeCubicle.png"),
  },
  {
    id: "cf10",
    title: "GrandPrix Outstation",
    subtitle: "IIT Roorkee Contingent Showcase",
    src: resolveImg("GrandPrix/GrandPrix1.png"),
  },
];
