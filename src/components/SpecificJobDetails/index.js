import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill, BsBoxArrowUpRight} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import SimilarJobItems from '../SimilarJobItems'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class SpecificJobDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobData: [],
    similarJobDetails: [],
    skills: [],
    lifeAtCompany: [],
  }

  componentDidMount() {
    this.getSpecificJobData()
  }

  getSpecificJobData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }
      const skills = data.job_details.skills.map(each => ({
        name: each.name,
        imageUrl: each.image_url,
      }))
      const similarJobDetails = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      const lifeAtCompany = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }
      this.setState({
        jobData: updatedData,
        similarJobDetails,
        apiStatus: apiStatusConstants.success,
        skills,
        lifeAtCompany,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  titleContainer = () => {
    const {jobData} = this.state
    const {companyLogoUrl, title, rating} = jobData

    return (
      <div className="title-logo-container">
        <img
          src={companyLogoUrl}
          alt="job details company logo"
          className="job-company-logo"
        />
        <div className="title-rating-container">
          <h1 className="job-title">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="star-icon" />
            <p className="job-rating">{rating}</p>
          </div>
        </div>
      </div>
    )
  }

  locationPackageDetails = () => {
    const {jobData} = this.state

    const {location, employmentType, packagePerAnnum} = jobData
    return (
      <div className="location-package-container">
        <div className="location-type-container">
          <div className="location-container">
            <MdLocationOn className="job-icons" />
            <p className="job-location">{location}</p>
          </div>
          <div className="location-container">
            <BsBriefcaseFill className="job-icons" />
            <p className="job-location">{employmentType}</p>
          </div>
        </div>
        <p className="job-location">{packagePerAnnum}</p>
      </div>
    )
  }

  descriptionContainer = () => {
    const {jobData} = this.state
    const {companyWebsiteUrl} = jobData
    return (
      <div className="description-link-container">
        <h1 className="specific-job-item-description-heading">Description</h1>
        <a
          href={companyWebsiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="specific-job-company-link"
        >
          Visit <BsBoxArrowUpRight />
        </a>
      </div>
    )
  }

  skillsContainer = skills => (
    <>
      <h2 className="skills-heading">Skills</h2>
      <ul className="skills-container">
        {skills.map(each => {
          const {name, imageUrl} = each
          return (
            <li className="skill-container" key={name}>
              <img src={imageUrl} alt={name} className="skill-icon" />
              <p className="skill-name">{name}</p>
            </li>
          )
        })}
      </ul>
    </>
  )

  lifeAtCompanyContainer = life => (
    <div className="life-at-company-container">
      <div className="life-at-company-description-container">
        <h1 className="life-at-company-heading">Life at Company</h1>
        <p className="life-at-company-description">{life.description}</p>
      </div>
      <img
        src={life.imageUrl}
        className="life-at-company-image"
        alt="life at company"
      />
    </div>
  )

  renderSimilarJobDetails = () => {
    const {similarJobDetails} = this.state
    return (
      <>
        <h1 className="similar-jobs-list-heading">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobDetails.map(each => (
            <SimilarJobItems key={each.id} details={each} />
          ))}
        </ul>
      </>
    )
  }

  renderJobDataSuccess = () => {
    const {jobData, skills, lifeAtCompany} = this.state
    const {jobDescription} = jobData
    return (
      <div className="specific-job-container">
        <div className="job-card-container margin-style">
          {this.titleContainer()}
          {this.locationPackageDetails()}
          <hr />
          {this.descriptionContainer()}
          <p className="job-description">{jobDescription}</p>
          {this.skillsContainer(skills)}
          {this.lifeAtCompanyContainer(lifeAtCompany)}
        </div>
        {this.renderSimilarJobDetails()}
      </div>
    )
  }

  onClickRetryJob = () => {
    this.getSpecificJobData()
  }

  renderJobDataFailure = () => (
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
      <button
        className="retry-btn"
        type="button"
        onClick={this.onClickRetryJob}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-spinner-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  renderApiStatusBasedFunction = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDataSuccess()
      case apiStatusConstants.failure:
        return this.renderJobDataFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderApiStatusBasedFunction()}
      </>
    )
  }
}

export default SpecificJobDetails
