/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";
import { useAuth0 } from "@auth0/auth0-react";

//-----------------------------//
//---Album Details Component---//
//-----------------------------//
const AlbumDetails = () => {
  const [album, setAlbum] = useState(null);
  const albumId = useParams();
  const { user } = useAuth0();
  const { currentUser } = useContext(UserContext);

  console.log(currentUser);

  //Fetch album details on component render
  useEffect(() => {
    fetch(`/album/${albumId.albumId}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setAlbum(data.data);
      })
      //WHAT TO DO WITH ERROR
      .catch((err) => console.log("Error: ", err));
  }, []);

  //   Fetch Spotify info
  //   useEffect(() => {
  //     // https://api.spotify.com/v1/search?q=album:nevermind%20artist:nirvana&type=album
  //     fetch(
  //       `https://api.spotify.com/v1/search?q=/spotify/${album?.title}%20artist:${album?.artists?.[0]?.name}&type=album`,
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //           Authorization:
  //             "Bearer ",
  //         },
  //       }
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data);
  //       })
  //       //WHAT TO DO WITH ERROR
  //       .catch((err) => console.log("Error: ", err));
  //   }, [album]);

  const addAlbum = () => {
    fetch(`/add-album`, {
      method: "PATCH",
      body: JSON.stringify({
        userId: currentUser.userId,
        userName: currentUser.name,
        albumId: album.id,
        title: album.title,
        artist: album.artists?.[0]?.name,
        image: album.images?.[0]?.uri,
        genre: album.genres?.[0],
        style: album.styles?.[0],
        year: album?.year,
        video: album.videos?.[0]?.uri.replace("watch?v=", "embed/"),
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
        window.alert("Sorry, please try again.");
      });
  };

  console.log("album: ", album);
  return (
    <main>
      {!album ? (
        <div>
          <img src="/spinnerv1.gif" alt="spinner" />
        </div>
      ) : (
        <AlbumDiv>
          <ImgDiv onClick={addAlbum}>
            <img alt={`${album.title} cover`} src={album.images?.[0]?.uri} />
            <div>
              <h1>Add To Picks</h1>
            </div>
          </ImgDiv>
          <InfoDiv>
            <h2>
              <ArtistLink to={`/search/${album.artists?.[0]?.name}`}>
                {album.artists?.[0]?.name}
              </ArtistLink>{" "}
              - {album.title}
            </h2>
            <h3>
              <span>
                {album.genres?.[0]}/{album.styles?.[0]}
              </span>
              {", "}
              {album?.year}
            </h3>
            <Tracklist>
              {album.tracklist?.map((track) => {
                return (
                  <p key={track?.position}>
                    {track?.position}. {track?.title}
                  </p>
                );
              })}
            </Tracklist>
            <iframe
              src={album.videos?.[0]?.uri.replace("watch?v=", "embed/")}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="video"
              width="400px"
              height="220px"
            />
          </InfoDiv>
        </AlbumDiv>
      )}
    </main>
  );
};

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

const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Tracklist = styled.div`
  display: flex;
  flex-flow: column wrap;
  height: 200px;
`;

const ArtistLink = styled(Link)`
  text-decoration: underline;
  color: var(--dark-grey);
`;

export default AlbumDetails;
