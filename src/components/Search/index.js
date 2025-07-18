import './index.css'

import {FaSearch} from 'react-icons/fa'

const Search = props => {
  const {searchInput} = props

  const onChange = event => {
    const {onChangeInput} = props
    onChangeInput(event.target.value)
  }

  const inputRes = event => {
    const {onRess} = props
    if (event.key === 'Enter') {
      onRess()
    }
  }

  const getsearched = () => {
    const {onRess} = props
    onRess()
  }

  return (
    <div className="searchInput">
      <input
        type="search"
        value={searchInput}
        onChange={onChange}
        onKeyDown={inputRes}
        placeholder="search"
        className="searchbar"
      />
      <button data-testid = "searchButton" type="button" onClick={getsearched}>
        <FaSearch className="searchimg" />
      </button>
    </div>
  )
}
export default Search
