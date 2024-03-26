import './index.css'

const SkillsCard = props => {
  const {skillsDetails} = props
  const {imageUrl, name} = skillsDetails

  return (
    <li className="skills-list-items">
      <img src={imageUrl} alt={name} className="skills-img" />
      <p className="skills-name">{name}</p>
    </li>
  )
}

export default SkillsCard
