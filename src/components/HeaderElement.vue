<template>
  <header v-if="showHeader" class="header">
    <div class="header__container">
      <nav class="header__menu">
        <div href="" class="header__logo">only apps</div>
        <ul class="header__body">
          <li class="header__item-courses">
            <a
              href=""
              class="header__link"
              @click.prevent="$router.push({ name: 'courses' })"
              >Курсы</a
            >
          </li>
          <li class="header__item-about">
            <a href="" class="header__link"> О компании</a>
          </li>
          <li class="header__item-img">
            <div class="header__avatar">
              <img
                class="header__image"
                src="https://ulanovka.ru/uploads/old_images/users/21048/y_c24190bctra.jpg"
                alt="dfsdf"
              />
            </div>
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
    <div class="fixed-menu">
      <ul>
        <li>
          <img src="../assets/Home.svg" />
          <p>Главная</p>
        </li>
        <li>
          <img src="../assets/Course.svg" />
          <p>Курсы</p>
        </li>
        <li>
          <img src="../assets/Profile.svg" />
          <p>Профиль</p>
        </li>
        <li>
          <img src="../assets/About.svg" />
          <p>О нас</p>
        </li>
      </ul>
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
  white-space: nowrap;
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
  white-space: nowrap;
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
.header__image[data-v-85fe3fa2] {
  width: 100%;
  height: 50px;
  border-radius: 100%;
}
.header__item-img {
  display: flex;
  align-items: center;
  gap: 10px;
}
.fixed-menu {
  border: 2px solid #edf6fa;
  background-color: #fff;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  display: none;
  bottom: -710%;
  z-index: 1;
}
.fixed-menu ul {
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
}

.fixed-menu ul li {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.fixed-menu ul li img {
  width: 35px;
  height: 35px;
  margin: 0 auto;
}
@media (max-width: 778px) {
  .header__item-courses,
  .header__item-about {
    display: none;
  }
}
@media (max-width: 567px) {
  .fixed-menu {
    display: flex;
  }
}
</style>
