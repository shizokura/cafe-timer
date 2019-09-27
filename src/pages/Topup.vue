<template>
	<div class="topup">
		<form @submit.prevent="submit()">
			<div class="form-group">
				<q-input filled label="Activation Code" v-model="activation_code"></q-input>
			</div>
			<div class="form-group">
				<q-input filled label="PIN" v-model="pin"></q-input>
			</div>
			<div class="form-group">
				<q-input filled label="Username" v-model="username"></q-input>
			</div>
			<div class="form-group">
				<q-input filled label="Password" v-model="password"></q-input>
			</div>
			<div class="form-group">
				<div style="display: grid; grid-template-columns: auto auto; grid-column-gap: 5px">
					<q-btn type="button" @click="$router.push('/')" unelevated color="primary" label="BACK" />
					<q-btn type="submit" unelevated color="primary" label="TOPUP" />
				</div>
			</div>
		</form>
	</div>
</template>

<style lang="scss">
	.topup {
		background-color: #2980b9;
		min-height: 100vh;
		overflow: hidden;
		form {
			padding: 25px;
			background-color: #fff;
			width: 400px;
			margin: auto;
			margin-top: calc(50vh - 185px);
			height: 370px;
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
		name: 'Topup',
		data()
		{
			return {
				activation_code: null,
				pin: null,
				username: null,
				password: null
			}
		},
		methods:
		{
			async submit()
			{
				this.$q.loading.show();

				const response = await this.$axios.post('/api/topup', 
				{
					activation_code: this.activation_code,
					pin_code: this.pin,
					username: this.username,
					password: this.password
				});

				if (response.data == 'success')
				{
					this.$q.notify({
						message: "Successfully topup.",
						color: 'green'
					})

					this.$router.push('/');
				}
				else if (response.data == 'error_code')
				{
					this.$q.notify({
						message: "Code doesn't exist.",
						color: 'red'
					})
				}
				else if (response.data == 'error_used')
				{
					this.$q.notify({
						message: "Code already used.",
						color: 'red'
					})
				}
				else if (response.data == 'error_member')
				{
					this.$q.notify({
						message: "Invalid account.",
						color: 'red'
					})
				}

				this.$q.loading.hide();
			}
		}
	}
</script>