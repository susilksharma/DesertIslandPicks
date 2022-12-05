/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import PickDetail from "./PickDetail";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import MediaPicker from "./MediaPicker";
import { useParams, Link } from "react-router-dom";

// Import Swiper React components, modules and styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

//------------------------//
//---My Picks Component---//
//------------------------//
const Picks = () => {
  const [picks, setPicks] = useState(null);
  const { userId } = useParams();
  const { currentUser } = useContext(UserContext);
  const [mediaPicked, setMediaPicked] = useState("album");

  const [albumsclicked, setAlbumsclicked] = useState(1);
  const [moviesclicked, setMoviesclicked] = useState(0);
  const [booksclicked, setBooksclicked] = useState(0);
  console.log(picks);
  useEffect(() => {
    fetch(`/picks/${mediaPicked}/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setPicks(data.data);
      });
  }, [mediaPicked, userId]);

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
    <main>
      {!picks ? (
        <>
          <LoadingDiv>
            <img src="/spinnerv1.gif" alt="spinner" />
          </LoadingDiv>
        </>
      ) : picks.length === 0 ? (
        <Swiper
          navigation={true}
          modules={[Navigation]}
          style={{
            transition: "all 0.50s linear",
            borderRadius: "10px",
          }}
        >
          <StyledSwiperSlide>
            <MediaPicker
              albumsclicked={albumsclicked}
              chooseAlbums={chooseAlbums}
              moviesclicked={moviesclicked}
              chooseMovies={chooseMovies}
              booksclicked={booksclicked}
              chooseBooks={chooseBooks}
              mediaPicked={mediaPicked}
              size={30}
            />
            <h1>No {mediaPicked} picks yet</h1>
          </StyledSwiperSlide>
        </Swiper>
      ) : (
        <>
          {userId !== currentUser.userId && (
            <Title>
              <ProfileLink to={`/profile/${picks[0].userId}`}>
                {picks[0].userName}
              </ProfileLink>
              's Picks
            </Title>
          )}
          <Swiper
            navigation={true}
            modules={[Navigation]}
            style={{
              transition: "all 0.50s linear",
              borderRadius: "10px",
            }}
          >
            {picks.map((pick, i) => {
              return (
                <StyledSwiperSlide key={pick.albumId}>
                  <MediaPicker
                    albumsclicked={albumsclicked}
                    chooseAlbums={chooseAlbums}
                    moviesclicked={moviesclicked}
                    chooseMovies={chooseMovies}
                    booksclicked={booksclicked}
                    chooseBooks={chooseBooks}
                    mediaPicked={mediaPicked}
                    size={30}
                  />
                  <PickDetail pick={pick} mediaPicked={mediaPicked} />
                  <div>
                    {i + 1}/<span>{picks.length}</span>
                  </div>
                </StyledSwiperSlide>
              );
            })}
          </Swiper>
        </>
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

const ProfileLink = styled(Link)`
  text-decoration: underline;
  color: var(--dark-grey);
  text-decoration-thickness: 0.5px;

  :hover {
    text-decoration-thickness: 2px;
  }
`;

const Title = styled.h2`
  width: 95%;
  text-align: right;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  height: fit-content;
  min-height: 530px;
  padding-bottom: 20px;
  background-color: #c1cce3;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  color: var(--dark-grey);
  overflow: hidden;
`;

export default Picks;
