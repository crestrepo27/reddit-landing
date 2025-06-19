import { motion } from 'framer-motion';
import Image from 'next/image';
import { RedditPost } from '@/types/reddit';
import { ArrowUp, MessageCircle, Flame } from 'lucide-react';

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
  let imageUrl: string | undefined;

  if (post.preview?.images?.[0]?.source?.url) {
    const rawUrl = post.preview.images[0].source.url;
    imageUrl = rawUrl.replace(/&amp;/g, '&');
  } else if (post.thumbnail && isValidUrl(post.thumbnail)) {
    imageUrl = post.thumbnail;
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      whileHover={{
        y: -6, // Menos movimiento para mayor velocidad
        scale: 1.02, // Pequeño zoom para énfasis
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        transition: { 
          duration: 0.08, // Casi instantáneo
          ease: "easeOut" 
        }
      }}
      className="bg-card border border-border/30 rounded-xl overflow-hidden group relative"
    >
      {post.score > 5000 && (
        <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-amber-400 to-orange-500 text-xs font-bold text-white px-2 py-1 rounded-full flex items-center">
          <Flame className="h-3 w-3 mr-1" />
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
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
          <span className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500 text-white px-3 py-1 rounded-full font-medium text-xs">
            r/{post.subreddit}
          </span>
          <span className="mx-2 text-muted-foreground/40">•</span>
          <span className="text-muted-foreground/80">u/{post.author}</span>
        </div>

        <div className="flex justify-normal gap-4 text-sm mt-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center mr-3 dark:from-indigo-900/30 dark:to-indigo-800/40 rounded-full shadow-sm dark:shadow-none">
              <ArrowUp className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Votes</p>
              <p className="font-bold text-indigo-700 dark:text-indigo-300 text-sm">
                {post.score.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex items-center justify-center mr-3 dark:from-purple-900/30 dark:to-purple-800/40 rounded-full shadow-sm dark:shadow-none">
              <MessageCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Comments</p>
              <p className="font-bold text-purple-700 dark:text-purple-300 text-sm">
                {post.num_comments.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default Card;
