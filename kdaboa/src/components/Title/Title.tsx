import { Box, Grid, Typography } from '@mui/material'
import hangloose from '../../assets/hangloose.png'

import './Title.css'
const Title = ({children} : any) => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 12 }}>
                    <Box className='search'>
                        <Typography>
                            {children} <img width="70" height="70" src={hangloose} alt="hang-ten" />
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Title