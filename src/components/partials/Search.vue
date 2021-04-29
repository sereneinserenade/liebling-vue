<template>
  <div
    class="m-search"
    :class="{ opened: isSearchOpen }"
    role="dialog"
    aria-modal="true"
    aria-label="Search"
  >
    <button
      class="m-icon-button outlined as-close-search"
      aria-label="Close search"
      @click="onSearchClose"
    >
      <inline-svg :src="CloseIcon" />
      <!-- <span class="icon-close" aria-hidden="true"></span> -->
    </button>
    <div class="m-search__content">
      <form class="m-search__form">
        <div class="pos-relative">
          <span class="m-search-icon" aria-hidden="true">
            <inline-svg :src="SearchIcon" />
          </span>
          <label for="search-input" class="sr-only">
            {{ "Type to search" }}
          </label>
          <input
            id="search-input"
            type="text"
            class="m-input in-search"
            placeholder="Type to search"
            ref="searchInput"
            v-if="isSearchOpen"
            v-model="searchTerm"
            autofocus="autofocus"
          />
        </div>
      </form>
      <div :class="{ hide: !hasBestResults }">
        <article
          v-for="(bestResult, i) in bestResults"
          :key="`${i}-best-result`"
          class="m-result"
          @click="onSearchClose"
        >
          <router-link
            :to="getFEUrlPath(bestResults[i].item.url)"
            class="m-result__link"
          >
            <h3 class="m-result__title">
              {{ bestResults[i].item.title }}
            </h3>
            <span class="m-result__date">
              {{ formatDate(bestResults[i].item.published_at) }}
            </span>
          </router-link>
        </article>
      </div>
      <p
        class="m-not-found align-center"
        v-if="searchTerm && !bestResults.length"
      >
        {{ "No results for your search, try something different." }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Vue, Watch } from "vue-property-decorator";
import Fuse from "fuse.js";
import { State } from "@/types";
import { PostOrPage } from "@tryghost/content-api";
import { getFEUrlPath, formatDate } from "@/utils";
import { CloseIcon, SearchIcon } from "@/components/assets/svgs";

@Component
export default class Search extends Vue {
  fuse: Fuse<PostOrPage> | null = null;

  results: Array<PostOrPage> | null = null;

  bestResults: any = null;

  searchTerm = "";

  showNoResultsText = false;

  allPosts: any = null;

  getFEUrlPath = getFEUrlPath;

  formatDate = formatDate;

  $refs!: {
    searchInput: HTMLInputElement;
  };

  get hasBestResults(): boolean {
    if (this.bestResults) {
      return !!this.bestResults.length;
    }
    return false;
  }

  get isSearchOpen(): boolean {
    return (this.$store.state as State).isSearchOpen;
  }

  fuseOptions = {
    shouldSort: true,
    ignoreLocation: true,
    findAllMatches: true,
    includeScore: true,
    minMatchCharLength: 2,
    keys: ["title", "custom_excerpt", "tags.name"],
  };

  onSearchClose(): void {
    this.$store.commit("SET_SEARCH_OPEN_VALUE", false);
  }

  async getThePosts(): Promise<void> {
    await (this.$store.state as State).api?.posts
      .browse({
        limit: "all",
        include: "tags",
        fields: "id, title, url, published_at, custom_excerpt",
      })
      .then((posts) => {
        let allPosts: PostOrPage[] = [];
        for (let i = 0, len = posts.length; i < len; i++) {
          allPosts.push(posts[i]);
        }

        this.fuse = new Fuse(allPosts, this.fuseOptions);

        this.allPosts = allPosts;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  @Watch("isSearchOpen", { immediate: true })
  onSearchModalVisibilityChange(val: boolean): void {
    const body = document.querySelector("body");
    if (val) {
      setTimeout(() => {
        this.$refs.searchInput.focus();
      }, 300);

      this.getThePosts();
      body?.classList.add("no-scroll-y");
      this.searchTerm = "";
      return;
    }

    body?.classList.remove("no-scroll-y");
  }

  @Watch("searchTerm", { immediate: true })
  onSearch(term: string): void {
    if (term && this.fuse) {
      const searchResults = this.fuse.search(term);
      const bestResults = searchResults.filter((result) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((result as any).score <= 0.5) {
          return result;
        }
      });

      this.bestResults = bestResults;
    }
  }

  CloseIcon = CloseIcon;

  SearchIcon = SearchIcon;
}
</script>
