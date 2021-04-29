/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.gif";
declare module "vue-glide-js";
declare module "vue-scrollto";
