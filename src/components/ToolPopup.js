import React from 'react'
import { Modal } from 'react-bootstrap'
import ChapterService from '../services/ChapterService'
import styled from 'styled-components'
import _ from 'lodash'
import { inventoryCapacity } from '../constants'
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
      .tool-button {
        width: 100px;
        margin: 10px;
      }
    }
  }

`
export default ({ tool, show, onAdd, onRemove, onUse, onClose }) => {
  const { inventoryTools } = ChapterService.useContainer()
  const handleAdd = (tool) => {
    onAdd(tool)
    onClose()
  }
  const handleUse = (tool) => {
    onClose()
    onUse(tool.link)
  }
  const handleRemove = (tool) => {
    onRemove(tool)
    onClose()
  }
  return (
    <Wrapper show={show} onHide={() => onClose()}>
      <div className="card tool-popup">
        <button className="close-button" aria-label="Close alert" type="button" data-close onClick={() => onClose()}>
          <img src="images/icons/close.png" />
        </button>
        <div className="tool-name" id="HoverBoardPopup">
          <h2>{tool.name}</h2>
          <img src={tool.image.source} alt={tool.image.alt} />
          {
            tool.parts &&
            <div>
              {
                tool.parts.map((part, index) => {
                  let top, right, bottom, left = ''
                  if (part.top) top = part.top
                  if (part.right) right = part.right
                  if (part.bottom) bottom = part.bottom
                  if (part.left) left = part.left
                  return (
                    <span className="tool-part dotted-circle" data-tooltip tabIndex="2"
                      title={part.text} style={{ top: top, right: right }} key={index}></span>
                  )
                })
              }
            </div>
          }

        </div>
        <p className="tool-info">
          {tool.description}
        </p>
        <div className="tool-animation">
          <button
            className="hollow button primary tool-button"
            onClick={() => handleAdd(tool)}
            disabled={_.find(inventoryTools, t => t.id === tool.id) || inventoryTools.length >= inventoryCapacity}
          >
            ADD
            </button>
          <button
            className="hollow button primary tool-button"
            onClick={() => handleUse(tool)}
            disabled={!_.find(inventoryTools, t => t.id === tool.id)}
          >
            USE
            </button>
          <button
            className="hollow button primary tool-button"
            onClick={() => handleRemove(tool)}
            disabled={!_.find(inventoryTools, t => t.id === tool.id)}
          >
            RETURN
            </button>
        </div>
      </div>
    </Wrapper>
  )
}
