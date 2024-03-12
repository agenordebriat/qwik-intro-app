import { createContextId } from "@builder.io/qwik";

export interface InputData {
  color: "black" | "red";
  value: string;
}

export const InputDataContext = createContextId<InputData>("input");
