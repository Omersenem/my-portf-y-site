export type Lang = "tr" | "en";

type Project = {
  name: string;
  description: string;
  tags: string[];
};

export type Translation = {
  nav: { about: string; skills: string; projects: string; contact: string };
  hero: {
    greeting: string;
    name: string;
    role: string;
    tagline: string;
    ctaProjects: string;
    ctaContact: string;
  };
  about: { title: string; body: string[] };
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
      skills: "Yetenekler",
      projects: "Projeler",
      contact: "İletişim",
    },
    hero: {
      greeting: "Merhaba, ben",
      name: "Ömer Şenem",
      role: "Yazılım Geliştirici",
      tagline:
        "Mobil ve web uygulamaları geliştiriyorum. Fikirleri temiz, hızlı ve kullanışlı ürünlere dönüştürmeyi seviyorum.",
      ctaProjects: "Projelerim",
      ctaContact: "İletişime Geç",
    },
    about: {
      title: "Hakkımda",
      body: [
        "React Native ve Next.js ile mobil ve web uygulamaları geliştiren bir yazılımcıyım. Go ile backend servisleri yazıyor, fikirleri uçtan uca çalışan ürünlere dönüştürüyorum.",
        "Sade arayüzler, hızlı performans ve bakımı kolay kod benim için önemli. Sürekli yeni teknolojiler öğrenmeyi ve gerçek problemlere pratik çözümler üretmeyi seviyorum.",
      ],
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
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      greeting: "Hi, I'm",
      name: "Ömer Şenem",
      role: "Software Developer",
      tagline:
        "I build mobile and web applications. I love turning ideas into clean, fast and useful products.",
      ctaProjects: "My Projects",
      ctaContact: "Get in Touch",
    },
    about: {
      title: "About Me",
      body: [
        "I'm a developer building mobile and web apps with React Native and Next.js. I write backend services in Go and turn ideas into products that work end to end.",
        "Clean interfaces, fast performance and maintainable code matter to me. I enjoy learning new technologies and crafting practical solutions to real problems.",
      ],
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
