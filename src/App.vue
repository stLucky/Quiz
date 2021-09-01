<template>
  <main>
    <template v-if="!hasQuestions">
      <svg
        class="animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </template>
    <template v-else>
      <h1>Quiz</h1>
      <form action="" @submit.prevent="onFormSubmit">
        <ul class="questions">
          <li
            class="questions__item"
            v-for="(item, i) of questions"
            :key="item.correctAnswer"
          >
            <p v-html="item.question"></p>
            <ul class="answers">
              <li
                class="answers__item"
                v-for="answer of item.answers"
                :key="answer"
              >
                <label class="answers__label">
                  <input
                    class="answers__radio visually-hidden"
                    type="radio"
                    :name="`answer-${i + 1}`"
                    v-model="item.userAnswer"
                    :value="answer"
                    @change="onAnswerChange(answer)"
                  />
                  <span v-html="answer" class="answers__label-text"></span>
                </label>
              </li>
            </ul>
          </li>
        </ul>
        <button type="submit">Show result</button>
      </form>
      <modal-popup :is-open="isPopupOpen" @close="onClosePopup">
        Ваш результат:<br />
        {{ correctAnswers }} из {{ numberQuestions }}
      </modal-popup>
    </template>
  </main>
</template>
<script>
import { loadQuestions, makeRequest, URL_TO_SEND } from "@/api";
import ModalPopup from "@/components/ModalPopup";

export default {
  name: "App",

  components: {
    ModalPopup,
  },

  data: () => ({
    hasQuestions: false,
    isPopupOpen: false,
    questions: [],
  }),

  computed: {
    numberQuestions() {
      return this.questions.length;
    },

    correctAnswers() {
      return this.questions.filter(
        ({ correctAnswer, userAnswer }) => correctAnswer === userAnswer
      ).length;
    },
  },

  created() {
    this.setQuestions();
  },

  methods: {
    async setQuestions() {
      this.hasQuestions = false;

      const questions = await loadQuestions();
      this.questions = questions;
      this.hasQuestions = true;
    },

    async onAnswerChange(answer) {
      await makeRequest(URL_TO_SEND, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ userAnswer: answer }),
      });
    },

    onFormSubmit() {
      this.isPopupOpen = true;
    },

    onClosePopup() {
      this.isPopupOpen = false;
      this.setQuestions();
    },
  },
};
</script>
