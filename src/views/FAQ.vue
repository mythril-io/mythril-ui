<template>
	<div>
		<Hero title="Frequently Asked Questions" />

		<Container>

					<div class="pt-6">
						<dl>
							<div class="md:grid md:grid-cols-12 md:gap-8">
								<dt class="text-base leading-6 font-medium text-gray-900 md:col-span-5">
									What is Mythril?
								</dt>
								<dd class="mt-2 md:mt-0 md:col-span-7">
									<p class="text-base leading-6 text-gray-500">
										Mythril is a platform that allows users to track, discover, review, recommend and discuss video games. More features for the website are planned but at the moment because everything is being maintained by one person, it may take some time.
									</p>
								</dd>
							</div>
							<div class="mt-8 border-t border-gray-200 pt-6 md:grid md:grid-cols-12 md:gap-8">
								<dt class="text-base leading-6 font-medium text-gray-900 md:col-span-5">
									Why was Mythril created?
								</dt>
								<dd class="mt-2 md:mt-0 md:col-span-7">
									<p class="text-base leading-6 text-gray-500">
										In addition to having an interest in web development and video games, people in other communities have expressed an interest in a website such as this.
									</p>
								</dd>
							</div>
							<div class="mt-8 border-t border-gray-200 pt-6 md:grid md:grid-cols-12 md:gap-8">
								<dt class="text-base leading-6 font-medium text-gray-900 md:col-span-5">
									How are games consolidated?
								</dt>
								<dd class="mt-2 md:mt-0 md:col-span-7">
									<p class="text-base leading-6 text-gray-500">
										On some more prominent gaming websites, games generally have their own page/section even if it's the same game just on different platforms. In order to consolidate pages such as these, the following guidelines are used when adding games to the database.
									</p>
									<div class="flex text-gray-500 mb-5">
										<div class="flex-none">
											<span class="tag is-primary">Note</span>
										</div>
										<div class="ml-4 italic">
											These guidelines are not set in stone and may change in the future. If you would like to provide some feedback regarding this process, please join our Discord server and let us know!
										</div>
									</div>

									<p class="text-base leading-6 text-gray-500">
										<span class="tag text-md font-semibold mb-2">Shared Pages</span>
										<ul class="ml-5 list-disc list-inside">
											<li>Multiplatform games</li>
											<li>Ports</li>
												<ul class="ml-5 mb-2 text-sm">
													<li><em>Example: Final Fantasy VI Advance, Persona 4: Golden, Xenoblade Chronicles 3D</em></li>
												</ul>
											<li>Remasters</li>
												<ul class="ml-5 mb-2 text-sm">
													<li><em>Example: The Last of Us Remastered</em></li>
												</ul>
											<li>Episodic</li>
												<ul class="ml-5 mb-2 text-sm">
													<li><em>Example: Life is Strange</em></li>
												</ul>
										</ul>
									</p>

									<p class="text-base leading-6 text-gray-500">
										<span class="tag text-md font-semibold mb-2">Separate Pages</span>
										<ul class="ml-5 list-disc list-inside">
											<li>Remakes</li>
												<ul class="ml-5 mb-2 text-sm">
													<li><em>Example: Final Fantasy VII: Remake, Shadow of the Colossus (PS4), Final Fantasy III (Nintendo DS)</em></li>
												</ul>
											<li><em>Collections/Bundles (This does not include digital bundles)</em></li>
												<ul class="ml-5 mb-2 text-sm">
													<li><em>Example: Uncharted: The Nathan Drake Collection</em></li>
												</ul>
										</ul>
									</p>
								</dd>
							</div>
							<div class="mt-8 border-t border-gray-200 pt-6 md:grid md:grid-cols-12 md:gap-8">
								<dt class="text-base leading-6 font-medium text-gray-900 md:col-span-5">
									I found a bug/factual error with the site, what should I do?
								</dt>
								<dd class="mt-2 md:mt-0 md:col-span-7">
									<p class="text-base leading-6 text-gray-500">
										The best way would be to join our Discord server and inform us of any issues, bugs, factual errors or feature requests. Alternatively, you could also create a post on our forums with the appropriate category tag.
									</p>
								</dd>
							</div>
							<div class="mt-8 border-t border-gray-200 pt-6 md:grid md:grid-cols-12 md:gap-8">
								<dt class="text-base leading-6 font-medium text-gray-900 md:col-span-5">
									How can I support Mythril?
								</dt>
								<dd class="mt-2 md:mt-0 md:col-span-7">
									<p class="text-base leading-6 text-gray-500">
										Let us know what aspects of the site could be improved upon or what features you'd like to see. We're working for a way for users to help support our server costs if they choose to do so.
									</p>
								</dd>
							</div>
						</dl>
					</div>


		</Container>

	</div>
</template>

<script>
import Hero from '@/components/Hero.vue'
import Container from '@/components/layout/Container.vue'

export default {
	name: 'FAQ',
	components: {
		Hero, Container
	},
};
</script>

<style scoped>
h3 {
	@apply text-2xl tracking-tight text-gray-700 mb-4;
}
p {
	@apply mb-5;
}
</style>
