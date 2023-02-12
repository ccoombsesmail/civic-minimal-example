import React from 'react'
import { ButtonBackground, StyledButton, Container } from './Style'

export function ExpandButton({
  children,
  bgColor,
  onClick,
  width,
  height,
  icon,
  margin,
  type,
  civicButton,
  iconButton,
  disabled,
}) {
  return (
    <Container backgroundColor={bgColor} width={width} height={height} margin={margin}>
  
      <StyledButton backgroundColor={bgColor} onClick={onClick} type={type} iconButton={iconButton} disabled={disabled}>
        <ButtonBackground backgroundColor={bgColor} civicButton={civicButton} />
        {icon}
        <span>{children}</span>
      </StyledButton>
    </Container>
  )
}