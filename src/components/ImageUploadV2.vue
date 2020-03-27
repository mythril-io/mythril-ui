<template>
	<div>
		<div class="file">
			<label class="file-label">
				<input class="hidden" type="file" :name="name" @change="onFileChange" ref="fileupload">
				<slot name="submit">
					Submit
				</slot>
			</label>
		</div>
	</div>
</template>

<script>
export default {
  props:['name'],
	data() {
		return {
			image: ''
		}
	},
	methods: {
		onFileChange(e) {
			var files = e.target.files || e.dataTransfer.files;
			if (!files.length)
				return;
			this.createImage(files[0]);

		},
		createImage(file) {
			var image = new Image();
			var reader = new FileReader();
			var vm = this;

			reader.onload = (e) => {
				vm.image = e.target.result;
				this.$emit('updateImage', vm.image)
			};
			reader.readAsDataURL(file);
		},
	}
};
</script>
