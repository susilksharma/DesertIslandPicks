/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import ImageSmall from "./ImageSmall";
import MediaPicker from "./MediaPicker";
import { UserContext } from "../UserContext";
import { useContext } from "react";

// Import Swiper React components, modules and styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

//------------------------//
//---My Picks Component---//
//------------------------//
const SmallPicks = ({ user }) => {
  const [mediaPicked, setMediaPicked] = useState("album");
  const { currentUser } = useContext(UserContext);

  //MAKE BETTER LOGIC FOR THIS
  const [albumsclicked, setAlbumsclicked] = useState(1);
  const [moviesclicked, setMoviesclicked] = useState(0);
  const [booksclicked, setBooksclicked] = useState(0);

  const chooseBooks = (e) => {
    e.preventDefault();

    setMediaPicked("book");
    setAlbumsclicked(0);
    setMoviesclicked(0);
    setBooksclicked(1);
  };

  const chooseAlbums = (e) => {
    e.preventDefault();
    setMediaPicked("album");
    setAlbumsclicked(1);
    setMoviesclicked(0);
    setBooksclicked(0);
  };

  const chooseMovies = (e) => {
    e.preventDefault();
    setMediaPicked("movie");
    setAlbumsclicked(0);
    setMoviesclicked(1);
    setBooksclicked(0);
  };
  return (
    <Wrapper>
      {!user ? (
        <>
          <LoadingDiv>
            <img src="/spinnerv1.gif" alt="loading spinner" />
          </LoadingDiv>{" "}
        </>
      ) : !user[`${mediaPicked}Picks`] ? (
        <StyledSwiperSlide>
          <MediaPicker
            albumsclicked={albumsclicked}
            chooseAlbums={chooseAlbums}
            moviesclicked={moviesclicked}
            chooseMovies={chooseMovies}
            booksclicked={booksclicked}
            chooseBooks={chooseBooks}
            size={20}
          />
          {currentUser.userId !== user.userId ? (
            <h3>
              {user.given_name} hasn't picked any {mediaPicked}s yet
            </h3>
          ) : (
            <h3>You haven't picked any {mediaPicked}s yet</h3>
          )}
        </StyledSwiperSlide>
      ) : (
        <Swiper navigation={true} modules={[Navigation]}>
          {user[`${mediaPicked}Picks`].map((pick) => {
            return (
              <StyledSwiperSlide key={pick.pickId}>
                <MediaPicker
                  albumsclicked={albumsclicked}
                  chooseAlbums={chooseAlbums}
                  moviesclicked={moviesclicked}
                  chooseMovies={chooseMovies}
                  booksclicked={booksclicked}
                  chooseBooks={chooseBooks}
                  size={20}
                />
                <ImageSmall pick={pick} mediaPicked={mediaPicked} />
                <UserLink
                  to={`/picks/user/${user.userId}`}
                  style={{ textDecoration: "none" }}
                >
                  {currentUser.userId === user.userId ? (
                    <div> Your Picks</div>
                  ) : (
                    <div>{pick.userName}'s Picks</div>
                  )}
                </UserLink>
              </StyledSwiperSlide>
            );
          })}
        </Swiper>
      )}
    </Wrapper>
  );
};

const LoadingDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 300px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  overflow: hidden;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: #94d1d9;
  border-radius: 10px;
  color: var(--dark-grey);
  overflow: hidden;
`;

const UserLink = styled(Link)`
  text-decoration: none;
  color: var(--white);
  font-size: 24px;
  padding-bottom: 20px;

  :hover {
    color: #ec7274;
    transition: all 0.2s ease-in-out;
  }
`;

export default SmallPicks;
