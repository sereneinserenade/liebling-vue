<template>
  <ul :class="{ 'm-secondary-menu': isSecondary }">
    <li
      v-for="(navigation, i) in navigations"
      :key="`${navigation.label + i}-navigation`"
      :class="[
        `nav-${getUrlSlug(navigation.url)}`,
        { 'nav-current': isCurrentNav(navigation) },
      ]"
    >
      <router-link :to="navigation.url">{{ navigation.label }}</router-link>
    </li>

    <slot></slot>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Settings } from "@tryghost/content-api";
import { State } from "@/types";
import { getUrlSlug } from "@/utils";

@Component({
  name: "ComponentNavigation",
})
export default class ComponentNavigation extends Vue {
  currentActive: string | null = null;

  @Prop({ default: false, type: Boolean }) isSecondary!: boolean;

  @Prop({ default: null, type: Array }) navigations!: Array<{ url: string }>;

  get settings(): Settings | null {
    return (this.$store.state as State).settings ?? {};
  }

  onLinkClicked(nav: { url: string }): void {
    this.currentActive = nav.url;
  }

  isCurrentNav(nav: { url: string }): boolean {
    return this.currentActive === nav.url;
  }

  getUrlSlug = getUrlSlug;
}
</script>
