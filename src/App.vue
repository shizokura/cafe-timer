<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import EventBus from './event-bus';

export default 
{
  name: 'App',
  data()
  {
    return {
      timer: null
    }
  },
  created()
  {
  	// Prevent Closing when work is running
  	// window.onbeforeunload = (e) => 
  	// {
  	//   e.returnValue = false;  // this will *prevent* the closing no matter what value is passed
  	// };

    // set global base url
    this.$axios.defaults.baseURL = 'http://cafe-timer-api.test';

    this.fullscreen();
  },
  methods:
  {
    fullscreen()
    {
      var electron = require('electron');
      var window = electron.remote.getCurrentWindow();

      window.setMenuBarVisibility(false);

      this.show_fullscreen(window);

      EventBus.$off('toggleFullscreen');
      EventBus.$on('toggleFullscreen', (fullscreen) =>
      {
        if (fullscreen)
        {
          this.show_fullscreen(window);
        }
        else
        {
          this.hide_fullscreen(window);
        }
      });
    },
    show_fullscreen(window)
    {
      window.setFullScreen(true);
      window.setAlwaysOnTop(true, "floating", 1);
      window.setVisibleOnAllWorkspaces(true);
      this.timer = setInterval(() =>
      {
        window.show();
      }, 1000);
    },
    hide_fullscreen(window)
    {
      window.setFullScreen(false);
      window.setAlwaysOnTop(false);
      window.setVisibleOnAllWorkspaces(false);
      clearInterval(this.timer);
    }
  }
}
</script>

<style>
</style>
