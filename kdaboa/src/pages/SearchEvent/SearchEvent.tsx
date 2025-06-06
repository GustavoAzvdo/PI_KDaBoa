import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';
import FilterEvent from '../../components/FilterEvent/FilterEvent';
const SearchEvent = () => {
  const location = useLocation();
  const { setSearchText, setCategories, setDate } = useSearch();
  const [reloadTrigger, setReloadTrigger] = useState<number>(0)  // trigger pra forçar update

  useEffect(() => {
    if (location.state) {
      const { searchText, categories, date } = location.state;
      setSearchText(searchText || '');
      setCategories(categories || []);
      setDate(date || '');
    }
    setReloadTrigger((prev) => prev + 1) 
    window.scrollTo(0, 0)
  }, [location.state]);
  useEffect(() => {
    document.title = "Pesquisa evento"
  })
  return (
    <>
      <FilterEvent key={reloadTrigger}/>
    </>
  )
}

export default SearchEvent
