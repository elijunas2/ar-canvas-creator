
// Component to handle video play on click
export const playOnClickComponent = {
  init: function() {
    this.el.addEventListener('click', () => {
      const video = this.el.components.material.material.map.image;
      if (video && typeof video.play === "function" && typeof video.pause === "function") {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      }
    });
  }
};
