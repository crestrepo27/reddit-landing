import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import { CardSkeleton } from './CardSkeleton';
import { RedditPost } from '@/types/reddit';
import ConfettiEffect from './ConfettiEffect';

type InfiniteScrollProps = {
  posts: RedditPost[]; 
  loading: boolean;
  hasMore: boolean;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const InfiniteScroll = ({ posts, loading, hasMore }: InfiniteScrollProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const endMessageRef = useRef<HTMLDivElement>(null);
  const confettiFiredRef = useRef(false);

  // Observar si el mensaje final es visible
  useEffect(() => {
    if (!hasMore && !loading && endMessageRef.current && !confettiFiredRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShowConfetti(true);
            confettiFiredRef.current = true;
            
            setTimeout(() => {
              setShowConfetti(false);
            }, 5000);
          }
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.1
        }
      );

      const currentRef = endMessageRef.current; // Capturar referencia actual
      observer.observe(currentRef);

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }
  }, [hasMore, loading]);

  return (
    <div className="w-full">
      <ConfettiEffect trigger={showConfetti} />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {posts.map((post) => (
          <Card key={post.id} post={post} />
        ))}
      </motion.div>

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </motion.div>
      )}

      {!hasMore && !loading && (
        <motion.div
          ref={endMessageRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full">
            <p>You&apos;ve reached the end! 🎉</p>
            <p className="text-sm mt-2 text-indigo-100">Loaded {posts.length} posts</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default InfiniteScroll;