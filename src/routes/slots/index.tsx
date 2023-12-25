import { Slot, component$ } from "@builder.io/qwik";

const Button = component$(() => {
  return (
    <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
      Content: <Slot />
    </button>
  );
});

export default component$(() => {
  return (
    <Button>
      This goes inside {"<Button>"} component marked by{`<Slot>`}
    </Button>
  );
});
