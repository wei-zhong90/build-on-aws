import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      result: [],
      analog: [],
    };
  },
  mutations: {
    input_result(state, payload) {
      state.result = payload;
    },
    input_analog(state, payload) {
      state.analog = payload;
    },
  },
  actions: {},
  modules: {},
});
