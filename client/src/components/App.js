import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header/Header";
import Profile from "./Profile/Profile";
import Explore from "./Explore";
import MyPicks from "./MyPicks/MyPicks";
import SearchResults from "./SearchResults/SearchResults";
import AlbumDetails from "./Album//AlbumDetail";
import About from "./About";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./Theme";
import AboutLink from "./AboutLink";

//-------------------//
//---App Component---//
//-------------------//
const App = () => {
  const { mode } = useContext(UserContext);
  const [theme, setTheme] = useState("light");
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <Router>
      <Header themeToggler={themeToggler} />
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles mode={mode} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/mypicks" element={<MyPicks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search/:searchValue" element={<SearchResults />} />
          <Route path="/album/:albumId" element={<AlbumDetails />} />
        </Routes>
        <AboutLink />
      </ThemeProvider>
    </Router>
  );
};

export default App;
