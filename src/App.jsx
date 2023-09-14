import { useEffect, useState } from "react";
// import validator from "validator";
import "./App.css";

function App() {
  function Shuffle() {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const update = setInterval(() => setCount((count) => count + 1), 1000);
      return () => clearInterval(update);
    }, []);

    return <span>{count}</span>;
  }

  const [play, setPlay] = useState(false);
  const [images, setImages] = useState({});
  const API_KEY = "39380271-ec268e1682d3ce925622b6531";
  const searchQuery = "dog";

  useEffect(() => {
    const fetchImages = async () => {
      const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
        searchQuery
      )}`;

      try {
        const response = await fetch(URL);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();

        if (parseInt(data.totalHits) > 0) {
          const obj = { ...images };
          data.hits.forEach(
            (hit, i) =>
              (obj[i] = { link: hit.userImageURL, num: i, clicked: false })
          );
          setImages((images) => ({ ...images, ...obj }));
        } else console.log("No hits");
      } catch (error) {
        console.log("Error: ", error);
      }

      if (play) fetchImages();
    };
  }, [play, images]);

  function Images() {
    return "";
  }

  return (
    <>
      <Images />
      <Shuffle />
    </>
  );
}

export default App;
