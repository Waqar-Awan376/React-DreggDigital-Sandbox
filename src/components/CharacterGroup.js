import React, { useEffect, useState } from 'react'
import Character from './Character'
import styled from 'styled-components'
const Wrapper = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: ${props => props.alignment};
  position: absolute;
  list-style: none;
  padding: 0;
  margin: 0;
`
export default ({ characters, className, charClassName, interactable, hoverable, alignment, onAnimationEnd, onTextEnd, onAudioEnd, skip }) => {
  return (
    <Wrapper alignment={alignment} className={className}>
    {
      characters.map((character, index) => {
        return (
          <li key={index}>
            <Character
              character={character}
              actions={character.actions}
              text={character.text !== undefined && !skip ? character.text : null}
              audio={character.audio !== undefined && !skip  ? character.audio : null}
              className={charClassName}
              onAnimationEnd={onAnimationEnd !== undefined ? () => onAnimationEnd() : null}
              onTextEnd={onTextEnd !== undefined ? () => onTextEnd() : null}
              onAudioEnd={onAudioEnd !== undefined ? () => onAudioEnd() : null}
              interactable={interactable}
              hoverable={hoverable}
            />
          </li>
        )
      })
    }
    </Wrapper>
  )
}
