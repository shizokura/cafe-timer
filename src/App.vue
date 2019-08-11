<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default 
{
  name: 'App',
  created()
  {
  	// Prevent Closing when work is running
	window.onbeforeunload = (e) => 
	{
	  e.returnValue = false;  // this will *prevent* the closing no matter what value is passed
	};
  }
}
</script>

<style>
</style>
