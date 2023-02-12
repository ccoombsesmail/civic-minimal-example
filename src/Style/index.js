import styled from 'styled-components'
import { ExpandButton } from '../ExpandButton/Index'

export const Container = styled('div')`
 display: flex;
 align-items: center;
 justify-content: center;

 span {
    padding: 0 !important;
  }
  b {
    margin: 0 clamp(15px, 1vw, 25px);
    color: #FFFFFF00;
    font-family: "Aventa", Sans-serif;
    font-size: 2vw;
    font-weight: 400;
    -webkit-text-stroke-width: 1px;
    stroke-width: 1px;
    -webkit-text-stroke-color: black;
    stroke: black;
  }
  @media (max-width: 1024px) {
    margin-right: 10px;
  }
`

export const IconContainer = styled('div')`
  background-color: #527640; 
  color: white;
  border-radius: 10px;
  width: 20vw;
  font-size: 20px;
  padding: .4vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
  img {
    height: 2vw;
    width: 2vw;
  }

`

export const StyledExpandButton = styled(ExpandButton)`
  margin: 0;
  button {
    font-size: clamp(15px, 1.4vw, 25px) !important;

  }
`
