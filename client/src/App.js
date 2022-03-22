import AppRoutes from './Routes';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './Assets/config/siteTheme';
import './App.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
      <ToastContainer position='top-right' autoClose={3000} closeOnClick pauseOnHover theme='colored' hideProgressBar />
    </ThemeProvider>
  );
}

export default App;
