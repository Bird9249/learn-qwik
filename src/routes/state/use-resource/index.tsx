import {
  Resource,
  component$,
  useResource$,
  useSignal,
} from "@builder.io/qwik";

export default component$(() => {
  const query = useSignal("busy");

  const jokes = useResource$<{ value: string }[]>(
    async ({ track, cleanup }) => {
      track(() => query.value);

      const controller = new AbortController();
      cleanup(() => controller.abort());

      if (query.value.length < 3) {
        return [];
      }

      const url = new URL("https://api.chucknorris.io/jokes/search");
      url.searchParams.set("query", query.value);

      const resp = await fetch(url, { signal: controller.signal });
      const json = (await resp.json()) as { result: { value: string }[] };

      return json.result;
    }
  );

  return (
    <>
      <label>
        Query:{" "}
        <input
          bind:value={query}
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </label>

      <button class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        search
      </button>

      <Resource
        value={jokes}
        onPending={() => <>loading...</>}
        onRejected={() => <>Error...</>}
        onResolved={(jokes) => (
          <ul class="text-center">
            {jokes.map((joke, i) => (
              <li key={i}>
                <span class="font-bold">{i + 1}.</span> {joke.value}
              </li>
            ))}
          </ul>
        )}
      />
    </>
  );
});
