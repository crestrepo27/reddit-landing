import { motion } from 'framer-motion';
import Image from 'next/image';
import { RedditPost } from '@/types/reddit';
import { ArrowUp, MessageCircle, Sparkles } from 'lucide-react';

const isValidUrl = (url?: string): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const Card = ({ post }: { post: RedditPost }) => {
  // Obtener URL de imagen válida
  let imageUrl: string | undefined;
  
  if (post.preview?.images?.[0]?.source?.url) {
    // Remover caracteres de escape en la URL
    const rawUrl = post.preview.images[0].source.url;
    imageUrl = rawUrl.replace(/&amp;/g, '&');
  } else if (post.thumbnail && isValidUrl(post.thumbnail)) {
    imageUrl = post.thumbnail;
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ 
        y: -8,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      className="bg-card border border-border/30 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group relative"
    >
      {/* Badge para contenido popular */}
      {post.score > 5000 && (
        <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-amber-400 to-orange-500 text-xs font-bold text-white px-2 py-1 rounded-full flex items-center">
          <Sparkles className="h-3 w-3 mr-1" />
          <span>Hot</span>
        </div>
      )}
      
      {imageUrl ? (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Overlay de gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 h-48 w-full flex items-center justify-center">
          <div className="bg-gray-200 dark:bg-gray-700 border-2 border-dashed rounded-xl w-16 h-16" />
        </div>
      )}
      
      <div className="p-4">
        <h2 className="font-bold line-clamp-2 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {post.title}
        </h2>
        
        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-400 px-2 py-0.5 rounded">
            r/{post.subreddit}
          </span>
          <span className="mx-2 text-muted-foreground/40">•</span>
          <span className="text-muted-foreground/80">u/{post.author}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg">
            <ArrowUp className="h-4 w-4 mr-1 text-indigo-600 dark:text-indigo-400" />
            <span>{post.score.toLocaleString()} votes</span>
          </div>
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg">
            <MessageCircle className="h-4 w-4 mr-1 text-purple-600 dark:text-purple-400" />
            <span>{post.num_comments.toLocaleString()} comments</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

// const UpvoteIcon = () => (
//   <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//     <path d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" />
//   </svg>
// );

// const CommentIcon = () => (
//   <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//   </svg>
// );

export default Card;