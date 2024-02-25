import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Auth } from "./components/auth";
import { db } from "./config/firebase";
import { getDocs, collection } from "firebase/firestore";

function App() {
  const [count, setCount] = useState(0);
  const [quotesList, setQuotesList] = useState([]);

  const quotesCollectionRef = collection(db, "quotes");
  //read the db
  useEffect(() => {
    const getQuotesList = async () => {
      //read the data
      try {
        const data = await getDocs(quotesCollectionRef);
        //extrac data from data obj
        const quotes = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        //lancia allo usetState, ma react fa schifo e devo mappare
        setQuotesList(quotes);
      } catch (error) {
        console.error(error);
      }
      //set  the movie list = data
    };

    getQuotesList();
  }, []);

  return (
    <>
      <Auth />

      <h1>SparkQuotes</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <br />
        <h2 className="text-lg font-mono  py-2">quotes list :</h2>
      {/* maps trought quotesList all'arrivo di use effect */}
        {quotesList.map((quote) => (
          <>
            <hr />
            <div>id:{quote.id}</div>
            <div>Author:{quote.author}</div>
            <div>Text:{quote.text}</div>
            <div>Url:{quote.url}</div>
            <hr />
          </>
        ))}
        <p className=" text-red-500 text-lg font-bold py-3">
          Works with Tailwind
        </p>
      </div>
    </>
  );
}

export default App;
