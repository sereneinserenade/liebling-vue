<template>
  <!-- {{!--
This subscribe template is used to display the form where users can subscribe.
You need to enable the members feature first.
--}} -->
  <!-- TODO: make this component business logic work -->

  <div class="m-subscribe-section__form">
    <form
      data-members-form="subscribe"
      id="newsletter-form"
      class="m-subscribe-section__container"
    >
      <div class="m-subscribe__form">
        <div class="pos-relative">
          <label for="newsletter-input" class="sr-only">{{
            "Your email address"
          }}</label>
          <input
            data-members-email
            id="newsletter-input"
            class="m-input in-subscribe-section"
            type="email"
            placeholder="Your email address"
            required
          />
        </div>
        <button
          id="newsletter-button"
          class="m-button primary block"
          type="submit"
        >
          {{ "Subscribe" }}
        </button>
      </div>
      <div class="m-subscribe__success">
        <header class="m-heading no-margin">
          <img
            :src="getAssetUrl('images/success.png')"
            alt="Success!"
            class="m-subscribe__success_icon"
          />
          <p class="m-heading__description in-newsletter-form">
            {{
              "Now check your inbox and click the link to confirm your subscription."
            }}
          </p>
        </header>
      </div>
      <p class="m-subscribe__invalid m-small-text">
        {{ "Please enter a valid email address" }}
      </p>
      <p class="m-subscribe__error m-small-text">
        {{ "Oops! There was an error sending the email, please try later." }}
      </p>
    </form>
  </div>
</template>

<script lang="ts">
import { getAssetUrl } from "@/utils";

import { Component, Vue } from "vue-property-decorator";

@Component
export default class NewsletterForm extends Vue {
  getAssetUrl = getAssetUrl;
}
</script>
