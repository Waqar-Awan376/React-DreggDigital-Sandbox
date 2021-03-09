import React, { useEffect } from 'react'
import CharacterGroup from '../components/CharacterGroup'
import PrimaryButton from '../components/PrimaryButton'
import BackButton from '../components/BackButton'
import ContentButton from '../components/ContentButton'
import ChapterService from '../services/ChapterService'
import NavigationService from '../services/NavigationService'
import KooriFlag from "../components/KooriFlag";
import Background from '../components/Background'
import Bench from '../components/Bench'
import styled from 'styled-components'
import _ from 'lodash'
import { characterType } from '../constants'
import { withRouter } from 'react-router-dom';
const Wrapper = styled.div`
  height: 100%;
  .characters {
    position: absolute;
    bottom: -250px;
    @media (min-width: 768px) and (max-width: 1024px) {
      bottom: -200px;
    }
  }
  .student {
    position: relative;
    height: 650px;
    width: 450px;
    @media (min-width: 768px) and (max-width: 1024px) {
      height: 550px;
      width: 450px;
    }
  }
  .bench {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
const StudentsPortal = ({ history }) => {
  const { chapter, getCharacters, team, setTeam } = ChapterService.useContainer()
  const { setShowBack, setShowContent } = NavigationService.useContainer()
  const characters = getCharacters()
  useEffect(() => {
    setShowBack(true)
    setShowContent(true)
    setTeam(null)
  }, [setShowBack])
  return (
    <Wrapper>
      <Background>
        <CharacterGroup
          characters={_.filter(characters, character => character.type === characterType.STUDENT)}
          className='characters'
          charClassName='student'
          alignment='center'
          interactable='true'
          hoverable='true'
        />
        <Bench className='bench'>
          {
            <PrimaryButton onClick={() => { history.push('/workbench') }}>
              WHAT IS ON THE BENCH?
          </PrimaryButton>
          }
        </Bench>
      </Background>
      <BackButton />
      <ContentButton />
      <KooriFlag flagClassName="koori-flag-LevelSelect" />
    </Wrapper>
  )
}
export default withRouter(StudentsPortal)
