<template>
  <q-page class="text-center">
  	<div class="time">
  		<h4 style="margin-bottom: 0;">Remaining Time</h4>
  		<h5 style="margin-top: 1rem;">1 Hour and 30 Minutes</h5>
  	</div>
  	<div class="redeem">
  		<h4 style="margin-bottom: 0;">Redeem Points</h4>
  		<q-btn style="width: 100%; margin-top: 10px;" unelevated color="primary" label="100 Points (1 Hour)" />
  		<q-btn style="width: 100%; margin-top: 10px;" unelevated color="primary" label="150 Points (2 Hours)" />
  	</div>
  </q-page>
</template>

<style lang="scss">
.time {

}
.redeem {
	padding: 0 1rem;
}
</style>

<script>
	export default 
	{
	  name: 'PageIndex',
	  created() 
	  {
	  	// Prevent Closing when work is running
		window.onbeforeunload = (e) => 
		{
		  e.returnValue = false;  // this will *prevent* the closing no matter what value is passed
		  // win.destroy()
		};
	  },
	  methods:
	  {
	  	fullscreen()
	  	{
	  		var electron = require('electron');
			var window = electron.remote.getCurrentWindow();
			window.setFullScreen(true);
	  	}
	  }
	}
</script>
