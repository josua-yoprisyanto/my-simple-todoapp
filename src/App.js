import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Dashboard, Welcome, Authentication} from './pages/'
import Navbar from './components/NavigationBar'

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
