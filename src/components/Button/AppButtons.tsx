// import styled from "styled-components";

// interface ButtonProps {
// children: string;
// size?: "small" | "medium" | "large";
//  color?: "primary" | "secondary";
//  background?: "primary" | "secondary";
//  outline?: boolean;
//  onClick?: () => void;

// }

// const StyledButton = styled.button<ButtonProps>`
// padding : ${props => props.size  === "small" ? "0.5rem 1rem"
//                         :props.size === "medium" ? "0.75rem 1.5rem"
//                         :props.size === "large" ? "1rem 2rem"
//             };


// font-size : ${props => props.size  === "small" ? "0.8rem"
//                         :props.size === "medium" ? "1rem"
//                         :props.size === "large" ? "1.2rem" 
//               };



//  background: ${({ color, outline }) =>
//  outline
//  ? "transparent"
//  : color === "primary"
//  ? "linear-gradient(to right, #eb5757, #FEEBEF)"
//  : color === "secondary"
//  ? "#FEEBEF"
//  : "inherit"};

//  border: ${({ outline }) => (outline ? "2px solid #EB5757" : "none")};

//  color: ${({ color, outline }) =>
//  outline ? "#EB5757" : color === "primary" ? "#FEEBEF" : "#EB5757"};

//  border-radius: 0.25rem;

//  cursor: pointer;

//  &:hover {

//  opacity: 0.8;

//  }


// `
// const AppButton = ({
//  children,
//  size = "medium",
//  color = "primary",
//  outline,
//  background = "primary",
//  onClick,
// }: ButtonProps) => {
// return (
//  <StyledButton size={size} color={color} outline={outline} background={background} onClick={onClick}>
// {children}
// </StyledButton>
//  );
// };
// export default AppButton;

import styled from "styled-components";
import React from "react";

interface ButtonProps {
  children: string;
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary";
  outline?: string;
  onClick?: () => void;
}

const StyledButton = styled.button<ButtonProps>`
  padding: ${props =>
    props.size === "small"
      ? "0.5rem 1rem"
      : props.size === "medium"
      ? "0.75rem 1.5rem"
      : props.size === "large"
      ? "1rem 2rem"
      : ""};

  font-size: ${props =>
    props.size === "small"
      ? "0.8rem"
      : props.size === "medium"
      ? "1rem"
      : props.size === "large"
      ? "1.2rem"
      : ""};

  background: ${({ color, outline }) =>
    outline
      ? "transparent"
      : color === "primary"
      ? "linear-gradient(to right, #eb5757, #FEEBEF)"
      : color === "secondary"
      ? "#FEEBEF"
      : "inherit"};

  border: ${({ outline }) => (outline ? "2px solid #EB5757" : "none")};

  color: ${({ color, outline }) =>
    outline ? "#EB5757" : color === "primary" ? "#FEEBEF" : "#EB5757"};

  border-radius: 0.25rem;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
}
`
const AppButton = ({
  children,
  size = "medium",
  color = "primary",
  outline,
  onClick,
}: ButtonProps) => {
  return (
    <StyledButton size={size} color={color} outline={outline} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default AppButton;

