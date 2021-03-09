import React from 'react';
import { Media, Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class KooriFlag extends React.Component {
    constructor() {
        super()
        this.state =
        {
            show: false
        }
    }
    openCloseModal() {
        this.setState({ show: !this.state.show })
    }
    render() {
        return (
            <React.Fragment>
                <Button variant="primary" onClick={() => { this.openCloseModal() }} >
                    <div>
                        <div style={kooriFlagStyle} className={this.props.flagClassName}>
                            <p>
                                <img src="/assets/media/images/background/KooriFlag.png" />
                            </p>
                        </div>
                    </div>
                </Button>
                <Modal
                    size="lg"
                    show={this.state.show}
                    centered
                >
                    <div style={mainModalStyle}>

                        <Modal.Header closeButton onClick={() => { this.openCloseModal() }}>
                            <Modal.Title id="contained-modal-title-vcenter" style={modalTitleStyle}>
                                HOVER BOARD
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={modelBodyStyle}>
                            <p style={textContainerStyle}>
                                We Acknowledge the Traditional Custodians of the Wattamattagal clan of the Darug Nation, whose Cultures and Customs have nurtured, and continue to nurture, this land, since the Dreaming. We pay our respects to Elders past and present.
                        </p>
                        </Modal.Body>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}



const mainModalStyle = {
    borderRadius: '20px !important'
}
const modalTitleStyle = {
    color: '#1ebea5',
    fontWeight: '1000',
    fontFamily: 'arial',
    fontSize: '40px'
}
const kooriFlagStyle = {
    position: 'absolute',
    right: '33vw',
    top: '32vh',
    width: '30px',
    transform: 'rotate(-20deg)',
    opacity: '0.75'
}
const textContainerStyle = {
    backgroundImage: `url("/assets/media/images/background/paper.png")`,
    padding: '16px',
    margin: '0px',
}
const modelBodyStyle = {
    padding: '0px',
    margin: '0px',
    borderRadius: '40px'
}

export default KooriFlag;