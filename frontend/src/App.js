// // import logo from './logo.svg';
// import './App.css';
// import Landingpage from './screens/Landingpage'
// import { BrowserRouter ,Routes, Route } from 'react-router-dom'
// import VideoplayPage from './screens/VideoplayPage'

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           <Route path='/' element={<Landingpage/>} exact />
//           <Route path='/videos/:id' element={<VideoplayPage />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

import logo from './logo.svg';
import './App.css';
import LandingPage from './screens/Landingpage'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import videoplayPage from './screens/VideoplayPage'

function App() {
  return (
    <div className="App">
        <Router>
          <Route path='/' component={LandingPage} exact />
          <Route path='/videos/:id' component={videoplayPage} />
        </Router>
    </div>
  );
}

export default App;

