const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
	context: path.resolve(__dirname, 'src'),
	
	entry: './app/app.js',
	
	output: {
		filename: '[hash].js',
		path: path.resolve(__dirname, 'dist')
	},
	
	resolve: {
	    //extensions: ['.js', '.css'],
	    modules: [
	      'node_modules'
	    ]        
	},

	module: {
		rules: [
            {   //needed?
            	test: /\.js$/,
                use: ['babel-loader']
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
		                name: '[name].[ext]'
	                }
		    	}]
            }
		]
	},
	
	plugins: [
		new HtmlWebpackPlugin({template: './index.html'})
	]
};