import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Dashboard, Welcome, Authentication, NotFound } from './pages/'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
