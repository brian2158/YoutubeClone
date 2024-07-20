
import './Recommended.css'
import { useEffect, useState } from 'react'
import { API_KEY } from '../../data'
import { valueConverter } from '../../data'
import { Link } from 'react-router-dom'
const Recommended = ({ categoryId }) => {

  const [recommendedData, setRecommendedData] = useState([]);
  

  const fetchdata = async () => {
    //fetch data for recommended videos
    const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`
     await fetch(relatedVideo_url).then(res => res.json()).then(data => setRecommendedData(data.items))
  }
useEffect(() => {
    fetchdata();
} ,[])

  return (
    <div className='recommended'>
        {recommendedData.map((item,index) => {
            return (
                <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
                <img src={item.snippet.thumbnails.medium.url}  />
                <div className="vid-info">
                    <h4>{item.snippet.title}</h4>
                    <p>{item.snippet.channelTitle}</p>
                    <p> {valueConverter(item.statistics.viewCount)} views</p>
                </div>
            </Link> 
            )
        })} 
    </div>
  )
}

export default Recommended
