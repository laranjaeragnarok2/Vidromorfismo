
'use client';

import Spline from '@splinetool/react-spline';
import type { FC } from 'react';
import { cn } from '@/lib/utils';

interface SplineViewerProps {
  splineUrl: string;
  className?: string;
}

export const SplineViewer: FC<SplineViewerProps> = ({ splineUrl, className }) => {
  if (!splineUrl || splineUrl.includes("YOUR_SCENE_URL_HERE") || splineUrl.includes("PLACEHOLDER_URL")) {
    console.warn("SplineViewer: splineUrl is a placeholder or invalid. Please provide a valid Spline scene URL.");
    return (
      <div className={cn("w-full h-full flex items-center justify-center bg-gray-200 text-gray-500", className)}>
        <p className="p-4 text-center">Spline scene not loaded. Please update the URL.</p>
      </div>
    );
  }

  return (
    <div className={cn("w-full h-full", className)}>
      {/* Ensure the Spline component itself also fills its container */}
      <Spline scene={splineUrl} className="w-full h-full block" />
    </div>
  );
};
