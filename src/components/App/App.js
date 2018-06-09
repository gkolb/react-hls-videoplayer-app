import React, { Component } from 'react';
import './App.css';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import VideoList from '../VideoList/VideoList';
import { VIDEOS } from '../../mock-video-data';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: VIDEOS,
      selectedVideo: VIDEOS[0]
    }
    
    this.handleVideoItemClick = this.handleVideoItemClick.bind(this);
  }

  handleVideoItemClick(video) {
    this.setState({
      selectedVideo: video
    });
  }

  render() {
    const { videos, selectedVideo } = this.state;

    return (
      <div className="App wrapper">
        <VideoPlayer selectedVideo={selectedVideo}/>
        <VideoList videos={videos} handleVideoItemClick={this.handleVideoItemClick}/>
      </div>
    );
  }
}

export default App;
