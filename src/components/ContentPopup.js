import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import NavigationService from '../services/NavigationService'
import ChapterService from '../services/ChapterService'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom';
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
const ContentPopup = ({ show, onClose, history }) => {
  const { chapter } = ChapterService.useContainer()
  const [index, setIndex] = useState(0)
  const goToVideo = (animation) => {
    onClose()
    history.push(`/animation/${animation.id}`)
  }
  const animations = chapter.animation
  if (animations === undefined) {
    return null
  }
  return (
    <Wrapper show={show} onHide={onClose}>
      <div className="content-list">
        <button className="close-button" aria-label="Close alert" type="button" data-close onClick={onClose}>
          <img src="images/icons/close.png" />
        </button>
        <ul className="tabs" data-tabs id="chapter-list">
          {
            animations.map((animation, i) => {
              return (
                <div key={i}>
                  <li className={index === i ? "tabs-title is-active" : "tabs-title"}>
                    <a aria-selected={index === i} onClick={() => setIndex(i)}>{animation.name}</a>
                  </li>
                </div>
              )
            })
          }
        </ul>
        <div className="tabs-content" data-tabs-content="chapter-list">
          <div className="tabs-panel is-active" id={`panel${index + 1}`}>
            <img src={`images/custon-titles/0${index + 1}-SnakeRibbon.png`} alt="" />
            <p>{animations[index].description}</p>
            <a className="button primary" onClick={() => goToVideo(animations[index])}>
              <img src={`images/icons/VideoP${index + 1}.png`} alt="" />
              Go to Video Part {index + 1}
            </a>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
export default withRouter(ContentPopup)
