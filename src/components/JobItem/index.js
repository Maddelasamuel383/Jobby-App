import {Link} from 'react-router-dom'

const Jobitem = props => {
  const {jobsDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    id,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobsDetails

  return (
    <div>
      <Link to={`/jobs/${id}`}>
        <li>
          <img src={companyLogoUrl} alt="company logo" />
          <p>{employmentType}</p>
          <h1>{jobDescription}</h1>
          <p>{location}</p>
          <p>{packagePerAnnum}</p>
          <p>{rating}</p>
          <p>{title}</p>
        </li>
      </Link>
    </div>
  )
}
export default Jobitem
