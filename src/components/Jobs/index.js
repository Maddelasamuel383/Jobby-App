import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Employee from '../Employee'
import Salary from '../Salary'
import Search from '../Search'
import Jobitem from '../JobItem'
import Profile from '../Profile'

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
  inprogress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    searchInput: '',
    activePackage: '',
    activeEmployment: [],
    jobsList: [],
    profileData: {},
    apiStatus: apiStatusConstants.initial,
    apiProfileStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.renderJobs()
    this.renderProfile()
  }

  renderProfile = async () => {
    this.setState({apiProfileStatus: apiStatusConstants.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/profile`
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, option)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const latestData = fetchedData.profile_details
      const updateData = {
        name: latestData.name,
        profileImageUrl: latestData.profile_image_url,
        shortBio: latestData.short_bio,
      }
      this.setState({
        profileData: updateData,
        apiProfileStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiProfileStatus: apiStatusConstants.failure})
    }
  }

  profileFail = () => {
    this.renderProfile()
  }

  profileRetry = () => (
    <div>
      <button type="button" className="failureRetry" onClick={this.profileFail}>
        Retry
      </button>
    </div>
  )

  profile = () => {
    const {profileData} = this.state
    return (
      <div>
        <Profile bioDetails={profileData} />
      </div>
    )
  }

  renderJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inprogress})
    const {searchInput, activePackage, activeEmployment} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmployment.join()}&minimum_package=${activePackage}&search=${searchInput}`
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, option)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(eachitem => ({
        companyLogoUrl: eachitem.company_logo_url,
        employmentType: eachitem.employment_type,
        id: eachitem.id,
        jobDescription: eachitem.job_description,
        location: eachitem.location,
        packagePerAnnum: eachitem.package_per_annum,
        rating: eachitem.rating,
        title: eachitem.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderfinal = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.onOutput()
      case apiStatusConstants.failure:
        return this.renderfaiureview()
      case apiStatusConstants.inprogress:
        return this.renderLoading()
      default:
        return null
    }
  }

  renderprofile = () => {
    const {apiProfileStatus} = this.state
    switch (apiProfileStatus) {
      case apiStatusConstants.success:
        return this.profile()
      case apiStatusConstants.failure:
        return this.profileRetry()
      case apiStatusConstants.inprogress:
        return this.renderLoading()
      default:
        return null
    }
  }

  changeEmployment = type => {
    const {activeEmployment} = this.state
    const employeeNotInList = activeEmployment.filter(
      eachitem => eachitem === type,
    )
    if (employeeNotInList.length === 0) {
      this.setState(
        prevstate => ({
          activeEmployment: [...prevstate.activeEmployment, type],
        }),
        this.renderJobs,
      )
    } else {
      const filteredList = activeEmployment.filter(
        eachitem => eachitem !== type,
      )
      this.setState({activeEmployment: filteredList}, this.renderJobs)
    }
  }

  changeSalary = activePackage => {
    this.setState({activePackage}, this.renderJobs)
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  failureRetry = () => {
    this.renderJobs()
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

  specifications = () => {
    const {activePackage} = this.state
    return (
      <div>
        <Employee
          employmentDetails={employmentTypesList}
          changeEmployment={this.changeEmployment}
        />

        <Salary
          salaryDetails={salaryRangesList}
          changeSalary={this.changeSalary}
          activePackage={activePackage}
        />
      </div>
    )
  }

  onChange = searchInput => {
    this.setState({searchInput})
  }

  onRess = () => {
    this.renderJobs()
  }

  onOutput = () => {
    const {jobsList} = this.state
    const itemsInList = jobsList.length > 0
    return itemsInList ? (
      <div>
        <ul>
          {jobsList.map(eachitem => (
            <Jobitem key={eachitem.id} jobsDetails={eachitem} />
          ))}
        </ul>
      </div>
    ) : (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="not jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters.</p>
      </div>
    )
  }

  searchresult = () => {
    const {searchInput} = this.state
    return (
      <div className="search-con">
        <Search
          searchInput={searchInput}
          onChangeInput={this.onChange}
          onRess={this.onRess}
        />
      </div>
    )
  }

  render() {
    return (
      <div>
        <Header />
        <div className="jobs-page">
          <div className="jobs-page-specifications">
            {this.renderprofile()}
            {this.specifications()}
          </div>
          <div className="jobitems">
            {this.searchresult()}
            {this.renderfinal()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
