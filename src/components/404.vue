<template>
  <!-- {{!-- This error template is used for all 404 errors, which might occur on your site. --}} -->

  <!-- {{!-- This block preloads specific assets for the 404 page --}}
{{#contentFor "preload"}}
  <link rel="preload" href="{{asset "css/404.css"}}" as="style" />
{{/contentFor}}

{{!-- This block loads specific styles for the 404 page --}}
{{#contentFor "styles"}}
  <link rel="stylesheet" type="text/css" href="{{asset "css/404.css"}}" media="screen" />
{{/contentFor}}

{{!-- The tag below means: insert everything in this file
into the {body} of the default.hbs template --}}
{{!< default}}

{{!-- Special header.hbs partial to generate the <header> tag --}}
{{> header}} -->

  <main class="l-fullscreen">
    <section
      class="l-fullscreen__content"
      data-aos-not-now="fade-up"
      data-aos-delay="300"
    >
      <h1 class="m-404-title">404</h1>

      <p class="m-404-subtitle">
        {{ "Page not found" }}
      </p>

      <p class="m-404-text">
        {{ "Unfortunately the page you were looking for could not be found." }}
      </p>

      <span class="m-button outlined" @click="goToHomePage">
        {{ "Go to the home page" }}
      </span>
    </section>
  </main>
</template>

<script lang="ts">
import { State } from "@/types";
import { Component, Vue } from "vue-property-decorator";
import { Settings } from "@tryghost/content-api";

@Component
export default class FourZeroFour extends Vue {
  get settings(): Settings | null {
    return (this.$store.state as State).settings ?? {};
  }

  goToHomePage = (): void => {
    this.$router.push("/");
  };
}
</script>
