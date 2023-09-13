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

	modules: [
		"@pinia/nuxt",
		"@pinia-plugin-persistedstate/nuxt",
		"@vee-validate/nuxt",
		"@nuxt/ui"
	],

	ui: {
		global: true,
		safelistColors: [
			'primary',
			'sky',
			'green',
			'red',
			'amber',
			'gray'
		]
	},

	colorMode: {
		preference: 'light',
	},

	css: ['~/assets/css/_main.css'],

	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},

	imports: {
		presets: [
			{ from: '@/utils/stores/app', imports: ['useAppStore'] },
			{ from: '@/utils/stores/auth', imports: ['useAuthStore'] },
		]
	},

	vite: {
		define: {
			"process.env.DEBUG": false,
		},
	},
})
