import { component$, useStore } from "@builder.io/qwik";

export default component$(() => {
  const userData = useStore({ count: 0 });

  return (
    <>
      <p>Count: {userData.count}</p>
      <Child userData={userData} />
    </>
  );
});

interface ChildProps {
  userData: { count: number };
}

export const Child = component$<ChildProps>(({ userData }) => {
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
