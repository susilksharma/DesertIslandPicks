import Popup from "reactjs-popup";
import styled from "styled-components";
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai";
import { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import EditProfileField from "./EditProfileField";

//-----------------------------//
//---Review Pop Up Component---//
//-----------------------------//
const EditProfile = ({ userInfo }) => {
  const { currentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    given_name: userInfo.given_name,
    family_name: userInfo.family_name,
    favAuthor: userInfo.favAuthor,
    favMovie: userInfo.favMovie,
    favMusicalArtist: userInfo.favMusicalArtist,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitEdit = (e, formData) => {
    e.preventDefault();
    fetch(`/profile-edit`, {
      method: "PATCH",
      body: JSON.stringify({
        ...formData,
        userId: currentUser.userId,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        window.alert(data.message);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error,", error);
      });
  };

  return (
    userInfo && (
      <Popup
        trigger={<AddReviewButton>Edit Profile</AddReviewButton>}
        modal
        nested
      >
        {(close) => (
          <ModalDiv>
            <StyledButton>
              <AiFillCloseCircle size={30} onClick={close} />
            </StyledButton>
            <ReviewForm
              onSubmit={(e) => {
                submitEdit(e, formData);
                window.location.reload();
              }}
            >
              <div>
                <label>
                  First Name:
                  <ReviewInput
                    type="text"
                    placeholder={userInfo.given_name}
                    name="given_name"
                    value={formData.given_name}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Last Name:
                  <ReviewInput
                    type="text"
                    placeholder={userInfo.family_name}
                    name="family_name"
                    value={formData.family_name}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Favorite Movie:
                  <ReviewInput
                    type="text"
                    placeholder={userInfo.favMovie}
                    name="favMovie"
                    value={formData.favMovie}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Favorite Author:
                  <ReviewInput
                    type="text"
                    placeholder={userInfo.favAuthor}
                    name="favAuthor"
                    value={formData.favAuthor}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Favorite Musician:
                  <ReviewInput
                    type="text"
                    placeholder={userInfo.favMusicalArtist}
                    name="favMusicalArtist"
                    value={formData.favMusicalArtist}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <SaveButton type="submit" value="Save" />
            </ReviewForm>
          </ModalDiv>
        )}
      </Popup>
    )
  );
};

const AddReviewButton = styled.button`
  background: none;
  border: none;
  text-decoration: none;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  :hover {
    background-color: #595959;
    transition: all 0.4s ease-in-out;
  }
`;

const ModalDiv = styled.div`
  background: #556678;
  color: var(--white);
  border-radius: 10px;
  width: 40vw;
  font-size: 12px;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
`;

const StyledButton = styled.div`
  cursor: pointer;
  position: absolute;
  display: block;
  padding: 2px 5px;
  line-height: 20px;
  right: -10px;
  top: -10px;
`;

const ReviewForm = styled.form`
  width: 80%;
  margin: 0 10%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ReviewInput = styled.input`
  width: 100%;
  height: 40px;
  margin: 10px;
  border-radius: 5px;
  padding: 10px;
`;

const SaveButton = styled.input`
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 16px;
  margin-top: 10px;
  background-color: #8c8c8c;
  color: var(--white);

  :hover {
    background-color: #595959;
    transition: all 0.4s ease-in-out;
  }
`;

export default EditProfile;
