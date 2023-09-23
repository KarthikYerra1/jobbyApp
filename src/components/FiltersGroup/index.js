import ProfileCard from '../ProfileCard'

import './index.css'

const FiltersGroup = props => {
  const renderEmploymentTypes = () => {
    const {employmentTypesList, changeEmploymentType, employmentType} = props

    const onChangeEmploymentType = event => {
      if (event.target.checked) {
        employmentType.push(event.target.value)
      } else {
        const index = employmentType.indexOf(event.target.value)
        employmentType.splice(index, 1)
      }
      changeEmploymentType(employmentType)
    }

    return (
      <>
        <h2 className="filter-heading">Type of Employment</h2>
        <ul className="filter-list-container">
          {employmentTypesList.map(each => (
            <li
              key={each.employmentTypeId}
              className="filter-list-item-container"
            >
              <input
                id={each.employmentTypeId}
                value={each.employmentTypeId}
                type="checkbox"
                onChange={onChangeEmploymentType}
                className="filter-input-type"
              />
              <label className="filter-label" htmlFor={each.employmentTypeId}>
                {each.label}
              </label>
            </li>
          ))}
        </ul>
      </>
    )
  }

  const renderSalaryRange = () => {
    const {salaryRangesList, changeSalaryRange} = props

    const onChangeSalaryRange = event => {
      changeSalaryRange(event.target.value)
    }

    return (
      <>
        <h2 className="filter-heading">Salary Range</h2>
        <ul className="filter-list-container">
          {salaryRangesList.map(each => (
            <li className="filter-list-item-container" key={each.salaryRangeId}>
              <input
                id={each.salaryRangeId}
                value={each.salaryRangeId}
                type="radio"
                name="salaryRangesGroup"
                onChange={onChangeSalaryRange}
                className="filter-input-type"
              />
              <label className="filter-label" htmlFor={each.salaryRangeId}>
                {each.label}
              </label>
            </li>
          ))}
        </ul>
      </>
    )
  }

  return (
    <div className="filters-group-container">
      {/* {renderSearchBar()} */}
      <ProfileCard />
      <hr className="horizontal-line" />
      {renderEmploymentTypes()}
      <hr className="horizontal-line" />
      {renderSalaryRange()}
    </div>
  )
}

export default FiltersGroup
