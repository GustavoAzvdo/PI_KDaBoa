import Navbar from '../../components/Navbar/Navbar'
import Search from '../../components/Search/Search'
import Carrousel from '../../components/CarroselEventHome/CarroselEventHome'
import BoxInfo from '../../components/BoxInfo/BoxInfo'
import Title from '../../components/Title/Title'
import Footer from '../../components/Footer/Footer'
import hangloose from '../../assets/hangloose.png'
import { Box } from '@mui/material'
import { useState, useEffect } from 'react'
import { Drawer, Typography, Button } from '@mui/material'
import cookies from '../../assets/cookies.png'
import './Home.css'
import { useSearch } from '../../context/SearchContext'
const Home = () => {
  const { setSearchText, setCategories, setDate } = useSearch();  
  const [open, setOpen] = useState<boolean>(false);
  const [accepted, setAccepted] = useState<boolean>(false);
 
  useEffect(() => {
    // Aqui você pode verificar localStorage se quiser persistência
    setOpen(true);
  }, []);

  const handleAccept = () => {
    setAccepted(true);
    setOpen(false);
  };

  const handleReject = () => {
    setAccepted(false);
    setOpen(false);
  };

  useEffect(() => {
    if (accepted) {
      localStorage.setItem('cookiesAccepted', 'true');

    }
  }, [accepted]);

  useEffect(() => {
    if (localStorage.getItem('cookiesAccepted') === 'true') {
      setOpen(false);
    }
  })

  useEffect(() => {
    document.title = "Home"
  })
  return (
    <>

      <Drawer anchor="bottom" open={open} >
       

          <Box p={2} display="flex" justifyContent="space-between" alignItems="center" sx={{ paddingY: 5, backgroundColor: '#f5f5f5' }}>
            <Box className="cookies" sx={{ gap: 2, px: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h3">Cookies? </Typography>
                <img src={cookies} alt="cokie" style={{ marginLeft: "10px" }} />
              </Box>
              <Typography>Utilizamos cookies pra melhorar sua experiência. Tudo bem pra você?</Typography>
            </Box>
            <Box display="flex" gap={4} sx={{px: 5}}>
              <Button size='large' className='cookies-acept' variant="contained" onClick={handleAccept}><Typography>Aceitar</Typography></Button>
              <Button size='large' className='cookies-reject' variant="outlined" onClick={handleReject}><Typography>Rejeitar</Typography></Button>
            </Box>
          </Box>
        
      </Drawer>

      <Navbar />
      <Box sx={{
        textAlign: { xs: 'center' },
        px: { xs: 2 }
      }}>
        <Title>
          Qual a boa de hoje? <img width="70" height="70" src={hangloose} alt="hang-ten" />
        </Title>

      </Box>
      <Search 
        showScreen={true} 
        onTextChange={setSearchText} 
        onCategoryChange={setCategories} 
        onDateChange={setDate}
      />
      <Carrousel />
      <BoxInfo />
      <Footer />
    </>
  )
}

export default Home