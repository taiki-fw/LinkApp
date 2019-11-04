import React from "react";
import styled from "styled-components"

export const RedP = styled.p`
 color: red;
 font-size: 1.1rem;
 @media (max-width:700px){
     font-size: 0.9rem;
 }
`

export const H3 = styled.h3`
 margin: 0px;
 color: #0D3F67;
 @media (max-width:700px){
     font-size: 0.9rem;
 }
`

export const H2 = styled.h2`
 text-align: center;
 margin-bottom: 10px;
 color: #0D3F67;
 @media (max-width:700px){
     font-size: 1.0rem;
 }
`

export const RowDiv = styled.div`
 display: flex;
 flex-direction: row;
 margin: 0 10%;
`

export const PostInput = styled.input`
 width: 80%;
 padding: 14px 0;
 margin-bottom: 10px;
 border-radius: 5px;
 font-size: 1.1rem;
 border-style: none;
 border: 1px solid gray;
 @media (max-width:700px){
    padding: 8px 0;
    margin-bottom: 0;
    font-size: 0.8rem;
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
 border: 0.5px solid #420000;
 border-radius: 10px;
 background-color: #d4d7dd;
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
 :hover {
     opacity: 0.8;
     cursor: pointer;
 }
 @media (max-width:700px){
     font-weight: normal;
     font-size: 1em;
     padding: 5px 20px;
 }
`

export const Li = styled.li`
 width: 200px;
 height: 300px;
 box-shadow: 4px 4px 4px #999;
 margin: 20px 30px;
 padding: 1em;
 transition: 0.2s;
 background-color: white;
 display: inline;
 :hover {
     box-shadow: 8px 8px 8px #999;
     cursor: pointer;
 }
 @media(max-width:1040px){
     margin: 10px 20px;
 }
 @media (max-width:700px){
     width: 100px;
     height: 150px;
     margin: 10px 10px;
     padding: 5px;
 }
`

export const CardH3 = styled.h3`
 color: #0D3F67;
 text-align: center;
 margin: 10px;
 @media (max-width:700px) {
     font-size: 12px;
     margin: 5px;
 }
`

export const CardP = styled.p`
 padding: 5px;
 text-align: left;
 color: black;
 @media(max-width:700px){
     font-size: 10px;
 }
`

export const PageLi = styled.li`
 padding: 0.25em 0.5em;
 margin: 0.1em;
 border: 1px solid #0D3F67;
 color: #0D3F67;
 display: inline;
 :hover {
     cursor: pointer;
     background-color: #0D3F67;
     color: white;
 }
`

export const PageUl = styled.ul`
 display: flex;
 flex-wrap: wrap;
 list-style-type: none;
 margin: 10px;
 padding: 0;
`

export const CardUl = styled.ul`
 display: flex;
 flex-wrap: wrap;
 list-style-type: none;
 text-align: center;
 padding: 0;
 margin-left: 2%;
`

export const TopH1 = styled.h1`
 margin: 20px 50px;
`

export const EditButton = styled.button`
 position: absolute;
 z-index: 2;
 right: 0;
 bottom: 5px;
 border-style: none;
 border: 1px solid black;
 
 :hover {
    cursor: pointer;
    background-color: gray;
    color: white;
 }
 @media (max-width:700px) {
    font-size: 10px;
 }
`