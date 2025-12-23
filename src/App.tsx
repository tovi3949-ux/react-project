import RoutesComponent from './routes/routes'
import Header from './components/Header'
import Footer from './components/Footer' 
import { Box } from '@mui/material'
function App() {
  return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'  }}>
        <Box sx={{position: 'fixed', top: 0, width: '100%', zIndex: 1100}}>
          <Header />
        </Box>
        <Box component="main" sx={{ flexGrow: 1, py: 3, mt: '64px' }}>
          <RoutesComponent />
        </Box>
        <Footer />
      </Box>
  )
}

export default App