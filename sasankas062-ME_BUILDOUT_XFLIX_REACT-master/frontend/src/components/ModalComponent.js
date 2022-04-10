import React, {useState, useEffect} from 'react'
import { Form,  Dropdown} from 'react-bootstrap'
import Modal from 'react-modal'
// import {DatePicker, Space} from 'antd'
import axios from 'axios'

//setting the Modal root
Modal.setAppElement('#root')

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'black',
      color: 'white'
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'blur'
      },
  };

const ModalComponent = ({isOpen1, onRequestClose1}) => {
    const [modalIsOpen, setModalOpen] = useState(false)
    const [newGenre, setGenre] = useState('Genre')
    const [ageGroup, setAgeGroup] = useState('Suitable age group for the clip')
    const [openDate, setOpenDate] = useState(null)
    const [getVideo, setVideoLink] = useState('')
    const [imageLink, setImageLink] = useState('')
    const [getText, setText] = useState('')
    useEffect(() => {
        isOpen1 && (
            setModalOpen(isOpen1)
        )
    }, [isOpen1])
    const closeModal = () => {
        setModalOpen(false)
    }
    const changeGenre = (e) => {
        setGenre(e)
    }
    const changeAge = (e) => {
        setAgeGroup(e)
    }
    const changeDate = (e) => {
        setOpenDate(e)
    }
    const getVideoLink = (e) => {
        setVideoLink(e.target.value)
    }
    const submitPostRequest = async () => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        const info = {
            "videoLink": `${getVideo}`,
            "title": `${getText}`,
            "genre": `${newGenre}`,
            "contentRating": `${ageGroup}`,
            "releaseDate": `${openDate}`,
            "previewImage": `${imageLink}`
        }
        await axios.post('//057fb7d5-d2ba-4d9e-ba98-d8da26645f1f.mock.pstmn.io/v1/videos', info)
    }
    return (
        <Modal isOpen={modalIsOpen} shouldCloseOnOverlayClick={false} onRequestClose={closeModal} style={customStyles}>
    <Form>
        <Form.Group className="mb-3" controlId="formBasicVideoLink">
            <div className='test-class'>
                <Form.Label>Upload Video</Form.Label>
                    <p style={{cursor: 'pointer', color: 'red'}} onClick={closeModal}>x</p>
            </div>
            <Form.Control type="text" placeholder="Video Link"  onChange={(e) => getVideoLink(e)}/>
            <Form.Text className="text-muted">
                This Link will be used to derive the video
            </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicImageLink">
            <Form.Control type="text" placeholder="Thumpnail image link" onChange={(e) => setImageLink(e)} />
            <Form.Text className="text-muted">
                This Link will be used to preview the image
            </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Control type="text" placeholder="Title" onChange={(e) => setText(e)}/>
            <Form.Text className="text-muted">
                Title will be the representative text for the video
            </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3 text-left" controlId="formBasicGenre">
            <Dropdown onSelect={(e) => changeGenre(e)} className='text-left' size='sm'>
                <Dropdown.Toggle  variant="secondary" className='text-sm-left w-100'>
                    {newGenre}
                </Dropdown.Toggle>
                <Dropdown.Menu variant="dark">
                <Dropdown.Item eventKey={`All Genre`} active>
                    All Genre
                </Dropdown.Item>
                <Dropdown.Item eventKey={`Education`}>Education</Dropdown.Item>
                <Dropdown.Item eventKey={`Sports`}>Sports</Dropdown.Item>
                <Dropdown.Item eventKey={`Comedy`}>Comedy</Dropdown.Item>
                <Dropdown.Item eventKey={`Lifestyle`}>Lifestyle</Dropdown.Item>
            </Dropdown.Menu>
            <Form.Text className="text-muted d-flex">
                Title will be the representative text for the video
            </Form.Text>
            </Dropdown>
            </Form.Group>
            <Form.Group className="mb-3 text-left" controlId="formBasicAges">
                <Dropdown onSelect={(e) => changeAge(e)} className='text-left' size='sm'>
                <Dropdown.Toggle  variant="secondary" className='text-sm-left w-100'>
                    {ageGroup}
                </Dropdown.Toggle>
                <Dropdown.Menu variant="dark">
                <Dropdown.Item eventKey={`All Genre`} active>
                    Any age group
                </Dropdown.Item>
                <Dropdown.Item eventKey={`7+`}>7+</Dropdown.Item>
                <Dropdown.Item eventKey={`12+`}>12+</Dropdown.Item>
                <Dropdown.Item eventKey={`16+`}>16+</Dropdown.Item>
                <Dropdown.Item eventKey={`18+`}>18+</Dropdown.Item>
                </Dropdown.Menu>
                    <Form.Text className="text-muted d-flex">
                        This will be used to filter videos on age group suitability
                    </Form.Text>
                </Dropdown>
                </Form.Group>
                </Form>
                <input type="date" className="form-control mb-1" name="date" required onChange={(e) => changeDate(e.target.value)}/>
                <button type='button' className='btn btn-danger mt-3 mr-3' id='upload-btn-submit' onClick={submitPostRequest}>Submit</button>
                <button type='button' className='btn mt-3' id='upload-btn-cancel' onClick={closeModal}>Cancel</button>
        </Modal>
    )
}

export default ModalComponent
