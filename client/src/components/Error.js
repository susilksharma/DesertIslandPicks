import styled from "styled-components";

//---------------------//
//---Error Component---//
//---------------------//
const Error = () => {
  return (
    <main>
      <Wrapper>
        <h1> \_(ツ)_/¯ </h1>
        <h1>Error, Please Try Again</h1>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 50px;
  }
`;

export default Error;
