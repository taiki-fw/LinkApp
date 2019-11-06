import React from "react";
import styled from "styled-components";

const responsiveFontSize = 12;

export default function Input({
  inputName,
  need,
  type,
  name,
  value,
  handleChange,
  errMsg
}) {
  return (
    <label>
      <InputName>
        {inputName}
        <Need need={need}>{need ? "必須" : ""}</Need>
      </InputName>
      <PostInput
        type={type}
        name={name}
        value={value}
        onChange={e => handleChange(e)}
      />
      <Error>{errMsg}</Error>
    </label>
  );
}

const InputName = styled.h3`
  color: #0d3f67;
  @media (max-width: 700px) {
    font-size: ${responsiveFontSize}px;
  }
`;

const Need = styled.span`
  color: red;
  margin-left: 0.5em;
  border-width: ${props => (props.need ? "1px" : "0px")};
  border-style: solid;
  border-color: red;
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

const Error = styled.p`
  color: red;
  background-color: #fff00000;
  height: 1em;
`;
