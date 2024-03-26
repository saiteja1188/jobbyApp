import {Link} from 'react-router-dom'

import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {jobsDetails} = props
  const {
    id,
    title,
    companyLogoUrl,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = jobsDetails

  return (
    <Link to={`/jobs/${id}`} className="nav-link">
      <li className="job-list-item">
        <div className="logo-tile-rating-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="job-company-logo"
          />
          <div className="title-rating-container">
            <h1 className="job-title">{title}</h1>
            <p className="job-rating">
              <FaStar className="rating-icon" />
              {rating}
            </p>
          </div>
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
          <p className="lpa">{packagePerAnnum}</p>
        </div>
        <hr />
        <div className="description-container">
          <h1 className="description-heading">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
