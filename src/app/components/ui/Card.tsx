import { motion } from 'framer-motion';
import Image from 'next/image';
import { RedditPost } from '@/types/reddit';

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
      whileHover={{ y: -5 }}
      className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      {imageUrl ? (
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              // Fallback en caso de error de carga
              e.currentTarget.parentElement?.classList.add('hidden');
            }}
          />
        </div>
      ) : (
        // Placeholder cuando no hay imagen válida
        <div className="bg-gray-200 dark:bg-gray-700 h-48 w-full flex items-center justify-center">
          <span className="text-gray-500 dark:text-gray-400">No image</span>
        </div>
      )}
      
      <div className="p-4">
        <h2 className="font-medium line-clamp-2 mb-2">{post.title}</h2>
        
        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <span>r/{post.subreddit}</span>
          <span className="mx-2">•</span>
          <span>u/{post.author}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <div className="flex items-center">
            <UpvoteIcon />
            <span>{post.score.toLocaleString()} votes</span>
          </div>
          <div className="flex items-center">
            <CommentIcon />
            <span>{post.num_comments.toLocaleString()} comments</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const UpvoteIcon = () => (
  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
    <path d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" />
  </svg>
);

const CommentIcon = () => (
  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

export default Card;