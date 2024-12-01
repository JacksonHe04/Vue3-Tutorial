// src/store/count.ts
import { defineStore } from 'pinia';

export const useCountStore = defineStore('count', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
    setCount(newCount: number) {
      this.count = newCount;
    },
  },
  getters: {
    doubleCount: (state) => state.count * 2,
  },
});
