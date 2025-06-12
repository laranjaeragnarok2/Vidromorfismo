
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
  borderRadiusValue?: number; // actual rem value
  shadowOffsetY?: number;
  shadowBlur?: number;
  shadowOpacity?: number;
}

export const ProjectDetailsCard: FC<ProjectDetailsCardProps> = ({
  title,
  description,
  author,
  links,
  backgroundOpacity,
  currentBlur,
  borderRadiusValue,
  shadowOffsetY,
  shadowBlur,
  shadowOpacity,
}) => {
  const cardStyle: React.CSSProperties = {
    backgroundColor: `hsla(0, 0%, 100%, ${backgroundOpacity ?? 0.7})`,
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'hsla(0, 0%, 100%, 0.35)',
  };

  if (currentBlur !== undefined) {
    cardStyle.backdropFilter = `blur(${currentBlur.toFixed(1)}px)`;
    cardStyle.WebkitBackdropFilter = `blur(${currentBlur.toFixed(1)}px)`;
  }
  if (borderRadiusValue !== undefined) {
    cardStyle.borderRadius = `${borderRadiusValue.toFixed(2)}rem`;
  }
  if (shadowOffsetY !== undefined && shadowBlur !== undefined && shadowOpacity !== undefined) {
    cardStyle.boxShadow = `inset 0 1px 2px hsla(0, 0%, 100%, 0.5), inset 0 -1px 1px hsla(240, 10%, 20%, 0.1), 0px ${shadowOffsetY.toFixed(1)}px ${shadowBlur.toFixed(1)}px 0px rgba(0, 0, 0, ${shadowOpacity.toFixed(2)})`;
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
        <CardDescription className="text-md text-muted-foreground mt-1 drop-shadow-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6 bg-transparent">
        <div className="flex items-center space-x-3 p-3 bg-accent/20 rounded-md border border-accent/30">
          <User className="w-6 h-6 text-accent-foreground" />
          <p className="text-foreground drop-shadow-sm"><span className="font-semibold">Autor:</span> {author}</p>
        </div>
        
        {links && links.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-2 flex items-center text-foreground drop-shadow-sm">
              <GitBranch className="w-5 h-5 text-primary mr-2" />
              Links Úteis:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {links.map((link) => (
                <Button key={link.name} variant="outline" asChild className="w-full transition-all duration-200 ease-in-out hover:bg-accent hover:text-accent-foreground hover:border-accent bg-background/70">
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
        <p className="text-sm text-muted-foreground drop-shadow-sm">Informações do projeto.</p>
      </CardFooter>
    </Card>
  );
};
