import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import { createHtmlPlugin } from "vite-plugin-html";
import path from "path";
import viteCompression from 'vite-plugin-compression';
import legacyPlugin from '@vitejs/plugin-legacy';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
	base: './',
	define: {
		'process.env': {
			'apiURL':`http://localhost:8021/api`,
			'webURL':'',
			'staticURL':'',
			'appId':'',
			'title': 'h5 web3 wallet',
			'targetChainId': 56
		}
	},
	server: {
		hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
		// 服务配置
		//port: 8080, // 类型： number 指定服务器端口;
		//open: false, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
		//cors: true, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
		//proxy look for https://vitejs.cn/config/#server-proxy
		//proxy: {
			//'/dev': {
				//target: '',
				//changeOrigin: true,
				//rewrite: path => path.replace(/^\/dev/, '')
			//}
		//}
	},
	resolve: {  //配置模块如会解析
		extensions: [
		     '.vue','.js','.json', '.css', '.ts', '.mjs', '.less', '.sass','.jsx', '.coffee'
		], //引入这些文件 可以不带后缀 按顺序解析'.js', '.vue', '.json', '.css'
		alias: {
			//'process': "process/browser",
			//'buffer': "buffer",
			//'crypto': "crypto-browserify",
			//'stream': "stream-browserify",
			//'assert': "assert",
			//'http': "stream-http",
			//'https': "https-browserify",
			//'os': "os-browserify",
			//'url': "url",
			//'util': "util",
			'@utils': path.resolve(__dirname, 'src/utils'),
			'@web3': path.resolve(__dirname, 'src/web3'),
			'@$$': path.resolve(__dirname, 'src/$$'),
			'@views': path.resolve(__dirname, 'src/views'),
			'@m4m': path.resolve(__dirname, 'm4m'),
			util: 'rollup-plugin-node-polyfills/polyfills/util',
			sys: 'util',
			events: 'rollup-plugin-node-polyfills/polyfills/events',
			stream: 'rollup-plugin-node-polyfills/polyfills/stream',
			path: 'rollup-plugin-node-polyfills/polyfills/path',
			querystring: 'rollup-plugin-node-polyfills/polyfills/qs',
			punycode: 'rollup-plugin-node-polyfills/polyfills/punycode',
			url: 'rollup-plugin-node-polyfills/polyfills/url',
			string_decoder: 'rollup-plugin-node-polyfills/polyfills/string-decoder',
			http: 'rollup-plugin-node-polyfills/polyfills/http',
			https: 'rollup-plugin-node-polyfills/polyfills/http',
			os: 'rollup-plugin-node-polyfills/polyfills/os',
			assert: 'rollup-plugin-node-polyfills/polyfills/assert',
			constants: 'rollup-plugin-node-polyfills/polyfills/constants',
			_stream_duplex: 'rollup-plugin-node-polyfills/polyfills/readable-stream/duplex',
			_stream_passthrough: 'rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough',
			_stream_readable: 'rollup-plugin-node-polyfills/polyfills/readable-stream/readable',
			_stream_writable: 'rollup-plugin-node-polyfills/polyfills/readable-stream/writable',
			_stream_transform: 'rollup-plugin-node-polyfills/polyfills/readable-stream/transform',
			timers: 'rollup-plugin-node-polyfills/polyfills/timers',
			console: 'rollup-plugin-node-polyfills/polyfills/console',
			vm: 'rollup-plugin-node-polyfills/polyfills/vm',
			zlib: 'rollup-plugin-node-polyfills/polyfills/zlib',
			tty: 'rollup-plugin-node-polyfills/polyfills/tty',
			domain: 'rollup-plugin-node-polyfills/polyfills/domain',
			buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
			process: 'rollup-plugin-node-polyfills/polyfills/process-es6'
		},
		aliasFields: ['browser', 'browser.esm'], /**别名区域**/
		modules: ['node_modules'], /**绝对寻址路径**/
	},
	plugins: [
		vue(),
		VueSetupExtend(),
		// 解决首次加载慢的问题
		//PkgConfig(),
		//OptimizationPersist(),
		Components({
			resolvers: [VantResolver()],
		}),
		createHtmlPlugin({
			inject: {
				data: {
					//将环境变量 VITE_APP_TITLE 赋值给 title 方便 html页面使用 title 获取系统标题
					title: 'h5 web3 wallet',
					staticURL: './',
					vConsole: true,
					timeStamp: new Date().valueOf()
				},
			},
		}),
		viteCompression({ //gzip压缩
			verbose: true,
			disable: false,
			threshold: 10240,
			algorithm: 'gzip',
			ext: '.gz',
		}),
		legacyPlugin({
			targets: ['chrome 52'], // 需要兼容的目标列表，可以设置多个
			additionalLegacyPolyfills: ['regenerator-runtime/runtime'] // 面向IE11时需要此插件
		}),
		nodePolyfills({
			// Whether to polyfill `node:` protocol imports.
			protocolImports: true,
		}),
	],
	optimizeDeps: {
		esbuildOptions: {
			// Node.js global to browser globalThis
			define: {
				global: 'globalThis'
			},
			/** Enable esbuild polyfill plugins
			plugins: [
				NodeGlobalsPolyfillPlugin({
					process: true,
					buffer: true
				}),
				NodeModulesPolyfillPlugin()
			]**/
		}
	},
	build: {
		minify: 'terser',
		terserOptions: {
			compress: {
				//drop_console: true,
				drop_debugger: true,
			},
		},
		commonjsOptions: {
			transformMixedEsModules: true
		},
		rollupOptions: {
			plugins: [
				// Enable rollup polyfills plugin used during production bundling
				//rollupNodePolyFill()
			]
		}
	}
});
