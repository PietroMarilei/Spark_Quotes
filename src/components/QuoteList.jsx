// src/components/QuoteList.jsx
import React from "react";
import useQuotesStore from "../../store/quotesStore";
import QuoteItem from "./QuoteItem";

const QuoteList = () => {
  const { quotes } = useQuotesStore();

  return (
    <div>
      {quotes.map((quote) => (
        <QuoteItem key={quote.id} quote={quote} />
      ))}
    </div>
  );
};

export default QuoteList;
