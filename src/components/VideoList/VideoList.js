import React from 'react';
import VideoListItem from '../VideoListItem/VideoListItem'

const VideoList = ( {videos, handleVideoItemClick} ) => {
  return (
    <div>
      <div>VideoList</div>
      {videos.map((video) => (
        <VideoListItem 
          video={video}
          handleVideoItemClick={handleVideoItemClick}
          key={video.videoTitle}/>
      ))}
    </div>
  )
}

export default VideoList;