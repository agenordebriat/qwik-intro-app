import {
  component$,
  Slot,
  useContext,
  useContextProvider,
  useStore,
  useStylesScoped$,
  useTask$,
} from "@builder.io/qwik";
import { type InputData, InputDataContext } from "./context";

export default component$(() => {
  const data = useStore<InputData>({
    color: "black",
    value: "",
  });

  useContextProvider(InputDataContext, data);

  useTask$(({ track }) => {
    const value = track(() => data.value);

    data.color = value.toLowerCase() === "llama" ? "red" : "black";
  });

  return (
    <div>
      This is Page 1
      <hr />
      <input
        type="text"
        placeholder="Type your search"
        onInput$={(event) =>
          (data.value = (event.target as HTMLInputElement).value)
        }
      />
      <hr />
      <YouTyped>The value of the above input is:</YouTyped>
    </div>
  );
});

export const YouTyped = component$(() => {
  const { color, value } = useContext(InputDataContext);

  useStylesScoped$(
    `
      span:first-child:empty::before {
        content: "You typed:";
      }
    `
  );

  return (
    <p>
      <span>
        <Slot />
      </span>
      <span style={`color: ${color};`}> {value}</span>
    </p>
  );
});
