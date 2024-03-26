import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'

import Header from '../Header'
import SkillsCard from '../SkillsCard'
import SimilarJobCard from '../SimilarJobCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetailsRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetailsData: [],
    similarJobsData: [],
  }

  componentDidMount() {
    this.getJobsDetails()
  }

  getFormattedSimilarData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  getJobsDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const token = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updateData = this.getFormattedData(data.job_details)
      const updateSimilarJobs = data.similar_jobs.map(eachJob =>
        this.getFormattedSimilarData(eachJob),
      )
      this.setState({
        jobDetailsData: updateData,
        similarJobsData: updateSimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobLoadingView = () => (
    <div data-testid="loader" className="job-loader">
      <Loader type="ThreeDots" color="#ffffff" width={80} height={80} />
    </div>
  )

  renderJobFailureView = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    return (
      <div className="job-details-failure-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-view-img"
        />
        <h1 className="job-failure-heading">Oops! Something Went Wrong</h1>
        <p className="job-failure-description">
          We cannot seem to find the page you are looking for
        </p>
        <button
          type="button"
          id={id}
          className="failure-button"
          onClick={this.getJobsDetails}
        >
          Retry
        </button>
      </div>
    )
  }

  renderJobSuccessView = () => {
    const {jobDetailsData, similarJobsData} = this.state
    const {
      title,
      companyLogoUrl,
      companyWebsiteUrl,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      skills,
      lifeAtCompany,
    } = jobDetailsData
    const {description, imageUrl} = lifeAtCompany
    console.log(similarJobsData)

    return (
      <div className="job-success">
        <div className="job-details-content">
          <div className="logo-title-rating-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
          <div className="description-containers">
            <h1 className="description-heading">Description</h1>
            <div className="description-link-container">
              <a href={companyWebsiteUrl} className="web-link">
                Visit
              </a>
              <BiLinkExternal className="web-link" />
            </div>
          </div>
          <p className="job-description">{jobDescription}</p>
          <h1 className="description-heading">Skills</h1>
          <h1 className="description-heading">{skills.name}</h1>
          <ul className="skills-list-container">
            {skills.map(eachSkill => (
              <SkillsCard key={eachSkill.name} skillsDetails={eachSkill} />
            ))}
          </ul>
          <h1 className="description-heading">Life at Company </h1>
          <div className="life-at-company-container">
            <p className="life-description">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="life-at-company-img"
            />
          </div>
        </div>
        <h1 className="description-heading">Similar Jobs </h1>
        <ul className="skills-list-container">
          {similarJobsData.map(similarJob => (
            <SimilarJobCard
              similarJobDetails={similarJob}
              key={similarJob.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderAllJobsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobFailureView()
      case apiStatusConstants.inProgress:
        return this.renderJobLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-container">{this.renderAllJobsView()}</div>
      </>
    )
  }
}

export default JobItemDetailsRoute
