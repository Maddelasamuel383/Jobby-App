const SkillCard = props => {
  const {skillDetails} = props
  const {imageUrl, name} = skillDetails
  return (
    <div>
      <li>
        <img src={imageUrl} alt={name} />
        <p>{name}</p>
      </li>
    </div>
  )
}
export default SkillCard
