
"use client";

import React, { useState, useEffect } from 'react';
import { ProjectDetailsCard } from '@/components/project-details-card';
import { NavigationLinks } from '@/components/navigation-links';
import { FeatureCard } from '@/components/feature-card';
import { Github, Link as LinkIcon, Palette, Sun, Settings2, HomeIcon, ListChecks, Info, Droplets } from 'lucide-react';

export default function HomePage() {
  const [primaryLightness, setPrimaryLightness] = useState(63);
  const [pageOpacity, setPageOpacity] = useState(1);
  const [cardBlur, setCardBlur] = useState(12); // Default blur (equivalent to backdrop-blur-lg)
  const [accentLightness, setAccentLightness] = useState(82);

  useEffect(() => {
    // Initialize CSS variables from their default values in globals.css
    // or ensure they are set if JS is manipulating them.
    if (typeof window !== "undefined") {
      const rootStyle = getComputedStyle(document.documentElement);
      
      const initialPrimaryLStr = rootStyle.getPropertyValue('--primary-l').trim().replace('%', '');
      const initialPrimaryL = initialPrimaryLStr ? parseFloat(initialPrimaryLStr) : 63;
      setPrimaryLightness(initialPrimaryL);
      document.documentElement.style.setProperty('--primary-l', `${initialPrimaryL}%`);

      const initialAccentLStr = rootStyle.getPropertyValue('--accent-l').trim().replace('%', '');
      const initialAccentL = initialAccentLStr ? parseFloat(initialAccentLStr) : 82;
      setAccentLightness(initialAccentL);
      document.documentElement.style.setProperty('--accent-l', `${initialAccentL}%`);
    }
  }, []);

  const handleSettingChange = (id: string, value: number) => {
    if (typeof window === "undefined") return;

    if (id === 'primaryLightnessControl') {
      const newLightness = 20 + (value / 100) * 60; // Map 0-100 to 20%-80%
      document.documentElement.style.setProperty('--primary-l', `${newLightness}%`);
      setPrimaryLightness(newLightness);
    } else if (id === 'pageOpacityControl') {
      const newOpacity = 0.3 + (value / 100) * 0.7; // Map 0-100 to 0.3-1.0
      setPageOpacity(newOpacity);
    } else if (id === 'cardBlurControl') {
      const newBlur = (value / 100) * 24; // Map 0-100 to 0px-24px
      setCardBlur(newBlur);
    } else if (id === 'accentLightnessControl') {
      const newLightness = 40 + (value / 100) * 50; // Map 0-100 to 40%-90%
      document.documentElement.style.setProperty('--accent-l', `${newLightness}%`);
      setAccentLightness(newLightness);
    }
  };

  const projectDetails = {
    title: "Projeto Exemplo XYZ",
    description: "Uma breve demonstração das capacidades da interface do usuário e personalização, construída com Next.js e ShadCN UI.",
    author: "Equipe de Desenvolvimento Next",
    links: [
      { name: "GitHub", url: "https://github.com", icon: <Github className="w-4 h-4" /> },
      { name: "Demo ao Vivo", url: "#", icon: <LinkIcon className="w-4 h-4" /> },
    ],
  };

  const navLinks = [
    { name: "Início", href: "#", icon: <HomeIcon /> },
    { name: "Recursos", href: "#features", icon: <ListChecks /> },
    { name: "Sobre", href: "#project-details", icon: <Info /> },
  ];

  // Calculate default slider values (0-100) based on initial state
  const initialPrimaryLightnessSlider = Math.round(((primaryLightness - 20) / 60) * 100);
  const initialPageOpacitySlider = Math.round(((pageOpacity - 0.3) / 0.7) * 100);
  const initialCardBlurSlider = Math.round((cardBlur / 24) * 100);
  const initialAccentLightnessSlider = Math.round(((accentLightness - 40) / 50) * 100);


  const featureCardsConfig = [
    {
      id: "primaryLightnessControl",
      title: "Luminosidade Primária",
      description: "Ajuste a luminosidade da cor primária.",
      icon: <Palette />,
      sliderLabel: "Luminosidade",
      defaultValue: initialPrimaryLightnessSlider,
    },
    {
      id: "pageOpacityControl",
      title: "Opacidade da Página",
      description: "Controle a opacidade do fundo da página.",
      icon: <Sun />,
      sliderLabel: "Opacidade",
      defaultValue: initialPageOpacitySlider,
    },
    {
      id: "cardBlurControl",
      title: "Desfoque dos Cards",
      description: "Ajuste o nível de desfoque dos cards.",
      icon: <Settings2 />,
      sliderLabel: "Nível de Desfoque",
      defaultValue: initialCardBlurSlider,
    },
    {
      id: "accentLightnessControl",
      title: "Luminosidade do Destaque",
      description: "Ajuste a luminosidade da cor de destaque.",
      icon: <Droplets />,
      sliderLabel: "Luminosidade",
      defaultValue: initialAccentLightnessSlider,
    },
  ];

  return (
    <div
      className="min-h-screen text-foreground bg-cover bg-center transition-opacity duration-500"
      style={{ 
        backgroundImage: "url('https://w.wallhaven.cc/full/5y/wallhaven-5yd6d5.png')",
        opacity: pageOpacity 
      }}
      data-ai-hint="colorful abstract"
    >
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="mb-12 md:mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-primary drop-shadow-lg">
            Demonstração Simplificada
          </h1>
          <p className="text-muted-foreground mt-3 text-lg md:text-xl max-w-2xl mx-auto bg-background/50 backdrop-blur-sm p-2 rounded-md drop-shadow-sm">
            Explore os recursos e a personalização da interface do usuário de forma clara e acessível.
          </p>
        </header>

        <main className="space-y-12 md:space-y-16">
          <section id="project-details" aria-labelledby="project-details-heading" className="scroll-mt-20">
            <h2 id="project-details-heading" className="text-3xl md:text-4xl font-headline font-semibold mb-8 text-center text-foreground drop-shadow-md">
              Detalhes do Projeto
            </h2>
            <ProjectDetailsCard {...projectDetails} />
          </section>

          <section id="navigation" aria-labelledby="navigation-heading" className="py-10 md:py-12 bg-card/70 backdrop-blur-md shadow-lg rounded-xl scroll-mt-20 border border-white/20">
            <h2 id="navigation-heading" className="text-3xl md:text-4xl font-headline font-semibold mb-10 text-center text-foreground drop-shadow-md">
              Navegação Rápida
            </h2>
            <NavigationLinks links={navLinks} />
          </section>

          <section id="features" aria-labelledby="features-heading" className="scroll-mt-20">
            <h2 id="features-heading" className="text-3xl md:text-4xl font-headline font-semibold mb-10 text-center text-foreground drop-shadow-md">
              Funcionalidades Interativas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 md:gap-8">
              {featureCardsConfig.map((card) => (
                <FeatureCard
                  key={card.id}
                  id={card.id}
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                  sliderLabel={card.sliderLabel}
                  defaultValue={card.defaultValue}
                  onSettingChange={handleSettingChange}
                  currentBlur={card.id === 'cardBlurControl' ? cardBlur : undefined} // Pass blur only to the relevant card
                />
              ))}
            </div>
          </section>
        </main>

        <footer className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-white/20 text-center">
          <p className="text-sm text-muted-foreground bg-background/50 backdrop-blur-sm p-1 rounded-md inline-block drop-shadow-sm">
            &copy; {new Date().getFullYear()} Demonstração Simplificada. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground/80 mt-2 bg-background/50 backdrop-blur-sm p-1 rounded-md inline-block drop-shadow-sm">
            Construído com Next.js, Tailwind CSS, e ShadCN UI.
          </p>
        </footer>
      </div>
    </div>
  );
}
