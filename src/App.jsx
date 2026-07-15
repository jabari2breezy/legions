import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Impact from './pages/Impact';
import Programs from './pages/Programs';
import GetInvolved from './pages/GetInvolved';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

function App() {
  return (
    <>
      <div className="global-bg"></div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="impact" element={<Impact />} />
            <Route path="programs" element={<Programs />} />
            <Route path="get-involved" element={<GetInvolved />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
