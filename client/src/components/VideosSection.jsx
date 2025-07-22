import React from 'react';
import './VideosSection.css';

const VideosSection = () => {
  return (
    <section id="short-videos">
      <h2>Our Short Videos</h2>
      <div id="videos-container">
        <video width="315" height="560" controls muted autoPlay loop title="Video 1">
          <source src="/Videos/video1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video width="315" height="560" controls muted autoPlay loop title="Video 2">
          <source src="/Videos/video2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video width="315" height="560" controls muted autoPlay loop title="Video 3">
          <source src="/Videos/video3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video width="315" height="560" controls muted autoPlay loop title="Video 4">
          <source src="/Videos/video4.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default VideosSection; 