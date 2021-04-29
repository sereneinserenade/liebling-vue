<template>
  <!-- {{!--
This pagination template is used to navigate through newer and older articles.
--}} -->

  <div class="l-wrapper">
    <nav class="m-pagination" aria-label="Pagination">
      <router-link
        v-if="prev"
        :to="getFEUrlPath(prevPageUrl)"
        class="m-icon-button filled in-pagination-left"
        aria-label="Newer posts"
      >
        <inline-svg :src="LeftRayIcon" />
      </router-link>
      <span class="m-pagination__text">Page {{ page }} of {{ pages }}</span>
      <router-link
        v-if="next"
        :to="getFEUrlPath(nextPageUrl)"
        class="m-icon-button filled in-pagination-right"
        aria-label="Older posts"
      >
        <inline-svg :src="RightRayIcon" />
      </router-link>
    </nav>
  </div>
</template>

<script lang="ts">
import { Nullable, State } from "@/types";
import { Component, Vue } from "vue-property-decorator";
import { LeftRayIcon, RightRayIcon } from "@/components/assets/svgs";
import { getFEUrlPath } from "@/utils";

@Component
export default class Pagination extends Vue {
  getFEUrlPath = getFEUrlPath;

  get url(): string | undefined {
    return (this.$store.state as State).settings?.url;
  }

  get prev(): Nullable<number> | undefined {
    return (this.$store.state as State).pagination?.prev;
  }

  get next(): Nullable<number> | undefined {
    return (this.$store.state as State).pagination?.next;
  }

  get page(): number | undefined {
    return (this.$store.state as State).pagination?.page;
  }

  get pages(): number | undefined {
    return (this.$store.state as State).pagination?.pages;
  }

  get nextPageUrl(): string | undefined {
    const next = (this.$store.state as State).pagination?.next;

    return this.url + "page/" + next;
  }

  get prevPageUrl(): string | undefined {
    const prev = (this.$store.state as State).pagination?.prev;

    return this.url + "page/" + prev;
  }

  LeftRayIcon = LeftRayIcon;

  RightRayIcon = RightRayIcon;
}
</script>
