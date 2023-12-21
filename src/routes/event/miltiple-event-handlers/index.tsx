import { $, component$, useSignal } from "@builder.io/qwik";

export default component$(() => {
  const count = useSignal(0);

  const print = $((ev: PointerEvent) => console.log("CLICKED!", ev));

  const increment = $(() => count.value++);

  return (
    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      onClick$={[
        print,
        increment,
        $(() => {
          alert("click increment");
        }),
      ]}
    >
      Count: {count.value}
    </button>
  );
});
