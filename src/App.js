import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card } from 'react-bootstrap';
import { auth, googleAuthProvider, signInWithGoogle} from './utils/firebase';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Login from './Login';
import Home from './Home';
import NewPost from './NewPost';

function App() {

  return (
    <Router>
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<Login />}>
        </Route>

        <Route path="home" element={<Home />}>
        </Route>

        <Route path="post" element={<NewPost />}>
        </Route>

      </Routes>
    </Router>
    
  );
}

export default App;
