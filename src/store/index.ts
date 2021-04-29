/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from "vue";
import Vuex from "vuex";
import {
  Pagination,
  State,
  SiteConfig,
  Author,
  PostData,
  PostOrPage,
  GhostAPI,
  Settings,
  PostOrPageWithMeta,
  Tag,
  Authors,
} from "@/types";
import { get } from "@/utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    api: null,

    posts: null,
    recentPosts: null,
    featuredPosts: null,
    currentPost: null,

    authors: null,
    currentAuthor: null,

    page: 1,
    totalPages: 1,
    pagination: null,

    settings: null,

    siteConfig: null,

    tags: null,

    isSearchOpen: false,

    isCurrentUrlPage: false,

    postsData: [],

    pagesData: [],

    postPagesData: {},
  } as State,

  mutations: {
    SET_API(state: State, api: GhostAPI) {
      state.api = api;
    },
    SET_POSTS(state: State, posts: Array<PostOrPage>) {
      state.posts = posts;
    },
    SET_PAGE(state: State, page: number) {
      state.page = page;
    },
    SET_TOTAL_PAGES(state: State, totalPages: number) {
      state.totalPages = totalPages;
    },
    SET_SETTINGS(state: State, settings: Settings) {
      state.settings = settings;
    },
    SET_PAGINATION(state: State, pagination: Pagination) {
      state.pagination = pagination;
    },
    SET_CURRENT_POST(state: State, post: PostOrPage) {
      state.currentPost = post;
    },
    SET_FEATURED_POSTS(state: State, posts: Array<PostOrPage>) {
      state.featuredPosts = posts;
    },
    SET_SITE_CONFIG(state: State, siteConfig: SiteConfig) {
      state.siteConfig = siteConfig;
    },
    SET_AUTHORS(state: State, authors: Authors) {
      state.authors = authors;
    },
    SET_CURRENT_AUTHOR(state: State, author: Author) {
      state.currentAuthor = author;
    },
    SET_RECENT_POST(state: State, posts: PostOrPage[]) {
      state.recentPosts = posts;
    },
    SET_TAGS(state: State, tags: Tag[]) {
      state.tags = tags;
    },
    SET_SEARCH_OPEN_VALUE(state: State, value = false) {
      state.isSearchOpen = value;
    },
    SET_IS_CURRENT_URL_PAGE(state: State, value = false) {
      state.isCurrentUrlPage = value;
    },
    SET_POST_DATA(state: State, postData: PostData) {
      state.postsData.push(postData);
    },
    SET_PAGE_DATA(state: State, pageData: PostData) {
      state.pagesData.push(pageData);
    },
    SET_POST_PAGES_DATA(state: State, pageData: PostOrPageWithMeta) {
      // debugger;
      state.postPagesData[pageData.meta.pagination.page] = pageData;
      state.posts = [...pageData.posts];
    },
  },

  actions: {
    async browseSettings({ commit, state }) {
      const settings = await state.api?.settings.browse();
      commit("SET_SETTINGS", settings);

      return settings;
    },

    async getRecentPosts({ commit, state }, limit: number) {
      const recentPosts = await state.api?.posts.browse({
        limit: limit,
        include: ["authors", "tags"],
      });
      commit("SET_RECENT_POST", recentPosts);

      return recentPosts;
    },

    async browseTags({ commit, state }, limit: number | string) {
      const tags = await state.api?.tags.browse({
        limit,
        include: ["count.posts", "authors"],
      });
      commit("SET_TAGS", tags);

      return tags;
    },

    async getAuthors({ commit, state }) {
      const authors = await state.api?.authors.browse({ limit: "all" });
      commit("SET_AUTHORS", authors);

      return authors;
    },

    async getFeaturedPosts({ commit, state }, limit: number) {
      const featuredPosts = await state.api?.posts.browse({
        limit: limit,
        filter: ["featured:true"],
        include: ["authors", "tags"],
      });

      commit("SET_FEATURED_POSTS", featuredPosts);

      return featuredPosts;
    },

    async getPostWithIdOrSlug({ commit, state }, queryString = "") {
      if (!queryString) return;

      const matchedPostFromData = state.postsData.find(
        (post) => post.slug === queryString
      );

      if (matchedPostFromData && matchedPostFromData.found) {
        commit("SET_CURRENT_POST", matchedPostFromData?.post);
        commit("SET_IS_CURRENT_URL_PAGE");
        return matchedPostFromData?.post;
      } else if (matchedPostFromData && !matchedPostFromData.found) {
        return;
      }

      let foundPost: PostOrPage | undefined = undefined;

      try {
        const post = await get(
          `${state.siteConfig?.API_URL}/ghost/api/v3/content/posts/slug/${queryString}/?key=${state.siteConfig?.CONTENT_API_KEY}&include=tags,authors`
        );
        if (post) {
          foundPost = post.posts[0];

          commit("SET_CURRENT_POST", foundPost);
          commit("SET_IS_CURRENT_URL_PAGE");

          const foundPostWithSlug = state.postsData.find(
            (postData) => postData.slug === foundPost?.slug
          );
          if (!foundPostWithSlug) {
            commit("SET_POST_DATA", {
              slug: foundPost?.slug,
              found: true,
              post: foundPost,
            });
          }

          return foundPost;
        } else {
          commit("SET_POST_DATA", {
            slug: (foundPost as any).slug,
            found: false,
          });
        }
      } catch {
        return null;
      }

      return null;
    },

    async getPageWithIdOrSlug({ commit, state }, queryString = "") {
      if (!queryString) return;

      const matchedPageFromData = state.pagesData.find(
        (page) => page.slug === queryString
      );
      if (matchedPageFromData && matchedPageFromData.found) {
        commit("SET_CURRENT_POST", matchedPageFromData?.post);
        commit("SET_IS_CURRENT_URL_PAGE", true);
        return matchedPageFromData?.post;
      } else if (matchedPageFromData && !matchedPageFromData.found) {
        return;
      }

      let foundPage: PostOrPage | any = undefined;
      try {
        const page = await get(
          `${state.siteConfig?.API_URL}/ghost/api/v3/content/pages/slug/${queryString}/?key=${state.siteConfig?.CONTENT_API_KEY}&include=tags,authors`
        );
        if (page) {
          foundPage = page.pages[0];

          commit("SET_CURRENT_POST", foundPage);
          commit("SET_IS_CURRENT_URL_PAGE", true);

          const foundPageWithSlug = state.pagesData.find(
            (page) => page.slug === foundPage.slug
          );
          if (!foundPageWithSlug) {
            commit("SET_PAGE_DATA", {
              slug: foundPage.slug,
              found: true,
              post: foundPage,
            });
          }

          return foundPage;
        } else {
          commit("SET_PAGE_DATA", {
            slug: foundPage.slug,
            found: false,
          });
        }
      } catch {
        return null;
      }

      return null;
    },

    async getPostsTillPage({ commit, state }, page) {
      if (state.postPagesData[page]) {
        const foundPages = state.postPagesData[page];
        commit("SET_POST_PAGES_DATA", foundPages);
        commit("SET_RECENT_POST", foundPages.posts);
        commit("SET_PAGINATION", foundPages.meta.pagination);
      }

      const pages: PostOrPageWithMeta = await get(
        `${state.siteConfig?.API_URL}/ghost/api/v3/content/posts/?key=${state.siteConfig?.CONTENT_API_KEY}&page=${page}&limit=10&include=authors,tags,`
      );

      commit("SET_POST_PAGES_DATA", pages);
      commit("SET_RECENT_POST", pages.posts);
      commit("SET_PAGINATION", pages.meta.pagination);
    },
  },

  modules: {},
});
