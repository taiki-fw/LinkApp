import React from "react";
import styled from "styled-components";

const responsiveFontSize = 12;

export default function Input({
  inputName,
  type,
  value,
  name,
  handleChange,
  errMsg
}) {
  return (
    <label>
      <InputName>{inputName}</InputName>
      <PostInput
        type={type}
        value={value}
        name={name}
        onChange={e => handleChange(e)}
      />
      {errMsg}
    </label>
  );
}

const InputName = styled.h3`
  color: #0d3f67;
  @media (max-width: 700px) {
    font-size: ${responsiveFontSize}px;
  }
`;

const PostInput = styled.input`
  font-size: 1em;
  width: 100%;
  padding: 0.75em 0 0.75em 0.5em;
  border-radius: 5px;
  @media (max-width: 700px) {
    font-size: ${responsiveFontSize}px;
    padding: 0.5em 0 0.5em 0.25em;
  }
`;
