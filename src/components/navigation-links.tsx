
import type { FC, ReactNode } from 'react';
import React from 'react';
import { Button } from '@/components/ui/button';

interface NavLinkItem {
  name: string;
  href: string;
  icon: ReactNode;
}

interface NavigationLinksProps {
  links: NavLinkItem[];
}

export const NavigationLinks: FC<NavigationLinksProps> = ({ links }) => {
  return (
    <nav className="flex flex-wrap justify-center gap-4 md:gap-6 px-4">
      {links.map((link) => (
        <Button key={link.name} variant="ghost" size="lg" asChild className="group !p-0">
          <a href={link.href} className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-primary/20 transition-all duration-300 ease-in-out transform hover:scale-105 w-28 h-28 justify-center">
            <div className="p-2 bg-primary/30 rounded-full group-hover:bg-primary transition-colors duration-200 ease-in-out border border-primary/50">
              {React.cloneElement(link.icon as React.ReactElement, { className: "w-6 h-6 text-primary-foreground group-hover:text-primary-foreground transition-colors duration-200 ease-in-out"})}
            </div>
            <span className="text-sm font-medium text-slate-100 group-hover:text-primary transition-colors duration-200 ease-in-out drop-shadow-sm">{link.name}</span>
          </a>
        </Button>
      ))}
    </nav>
  );
};
