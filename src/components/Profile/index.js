import './index.css'

const Profile = props => {
  const {bioDetails} = props
  const {name, profileImageUrl, shortBio} = bioDetails

  return (
    <div className="profile-con">
      <h1>{name}</h1>
      <img src={profileImageUrl} alt="profile" />
      <p>{shortBio}</p>
    </div>
  )
}

export default Profile
