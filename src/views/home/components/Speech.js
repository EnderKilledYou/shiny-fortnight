/* eslint-disable no-undef */

// eslint-disable-next-line @typescript-eslint/no-use-before-define
const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

export default class SpeechToText {
  constructor() {
    this.recognition = new SpeechRecognition();
    this.result = "created";
    this.resultSubject = "";

    this.recognition.lang = "en-EN";
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;
    this.resolve = {
      resolve: null,
    };
    this.recognition.onresult = (event) => {
      const last = event.results.length - 1;
      this.result = event.results[last][0].transcript;
      this.resultSubject += this.result;
    };

    this.recognition.onspeechend = () => {
      this.recognition.stop();
      this.resolve.resolve(this.resultSubject);
    };

    this.recognition.onnomatch = () => {
      this.resolve.resolve(this.resultSubject);
    };

    this.recognition.onerror = (event) => {
      this.resultSubject.error(`Error occurred in recognition: ${event.error}`);
    };
  }

  speak() {
    return new Promise((resolve) => {
      this.recognition.start();
      this.resolve.resolve = resolve;
    });
  }
}
