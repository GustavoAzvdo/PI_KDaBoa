import React, { useState } from 'react';
import { Button, Modal, Box } from '@mui/material';

interface MapsProps {
    address: string;
    onClose: () => void;
}


const Maps = ({ address, onClose }: MapsProps) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            
            <Modal open={open} onClose={() => setOpen(false)}>
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
                        src={`https://www.google.com/maps?q=${address}&output=embed`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                    ></iframe>
                </Box>
            </Modal>

        </>
    )
}

export default Maps