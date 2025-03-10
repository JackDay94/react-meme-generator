import { useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import DraggableText from "./DraggableText";

export default function Main() {
  const [meme, setMeme] = useState({
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
    imageUrl: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = useState([]);

  // Position of the meme text
  const [positions, setPositions] = useState({
    top: { x: 120, y: 0 },
    bottom: { x: 130, y: 240 },
  });

  // Fetch all meme data from the Imgflip API and store it in the allMemes state
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  /**
   * Get a random meme image from the allMemes array and set it as the imageUrl in the meme state
   */
  function getRandomMemeImage() {
    setMeme((prevMeme) => ({
      ...prevMeme,
      imageUrl: allMemes[Math.floor(Math.random() * allMemes.length)].url,
    }));
  }

  /**
   * Dynamically update the meme text based on the input field value 
   */
  function handleChange(event) {
    const { value, name } = event.currentTarget;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  /**
   * Handle the drag end event to update the position of the dragged text
   */
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
      {/* Meme form */}
      <div className="form">
        <label>
          Top Text
          <input
            type="text"
            name="topText"
            placeholder="One does not simply"
            onChange={handleChange}
            value={meme.topText}
            maxLength={25}
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
            maxLength={25}
          />
        </label>

        <button onClick={getRandomMemeImage}>Get a new meme image</button>
      </div>
    
      {/* Meme display */}  
      <DndContext
        modifiers={[restrictToParentElement]}
        onDragEnd={handleDragEnd}
      >
        <div className="meme">
          <img src={meme.imageUrl} />
          <DraggableText id="top" position={positions.top}>
            {meme.topText}
          </DraggableText>
          <DraggableText id="bottom" position={positions.bottom}>
            {meme.bottomText}
          </DraggableText>
        </div>
      </DndContext>
      
      <small className="hint">Hint: Drag the text to reposition it</small>
    </main>
  );
}
