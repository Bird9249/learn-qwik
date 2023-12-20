import { component$, useComputed$, useSignal } from "@builder.io/qwik";

export default component$(() => {
  const name = useSignal("Qwik");
  
  const capitalizedName = useComputed$(() => {
    return name.value.toUpperCase();
  });

  return (
    <>
      <input
        type="text"
        bind:value={name}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <p>Name: {name.value}</p>
      <p>Capitalized name: {capitalizedName.value}</p>
    </>
  );
});
