<template>
  <div>
    <header-element />
    <router-view />
  </div>
</template>

<script>
import HeaderElement from "@/components/HeaderElement.vue";

export default {
  components: {
    HeaderElement,
  },
};
</script>

<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  border: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

li {
  list-style: none;
}

a,
a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: inherit;
  font-size: inherit;
}

img {
  vertical-align: top;
}

html,
body {
  height: 100%;
}

html {
  /* по умолчанию */
  /* font-size: 16px;  */
}

button {
  cursor: pointer;
}

body {
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  line-height: normal;
  background-color: #edf6fa;
  overflow-x: hidden;
  font-family: "Gadugi", sans-serif;
}

@font-face {
  font-family: "Gadugi";
  src: url("~@/fonts/Gadugi.ttf") format("truetype");
}

/* .wrapper {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 100%;
} */

[class*="__container"] {
  max-width: 1160px;
  margin: 0px auto;
  padding: 0px 15px;
}
</style>
