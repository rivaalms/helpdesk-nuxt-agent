export default defineNuxtConfig({
	devtools: { enabled: false },

	app: {
		head: {
			titleTemplate: "%s | Helpdesk Agent",
			htmlAttrs: {
				lang: "en",
			},
			meta: [
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{ hid: "description", name: "description", content: "" },
				{ name: "format-detection", content: "telephone=no" },
				{ charset: "utf-8" },
			],
		},
	},

	ssr: false,

	devServer: {
		port: 4848,
	},

	runtimeConfig: {
		public: {
			apiUrlBase: "",
			apiUrlPrefix: "",
		},
	},

	vite: {
		define: {
			"process.env.DEBUG": false,
		},
	},
})
