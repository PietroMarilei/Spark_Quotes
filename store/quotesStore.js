// store/quotesStore.js
import create from 'zustand';

const useQuotesStore = create((set) => ({
    quotes: [],
    setQuotes: (quotes) => set(() => ({ quotes })),
    addQuote: (quote) => set((state) => ({ quotes: [...state.quotes, quote] })),
    deleteQuote: (id) => set((state) => ({ quotes: state.quotes.filter(q => q.id !== id) })),
    updateQuote: (id, updatedQuote) => set((state) => ({
        quotes: state.quotes.map(q => q.id === id ? { ...q, ...updatedQuote } : q)
    })),
}));

export default useQuotesStore;
