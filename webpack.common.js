const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')

const webpack = require('webpack')
const path = require('path')

module.exports = {
	entry: {
		index: './src/index.js',
	},
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'docs'),
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
						plugins: ['@babel/plugin-proposal-class-properties'],
					},
				},
			},
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
					},
				},
			},
			{
				test: /\.scss$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.css$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [['postcss-preset-env']],
							},
						},
					},
				],
			},
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			{
				resourceQuery: /raw/,
				type: 'asset/source',
			},
			{
				test: /\.png/,
				type: 'asset/resource',
				generator: {
					filename: 'images/[hash][ext][query]',
				},
			},
			{
				test: /\.svg/,
				type: 'asset/resource',
				generator: {
					filename: 'images/[hash][ext][query]',
				},
			},
			{
				test: /\.(ttf|otf)$/i,
				loader: 'file-loader',
				options: {
					name: 'fonts/[name].[ext]',
				},
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
			chunkFilename: '[id].[contenthash].css',
		}),

		// Index
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: './index.html',
		}),

		//Section

		new HtmlWebpackPlugin({
			template: './src/games.html',
			filename: './games.html',
		}),

		new HtmlWebpackPlugin({
			template: './src/library.html',
			filename: './library.html',
		}),

		new HtmlWebpackPlugin({
			template: './src/investigations.html',
			filename: './investigations.html',
		}),

		//Article
		new HtmlWebpackPlugin({
			template: './src/library/papa.html',
			filename: './library/papa.html',
		}),
		new HtmlWebpackPlugin({
			template: './src/games/tests.html',
			filename: './games/tests.html',
		}),

		new HtmlWebpackPlugin({
			template: './src/investigations/deepfake.html',
			filename: './investigations/deepfake.html',
		}),

		//Partials
		new HtmlWebpackPartialsPlugin([
			{
				path: path.join(__dirname, './src/partials/analytics.html'),
				location: 'analytics',
				template_filename: '*',
				priority: 'replace',
			},
		]),
	],
	optimization: {
		minimizer: [new CssMinimizerPlugin()],
	},
}
