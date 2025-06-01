import { useEffect } from "react"
import FilterEvent from "../../components/FilterEvent/FilterEvent"

const SearchEvent = () => {
  useEffect (() => {
    document.title = "Pesquisa evento"
  })
  return (
    <>
      <FilterEvent />
    </>
  )
}

export default SearchEvent