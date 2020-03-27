<template>
	<div>
		<div class="file" v-show="!image">
			<label class="file-label">
				<input class="hidden" type="file" :name="name" @change="onFileChange" ref="fileupload">
				<slot name="submit">
					Submit
				</slot>
			</label>
		</div>
		<div v-show="image">
			<slot name="remove" v-bind:removeImage="removeImage">
				Remove
			</slot>
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
		removeImage: function (e) {
			this.image = '';
			const input = this.$refs.fileupload;
				input.type = 'text';
				input.type = 'file';
			this.$emit('updateImage', this.image)
		}
	}
};
</script>
