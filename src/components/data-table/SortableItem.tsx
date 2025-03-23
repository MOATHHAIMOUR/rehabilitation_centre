import { ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableItemProps {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactNode | ((listeners: any) => ReactNode);
}

const SortableItem = ({ id, children }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {typeof children === "function" ? children(listeners) : children}
    </div>
  );
};

export default SortableItem;
