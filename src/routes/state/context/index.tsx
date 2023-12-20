import {
  component$,
  createContextId,
  useContext,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";

export const CTX = createContextId<{ count: number }>("stuff");

export default component$(() => {
  const userData = useStore({ count: 0 });

  useContextProvider(CTX, userData);

  return <Child />;
});

export const Child = component$(() => {
  const userData = useContext(CTX);

  return (
    <>
      <button
        onClick$={() => userData.count++}
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Increment
      </button>
      <p>Count: {userData.count}</p>
    </>
  );
});
