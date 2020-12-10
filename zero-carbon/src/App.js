import React from 'react';
import SplashPage from './components/SplashPage';
import logo from './assets/zero-carbon-logo.png'
import ContactUS from './components/ContactUs'
import LearnMore from './components/LearnMore'



function App() {
  return (
    <div>
      <header>
        <img className="header-img" src={logo} alt="Trees with Zero Carbon in Front of it" />
      </header>
      <SplashPage />
      <footer>
        <ContactUS />
        <LearnMore />
      </footer>
    </div>
  );
}

export default App;
