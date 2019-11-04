import React from "react";
import styled from "styled-components";

export default function SubmitBtn({ handleSubmit, isDisabled }) {
  return (
    <PostSubmit
      type="submit"
      value="送信"
      onClick={handleSubmit}
      disabled={isDisabled}
    />
  );
}

const PostSubmit = styled.input`
  font-size: 1.2em;
  font-weight: bold;
  color: white;
  padding: 10px 30px;
  border-radius: 5px;
  background-color: #0d3f67;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  @media (max-width: 700px) {
    font-weight: normal;
    font-size: 1em;
    padding: 5px 20px;
  }
`;
