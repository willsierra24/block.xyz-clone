import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <>
    <div className='footerContainer'>
        <div className='footerLeft'>
            <div className='wrapperLeft'>
                <h1 className='logo'>BLOCK</h1>
                <div>
                  <a className='footerItem'>Square</a>
                  <a className='footerItem'>Cash App</a>
                  <a className='footerItem'>Spiral</a>
                  <a className='footerItem'>Tidal</a>
                  <a className='footerItem'>TBD</a>
                </div>
            </div>
        </div>
        <div className='footerRight'>
          <div className='wrapperRight'>
            <span className='copyrights'>
            © 2024  Block, Inc. BLOCK and the Block Logo are trademarks of Block, Inc.
            </span>
          </div>
        </div>
    </div>
    </>
  )
}

export default Footer