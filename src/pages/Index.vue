<template>
  <q-page class="text-center">
  	<div class="time">
  		<h4 style="margin-bottom: 0;">Remaining Time</h4>
  		<h5 style="margin-top: 1rem;">{{ fancyTimeFormat(current_time) }}</h5>
  	</div>
  	<div class="redeem">
  		<h4 style="margin-bottom: 0;">Redeem Points</h4>
  		<h5 style="margin-top: 1rem;">You have currently {{ points }} points.</h5>
  		<q-btn @click="claim_points(50)" style="width: 100%; margin-top: 10px;" unelevated color="primary" label="50 Points (30 Minutes)" />
  		<q-btn @click="claim_points(100)" style="width: 100%; margin-top: 10px;" unelevated color="primary" label="100 Points (1 Hour)" />
  		<q-btn @click="claim_points(200)" style="width: 100%; margin-top: 10px;" unelevated color="primary" label="200 Points (3 Hours)" />
  		<q-btn @click="claim_points(300)" style="width: 100%; margin-top: 10px;" unelevated color="primary" label="300 Points (5 Hours)" />
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
	import { ipcRenderer } from 'electron';
	require('howler');

	export default 
	{
	  name: 'PageIndex',
	  data()
	  {
	  	return {
	  		current_time: (this.$route.query.remaining_minutes * 60) - 1,
	  		timer: null,
	  		points: this.$route.query.points,
	  		playing: false,
			update_time: null
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
		},
		async claim_points(points)
		{
			this.$q.loading.show();

			const response = await this.$axios.post('/api/claim_points',
			{
				username: this.$route.query.member_un,
				points: points
			});

			if (response.data == 'success')
			{
				this.$q.notify({
					message: "Successfully claimed points.",
					color: 'green'
				});

				this.points -= points;
			}
			else
			{
				this.$q.notify({
					message: "You don't have enough points.",
					color: 'red'
				});
			}

			this.$q.loading.hide();
		}
	  },
	  created()
	  {
        this.update_time = (event, data) =>
        {
            this.current_time = data * 60;
        };

        ipcRenderer.on('update-time', this.update_time);

	  	EventBus.$emit('toggleFullscreen', false);
		ipcRenderer.send('start-time', { url: `${ this.$axios.defaults.baseURL }/api/update_time`, username: this.$route.query.member_un, password: this.$route.query.member_pw });

	  	this.timer = setInterval(async () => 
  		{
  			if (this.current_time <= 601 && this.current_time >= 599)
  			{
  				if (!this.playing)
  				{
  					this.playing = true;
	  				
	  				const sound = new Howl({
		                src: 'statics/10-minutes.mp3',
		                volume: 1,
		            });
		            sound.play();

		            setTimeout(() => {
		            	this.playing = false;
		            }, 2000)
  				}
  			}

  			if (this.current_time <= 61 && this.current_time >= 59)
  			{
  				if (!this.playing)
  				{
  					this.playing = true;
	  				
	  				const sound = new Howl({
		                src: 'statics/1-minute.mp3',
		                volume: 1,
		            });
		            sound.play();

		            setTimeout(() => {
		            	this.playing = false;
		            }, 2000)
  				}
  			}

  			if (this.current_time > 0)
  			{
  				// const response = await this.$axios.post('/api/get_time', 
				// {
				// 	username: this.$route.query.member_un,
				// 	password: this.$route.query.member_pw
				// });

  				// this.current_time = response.data * 60;
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
		ipcRenderer.send('stop-time');
        ipcRenderer.removeListener('update-time', this.update_time);
  		EventBus.$emit('toggleFullscreen', true);
	  }
	}
</script>
