import { Box, Button, Typography, Modal } from '@mui/material'
import maps from '../../assets/maps.png'
import './Details.css'

import { useState } from 'react'

interface AddressProps {
    address: string;
    location: string
}

const Address = ({ address, location }: AddressProps) => {
    const [openMap, setOpenMap] = useState<boolean>(false);
  
    return (
        <Box className="address" sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Box className="img-maps" sx={{ paddingRight: 2 }}>
                <img src={maps} style={{ width: '60px', height: '60px' }} alt="" />
            </Box>
            <Box className="text-address">
                <Box sx={{ display: "flex", alignItems: "center" }} className="text-address-title">
                    <Typography className='t'>{location}</Typography>
                    <Button variant="outlined" className="btn-maps" sx={{ marginLeft: 3 }} onClick={() => setOpenMap(true)}>
                        <Typography >
                            Ver mapa
                        </Typography>
                    </Button>
                </Box>

                <Typography className="text-address-subtitle" sx={{ paddingTop: 2 }}>
                    {address}
                </Typography>
                {openMap &&
                    <Modal open={openMap} onClose={() => setOpenMap(false)}>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '80%',
                                height: '80%',
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                p: 2,
                            }}
                        >
                            <iframe
                                src={`https://www.google.com/maps?q=${location}&output=embed`}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                            ></iframe>
                        </Box>
                    </Modal>
                }

            </Box>
        </Box>
    )
}

export default Address