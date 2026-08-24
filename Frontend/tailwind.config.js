/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#05090a",
        surface: "#0a1210",
        surface2: "#0d1a17",
        teal: {
          DEFAULT: "#14c9b7",
          soft: "#2fe0cd",
          deep: "#0a8f82",
        },
        amber: {
          DEFAULT: "#ff7a29",
          soft: "#ffa15c",
        },
        mist: "#9fb8b3",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(circle at 20% 20%, rgba(20,201,183,0.18), transparent 40%), radial-gradient(circle at 85% 15%, rgba(255,122,41,0.14), transparent 35%), radial-gradient(circle at 50% 90%, rgba(20,201,183,0.10), transparent 45%)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.55)",
        glow: "0 0 40px rgba(20,201,183,0.25)",
      },
    },
  },
  plugins: [],
};
