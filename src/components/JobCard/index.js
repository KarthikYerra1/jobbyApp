import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import {Link} from 'react-router-dom'

import './index.css'

const JobCard = props => {
  const {details} = props
  const {id} = details

  const titleContainer = () => {
    const {companyLogoUrl, title, rating} = details
    return (
      <div className="title-logo-container">
        <img
          src={companyLogoUrl}
          alt="company logo"
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

  const locationPackageDetails = () => {
    const {location, employmentType, packagePerAnnum} = details
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

  const description = () => {
    const {jobDescription} = details

    return (
      <>
        <h1 className="job-description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </>
    )
  }

  return (
    <Link to={`jobs/${id}`} className="job-link">
      <li className="job-card-container">
        {titleContainer()}
        {locationPackageDetails()}
        <hr />
        {description()}
      </li>
    </Link>
  )
}

export default JobCard
