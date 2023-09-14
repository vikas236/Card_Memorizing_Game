import { useEffect, useState } from "react";
// import validator from "validator";
import "./App.css";

function App() {
  const [play, setPlay] = useState(false);
  const [images, setImages] = useState([]);
  const API_KEY = "39380271-ec268e1682d3ce925622b6531";
  const searchQuery = "dog";
  const [points, setPoints] = useState(0);

  function Score() {
    return <span>{points}</span>;
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  function checkWinner(images, i) {
    const arr = images.images;
    if (arr[i].click == false) {
      arr[i].click = true;
      setPoints(points + 1);
      console.log("Score:" + (points + 1));
      shuffle(arr);
    } else {
      gameOver();
      console.log("Score:" + points);
    }
  }

  function gameOver() {
    console.log("GameOver");
    setImages([]);
    setPlay(false);
    setPoints(0);
  }

  useEffect(() => {
    const fetchImages = async () => {
      const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
        searchQuery
      )}`;
      console.log("hi");

      try {
        const response = await fetch(URL);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();

        const arr = [];
        let newImages = [];
        if (parseInt(data.totalHits) > 0) {
          data.hits.forEach((hit) => {
            const url = hit.userImageURL;
            if (url) arr.push(url);
          });
          newImages = arr.map((l, i) => ({ link: l, num: i, click: false }));
          setImages(newImages);
        } else console.log("No hits");
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    if (play) fetchImages();
  }, [play]);

  function Images(images) {
    const arr = images.images;
    const response = arr.map((l, i) => (
      <img
        key={i}
        onClick={() => checkWinner(images, i)}
        src={l.link}
        alt="image"
      />
    ));
    return response;
  }

  return (
    <>
      <button onClick={() => setPlay(true)}>Start</button>
      <Images images={images} />
      <Score />
    </>
  );
}

export default App;
