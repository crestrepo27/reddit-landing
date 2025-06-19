import React from 'react';

export const CardSkeleton = () => (
  <div className="bg-card border rounded-xl overflow-hidden transition-all duration-300">
    <div className="animate-pulse">
      <div className="bg-gray-200 dark:bg-gray-700 h-48 w-full" />
      
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="flex items-center space-x-2">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12" />
        </div>
        <div className="flex justify-between pt-2">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24" />
        </div>
      </div>
    </div>
  </div>
);