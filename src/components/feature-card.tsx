
"use client";

import React, { useState, useEffect, type FC, type ReactNode } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface FeatureCardProps {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  sliderLabel: string;
  defaultValue?: number;
  onSettingChange: (id: string, value: number) => void;
  currentBlur?: number;
  backgroundOpacity?: number;
  borderWidth?: number;
}

export const FeatureCard: FC<FeatureCardProps> = ({
  id,
  title,
  description,
  icon,
  sliderLabel,
  defaultValue = 50,
  onSettingChange,
  currentBlur,
  backgroundOpacity,
  borderWidth,
}) => {
  const [sliderValueState, setSliderValueState] = useState<number[]>([defaultValue]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setSliderValueState([defaultValue]);
  }, [defaultValue]);

  const handleSliderChange = (value: number[]) => {
    setSliderValueState(value);
    onSettingChange(id, value[0]);
  };

  const currentDisplayValue = isMounted ? sliderValueState[0] : defaultValue;

  const getUnit = () => {
    if (id === 'borderWidthControl') return 'px';
    if (id === 'featureCardOpacityControl' || id === 'cardBlurControl') return '%';
    return ''; // No unit for chromatic aberration intensity or others by default
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: `hsla(0, 0%, 100%, ${backgroundOpacity ?? 0.6})`,
    borderWidth: borderWidth !== undefined ? `${borderWidth}px` : '1px',
    borderStyle: 'solid',
    borderColor: 'hsla(0, 0%, 100%, 0.2)',
  };
  if (currentBlur !== undefined) {
    cardStyle.backdropFilter = `blur(${currentBlur}px)`;
    cardStyle.WebkitBackdropFilter = `blur(${currentBlur}px)`;
  }
  
  return (
    <Card 
      className="shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col rounded-xl overflow-hidden"
      style={cardStyle}
    >
      <CardHeader className="items-center text-center p-6 bg-transparent">
        <div className="mb-4 p-4 bg-primary/20 rounded-full w-fit border border-primary/30">
          {React.cloneElement(icon as React.ReactElement, { className: "w-8 h-8 text-primary"})}
        </div>
        <CardTitle className="text-xl font-headline text-foreground drop-shadow-sm">{title}</CardTitle>
        <CardDescription className="mt-1 text-muted-foreground drop-shadow-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end p-6 bg-transparent">
        <div className="space-y-3 pt-4">
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor={`slider-${id}`} className="text-sm text-foreground drop-shadow-sm">
              {sliderLabel}
            </Label>
            <span className="text-sm font-semibold text-primary w-12 text-right tabular-nums drop-shadow-sm">
              {currentDisplayValue}
              {getUnit()}
            </span>
          </div>
          {isMounted ? (
            <Slider
              id={`slider-${id}`}
              value={sliderValueState}
              defaultValue={[defaultValue]}
              max={100}
              step={1}
              onValueChange={handleSliderChange}
              className="[&>span:nth-child(1)]:bg-secondary/50 [&>span:nth-child(1)>span]:bg-primary [&_[role=slider]]:bg-background [&_[role=slider]]:border-2 [&_[role=slider]]:border-primary [&_[role=slider]]:shadow-sm"
              aria-label={sliderLabel}
            />
          ) : (
             <div className="h-5 flex items-center">
                <div className="relative flex h-2 w-full grow touch-none select-none items-center">
                    <span className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary/50">
                        <span className="absolute h-full bg-primary" style={{width: `${defaultValue}%`}}></span>
                    </span>
                    <span
                      className="absolute block h-5 w-5 rounded-full border-2 border-primary bg-background shadow-sm"
                      style={{left: `calc(${defaultValue}% - 10px)`}}
                      role="slider"
                      aria-valuenow={defaultValue}
                      aria-label={sliderLabel}
                    ></span>
                </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-transparent border-t border-white/10 justify-center">
        <p className="text-xs text-muted-foreground drop-shadow-sm">Ajuste para personalizar</p>
      </CardFooter>
    </Card>
  );
};
