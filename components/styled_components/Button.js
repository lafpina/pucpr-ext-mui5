import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  background: transparent;
  font-size: 12px;
  border-radius: 15px;
  color: steelblue;
  border: 1px solid Coral;
  margin: 0 1em;
  padding: 0.3em 1em;
  height: 2.46em;
  transition: 0.2s all ease-out;
  &:hover {
    background-color: PeachPuff;
    color: white;
  }
`;

export default Button;
