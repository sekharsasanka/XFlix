import React, {useEffect, useState} from 'react'
import {Row, Col, Form} from 'react-bootstrap'

const Genere = () => {
    const selectGenere = (e) => {
        let newbtn = document.getElementById(e.target.id)
        newbtn.classList.contains('genere-btn-focus') ? newbtn.classList.remove('genere-btn-focus') : newbtn.classList.add('genere-btn-focus')
    }
    const sortVideos = () => {
        let sortBtn = document.getElementById('btn2')
        sortBtn.value === 'Release Date' ? sortBtn.value = 'View count' : sortBtn.value = 'Release Date'
    }
    const sortAge = (e) => {
        
    }
    return (
        <>
            <Row>
                <Col sm={8} className='genere-main'>
                    <button className='genre-btn m-2 genre-btn-focus' id='btn-1' value='All Genere' onClick={(e) => selectGenere(e)}>All Genere</button>
                    <button className='genre-btn m-2' id='btn-2' value='Education' onClick={(e) => selectGenere(e)}>Education</button>
                    <button className='genre-btn m-2' id='btn-3' value='Sports' onClick={(e) => selectGenere(e)}>Sports</button>
                    <button className='genre-btn m-2' id='btn-4' value='Comedy' onClick={(e) => selectGenere(e)}>Comedy</button>
                    <button className='genre-btn m-2' id='btn-5' value='LifeStyle' onClick={(e) => selectGenere(e)}>LifeStyle</button>
                </Col>
                <Col sm={4}>
                <div className='genre-btn genre-btn-focus' id='btn1'>
                    <i className="fas fa-sort icon mr-0" onClick={() => sortVideos()}></i>
                    <input type='button' className='genre-btn genre-btn-focus' id='btn2' value='Release Date' ></input>
                </div>
                        
                </Col>
            </Row>
            <Row>
                <Col sm={12} className='age-main'>
                    <button className='content-rating-btn m-2' autoFocus id='age-btn-1' value='Any Age Group' onClick={(e) => sortAge(e)}>Any Age Group</button>
                    <button className='content-rating-btn m-2' value='7+'>7+</button>
                    <button className='content-rating-btn m-2' value='12+'>12+</button>
                    <button className='content-rating-btn m-2' value='16+'>16+</button>
                    <button className='content-rating-btn m-2' value='18+'>18+</button>
                </Col>  
            </Row>
        </>
    )
}

export default Genere
