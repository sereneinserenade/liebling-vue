/* eslint-disable @typescript-eslint/no-unused-vars */
// vuex-shim.d.ts

import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";
import { State } from "./store/index";

declare module "@vue/runtime-core" {
  // Declare your own store states.

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
