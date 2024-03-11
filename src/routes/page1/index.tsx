import {
  component$,
  Slot,
  useSignal,
  useStylesScoped$,
  useTask$,
} from "@builder.io/qwik";

type Colors = "black" | "red";

export default component$(() => {
  const color = useSignal<Colors>("black");
  const value = useSignal("");

  useTask$(({ track }) => {
    track(() => value.value);

    color.value = value.value.toLowerCase() === "llama" ? "red" : "black";
  });

  return (
    <div>
      This is Page 1
      <hr />
      <input
        type="text"
        placeholder="Type your search"
        onInput$={(event) =>
          (value.value = (event.target as HTMLInputElement).value)
        }
      />
      <hr />
      <YouTyped color={color.value} value={value.value}>
        The value of the above input is:
      </YouTyped>
    </div>
  );
});

export const YouTyped = component$(
  ({ color, value }: { color: Colors; value: string }) => {
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
        </span>{" "}
        <span style={`color: ${color};`}>{value}</span>
      </p>
    );
  }
);
