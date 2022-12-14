import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
import Modal from 'react-modal';
import help_icon from './help-svgrepo-com.svg';
import PortalContainer from './components/PortalContainer';
import Help from './sections/Help';
import About from './sections/About';
import { Logo } from './components/Logo';
import { Helmet } from 'react-helmet';

const modalCustomStyles = {
  content: {
    inset: 'unset',
    borderRadius: '10px',
    padding: '7px 15px',
    fontSize: '16px',
    color: 'rgb(51, 51, 51)',
    overflow: 'unset',
    position: 'absoulte',
    whiteSpace: 'nowrap'
  },
  overlay: {
    backgroundColor: 'transparent',
    maxWidth: '400px',
    minWidth: '400px',
    height: '4%',
    translate: '-50% 80%',
    zIndex: '99',
    inset: '5% 0% 0% 50%',
    position: 'fixed'
  }
};

export const modalCodes ={
  won: "#2196f3",
  missed: "rgb(244, 63, 94)",
  lost: "#9c27b0"
}

let portal_content = {current: null};

Modal.setAppElement('#root');

function App() {

  // Modal variables
  // @TODO: move modal to a react context
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState(modalCodes.missed);
  const [modalText, setModalText] = useState("");
  // Portal container variable
  const [toggle, setToggle] = useState(false);

  const openModal = (text, time=3000) => {
    setModalText(text);
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
      setModalText("");
    }, time)
  }

  const clearModal = () => {
    setIsOpen(false);
    setModalStatus(modalCodes.missed);
    setModalText("");
  }

  return (
    <div className="App">
      <Helmet>
        {/* <!-- COMMON TAGS --> */}
        <title>Wordle Clone DSA</title>
        {/* <!-- Search Engine --> */}
        <meta name="description" content="React JS clone of the popular mobile game Wordle"/>
        <meta name="image" content="https://user-images.githubusercontent.com/75151961/200998814-a9a4d7bb-a542-4ba6-a2de-aa356d37a58e.png"/>
        {/* <!-- Schema.org for Google --> */}
        <meta itemprop="name" content="Wordle Clone DSA"/>
        <meta itemprop="description" content="React JS clone of the popular mobile game Wordle"/>
        <meta itemprop="image" content="https://user-images.githubusercontent.com/75151961/200998814-a9a4d7bb-a542-4ba6-a2de-aa356d37a58e.png"/>
        {/* <!-- Open Graph general (Facebook, Pinterest & Google+) --> */}
        <meta name="og:title" content="Wordle Clone DSA"/>
        <meta name="og:description" content="React JS clone of the popular mobile game Wordle"/>
        <meta name="og:image" content="https://user-images.githubusercontent.com/75151961/200998814-a9a4d7bb-a542-4ba6-a2de-aa356d37a58e.png"/>
        <meta name="og:url" content="https://wordle-clone-dsa.netlify.app"/>
        <meta name="og:site_name" content="Wordle Clone DSA"/>
        <meta name="og:type" content="website"/>

        <meta property='og:title' content="Wordle Clone DSA" />
        <meta property='og:image' content="https://user-images.githubusercontent.com/75151961/200998814-a9a4d7bb-a542-4ba6-a2de-aa356d37a58e.png" />
        <meta property='og:description' content="React JS clone of the popular mobile game Wordle" />
        <meta property='og:url' content= "https://wordle-clone-dsa.netlify.app" />
       </Helmet>
      <Modal
          isOpen={modalIsOpen}
          style={Object.assign(modalCustomStyles, modalCustomStyles.content["backgroundColor"]= modalStatus )}
          contentLabel="Example Modal"
          shouldCloseOnEsc={false}
          shouldCloseOnOverlayClick={false}
          shouldFocusAfterRender={false}
          shouldReturnFocusAfterClose={true}
          overlayClassName={"ReactModal__Overlay2 " + modalIsOpen ? "fade-in-modal" : "fade-out-modal"}
      >        
        <div style={{textAlign: 'center', lineHeight: '1.4', color: 'white', fontWeight: '500'}}>       
            {modalText}
        </div>      
      </Modal>
      <header className="App-header">
        <div className='header__filler'></div>
        <div className='header__title'>
          {/* <h2>Wordle Clone</h2> */}
          <Logo />
        </div>
        <div className='header__buttons'>
          <img 
            src={help_icon} 
            className="help_icon" 
            alt="help icon" 
            onClick={() => {
                portal_content.current = "help";
                setToggle({});  
            }}
          />
          <div className='new_game__fake'>
            {/* This is a dummy button; the true button is placed on top of this */}
            {/* button using CSS; the true button belongs to the Board component */}
            <button style={{visibility: 'hidden'}}>New Game</button>
          </div>
          <div 
            className='about_link'
            onClick={() => {
              portal_content.current = "about"
              setToggle({})
            }}
          >
            About
          </div>
        </div>
      </header>
      <Board 
        openModal={openModal} 
        setIsOpen={setIsOpen}
        setModalStatus={setModalStatus}
        setModalText={setModalText}
        clearModal={clearModal}
      />
      <PortalContainer toggle={toggle}>
          {portal_content.current === "help" 
            ? <Help /> 
            : <About />
          }
      </PortalContainer>
    </div>
  );
}

export default App;







