<template>
  <div class="registration">
    <div class="registration__container">
      <div class="registration__body">
        <div class="registration-block">
          <div class="registration-block__title">
            <p class="registration-block__subtitle">Добро пожаловать!</p>
            <p class="registration-block__description">
              Пожалуйста, введите свои данные ниже для регистрации на сайте
            </p>
          </div>
          <div class="registration-block__main">
            <ValidationObserver ref="observer">
              <form
                class="registration-block__form"
                @submit.prevent
                method="post"
              >
                <ValidationProvider
                  class="form__validator"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <form-input
                    class="registration-block__input"
                    v-model.trim="dataReg.name"
                    placeholderInput="Имя пользователя"
                  />
                  <span>{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider
                  class="form__validator"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <form-input
                    class="registration-block__input"
                    type="email"
                    rules="required|email"
                    v-model.trim="dataReg.email"
                    placeholderInput="Email"
                  />
                  <span>{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider
                  class="form__validator"
                  rules="required|min:7"
                  vid="confirmation"
                  v-slot="{ errors }"
                >
                  <form-input
                    class="registration-block__input"
                    v-model.trim="dataReg.password"
                    type="password"
                    placeholderInput="Пароль"
                  />
                  <span class="error">{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider
                  class="form__validator"
                  rules="required|confirmed:confirmation"
                  v-slot="{ errors }"
                >
                  <form-input
                    class="registration-block__input"
                    v-model.trim="confirmPassword"
                    type="password"
                    placeholderInput="Повторите пароль"
                  />
                  <span class="error">{{ errors[0] }}</span>
                </ValidationProvider>

                <p v-if="error" class="error-message">{{ error }}</p>
              </form>
            </ValidationObserver>
          </div>
          <div class="registration-block__footer">
            <form-button
              class="registration-block__button"
              classButton="button__blue-white button_auth"
              @click="validate"
              label="Регистрация"
            />
          </div>
        </div>
        <div class="authorization-block">
          <div class="authorization-block__title">
            <p class="authorization-block__subtitle">Уже есть аккаунт?</p>
            <p class="authorization-block__description">
              Введите свои данные для входа в аккаунт
            </p>
          </div>
          <form-button
            class="authorization-block__button"
            @click="$router.push({ name: 'authorization' })"
            label="Войти"
            classButton="button_white"
          />
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
  name: "RegistrationPage",
  components: { ValidationProvider, ValidationObserver, FormInput, FormButton },
  data() {
    return {
      dataReg: {
        name: "",
        email: "",
        password: "",
      },
      confirmPassword: "",
      error: null,
    };
  },
  methods: {
    ...mapActions("mAuth", ["register"]),
    async validate() {
      const success = await this.$refs.observer.validate();
      if (success) {
        await this.register(this.dataReg);
      }
    },
  },
};
</script>

<style scoped>
.registration {
  padding: 110px 0px;
}

.registration__container {
}

.registration__body {
  display: flex;
  justify-content: space-between;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 1px 1px 100px 0px rgba(0, 0, 0, 0.08);
}

.authorization-block__title {
  margin: 0px 0px 30px 0px;
}

.authorization-block {
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
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
}

.registration-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
  padding: 0px 15px;
}

.authorization-block__button {
}
.registration-block {
}
.registration-block__title {
  text-align: center;
  margin: 0px 0px 40px 0px;
}

.registration-block__subtitle {
  font-size: 30px;
  line-height: 27px;
  font-weight: 700;
  margin: 0px 0px 10px 0px;
  text-align: center;
}
.registration-block__description {
  color: rgba(32, 36, 48, 0.5);
  text-align: center;
  max-width: 290px;
}
.registration-block__form {
}
.form__validator {
}

.registration-block__input {
  flex: 1 1 284px;
}
.registration-block__input:not(:last-child) {
  margin: 0px 0px 20px 0px;
}
.error {
}
.error-message {
}
.registration-block__footer {
  text-align: center;
}
.registration-block__button {
  margin: 0px 0px 23px 0px;
}
</style>
