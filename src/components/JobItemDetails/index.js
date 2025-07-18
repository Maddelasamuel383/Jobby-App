import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarJob from '../SimilarJob'
import SkillCard from '../SkillCard'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobCardDetails: [],
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.renderCard()
  }

  renderCard = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inprogress})
    const token = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(apiUrl, option)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = this.formattedData(data.job_details)
      const similarData = data.similar_jobs.map(eachSimilarJob =>
        this.formattedSimilarData(eachSimilarJob),
      )
      this.setState({
        jobCardDetails: updatedData,
        similarJobs: similarData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  formattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
  })

  formattedSimilarData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  finalResult = () => {
    const {jobCardDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      lifeAtCompany,
      skills,
    } = jobCardDetails
    const {description, imageUrl} = lifeAtCompany

    return (
      <div>
        <img src={companyLogoUrl} alt="job details company logo" />
        <a href={companyWebsiteUrl}>Visit</a>
        <p>{employmentType}</p>
        <p>{jobDescription}</p>
        <p>{location}</p>
        <p>{packagePerAnnum}</p>
        <p>{rating}</p>
        <h1>life at Company</h1>
        <img src={imageUrl} alt="life at company" />
        <p>Description</p>
        <p>{description}</p>
        <ul>
          <h1>Skills</h1>
          {skills.map(eachitem => (
            <SkillCard key={eachitem.name} skillDetails={eachitem} />
          ))}
        </ul>

        <ul>
          <h1>Similar Jobs</h1>
          {similarJobs.map(eachitem => (
            <SimilarJob key={eachitem.title} similarDetails={eachitem} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  failureRetry = () => {
    this.renderCard()
  }

  renderfaiureview = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        className="failureRetry"
        onClick={this.failureRetry}
      >
        Retry
      </button>
    </div>
  )

  onDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.finalResult()
      case apiStatusConstants.failure:
        return this.renderfaiureview()
      case apiStatusConstants.inprogress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div>{this.onDetails()}</div>
      </div>
    )
  }
}

export default JobItemDetails
