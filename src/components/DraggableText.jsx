import { useDraggable } from "@dnd-kit/core";

export default function DraggableText({ children, id, position }) {
  // Custom hook to make the text draggable
  const { atrtributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  // Style object to position the text
  const style = {
    position: "absolute",
    left: position.x,
    top: position.y,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    // Draggable text element
    <span
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...atrtributes}
      className={id}
    >
      {children}
    </span>
  );
}
