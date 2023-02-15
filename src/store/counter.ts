import { defineStore } from "pinia";

export const counter = defineStore("counter", () => {
  const count = ref<number>(1);
  function increment() {
    count.value++;
  }

  return { count, increment };
});
export const conversation = defineStore("conversation", () => {
  const parentMessageid = ref<string>("");
  const conversationid = ref<string>("");

  return { parentMessageid, conversationid };
});
export const settings = defineStore("settings", () => {
  const apiKey = ref<string>("");
  return { apiKey };
});
