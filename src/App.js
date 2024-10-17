

import {
  Routes,
  Route
} from 'react-router-dom';


import Registration from './components/registration/Registration';
import ShowAll from './components/registration/ShowAll';
import PageNotFound from './pages/not-found/PageNotFound';
import EditRegistration from './components/registration/EditRegistration';
 

// import './App.css';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <ShowAll /> } />
        <Route path='/show-all-registrations' element={ <ShowAll /> } />
        <Route path='/add-new-registration' element={ <Registration /> } />
        <Route path='/edit-registration' element={ <EditRegistration /> } />
        <Route path='*' element={ <PageNotFound /> }> </Route>
      </Routes> 
    </div>
  );
}

export default App;
