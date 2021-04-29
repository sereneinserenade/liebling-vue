<template>
  <div v-if="featuredPostsLength" class="m-featured-slider glide">
    <div class="glide__track" data-glide-el="track">
      <div class="m-featured-slider__list glide__slides">
        <div class="m-featured-slider__list__item glide__slide">
          <article
            class="m-featured-article"
            :class="{ 'no-picture': !currentPost.feature_image }"
          >
            <div class="m-featured-article__picture">
              <div
                v-if="currentPost.feature_image"
                class="featured-bg-page-vue"
                :style="`--data-image-l: url('${getImageUrlForSize(
                  currentPost.feature_image,
                  'l'
                )}');--data-image-m: url('${getImageUrlForSize(
                  currentPost.feature_image,
                  'm'
                )}');`"
              ></div>
            </div>
            <div class="m-featured-article__meta">
              <a
                :href="currentPost.primary_author.url"
                class="m-featured-article__author"
                :aria-label="currentPost.primary_author.name"
                :content="`Posted by ${currentPost.primary_author.name}`"
                v-tippy
              >
                <!-- TODO: tackle this :data-tippy-content="`Posted by {{primary_author.name}} {{authors autolink="false" from="2" prefix=(t "Among with") separator=" , "}}`" -->
                <div
                  v-if="currentPost.primary_author.profile_image"
                  :style="`background-image: url(${getImageUrlForSize(
                    currentPost.primary_author.profile_image,
                    'xs'
                  )});`"
                ></div>
                <div
                  v-else
                  :style="`background-image: url(${getAssetUrl(
                    'images/default-avatar-square-small.jpg'
                  )});`"
                ></div>
              </a>
              <a
                v-if="currentPost.primary_tag"
                :href="currentPost.primary_tag.url"
                class="m-featured-article__tag"
                >{{ currentPost.primary_tag.name }}</a
              >
            </div>
            <div class="m-featured-article__ribbon">
              <inline-svg :src="StarIcon" />
              <span>{{ "Featured" }}</span>
            </div>
            <router-link
              :to="getFEUrlPath(currentPost.url)"
              class="m-featured-article__content"
            >
              <h2 class="m-featured-article__title" :title="currentPost.title">
                {{ currentPost.title }}
              </h2>
              <div class="m-featured-article__timestamp">
                <span>{{
                  getTimeDifferenceString(currentPost.published_at)
                }}</span>
                <span>&bull;</span>
                <span>{{ currentPost.reading_time + "min read" }}</span>
              </div>
            </router-link>
          </article>
        </div>
      </div>
    </div>
    <div
      data-glide-el="controls"
      class="glide__arrows r-controls"
      v-if="featuredPostsLength"
    >
      <button
        data-glide-dir="<"
        class="m-icon-button in-featured-articles glide-prev r-previous"
        aria-label="Previous"
        :disabled="!canGoPrev"
        @click="prevPost"
      >
        <inline-svg :src="LeftRayIcon" />
      </button>
      <button
        data-glide-dir=">"
        class="m-icon-button in-featured-articles glide-next r-next"
        aria-label="Next"
        :disabled="!canGoNext"
        @click="nextPost"
      >
        <inline-svg :src="RightRayIcon" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import {
  getImageUrlForSize,
  getAssetUrl,
  getTimeDifferenceString,
  getFEUrlPath,
} from "@/utils";
import { StarIcon, RightRayIcon, LeftRayIcon } from "@/components/assets/svgs";
import { Glide, GlideSlide } from "vue-glide-js";
import { PostOrPage } from "@/types";

@Component({
  [Glide.name]: Glide,
  [GlideSlide.name]: GlideSlide,
})
export default class FeaturedPosts extends Vue {
  @Prop({ default: () => [], type: Array }) featuredPosts!: PostOrPage[];

  currentPostIndex = 0;

  get canGoNext(): boolean {
    const nextIndex = this.currentPostIndex + 1;
    return this.isValidIndex(nextIndex);
  }

  get canGoPrev(): boolean {
    const prevIndex = this.currentPostIndex - 1;

    return this.isValidIndex(prevIndex);
  }

  get featuredPostsLength(): number {
    return this.featuredPosts?.length || 0;
  }

  get currentPost(): PostOrPage | null {
    if (
      this.currentPostIndex + 1 > 0 &&
      this.currentPostIndex <= this.featuredPostsLength &&
      this.featuredPosts?.length
    ) {
      return this.featuredPosts[this.currentPostIndex];
    }

    return null;
  }

  isValidIndex(index: number): boolean {
    if (this.featuredPosts) {
      if (-1 < index && index < this.featuredPosts.length) {
        return true;
      }
    }
    return false;
  }

  nextPost(): void {
    this.currentPostIndex = this.currentPostIndex + 1;
  }

  prevPost(): void {
    this.currentPostIndex = this.currentPostIndex - 1;
  }

  getImageUrlForSize = getImageUrlForSize;

  getAssetUrl = getAssetUrl;

  getFEUrlPath = getFEUrlPath;

  getTimeDifferenceString = getTimeDifferenceString;

  StarIcon = StarIcon;

  RightRayIcon = RightRayIcon;

  LeftRayIcon = LeftRayIcon;
}
</script>

<style lang="scss">
.m-featured-article__ribbon {
  svg {
    transform: scale(0.7);
  }
}
</style>
