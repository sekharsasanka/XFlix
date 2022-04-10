import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Container} from 'react-bootstrap'
import Header from '../components/Header'
import Dashboard from '../components/Dashboard'

const VideoplayPage = ({match}) => {
  
  const [newVideo, setVideo] = useState({})
  const [allVideos, setAllVideos] = useState([])
  // console.log(newVideo,'hello new video')
  useEffect(() => {
  
    const incrementViews = async () =>{
      await axios.patch(`//94ebde87-24d4-477d-b23b-bfd235167ee1.mock.pstmn.io/v1/videos/${match.params.id}/views`)
    }
    
    const fetchVideos = async () => {
      const {data} = await axios.get(`//94ebde87-24d4-477d-b23b-bfd235167ee1.mock.pstmn.io/video/${match.params.id}`)
      setVideo(data)
    }
    
    const fetchAllVideos = async () => {
      const {data} = await axios.get('//94ebde87-24d4-477d-b23b-bfd235167ee1.mock.pstmn.io/v1/videos')
      setAllVideos(data.videos)
    }
    incrementViews()
    fetchVideos()
    fetchAllVideos()
  }, [])
  
  const voteUp = async () => {
    const body = {
      "vote": "upVote",
      "change": "increase"
    }
    await axios.patch(`//94ebde87-24d4-477d-b23b-bfd235167ee1.mock.pstmn.io/v1/videos/${match.params.id}/votes`, body)  
  }
  
  const voteDown = async () => {
    const body = {
      "vote": "downVote",
      "change": "increase"
    }
    await axios.patch(`//94ebde87-24d4-477d-b23b-bfd235167ee1.mock.pstmn.io/v1/videos/${match.params.id}/votes`, body)
  }
    return (
      <Container>
        
        <Header />
     
        {newVideo.genre && (
          <iframe className='video-styles' src={`https://www.${newVideo.videoLink}?autoplay=1&mute=1`} allow='autoplay' allowFullScreen={true}/>
        )}
        
        <div className='video-desc'>
          
          <p className='video-title'>{newVideo.title}</p>
          
          <div className='video-buttons'>
            
            {newVideo.title && (
              <button onClick={voteUp}><i class="fas fa-thumbs-up"></i> {newVideo.votes.upVotes}</button>
            )}
            
            {newVideo.title && (
              <button onClick={voteDown}><i class="fas fa-thumbs-down"></i> {newVideo.votes.downVotes}</button>
            )}
          </div>
        </div>
        
        <div className='video-info'>
          
          {newVideo.title && (
            <p>{newVideo.contentRating}</p>
          )}
          
          {newVideo.title && (
              <p className='ml-1'>{newVideo.releaseDate}</p>
          )}
        </div>
        
        <hr className='divider'></hr>
        
        <Dashboard vid={allVideos} />
      
      </Container>
    )
}

export default VideoplayPage