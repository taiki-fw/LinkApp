import React from "react";

const Card = props => {
  return (
    <li>
      <a href={props.url}>
        <h3>{props.title}</h3>
        <p>{props.comment}</p>
      </a>
    </li>
  );
};

export default Card;
