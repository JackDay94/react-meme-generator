import trollFace from '../images/troll-face.png';

export default function Header() {
    return (
        <header className="header">
            <img src={trollFace} alt="Image of a Troll Face meme" />
            <h1>Meme Generator</h1>
        </header>
    )
}