
import { ProjectDetailsCard } from '@/components/project-details-card';
import { NavigationLinks } from '@/components/navigation-links';
import { FeatureCard } from '@/components/feature-card';
import { Github, Link as LinkIcon, Palette, Sun, Settings2, HomeIcon, ListChecks, Info } from 'lucide-react';


export default function HomePage() {
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

  const featureCards = [
    {
      id: "appearance",
      title: "Personalizar Aparência",
      description: "Ajuste a cor primária da interface.",
      icon: <Palette />,
      sliderLabel: "Intensidade da Cor",
      defaultValue: 60,
    },
    {
      id: "brightness",
      title: "Ajustar Brilho",
      description: "Controle o brilho geral da interface.",
      icon: <Sun />,
      sliderLabel: "Nível de Brilho",
      defaultValue: 80,
    },
    {
      id: "themeSettings",
      title: "Configurar Tema",
      description: "Modifique as configurações avançadas do tema.",
      icon: <Settings2 />,
      sliderLabel: "Opacidade Global",
      defaultValue: 40,
    },
  ];

  return (
    <div 
      className="min-h-screen text-foreground bg-cover bg-center" 
      style={{ backgroundImage: "url('https://w.wallhaven.cc/full/5y/wallhaven-5yd6d5.png')" }}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featureCards.map((card) => (
                <FeatureCard
                  key={card.id}
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                  sliderLabel={card.sliderLabel}
                  defaultValue={card.defaultValue}
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
