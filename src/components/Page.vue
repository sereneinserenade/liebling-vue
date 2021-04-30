<template>
  <main class="main-wrap">
    <!-- {{!-- Inject styles of the hero image to make it responsive --}} -->
    <Hero :bgUrl="settings.cover_image">
      <template #heroContent>
        <div
          class="m-hero__content top-gainers-losers"
          data-aos-not-now="fade-down"
        >
          <TopGainersLosers />
          <!-- <h1 class="m-hero-title bigger">{{ settings.title }}</h1>
          <p v-if="settings.description" class="m-hero-description bigger">
            {{ settings.description }}
          </p> -->
        </div>
      </template>
    </Hero>

    <div class="l-content">
      <div class="l-wrapper" data-aos-not-now="fade-up" data-aos-delay="300">
        <div class="l-grid centered">
          <featured-posts :featuredPosts="featuredPosts" />
          <!-- {{!-- The tag below iterates over all the posts --}} -->
          <template v-if="hasPostsLength">
            <article
              v-for="(post, i) in posts"
              :key="`${i}-recommendedPost`"
              class="m-article-card"
              :class="{
                featured: post.featured,
                post: !post.featured,
                'no-picture': !post.feature_image,
              }"
            >
              <div class="m-article-card__picture">
                <router-link
                  :to="getFEUrlPath(post.url)"
                  class="m-article-card__picture-link"
                  aria-hidden="true"
                  tabindex="-1"
                >
                </router-link>
                <img
                  v-if="post.feature_image"
                  class="m-article-card__picture-background"
                  :src="getImageUrlForSize(post.feature_image, 'm')"
                  loading="lazy"
                  alt=""
                />
                <router-link
                  :to="primaryAuthorFEUrl(post)"
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
                </router-link>

                <router-link
                  v-if="post.featured"
                  :to="getFEUrlPath(post.url)"
                  class="m-article-card__featured"
                  content="Featured"
                  aria-label="Featured"
                  v-tippy
                >
                  <inline-svg :src="StarIcon" />
                </router-link>
              </div>

              <div class="m-article-card__info">
                <a
                  v-if="post.primary_tag"
                  :href="post.primary_tag.url"
                  class="m-article-card__tag"
                  >{{ post.primary_tag.name }}</a
                >
                <div class="m-article-card__info no-tag">
                  <router-link
                    :to="getFEUrlPath(post.url)"
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
                      <span>{{
                        getTimeDifferenceString(post.published_at)
                      }}</span>
                      <span>&bull;</span>
                      <span>{{ post.reading_time + "min read" }}</span>
                    </div>
                  </router-link>
                </div>
              </div>
            </article>
          </template>
          <!-- <Loop :posts="posts" /> -->
          <div
            v-if="!hasPostsLength"
            class="m-recommended-slider__item glide__slide"
          >
            <div class="m-heading no-margin">
              <h3>No posts found</h3>
              <p>
                {{
                  "Apparently there are no posts at the moment, check again later."
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- {{!-- Links to Previous/Next posts --}} -->
      <Pagination />
    </div>
  </main>
</template>

<script lang="ts">
import { PostOrPage, State } from "@/types";
import {
  Pagination,
  Loop,
  Hero,
  FeaturedPosts,
  TopGainersLosers,
} from "@/components";
import {
  getImageUrlForSize,
  getAssetUrl,
  getTimeDifferenceString,
  getFEUrlPath,
} from "@/utils";
import { Settings, Pagination as PaginationType } from "@tryghost/content-api";
import { StarIcon } from "@/components/assets/svgs";

import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    TopGainersLosers,
    FeaturedPosts,
    Pagination,
    Loop,
    Hero,
  },
})
export default class Page extends Vue {
  get showNoPostText(): boolean {
    return !!this.posts?.length;
  }

  get settings(): Settings | null {
    return (this.$store.state as State).settings ?? {};
  }

  get posts(): Array<PostOrPage> | null {
    return (this.$store.state as State).posts || null;
  }

  get featuredPosts(): Array<PostOrPage> | null {
    return (this.$store.state as State).featuredPosts || [];
  }

  get hasPostsLength(): boolean {
    return !!this.posts?.length;
  }

  get pagination(): PaginationType | null {
    return (this.$store.state as State)?.pagination || null;
  }

  primaryAuthorFEUrl(post: PostOrPage): string {
    return getFEUrlPath(`${post?.primary_author?.url}`) || "";
  }

  mounted(): void {
    this.$store.commit("SET_CURRENT_POST", null);
    this.$store.commit("SET_CURRENT_AUTHOR", null);

    setTimeout(async () => {
      const pageNumber = this.$route.params.pageNumber;
      await this.$store.dispatch("getPostsTillPage", pageNumber);
    }, 300);
  }

  getImageUrlForSize = getImageUrlForSize;

  getAssetUrl = getAssetUrl;

  getTimeDifferenceString = getTimeDifferenceString;

  StarIcon = StarIcon;

  getFEUrlPath = getFEUrlPath;
}
</script>

<style lang="scss">
.m-hero__content.top-gainers-losers {
  text-align: start;
}

.m-article-card__featured {
  svg {
    transform: scale(0.7);
  }
}

.featured-bg-page-vue {
  background-image: var(--data-image-l);
}

@media (max-width: 768px) {
  .featured-bg-page-vue {
    background-image: var(--data-image-m);
  }
}

.l-grid {
  padding-bottom: 20px;
}
@media only screen and (min-width: 48rem) {
  .l-grid {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px;
  }
}
@media only screen and (min-width: 80rem) {
  .l-grid {
    margin: 0 -20px;
  }
}
@media only screen and (min-width: 48rem) {
  .l-grid.centered {
    justify-content: center;
  }
}
.m-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 40px;
}
.m-pagination__text {
  display: inline-block;
  color: var(--titles-color);
  letter-spacing: 0.2px;
  text-align: center;
  font-size: 0.875rem;
}
@media only screen and (min-width: 48rem) {
  .m-pagination__text {
    letter-spacing: 0.3px;
    font-size: 1rem;
  }
}
</style>
