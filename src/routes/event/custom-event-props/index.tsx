import type { PropFunction } from "@builder.io/qwik";
import { component$, Slot, useStore } from "@builder.io/qwik";

export default component$(() => {
  return (
    <Button onTripleClick$={() => alert("TRIPLE CLICKED!")}>
      Triple Click me!
    </Button>
  );
});

type ButtonProps = {
  onTripleClick$: PropFunction<() => void>;
};

export const Button = component$<ButtonProps>(({ onTripleClick$ }) => {
  const state = useStore({
    clicks: 0,
    lastClickTime: 0,
  });

  return (
    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      onClick$={() => {
        const now = Date.now();

        const timeBetweenClicks = now - state.lastClickTime;

        state.lastClickTime = now;

        if (timeBetweenClicks > 500) {
          state.clicks = 0;
        }

        state.clicks++;

        if (state.clicks === 3) {
          onTripleClick$();
          state.clicks = 0;
        }
      }}
    >
      <Slot />
    </button>
  );
});
