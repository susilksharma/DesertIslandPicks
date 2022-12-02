/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import PickDetail from "./PickDetail";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { BsBook, BsMusicNote, BsFilm } from "react-icons/bs";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

//------------------------//
//---My Picks Component---//
//------------------------//
const MyPicks = () => {
  const [picks, setPicks] = useState(null);
  const { currentUser } = useContext(UserContext);
  const [mediaPicked, setMediaPicked] = useState("albums");

  //MAKE BETTER LOGIC FOR THIS
  const [albumsClicked, setAlbumsClicked] = useState(true);
  const [moviesClicked, setMoviesClicked] = useState(false);
  const [booksClicked, setBooksClicked] = useState(false);

  //LOGIC TO GET SPECIFIC USER PICKS NEEDS TO CHANGE
  useEffect(() => {
    fetch(`/picks/${mediaPicked}/${currentUser.userId}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setPicks(data.data);
      });
  }, [mediaPicked]);

  const chooseBooks = (e) => {
    e.preventDefault();
    setMediaPicked("books");
    setAlbumsClicked(false);
    setMoviesClicked(false);
    setBooksClicked(true);
  };

  const chooseAlbums = (e) => {
    e.preventDefault();
    setMediaPicked("albums");
    setAlbumsClicked(true);
    setMoviesClicked(false);
    setBooksClicked(false);
  };

  const chooseMovies = (e) => {
    e.preventDefault();
    setMediaPicked("movies");
    setAlbumsClicked(false);
    setMoviesClicked(true);
    setBooksClicked(false);
  };

  return (
    <main>
      {!picks ? (
        <>
          <LoadingDiv>
            <img src="/spinnerv1.gif" alt="spinner" />
          </LoadingDiv>
        </>
      ) : picks?.length === 0 ? (
        <h1>Search for an album to add to your Picks!</h1>
      ) : (
        <Swiper
          navigation={true}
          modules={[Navigation]}
          style={{ transition: "all 0.50s linear" }}
        >
          {picks.map((pick) => {
            return (
              <StyledSwiperSlide key={pick.albumId}>
                <MediaTypeDiv>
                  <BsMusicNote
                    size={30}
                    color={albumsClicked ? "#ec7274" : "#F8F8F8"}
                    onClick={chooseAlbums}
                  />
                  <BsFilm
                    size={30}
                    color={moviesClicked ? "#ec7274" : "#F8F8F8"}
                    onClick={chooseMovies}
                  />
                  <BsBook
                    size={30}
                    color={booksClicked ? "#ec7274" : "#F8F8F8"}
                    onClick={chooseBooks}
                  />
                </MediaTypeDiv>
                <PickDetail pick={pick} mediaPicked={mediaPicked} />
              </StyledSwiperSlide>
            );
          })}
        </Swiper>
      )}
    </main>
  );
};

const LoadingDiv = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

const MediaTypeDiv = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  background-color: var(--dark-grey);
  color: ${({ theme }) => theme.text};
  padding: 10px;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  /* width: 200px; */
  height: 500px;
  background-color: #afdad7;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  color: ${({ theme }) => theme.text};
`;

export default MyPicks;
