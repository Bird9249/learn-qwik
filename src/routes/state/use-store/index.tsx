import type { QRL } from "@builder.io/qwik";
import { $, component$, useStore } from "@builder.io/qwik";

type ListStore = {
  nested: { fields: { are: string } };
  list: string[];
  addList: QRL<(this: ListStore) => void>;
};

export default component$(() => {
  const store = useStore<ListStore>({
    nested: {
      fields: { are: "also tracked" },
    },
    list: ["Item 1"],
    addList: $(function (this: ListStore) {
      this.list.push(`Item ${this.list.length}`);
    }),
  });

  return (
    <>
      <p>{store.nested.fields.are}</p>
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick$={() => {
          store.nested.fields.are = "tracked";
        }}
      >
        Clicking me works because store is deep watched
      </button>
      <br />
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick$={() => {
          store.addList();
        }}
      >
        Add to list
      </button>
      <ul>
        {store.list.map((item, key) => (
          <li key={key}>{item}</li>
        ))}
      </ul>
    </>
  );
});
