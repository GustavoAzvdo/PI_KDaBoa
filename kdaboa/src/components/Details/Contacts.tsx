import { Box, Typography } from '@mui/material'
import contacts from '../../assets/contacts.png'
import './Details.css'

const Contacts = () => {
    return (
        <Box className="contacts" sx={{ display: "flex", alignItems: "center", width: "100%",justifyContent: "flex-end" }}>
            <Box className="img-maps" sx={{paddingRight: 2}}>
                <img src={contacts} style={{ width: '60px', height: '60px' }} alt="" />
            </Box>
            <Box className="text-contacts">
                <Box sx={{ display: "flex", alignItems: "center" }} className="text-contacts-title">
                    <Typography className='t'>CONTATOS </Typography>

                </Box>
                <Box>
                    <Typography className="text-contacts-subtitle" sx={{ paddingTop: 2 }}>Telefone 1: &nbsp; (12) 9770-7070</Typography>
                    <Typography className="text-contacts-subtitle" sx={{ paddingTop: 0 }}>Telefone 2: &nbsp; (11) 4002-8922</Typography>
                    <Typography className="text-contacts-subtitle" sx={{ paddingTop: 0 }}>Email:&nbsp; cdg@gmail.com</Typography>
                </Box>


            </Box>
        </Box>
    )
}

export default Contacts