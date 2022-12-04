/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { BsBook, BsMusicNote, BsFilm } from "react-icons/bs";

//-----------------------//
//---Explore Component---//
//-----------------------//
const Explore = () => {
  const { currentUser } = useContext(UserContext);
  const [popularPicks, setPopularPicks] = useState([]);

  useEffect(() => {
    fetch(`picks-popular/${currentUser.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPopularPicks(data.data);
      });
  }, []);

  return (
    <main>
      {popularPicks.length === 0 ? (
        <LoadingDiv>
          <img src="/spinnerv1.gif" alt="spinner" />
        </LoadingDiv>
      ) : (
        <>
          <FeedDiv>
            {popularPicks.map((pick) => {
              return (
                <Popular key={pick._id}>
                  <img src={pick.image} alt={`${pick.title} cover`} />
                  <ArtistLink to={`/${pick.type}/${pick.pickId}`}>
                    <h3>{pick.title}</h3>
                    <div>
                      <BsMusicNote
                        size={20}
                        style={{
                          display: pick.type === "album" ? "block" : "none",
                        }}
                      />
                      <BsFilm
                        size={20}
                        style={{
                          display: pick.type === "movie" ? "block" : "none",
                        }}
                      />
                      <BsBook
                        size={20}
                        style={{
                          display: pick.type === "book" ? "block" : "none",
                        }}
                      />
                    </div>
                  </ArtistLink>
                </Popular>
              );
            })}
          </FeedDiv>
          <h3>Popular With Friends</h3>
          <Line />
          <h3>Recommended For You:</h3>
        </>
      )}
    </main>
  );
};
const LoadingDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const FeedDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 30px;
`;

const ArtistLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-content: center;
  gap: 10px;
  text-decoration: underline;
  color: var(--dark-grey);
  text-decoration-thickness: 1.5px;

  :hover {
    text-decoration-thickness: 3px;
  }
`;

const Popular = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: #94d1d9;
  border-radius: 10px;
  color: var(--dark-grey);
  padding: 20px;
  height: 300px;
  width: 300px;
  text-align: center;

  img {
    height: 75%;
  }
`;

const Line = styled.div`
  width: 100%;
  border-top: 3px solid ${({ theme }) => theme.text};
  margin: 15px 0;
`;

export default Explore;
