import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Auth } from "./components/auth";
import { db } from "./config/firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";

function App() {
  const [quotesList, setQuotesList] = useState([]);

  //new quote state
  const [newQuoteAuthor, setNewQuoteAuthor] = useState("");
  const [newQuoteText, setNewQuoteText] = useState("");
  const [newQuoteUrl, setNewQuoteUrl] = useState("");

  const quotesCollectionRef = collection(db, "quotes");
  //read the data
  const getQuotesList = async () => {
    try {
      const data = await getDocs(quotesCollectionRef);
      //extrac data from data obj
      const quotes = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      //set  the movie list = data
      //lancia allo usetState
      setQuotesList(quotes);
    } catch (error) {
      console.error(error);
    }
  };
  //read the db
  useEffect(() => {
    getQuotesList();
  }, []);

  const onSubmitQuote = async () => {
    try {
      await addDoc(quotesCollectionRef, {
        author: newQuoteAuthor,
        text: newQuoteText,
        url: newQuoteUrl,
      });
      //how to empty the values ? 
      getQuotesList()
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Auth />
      <h1>SparkQuotes</h1>

      <h3>Add a Quote</h3>

      <div className="py-3">
        <input
          type="text"
          placeholder="quote author"
          onChange={(e) => setNewQuoteAuthor(e.target.value)}
        />
        {/* meglio textarea in teoria */}
        <input
          type="text"
          placeholder="quote text"
          onChange={(e) => setNewQuoteText(e.target.value)}
        />
        <input
          type="text"
          placeholder="quote url"
          onChange={(e) => setNewQuoteUrl(e.target.value)}
        />
        <button onClick={onSubmitQuote} className="my-3">
          Add Quote
        </button>
      </div>

      <div className="card">
        <h2 className="text-lg font-mono  py-2">quotes list :</h2>
        {/* maps trought quotesList all'arrivo di use effect */}
        {quotesList.map((quote, i) => (
          <div key={i}>
            <hr />
            <div>id:{quote.id}</div>
            <div>Author:{quote.author}</div>
            <div>Text:{quote.text}</div>
            <div>Url:{quote.url}</div>
            <hr />
          </div>
        ))}
        <p className=" text-red-500 text-lg font-bold py-3">
          Works with Tailwind
        </p>
      </div>
    </>
  );
}

export default App;
