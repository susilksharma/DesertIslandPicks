/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BsBook, BsMusicNote, BsFilm } from "react-icons/bs";
import { useState } from "react";

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
const SmallPicks = ({ user }) => {
  const [mediaPicked, setMediaPicked] = useState("album");

  //MAKE BETTER LOGIC FOR THIS
  const [albumsClicked, setAlbumsClicked] = useState(true);
  const [moviesClicked, setMoviesClicked] = useState(false);
  const [booksClicked, setBooksClicked] = useState(false);

  const chooseBooks = (e) => {
    e.preventDefault();

    setMediaPicked("book");
    setAlbumsClicked(false);
    setMoviesClicked(false);
    setBooksClicked(true);
  };

  const chooseAlbums = (e) => {
    e.preventDefault();
    setMediaPicked("album");
    setAlbumsClicked(true);
    setMoviesClicked(false);
    setBooksClicked(false);
  };

  const chooseMovies = (e) => {
    e.preventDefault();
    setMediaPicked("movie");
    setAlbumsClicked(false);
    setMoviesClicked(true);
    setBooksClicked(false);
  };
  console.log(user);
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
          <MediaTypeDiv>
            <BsMusicNote
              size={20}
              color={albumsClicked ? "#ec7274" : "#F8F8F8"}
              onClick={chooseAlbums}
            />
            <BsFilm
              size={20}
              color={moviesClicked ? "#ec7274" : "#F8F8F8"}
              onClick={chooseMovies}
            />
            <BsBook
              size={20}
              color={booksClicked ? "#ec7274" : "#F8F8F8"}
              onClick={chooseBooks}
            />
          </MediaTypeDiv>
          <h3>
            {user.given_name} hasn't Picked any {mediaPicked}s
          </h3>
        </StyledSwiperSlide>
      ) : (
        <Swiper navigation={true} modules={[Navigation]}>
          {user[`${mediaPicked}Picks`].map((pick) => {
            return (
              <StyledSwiperSlide key={pick.pickId}>
                <MediaTypeDiv>
                  <BsMusicNote
                    size={20}
                    color={albumsClicked ? "#ec7274" : "#F8F8F8"}
                    onClick={chooseAlbums}
                  />
                  <BsFilm
                    size={20}
                    color={moviesClicked ? "#ec7274" : "#F8F8F8"}
                    onClick={chooseMovies}
                  />
                  <BsBook
                    size={20}
                    color={booksClicked ? "#ec7274" : "#F8F8F8"}
                    onClick={chooseBooks}
                  />
                </MediaTypeDiv>
                <Link to={`/${mediaPicked}s/${pick.pickId}`}>
                  <ImgDiv>
                    <img src={pick?.image} alt={`${pick?.title} album cover`} />
                    <div>
                      <figure>
                        <AiOutlineEye color="#F8F8F8" size={40} />
                      </figure>
                    </div>
                  </ImgDiv>
                </Link>
                <div>{pick.userName}'s Picks</div>
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
`;

const MediaTypeDiv = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  background-color: var(--dark-grey);
  color: ${({ theme }) => theme.text};
  padding: 5px;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: #94d1d9;
  border-radius: 10px;
  color: var(--dark-grey);
  padding: 20px;

  div {
    color: var(--white);
    font-size: 24px;
  }
`;

const ImgDiv = styled.div`
  position: relative;

  img {
    height: 160px;
    width: auto;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    /* margin: 20px; */
  }

  div {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    transition: 0.5s ease;
    background-color: #464646;
    opacity: 0;
  }

  :hover div {
    opacity: 0.7;
    cursor: pointer;
  }

  figure {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
  }
`;

export default SmallPicks;
