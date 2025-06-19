import { useState, useEffect, useCallback } from 'react';
import { fetchPosts } from '@/lib/redditApi';
import { RedditPost } from '@/types/reddit';

export const useInfiniteScroll = () => {
  const [posts, setPosts] = useState<RedditPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [after, setAfter] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const { posts: newPosts, after: newAfter } = await fetchPosts(50, after ?? undefined);
      
      setPosts(prev => [...prev, ...newPosts]);
      setAfter(newAfter);
      
      // Limitar a 150 posts como máximo
      if (posts.length + newPosts.length >= 150 || !newAfter) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  }, [after, hasMore, loading, posts.length]);

  useEffect(() => {
    loadMore();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 200 >= 
        document.documentElement.offsetHeight
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  return { posts, loading, hasMore };
};