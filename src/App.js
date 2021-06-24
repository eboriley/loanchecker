import './App.css';
import React, { useState } from 'react';
import LoanPage from './components/LoanPage';
import Loans from './components/Loans';
import Debtors from './components/Debtors';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isSubmitting, setIsSubmitted] = useState(false);
  
  function submitForm() {
    setIsSubmitted(true)
  }
  
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={LoanPage}/>
          <Route exact path="/debtors" component={Debtors}/>
          <Route exact path="/loans/:id" component={Loans}/>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
