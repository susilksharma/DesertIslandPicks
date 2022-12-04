import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header/Header";
import Profile from "./Profile/Profile";
import Explore from "./Explore";
import Error from "./Error";
import Picks from "./Picks/Picks";
import AlbumSearchResults from "./SearchResults/AlbumSearchResults";
import BookSearchResults from "./SearchResults/BookSearchResults";
import MovieSearchResults from "./SearchResults/MovieSearchResults";
import MovieSearchGenreResults from "./SearchResults/MovieSearchGenreResults";
import MovieSearchDirectorResults from "./SearchResults/MovieSearchDirectorResults";
import AlbumDetails from "./Album/AlbumDetails";
import BookDetails from "./Book/BookDetails";
import MovieDetails from "./Movies/MovieDetails";
import About from "./About";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./Theme";
import AboutLink from "./AboutLink";

//-------------------//
//---App Component---//
//-------------------//
const App = () => {
  const [theme, setTheme] = useState("light");
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <Router>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <Header themeToggler={themeToggler} />
        <GlobalStyles />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/error" element={<Error />} />
          <Route path="/picks/user/:userId" element={<Picks />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route
            path="/search-album/:searchValue"
            element={<AlbumSearchResults />}
          />
          <Route
            path="/search-book/:searchValue"
            element={<BookSearchResults />}
          />
          <Route
            path="/search-movie/:searchValue"
            element={<MovieSearchResults />}
          />
          <Route
            path="/search-movie-genre/:genreId"
            element={<MovieSearchGenreResults />}
          />
          <Route
            path="/search-movie-director/:directorId"
            element={<MovieSearchDirectorResults />}
          />
          <Route path="/album/:albumId" element={<AlbumDetails />} />
          <Route path="/book/:bookId" element={<BookDetails />} />
          <Route path="/movie/:movieId" element={<MovieDetails />} />
        </Routes>
        <AboutLink />
      </ThemeProvider>
    </Router>
  );
};

export default App;
