import logo from './logo.svg';
import './App.css';
import Product from './Product';
import Box from '@mui/material/Box';
import { createStyles, makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: "0.75%",
      height: "100%"
    },
  }),
);

const theme = createTheme();

function App() {
  const classes = useStyles();
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <Product />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
