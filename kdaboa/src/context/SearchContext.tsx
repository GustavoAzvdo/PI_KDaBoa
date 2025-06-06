import {createContext, useContext, useState, ReactNode} from 'react';

interface SearchContextType {

  searchText: string;
  categories: string[];
  date: string;
  setSearchText: (text: string) => void;
  setCategories: (categories: string[]) => void;
  setDate: (date: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [date, setDate] = useState('');

  return (
    <SearchContext.Provider value={{ searchText, categories, date, setSearchText, setCategories, setDate }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};