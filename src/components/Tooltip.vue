<template>

	<div :aria-label="content" data-balloon-pos="up">
		<slot></slot>
	</div>

</template>

<script>
export default {
	props: ['content']
};
</script>
