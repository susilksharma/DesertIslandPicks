/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";

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
const SmallPicks = ({ picks }) => {
  return (
    <Wrapper>
      {!picks ? (
        <>
          <ClipLoader />
        </>
      ) : picks?.length === 0 ? (
        <h1>Search for an album to add to your Picks!</h1>
      ) : (
        <Swiper navigation={true} modules={[Navigation]}>
          {picks.map((pick) => {
            return (
              <StyledSwiperSlide key={pick.albumId}>
                <Link to={`/album/${pick.albumId}`}>
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

const Wrapper = styled.div`
  width: 300px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
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
