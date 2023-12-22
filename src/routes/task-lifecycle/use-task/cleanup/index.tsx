import { component$, useSignal, useTask$ } from "@builder.io/qwik";

export default component$(() => {
  const text = useSignal("");
  const debounceText = useSignal("");

  useTask$(({ track, cleanup }) => {
    const value = track(() => text.value);
    
    const id = setTimeout(() => (debounceText.value = value), 500);

    cleanup(() => clearTimeout(id));
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
      <p>Debounced text: {debounceText}</p>
    </section>
  );
});
