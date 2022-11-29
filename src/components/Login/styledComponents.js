import styled from 'styled-components/macro'

const LoginButton = styled.button`
  background-color: #3b82f6;
  border: none;
  border-radius: 10px;
  height: 40px;
  margin-top: 35px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  color: ${props => props.color};
`

export default LoginButton
