import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Authentication from './pages/Authentication';
import Particle from './components/Particle';
import Home from './pages/Home';

function App() {

  return (
    <>
      <Router>
        <Particle />
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
