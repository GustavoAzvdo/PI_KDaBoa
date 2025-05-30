import { Box, Typography } from '@mui/material'
import contacts from '../../assets/contacts.png'
import './Details.css'


interface ContactsProps {
    telefone1: string;
    telefone2: string;
    email: string
}
const Contacts = ({ telefone1, telefone2, email }: ContactsProps) => {
    return (
        <Box className="contacts" sx={{ display: "flex", alignItems: "center", width: "100%"}}>
            <Box className="img-maps" sx={{paddingRight: 2}}>
                <img src={contacts} style={{ width: '60px', height: '60px' }} alt="" />
            </Box>
            <Box className="text-contacts">
                <Box sx={{ display: "flex", alignItems: "center" }} className="text-contacts-title">
                    <Typography className='t'>CONTATOS </Typography>

                </Box>
                <Box>
                    <Typography className="text-contacts-subtitle" sx={{ paddingTop: 2 }}>Telefone 1: &nbsp; {telefone1}</Typography>
                    <Typography className="text-contacts-subtitle" sx={{ paddingTop: 0 }}>Telefone 2: &nbsp; {telefone2}</Typography>
                    <Typography className="text-contacts-subtitle" sx={{ paddingTop: 0 }}>Email:&nbsp; {email}</Typography>
                </Box>


            </Box>
        </Box>
    )
}

export default Contacts