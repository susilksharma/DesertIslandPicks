import { AiOutlineEye } from "react-icons/ai";
import styled from "styled-components";

const ImageLarge = ({ pick }) => {
  return (
    <ImgDiv>
      <img src={pick?.image} alt={`${pick?.title} album cover`} />
      <div>
        <figure>
          <AiOutlineEye color="#F8F8F8" size={40} />
        </figure>
      </div>
    </ImgDiv>
  );
};

const ImgDiv = styled.div`
  position: relative;

  img {
    height: 300px;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
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
    height: 300px;

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

export default ImageLarge;
