import styled from "styled-components";

//-----------------------//
//---About Component-----//
//-----------------------//
const About = () => {
  return (
    <main>
      <Wrapper>
        <div>
          <h1>About Desert Island Picks</h1>
          <h3>
            Designed by Susil Sharma, in a fugue state, for Concordia Bootcamps.
            ©2022
          </h3>
          <iframe
            width="600"
            height="350"
            src="https://www.youtube.com/embed/V1c3yNCRn18"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;

  h3 {
    margin-top: 20px;
    font-size: 16px;
    font-style: normal;
  }
  iframe {
    margin-top: 20px;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px,
      rgba(17, 17, 26, 0.05) 0px 8px 32px;
  }
`;

export default About;
