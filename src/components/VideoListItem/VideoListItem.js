import React from 'react';

const VideoListItem = ( {video, handleVideoItemClick} ) => {
  return (
    <div>
      <button onClick={() => handleVideoItemClick(video)}>{video.videoTitle}</button>
    </div>
  )
}

export default VideoListItem;