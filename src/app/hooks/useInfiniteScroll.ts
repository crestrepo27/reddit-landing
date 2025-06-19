import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchPosts } from '@/lib/redditApi';
import { RedditPost } from '@/types/reddit';

export const useInfiniteScroll = () => {
  const [posts, setPosts] = useState<RedditPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [after, setAfter] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreRef = useRef<() => Promise<void> | null>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const { posts: newPosts, after: newAfter } = await fetchPosts(50, after ?? undefined);
      
      setPosts(prev => {
        const updatedPosts = [...prev, ...newPosts];
        
        if (updatedPosts.length >= 150 || !newAfter) {
          setHasMore(false);
        }
        
        return updatedPosts;
      });
      
      setAfter(newAfter);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  }, [after, hasMore, loading]);

  useEffect(() => {
    loadMoreRef.current = loadMore;
  }, [loadMore]);


  const loadInitial = useCallback(async () => {
    if (loadMoreRef.current) {
      await loadMoreRef.current();
    }
  }, []);

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 200 >= 
        document.documentElement.offsetHeight
      ) {
        if (loadMoreRef.current) {
          loadMoreRef.current();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { posts, loading, hasMore };
};