import React from "react";
import styled from "styled-components";

export const FromName = styled.h2`
  text-align: center;
  margin-bottom: 10px;
  color: #0d3f67;
  @media (max-width: 700px) {
    font-size: 16px;
  }
`;

export const CenterBtn = styled.button`
  text-align: center;
`;

export const CenterDiv = styled.div`
  text-align: center;
`;

export const PostWrapper = styled.div`
  margin: 100px auto 50px;
  width: 500px;
  height: 500px;
  padding: 20px 40px;
  border: 0.5px solid #f5f7f9;
  border-radius: 10px;
  background-color: #f2f4f6;
  @media (max-width: 700px) {
    width: 80%;
    height: 350px;
  }
`;
