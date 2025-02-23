/* eslint-disable @typescript-eslint/no-explicit-any */

export const MAX_QUESTIONS_PER_TYPE = 4;

export type Question = {
  id: string;
  type: "string" | "text" | "int" | "checkbox";
  text: string;
};

export function transformResponses(formattedResponses: any) {
  const transformed: any = {};
  let stringCount = 1;
  let textCount = 1;
  let intCount = 1;
  let checkboxCount = 1;

  formattedResponses.forEach(({ type, text }: any) => {
    let key = "";
    if (type === "string") key = `customString${stringCount++}Answer`;
    else if (type === "text") key = `customText${textCount++}Answer`;
    else if (type === "int") key = `customInt${intCount++}Answer`;
    else if (type === "checkbox")
      key = `customCheckbox${checkboxCount++}Answer`;

    transformed[key] =
      type === "int"
        ? Number(text) || null
        : type === "checkbox"
        ? text === "yes"
        : text || null;
  });

  return transformed;
}

export const transformFromApi = (data: any): Question[] => {
  const questions: Question[] = [];
  for (let i = 1; i <= MAX_QUESTIONS_PER_TYPE; i++) {
    if (data[`customString${i}State`]) {
      questions.push({
        id: crypto.randomUUID(),
        type: "string",
        text: data[`customString${i}Question`] || "",
      });
    }
    if (data[`customText${i}State`]) {
      questions.push({
        id: crypto.randomUUID(),
        type: "text",
        text: data[`customText${i}Question`] || "",
      });
    }
    if (data[`customInt${i}State`]) {
      questions.push({
        id: crypto.randomUUID(),
        type: "int",
        text: data[`customInt${i}Question`] || "",
      });
    }
    if (data[`customCheckbox${i}State`]) {
      questions.push({
        id: crypto.randomUUID(),
        type: "checkbox",
        text: data[`customCheckbox${i}Question`] || "",
      });
    }
  }
  return questions;
};

export const transformToApi = (questions: Question[]) => {
  const data: any = {};
  for (let i = 1; i <= MAX_QUESTIONS_PER_TYPE; i++) {
    data[`customString${i}State`] = false;
    data[`customString${i}Question`] = null;
    data[`customText${i}State`] = false;
    data[`customText${i}Question`] = null;
    data[`customInt${i}State`] = false;
    data[`customInt${i}Question`] = null;
    data[`customCheckbox${i}State`] = false;
    data[`customCheckbox${i}Question`] = null;
  }

  let stringIndex = 1,
    textIndex = 1,
    intIndex = 1,
    checkboxIndex = 1;

  questions.forEach(({ type, text }) => {
    if (type === "string" && stringIndex <= MAX_QUESTIONS_PER_TYPE) {
      data[`customString${stringIndex}State`] = true;
      data[`customString${stringIndex}Question`] = text;
      stringIndex++;
    } else if (type === "text" && textIndex <= MAX_QUESTIONS_PER_TYPE) {
      data[`customText${textIndex}State`] = true;
      data[`customText${textIndex}Question`] = text;
      textIndex++;
    } else if (type === "int" && intIndex <= MAX_QUESTIONS_PER_TYPE) {
      data[`customInt${intIndex}State`] = true;
      data[`customInt${intIndex}Question`] = text;
      intIndex++;
    } else if (type === "checkbox" && checkboxIndex <= MAX_QUESTIONS_PER_TYPE) {
      data[`customCheckbox${checkboxIndex}State`] = true;
      data[`customCheckbox${checkboxIndex}Question`] = text;
      checkboxIndex++;
    }
  });
  return data;
};
