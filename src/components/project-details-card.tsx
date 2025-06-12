import type { FC, ReactNode } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Briefcase, GitBranch } from 'lucide-react';

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
}

export const ProjectDetailsCard: FC<ProjectDetailsCardProps> = ({ title, description, author, links }) => {
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl overflow-hidden rounded-lg">
      <CardHeader className="text-center bg-card p-6">
        <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4 border border-primary/20">
         <Briefcase className="w-10 h-10 text-primary" />
        </div>
        <CardTitle className="text-3xl font-headline text-primary">{title}</CardTitle>
        <CardDescription className="text-md text-muted-foreground mt-1">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="flex items-center space-x-3 p-3 bg-accent/10 rounded-md border border-accent/20">
          <User className="w-6 h-6 text-accent-foreground" />
          <p className="text-foreground"><span className="font-semibold">Autor:</span> {author}</p>
        </div>
        
        {links && links.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-2 flex items-center text-foreground">
              <GitBranch className="w-5 h-5 text-primary mr-2" />
              Links Úteis:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {links.map((link) => (
                <Button key={link.name} variant="outline" asChild className="w-full transition-all duration-200 ease-in-out hover:bg-accent hover:text-accent-foreground hover:border-accent">
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
      <CardFooter className="justify-center bg-muted/50 p-4">
        <p className="text-sm text-muted-foreground">Informações do projeto.</p>
      </CardFooter>
    </Card>
  );
};
