import { shuffle } from "@/utils";

const BASE_URL = "https://opentdb.com/api.php?amount=10&type=multiple";
const URL_TO_SEND = "http://localhost:3000/";

const makeRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getFormattedQuestions = (loadedQuestions) => {
  const formattedQuestions = loadedQuestions.map(
    ({ question, incorrect_answers, correct_answer }) => {
      const answers = [...incorrect_answers, correct_answer];

      shuffle(answers);

      return {
        question,
        answers,
        correctAnswer: correct_answer,
      };
    }
  );

  return formattedQuestions;
};

const loadQuestions = async () => {
  try {
    const { results } = await makeRequest(BASE_URL);
    const formattedQuestions = await getFormattedQuestions(results);
    return formattedQuestions;
  } catch (error) {
    console.log(error);
  }
};

export { loadQuestions, makeRequest, URL_TO_SEND };
