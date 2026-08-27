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
    title: "MCA Orientation",
    subtitle: "2026",
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
    title: "Code Cubicle 2.0",
    subtitle: "Competitive Programming Contest",
    src: resolveImg("Unwanted/hack4.png"),
  },
  {
    id: "cf4",
    title: "Prastuti Ideathon",
    subtitle: "Organizers",
    src: resolveImg("prastuti/Screenshot 2026-08-09 211125.png"),
  },
  {
    id: "cf5",
    title: "Hack Vortex 2.0",
    subtitle: "1 Day Hackathon",
    src: resolveImg("vortex 2.0/hackvortex2.png"),
  },
  {
    id: "cf6",
    title: "Prastuti Ideathon",
    subtitle: "Winners",
    src: resolveImg("prastuti/Screenshot 2026-08-09 211406.png"),
  },
  {
    id: "cf7",
    title: "GrandPrix Outstation",
    subtitle: "Paytm Office Noida",
    src: resolveImg("GrandPrix/GrandPrix1.png"),
  },
];