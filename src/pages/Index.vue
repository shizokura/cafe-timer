<template>
  <q-page class="text-center">
  	<div class="time">
  		<h4 style="margin-bottom: 0;">Remaining Time</h4>
  		<h5 style="margin-top: 1rem;">{{ fancyTimeFormat(current_time) }}</h5>
  	</div>
  	<div class="redeem">
  		<h4 style="margin-bottom: 0;">Redeem Points</h4>
  		<h5 style="margin-top: 1rem;">You have currently {{ $route.query.points }} points.</h5>
  		<q-btn style="width: 100%; margin-top: 10px;" unelevated color="primary" label="50 Points (30 Minutes)" />
  		<q-btn style="width: 100%; margin-top: 10px;" unelevated color="primary" label="100 Points (1 Hour)" />
  		<q-btn style="width: 100%; margin-top: 10px;" unelevated color="primary" label="200 Points (3 Hours)" />
  		<q-btn style="width: 100%; margin-top: 10px;" unelevated color="primary" label="300 Points (5 Hours)" />
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
	import EventBus from '../event-bus';

	export default 
	{
	  name: 'PageIndex',
	  data()
	  {
	  	return {
	  		current_time: (this.$route.query.remaining_minutes * 60) - 1,
	  		timer: null
	  	}
	  },
	  methods:
	  {
	  	fancyTimeFormat(time)
		{   
		    // Hours, minutes and seconds
		    var hrs = ~~(time / 3600);
		    var mins = ~~((time % 3600) / 60);
		    var secs = ~~time % 60;

		    // Output like "1:01" or "4:03:59" or "123:03:59"
		    var ret = "";

		    if (hrs > 0) {
		        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
		    }

		    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
		    ret += "" + secs;
		    return ret;
		}
	  },
	  created()
	  {
	  	EventBus.$emit('toggleFullscreen', false);

	  	this.timer = setInterval(async () => 
  		{
  			if (this.current_time > 0)
  			{
  				const response = await this.$axios.post('/api/update_time', 
				{
					username: this.$route.query.member_un,
					password: this.$route.query.member_pw
				});

  				this.current_time = response.data * 60;
  			}
  			else
  			{
  				this.$router.push('/');
  			}
  		}, 1000);
	  },
	  beforeDestroy()
	  {
	  	clearInterval(this.timer);
	  	this.timer = null;
  		EventBus.$emit('toggleFullscreen', true);
	  }
	}
</script>
