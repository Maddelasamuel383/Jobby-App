import './index.css'

const Salary = props => {
  const {salaryDetails, changeSalary, activePackage} = props
  return (
    <div>
      <h1>Salary Range</h1>
      <ul>
        {salaryDetails.map(eachitem => (
          <li key={eachitem.salaryRangeId}>
            <input
              type="radio"
              className="radioinputs"
              checked={activePackage === eachitem.salaryRangeId}
              id={`salary-${eachitem.salaryRangeId}`}
              onChange={() => changeSalary(eachitem.salaryRangeId)}
              value={eachitem.salaryRangeId}
            />
            <label
              htmlFor={`salary-${eachitem.salaryRangeId}`}
              className="radioinputs"
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

export default Salary
