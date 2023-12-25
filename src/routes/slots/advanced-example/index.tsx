import { Slot, component$, useSignal } from "@builder.io/qwik";

export const Collapsible = component$(() => {
  const isOpen = useSignal<boolean>(true);

  return (
    <div>
      <h1 onClick$={() => (isOpen.value = !isOpen.value)}>
        {isOpen.value ? "▼" : "▶︎"}
        <Slot name="title" />
      </h1>
      {isOpen.value && <Slot />}
    </div>
  );
});

export default component$(() => {
  const title = useSignal("Qwik");
  const description = useSignal(
    "A resumable framework for building instant web applications"
  );

  return (
    <>
      <label>Title</label>
      <input
        bind:value={title}
        type="text"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <label>Description</label>
      <textarea
        bind:value={description}
        cols={50}
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <hr />
      <Collapsible>
        <span q:slot="title">{title}</span>
        {description}
      </Collapsible>
    </>
  );
});
