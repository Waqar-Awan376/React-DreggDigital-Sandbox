import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ChapterService from '../services/ChapterService'
import ReactPlayer from 'react-player'
import AudioService from '../services/AudioService'
import styled from 'styled-components'
const Wrapper = styled(Modal)`
  .modal-dialog {
    max-width: 80%;
    width: 100%;
    height: 100%
    margin: 0 auto;
    .modal-content {
      border: none;
      width: 100%;
      height: 100%
      margin: 0 auto;
      background-color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: auto;
      .portrait {
        width: 134px;
        height: auto;
      }
      .accordion-title {
        color: #00C853;
      }
      .character-footer {
        display: flex;
        justify-content: center;
        .button {
          width: 150px;
          margin: 10px;
        }
      }
    }
  }
`
export default ({ character, show, onClose }) => {
  const { mute, volume } = AudioService.useContainer()
  const { setTeam } = ChapterService.useContainer()
  const [activeIndex, setActiveIndex] = useState(null)
  const handleClick = (index) => {
    setActiveIndex(index)
    if (index === activeIndex) setActiveIndex(null)
  }
  const handleJoin = () => {
    setTeam(character.id)
    onClose()
  }
  return (
    <Wrapper show={show} onHide={() => onClose()}>
      <div className="card character-popup">
        <ReactPlayer url={character.audio} volume={volume} muted={mute} height='0' playing />
        <button className="close-button" aria-label="Close alert" type="button" data-close onClick={() => onClose()}>
          <img src="images/icons/close.png" />
        </button>
        <div className="character-name">
          {
            character.portrait &&
            <img src={character.portrait.source} alt={character.portrait.alt} className='portrait' />
          }
          <div>
            <h2>{character.name}</h2>
            <h4 className="subheader"><q>{character.quote}</q></h4>
          </div>
        </div>
        <p className="character-bio">
          {character.description}
        </p>
        <ul className="accordion character-question" data-accordion data-allow-all-closed="false">
          {
            character.questions &&
            character.questions.map((question, index) => {
              return (
                <li className="accordion-item" data-accordion-item key={index} onClick={() => handleClick(index)}>
                  <a className="accordion-title">{question.text}</a>
                  <p className="accordion-content" data-tab-content style={index !== null && index === activeIndex ? { display: 'block' } : { display: 'none' }}>
                    {question.answer}
                  </p>
                </li>
              )
            })
          }
        </ul>
        {
          character.team &&
          <div className="character-footer">
            <button className="hollow button primary" onClick={() => handleJoin()}>
              JOIN TEAM
              </button>
            <button className="hollow button primary" onClick={() => onClose()}>
              MAYBE LATER
              </button>
          </div>
        }
      </div>
    </Wrapper>
  )
}
