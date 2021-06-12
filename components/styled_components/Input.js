import styled from "styled-components";

const Input = styled.input`
  cursor: pointer;

  width: 190px;
  height: 30px;

  outline: 0;
  background: transparent;
  font-size: 12px;
  border-radius: 15px;
  color: steelblue;
  border: 1px solid Coral;
  margin: 0 1em;
  padding: 0.3em 1em;
  transition: 0.2s all ease-out;
  ::placeholder {
    color: steelblue;
    font-size: 12px;
  }
`;

export default Input;
