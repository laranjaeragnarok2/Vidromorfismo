
"use client";

import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ProjectDetailsCard } from '@/components/project-details-card';
import { NavigationLinks } from '@/components/navigation-links';
import { FeatureCard } from '@/components/feature-card';
import { Github, Instagram, Settings2, HomeIcon, ListChecks, Info, Layers, Shapes, Baseline, Droplet, Contrast } from 'lucide-react';
import { SplineViewer } from '@/components/spline-viewer';

export default function HomePage() {
  const [featureCardOpacitySlider, setFeatureCardOpacitySlider] = useState(56);
  const [cardBlurSlider, setCardBlurSlider] = useState(50);
  const [cardBorderRadiusSlider, setCardBorderRadiusSlider] = useState(37.5);
  const [innerBottomShadowBlurSlider, setInnerBottomShadowBlurSlider] = useState(30);
  const [shadowBlurSlider, setShadowBlurSlider] = useState(38);
  const [shadowOpacitySlider, setShadowOpacitySlider] = useState(40);

  // Derived values for actual use
  const actualFeatureCardOpacity = 0.1 + (featureCardOpacitySlider / 100) * 0.9;
  const actualCardBlur = cardBlurSlider / 100 * 24;
  const actualCardBorderRadius = (cardBorderRadiusSlider / 100) * 2;

  const actualInnerBottomShadowBlur = (innerBottomShadowBlurSlider / 100) * 25; 

  const actualShadowBlur = shadowBlurSlider / 100 * 40;
  const actualShadowAlpha = shadowOpacitySlider / 100 * 0.3;
  const fixedOuterShadowOffsetY = 4;

  const splineSceneUrl = "https://prod.spline.design/jMrByPm07zeU6Tku/scene.splinecode";


  const handleSettingChange = (id: string, value: number) => {
    if (typeof window === "undefined") return;

    if (id === 'cardBorderRadiusControl') {
      setCardBorderRadiusSlider(value);
    } else if (id === 'featureCardOpacityControl') {
      setFeatureCardOpacitySlider(value);
    } else if (id === 'cardBlurControl') {
      setCardBlurSlider(value);
    } else if (id === 'innerBottomShadowBlurControl') {
      setInnerBottomShadowBlurSlider(value);
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
      id: "cardBorderRadiusControl",
      title: "Raio da Borda dos Cards",
      description: "Ajuste o quão arredondadas são as bordas dos cards.",
      icon: <Shapes />,
      sliderLabel: "Raio da Borda",
      defaultValue: cardBorderRadiusSlider,
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
      id: "innerBottomShadowBlurControl",
      title: "Profundidade Interna (Desfoque)",
      description: "Ajuste o desfoque da sombra interna inferior para profundidade.",
      icon: <Baseline />,
      sliderLabel: "Profund. Desfoque",
      defaultValue: innerBottomShadowBlurSlider,
    },
    {
      id: "shadowBlurControl",
      title: "Desfoque da Sombra Externa",
      description: "Ajuste o raio de desfoque da sombra projetada externa.",
      icon: <Droplet />,
      sliderLabel: "Desfoque Externo",
      defaultValue: shadowBlurSlider,
    },
    {
      id: "shadowOpacityControl",
      title: "Opacidade da Sombra Externa",
      description: "Ajuste a opacidade da sombra projetada externa.",
      icon: <Contrast />,
      sliderLabel: "Opacid. Externa",
      defaultValue: shadowOpacitySlider,
    },
  ];

  const dynamicBoxShadow = `
    inset 1px 1px 2px 0px hsla(0, 0%, 100%, 0.85), 
    inset 0px 2px 3px 0px hsla(0, 0%, 100%, 0.25),
    inset 0px 0px 0px 1px hsla(0, 0%, 100%, 0.3),
    inset -4px -4px ${actualInnerBottomShadowBlur.toFixed(1)}px 0px rgba(0, 0, 0, 0.15), 
    0px ${fixedOuterShadowOffsetY}px ${actualShadowBlur.toFixed(1)}px rgba(0, 0, 0, ${actualShadowAlpha.toFixed(2)})
  `;


  const sharedCardStyleBase: Omit<React.CSSProperties, 'backdropFilter' | 'WebkitBackdropFilter' | 'boxShadow' | 'borderRadius'> = {
    backgroundColor: `hsla(0, 0%, 15%, ${actualFeatureCardOpacity})`,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'hsla(0, 0%, 100%, 0.3)',
  };

  const sharedCardStyle: React.CSSProperties = {
    ...sharedCardStyleBase,
    backdropFilter: `blur(${actualCardBlur}px)`,
    WebkitBackdropFilter: `blur(${actualCardBlur}px)`,
    borderRadius: `${actualCardBorderRadius.toFixed(2)}rem`,
    boxShadow: dynamicBoxShadow,
  };

  return (
    <>
      <div
        className="min-h-screen text-foreground transition-opacity duration-500 bg-cover bg-center bg-no-repeat bg-fixed bg-[url('https://placehold.co/1920x1080.png')]"
        data-ai-hint="abstract background"
      >
        <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
          <header className="mb-12 md:mb-16 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-primary drop-shadow-lg">
              Liquid Glass React
            </h1>
            <p className="text-slate-300 mt-3 text-lg md:text-xl max-w-2xl mx-auto bg-black/30 backdrop-blur-sm p-2 rounded-md drop-shadow-sm">
              Explore os recursos e a personalização da interface do usuário de forma clara e acessível.
            </p>
          </header>

          <main className="space-y-12 md:space-y-16">
            <section
              id="navigation"
              aria-labelledby="navigation-heading"
              className="py-10 md:py-12 scroll-mt-20 relative rounded-lg overflow-hidden shadow-xl min-h-[300px] md:min-h-[400px]"
            >
              <div className="absolute inset-0 z-0 pointer-events-none">
                <SplineViewer splineUrl={splineSceneUrl} />
              </div>
              <div className="relative z-10">
                <h2 id="navigation-heading" className="text-3xl md:text-4xl font-headline font-semibold mb-10 text-center text-slate-100 drop-shadow-md">
                  Navegação Rápida
                </h2>
                <NavigationLinks links={navLinks} />
              </div>
            </section>

            <section id="features" aria-labelledby="features-heading" className="scroll-mt-20">
              <h2 id="features-heading" className="text-3xl md:text-4xl font-headline font-semibold mb-10 text-center text-slate-100 drop-shadow-md">
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
                    borderRadiusValue={actualCardBorderRadius}
                    boxShadowStyle={dynamicBoxShadow}
                  />
                ))}
              </div>
            </section>

            <section id="project-details" aria-labelledby="project-details-heading" className="scroll-mt-20">
              <h2 id="project-details-heading" className="text-3xl md:text-4xl font-headline font-semibold mb-8 text-center text-slate-100 drop-shadow-md">
                Detalhes do Projeto
              </h2>
              <ProjectDetailsCard
                {...projectDetails}
                backgroundOpacity={actualFeatureCardOpacity}
                currentBlur={actualCardBlur}
                borderRadiusValue={actualCardBorderRadius}
                boxShadowStyle={dynamicBoxShadow}
              />
            </section>
          </main>

          <footer className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-white/10 text-center">
            <p className="text-sm text-slate-300 bg-black/30 backdrop-blur-sm p-1 rounded-md inline-block drop-shadow-sm">
              &copy; {new Date().getFullYear()} Liquid Glass React. Todos os direitos reservados.
            </p>
            <p className="text-xs text-slate-400/80 mt-2 bg-black/30 backdrop-blur-sm p-1 rounded-md inline-block drop-shadow-sm">
              Construído com Next.js, Tailwind CSS, e ShadCN UI.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
