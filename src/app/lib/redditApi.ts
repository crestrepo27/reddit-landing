import axios from 'axios';
import { RedditPost, RedditResponse } from '@/types/reddit';
import { isValidUrl } from './utils';

const BASE_URL = 'https://www.reddit.com';

export const fetchPosts = async (limit = 50, after?: string): Promise<{
  posts: RedditPost[];
  after: string | null;
}> => {
  const response = await axios.get<RedditResponse>(
    `${BASE_URL}/.json`,
    {
      params: {
        limit,
        after: after || undefined
      }
    }
  );

  const posts = response.data.data.children.map(child => {
    const postData = child.data;
    
    // Limpiar URLs de imágenes
    let thumbnail = postData.thumbnail;
    if (thumbnail && !isValidUrl(thumbnail)) {
      thumbnail = undefined;
    }
    
    let previewUrl = postData.preview?.images?.[0]?.source?.url;
    if (previewUrl) {
      // Remover caracteres de escape
      previewUrl = previewUrl.replace(/&amp;/g, '&');
      if (!isValidUrl(previewUrl)) {
        previewUrl = undefined;
      }
    }
    
    return {
      ...postData,
      thumbnail,
      preview: previewUrl ? {
        images: [{
          source: {
            url: previewUrl
          }
        }]
      } : undefined,
      created_utc: postData.created_utc * 1000
    };
  });

  return {
    posts,
    after: response.data.data.after
  };
};