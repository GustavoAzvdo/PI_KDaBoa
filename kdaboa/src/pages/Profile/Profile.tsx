import NavbarEvent from "../../components/NavbarEvent/NavbarEvent"
import Title from "../../components/Title/Title"
import user from "../../assets/user.png"
import InfoProfile from "../../components/InfoProfile/InfoProfile"

const Profile = () => {
  return (
    <>  
        <NavbarEvent />
        <Title>
            Perfil <img src={user} style={{ width: 80, height:80, margin: 0 }} alt="" />
        </Title>
        <InfoProfile />
    </>
  )
}

export default Profile