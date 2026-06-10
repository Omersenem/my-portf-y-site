export type Lang = "tr" | "en";

type Project = {
  name: string;
  description: string;
  tags: string[];
};

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  tags: string[];
};

export type Translation = {
  nav: {
    about: string;
    experience: string;
    skills: string;
    projects: string;
    contact: string;
  };
  hero: {
    greeting: string;
    name: string;
    role: string;
    tagline: string;
    ctaProjects: string;
    ctaContact: string;
    ctaCv: string;
  };
  about: { title: string; body: string[] };
  experience: {
    title: string;
    subtitle: string;
    present: string;
    items: ExperienceItem[];
    educationTitle: string;
    education: { school: string; field: string; period: string };
    awardTitle: string;
    award: string;
  };
  skills: { title: string; subtitle: string };
  projects: {
    title: string;
    subtitle: string;
    visit: string;
    items: Project[];
  };
  contact: { title: string; subtitle: string; email: string; button: string };
  footer: { rights: string; builtWith: string };
};

export const translations: Record<Lang, Translation> = {
  tr: {
    nav: {
      about: "Hakkımda",
      experience: "Deneyim",
      skills: "Yetenekler",
      projects: "Projeler",
      contact: "İletişim",
    },
    hero: {
      greeting: "Merhaba, ben",
      name: "Ömer Senem",
      role: "Yazılım Geliştirici",
      tagline:
        "React, Next.js ve Vue ekosisteminde modern web ve mobil uygulamalar geliştiriyorum. Temiz, hızlı ve kullanışlı arayüzler kurmayı seviyorum.",
      ctaProjects: "Projelerim",
      ctaContact: "İletişime Geç",
      ctaCv: "CV İndir",
    },
    about: {
      title: "Hakkımda",
      body: [
        "Frontend ağırlıklı çalışan bir yazılım geliştiriciyim. Şu anda Amerika merkezli Veriforce'ta software developer olarak görev yapıyorum; React, Next.js, Vue ve React Native ile web ve mobil uygulamalar geliştiriyorum.",
        "Kullanıcı odaklı, estetik ve performanslı arayüzler kurmayı seviyorum. Sürekli yeni teknolojiler öğrenmek ve gerçek problemlere pratik çözümler üretmek benim için önemli.",
      ],
    },
    experience: {
      title: "Deneyim",
      subtitle: "Çalıştığım yerler",
      present: "Günümüz",
      items: [
        {
          company: "Veriforce",
          role: "Software Developer",
          period: "Ocak 2025 – Günümüz",
          location: "Amerika · Uzaktan",
          description:
            "Amerika merkezli Veriforce'ta yazılım geliştirici olarak web uygulamaları geliştiriyorum.",
          tags: ["React", "Next.js", "TypeScript"],
        },
        {
          company: "NETADIM Teknoloji",
          role: "Frontend Developer",
          period: "2023 – 2024",
          location: "Denizli",
          description:
            "ERP ve CRM yazılımlarını React ve Next.js ile geliştirdim. Bir İK projesinin Next.js V2 sürümünde çalıştım, mobil tarafını Flutter ile geliştirdim ve envanter kontrol yazılımını Vue.js ile kodladım.",
          tags: ["React", "Next.js", "Vue.js", "Flutter"],
        },
        {
          company: "Hay Teknoloji",
          role: "Frontend Developer",
          period: "2021 – 2023",
          location: "Isparta",
          description:
            "Aktif kullanılan bir siteyi Nuxt.js ile yeniden yazdım, admin panel düzeltmeleri yaptım ve iki projeyi geliştirip yayına aldım.",
          tags: ["Vue.js", "Nuxt.js", "React", "Tailwind CSS"],
        },
      ],
      educationTitle: "Eğitim",
      education: {
        school: "RTE Üniversitesi",
        field: "Elektrik-Elektronik Mühendisliği",
        period: "2020 – 2023",
      },
      awardTitle: "Başarı",
      award:
        "Teknofest Serbest Görev İHA Yarışması finalisti — Türkiye 6.'lığı (2020–2021)",
    },
    skills: {
      title: "Yetenekler",
      subtitle: "Çalıştığım başlıca teknolojiler",
    },
    projects: {
      title: "Projeler",
      subtitle: "Üzerinde çalıştığım bazı işler",
      visit: "İncele",
      items: [
        {
          name: "Helal Market",
          description:
            "Denizli bölgesine yönelik, kurye ve teslimat akışı olan helal ürün e-ticaret mobil uygulaması. React Native (Expo) ile geliştirildi.",
          tags: ["React Native", "Expo", "Go"],
        },
        {
          name: "Denizli Vitrin",
          description:
            "Yapay zeka ile sektöre özel vitrin siteleri üreten ve e-posta ile teslim eden platform. Go + SQLite backend, React şablonları.",
          tags: ["Go", "SQLite", "React", "AI"],
        },
        {
          name: "Kişisel Web Sitesi",
          description:
            "Şu an görüntülediğiniz site. Next.js ve Tailwind CSS ile geliştirildi, GitHub Actions ile otomatik yayınlanıyor.",
          tags: ["Next.js", "Tailwind", "TypeScript"],
        },
      ],
    },
    contact: {
      title: "İletişim",
      subtitle:
        "Bir projeniz mi var ya da sadece merhaba mı demek istiyorsunuz? Bana ulaşın.",
      email: "E-posta",
      button: "E-posta Gönder",
    },
    footer: {
      rights: "Tüm hakları saklıdır.",
      builtWith: "Next.js ile geliştirildi",
    },
  },
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      greeting: "Hi, I'm",
      name: "Ömer Senem",
      role: "Software Developer",
      tagline:
        "I build modern web and mobile applications with React, Next.js and the Vue ecosystem. I love crafting clean, fast and useful interfaces.",
      ctaProjects: "My Projects",
      ctaContact: "Get in Touch",
      ctaCv: "Download CV",
    },
    about: {
      title: "About Me",
      body: [
        "I'm a frontend-focused software developer. I currently work as a software developer at Veriforce (USA), building web and mobile apps with React, Next.js, Vue and React Native.",
        "I love building user-focused, polished and performant interfaces. Continuously learning new technologies and solving real problems in a practical way matters to me.",
      ],
    },
    experience: {
      title: "Experience",
      subtitle: "Where I've worked",
      present: "Present",
      items: [
        {
          company: "Veriforce",
          role: "Software Developer",
          period: "Jan 2025 – Present",
          location: "USA · Remote",
          description:
            "Working as a software developer at the US-based company Veriforce, building web applications.",
          tags: ["React", "Next.js", "TypeScript"],
        },
        {
          company: "NETADIM Teknoloji",
          role: "Frontend Developer",
          period: "2023 – 2024",
          location: "Denizli, Turkey",
          description:
            "Built ERP and CRM software with React and Next.js. Worked on the Next.js V2 of an HR project, developed its mobile side with Flutter, and coded an inventory management tool with Vue.js.",
          tags: ["React", "Next.js", "Vue.js", "Flutter"],
        },
        {
          company: "Hay Teknoloji",
          role: "Frontend Developer",
          period: "2021 – 2023",
          location: "Isparta, Turkey",
          description:
            "Rewrote an actively used site with Nuxt.js, fixed admin panel issues, and built and deployed two projects.",
          tags: ["Vue.js", "Nuxt.js", "React", "Tailwind CSS"],
        },
      ],
      educationTitle: "Education",
      education: {
        school: "RTE University",
        field: "Electrical & Electronics Engineering",
        period: "2020 – 2023",
      },
      awardTitle: "Achievement",
      award:
        "Teknofest UAV Competition finalist — 6th place in Turkey (2020–2021)",
    },
    skills: {
      title: "Skills",
      subtitle: "The main technologies I work with",
    },
    projects: {
      title: "Projects",
      subtitle: "Some of the things I've worked on",
      visit: "View",
      items: [
        {
          name: "Helal Market",
          description:
            "A halal-product e-commerce mobile app for the Denizli region with a courier and delivery flow. Built with React Native (Expo).",
          tags: ["React Native", "Expo", "Go"],
        },
        {
          name: "Denizli Vitrin",
          description:
            "A platform that generates industry-specific showcase websites with AI and delivers them by email. Go + SQLite backend, React templates.",
          tags: ["Go", "SQLite", "React", "AI"],
        },
        {
          name: "Personal Website",
          description:
            "The site you're viewing now. Built with Next.js and Tailwind CSS, deployed automatically via GitHub Actions.",
          tags: ["Next.js", "Tailwind", "TypeScript"],
        },
      ],
    },
    contact: {
      title: "Contact",
      subtitle:
        "Got a project in mind or just want to say hi? Feel free to reach out.",
      email: "Email",
      button: "Send an Email",
    },
    footer: {
      rights: "All rights reserved.",
      builtWith: "Built with Next.js",
    },
  },
};
