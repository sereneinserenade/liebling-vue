<template>
  <!-- {{!-- This header template is shared across all the pages. --}} -->

  <!-- <header class="m-header {{#if background}}with-picture{{/if}} "> -->
  <!-- TODO: take care of the 'with-picture' thingy above -->

  <header
    class="m-header"
    :class="{
      'with-picture': background,
      'mobile-menu-opened': mobileMenuVisible,
    }"
  >
    <div class="m-mobile-topbar" data-aos-not-now="fade-down">
      <button
        class="m-icon-button in-mobile-topbar"
        aria-label="Open menu"
        @click="mobileMenuVisible = true"
      >
        <inline-svg :src="VerticalMoreIcon" />
      </button>
      <template v-if="settings.logo">
        <router-link to="/" class="m-logo in-mobile-topbar">
          <img :src="settings.logo" :alt="settings.title" />
        </router-link>
      </template>
      <router-link to="/" class="m-site-name in-mobile-topbar">
        {{ settings.title }}
      </router-link>

      <button
        class="m-icon-button in-mobile-topbar"
        aria-label="Open search"
        @click="openSearchModal"
      >
        <inline-svg :src="SearchIcon" />
      </button>
    </div>

    <div class="m-menu" :class="{ opened: mobileMenuVisible }">
      <button
        class="m-icon-button outlined as-close-menu"
        aria-label="Close menu"
        @click="mobileMenuVisible = false"
      >
        <inline-svg :src="CloseIcon" />
      </button>
      <div class="m-menu__main" data-aos-not-now="fade-down">
        <div class="l-wrapper">
          <div class="m-nav">
            <nav class="m-nav__left" role="navigation" aria-label="Main menu">
              <ul>
                <template v-if="settings.logo">
                  <li class="only-desktop">
                    <router-link to="/" class="m-logo">
                      <img :src="settings.logo" :alt="settings.title" />
                    </router-link>
                  </li>
                </template>

                <li class="only-desktop" v-else>
                  <router-link to="/" class="m-site-name in-desktop-menu">
                    {{ settings.title }}
                  </router-link>
                </li>

                <ComponentNavigation
                  v-if="settings.navigation"
                  :isSecondary="false"
                  :navigations="settings.navigation"
                  :key="'theFirstOne'"
                >
                  <li
                    class="more secondary-navigation-container"
                    v-if="settings.secondary_navigation"
                  >
                    <a> More <inline-svg :src="ChevronDownIcon" /> </a>

                    <div class="secondary-navigation">
                      <router-link
                        v-for="(
                          secondaryNavigation, i
                        ) in settings.secondary_navigation"
                        :key="`${i}-secondary-navigation-item`"
                        :to="secondaryNavigation.url"
                        class="secondary-navigation-item"
                      >
                        {{ secondaryNavigation.label }}
                      </router-link>
                    </div>
                  </li>
                </ComponentNavigation>

                <li class="submenu-option">
                  <button
                    class="m-icon-button in-menu-main more"
                    aria-label="Open submenu"
                    @click="subMenuOpen = !subMenuOpen"
                  >
                    <inline-svg :src="MoreIcon" />
                  </button>

                  <div
                    class="m-submenu"
                    :class="{ opened: subMenuOpen, closed: !subMenuOpen }"
                  >
                    <div class="l-wrapper in-submenu">
                      <section class="m-recent-articles">
                        <h3 class="m-submenu-title in-recent-articles">
                          Recent articles
                        </h3>
                        <div v-if="recentPosts.length" class="glide">
                          <div class="glide__track" data-glide-el="track">
                            <div class="glide__slides">
                              <div
                                v-for="recentPost in recentPosts"
                                :key="`post-${recentPost.id}`"
                                class="glide__slide"
                              >
                                <router-link
                                  :to="getFEUrlPath(recentPost.url)"
                                  class="m-recent-article"
                                >
                                  <div
                                    class="m-recent-article__picture"
                                    :class="{
                                      'no-picture': !recentPost.feature_image,
                                    }"
                                  >
                                    <img
                                      v-if="recentPost.feature_image"
                                      :src="
                                        getImageUrlForSize(
                                          recentPost.feature_image,
                                          's'
                                        )
                                      "
                                      loading="lazy"
                                      alt=""
                                    />
                                    <img
                                      v-else
                                      :src="NoImage"
                                      loading="lazy"
                                      alt=""
                                    />
                                  </div>
                                  <h3
                                    class="m-recent-article__title"
                                    :title="recentPost.title"
                                  >
                                    {{ recentPost.title }}
                                  </h3>
                                  <span class="m-recent-article__date">
                                    {{
                                      getTimeDifferenceString(
                                        recentPost.published_at
                                      )
                                    }}
                                  </span>
                                </router-link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-else class="m-not-found in-recent-articles">
                          {{ "No recent articles found :(" }}
                        </div>
                      </section>
                      <section class="m-tags">
                        <h3 class="m-submenu-title">Tags</h3>
                        <ul>
                          <template v-if="tags.length">
                            <template>
                              <li v-for="(tag, i) in tags" :key="`${i}-tag`">
                                <router-link :to="tag.url">
                                  {{ tag.name }}
                                </router-link>
                              </li>
                            </template>
                          </template>
                          <li v-else class="m-not-found">
                            {{ "No tags found :(" }}
                          </li>
                        </ul>
                      </section>
                    </div>
                  </div>
                </li>
              </ul>
            </nav>
            <div class="m-nav__right">
              <button
                class="m-icon-button in-menu-main"
                aria-label="Open search"
                content="Search"
                v-tippy="{ placement: 'bottom' }"
                @click="openSearchModal"
              >
                <inline-svg :src="SearchIcon" />
              </button>

              <div
                class="m-toggle-darkmode theme-toggle-button"
                tabindex="0"
                @click="toggleTheme"
              >
                <label for="toggle-darkmode" class="sr-only">
                  Toggle dark mode
                </label>
                <inline-svg
                  content="Toggle dark mode"
                  v-tippy="{ placement: 'bottom' }"
                  :src="ThemeLightDarkIcon"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="settings.secondary_navigation"
      id="secondary-navigation-template"
      style="display: none"
    >
      <ComponentNavigation
        :key="'theSecondOne'"
        isSecondary
        :navigations="settings.secondary_navigation"
      />
    </div>
  </header>
</template>

<script lang="ts">
import { State } from "@/types";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Settings, PostOrPage, Tag } from "@tryghost/content-api";
import {
  getImageUrlForSize,
  getTimeDifferenceString,
  getFEUrlPath,
} from "@/utils";
import {
  SearchIcon,
  ThemeLightDarkIcon,
  ChevronDownIcon,
  MoreIcon,
  VerticalMoreIcon,
  CloseIcon,
} from "@/components/assets/svgs";
import { NoImage } from "@/components/assets/images";

import ComponentNavigation from "./ComponentNavigation.vue";

@Component({
  components: {
    ComponentNavigation: ComponentNavigation,
  },
})
export default class Header extends Vue {
  @Prop({ type: String, default: "" }) background!: string;

  subMenuOpen = false;

  mobileMenuVisible = false;

  currentTheme = "";

  showMobileMenu(): void {
    this.mobileMenuVisible = true;

    const body = document.querySelector("body");
    body?.classList.add("no-scroll-y");
  }

  hideMobileMenu(): void {
    this.mobileMenuVisible = false;

    const body = document.querySelector("body");
    body?.classList.remove("no-scroll-y");
  }

  get settings(): Settings | null {
    return (this.$store.state as State).settings ?? {};
  }

  get url(): string | undefined {
    return this.settings?.url || "";
  }

  get recentPosts(): PostOrPage[] | null {
    return (this.$store.state as State).recentPosts ?? [];
  }

  get tags(): Tag[] | null {
    return (
      (this.$store.state as State).tags?.filter(
        (tag) => tag.visibility === "public"
      ) ?? []
    );
  }

  setTheme(theme: string): void {
    const validThemes = ["light", "dark"];
    if (!validThemes.includes(theme)) return;

    const html = document.querySelector("html");
    html?.setAttribute("data-theme", theme);

    this.currentTheme = theme;
  }

  mounted(): void {
    const preferredTheme = window.localStorage.getItem("preferredTheme");
    if (preferredTheme) {
      this.currentTheme = preferredTheme;
      this.setTheme(preferredTheme);
    }
  }

  toggleTheme(): void {
    let newTheme = "";
    if (this.currentTheme === "light") {
      this.setTheme("dark");
      newTheme = "dark";
    } else {
      this.setTheme("light");
      newTheme = "light";
    }

    window.localStorage.setItem("preferredTheme", newTheme);
  }

  openSearchModal(): void {
    this.$store.commit("SET_SEARCH_OPEN_VALUE", true);
  }

  @Watch("$route", { immediate: true, deep: true })
  onRouteChange(): void {
    setTimeout(() => {
      this.subMenuOpen = false;
    }, 75);
  }

  getImageUrlForSize = getImageUrlForSize;

  getTimeDifferenceString = getTimeDifferenceString;

  getFEUrlPath = getFEUrlPath;

  SearchIcon = SearchIcon;

  ThemeLightDarkIcon = ThemeLightDarkIcon;

  ChevronDownIcon = ChevronDownIcon;

  MoreIcon = MoreIcon;

  VerticalMoreIcon = VerticalMoreIcon;

  CloseIcon = CloseIcon;

  NoImage = NoImage;
}
</script>

<style lang="scss">
.theme-toggle-button {
  cursor: pointer;
  outline: none !important;

  svg {
    outline: none !important;
  }
}

.in-submenu {
  .glide__slide {
    max-width: 300px;
  }
}

.secondary-navigation-container {
  cursor: pointer;

  &:hover {
    .secondary-navigation {
      transform: scale(1);
    }
  }

  .secondary-navigation {
    display: flex;
    transform: translateY(5px);
    transition: all 0.2s ease-in-out;
    z-index: 100;
    position: fixed;
    transform: scale(0);
    transform-origin: left top;
    flex-direction: column;
    background: #333333;
    border-radius: 6px;
    color: white;
    overflow: hidden;

    .secondary-navigation-item {
      padding: 0.75em 1em;
    }
  }
}
</style>
