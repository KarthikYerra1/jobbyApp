import {BsSearch} from 'react-icons/bs'

import './index.css'

const SearchContainer = props => {
  const {
    searchInputText,
    onChangeSearchInput,
    searchJobs,
    onEnterSearchInput,
    className,
  } = props

  const onChangeInputText = event => {
    onChangeSearchInput(event.target.value)
  }

  const onKeyDownEnter = event => {
    if (event.key === 'Enter') {
      onEnterSearchInput()
    }
  }

  const onClickSearchBtn = () => {
    searchJobs()
  }

  return (
    <div className={`input-container-search ${className}`}>
      <input
        value={searchInputText}
        placeholder="Search"
        onChange={onChangeInputText}
        type="search"
        onKeyDown={onKeyDownEnter}
        className="input-bar"
      />
      <button
        type="button"
        className="search-btn"
        onClick={onClickSearchBtn}
        data-testid="searchButton"
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  )
}

export default SearchContainer
