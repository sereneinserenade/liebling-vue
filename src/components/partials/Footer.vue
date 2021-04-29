<template>
  <footer class="m-footer">
    <div class="m-footer__content">
      <nav
        v-if="settings.secondary_navigation"
        class="m-footer__nav-secondary"
        role="navigation"
        aria-label="Secondary menu in footer"
      >
        <ComponentNavigation
          isSecondary
          :navigations="settings.secondary_navigation"
        />
      </nav>
      <nav class="m-footer-social">
        <a
          :href="facebook_url + settings.facebook"
          target="_blank"
          rel="noopener"
          aria-label="Facebook"
        >
          <inline-svg :src="FaceBookIcon" />
        </a>
        <a
          :href="twitter_url + settings.twitter"
          target="_blank"
          rel="noopener"
          aria-label="Twitter"
        >
          <inline-svg :src="TwitterIcon" />
        </a>
        <a :href="settings.url + '/rss'" aria-label="RSS">
          <inline-svg :src="RssIcon" />
        </a>
      </nav>
      <p class="m-footer-copyright">
        <span>{{ settings.title }} &copy; {{ new Date().getFullYear() }}</span>
        <!-- <span>&nbsp; &bull; &nbsp;</span> -->
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
import { facebook_url, twitter_url } from "@/constants";
import ComponentNavigation from "./ComponentNavigation.vue";
import { Component, Vue } from "vue-property-decorator";
import { Settings } from "@tryghost/content-api";
import { State } from "@/types";
import { FaceBookIcon, TwitterIcon, RssIcon } from "@/components/assets/svgs";

@Component({
  components: {
    ComponentNavigation: ComponentNavigation,
  },
})
export default class Home extends Vue {
  get settings(): Settings | null {
    return (this.$store.state as State).settings ?? {};
  }

  facebook_url = facebook_url;

  twitter_url = twitter_url;

  FaceBookIcon = FaceBookIcon;

  TwitterIcon = TwitterIcon;

  RssIcon = RssIcon;
}
</script>
