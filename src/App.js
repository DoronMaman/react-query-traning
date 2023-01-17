import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Home } from './components/home';
import { Movies } from './components/movies';
import { ReactQueryDevtools } from 'react-query/devtools'
import { RQMovies } from './components/RQMovies';
import { QueryClientProvider, QueryClient } from 'react-query';
import { RQSMovie } from './components/RQMovie';
import { DynamicUsersMovies } from './components/DynamicUsersMovies';
import { PaginationRole } from './components/paginationRole';
import { LoadingMore } from './components/loadingMore';
import { Card } from './components/card';

const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
    <div>
    <header className="header-fixed">

<div className="header-limiter">

  <h1>React<span>Query</span></h1>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/rq-movies'>RQ Movies</Link>
          </li>
          <li>
            <Link to='/pagination-role'>Pagination role</Link>
          </li>
          <li>
            <Link to='/loading-more'>Loading More</Link>
          </li>
        </ul>
      </nav>
      </div>
      </header>
      <Switch>
      <Route path='/dynamic-users-movies'>
          <DynamicUsersMovies movieIds={[1,3]}/>
        </Route>
        <Route path='/pagination-role'>
          <PaginationRole />
        </Route>
        <Route path='/loading-more'>
          <LoadingMore />
        </Route>
        <Route path='/rq-movies/:movieId'>
              <RQSMovie />
            </Route>
      
        <Route path='/rq-movies'>
          <RQMovies />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </div>
  </Router>
  <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />

  </QueryClientProvider>
  );
}

export default App;
