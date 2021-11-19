import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles'
import BookListing from './components/dashboard/bookListing';
import BookDetail from './components/dashboard/bookDetail';

const App = () => {

  const theme = createTheme({
    typography: {
      fontFamily: [
        'VarelaRound',
      ].join(','),
    },
  })
  
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={BookListing} />
          <Route path="/book/:bookId" component={BookDetail} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
