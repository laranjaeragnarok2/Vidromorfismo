
"use client";

import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ProjectDetailsCard } from '@/components/project-details-card';
import { NavigationLinks } from '@/components/navigation-links';
import { FeatureCard } from '@/components/feature-card';
import { Github, Instagram, Settings2, HomeIcon, ListChecks, Info, Layers, Frame, Filter, BoxSelect, Box, ArrowDownUp, Droplet, Contrast } from 'lucide-react';

export default function HomePage() {
  const [featureCardOpacitySlider, setFeatureCardOpacitySlider] = useState(56); // 0-100, maps to 0.1-1.0
  const [cardBlurSlider, setCardBlurSlider] = useState(50); // 0-100, maps to 0-24px
  const [featureCardBorderWidthSlider, setFeatureCardBorderWidthSlider] = useState(13); // 0-100, maps to 0-8px
  const [chromaticAberrationLevel, setChromaticAberrationLevel] = useState(0); // 0-100
  const [bevelIntensity, setBevelIntensity] = useState(0); // 0-100
  const [shadowOffsetYSlider, setShadowOffsetYSlider] = useState(40); // 0-100, maps to 0-25px
  const [shadowBlurSlider, setShadowBlurSlider] = useState(38); // 0-100, maps to 0-40px
  const [shadowOpacitySlider, setShadowOpacitySlider] = useState(40); // 0-100, maps to 0-0.5 alpha

  // Derived values for actual use
  const actualFeatureCardOpacity = 0.1 + (featureCardOpacitySlider / 100) * 0.9;
  const actualCardBlur = cardBlurSlider / 100 * 24;
  const actualFeatureCardBorderWidth = featureCardBorderWidthSlider / 100 * 8;
  const actualShadowOffsetY = shadowOffsetYSlider / 100 * 25;
  const actualShadowBlur = shadowBlurSlider / 100 * 40;
  const actualShadowAlpha = shadowOpacitySlider / 100 * 0.5;

  const handleSettingChange = (id: string, value: number) => {
    if (typeof window === "undefined") return;

    if (id === 'borderWidthControl') {
      setFeatureCardBorderWidthSlider(value);
    } else if (id === 'featureCardOpacityControl') {
      setFeatureCardOpacitySlider(value);
    } else if (id === 'cardBlurControl') {
      setCardBlurSlider(value);
    } else if (id === 'chromaticAberrationControl') {
      setChromaticAberrationLevel(value);
    } else if (id === 'bevelControl') {
      setBevelIntensity(value);
    } else if (id === 'shadowOffsetYControl') {
      setShadowOffsetYSlider(value);
    } else if (id === 'shadowBlurControl') {
      setShadowBlurSlider(value);
    } else if (id === 'shadowOpacityControl') {
      setShadowOpacitySlider(value);
    }
  };

  const projectDetails = {
    title: "Liquid Glass React",
    description: "Uma breve demonstração das capacidades da interface do usuário e personalização, construída com Next.js e ShadCN UI.",
    author: "@horyu.multimedia",
    links: [
      { name: "GitHub", url: "https://github.com/laranjaeragnarok2", icon: <Github className="w-4 h-4" /> },
      { name: "Instagram", url: "https://www.instagram.com/horyu.multimedia/", icon: <Instagram className="w-4 h-4" /> },
    ],
  };

  const navLinks = [
    { name: "Início", href: "#", icon: <HomeIcon /> },
    { name: "Recursos", href: "#features", icon: <ListChecks /> },
    { name: "Sobre", href: "#project-details", icon: <Info /> },
  ];

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
      defaultValue: featureCardBorderWidthSlider,
    },
    {
      id: "featureCardOpacityControl",
      title: "Opacidade Fundo Cards Interativos",
      description: "Controle a opacidade do fundo dos cards interativos.",
      icon: <Layers />,
      sliderLabel: "Opacidade",
      defaultValue: featureCardOpacitySlider,
    },
    {
      id: "cardBlurControl",
      title: "Desfoque dos Cards Interativos",
      description: "Ajuste o nível de desfoque dos cards interativos.",
      icon: <Settings2 />,
      sliderLabel: "Nível de Desfoque",
      defaultValue: cardBlurSlider,
    },
    {
      id: "shadowOffsetYControl",
      title: "Distância da Sombra (Vertical)",
      description: "Ajuste o deslocamento vertical da sombra projetada.",
      icon: <ArrowDownUp />,
      sliderLabel: "Offset Y",
      defaultValue: shadowOffsetYSlider,
    },
    {
      id: "shadowBlurControl",
      title: "Desfoque da Sombra",
      description: "Ajuste o raio de desfoque da sombra projetada.",
      icon: <Droplet />,
      sliderLabel: "Blur",
      defaultValue: shadowBlurSlider,
    },
    {
      id: "shadowOpacityControl",
      title: "Opacidade da Sombra",
      description: "Ajuste a opacidade da sombra projetada.",
      icon: <Contrast />,
      sliderLabel: "Opacidade",
      defaultValue: shadowOpacitySlider,
    },
    {
      id: "chromaticAberrationControl",
      title: "Aberração Cromática",
      description: "Ajuste a intensidade da aberração cromática (efeito visual não implementado).",
      icon: <Filter />,
      sliderLabel: "Intensidade",
      defaultValue: chromaticAberrationLevel,
    },
    {
      id: "bevelControl",
      title: "Efeito Chanfro (Bevel)",
      description: "Ajuste a intensidade do efeito de chanfro (efeito visual não implementado).",
      icon: <Box />,
      sliderLabel: "Intensidade do Chanfro",
      defaultValue: bevelIntensity,
    },
  ];

  const dynamicBoxShadow = `0px ${actualShadowOffsetY.toFixed(1)}px ${actualShadowBlur.toFixed(1)}px 0px rgba(0, 0, 0, ${actualShadowAlpha.toFixed(2)})`;

  const sharedCardStyleBase: Omit<React.CSSProperties, 'backdropFilter' | 'WebkitBackdropFilter' | 'borderWidth' | 'boxShadow'> = {
    backgroundColor: `hsla(0, 0%, 100%, ${actualFeatureCardOpacity})`,
    borderStyle: 'solid',
    borderColor: 'hsla(0, 0%, 100%, 0.2)',
  };

  const sharedCardStyle: React.CSSProperties = {
    ...sharedCardStyleBase,
    backdropFilter: `blur(${actualCardBlur}px)`,
    WebkitBackdropFilter: `blur(${actualCardBlur}px)`,
    borderWidth: `${actualFeatureCardBorderWidth}px`,
    boxShadow: dynamicBoxShadow,
  };

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
          <section
            id="navigation"
            aria-labelledby="navigation-heading"
            className={`py-10 md:py-12 rounded-xl scroll-mt-20`}
            style={sharedCardStyle}
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
                  currentBlur={actualCardBlur}
                  backgroundOpacity={actualFeatureCardOpacity}
                  borderWidth={actualFeatureCardBorderWidth}
                  shadowOffsetY={actualShadowOffsetY}
                  shadowBlur={actualShadowBlur}
                  shadowOpacity={actualShadowAlpha}
                />
              ))}
            </div>
          </section>
          
          <section id="project-details" aria-labelledby="project-details-heading" className="scroll-mt-20">
            <h2 id="project-details-heading" className="text-3xl md:text-4xl font-headline font-semibold mb-8 text-center text-foreground drop-shadow-md">
              Detalhes do Projeto
            </h2>
            <ProjectDetailsCard
              {...projectDetails}
              backgroundOpacity={actualFeatureCardOpacity}
              currentBlur={actualCardBlur}
              borderWidth={actualFeatureCardBorderWidth}
              shadowOffsetY={actualShadowOffsetY}
              shadowBlur={actualShadowBlur}
              shadowOpacity={actualShadowAlpha}
            />
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
