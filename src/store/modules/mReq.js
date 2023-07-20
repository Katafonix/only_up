const mReq = {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async sendRequest(context, { request, url, data = {} }) {
      console.log(`Ссылка: ${url}`);
      console.log(data);
      const requestOptions = {
        method: request,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };

      if (request === "POST" || request === "PATCH") {
        requestOptions.body = JSON.stringify(data);
      }

      try {
        const response = await fetch(
          `${process.env.VUE_APP_BACKEND_URL}${url}`,
          requestOptions
        );

        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },

  modules: {},
};

export default mReq;
