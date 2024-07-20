import  { useEffect, useState } from 'react'
import './PlayVideo.css'


import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import user_profile from '../../assets/user_profile.jpg'
import { API_KEY, valueConverter } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'




const PlayVideo = () => {
    const { videoId } = useParams();
    
    const [apiData,setApiData] = useState(null);
    const [channelData , setchannelData] = useState(null);
    const [commentData, setCommentData] = useState([])
   

    

   

   const fetchVideoData = async() => {
    //fetching Videos Data
         const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
         await fetch(videoDetailsUrl).then(res => res.json()).then(data => setApiData(data.items[0]))
   }
   useEffect(() => {
    fetchVideoData();
   },[videoId])

   
   async function FetchOtherChannel(){
           const channelUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
           await fetch(channelUrl).then(res => res.json()).then(data => setchannelData(data.items[0]))
           // fetching comment data
           const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`
           await fetch(commentUrl).then(res => res.json()).then(data => setCommentData(data.items))
   }
   useEffect(() => {
    
   FetchOtherChannel()

   },[])




  return (
    <div className='play-video'>
        {/* <video controls autoPlay muted src={video1}></video> */}
        <iframe  
                 src={`https://www.youtube.com/embed/${videoId}?autoplay=1 muted`} 
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                 allowfullscreen>
        </iframe>
        <h3>{apiData? apiData.snippet.title : 'Title Here'} </h3>
        <div className="play-video-info">
            <p> {apiData? valueConverter(apiData.statistics.viewCount) : '16k'} views &bull; {apiData? moment(apiData.snippet.publishedAt).fromNow() : ''} </p>
            <div>
                 <span><img src={like} alt="" />{apiData? valueConverter(apiData.statistics.likeCount)   : "155"}</span>
        
                 <span><img src={dislike} alt="" /></span>
        
                 <span><img src={share} alt="" />share</span>
        
                 <span><img src={save} alt="" />Save</span>
            </div>
        </div>
        <hr />
{/* end of player video info */}

        
        <div className="publisher">
            <img src={channelData? channelData.snippet.thumbnails.default.url : user_profile} alt="" />
            <div>
                <p>{apiData && apiData.snippet.channelTitle}</p>
                <span>{channelData? valueConverter(channelData.statistics.subscriberCount) : " "} Subscribers</span>
            </div>
            <button>Subscribe</button>
            
        </div>
{/* end of publisher  */}
       <div className="vid-description">
      <p>{apiData?apiData.snippet.description.slice(0,250): 'Description Here'}</p>
        <hr />
        
        <h4>{apiData? valueConverter(apiData.statistics.commentCount) : "02"} Comments</h4>

        {commentData.map((item, index) => {
            return (
                <div key={index} className="comment">
                <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                <div>                                            
    
                    <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span> {moment(item.snippet.topLevelComment.snippet.updatedAt).fromNow()}</span></h3>
                    <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                         <div className="comment-action">
                            <img src={like} alt="" />
                            <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                            <img src={dislike} alt="" />
                         </div>
                </div>
            </div>
            )

        })}
        
 {/* end of a comment */}
       

       </div>
{/* end of video description */}
      
    </div>
  )
}

export default PlayVideo
