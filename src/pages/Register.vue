<template>
	<div class="register">
		<form @submit.prevent="submit()">
			<div class="form-group">
				<q-input filled label="Username" v-model="username"></q-input>
			</div>
			<div class="form-group">
				<q-input type="password" filled label="Password" v-model="password"></q-input>
			</div>
			<div class="form-group">
				<q-input type="password" filled label="Confirm Password" v-model="confirm_password"></q-input>
			</div>
			<div class="form-group">
				<div style="display: grid; grid-template-columns: auto auto; grid-column-gap: 5px">
					<q-btn type="button" @click="$router.push('/')" unelevated color="primary" label="BACK" />
					<q-btn type="submit" unelevated color="primary" label="REGISTER" />
				</div>
			</div>
		</form>
	</div>
</template>

<style lang="scss">
	.register {
		background-color: #2980b9;
		min-height: 100vh;
		overflow: hidden;
		form {
			padding: 25px;
			background-color: #fff;
			width: 400px;
			margin: auto;
			margin-top: calc(50vh - 150px);
			height: 300px;
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
		name: 'Register',
		data()
		{
			return {
				username: null,
				password: null,
				confirm_password: null,
			}
		},
		methods:
		{
			async submit()
			{
				this.$q.loading.show();

				if (this.password && this.username && this.confirm_password)
				{
					if (this.password == this.confirm_password)
					{
						const response = await this.$axios.post('/api/register',
						{
							username: this.username,
							password: this.password
						})

						if (response.data == "success")
						{
							this.$q.notify({
								message: 'Successfully registered.',
								color: 'green'
							})

							this.$router.push('/');
						}
						else
						{
							this.$q.notify({
								message: 'Username already exists.',
								color: 'red'
							})
						}					
					}
					else
					{
						this.$q.notify({
							message: 'Confirm Password is incorrect.',
							color: 'red'
						});
					}
				}
				else
				{
					this.$q.notify({
						message: 'Please fill up all the fields.',
						color: 'red'
					});
				}
				
				this.$q.loading.hide();
			}
		}
	}
</script>