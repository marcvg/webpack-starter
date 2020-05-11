const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FontminPlugin = require('fontmin-webpack');

module.exports = {
	context: path.resolve(__dirname, 'src'),
	
	entry: {
		app: './app/app.js',
	},

	plugins: [
		new CleanWebpackPlugin(),
		new FontminPlugin({autodetect: true,}),
		new HtmlWebpackPlugin({template: './index.html'}),
	],
	
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	
	resolve: {
	    modules: [
	    	path.resolve(__dirname, 'src'), 'node_modules'
	    ]        
	},

	module: {
		rules: [
            {   
            	test: /\.js$/,
            	exclude: /node_modules/,
            	use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                      }
            	}
            }, 
			{ 
				test: /\.(html)$/,
				use: ['html-loader']
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
		    },
			{ 
		    	test: /\.scss$/, 
		    	use: ['style-loader', 'css-loader', 'sass-loader']
		    },
            {
                test: /\.(otf|svg|eot|woff|woff2|ttf)$/,
		    	use: [{
		    		loader: 'file-loader',
		    		options: {
		    			hash: 'sha512',
		    			digest: 'hex',
		                name: 'fonts/[name].[ext]'
	                }
		    	}]
            }
		]
	},

};