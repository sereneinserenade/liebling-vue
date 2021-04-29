import {
  Pagination,
  SiteConfig,
  Author,
  GhostAPI,
  Settings,
  Tag,
  PostOrPage,
  Authors,
} from "@/types";

export interface PostData {
  slug: string;
  found: boolean;
  post?: PostOrPage;
}

export interface PostOrPageWithMeta {
  posts: PostOrPage[];
  meta: {
    pagination: Pagination;
  };
}

export type PostPagesData = Record<number, PostOrPageWithMeta>;

export interface State {
  api: GhostAPI | null;

  posts: Array<PostOrPage> | null;
  currentPost: PostOrPage | null;
  recentPosts: Array<PostOrPage> | null;
  featuredPosts: Array<PostOrPage> | null;

  authors: Authors | null;
  currentAuthor: Author | null;

  page: number;
  totalPages: number;
  pagination: Pagination | null;

  settings: Settings | null;

  siteConfig: SiteConfig | null;

  tags: Array<Tag> | null;

  isSearchOpen: boolean;

  isCurrentUrlPage: boolean;

  postsData: PostData[];

  pagesData: PostData[];

  postPagesData: PostPagesData;
}
