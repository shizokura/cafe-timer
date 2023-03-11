<template>
	<div class="login">
		<form @submit.prevent="submit()">
			<div class="form-group">
				<q-input filled label="Username" v-model="username"></q-input>
			</div>
			<div class="form-group">
				<q-input type="password" filled label="Password" v-model="password"></q-input>
			</div>
			<div class="form-group">
				<div style="display: grid; grid-template-columns: auto auto; grid-column-gap: 5px">
					<q-btn @click="$router.push('/topup')" type="button" unelevated color="primary" label="TOPUP" />
					<q-btn type="submit" unelevated color="primary" label="LOGIN" />
				</div>
				<p style="margin-top: 15px; color: #aaa;">Not registered? <a @click="$router.push('/register')" href="javascript:" style="text-decoration: none; color: #1A6293;">Create an account</a></p>
			</div>
		</form>
	</div>	
</template>

<style lang="scss">
	.login {
		background-color: #2980b9;
		min-height: 100vh;
		overflow: hidden;
		form {
			padding: 25px;
			background-color: #fff;
			width: 400px;
			margin: auto;
			margin-top: calc(50vh - 130px);
			height: 260px;
			.form-group {
				margin-bottom: 15px;
				text-align: center;
			}
			button {
				width: 100%;
			}
		}
	}
</style>

<script>
	export default
	{
		name: 'Login',
		data()
		{
			return {
				username: null,
				password: null
			}
		},
		methods:
		{
			async submit()
			{
				this.$q.loading.show();

				const response = await this.$axios.post('/api/user_info', 
				{
					username: this.username,
					password: this.password
				})
				.catch((err) =>
				{
					this.$q.loading.hide();
					console.log(err);
				});

				if (response.data.member_id)
				{
					this.$router.push(
					{
						path: '/timer',
						query: response.data
					});
				}
				else
				{
					if (response.data == 'no_time')
					{
						this.$q.notify({
							message: "You have no time on this account.",
							color: 'red'
						})
					}
					else
					{
						this.$q.notify({
							message: "The credentials you've entered doesn't match any account.",
							color: 'red'
						})
					}
				}

				this.$q.loading.hide();
			}
		},
		created()
		{

		}
	}
</script>