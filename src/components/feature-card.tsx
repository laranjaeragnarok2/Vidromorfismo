
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
  borderRadiusValue?: number; // actual rem value
  boxShadowStyle?: string;
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
  borderRadiusValue,
  boxShadowStyle, 
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
    if (id === 'cardBorderRadiusControl') return { display: (val / 100 * 2).toFixed(2), unit: 'rem' };
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
    return { display: val.toFixed(0), unit: ''};
  };

  const { display: currentFormattedValue, unit: currentUnit } = getDisplayValueAndUnit();

  const cardStyle: React.CSSProperties = {
    backgroundColor: `hsla(0, 0%, 15%, ${backgroundOpacity ?? 0.6})`, // Dark translucent background
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'hsla(0, 0%, 100%, 0.1)', // Subtle light border
  };
   if (borderRadiusValue !== undefined) {
    cardStyle.borderRadius = `${borderRadiusValue.toFixed(2)}rem`;
  }
  if (currentBlur !== undefined) {
    cardStyle.backdropFilter = `blur(${currentBlur.toFixed(1)}px)`;
    cardStyle.WebkitBackdropFilter = `blur(${currentBlur.toFixed(1)}px)`;
  }
  if (boxShadowStyle !== undefined) {
    cardStyle.boxShadow = boxShadowStyle;
  }
  
  return (
    <Card
      className={cn("transition-shadow duration-300 flex flex-col overflow-hidden")}
      style={cardStyle}
    >
      <CardHeader className="items-center text-center p-4 bg-transparent">
        <div className="mb-2 p-3 bg-primary/20 rounded-full w-fit border border-primary/30">
          {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6 text-primary"})}
        </div>
        <CardTitle className="text-lg font-headline text-slate-100 drop-shadow-sm">{title}</CardTitle>
        <CardDescription className="mt-1 text-slate-300 drop-shadow-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end p-4 bg-transparent">
        <div className="space-y-3 pt-4">
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor={`slider-${id}`} className="text-sm text-slate-200 drop-shadow-sm">
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
              className="[&>span:nth-child(1)]:bg-slate-700/50 [&>span:nth-child(1)>span]:bg-primary [&_[role=slider]]:bg-slate-800 [&_[role=slider]]:border-2 [&_[role=slider]]:border-primary [&_[role=slider]]:shadow-sm"
              aria-label={sliderLabel}
            />
          ) : (
             <div className="h-5 flex items-center"> 
                <div className="relative flex h-2 w-full grow touch-none select-none items-center">
                    <span className="relative h-2 w-full grow overflow-hidden rounded-full bg-slate-700/50">
                        <span className="absolute h-full bg-primary" style={{width: `${defaultValue}%`}}></span>
                    </span>
                    <span
                      className="absolute block h-5 w-5 rounded-full border-2 border-primary bg-slate-800 shadow-sm"
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
        <p className="text-xs text-slate-400 drop-shadow-sm">Ajuste para personalizar</p>
      </CardFooter>
    </Card>
  );
};
