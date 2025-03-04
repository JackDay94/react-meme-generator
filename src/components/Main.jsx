import { useState, useEffect } from "react";
import { DndContext, useDraggable } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";

function Draggable({ children, id, position }) {
  const { atrtributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = {
    position: "absolute",
    left: position.x,
    top: position.y,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
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

export default function Main() {
  const [meme, setMeme] = useState({
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
    imageUrl: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = useState([]);

  const [positions, setPositions] = useState({
    top: { x: 120, y: 0 },
    bottom: { x: 130, y: 240 },
  });

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function getRandomMemeImage() {
    setMeme((prevMeme) => ({
      ...prevMeme,
      imageUrl: allMemes[Math.floor(Math.random() * allMemes.length)].url,
    }));
  }

  function handleChange(event) {
    const { value, name } = event.currentTarget;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  function handleDragEnd(event) {
    const { delta, active } = event;
    setPositions((prevPositions) => ({
      ...prevPositions,
      [active.id]: {
        x: prevPositions[active.id].x + delta.x,
        y: prevPositions[active.id].y + delta.y,
      },
    }));
  }

  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            type="text"
            name="topText"
            placeholder="One does not simply"
            onChange={handleChange}
            value={meme.topText}
          />
        </label>

        <label>
          Bottom Text
          <input
            type="text"
            name="bottomText"
            placeholder="Walk into Mordor"
            onChange={handleChange}
            value={meme.bottomText}
          />
        </label>

        <button onClick={getRandomMemeImage}>Get a new meme image</button>
      </div>

      <DndContext
        modifiers={[restrictToParentElement]}
        onDragEnd={handleDragEnd}
      >
        <div className="meme">
          <img src={meme.imageUrl} />
          <Draggable id="top" position={positions.top}>
            {meme.topText}
          </Draggable>
          <Draggable id="bottom" position={positions.bottom}>
            {meme.bottomText}
          </Draggable>
        </div>
      </DndContext>
      <small className="hint">Hint: Drag the text to reposition it</small>
    </main>
  );
}
