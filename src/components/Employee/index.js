import './index.css'

const Employee = props => {
  const {employmentDetails} = props

  const onEmploymentType = event => {
    const {changeEmployment} = props
    changeEmployment(event.target.value)
  }
  return (
    <div>
      <h1>Type of Employment</h1>
      <ul>
        {employmentDetails.map(eachitem => (
          <li key={eachitem.employmentTypeId}>
            <input
              type="checkbox"
              id={`type-${eachitem.employmentTypeId}`}
              onChange={onEmploymentType}
              value={eachitem.employmentTypeId}
              className="checkboxes"
            />
            <label
              htmlFor={`type-${eachitem.employmentTypeId}`}
              className="checkboxes"
            >
              {eachitem.label}
            </label>
          </li>
        ))}
      </ul>
      <hr />
    </div>
  )
}

export default Employee
