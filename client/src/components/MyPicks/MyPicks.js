/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";
import PickDetail from "./PickDetail";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";

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

  console.log(currentUser);

  //LOGIC TO GET SPECIFIC USER PICKS NEEDS TO CHANGE
  useEffect(() => {
    fetch(`/mypicks/${currentUser.userId}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setPicks(data.data);
      });
  }, []);

  return (
    <main>
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
                <PickDetail pick={pick} />
              </StyledSwiperSlide>
            );
          })}
        </Swiper>
      )}
    </main>
  );
};

const StyledSwiperSlide = styled(SwiperSlide)`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  /* width: 200px; */
  height: 500px;

  /* background-color: #94d1d9; */
  border-radius: 10px;
  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px; */
  color: ${({ theme }) => theme.text};
`;

export default MyPicks;
