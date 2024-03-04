import React, { useState } from "react";
import { db } from "../config/firebase"; // Assicurati che il percorso sia corretto
import { collection, addDoc } from "firebase/firestore";

const QuoteForm = () => {
  const [newQuoteAuthor, setNewQuoteAuthor] = useState("");
  const [newQuoteText, setNewQuoteText] = useState("");
  const [newQuoteUrl, setNewQuoteUrl] = useState("");

  const onSubmitQuote = async () => {
    if (!newQuoteAuthor || !newQuoteText) {
      alert("Author and text are required");
      return;
    }
    try {
      const quotesCollectionRef = collection(db, "quotes");
      await addDoc(quotesCollectionRef, {
        author: newQuoteAuthor,
        text: newQuoteText,
        url: newQuoteUrl,
      });
      setNewQuoteAuthor("");
      setNewQuoteText("");
      setNewQuoteUrl("");
      alert("Quote added successfully");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
//lol
  return (
    <div className="py-3">
      <input
        type="text"
        value={newQuoteAuthor}
        onChange={(e) => setNewQuoteAuthor(e.target.value)}
        placeholder="Quote author"
      />
      <textarea
        value={newQuoteText}
        onChange={(e) => setNewQuoteText(e.target.value)}
        placeholder="Quote text"
      />
      <input
        type="text"
        value={newQuoteUrl}
        onChange={(e) => setNewQuoteUrl(e.target.value)}
        placeholder="Quote URL (optional)"
      />
      <button onClick={onSubmitQuote} className="my-3">
        Add Quote
      </button>
    </div>
  );
};

export default QuoteForm;
