<template>
  <!-- TODO: make this component work -->
  <span>
    <div class="m-alert success subscribe" data-notification="subscribe">
      {{ "Great! You've successfully subscribed." }}
      <button class="m-alert__close" aria-label="Close">
        <span class="icon-close"></span>
      </button>
    </div>

    <div class="m-alert success signup" data-notification="signup">
      {{ "Great! Next, complete checkout for full access." }}
      <button class="m-alert__close" aria-label="Close">
        <span class="icon-close"></span>
      </button>
    </div>

    <div class="m-alert success signin" data-notification="signin">
      {{ "Welcome back! You've successfully signed in." }}
      <button class="m-alert__close" aria-label="Close">
        <span class="icon-close"></span>
      </button>
    </div>

    <div class="m-alert success checkout" data-notification="checkout">
      {{
        "Success! Your account is fully activated, you now have access to all content."
      }}
      <button class="m-alert__close" aria-label="Close">
        <span class="icon-close"></span>
      </button>
    </div>
  </span>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Notifications extends Vue {}
</script>
