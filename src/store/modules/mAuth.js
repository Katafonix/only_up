import mReq from "./mReq";
import router from "@/router";

const mAuth = {
  namespaced: true,
  state: {
    isAuthenticated: false,
    user: { name: "", email: "", role: "", id: null, id_avatar: null },
  },
  getters: {
    getUser: (state) => state.user,
    getAuth: (state) => state.isAuthenticated,
  },
  mutations: {
    changeAuth(state, payload) {
      state.isAuthenticated = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async authorize({ dispatch }) {
      try {
        return await dispatch("mReq/sendRequest", {
          request: "GET",
          url: "auth",
        });
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async logOut() {
      try {
        const response = await this.dispatch("mReq/sendRequest", {
          request: "POST",
          url: "auth/log-out",
        });
        if (!response.ok) throw new Error("Ошибка при выходе");
        router.push("/authorization");
      } catch (error) {
        console.log(error);
      }
    },
    async login({ dispatch }, data) {
      try {
        const response = await dispatch("mReq/sendRequest", {
          request: "POST",
          url: "auth/log-in",
          data: data,
        });
        if (response.ok) {
          router.push({ name: "courses" });
        } else if (response.status === 401) {
          throw Error("Ошибка авторизации: неверный email или пароль");
        } else {
          throw Error("Неизвестная ошибка");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async register({ dispatch }, data) {
      try {
        const response = await dispatch("mReq/sendRequest", {
          request: "POST",
          url: "auth/register",
          data: data,
        });
        console.log(await response.json());
        if (response.ok) {
          router.push({ name: "authorization" });
        } else if (response.status === 400) {
          throw Error("Ошибка регистрации: Такой пользователь уже существует");
        } else {
          throw Error("Неизвестная ошибка");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: { mReq },
};

export default mAuth;
