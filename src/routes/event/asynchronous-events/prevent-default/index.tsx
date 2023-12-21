import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <a
      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      href="/docs"
      preventdefault:click
      onClick$={() => {
        alert("Do something else to simulate navigation...");
      }}
    >
      Go to docs page
    </a>
  );
});
