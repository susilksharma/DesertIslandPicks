/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import AlbumInfo from "./AlbumInfo";

//-----------------------------//
//---Album Details Component---//
//-----------------------------//
const AlbumDetails = () => {
  const [album, setAlbum] = useState(null);
  const albumId = useParams();
  const { currentUser } = useContext(UserContext);
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  //Fetch album details on component render
  useEffect(() => {
    fetch(`/album/${albumId.albumId}`)
      .then((response) => response.json())
      .then((data) => {
        setAlbum(data.data);
      })
      .catch((err) => navigate("/error"));
  }, []);

  //Add album to database
  const addAlbum = () => {
    isAuthenticated &&
      fetch(`/add-album`, {
        method: "PATCH",
        body: JSON.stringify({
          userId: currentUser.userId,
          userName: currentUser.name,
          pickId: album.id,
          title: album.title,
          artist: album.artists?.[0]?.name.replace(/ *\([^)]*\) */g, ""),
          image: album.images?.[0]?.uri,
          genre: album.genres?.[0],
          style: album.styles?.[0],
          year: album?.year,
          link: album.videos?.[0]?.uri.replace("watch?v=", "embed/"),
          main_release: album.main_release,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            window.alert("Album added to Picks!");
          } else {
            window.alert(data.message);
          }
        })
        .catch((error) => {
          console.error("Error,", error);
        });
  };

  return (
    <main>
      {/*Check album state is properly set before rendering  */}
      {!album ? (
        <LoadingDiv>
          <img src="/spinnerv1.gif" alt="spinner" />
        </LoadingDiv>
      ) : (
        <AlbumDiv>
          {!album.images[0].uri ? (
            <LoadingDiv>
              <img src="/spinnerv1.gif" alt="spinner" />
            </LoadingDiv>
          ) : (
            <ImgDiv onClick={addAlbum} isAuthenticated={isAuthenticated}>
              <img alt={`${album.title} cover`} src={album.images?.[0]?.uri} />
              <div>
                {isAuthenticated ? (
                  <h1>Add To Picks</h1>
                ) : (
                  <h1>Sign In To Add To Picks</h1>
                )}{" "}
              </div>
            </ImgDiv>
          )}
          <AlbumInfo album={album} />
        </AlbumDiv>
      )}
    </main>
  );
};

const LoadingDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const AlbumDiv = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: center;
  color: var(--dark-grey);

  h2 {
    font-size: 2em;
  }

  h3 {
    font-size: 1em;
    span {
      font-style: italic;
    }
  }

  p {
    font-size: 0.8em;
  }
`;

const ImgDiv = styled.div`
  position: relative;

  img {
    height: 550px;
    width: auto;
  }

  div {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 550px;
    width: 100%;
    transition: 0.5s ease;
    background-color: #464646;
    opacity: 0;
  }

  :hover div {
    opacity: 0.7;
    cursor: ${(props) => (props.isAuthenticated ? "pointer" : "not-allowed")};
    transition: all 0.4s ease-in-out;
  }

  h1 {
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
  }
`;

export default AlbumDetails;
