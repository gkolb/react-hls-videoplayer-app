import React from 'react';
import VideoListItem from '../VideoListItem/VideoListItem'

const VideoList = ( {videos, handleVideoItemClick} ) => {
  return (
    <div className="video-list">
        {videos.map((video) => (
          <VideoListItem 
            className="item"
            video={video}
            handleVideoItemClick={handleVideoItemClick}
            key={video.videoTitle}/>
        ))}
    </div>
  )
}

export default VideoList;