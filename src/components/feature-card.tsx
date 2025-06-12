"use client";

import React, { useState, useEffect, type FC, type ReactNode } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  sliderLabel: string;
  defaultValue?: number;
}

export const FeatureCard: FC<FeatureCardProps> = ({ title, description, icon, sliderLabel, defaultValue = 50 }) => {
  const [sliderValueState, setSliderValueState] = useState<number[]>([defaultValue]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Set initial value once mounted to avoid hydration mismatch with server-rendered defaultValue
    setSliderValueState([defaultValue]);
  }, [defaultValue]);

  const handleSliderChange = (value: number[]) => {
    setSliderValueState(value);
  };
  
  const currentDisplayValue = isMounted ? sliderValueState[0] : defaultValue;

  return (
    <Card className="shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col rounded-lg overflow-hidden">
      <CardHeader className="items-center text-center p-6 bg-card">
        <div className="mb-4 p-4 bg-accent/20 rounded-full w-fit border border-accent/30">
          {React.cloneElement(icon as React.ReactElement, { className: "w-8 h-8 text-primary"})}
        </div>
        <CardTitle className="text-xl font-headline text-foreground">{title}</CardTitle>
        <CardDescription className="mt-1 text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end p-6">
        <div className="space-y-3 pt-4">
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor={`slider-${title.replace(/\s+/g, '-').toLowerCase()}`} className="text-sm text-foreground">
              {sliderLabel}
            </Label>
            <span className="text-sm font-semibold text-primary w-12 text-right tabular-nums">{currentDisplayValue}%</span>
          </div>
          {isMounted ? (
            <Slider
              id={`slider-${title.replace(/\s+/g, '-').toLowerCase()}`}
              value={sliderValueState}
              defaultValue={[defaultValue]}
              max={100}
              step={1}
              onValueChange={handleSliderChange}
              className="[&>span:nth-child(1)]:bg-secondary [&>span:nth-child(1)>span]:bg-primary [&_[role=slider]]:bg-background [&_[role=slider]]:border-2 [&_[role=slider]]:border-primary [&_[role=slider]]:shadow-sm"
              aria-label={sliderLabel}
            />
          ) : (
             <div className="h-5 flex items-center"> {/* SSR Placeholder for slider to maintain layout consistency */}
                <div className="relative flex h-2 w-full grow touch-none select-none items-center">
                    <span className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
                        <span className="absolute h-full bg-primary" style={{width: `${defaultValue}%`}}></span>
                    </span>
                    <span 
                      className="absolute block h-5 w-5 rounded-full border-2 border-primary bg-background shadow-sm" 
                      style={{left: `calc(${defaultValue}% - 10px)`}} /* 10px is half of thumb width (20px) */
                    ></span>
                </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-muted/30 justify-center">
        <p className="text-xs text-muted-foreground">Ajuste para personalizar</p>
      </CardFooter>
    </Card>
  );
};
