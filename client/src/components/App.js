import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Profile from "./Profile";
import Explore from "./Explore";
import MyPicks from "./MyPicks";
import SearchResults from "./SearchResults";
import AlbumDetails from "./AlbumDetail";
import About from "./About";
// import AboutLink from "./AboutLink";

//-------------------//
//---App Component---//
//-------------------//
const App = () => {
  return (
    <Router>
      <Header />
      <GlobalStyles />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/mypicks" element={<MyPicks />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search/:searchValue" element={<SearchResults />} />
        <Route path="/album/:albumId" element={<AlbumDetails />} />
      </Routes>
      {/* <AboutLink /> */}
    </Router>
  );
};

export default App;
