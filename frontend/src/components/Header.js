import React from 'react'
import {Form, Row, Col, Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Header = ({children}) => {
    return (
        <Form>
            <Row className="justify-content-between">  
                <Col className= 'm-3 p-3' xs='auto'>
                    <Link to='/'><span className='main-header'>❌<span className='header-logo'>Flix</span></span></Link>
                </Col>
                <Col xs="auto" className= 'm-3 p-3'>
                    {children && (
                        children[0]
                    )}
                    {/* {children && (
                        children[1]
                    )} */}
                </Col>
                <Col className= 'm-3 p-3' xs='auto'>
                    {children && (
                        children[1]
                    )}
                </Col>
            </Row>
        </Form>
    )
}

export default Header
