<template>
  <div class="authorization">
    <div class="authorization__container">
      <div class="authorization__body">
        <div class="registration-block">
          <div class="registration-block__title">
            <p class="registration-block__subtitle">Ещё нет аккаунта?</p>
            <p class="registration-block__description">
              Пожалуйста, введите свои данные ниже для регистрации на сайте
            </p>
          </div>
          <form-button
            class="registration-block__button"
            @click="$router.push({ name: 'registration' })"
            label="Регистрация"
            classButton="button_white"
          />
        </div>
        <div class="authorization-block">
          <div class="authorization-block__title">
            <p class="authorization-block__subtitle">Добро пожаловать!</p>
            <p class="authorization-block__description">
              Введите свои данные для входа в аккаунт
            </p>
          </div>
          <div class="authorization-block__main">
            <ValidationObserver ref="observer">
              <form
                class="authorization-block__form"
                @submit.prevent
                method="post"
              >
                <ValidationProvider
                  class="form__validator"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <form-input
                    class="authorization-block__input"
                    type="email"
                    v-model.trim="dataAuth.email"
                    placeholderInput="Email"
                  />
                  <span>{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider
                  class="form__validator"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <form-input
                    class="authorization-block__input"
                    v-model.trim="dataAuth.password"
                    type="password"
                    placeholderInput="Пароль"
                  />
                  <span class="error">{{ errors[0] }}</span>
                </ValidationProvider>

                <p v-if="error" class="error-message">{{ error }}</p>
              </form>
            </ValidationObserver>
          </div>
          <div class="authorization-block__footer">
            <form-button
              class="authorization-block__button"
              classButton="button__blue-white button_auth"
              @click="validate"
              label="Войти"
            />
            <a class="forget_pass" href="">Забыли пароль?</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import "@/validators/validation-rules";
import FormInput from "@/components/FormInput.vue";
import FormButton from "@/components/FormButton.vue";
import { mapActions } from "vuex";

export default {
  components: { ValidationProvider, ValidationObserver, FormInput, FormButton },
  data() {
    return {
      dataAuth: {
        email: "",
        password: "",
      },
      error: null,
    };
  },
  methods: {
    ...mapActions("mAuth", ["login"]),
    async validate() {
      const success = await this.$refs.observer.validate();
      if (success) await this.login(this.dataAuth);
    },
  },
};
</script>

<style scoped>
.authorization {
  padding: 110px 0px;
}

.authorization__container {
}

.authorization__body {
  display: flex;
  justify-content: space-between;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 1px 1px 100px 0px rgba(0, 0, 0, 0.08);
}

.registration-block__title {
  margin: 0px 0px 30px 0px;
}

.registration-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 0 1 479px;
  height: 660px;
  padding: 95px;
  border-radius: 100px;
  background-color: #4640de;
  color: white;
  margin: 0px 15px 0px 0px;
}

.registration-block__title {
  text-align: center;
}

.registration-block__subtitle {
  font-size: 20px;
  line-height: 27px;
  font-weight: 700;
  margin: 0px 0px 10px 0px;
  text-align: center;
}
.registration-block__description {
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
}

.registration-block__button {
  font-size: 18px;
}

.authorization-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
}

.authorization-block {
}
.authorization-block__title {
  margin: 0px 0px 40px 0px;
}

.authorization-block__subtitle {
  font-size: 20px;
  line-height: 27px;
  font-weight: 700;
  margin: 0px 0px 10px 0px;
  text-align: center;
}
.authorization-block__description {
  color: rgba(32, 36, 48, 0.5);
  text-align: center;
}
.authorization-block__main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 0px 30px 0px;
}
.authorization-block__form {
}
.form__validator {
}

.authorization-block__input {
  flex: 1 1 284px;
}
.authorization-block__input:not(:last-child) {
  margin: 0px 0px 20px 0px;
}
.error {
}
.error-message {
}
.authorization-block__footer {
  text-align: center;
}
.authorization-block__button {
  margin: 0px 0px 10px 0px;
}
.forget_pass {
  color: rgba(32, 36, 48, 0.5);
}
</style>
