import { useState } from "react"

export default function Main() {
    const [meme, setMeme] = useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        imageUrl: "http://i.imgflip.com/1bij.jpg",
    })

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input type="text" name="topText" placeholder="One does not simply"/>
                </label>

                <label>Bottom Text
                    <input type="text" name="bottomText" placeholder="Walk into Mordor"/>
                </label>

                <button>Get a new meme image</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}