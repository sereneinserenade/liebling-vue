<template>
  <main class="main-wrap" v-if="post">
    <hero v-if="post.feature_image" :bgUrl="post.feature_image" />
    <hero v-if="isCurrentUrlPage" :bgUrl="post.feature_image">
      <template #heroContent v-if="isCurrentUrlPage">
        <div class="m-hero__content" data-aos-not-now="fade-down">
          <h1 class="m-hero-title bigger">{{ post.title }}</h1>
        </div>
      </template>
    </hero>

    <article v-if="!isCurrentUrlTagsPage">
      <div class="l-content in-post">
        <!-- {{!-- Everything inside the #post tags pulls data from the post --}} -->
        <!-- {{#post}} -->
        <div
          class="l-wrapper in-post js-aos-wrapper"
          data-aos-not-now="fade-up"
          :class="{ 'no-image': !post.feature_image }"
          data-aos-not-now-delay="300"
        >
          <div class="l-post-content js-progress-content">
            <header class="m-heading" v-if="!isCurrentUrlPage">
              <h1 class="m-heading__title in-post">{{ post.title }}</h1>
              <div class="m-heading__meta">
                <router-link
                  v-if="post.primary_tag"
                  :to="getFEUrlPath(post.primary_tag.url)"
                  class="m-heading__meta__tag"
                >
                  {{ post.primary_tag.name }}
                </router-link>
                <span
                  v-if="post.primary_tag"
                  class="m-heading__meta__divider"
                  aria-hidden="true"
                >
                  &bull;
                </span>
                <span class="m-heading__meta__time">
                  {{ formatDate(post.published_at) }}
                </span>
              </div>
            </header>
            <div class="pos-relative js-post-content">
              <div v-if="!isCurrentUrlPage" class="m-share">
                <div class="m-share__content js-sticky">
                  <a
                    :href="`https://www.facebook.com/sharer/sharer.php?u=${post.url}`"
                    class="m-icon-button filled in-share"
                    target="_blank"
                    rel="noopener"
                    aria-label="Facebook"
                  >
                    <inline-svg :src="FaceBookIcon" />
                    <!-- <span class="icon-facebook" aria-hidden="true"></span> -->
                  </a>
                  <a
                    :href="`https://twitter.com/intent/tweet?text=${post.title}&url=${post.url}`"
                    class="m-icon-button filled in-share"
                    target="_blank"
                    rel="noopener"
                    aria-label="Twitter"
                  >
                    <inline-svg :src="TwitterIcon" />
                    <!-- <span class="icon-twitter" aria-hidden="true"></span> -->
                  </a>
                  <button
                    class="m-icon-button filled in-share progress"
                    aria-label="Scroll to top"
                    @click="scrollToTop"
                  >
                    <inline-svg class="arrow-up-svg" :src="ArrowUpIcon" />
                    <svg aria-hidden="true" class="svg-js-progress">
                      <circle
                        class="progress-ring__circle js-progress"
                        fill="transparent"
                        r="0"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <span v-html="post.html"> </span>

              <section
                v-if="hasPostTags && !isCurrentUrlPage"
                class="m-tags in-post"
              >
                <h3 class="m-submenu-title">{{ "Tags" }}</h3>
                <ul>
                  <li v-for="tag in post.tags" :key="`${tag.name}-tag-in-post`">
                    <a :href="tag.url" :title="tag.name">{{ tag.name }}</a>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
        <!-- {{!-- Email subscribe form at the bottom of the page --}} -->
        <!-- <section class="m-subscribe-section js-newsletter">
          <div class="l-wrapper in-post">
            <div class="m-subscribe-section__content">
              <div class="m-subscribe-section__text">
                <h4 class="m-subscribe-section__title">
                  {{ "Subscribe to our newsletter" }}
                </h4>
                <p class="m-subscribe-section__description">
                  {{ "Get the latest posts delivered right to your inbox." }}
                </p>
              </div>
              TODO: take care of this newsletter form
                <div class="m-subscribe-section__form">
                {{> "newsletter-form"}}
              </div>
            </div>
          </div>
        </section> -->
        <section v-if="!isCurrentUrlPage" class="m-author">
          <div class="m-author__content">
            <div class="m-author__picture">
              <router-link
                :to="getFEUrlPath(post.primary_author.url)"
                class="m-author-picture"
                :aria-label="post.primary_author.name"
              >
                <div
                  v-if="post.primary_author.profile_image"
                  :style="`background-image: url('${post.primary_author.profile_image}');`"
                ></div>
                <div
                  v-else
                  :style="`background-image: url('${getAssetUrl(
                    'images/default-avatar-square-small.jpg'
                  )}');`"
                ></div>
              </router-link>
            </div>
            <div class="m-author__info">
              <h4 class="m-author__name">
                <router-link :to="getFEUrlPath(post.primary_author.url)">
                  {{ post.primary_author.name }}
                </router-link>
              </h4>
              <p
                v-if="hasPostAuthors > 1"
                class="m-small-text in-author-along-with"
              >
                {{
                  post.authors.length.map((author) => author.name).join(", ")
                }}
              </p>
              <p v-if="post.primary_author.bio" class="m-author__bio">
                {{ post.primary_author.bio }}
              </p>
              <ul class="m-author-links">
                <li v-if="post.primary_author.website">
                  <a
                    :href="post.primary_author.website"
                    target="_blank"
                    rel="noopener"
                    aria-label="Website"
                  >
                    <inline-svg :src="EarthIcon" />
                    <!-- <span class="icon-globe" aria-hidden="true"></span> -->
                  </a>
                </li>
                <li v-if="post.primary_author.facebook">
                  <a
                    :href="`https://facebook.com/${post.primary_author.facebook}`"
                    target="_blank"
                    rel="noopener"
                    aria-label="Facebook"
                  >
                    <inline-svg :src="FaceBookIcon" />
                    <!-- <span class="icon-facebook" aria-hidden="true"></span> -->
                  </a>
                </li>
                <li v-if="post.primary_author.twitter">
                  <a
                    :href="`https://twitter.com/${post.primary_author.twitter}`"
                    target="_blank"
                    rel="noopener"
                    aria-label="Twitter"
                  >
                    <inline-svg :src="TwitterIcon" />
                    <!-- <span class="icon-twitter" aria-hidden="true"></span> -->
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <!-- {{!-- If you want to embed comments, this is a good place to do it! --}}
        {{!--
          <section class="m-comments">
            <div class="m-load-comments__iframe l-wrapper in-comments js-comments-iframe">
              <div id="disqus_thread"></div>
              <script>
                var disqus_config = function () {
                  this.page.url = "{{url absolute="true"}}";
                  this.page.identifier = "ghost-{{comment_id}}"
                };
                (function () {
                  var d = document, s = d.createElement('script');
                  s.src = 'https://CHANGETHIS.disqus.com/embed.js';
                  s.setAttribute('data-timestamp', +new Date());
                  (d.head || d.body).appendChild(s);
                })();
              </script>
            </div>
          </section>
        --}} -->
        <!-- {{/post}} -->
        <!-- {{!-- Related posts --}} -->
        <!-- {{#if post.tags.length}} -->
        <!-- {{#get "posts" limit="3" filter="tags:[{{post.tags}}]+id:-{{post.id}}" include="tags,authors" as |related|}} -->
        <section v-if="hasPostTags && !isCurrentUrlPage" class="m-recommended">
          <div class="l-wrapper in-recommended">
            <h3 class="m-section-title in-recommended">
              {{ "Recommended for you" }}
            </h3>
            <div class="m-recommended-articles">
              <div class="m-recommended-slider glide js-recommended-slider">
                <div class="glide__track" data-glide-el="track">
                  <div class="glide__slides">
                    <!-- {{!-- The tag below iterates over all the related posts --}} -->
                    <!-- {{> "loop"}} -->
                  </div>
                </div>
                <div data-glide-el="controls" class="glide__arrows js-controls">
                  <button
                    data-glide-dir="<"
                    class="m-icon-button filled in-recommended-articles glide-prev"
                    aria-label="Previous"
                  >
                    <span class="icon-arrow-left" aria-hidden="true"></span>
                  </button>
                  <button
                    data-glide-dir=">"
                    class="m-icon-button filled in-recommended-articles glide-next"
                    aria-label="Next"
                  >
                    <span class="icon-arrow-right" aria-hidden="true"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section v-else-if="!isCurrentUrlPage" class="m-recommended">
          <div class="l-wrapper in-recommended">
            <h3 class="m-section-title in-recommended">
              {{ "Recommended for you" }}
            </h3>
            <div class="m-recommended-articles">
              <div class="m-recommended-slider glide js-recommended-slider">
                <div class="glide__track" data-glide-el="track">
                  <div class="glide__slides">
                    <div class="m-recommended-slider__item glide__slide">
                      <div class="m-heading no-margin">
                        <h3>{{ "No posts found" }}</h3>
                        <p>
                          {{
                            "Apparently there are no posts at the moment, check again later."
                          }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>

    <div class="l-content" v-else-if="isCurrentUrlTagsPage && tags.length">
      <div class="l-wrapper" data-aos-not-now="fade-up" data-aos-delay="300">
        <div class="l-tags-container">
          <!-- {{#get 'tags' limit='all' include='count.posts'}}
          {{#foreach tags}} -->
          <div
            v-for="(tag, i) in tags"
            :key="`${i}-tags-page-tag`"
            class="m-tag-card"
          >
            <router-link
              :to="getFEUrlPath(tag.url)"
              class="m-tag-card__link"
              :class="{ 'no-picture': !tag.feature_image }"
              :aria-label="tag.name"
            >
              <!-- {{#if feature_image}} -->
              <img
                v-if="tag.feature_image"
                class="m-tag-card__picture"
                :src="getImageUrlForSize(tag.feature_image, 'm')"
                loading="lazy"
                alt=""
              />
              <!-- {{/if}} -->
              <div
                class="m-tag-card__info"
                :class="{ 'no-picture': !tag.feature_image }"
              >
                <h4 class="m-tag-card__name">{{ tag.name }}</h4>
                <span class="m-tag-card__counter">
                  {{
                    tag.count.posts
                      ? tag.count.posts === "1"
                        ? `1 post`
                        : `${tag.count.posts} posts`
                      : "No posts"
                  }}
                </span>
              </div>
            </router-link>
          </div>
          <p class="m-not-found" v-if="!tags.length">
            {{ "No tags found :(" }}
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Vue } from "vue-property-decorator";
import {
  FaceBookIcon,
  TwitterIcon,
  ArrowUpIcon,
  EarthIcon,
} from "@/components/assets/svgs";
// import { getAssetUrl, formatDate, isMobile } from "@/utils";
import {
  getAssetUrl,
  formatDate,
  getFEUrlPath,
  getImageUrlForSize,
} from "@/utils";
import { PostOrPage } from "@tryghost/content-api";
import { State, Tag } from "@/types";
import { Hero } from "@/components/partials";

@Component({
  components: {
    Hero,
  },
})
export default class Post extends Vue {
  getAssetUrl = getAssetUrl;

  getFEUrlPath = getFEUrlPath;

  getImageUrlForSize = getImageUrlForSize;

  formatDate = formatDate;

  FaceBookIcon = FaceBookIcon;

  TwitterIcon = TwitterIcon;

  ArrowUpIcon = ArrowUpIcon;

  EarthIcon = EarthIcon;

  get post(): PostOrPage | null {
    return (this.$store.state as State).currentPost || null;
  }

  get hasPostTags(): boolean {
    return !!this.post?.tags?.length;
  }

  get hasPostAuthors(): boolean {
    return !!this.post?.authors?.length;
  }

  get isCurrentUrlPage(): boolean {
    return (this.$store.state as State).isCurrentUrlPage;
  }

  get idOrSlug(): string {
    return this.$route.params.postSlug;
  }

  get isCurrentUrlTagsPage(): boolean {
    return this.$route.params.postSlug === "tags";
  }

  get tags(): Tag[] | null | [] {
    return (
      (this.$store.state as State).tags?.filter(
        (tag) => tag.visibility !== "internal"
      ) || []
    );
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  // calculatePosition(): void {
  //   const progressCircle: any = document.querySelector(".js-progress");
  //   const progressCircleSvg: SVGElement | any = document.querySelector(
  //     ".svg-js-progress"
  //   );

  //   if (!progressCircle || !progressCircleSvg) return;
  //   const svgWidth = progressCircleSvg.clientWidth;
  //   const radiusCircle = svgWidth / 2;
  //   const borderWidth = isMobile() ? 2 : 3;

  //   progressCircleSvg.attr("viewBox", `0 0 ${svgWidth} ${svgWidth}`);
  //   progressCircle.attr("stroke-width", borderWidth);
  //   progressCircle.attr("r", radiusCircle - (borderWidth - 1));
  //   progressCircle.attr("cx", radiusCircle);
  //   progressCircle.attr("cy", radiusCircle);

  //   const circumference = radiusCircle * 2 * Math.PI;

  //   progressCircle[0].style.strokeDasharray = `${circumference} ${circumference}`;
  //   progressCircle[0].style.strokeDashoffset = circumference;
  // }

  async mounted(): Promise<void> {
    this.$store.commit("SET_CURRENT_AUTHOR", null);

    setTimeout(async () => {
      if (!this.post) {
        this.$store.dispatch("getPostWithIdOrSlug", this.idOrSlug);
        this.$store.dispatch("getPageWithIdOrSlug", this.idOrSlug);
      }
    }, 100);
  }
}
</script>

<style>
.arrow-up-svg {
  opacity: 1 !important;
  align-self: center;
  position: absolute;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%);
}
.hide {
  display: none;
}
.sr-only {
  clip: rect(0 0 0 0);
  -webkit-clip-path: inset(100%);
  clip-path: inset(100%);
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  white-space: nowrap;
}
.focusable:focus,
.l-post-content button:focus:not(.m-icon-button),
.m-button:focus {
  box-shadow: 0 0 0 2px var(--primary-subtle-color) !important;
}
.content-centered {
  display: flex;
  align-items: center;
  justify-content: center;
}
.l-post-content button:not(.m-icon-button),
.l-post-content input,
.l-post-content select,
.l-post-content textarea,
.m-button,
.m-input,
.no-appearance {
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  appearance: none !important;
}
.no-padding {
  padding: 0;
}
.no-margin {
  margin: 0;
}
.no-scroll-y {
  overflow-y: hidden;
}
.align-center {
  text-align: center;
}
.align-left {
  text-align: left;
}
.align-right {
  text-align: right;
}
.pos-relative {
  position: relative;
}
.pos-absolute {
  position: absolute;
}
.bold {
  font-weight: 700;
}
.underline {
  text-decoration: underline;
}
.uppercase {
  text-transform: uppercase;
}
.pointer {
  cursor: pointer;
}
.only-desktop {
  display: none;
}
@media only screen and (min-width: 48rem) {
  .only-desktop {
    display: block;
  }
}
.l-post-content {
  padding-bottom: 15px;
}
@media only screen and (min-width: 48rem) {
  .l-post-content {
    max-width: 820px;
    min-height: 400px;
    margin: 0 auto;
  }
}
@media only screen and (min-width: 48rem) and (min-width: 48rem) {
  .l-post-content {
    padding-bottom: 30px;
  }
}
.l-post-content h1,
.l-post-content h2,
.l-post-content h3,
.l-post-content h4,
.l-post-content h5,
.l-post-content h6 {
  color: var(--titles-color);
  line-height: 1.3;
  font-weight: 700;
  padding-top: 5px;
  margin: 0 0 30px;
}
@media only screen and (min-width: 48rem) {
  .l-post-content h1,
  .l-post-content h2,
  .l-post-content h3,
  .l-post-content h4,
  .l-post-content h5,
  .l-post-content h6 {
    padding-top: 10px;
    margin-bottom: 40px;
  }
}
.l-post-content h1 {
  font-size: 2.125rem;
}
@media only screen and (min-width: 48rem) {
  .l-post-content h1 {
    font-size: 2.625rem;
  }
}
.l-post-content h2 {
  font-size: 1.75rem;
}
@media only screen and (min-width: 48rem) {
  .l-post-content h2 {
    font-size: 2.25rem;
  }
}
.l-post-content h3 {
  font-size: 1.375rem;
}
@media only screen and (min-width: 48rem) {
  .l-post-content h3 {
    font-size: 1.75rem;
  }
}
.l-post-content h4 {
  font-size: 1rem;
}
@media only screen and (min-width: 48rem) {
  .l-post-content h4 {
    font-size: 1.375rem;
  }
}
.l-post-content h5 {
  font-size: 0.938rem;
}
@media only screen and (min-width: 48rem) {
  .l-post-content h5 {
    font-size: 1.125rem;
  }
}
.l-post-content h6 {
  font-size: 0.813rem;
}
@media only screen and (min-width: 48rem) {
  .l-post-content h6 {
    font-size: 1rem;
  }
}
.l-post-content p {
  letter-spacing: 0.2px;
  line-height: 1.5;
  font-size: 1.125rem;
  margin-bottom: 25px;
}
@media only screen and (min-width: 48rem) {
  .l-post-content p {
    letter-spacing: 0.3px;
    line-height: 1.6;
    font-size: 1.25rem;
    margin-bottom: 30px;
  }
}
.l-post-content p img {
  margin-bottom: 0 !important;
}
.l-post-content b,
.l-post-content strong {
  font-weight: 600;
}
.l-post-content em {
  font-style: italic;
}
.l-post-content a {
  color: var(--primary-foreground-color);
  text-decoration: underline;
  transition: color 0.2s linear;
}
.l-post-content a:hover {
  color: var(--link-color);
}
.l-post-content ol,
.l-post-content ul {
  letter-spacing: 0.2px;
  line-height: 1.5;
  font-size: 1.125rem;
  padding-left: 20px;
  margin: 0 0 20px;
}
@media only screen and (min-width: 48rem) {
  .l-post-content ol,
  .l-post-content ul {
    letter-spacing: 0.3px;
    line-height: 1.6;
    font-size: 1.25rem;
    padding-left: 40px;
    margin-bottom: 30px;
  }
}
.l-post-content li {
  margin-bottom: 20px;
}
.l-post-content .kg-image,
.l-post-content img {
  display: block;
  max-width: 100%;
  margin: 0 auto 35px;
}
@media only screen and (min-width: 48rem) {
  .l-post-content .kg-image,
  .l-post-content img {
    margin-bottom: 40px;
  }
}
.l-post-content iframe {
  max-width: 100%;
}
.l-post-content .fluid-width-video-wrapper {
  margin: 0 auto 35px;
}
@media only screen and (min-width: 48rem) {
  .l-post-content .fluid-width-video-wrapper {
    margin-bottom: 40px;
  }
}
.l-post-content.kg-image-card,
.l-post-content figure {
  padding: 20px 0 40px;
  margin: 0 -20px;
}
@media only screen and (min-width: 48rem) {
  .l-post-content.kg-image-card,
  .l-post-content figure {
    padding: 20px 0 50px;
    margin: 0;
  }
}
.l-post-content.kg-image-card.kg-embed-card,
.l-post-content figure.kg-embed-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100%;
  margin: 0 auto;
}
.l-post-content.kg-image-card.kg-embed-card iframe,
.l-post-content figure.kg-embed-card iframe {
  margin: 0 auto;
}
.l-post-content.kg-image-card.kg-width-full img,
.l-post-content.kg-image-card.kg-width-wide img,
.l-post-content figure.kg-width-full img,
.l-post-content figure.kg-width-wide img {
  width: 100%;
  height: auto;
}
@media only screen and (min-width: 80rem) {
  .l-post-content.kg-image-card.kg-width-wide,
  .l-post-content figure.kg-width-wide {
    margin: 0 -70px;
  }
}
@media only screen and (min-width: 48rem) {
  .l-post-content.kg-image-card.kg-width-full,
  .l-post-content figure.kg-width-full {
    width: 100vw;
    margin-left: 50%;
    transform: translateX(-50%);
  }
}
.l-post-content.kg-image-card .kg-image,
.l-post-content.kg-image-card img,
.l-post-content figure .kg-image,
.l-post-content figure img {
  display: block;
  width: auto;
  max-width: 100%;
  height: auto;
  margin: 0 auto;
}
.l-post-content.kg-image-card figcaption,
.l-post-content figure figcaption {
  text-align: center;
  letter-spacing: 0.1px;
  line-height: 1.3;
  font-size: 0.75rem;
  padding: 10px 20px 0;
}
@media only screen and (min-width: 48rem) {
  .l-post-content.kg-image-card figcaption,
  .l-post-content figure figcaption {
    font-size: 0.875rem;
    padding: 15px 0 0;
  }
}
.l-post-content.kg-image-card .fluid-width-video-container,
.l-post-content figure .fluid-width-video-container {
  flex-grow: 1;
  width: 100%;
}
.l-post-content.kg-image-card .fluid-width-video-wrapper,
.l-post-content figure .fluid-width-video-wrapper {
  margin: 0 auto !important;
}
.l-post-content.kg-image-card .kg-gallery-container,
.l-post-content figure .kg-gallery-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.l-post-content.kg-image-card .kg-gallery-row,
.l-post-content figure .kg-gallery-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.l-post-content.kg-image-card .kg-gallery-image img,
.l-post-content figure .kg-gallery-image img {
  display: block;
  margin: 0;
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
}
.l-post-content.kg-image-card .kg-gallery-row:not(:first-of-type),
.l-post-content figure .kg-gallery-row:not(:first-of-type) {
  margin: 0.75em 0 0;
}
.l-post-content.kg-image-card .kg-gallery-image:not(:first-of-type),
.l-post-content figure .kg-gallery-image:not(:first-of-type) {
  margin: 0 0 0 0.75em;
}
.l-post-content hr {
  position: relative;
  margin: 30px 0;
  border: 0;
  border-top: 1px solid var(--secondary-subtle-color);
}
@media only screen and (min-width: 48rem) {
  .l-post-content hr {
    margin: 50px 0;
  }
}
.l-post-content hr:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--secondary-subtle-color);
  box-shadow: 0 0 0 10px var(--background-color), 0 0 0 transparent;
  transform: translate(-50%, -50%);
}
@media only screen and (min-width: 48rem) {
  .l-post-content hr:after {
    width: 12px;
    height: 12px;
    box-shadow: 0 0 0 20px var(--background-color), 0 0 0 transparent;
  }
}
.l-post-content blockquote {
  position: relative;
  letter-spacing: 0.2px;
  line-height: 1.5;
  font-size: 1.125rem;
  font-style: italic;
  font-family: Georgia, Times New Roman, Times, serif;
  padding: 0 40px;
  margin: 0 0 25px;
}
@media only screen and (min-width: 48rem) {
  .l-post-content blockquote {
    letter-spacing: 0.3px;
    line-height: 1.6;
    font-size: 1.25rem;
    padding: 0 60px;
    margin-bottom: 30px;
  }
}
.l-post-content blockquote:before {
  content: '"';
  position: absolute;
  top: 0;
  left: 0;
  color: var(--primary-foreground-color);
  line-height: 1;
  font-size: 2.625rem;
}
@media only screen and (min-width: 48rem) {
  .l-post-content blockquote:before {
    font-size: 4rem;
  }
}
.l-post-content blockquote p:last-child {
  margin-bottom: 0;
}
.l-post-content table {
  color: var(--titles-color);
  font-size: 0.875rem;
  width: calc(100% + 40px);
  margin: 0 -20px 25px;
}
@media only screen and (min-width: 48rem) {
  .l-post-content table {
    font-size: 1rem;
    width: 100%;
    margin: 0 0 30px;
  }
}
.l-post-content table thead {
  border-bottom: 1px solid var(--table-head-border-bottom);
}
.l-post-content table thead td {
  font-weight: 600;
}
.l-post-content table tbody tr:nth-child(2n) {
  background-color: var(--background-color);
}
.l-post-content table tbody tr:nth-child(odd) {
  background-color: var(--table-background-color-odd);
}
.l-post-content table td {
  text-align: center;
  padding: 10px;
}
@media only screen and (min-width: 48rem) {
  .l-post-content table td {
    padding: 20px;
  }
}
.l-post-content code {
  display: inline-block;
  color: var(--link-color);
  font-size: 0.9rem;
  padding: 0 5px;
}
.l-post-content code,
.l-post-content pre {
  font-family: Consolas, Monaco, Andale Mono, Ubuntu Mono, monospace;
  border-radius: 5px;
  background-color: var(--secondary-subtle-color);
}
.l-post-content pre {
  line-height: 1.4;
  margin: 0 0 25px;
  overflow-x: auto;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;
  -moz-tab-size: 2;
  -o-tab-size: 2;
  tab-size: 2;
  -webkit-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}
@media only screen and (min-width: 48rem) {
  .l-post-content pre {
    margin-bottom: 30px;
  }
}
.l-post-content pre > code {
  display: block;
  padding: 10px 10px 0;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;
  -moz-tab-size: 2;
  -o-tab-size: 2;
  tab-size: 2;
  -webkit-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}
@media only screen and (min-width: 48rem) {
  .l-post-content pre > code {
    padding: 20px 20px 0;
  }
}
.l-post-content pre.line-numbers > code {
  padding: 0;
}
.l-post-content form {
  margin-bottom: 25px;
}
@media only screen and (min-width: 48rem) {
  .l-post-content form {
    margin-bottom: 30px;
  }
}
.l-post-content input,
.l-post-content select,
.l-post-content textarea {
  margin-bottom: 20px;
}
.l-post-content textarea {
  height: 100px;
  resize: none;
}
.l-post-content select {
  position: relative;
  padding-right: 40px !important;
  background-repeat: no-repeat;
  background-position: calc(100% - 15px) 50%;
  background-size: 15px 8px;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5IiBoZWlnaHQ9IjUiPjxwYXRoIGZpbGw9IiM1NjVlNjAiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTguMzIuNTdhLjI0Ny4yNDcgMCAwMTAgLjM2TDQuNjggNC41N2EuMjQ3LjI0NyAwIDAxLS4zNiAwTC42OC45M2EuMjQ3LjI0NyAwIDAxMC0uMzZsLjM5LS4zOWEuMjQ3LjI0NyAwIDAxLjM2IDBMNC41IDMuMjUgNy41Ny4xOGEuMjQ3LjI0NyAwIDAxLjM2IDBsLjM5LjM5eiIvPjwvc3ZnPg==");
}
.l-post-content button:not(.m-icon-button) {
  border: 1px solid var(--primary-foreground-color) !important;
}
.l-post-content .kg-bookmark-card {
  width: 100%;
  padding: 0 !important;
  margin: 30px auto !important;
  background: var(--background-color);
}
@media only screen and (min-width: 48rem) {
  .l-post-content .kg-bookmark-card {
    margin: 40px auto !important;
  }
}
.l-post-content .kg-bookmark-card:hover .kg-bookmark-container {
  opacity: 0.8;
  color: var(--primary-foreground-color);
}
.l-post-content .kg-card + .kg-bookmark-card {
  margin-top: 0;
}
.l-post-content .kg-bookmark-container {
  display: flex;
  color: var(--primary-foreground-color);
  text-decoration: none !important;
  min-height: 148px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  transition: opacity 0.2s linear;
}
.l-post-content .kg-bookmark-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px;
}
.l-post-content .kg-bookmark-title {
  font-size: 1.125rem;
  line-height: 1.3;
  font-weight: 600;
}
.l-post-content .kg-bookmark-description {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.4;
  margin-top: 12px;
  overflow-y: hidden;
}
.l-post-content .kg-bookmark-thumbnail {
  position: relative;
  min-width: 30%;
  max-height: 100%;
  overflow: hidden;
}
.l-post-content .kg-bookmark-thumbnail img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
  -o-object-fit: cover;
  object-fit: cover;
  border-radius: 0 3px 3px 0;
}
.l-post-content .kg-bookmark-metadata {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 0.9rem;
  font-weight: 400;
  color: var(--titles-color);
  margin-top: 14px;
}
.l-post-content .kg-bookmark-icon {
  width: 22px !important;
  height: 22px !important;
  margin-right: 8px !important;
}
.l-post-content .kg-bookmark-author:after {
  content: "\2022";
  margin: 0 6px;
}
.l-post-content .kg-bookmark-publisher {
  color: inherit;
}
@media (max-width: 500px) {
  .l-post-content .kg-bookmark-container {
    flex-direction: column;
  }
  .l-post-content .kg-bookmark-thumbnail {
    order: 1;
    width: 100%;
    min-height: 160px;
  }
  .l-post-content .kg-bookmark-thumbnail img {
    border-radius: 3px 3px 0 0;
  }
  .l-post-content .kg-bookmark-content {
    order: 2;
  }
}
.rtl .l-post-content ol,
.rtl .l-post-content ul {
  padding-left: 0;
  padding-right: 20px;
}
@media only screen and (min-width: 48rem) {
  .rtl .l-post-content ol,
  .rtl .l-post-content ul {
    padding-left: 0;
    padding-right: 40px;
  }
}
.rtl .l-post-content code {
  direction: ltr;
}
.rtl .l-post-content blockquote:before {
  left: auto;
  right: 0;
}
.rtl .l-post-content .kg-bookmark-icon {
  margin-right: 0 !important;
  margin-left: 8px !important;
}
@media only screen and (min-width: 48rem) {
  .rtl .l-post-content figure.kg-width-full {
    margin-left: 0;
    margin-right: 50%;
    transform: translateX(50%);
  }
}
.l-post-content button:not(.m-icon-button),
.m-button {
  display: inline-block;
  color: #333;
  text-align: center;
  letter-spacing: 0.2px;
  line-height: 1;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 5px;
  padding: 13px 25px;
  cursor: pointer;
  outline: 0;
  border: 0;
  position: relative;
  background-color: transparent;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
}
.l-post-content button.outlined:not(.m-icon-button),
.m-button.outlined {
  color: var(--titles-color);
  border: 1px solid var(--primary-foreground-color);
}
.l-post-content button.filled:not(.m-icon-button),
.l-post-content button.primary:not(.m-icon-button),
.m-button.filled,
.m-button.primary {
  box-shadow: 0 2px 4px var(--button-shadow-color-normal), 0 0 0 transparent;
}
.l-post-content button.filled:hover:not(.m-icon-button),
.l-post-content button.primary:hover:not(.m-icon-button),
.m-button.filled:hover,
.m-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px var(--button-shadow-color-hover), 0 0 0 transparent;
}
.l-post-content button.filled:not(.m-icon-button),
.m-button.filled {
  border-radius: 5px;
  background-color: #fff;
}
.l-post-content button.block:not(.m-icon-button),
.m-button.block {
  display: block;
  width: 100%;
}
.l-post-content button.primary:not(.m-icon-button),
.m-button.primary {
  color: #fff;
  background-color: var(--primary-subtle-color);
}
.l-post-content
  .m-subscribe-section__container.loading
  button:not(.m-icon-button),
.l-post-content button.loading:not(.m-icon-button),
.m-button.loading,
.m-subscribe-section__container.loading
  .l-post-content
  button:not(.m-icon-button),
.m-subscribe-section__container.loading .m-button {
  cursor: default;
  overflow: hidden;
}
.l-post-content
  .m-subscribe-section__container.loading
  button:not(.m-icon-button):after,
.l-post-content button.loading:not(.m-icon-button):after,
.m-button.loading:after,
.m-subscribe-section__container.loading
  .l-post-content
  button:not(.m-icon-button):after,
.m-subscribe-section__container.loading .m-button:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 25%;
  height: 2px;
  background-color: #fff;
  -webkit-animation: loading 1s infinite;
  animation: loading 1s infinite;
}
@-webkit-keyframes loading {
  0% {
    transform: translatex(0);
  }
  50% {
    transform: translatex(300%);
  }
  to {
    transform: translatex(0);
  }
}
@keyframes loading {
  0% {
    transform: translatex(0);
  }
  50% {
    transform: translatex(300%);
  }
  to {
    transform: translatex(0);
  }
}
.l-post-content input,
.l-post-content select,
.l-post-content textarea,
.m-input {
  color: var(--primary-foreground-color);
  letter-spacing: 0.2px;
  line-height: 1.3;
  font-size: 1rem;
  width: 100%;
  border-radius: 5px;
  padding: 11px 15px;
  border: 1px solid var(--primary-border-color);
  outline: 0;
  background-color: var(--background-color);
}
.l-post-content input:focus,
.l-post-content select:focus,
.l-post-content textarea:focus,
.m-input:focus {
  border-color: var(--primary-subtle-color);
}
.l-post-content input.in-search,
.l-post-content select.in-search,
.l-post-content textarea.in-search,
.m-input.in-search {
  font-weight: 600;
  padding-left: 40px;
}
@media only screen and (min-width: 48rem) {
  .l-post-content input.in-search,
  .l-post-content select.in-search,
  .l-post-content textarea.in-search,
  .m-input.in-search {
    font-size: 1.25rem;
    padding: 15px 30px 15px 60px;
  }
}
.l-post-content input.in-subscribe-section,
.l-post-content select.in-subscribe-section,
.l-post-content textarea.in-subscribe-section,
.m-input.in-subscribe-section {
  margin-bottom: 15px;
}
.m-share {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 45px;
  z-index: 3;
  background-color: var(--transparent-background-color);
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1), 0 0 0 transparent;
}
@media only screen and (min-width: 48rem) {
  .m-share {
    height: 50px;
  }
}
@media only screen and (min-width: 64rem) {
  .m-share {
    position: absolute;
    top: 0;
    left: auto;
    right: -75px;
    width: 40px;
    height: auto;
    background-color: transparent;
    box-shadow: 0 0 0 transparent, 0 0 0 transparent;
  }
}
@media only screen and (min-width: 80rem) {
  .m-share {
    width: 50px;
    right: -175px;
  }
}
@media only screen and (min-width: 90rem) {
  .m-share {
    right: -200px;
  }
}
.m-share a {
  color: inherit !important;
}
.m-share a:first-of-type {
  margin-left: 0;
}
@media only screen and (min-width: 64rem) {
  .m-share a:first-of-type {
    margin-bottom: 0;
  }
}
.m-share button:last-of-type {
  margin-right: 0;
}
@media only screen and (min-width: 64rem) {
  .rtl .m-share {
    right: auto;
    left: -75px;
  }
}
@media only screen and (min-width: 80rem) {
  .rtl .m-share {
    left: -175px;
  }
}
@media only screen and (min-width: 90rem) {
  .rtl .m-share {
    left: -200px;
  }
}
.m-share__content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
@media only screen and (min-width: 64rem) {
  .m-share__content {
    position: sticky;
    top: 100px;
    flex-direction: column-reverse;
    align-items: flex-start;
    height: auto;
  }
}
.rtl .m-share__content {
  direction: ltr;
}
.m-subscribe-section {
  padding: 50px 0;
  background-color: var(--secondary-subtle-color);
}
@media only screen and (min-width: 48rem) {
  .m-subscribe-section {
    padding: 80px 0;
  }
}
@media only screen and (min-width: 48rem) {
  .m-subscribe-section__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.m-subscribe-section__text {
  text-align: center;
  margin-bottom: 30px;
}
@media only screen and (min-width: 48rem) {
  .m-subscribe-section__text {
    flex: 1;
    text-align: left;
    padding-right: 75px;
    margin-bottom: 0;
  }
}
@media only screen and (min-width: 48rem) {
  .rtl .m-subscribe-section__text {
    text-align: right;
    padding-right: 0;
    padding-left: 75px;
  }
}
.m-subscribe-section__title {
  color: var(--titles-color);
  letter-spacing: 0.3px;
  line-height: 1.3;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 20px;
}
@media only screen and (min-width: 48rem) {
  .m-subscribe-section__title {
    letter-spacing: 0.3px;
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
}
.m-subscribe-section__description {
  letter-spacing: 0.2px;
  line-height: 1.4;
}
@media only screen and (min-width: 48rem) {
  .m-subscribe-section__description {
    font-size: 1.125rem;
  }
}
@media only screen and (min-width: 48rem) {
  .m-subscribe-section__form {
    width: 300px;
    margin: 0 auto;
  }
}
.l-post-content
  .m-subscribe-section__container.loading
  button:not(.m-icon-button),
.m-subscribe-section__container.loading
  .l-post-content
  button:not(.m-icon-button),
.m-subscribe-section__container.loading .m-button {
  pointer-events: none;
}
.m-subscribe-section__container.success .m-subscribe__success {
  display: block;
}
.m-subscribe-section__container.success .m-subscribe__error,
.m-subscribe-section__container.success .m-subscribe__form,
.m-subscribe-section__container.success .m-subscribe__invalid {
  display: none;
}
.m-subscribe-section__container.error .m-subscribe__error,
.m-subscribe-section__container.invalid .m-subscribe__invalid {
  display: block;
}
.m-subscribe-section__container.error .m-subscribe__form {
  margin-bottom: 20px;
}
.m-subscribe-section__container .m-subscribe__error,
.m-subscribe-section__container .m-subscribe__invalid,
.m-subscribe-section__container .m-subscribe__success {
  display: none;
}
.m-subscribe__success_icon {
  display: block;
  width: 64px;
  height: 64px;
  margin: 0 auto 25px;
}
.m-subscribe__error {
  text-align: center;
}
.m-author {
  padding: 40px 20px;
  border-color: var(--secondary-subtle-color);
  border-style: solid;
  border-width: 1px 0;
  margin: 0 auto;
}
@media only screen and (min-width: 48rem) {
  .m-author {
    display: flex;
    justify-content: center;
    padding: 60px 40px;
  }
}
@media only screen and (min-width: 80rem) {
  .m-author {
    padding: 60px 0;
  }
}
@media only screen and (min-width: 48rem) {
  .m-author__content {
    display: flex;
    max-width: 820px;
  }
}
.m-author__picture {
  width: 90px;
  margin: 0 auto 25px;
}
@media only screen and (min-width: 48rem) {
  .m-author__picture {
    width: 100px;
    margin: 0 30px 0 0;
  }
}
@media only screen and (min-width: 48rem) {
  .rtl .m-author__picture {
    margin: 0 0 0 30px;
  }
}
.m-author__info {
  text-align: center;
}
@media only screen and (min-width: 48rem) {
  .m-author__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    text-align: left;
  }
}
@media only screen and (min-width: 48rem) {
  .rtl .m-author__info {
    text-align: right;
  }
}
.m-author__name {
  color: var(--link-color);
  letter-spacing: 0.2px;
  line-height: 1.3;
  font-size: 1.125rem;
  font-weight: 400;
  margin: 0 0 15px;
}
@media only screen and (min-width: 48rem) {
  .m-author__name {
    letter-spacing: 0.3px;
    font-size: 1.25rem;
  }
}
.m-author__bio {
  letter-spacing: 0.2px;
  line-height: 1.5;
  margin-bottom: 20px;
}
@media only screen and (min-width: 48rem) {
  .m-author__bio {
    margin-bottom: 15px;
  }
}
.m-author-picture {
  display: block;
  width: 90px;
  height: 90px;
}
@media only screen and (min-width: 48rem) {
  .m-author-picture {
    width: 100px;
    height: 100px;
  }
}
.m-author-picture div {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
}
.m-author-links {
  padding: 0;
  margin: 0;
  list-style-type: none;
  text-align: center;
}
@media only screen and (min-width: 48rem) {
  .m-author-links {
    text-align: left;
  }
}
.m-author-links li {
  display: inline-block;
  margin: 0 11px;
}
.m-author-links li:first-of-type {
  margin-left: 0;
}
.m-author-links li:last-of-type {
  margin-right: 0;
}
.rtl .m-author-links {
  direction: ltr;
  text-align: right;
}
.m-comments {
  padding-top: 40px;
}
@media only screen and (min-width: 48rem) {
  .m-comments {
    padding-top: 60px;
  }
}
.m-comments iframe {
  width: 100%;
  max-width: 100%;
}
.m-recommended {
  padding-top: 40px;
}
@media only screen and (min-width: 48rem) {
  .m-recommended {
    padding-top: 60px;
  }
}
.m-recommended-articles {
  margin: 0 -20px;
}
@media only screen and (min-width: 64rem) {
  .m-recommended-articles {
    padding: 0 40px;
    margin: 0 -30px;
  }
}
.m-recommended-slider {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
@media only screen and (min-width: 48rem) {
  .m-recommended-slider .glide__track {
    padding: 0 40px;
    margin: 0 -40px;
  }
}
.m-recommended-slider .glide__slides {
  padding: 40px 0 60px;
  margin: 0 auto;
}
@media only screen and (min-width: 48rem) {
  .m-recommended-slider .glide__slides {
    padding: 40px 0 60px;
  }
}
@media only screen and (min-width: 80rem) {
  .m-recommended-slider .glide__slides {
    overflow: visible;
  }
}
.m-recommended-slider .m-article-card {
  width: 100% !important;
  margin: 0 !important;
}
@media only screen and (min-width: 64rem) {
  .m-recommended-slider .m-article-card .m-article-card__picture {
    height: 190px;
  }
}
@media only screen and (min-width: 80rem) {
  .m-recommended-slider .m-article-card .m-article-card__picture {
    height: 220px;
  }
}
.m-recommended-slider__item {
  padding: 0 20px;
}
@media only screen and (min-width: 48rem) {
  .l-tags-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto;
    max-width: 720px;
  }
}
@media only screen and (min-width: 64rem) {
  .l-tags-container {
    max-width: 1080px;
  }
}
.m-tag-card {
  height: 180px;
  margin: 0 0 20px;
  position: relative;
  border-radius: 10px;
  border: 1px solid var(--secondary-border-color);
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
}
.m-tag-card:hover {
  transform: translateY(-5px);
}
.m-tag-card:hover:before {
  box-shadow: var(--article-shadow-hover), 0 0 0 transparent;
}
@media only screen and (min-width: 48rem) {
  .m-tag-card {
    width: 320px;
    margin: 0 20px 40px;
  }
}
.m-tag-card:before {
  content: "";
  position: absolute;
  top: 10px;
  right: 10px;
  bottom: 0;
  left: 10px;
  border-radius: 10px;
  z-index: 1;
  box-shadow: var(--article-shadow-normal), 0 0 0 transparent;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
}
.m-tag-card__link {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  background-color: #000;
  z-index: 2;
}
.m-tag-card__link.no-picture {
  background-color: var(--secondary-subtle-color);
}
.m-tag-card__picture {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  -o-object-fit: cover;
  object-fit: cover;
  opacity: 0.7;
  z-index: 1;
}
.m-tag-card__info {
  position: absolute;
  left: 15px;
  bottom: 15px;
  color: #fff;
  z-index: 2;
}
.m-tag-card__info.no-picture {
  color: var(--titles-color);
}
.m-tag-card__name {
  letter-spacing: 0.3px;
  line-height: 1.3;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 5px;
}
.m-tag-card__counter {
  display: block;
  letter-spacing: 0.2px;
  font-size: 0.875rem;
}
</style>
