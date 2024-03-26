import ProfileDetails from '../ProfileDetails'

import './index.css'

const FilterGroup = props => {
  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event)
  }

  const onEnterSearchInput = event => {
    const {getJobs} = props
    if (event.key === 'Enter') {
      getJobs()
    }
  }

  const renderSearchInput = () => {
    const {searchInput, getJobs} = props

    return (
      <div className="filter-search-container">
        <input
          type="search"
          className="search-input-holder"
          placeholder="Search"
          value={searchInput}
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <button
          type="button"
          className="filter-search-button"
          data-testid="searchButton"
          onClick={getJobs}
        >
          S
        </button>
      </div>
    )
  }

  const renderSalaryRangeView = () => {
    const {salaryRangesList} = props

    return (
      <div className="salary-view">
      
        <h1 className="salary-heading">Salary Range</h1>
        <ul className="employ-type-list-container">
          {salaryRangesList.map(salaryRange => {
            const {changeSalary} = props
            const onSelectSalaryRange = () => {
              changeSalary(salaryRange.salaryRangeId)
            }

            return (
              <li
                key={salaryRange.salaryRangeId}
                className="employ-type-list"
                onClick={onSelectSalaryRange}
              >
                <input
                  type="checkbox"
                  id={salaryRange.salaryRangeId}
                  className="checkbox-input"
                  value={salaryRange.salaryRangeId}
                />
                <label htmlFor="salaryRange.salaryRangeId" className="label">
                  {salaryRange.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const renderEmploymentView = () => {
    const {employmentTypesList} = props

    return (
      <div className="employ-type-container">
        <h1 className="employ-heading">Type of Employment</h1>
        <ul className="employ-type-list-container">
          {employmentTypesList.map(eachType => {
            const {changeEmployeeType} = props
            const onSelectEmployType = event => {
              changeEmployeeType(event.target.value)
            }
            return (
              <li
                className="employ-type-list"
                key={eachType.employmentTypeId}
                onClick={onSelectEmployType}
              >
                <input
                  type="checkbox"
                  id={eachType.employmentTypeId}
                  value={eachType.employmentTypeId}
                  className="checkbox-input"
                />
                <label htmlFor={eachType.employmentTypeId} className="label">
                  {eachType.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div className="filter-group-container">
      {renderSearchInput()}
      <ProfileDetails />
      <hr />
      {renderEmploymentView()}
      <hr />
      {renderSalaryRangeView()}
    </div>
  )
}

export default FilterGroup
