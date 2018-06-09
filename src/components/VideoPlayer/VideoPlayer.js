import React, { Component } from 'react';
import './VideoPlayer.css';
import Hls from 'hls.js';

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: null,
      time: "0",
      duration: "0",
      percent: '0',
      playPause: "pause"
    }

    this.updateVideo=this.updateVideo.bind(this);
    this.togglePlay=this.togglePlay.bind(this);
    this.updateProgress=this.updateProgress.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.setDuration = this.setDuration.bind(this);
  }

  componentDidMount() {
    this.updateVideo(this.props.selectedVideo.videoUrl);
  }

  componentWillReceiveProps(nextProps) {
    // Check if it's a new video by checking video url
    if(JSON.stringify(this.props.selectedVideo.videoUrl) !== JSON.stringify(nextProps.selectedVideo.videoUrl)) {
      this.updateVideo(nextProps.selectedVideo.videoUrl);
    }
  } 

  updateVideo(source) {
    if(Hls.isSupported() && this.player) {
      var context = this;
      const video = this.player;
      const hls = new Hls();
      hls.loadSource(source);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function() {
        video.pause();
        video.currentTime = "0";
        video.play();
        context.setState({
          video: video,
        })
        context.state.video.addEventListener('timeupdate', context.handleTimeChange);
        context.state.video.addEventListener('durationchange', context.setDuration);
      })
    }
  }

  setDuration() {
    const { video } = this.state;
    this.setState({
      duration: Math.floor(video.duration)
    })
  }

  handleTimeChange() {
    const { video } = this.state;
    const percent = (video.currentTime / video.duration) * 100;
    this.setState({
      time: Math.floor(video.currentTime),
      percent: `${percent}`
    });
  }

  togglePlay() {
    const { video } = this.state;
    const method = video.paused ? 'play' : 'pause';
    const playPause = video.paused ? 'pause' : 'play';
    video[method]();
    this.setState({
      playPause: playPause
    })
  }

  updateProgress(e){
    const { video } = this.state;
    const newTime = (e.nativeEvent.offsetX / video.clientWidth) * video.duration;
    if (!isNaN(newTime)) {
      this.player.currentTime = video.duration * newTime / 100;
    }
  }


  render() {
    return (
      <div id="player" className="player">
        <h2>{this.props.selectedVideo.videoTitle}</h2>
        <video id="video" ref={(player) => this.player = player} autoPlay="true"></video>
        <div id="video-controls" className="controls">
          <button id="play-pause" type="button" className='btn' onClick={this.togglePlay}><i className={`fa fa-${this.state.playPause}`}></i></button>
          <div className="progress">
              <progress onClick={this.updateProgress} id="progress" min="0" max="100" value={this.state.percent}>
                <span id="progress-bar"></span>
              </progress>
          </div>
          <div id="time-bar">{`${this.state.time}/${this.state.duration}`}</div>
        </div>
      </div>
    )
  }
}

export default VideoPlayer;