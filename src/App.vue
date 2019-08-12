<template>
  <div id="q-app">
    <div class="shutdown-seconds" v-if="shutdown_timer">{{ shutdown_seconds }}</div>
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
      timer: null,
      shutdown_timer: null,
      shutdown_seconds: 300
    }
  },
  created()
  {
  	// Prevent Closing when work is running
  	window.onbeforeunload = (e) => 
  	{
  	  e.returnValue = false;  // this will *prevent* the closing no matter what value is passed
      this.$router.push('/');
  	};

    // set global base url
    this.$axios.defaults.baseURL = 'http://cafe-timer-api.test:81';

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
      // settings always on top
      window.setFullScreen(true);
      window.setAlwaysOnTop(true, "floating", 1);
      window.setVisibleOnAllWorkspaces(true);

      // bring to front timer
      this.timer = setInterval(() =>
      {
        window.show();
      }, 1000);

      // shut down timer
      this.shutdown_seconds = 300;
      this.shutdown_timer = setInterval(() =>
      {
        if (this.shutdown_seconds > 0)
        {
          this.shutdown_seconds -= 1;
        }
        else
        {
          const shutdown = require('electron-shutdown-command');
          shutdown.shutdown({
            force: true,
            timerseconds: 0,
            sudo: true,
            debug: false,
            quitapp: true
          })
        }
      }, 1000);
    },
    hide_fullscreen(window)
    {
      // settings normal window
      window.setFullScreen(false);
      window.setAlwaysOnTop(false);
      window.setVisibleOnAllWorkspaces(false);

      // clear bring to front timer
      clearInterval(this.timer);
      this.timer = null;

      // clear shutdown timer
      clearInterval(this.shutdown_timer);
      this.shutdown_timer = null;
    }
  }
}
</script>

<style lang="scss">
.shutdown-seconds {
  position: fixed;
  top: 15px;
  right: 15px;
  font-weight: 700;
  color: #fff;
  font-size: 1.2rem;
}
</style>
