import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";

export default component$(() => {
  const isUppercase = useSignal(false);
  const text = useSignal("");
  const delayText = useSignal("");

  useTask$(({ track }) => {
    const value = track(() =>
      isUppercase.value ? text.value.toUpperCase() : text.value.toLowerCase()
    );

    const update = () => (delayText.value = value);

    isServer ? update() : delay(500).then(update);
  });

  return (
    <section>
      <label class="mr-3">
        Enter text:{" "}
        <input
          type="text"
          bind:value={text}
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </label>
      <label>
        Is uppercase?{" "}
        <input
          type="checkbox"
          id="is-uppercase"
          bind:checked={isUppercase}
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
      </label>

      <p class="text-center font-bold mt-3">Delay text: {delayText}</p>
    </section>
  );
});

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
