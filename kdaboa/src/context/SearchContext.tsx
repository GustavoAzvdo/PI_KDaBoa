import {createContext, useContext, useState, ReactNode} from 'react';

interface SearchContextType {

  searchText: string;
  categories: string[];
  idCategory: string[];
  date: string;
  city: string;
  setSearchText: (text: string) => void;
  setCategories: (categories: string[]) => void;
  setIdCategory: (idCategory: string[]) => void;
  setDate: (date: string) => void;
  setCity: (city: string) => void;
  
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [idCategory, setIdCategory] = useState<string[]>([]);
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');

  return (
    <SearchContext.Provider value={{ searchText, categories, idCategory, date,city,setCity, setSearchText, setCategories, setIdCategory, setDate }}>
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