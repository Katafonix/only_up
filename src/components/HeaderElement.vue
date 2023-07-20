<template>
  <header v-if="showHeader" class="header">
    <div class="header__container">
      <nav class="header__menu">
        <div href="" class="header__logo">only apps</div>
        <ul class="header__body">
          <li class="header__item">
            <a
              href=""
              class="header__link"
              @click.prevent="$router.push({ name: 'courses' })"
              >Курсы</a
            >
          </li>
          <li class="header__item">
            <a href="" class="header__link"> О компании</a>
          </li>
          <li class="header__item">
            <!-- <div class="header__avatar">
              <img
                class="header__image"
                src="D:/vue/zxc/src/assets/smesharik.png"
                alt=""
              />
            </div> -->
            <a
              class="header__link"
              @click.prevent="$router.push({ name: 'personal' })"
              href=""
              >{{ getUser.name }}</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  name: "HeaderElement",
  computed: {
    ...mapGetters("mAuth", ["getUser"]),
    showHeader() {
      return !this.$route.meta.hideHeader;
    },
  },
};
</script>
<style scoped>
.header {
  background: #ffffff;
  position: sticky;
  z-index: 100;
  top: 0;
  left: 0;
}
.header__container {
  display: flex;
  align-items: center;
  height: 90px;
}
.header__menu {
  display: flex;
  width: 100%;
}
.header__logo {
  flex: 1 1 auto;
  font-size: 22px;
}

.header__logo::first-letter {
  color: #4640de;
}
.header__body {
  display: flex;
  align-items: center;
  gap: 50px;
}
.header__item {
}
.header__link {
  color: #202430;
  font-size: 18px;
  transition: all 0.3s ease 0s;
}

.header__link:hover {
  color: rgba(32, 36, 48, 0.5);
}

.header__avatar {
}
.header__image {
  width: 100%;
}

header {
}

nav h2 span {
  color: #4640de;
}
</style>
