import './App.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import AppRoutes from './Routes';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './Assets/siteTheme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
