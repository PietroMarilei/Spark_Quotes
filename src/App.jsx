
import React, { useEffect, useState } from 'react';
import './App.css';
import { db, auth } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import AuthComponent from './components/AuthComponent';
import QuoteForm from './components/QuoteForm';
import QuoteList from './components/QuoteList';
import useQuotesStore from "../store/quotesStore";

function App() {
  const { quotes, setQuotes } = useQuotesStore();

  const [updatedAuthor, setUpdatedAuthor] = useState("");
  const quotesCollectionRef = collection(db, "quotes");

  const getQuotesList = async () => {
    try {
      const data = await getDocs(quotesCollectionRef);
      const quotes = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
       setQuotes(quotes);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchQuotes = async () => {
    const quotesCollectionRef = collection(db, "quotes");
    const data = await getDocs(quotesCollectionRef);
    const quotes = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setQuotes(quotes);
  };
  //-----------------------------
    getQuotesList();
  }, []);

  const onSubmitQuote = async () => {
    try {
      await addDoc(quotesCollectionRef, {
        author: newQuoteAuthor,
        text: newQuoteText,
        url: newQuoteUrl,
        userId: auth?.currentUser?.uid,
      });
      // Ricarica le citazioni dopo l'aggiunta per aggiornare l'interfaccia utente
      const data = await getDocs(quotesCollectionRef);
      const quotes = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setQuotes(quotes); // Aggiorna lo store Zustand con le nuove citazioni
    } catch (error) {
      console.error(error);
    }
  };

  const deleteQuote = async (id) => {
    const quoteDoc = doc(db, "quotes", id);
    await deleteDoc(quoteDoc);
    getQuotesList();
  };

  // const updateQuoteAuthor = async (id) => {
  //   const quoteDoc = doc(db, "quotes", id);
  //   await updateDoc(quoteDoc, { author: updatedAuthor });
  //   getQuotesList();
  //   setUpdatedAuthor("test")
  // };
  const updateQuoteAuthor = async (id, newAuthor) => {
    const quoteDoc = doc(db, "quotes", id);
    await updateDoc(quoteDoc, { author: newAuthor });
    getQuotesList(); 
  };

  return (
    <>
      <AuthComponent />
      <h1>SparkQuotes</h1>
      <QuoteForm
      />
      <QuoteList
      />
    </>
  );
}

export default App;
