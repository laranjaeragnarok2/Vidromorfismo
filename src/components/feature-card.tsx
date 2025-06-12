
"use client";

import React, { useState, useEffect, type FC, type ReactNode } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  sliderLabel: string;
  defaultValue?: number; // Slider value 0-100
  onSettingChange: (id: string, value: number) => void;
  currentBlur?: number; // actual px value
  backgroundOpacity?: number; // actual opacity value 0-1
  borderWidth?: number; // actual px value
  shadowOffsetY?: number; // actual px value
  shadowBlur?: number; // actual px value
  shadowOpacity?: number; // actual alpha value 0-1
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
  shadowOffsetY,
  shadowBlur,
  shadowOpacity,
}) => {
  const [sliderValueState, setSliderValueState] = useState<number[]>([defaultValue]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (sliderValueState[0] !== defaultValue) {
        setSliderValueState([defaultValue]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]); 

  const handleSliderChange = (value: number[]) => {
    setSliderValueState(value);
    onSettingChange(id, value[0]);
  };
  
  const getDisplayValueAndUnit = () => {
    const val = isMounted ? sliderValueState[0] : defaultValue;
    if (id === 'borderWidthControl') return { display: (val / 100 * 8).toFixed(1), unit: 'px' };
    if (id === 'featureCardOpacityControl') {
        const actualOpacity = 0.1 + (val / 100) * 0.9;
        return { display: (actualOpacity * 100).toFixed(0), unit: '%' };
    }
    if (id === 'cardBlurControl') return { display: (val / 100 * 24).toFixed(1), unit: 'px' };
    if (id === 'shadowOffsetYControl') return { display: (val / 100 * 25).toFixed(1), unit: 'px' };
    if (id === 'shadowBlurControl') return { display: (val / 100 * 40).toFixed(1), unit: 'px' };
    if (id === 'shadowOpacityControl') {
        return { display: (val / 100 * 50).toFixed(0), unit: '%' };
    }
    if (id === 'chromaticAberrationControl' || id === 'bevelControl') return { display: val.toFixed(0), unit: ''};
    return { display: val.toFixed(0), unit: ''};
  };

  const { display: currentFormattedValue, unit: currentUnit } = getDisplayValueAndUnit();

  const cardStyle: React.CSSProperties = {
    backgroundColor: `hsla(0, 0%, 100%, ${backgroundOpacity ?? 0.6})`,
    borderStyle: 'solid',
    borderColor: 'hsla(0, 0%, 100%, 0.2)', // Keep border color as it is for visual separation
  };
   if (borderWidth !== undefined) {
    cardStyle.borderWidth = `${borderWidth.toFixed(1)}px`;
  }
  if (currentBlur !== undefined) {
    cardStyle.backdropFilter = `blur(${currentBlur.toFixed(1)}px)`;
    cardStyle.WebkitBackdropFilter = `blur(${currentBlur.toFixed(1)}px)`;
  }
  if (shadowOffsetY !== undefined && shadowBlur !== undefined && shadowOpacity !== undefined) {
    cardStyle.boxShadow = `0px ${shadowOffsetY.toFixed(1)}px ${shadowBlur.toFixed(1)}px 0px rgba(0, 0, 0, ${shadowOpacity.toFixed(2)})`;
  }
  
  return (
    <Card
      className={cn("transition-shadow duration-300 flex flex-col rounded-xl overflow-hidden")}
      style={cardStyle}
    >
      <CardHeader className="items-center text-center p-4 bg-transparent">
        <div className="mb-2 p-3 bg-primary/20 rounded-full w-fit border border-primary/30">
          {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6 text-primary"})}
        </div>
        <CardTitle className="text-lg font-headline text-foreground drop-shadow-sm">{title}</CardTitle>
        <CardDescription className="mt-1 text-muted-foreground drop-shadow-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end p-4 bg-transparent">
        <div className="space-y-3 pt-4">
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor={`slider-${id}`} className="text-sm text-foreground drop-shadow-sm">
              {sliderLabel}
            </Label>
            <span className="text-sm font-semibold text-primary w-16 text-right tabular-nums drop-shadow-sm">
              {currentFormattedValue}
              {currentUnit}
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
      <CardFooter className="p-3 bg-transparent border-t border-white/10 justify-center">
        <p className="text-xs text-muted-foreground drop-shadow-sm">Ajuste para personalizar</p>
      </CardFooter>
    </Card>
  );
};
