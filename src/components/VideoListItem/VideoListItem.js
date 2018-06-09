import React from 'react';

const VideoListItem = ( {video, handleVideoItemClick} ) => {
  return (
      <button onClick={() => handleVideoItemClick(video)}>{video.videoTitle}</button>
  )
}

export default VideoListItem;