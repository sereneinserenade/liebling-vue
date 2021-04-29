<template>
  <!-- {{!-- If the template in question has a background image, then we render responsive image styles for it, and apply those styles to the <header> tag. --}} -->
  <section v-if="bgUrl" class="m-hero with-picture" data-aos-not-now="fade">
    <div class="m-hero__picture" :class="{ 'in-post': isInsidePost }">
      <img
        :srcset="generateSrcSet(bgUrl)"
        sizes="(max-width: 600px) 600px, (max-width: 1000px) 1000px, 2000px"
        :src="getImageUrlForSize(bgUrl, 'l')"
        alt=""
      />
    </div>

    <slot name="heroContent"></slot>
  </section>
  <section v-else class="m-hero no-picture" data-aos-not-now="fade">
    <!-- :class="{ 'in-post': isInsidePost }" -->
    <slot name="heroContent"></slot>
  </section>
</template>

<script lang="ts">
import { State } from "@/types";
import { generateSrcSet, getImageUrlForSize } from "@/utils";

import { Component, Vue, Prop } from "vue-property-decorator";
import { Settings } from "@tryghost/content-api";

@Component
export default class Hero extends Vue {
  @Prop({ type: String, default: "" }) bgUrl!: string;

  get settings(): Settings | null {
    return (this.$store.state as State).settings ?? {};
  }

  get isInsidePost(): boolean {
    return !!(this.$store.state as State).currentPost;
  }

  generateSrcSet = generateSrcSet;

  getImageUrlForSize = getImageUrlForSize;
}
</script>
