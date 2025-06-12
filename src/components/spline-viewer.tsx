
'use client';

import Spline from '@splinetool/react-spline';
import type { FC } from 'react';
import { cn } from '@/lib/utils';

interface SplineViewerProps {
  splineUrl: string;
  className?: string;
}

export const SplineViewer: FC<SplineViewerProps> = ({ splineUrl, className }) => {
  if (!splineUrl || splineUrl.includes("YOUR_SCENE_URL_HERE")) {
    console.warn("SplineViewer: splineUrl is a placeholder. Please provide a valid Spline scene URL.");
    // Optionally, render a placeholder or nothing if the URL isn't set
    return (
      <div className={cn("fixed inset-0 z-[-1] flex items-center justify-center bg-gray-200", className)}>
        <p className="text-gray-500">Spline scene not loaded. Please update the URL.</p>
      </div>
    );
  }

  return (
    <div className={cn("fixed inset-0 z-[-1] pointer-events-none", className)}>
      <Spline scene={splineUrl} />
    </div>
  );
};
