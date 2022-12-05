import styled from "styled-components";

//FIGURE OUT LATER!!!!
const EditProfileField = ({
  labelName,
  placeholder,
  name,
  handleChange,
  value,
}) => {
  return (
    <label>
      {labelName}
      <ReviewInput
        type="text"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </label>
  );
};

const ReviewInput = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 5px;
`;

export default EditProfileField;
