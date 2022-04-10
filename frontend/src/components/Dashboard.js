import React, {useEffect, useState} from 'react'
// import axios from 'axios'
import {Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Dashboard = ({vid}) => {
    return (
        <div className='dashboard-component'>
            <Row>
                {vid.map((x, idx) => (
                    <Col key={idx} sm={6}  lg={4} xl={3}>
                        <Link className='video-tile-link' to={`/videos/${x._id}`}><img className='video-tile' src={`${x.previewImage}`} /></Link>
                        <p className='video-text'>{x.title}</p>
                        <p className='video-text-date mb-3'>{x.releaseDate}</p>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Dashboard
