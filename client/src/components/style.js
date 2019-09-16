import React from "react";
import styled from "styled-components"

export const H3 = styled.h3`
 margin: 0px;
 color: #0D3F67;
 @media (max-width:700px){
     font-size: 12px;
 }
`

export const H2 = styled.h2`
 text-align: center;
 margin-bottom: 10px;
 color: #0D3F67;
 @media (max-width:700px){
     font-size: 16px;
 }
`

export const RowDiv = styled.div`
 display: flex;
 flex-direction: row;
 margin: 0 10%;
`

export const PostInput = styled.input`
 width: 80%;
 height: 4em;
 margin-bottom: 20px;
 border-radius: 5px;
 @media (max-width:700px){
    height: 3em;
    margin-bottom: 0;
 }
`

export const CenterBtn = styled.button`
 text-align: center;
`

export const CenterDiv = styled.div`
 text-align: center;
`

export const PostDiv = styled.div`
 margin: 100px auto 50px;
 width: 500px;
 height: 500px;
 padding: 20px;
 border: 0.5px solid #F5F7F9;
 border-radius: 10px;
 background-color: #F2F4F6;
  @media (max-width:700px){
     width: 80%;
     height: 350px;
  }
`
export const Button = styled.button`
 font-size: 1.2em;
 padding: 10px 30px;
 border-radius: 5px;
 background-color: #0D3F67;
 color: white;
 font-weight: bold;
 @media (max-width:700px){
     font-weight: normal;
     font-size: 1em;
     padding: 5px 20px;
 }
`