'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import InfiniteScroll from '@/components/ui/InfiniteScroll';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

export default function Home() {
  const { posts, loading, hasMore } = useInfiniteScroll();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/30">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-lg">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <motion.h1 
              className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            >
              Reddit Explorer
            </motion.h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <div className="hidden md:block">
              <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-border/30 px-4 py-1 rounded-full text-sm">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Trending Content
                </span>
              </div>
            </div>
            <ThemeToggle />
          </motion.div>
        </div>
      </header>

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-600/5 transform -skew-y-3 -translate-y-12"></div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Discover the Pulse of the Internet
              </span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground mb-8"
            >
              Jump into the pulse of Reddit and discover what’s trending now.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              <span>Start Exploring</span>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <main className="container mx-auto px-4 py-8 relative z-10">
        <InfiniteScroll 
          posts={posts} 
          loading={loading} 
          hasMore={hasMore} 
        />
      </main>
    </div>
  );
}

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = React.useState(false);  

  React.useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
    setDarkMode(!darkMode);
  };

  return (
    <button 
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="p-2 rounded-full bg-gradient-to-r from-indigo-10 to-purple-10 dark:from-indigo-900/30 dark:to-purple-900/30 hover:from-indigo-200 hover:to-purple-200 dark:hover:from-indigo-800/50 dark:hover:to-purple-800/50 transition-all duration-300 group"
    >
      {darkMode ? (
        <svg 
          className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:rotate-12 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg 
          className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:rotate-12 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
};