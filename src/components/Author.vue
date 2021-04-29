<template>
  <main class="main-wrap" v-if="author">
    <!-- {{!-- Everything inside the #author tags pulls data from the author --}} -->
    <!-- {{!-- Inject styles of the hero image to make it responsive --}} -->
    <!-- {{> hero background=cover_image}} -->
    <Hero :bgUrl="author.cover_image">
      <template #heroContent>
        <div class="m-hero__content" data-aos-not-now="fade-down">
          <div
            v-if="author.profile_image"
            class="m-hero-avatar"
            :style="`background-image: url(${author.profile_image});`"
          ></div>
          <div
            v-else
            class="m-hero-avatar"
            :style="`background-image: url(${DefaultAvatarSquareNormal});`"
          ></div>
          <h1 class="m-hero-title">{{ author.name }}</h1>
          <p v-if="author.bio" class="m-hero-description">{{ author.bio }}</p>
          <div class="m-hero__meta">
            <ul
              v-if="author.twitter || author.facebook || author.website"
              class="m-hero-social"
            >
              <li v-if="author.website">
                <a
                  :href="author.website"
                  target="_blank"
                  rel="noopener"
                  aria-label="Website"
                >
                  <inline-svg :src="EarthIcon" />
                  <!-- <span class="icon-globe"></span> -->
                </a>
              </li>
              <li v-if="author.facebook">
                <a
                  :href="`https://facebook.com/${author.facebook}`"
                  target="_blank"
                  rel="noopener"
                  aria-label="Facebook"
                >
                  <inline-svg :src="FaceBookIcon" />
                  <!-- <span class="icon-facebook"></span> -->
                </a>
              </li>
              <li v-if="author.twitter">
                <a
                  :href="`https://twitter.com/${author.twitter}`"
                  target="_blank"
                  rel="noopener"
                  aria-label="Twitter"
                >
                  <inline-svg :src="TwitterIcon" />
                  <!-- <span class="icon-twitter"></span> -->
                </a>
              </li>
            </ul>
            <ul class="m-hero-stats">
              <li>
                <!-- TODO: set posts by author -->
                <!-- {{plural ../pagination.total empty=(t "No posts") singular=(t "1 post") plural=(t "% posts")}} -->
              </li>
              <template v-if="author.location">
                <li>&bull;</li>
                <li>{{ author.location }}</li>
              </template>
            </ul>
          </div>
        </div>
      </template>
    </Hero>
    <!-- </section> -->

    <div class="l-content">
      <div class="l-wrapper" data-aos-not-now="fade-up" data-aos-delay="300">
        <div class="l-grid centered">
          <article
            v-for="(post, i) in postsByAuthor"
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
          <div
            v-if="!postsByAuthor.length"
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
      <!-- TODO: render the actual component here {{ pagination }} -->
    </div>
  </main>
</template>

<script lang="ts">
import { Hero, Loop } from "@/components";
import { Component, Vue } from "vue-property-decorator";
import { State, PostOrPage } from "@/types";
import {
  getAssetUrl,
  getImageUrlForSize,
  getTimeDifferenceString,
  getFEUrlPath,
} from "@/utils";
import { Author as AuthorType } from "@tryghost/content-api";
import { DefaultAvatarSquareNormal } from "@/components/assets/images";
import {
  EarthIcon,
  FaceBookIcon,
  TwitterIcon,
  StarIcon,
} from "@/components/assets/svgs";

@Component({
  components: {
    Hero,
    Loop,
  },
})
export default class Author extends Vue {
  postsByAuthor: PostOrPage[] = [];

  get author(): AuthorType | null {
    return (this.$store.state as State).currentAuthor;
  }

  mounted(): void {
    const authorSlug: string = this.$route.params.authorSlug;

    if (authorSlug) {
      setTimeout(async () => {
        const author = (this.$store.state as State)?.authors?.find(
          (a) => a.slug === authorSlug
        );

        this.$store.commit("SET_CURRENT_AUTHOR", author);

        await (this.$store.state as State).api?.posts
          .browse({
            limit: "all",
            include: ["tags", "authors"],
          })
          .then((posts) => {
            // debugger;
            this.postsByAuthor = [...posts].filter((post) => {
              if (
                post.authors?.find(
                  (postAuthor) => postAuthor.slug === authorSlug
                )
              ) {
                return true;
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }, 1000);
    }
  }

  primaryAuthorFEUrl(post: PostOrPage): string {
    return getFEUrlPath(`${post?.primary_author?.url}`) || "";
  }

  getAssetUrl = getAssetUrl;

  getImageUrlForSize = getImageUrlForSize;

  getFEUrlPath = getFEUrlPath;

  getTimeDifferenceString = getTimeDifferenceString;

  DefaultAvatarSquareNormal = DefaultAvatarSquareNormal;

  EarthIcon = EarthIcon;

  FaceBookIcon = FaceBookIcon;

  TwitterIcon = TwitterIcon;

  StarIcon = StarIcon;
}
</script>
