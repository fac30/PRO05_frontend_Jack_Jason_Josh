import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ColoursProvider } from "./contexts/ColourContext"; // Ensure the path is correct
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Colours from "./pages/Colours";
import ColourPage from "./pages/ColourPage";
import SignUp from "./components/Auth/SignUp/SignUp";
import SignIn from "./components/Auth/SignIn/SignIn";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ColoursProvider>
          {" "}
          {/* Move the ColoursProvider here */}
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/colours" element={<Colours />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/colourpage" element={<ColourPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
          <Footer />
        </ColoursProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
