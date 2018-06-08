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

    this.togglePlay=this.togglePlay.bind(this);
    this.updateProgress=this.updateProgress.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.setDuration = this.setDuration.bind(this);
  }
  componentDidMount() {
    if(Hls.isSupported() && this.player) {
      var context = this;
      const video = this.player;
      const hls = new Hls();
      hls.loadSource('https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8');
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
    video[method]();
    this.setState({
      playPause: method
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
      <div>
        <video height="600" id="video" ref={(player) => this.player = player} autoPlay="true"></video>
        <div id="video-controls">
          <button id="play-pause" type="button" className='btn' onClick={this.togglePlay}><i className={`fa fa-${this.state.playPause}`}></i></button>
          <div class="progress">
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