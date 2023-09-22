import {AiFillStar} from 'react-icons/ai'

import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobItems = props => {
  const {details} = props

  const similarJobTitleContainer = () => {
    const {companyLogoUrl, title, rating} = details

    return (
      <div className="title-logo-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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

  const similarJobDescriptionContainer = () => {
    const {jobDescription} = details

    return (
      <>
        <h1 className="similar-job-desc-heading">Description</h1>
        <p className="similar-job-description">{jobDescription}</p>
      </>
    )
  }

  const similarJobLocationTypeContainer = () => {
    const {employmentType, location} = details

    return (
      <div className="similar-job-location-type-container">
        <div className="location-container">
          <MdLocationOn className="job-icons" />
          <p className="job-location">{location}</p>
        </div>
        <div className="location-container similar-job-location-margin">
          <BsBriefcaseFill className="job-icons" />
          <p className="job-location">{employmentType}</p>
        </div>
      </div>
    )
  }

  return (
    <li className="similar-job-items-container">
      {similarJobTitleContainer()}
      {similarJobDescriptionContainer()}
      {similarJobLocationTypeContainer()}
    </li>
  )
}

export default SimilarJobItems
