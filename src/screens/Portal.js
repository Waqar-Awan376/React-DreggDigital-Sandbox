import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import Bench from '../components/Bench'
import BackButton from '../components/BackButton'
import ContentButton from '../components/ContentButton'
import KooriFlag from "../components/KooriFlag";
import CharacterGroup from '../components/CharacterGroup'
import NavigationService from '../services/NavigationService'
import ChapterService from '../services/ChapterService'
import styled from 'styled-components'
import _ from 'lodash'
import { withRouter } from 'react-router-dom';
import { characterType } from '../constants'
import posed from 'react-pose'
const Characters = posed.div({
  offScreenRight: {
    x: "1000px",
    opacity: 0,
    transition: { duration: 1000 }
  },
  middle: {
    x: 0,
    opacity: 1,
    transition: { duration: 1000 }
  },
  offScreenLeft: {
    x: "-1000px",
    opacity: 0,
    transition: { duration: 1000 }
  },
})
const Wrapper = styled.div`
  height: 100%;
  .characters {
    position: absolute;
    bottom: -250px;
    @media screen and (min-width: 1200px) and (max-width: 1600px) {
      bottom: -225px;
    }
    @media (min-width: 768px) and (max-width: 1024px) {
      bottom: -200px;
    }
  }
  .student {
    position: relative;
    height: 650px;
    width: 450px;
    @media screen and (min-width: 1200px) and (max-width: 1600px) {
      height: 600px;
      width: 450px;
    }
    @media (min-width: 768px) and (max-width: 1024px) {
      height: 550px;
      width: 450px;
    }
  }
  .portal-button {
    position: absolute;
    bottom: 45%;
    img {
      height: 100px;
      width: auto;
      @media screen and (min-width: 1200px) and (max-width: 1600px) {
        height: 75px;
        width: auto;
      }
      @media (min-width: 768px) and (max-width: 1024px) {
        height: 50px;
        width: auto;
      }
    }
  }
  .students {
    right: 150px;
  }
  .teachers {
    left: 150px;
  }
`
const Portal = ({ history }) => {
  const { getCharacters } = ChapterService.useContainer()
  const { setShowBack, setShowContent, setShowHint } = NavigationService.useContainer()
  const [pose, setPose] = useState("middle")
  const characters = getCharacters()
  useEffect(() => {
    setShowContent(true)
    setShowBack(true)
    setShowHint(true)
    localStorage.setItem('playAnimation', true)
  }, [setShowBack])
  const handleClickStudents = () => history.push('/students')
  const handleClickTeachers = () => {
    setPose("offScreenLeft")
  }
  const handlePoseComplete = (pose) => {
    if (pose === "offScreenLeft") {
      history.push('/teachers')
    }
  }
  let playAnimation = localStorage.getItem('playAnimation')
  return (
    <Wrapper>
      <Background>
        <Characters initialPose={playAnimation === 'false' ? 'offScreenRight' : ''} pose={pose} onPoseComplete={(p) => handlePoseComplete(p)}>
          <CharacterGroup
            characters={_.filter(characters, character => character.type === characterType.STUDENT)}
            className='characters'
            charClassName='student'
            alignment='center'
          />
        </Characters>
        <Bench>
          <button className='students portal-button'>
            <img
              src='./assets/media/images/buttons/students_portal.png'
              alt='Student portal'
              onClick={() => handleClickStudents()}
            />
          </button>
          <button className='teachers portal-button'>
            <img
              src='./assets/media/images/buttons/teachers_portal.png'
              alt='Student portal'
              onClick={() => handleClickTeachers()}
            />
          </button>
        </Bench>
      </Background>
      <BackButton />
      <ContentButton />
      <KooriFlag flagClassName="koori-flag-LevelSelect" />
    </Wrapper>
  )
}
export default withRouter(Portal)
