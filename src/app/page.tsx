
"use client";

import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ProjectDetailsCard } from '@/components/project-details-card';
import { NavigationLinks } from '@/components/navigation-links';
import { FeatureCard } from '@/components/feature-card';
import { Github, Link as LinkIcon, Sun, Settings2, HomeIcon, ListChecks, Info, Layers, Frame, Filter } from 'lucide-react';

export default function HomePage() {
  const [featureCardOpacity, setFeatureCardOpacity] = useState(0.6);
  const [cardBlur, setCardBlur] = useState(12);
  const [featureCardBorderWidth, setFeatureCardBorderWidth] = useState(1); // Default 1px
  const [chromaticAberrationLevel, setChromaticAberrationLevel] = useState(0); // Novo estado

  useEffect(() => {
    // Efeito para inicializar valores pode ser mantido se necessário para outros controles
    // A lógica de --accent-l foi removida
  }, []);

  const handleSettingChange = (id: string, value: number) => {
    if (typeof window === "undefined") return;

    if (id === 'borderWidthControl') {
      const newBorderWidth = (value / 100) * 8; // Maps 0-100 to 0px-8px
      setFeatureCardBorderWidth(newBorderWidth);
    } else if (id === 'featureCardOpacityControl') {
      const newOpacity = 0.1 + (value / 100) * 0.9; // Map 0-100 to 0.1-1.0
      setFeatureCardOpacity(newOpacity);
    } else if (id === 'cardBlurControl') {
      const newBlur = (value / 100) * 24;
      setCardBlur(newBlur);
    } else if (id === 'chromaticAberrationControl') { // Novo controle
      setChromaticAberrationLevel(value);
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

  const initialBorderWidthSlider = Math.round((featureCardBorderWidth / 8) * 100);
  const initialFeatureCardOpacitySlider = Math.round(((featureCardOpacity - 0.1) / 0.9) * 100);
  const initialCardBlurSlider = Math.round((cardBlur / 24) * 100);
  const initialChromaticAberrationSlider = chromaticAberrationLevel; // Direto 0-100

  const featureCardsConfig: Array<{
    id: string;
    title: string;
    description: string;
    icon: ReactNode;
    sliderLabel: string;
    defaultValue: number;
  }> = [
    {
      id: "borderWidthControl",
      title: "Tamanho da Borda dos Cards",
      description: "Ajuste a espessura da borda dos cards interativos.",
      icon: <Frame />,
      sliderLabel: "Espessura da Borda",
      defaultValue: initialBorderWidthSlider,
    },
    {
      id: "featureCardOpacityControl",
      title: "Opacidade Fundo Cards Interativos",
      description: "Controle a opacidade do fundo dos cards interativos.",
      icon: <Layers />,
      sliderLabel: "Opacidade",
      defaultValue: initialFeatureCardOpacitySlider,
    },
    {
      id: "cardBlurControl",
      title: "Desfoque dos Cards Interativos",
      description: "Ajuste o nível de desfoque dos cards interativos.",
      icon: <Settings2 />,
      sliderLabel: "Nível de Desfoque",
      defaultValue: initialCardBlurSlider,
    },
    {
      id: "chromaticAberrationControl", // Alterado
      title: "Aberração Cromática", // Alterado
      description: "Ajuste a intensidade da aberração cromática (efeito visual não implementado).", // Alterado
      icon: <Filter />, // Alterado
      sliderLabel: "Intensidade", // Alterado
      defaultValue: initialChromaticAberrationSlider, // Alterado
    },
  ];

  return (
    <div
      className="min-h-screen text-foreground bg-cover bg-center transition-opacity duration-500"
      style={{ 
        backgroundImage: "url('https://w.wallhaven.cc/full/5y/wallhaven-5yd6d5.png')",
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

          <section 
            id="navigation" 
            aria-labelledby="navigation-heading" 
            className="py-10 md:py-12 bg-card/70 backdrop-blur-md shadow-lg rounded-xl scroll-mt-20 border border-white/20"
          >
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
                  currentBlur={card.id === 'cardBlurControl' ? cardBlur : undefined}
                  backgroundOpacity={featureCardOpacity}
                  borderWidth={featureCardBorderWidth}
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
