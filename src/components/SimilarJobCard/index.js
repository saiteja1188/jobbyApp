import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobCard = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    title,
    location,
    rating,
  } = similarJobDetails

  return (
    <li className="similar-list-item">
      <div className="similar-logo-title-rating-container">
        <img src={companyLogoUrl} alt="similar job company logo" className="similar-logo" />
        <div className="title-rating-container">
          <h1 className="job-title">{title}</h1>
          <p className="job-rating">
            <FaStar className="rating-icon" />
            {rating}
          </p>
        </div>
      </div>
      <div className="description-container">
        <h1 className="description-heading">Description</h1>
        <p className="similar-description">{jobDescription}</p>
      </div>
      <div className="location-lpa-container">
        <div className="location-employment-type-container">
          <div className="location-container">
            <MdLocationOn color="#ffffff" />
            <p className="job-location">{location}</p>
          </div>
          <div className="location-container">
            <BsFillBriefcaseFill color="#ffffff" />
            <p className="job-empltype">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobCard
