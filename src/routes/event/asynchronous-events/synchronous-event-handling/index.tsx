import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

export default component$(() => {
  const draggableRef = useSignal<HTMLElement>();
  const dragStatus = useSignal("");

  useVisibleTask$(({ cleanup }) => {
    if (draggableRef.value) {
      const dragstart = () => {
        dragStatus.value = "1";
      };
      const dragend = () => {
        dragStatus.value = "0";
      };

      draggableRef.value.addEventListener("dragstart", dragstart);
      draggableRef.value.addEventListener("dragend", dragend);

      cleanup(() => {
        draggableRef.value!.removeEventListener("dragstart", dragstart);
        draggableRef.value!.removeEventListener("dragend", dragend);
      });
    }
  });

  return (
    <div>
      <div draggable ref={draggableRef} class="p-2.5 bg-slate-100">
        Drag me!
      </div>
      <p>{dragStatus.value}</p>
    </div>
  );
});
