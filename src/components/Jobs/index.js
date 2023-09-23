import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import FiltersGroup from '../FiltersGroup'
import SearchContainer from '../SearchContainer'
import Header from '../Header'
import JobCard from '../JobCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    allJobsList: [],
    employmentType: [],
    salaryRange: '',
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    searchInputText: '',
  }

  componentDidMount() {
    this.getAllJobs()
  }

  getAllJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {employmentType, salaryRange, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        allJobsList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  //   onEnterSearchInput = () => {
  //     const {searchInputText} = this.state
  //     this.setState({searchInput: searchInputText}, this.getAllJobs)
  //   }

  //   enterSearchInput = event => {
  //     const {searchInputText} = this.state
  //     if (event.key === 'Enter') {
  //       this.setState({searchInput: searchInputText}, this.getAllJobs)
  //     }
  //   }

  //   onChangeSearchInput = event => {
  //     this.setState({searchInputText: event.target.value})
  //   }

  // changeSearchInput = value => {
  //     this.setState({searchInputText: value})
  //   }

  onChangeSearchInput = searchInputText => {
    this.setState({searchInputText})
  }

  onEnterSearchInput = () => {
    const {searchInputText} = this.state
    this.setState({searchInput: searchInputText}, this.getAllJobs)
  }

  searchJobs = () => {
    const {searchInputText} = this.state
    this.setState({searchInput: searchInputText}, this.getAllJobs)
  }

  changeEmploymentType = value => {
    this.setState({employmentType: value}, this.getAllJobs)
  }

  changeSalaryRange = value => {
    this.setState({salaryRange: value}, this.getAllJobs)
  }

  onClickRetry = () => {
    this.getAllJobs()
  }

  renderJobsFailure = () => (
    <div className="show-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-heading">Oops! Something Went Wrong</h1>
      <p className="no-jobs-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retry-btn" type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  getNoJobsPage = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </>
  )

  getAvailableJobs = availableJobs => (
    <>
      <ul className="jobs-list-container">
        {availableJobs.map(each => (
          <JobCard key={each.id} details={each} />
        ))}
      </ul>
    </>
  )

  renderJobsList = () => {
    const {allJobsList} = this.state

    const checkJobsAreThere = allJobsList.length > 0

    return (
      <div className="show-jobs-container">
        {!checkJobsAreThere
          ? this.getNoJobsPage()
          : this.getAvailableJobs(allJobsList)}
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-spinner-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.failure:
        return this.renderJobsFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {searchInputText, employmentType} = this.state

    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div>
            <SearchContainer
              searchInputText={searchInputText}
              onChangeSearchInput={this.onChangeSearchInput}
              onEnterSearchInput={this.onEnterSearchInput}
              searchJobs={this.searchJobs}
              className="sm-device-search"
            />
            <FiltersGroup
              searchInputText={searchInputText}
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              changeSearchInput={this.changeSearchInput}
              enterSearchInput={this.enterSearchInput}
              changeEmploymentType={this.changeEmploymentType}
              changeSalaryRange={this.changeSalaryRange}
              employmentType={employmentType}
            />
          </div>
          <div className="jobs-container">
            {/* <div className="input-container input-lg">
              <input
                value={searchInputText}
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                type="search"
                onKeyDown={this.enterSearchInput}
                className="input-bar sm-input"
              />
              <button
                type="button"
                className="search-btn lg-search-btn"
                onClick={this.onEnterSearchInput}
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div> */}
            <SearchContainer
              searchInputText={searchInputText}
              onChangeSearchInput={this.onChangeSearchInput}
              onEnterSearchInput={this.onEnterSearchInput}
              searchJobs={this.searchJobs}
              className="lg-device-search"
            />
            {this.renderAllJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
