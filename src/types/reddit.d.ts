export interface RedditPost {
    id: string;
    title: string;
    subreddit: string;
    author: string;
    score: number;
    num_comments: number;
    thumbnail?: string;
    preview?: {
      images: Array<{
        source: {
          url: string;
        }
      }>
    };
    created_utc: number;
  }
  
  export interface RedditResponse {
    data: {
      children: Array<{
        data: RedditPost;
      }>;
      after: string | null;
    };
  }