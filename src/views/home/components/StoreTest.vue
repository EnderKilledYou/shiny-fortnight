<script setup lang="ts">
import { ChatGPTAPI } from "chatgpt";
import SpeechToText from "./Speech";
import appStore from "~/store";

const speechService = new SpeechToText();
async function interact(prompt_text: string) {
  const api = new ChatGPTAPI({
    apiKey: appStore.settings.apiKey,
  });

  const res = await api.sendMessage(prompt_text, {
    conversationId: appStore.conversation.conversationid,
    parentMessageId: appStore.conversation.parentMessageid,
  });
  appStore.conversation.conversationid = res.conversationId;
  appStore.conversation.parentMessageid = res.parentMessageId;

  return res;
}
function AudioPrompt() {
  const prompt_text = speechService.speak();
}
</script>

<template>
  <div class="flex flex-col items-center gap-20 bg-base-100 py-20">
    <div class="mockup-phone">
      <div class="camera" />
      <div class="display">
        <div class="phone-1 artboard artboard-demo">
          <p class="text-xl font-medium uppercase tracking-wide">
            Counter:
          </p>
          <p class="text-4xl font-bold uppercase">
            {{ appStore.counter.count }}
          </p>
          <button type="button" class="btn-primary btn" @click="interact()">
            increment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
