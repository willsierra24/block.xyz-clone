import React from 'react'
import './Navbar.css'
import {Accessibility, DragIndicator} from '@mui/icons-material';
import Player from '../Player/Player';

function Navbar() {
  return (
    <>
    <div className='container'>
        <div className='wrapper'>
          <div className='left'>
            <div className='playbackWrapper'>
                <div className='playbackControls'>
                    <button className='leftButton'>
                        <div>
                        <Player></Player>
                        </div>
                        <div>
                            <div>
                                Block Vibes
                            </div>
                            <div>
                                Curated by JAY-Z
                            </div>
                        </div>
                    </button>                   
                     <a className='rightButton'>
                        <DragIndicator></DragIndicator>                      
                    </a>   
                </div>
            </div>
          </div>
          <div className='right'>
            <a className='menuItem'>News</a>
            <a className='menuItem'>Careers</a>
            <a className='menuItem'>Investors</a>
            <a className='menuItem' id='acessibility'><Accessibility></Accessibility></a>
            
          </div>
        </div>
    </div>
    </>
  )
}

export default Navbar