import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { useEffect, useState } from "react";
// import { useAuth0 } from "@auth0/auth0-react";

//------------------------//
//---My Picks Component---//
//------------------------//
const MyPicks = () => {
  const [picks, setPicks] = useState(null);
  // const { user } = useAuth0();

  //LOGIC TO GET SPECIFIC USER PICKS NEEDS TO CHANGE
  useEffect(() => {
    fetch(`/mypicks`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPicks(data.data[0].picks);
      });
  }, []);

  return (
    <main>
      {!picks ? (
        <>
          <ClipLoader />
        </>
      ) : (
        <Swiper navigation={true} modules={[Navigation]}>
          {picks.map((pick) => {
            return (
              <StyledSwiperSlide key={pick.id}>
                {pick.artist} - {pick.title}
                <img src={pick?.image} alt={`${pick?.title} album cover`} />
              </StyledSwiperSlide>
            );
          })}
        </Swiper>
      )}
    </main>
  );
};

const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 200px;
  background-color: #818fb5;
  border-radius: 10px;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  img {
    height: 200px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }
`;

export default MyPicks;
