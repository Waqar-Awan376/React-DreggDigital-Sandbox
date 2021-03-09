import React from "react";
import VideoPlayer from "../components/VideoPlayer";
import ContentService from "../services/ContentService";
import NavigationService from "../services/NavigationService";
import KooriFlag from "../components/KooriFlag";
import PrimaryButton from "../components/PrimaryButton";
import styled from "styled-components";
const Wrapper = styled.div`
  height: 100%;
  .video-player {
    width: 100%;
    height: auto;
    pointer-events: none;
  }
  .skip-button {
    position: absolute;
    bottom: 100px;
    right: 25px;
    pointer-events: all;
  }
`;
const Introduction = ({ history }) => {
  const { content } = ContentService.useContainer();
  const { setSkipCallback, setShowSkip } = NavigationService.useContainer();
  setShowSkip(true);
  setSkipCallback(function () {
    history.push("/level-select");
  });
  const handleEnd = () => {
    history.push("/level-select");
  };
  return (
    <Wrapper>
      <VideoPlayer
        video={content.introduction}
        volume={0}
        mute={true}
        autoPlay={true}
        onEnd={handleEnd}
        className="video-player"
      />
      <PrimaryButton
        onClick={() => history.push("/level-select")}
        className="skip-button"
      >
        SKIP
      </PrimaryButton>
      <KooriFlag flagClassName="koori-flag-LevelSelect" />
    </Wrapper>
  );
};
export default Introduction;
