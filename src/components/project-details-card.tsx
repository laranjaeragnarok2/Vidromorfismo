
import type { FC, ReactNode } from 'react';
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Briefcase, GitBranch } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LinkItem {
  name: string;
  url: string;
  icon: ReactNode;
}

interface ProjectDetailsCardProps {
  title: string;
  description: string;
  author: string;
  links: LinkItem[];
  backgroundOpacity?: number;
  currentBlur?: number;
  borderRadiusValue?: number; 
  boxShadowStyle?: string;
}

export const ProjectDetailsCard: FC<ProjectDetailsCardProps> = ({
  title,
  description,
  author,
  links,
  backgroundOpacity,
  currentBlur,
  borderRadiusValue,
  boxShadowStyle,
}) => {
  const cardStyle: React.CSSProperties = {
    backgroundColor: `hsla(0, 0%, 15%, ${backgroundOpacity ?? 0.7})`, // Dark translucent background
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'hsla(0, 0%, 100%, 0.1)', // Subtle light border
  };

  if (currentBlur !== undefined) {
    cardStyle.backdropFilter = `blur(${currentBlur.toFixed(1)}px)`;
    cardStyle.WebkitBackdropFilter = `blur(${currentBlur.toFixed(1)}px)`;
  }
  if (borderRadiusValue !== undefined) {
    cardStyle.borderRadius = `${borderRadiusValue.toFixed(2)}rem`;
  }
  if (boxShadowStyle !== undefined) { 
    cardStyle.boxShadow = boxShadowStyle;
  }

  return (
    <Card 
      className={cn("w-full max-w-2xl mx-auto overflow-hidden")}
      style={cardStyle}
    >
      <CardHeader className="text-center bg-transparent p-6">
        <div className="mx-auto bg-primary/20 p-4 rounded-full w-fit mb-4 border border-primary/30">
         <Briefcase className="w-10 h-10 text-primary" />
        </div>
        <CardTitle className="text-3xl font-headline text-primary drop-shadow-sm">{title}</CardTitle>
        <CardDescription className="text-md text-slate-300 mt-1 drop-shadow-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6 bg-transparent">
        <div className="flex items-center space-x-3 p-3 bg-black/20 rounded-md border border-white/10">
          <User className="w-6 h-6 text-slate-300" />
          <p className="text-slate-200 drop-shadow-sm"><span className="font-semibold text-slate-100">Autor:</span> {author}</p>
        </div>
        
        {links && links.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-2 flex items-center text-slate-100 drop-shadow-sm">
              <GitBranch className="w-5 h-5 text-primary mr-2" />
              Links Úteis:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {links.map((link) => (
                <Button key={link.name} variant="outline" asChild className="w-full transition-all duration-200 ease-in-out hover:bg-primary/80 hover:text-primary-foreground hover:border-primary bg-black/40 border-white/20 text-slate-200 hover:text-primary-foreground">
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    {link.icon}
                    <span>{link.name}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-center bg-transparent border-t border-white/10 p-4">
        <p className="text-sm text-slate-400 drop-shadow-sm">Informações do projeto.</p>
      </CardFooter>
    </Card>
  );
};
