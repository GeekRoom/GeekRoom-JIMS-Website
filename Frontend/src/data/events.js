const allEventImages = import.meta.glob(
  "../assets/Events/*/*.{png,jpg,jpeg,webp,avif}",
  {
    eager: true,
    import: "default",
  }
);

const getGallery = (folderName, coverFileName) => {
  return Object.entries(allEventImages)
    .filter(([path]) => {
      const fileName = path.split("/").pop();

      return (
        path.includes(`/Events/${folderName}/`) &&
        fileName !== coverFileName
      );
    })
    .map(([, image]) => image);
};

export const events = [
  {
    id: "vortex2.0",
    code: "EVT.",
    name: "Vortex 2.0 Tech Fest",
    tagline: "Day 1 Hack Vortex 🚀💻",
    icon: "code",
    accent: "amber",
    category: "hackathon",
    status: "past",

    details: `
Get ready to innovate, build, and disrupt! 🚀

On Day 1 of Hack Vortex, participants will dive into an intense hackathon where they’ll work on real-world problem statements. Teams will brainstorm ideas, design solutions, and develop functional prototypes within the given time.

This is your chance to showcase creativity, technical skills, and problem-solving abilities. 🧠 The most impactful and innovative solution will be awarded with an exciting winning prize! 🏆
`,

    meta: [
      { label: "Date", value: "13 April 2026" },
      { label: "Venue", value: "JIMS Rohini, sec - 5" },
      { label: "Format", value: "Online + Offline" },
    ],

    coverImage: "/src/assets/Events/vortex 2.0/hackvortex2.png",
    gallery: getGallery("vortex 2.0", "hackvortex2.png"),
  },

  {
    id: "vortex 2.0",
    code: "EVT.03",
    name: "Vortex 2.0 Tech Fest",
    tagline: "Day 2 The Silent Query 🔇🧩",
    icon: "code",
    accent: "amber",
    category: "competition",
    status: "past",

    details: `
Step into a mysterious challenge where silence speaks louder than words! 🔇

Silent Query is an intriguing round where participants will tackle tricky queries and decode hidden clues to break the quiz. Test your logic, observation, and analytical skills as you navigate through this unique and mind-bending experience.

Only the sharpest minds will crack the challenge and emerge victorious! 🏆
`,

    meta: [
      { label: "Date", value: "14 April 2026" },
      { label: "Venue", value: "JIMS Rohini, Sector 5" },
      { label: "Mode", value: "Offline" },
    ],

    coverImage: "/src/assets/Events/silent/silent.png",
    gallery: getGallery("silent", "silent.png"),
    link: "#",
  },

  {
    id: "prastuti",
    code: "EVT.05",
    name: "Prastuti Ideathon",
    tagline: "Pitch Your Startup Idea 💡🚀",
    icon: "lightbulb",
    accent: "yellow",
    category: "ideathon",
    status: "past",

    details: `
Presenting to you - PRASTUTI IDEATHON 2026 🔰

From climate awareness to climate action; this is your stage to innovate, inspire, and lead. 💡 Present innovative ideas that solve real-world problems.

Receive valuable feedback from industry experts and entrepreneurs. 🚀
`,

    meta: [
      { label: "Date", value: "14 March 2026" },
      { label: "Venue", value: "JIMS Rohini, Sector-5" },
      { label: "Team", value: "1–3 Members" },
    ],

    coverImage: "/src/assets/Events/prastuti/prastuti.png",
    gallery: getGallery("prastuti", "prastuti.png"),
    link: "#",
  },

  {
    id: "recruitment",
    code: "EVT.08",
    name: "Geek Room Recruitment Drive",
    tagline: "Become a Core Member 🫵💙",
    icon: "briefcase",
    accent: "blue",
    category: "recruitment",
    status: "past",

    details: `
THE WAIT IS FINALLY OVER!! 😳

After all the anticipation (and those nervous DMs 👀), we’re finally dropping the results of Geek Room-JIMS Interviews! 🎉

Big cheers to everyone who made it through 👏 You’re officially part of the Geek Room now 💯
`,

    meta: [
      { label: "Date", value: "16 September 2025" },
      { label: "Venue", value: "Seminar Hall" },
      { label: "Total", value: "45" },
    ],

    coverImage: "/src/assets/Events/recruitment/recruitment25.png",
    gallery: getGallery("recruitment", "recruitment25.png"),
    link: "#",
  },

  {
    id: "orientation",
    code: "EVT.07",
    name: "Geek Room Orientation",
    tagline: "Meet the Community 🤝💻",
    icon: "users",
    accent: "purple",
    category: "orientation",
    status: "past",

    details: `
Step Into College. Step Into Tech. 🎓

The BCA Orientation by Geek Room JIMS is designed to give freshers the perfect start to their college journey. From understanding the BCA course and exploring different tech domains to discovering opportunities beyond the classroom, the orientation helps students begin their journey with clarity and confidence. 🚀
`,

    meta: [
      { label: "Date", value: "18 August 2025" },
      { label: "Venue", value: "Auditorium" },
      { label: "Audience", value: "First Year Students" },
    ],

    coverImage: "/src/assets/Events/orientation/orientation.png",
    gallery: getGallery("orientation", "orientation.png"),
    link: "#",
  },

  {
    id: "Code-Kshetra 2.0",
    code: "EVT.11",
    name: "Code-Kshetra 2.0",
    tagline: "Delhi's One of the Largest Hackathon 🚀🏆",
    icon: "terminal",
    accent: "emerald",
    category: "hackathon",
    status: "past",

    details: `
Delhi's largest tech community brings you the 2nd edition of the most-awaited hackathon: Code Kshetra 2.0 🔥

Happening at JIMS Rohini, Sector-5 on 21st and 22nd February 2025.

Get ready geeks, for an amazing and grand hackathon filled with incredible mentors, judges, fun, and food! 🚀
`,

    meta: [
      { label: "Date", value: "21 February 2025" },
      { label: "Venue", value: "JIMS Auditorium" },
      { label: "Team", value: "2-4 Members" },
    ],

    coverImage: "/src/assets/Events/codekshetra/codekshetra1.png",
    gallery: getGallery("codekshetra", "codekshetra1.png"),
    link: "#",
  },

  {
    id: "Hack Vortex",
    code: "EVT.13",
    name: "Hack Vortex",
    tagline: "Hybrid Hackathon 💻🌐🚀",
    icon: "code",
    accent: "emerald",
    category: "hackathon",
    status: "past",

    details: `
🌟 Introducing Hack Vortex: Step into the world of Innovation!

Why participate? 🤔

• Collaborate with diverse teams
• Enhance problem-solving and project management skills
• Compete for prizes and recognition
• Network with industry leaders
• Free Food & Accommodation
• Prize pool worth INR ₹5,00,000+
`,

    meta: [
      { label: "Date", value: "25 September 2024" },
      { label: "Venue", value: "JIMS Rohini" },
      { label: "Participants", value: "180+" },
    ],

    coverImage: "/src/assets/Events/vortex/vortex1.png",
    gallery: getGallery("vortex", "vortex1.png"),
    link: "#",
  },

  {
    id: "Code Cubicle 2.0",
    code: "EVT.14",
    name: "Code Cubicle 2.0",
    tagline: "It's Not Just a Hackathon, It's a Quality Experience ✨💻",
    icon: "brain",
    accent: "emerald",
    category: "seminar",
    status: "past",

    details: `
Guess who's back?
Back again.
Code Cubicle's back 🛐
Tell a friend 🥳

Buoyed by the success and high praise of Code Cubicle 1.0, Geek Room is proud to present the 2nd edition of its mega hackathon titled “Code Cubicle 2.0”.

Get ready for another exciting coding experience! 💻
`,

    meta: [
      { label: "Date", value: "22 July 2024" },
      {
        label: "Venue",
        value: `Microsoft office
Gurugram`,
      },
      { label: "Prize Pool", value: "30,00,000" },
    ],

    coverImage: "/src/assets/Events/CodeCubicle/codecubicle.png",
    gallery: getGallery("CodeCubicle", "codecubicle.png"),
    link: "#",
  },
];