import React, {useState, useEffect} from 'react'
import Header from '../components/Header'
import Genere from '../components/Genere'
import Dashboard from '../components/Dashboard'
import axios from 'axios'
import {Row, Col, Form, Modal, Dropdown} from 'react-bootstrap'
import { Input, Space } from 'antd'
import ModalComponent from '../components/ModalComponent'
const { Search } = Input
const Landingpage = () => {
    const [newVideos, setVideos] = useState([])
    const [newGenre, setNewGenre] = useState(['All Genere'])
    const [sortVideo, setSortVideo] = useState('releaseDate')
    const [textField, setTextField] = useState('')
    const [selectContentRating, setContentRating] = useState(null)
    const [modalIsOpen, setIsOpen] = useState(false)
    const fetchFunction = async () => {
        const {data} = await axios.get('//94ebde87-24d4-477d-b23b-bfd235167ee1.mock.pstmn.io/v1/videos')
        return data.videos
    }
    useEffect(() => {
        const fetchVideos = async () => {
            const {data} = await axios.get('//94ebde87-24d4-477d-b23b-bfd235167ee1.mock.pstmn.io/v1/videos')
            setVideos(data.videos)
        }
        fetchVideos()
    }, [axios])
    const selectGenere = async (e) => {
        console.log(e.target.value)
        let newbtn = document.getElementById(e.target.id)
        const testElement = document.getElementById('generes')
        const childElem = testElement.childNodes
        if(e.target.value === 'All Genere') {
            let temp = ['All Genere']
            setNewGenre(temp)
            let getAllVideos = await fetchFunction()
            setVideos(getAllVideos)
            for(let i = 1; i < childElem.length; i++) {
                if(childElem[i].outerText !== 'All Genere') {
                    if(childElem[i].classList.contains('genre-btn-focus')) {
                        childElem[i].classList.remove('genre-btn-focus')
                    }
                }
            }
        } else {
            let temp = newGenre
            if(temp.includes(e.target.value)) {
                const index = temp.indexOf(e.target.value)
                if (index > -1) {
                    temp.splice(index, 1);
                    setNewGenre(temp)
                } 
            } else {
                temp.push(e.target.value)
                setNewGenre(temp)
            }
            let url = `//94ebde87-24d4-477d-b23b-bfd235167ee1.mock.pstmn.io/v1/videos?genres=`
            for(let j = 1; j < newGenre.length; j++) {
                if(newGenre[j + 1] !== undefined) {
                    url = url + `${newGenre[j]},`
                } else {
                    url = url + `${newGenre[j]}`
                }
            }
            if(newGenre.length <= 1) {
                const fetchAllVideo = await fetchFunction()
                setVideos(fetchAllVideo)
            } else {
                const {data} = await axios.get(`${url}`)
                setVideos(data.videos)
            }
        }
        if(e.target.value !== 'All Genere') {
            newbtn.classList.contains('genre-btn-focus') ? newbtn.classList.remove('genre-btn-focus') : newbtn.classList.add('genre-btn-focus')
        }
    }
    const sortVideos = async (e) => {
        setSortVideo(e.target.value)
        let {data} = await axios.get(`//94ebde87-24d4-477d-b23b-bfd235167ee1.mock.pstmn.io/v1/videos?sortBy=${e.target.value}`)
        setVideos(data.videos)
    }
    const sortAge = async (e) => {
        setContentRating(e.target.value)
        const {data} = await axios.get(`//94ebde87-24d4-477d-b23b-bfd235167ee1.mock.pstmn.io/v1/videos?contentRating=${e.target.value}%2B`)
        setVideos(data.videos)
    }
    const onSearch = async (e) => {
        let url = `//94ebde87-24d4-477d-b23b-bfd235167ee1.mock.pstmn.io/v1/videos`
        if(e !== '') {
            url = url+`?title=${e}`
        }
        if(newGenre.length > 1) {
            url = url + `?genres=`
            for(let j = 1; j < newGenre.length; j++) {
                if(newGenre[j + 1] !== undefined) {
                    url = url + `${newGenre[j]},`
                } else {
                    url = url + `${newGenre[j]}`
                }
            }
        }
        if(selectContentRating !== null) {
            url = url + `?contentRating=${selectContentRating}%2B`
        }
        const {data} = await axios.get(`${url}`)
        setVideos(data.videos)
    }
    const searchVideos = async (e) => {
        //console.log(e.target.value)
    }
    const openModal = (e) => {
        e.preventDefault()
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
    }
    return (
        <div>
            <Header>
                <Search placeholder="search..." onSearch={onSearch} enterButton size='default' id='newOne' onChange={(e) => searchVideos(e)}/>
                <button id='upload-btn' onClick={(e) => openModal(e)}><i className="fas fa-upload"></i>Upload</button>
            </Header>
            <Row>
            <ModalComponent isOpen1={modalIsOpen} onRequestClose1={closeModal}>
            </ModalComponent>
                <Col sm={8} className='genere-main' as='div' id='generes'>
                    <button className='genre-btn m-2 genre-btn-focus' id='btn-1' value='All Genere' onClick={(e) => selectGenere(e)}>All Genere</button>
                    <button className='genre-btn m-2' id='btn-2' value='Education' onClick={(e) => selectGenere(e)}>Education</button>
                    <button className='genre-btn m-2' id='btn-3' value='Sports' onClick={(e) => selectGenere(e)}>Sports</button>
                    <button className='genre-btn m-2' id='btn-4' value='Comedy' onClick={(e) => selectGenere(e)}>Comedy</button>
                    <button className='genre-btn m-2' id='btn-5' value='LifeStyle' onClick={(e) => selectGenere(e)}>LifeStyle</button>
                </Col>
                <Col sm={4} as='div' className='sort-elem'>
                    <p><i className="fas fa-exchange-alt"></i>sort by: </p>
                    <select onChange={(e) => sortVideos(e)} style={{outline: 'none', height: '30px', borderRadius: '15px'}} className='sort-select'>
                        <option value='releaseDate' id='release-date-option' defaultValue>Release Date</option>
                        <option value='viewCount' id='view-count-option'>View Count</option>
                    </select>
                </Col>
            </Row>
            <Row>
                <Col sm={12} className='age-main'>
                    <button className='content-rating-btn m-2' autoFocus id='age-btn-1' value='Any Age Group' onClick={(e) => sortAge(e)}>Any Age Group</button>
                    <button className='content-rating-btn m-2' value='7' onClick={(e) => sortAge(e)}>7+</button>
                    <button className='content-rating-btn m-2' value='12' onClick={(e) => sortAge(e)}>12+</button>
                    <button className='content-rating-btn m-2' value='16' onClick={(e) => sortAge(e)}>16+</button>
                    <button className='content-rating-btn m-2' value='18' onClick={(e) => sortAge(e)}>18+</button>
                </Col>  
            </Row>
            <Dashboard vid={newVideos}/>
        </div>
    )
}

export default Landingpage
