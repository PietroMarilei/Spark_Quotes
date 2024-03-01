import React, { useState } from "react";
import useQuotesStore from "../../store/quotesStore";

const QuoteItem = ({ quote }) => {
  const { deleteQuote, updateQuote } = useQuotesStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedAuthor, setEditedAuthor] = useState(quote.author);
  const [editedText, setEditedText] = useState(quote.text);
  const [editedUrl, setEditedUrl] = useState(quote.url);

  const handleDelete = () => {
    deleteQuote(quote.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedAuthor(quote.author);
    setEditedText(quote.text);
    setEditedUrl(quote.url);
  };

  const handleSave = () => {
    updateQuote(quote.id, {
      author: editedAuthor,
      text: editedText,
      url: editedUrl,
    });
    setIsEditing(false);
  };

  return (
    <div className="quote-item">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedAuthor}
            onChange={(e) => setEditedAuthor(e.target.value)}
          />
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <input
            type="text"
            value={editedUrl}
            onChange={(e) => setEditedUrl(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>Author: {quote.author}</p>
          <p>Text: {quote.text}</p>
          <p>Url: {quote.url}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default QuoteItem;
