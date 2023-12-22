import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";

export default component$(() => {
  const text = useSignal("Initial text");
  const delayText = useSignal("");

  useTask$(({ track }) => {
    track(() => text.value);

    const value = text.value;
    
    const update = () => (delayText.value = value);
    
    isServer ? update() : delay(500).then(update);
  });

  return (
    <section>
      <label>
        Enter text:{" "}
        <input
          type="text"
          bind:value={text}
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </label>
      <p>
        Delayed text: <span class="font-bold">{delayText}</span>{" "}
      </p>
    </section>
  );
});

const delay = (time: number) => new Promise((res) => setTimeout(res, time));
