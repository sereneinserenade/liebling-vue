<template>
  <!-- {{!-- The template below includes the markup for each post --}} -->

  <span v-if="posts.length">
    <div
      v-for="(post, i) in posts"
      :key="`${i}-recommendedPost`"
      class="m-recommended-slider__item glide__slide"
    >
      <article
        class="m-article-card"
        :class="{
          featured: post.featured,
          post: !post.featured,
          'no-picture': !post.feature_image,
        }"
      >
        <div class="m-article-card__picture">
          <a
            :href="post.url"
            class="m-article-card__picture-link"
            aria-hidden="true"
            tabindex="-1"
          >
          </a>
          <img
            v-if="post.feature_image"
            class="m-article-card__picture-background"
            :src="getImageUrlForSize(post.feature_image, 'm')"
            loading="lazy"
            alt=""
          />
          <a
            :href="post.primary_author.url"
            class="m-article-card__author"
            :aria-label="post.primary_author.name"
            :content="`Posted by ${post.primary_author.name}`"
            v-tippy
          >
            <!-- {{authors autolink="false" from="2" prefix=(t "Among with") separator=" , "}} TODO: handle this -->
            <div
              v-if="post.primary_author.profile_image"
              :style="`background-image: url(${getImageUrlForSize(
                post.primary_author.profile_image,
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
            v-if="post.featured"
            :href="post.url"
            class="m-article-card__featured"
            aria-label="Featured"
          >
            <inline-svg :src="StarIcon" content="Featured" v-tippy />
          </a>
        </div>

        <div v-if="post.primary_tag" class="m-article-card__info">
          <a :href="post.primary_tag.url" class="m-article-card__tag">{{
            post.primary_tag.name
          }}</a>
          <div class="m-article-card__info no-tag">
            <a
              :href="post.url"
              class="m-article-card__info-link"
              :aria-label="post.title"
            >
              <div>
                <h2
                  class="m-article-card__title"
                  :class="{
                    '-no-image': post.feature_image,
                  }"
                  :title="post.title"
                >
                  {{ post.title }}
                </h2>
              </div>
              <div class="m-article-card__timestamp">
                <span>{{ getTimeDifferenceString(post.published_at) }}</span>
                <span>&bull;</span>
                <span>{{ post.reading_time + "min read" }}</span>
              </div>
            </a>
          </div>
        </div>
      </article>
    </div>
  </span>

  <div v-else class="m-recommended-slider__item glide__slide">
    <div class="m-heading no-margin">
      <h3>No posts found</h3>
      <p>
        {{ "Apparently there are no posts at the moment, check again later." }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import {
  getImageUrlForSize,
  getAssetUrl,
  getTimeDifferenceString,
} from "@/utils";
import { Component, Vue, Prop } from "vue-property-decorator";
import { PostOrPage } from "@tryghost/content-api";
import { StarIcon } from "@/components/assets/svgs";

@Component
export default class Loop extends Vue {
  @Prop({ type: Array, default: () => [] }) posts!: PostOrPage;

  getAssetUrl = getAssetUrl;

  getImageUrlForSize = getImageUrlForSize;

  getTimeDifferenceString = getTimeDifferenceString;

  StarIcon = StarIcon;
}
</script>
