const SimilarJob = props => {
  const {similarDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarDetails

  return (
    <div>
      <img src={companyLogoUrl} alt="similar job company logo" />
      <p>{employmentType}</p>
      <p>{jobDescription}</p>
      <p>{location}</p>
      <p>{rating}</p>
      <h1>{title}</h1>
    </div>
  )
}
export default SimilarJob
