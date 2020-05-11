const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map', // useful for debugging
	
	devServer: {
		contentBase: './dist',
		   before: function(app, server) {
		      app.get('/v1/api/*', function(req, res) {
		    	if (req.params[0] == 'statistics/completed') {
		    		console.log('matched completed');
		    		var completed = Math.floor(Math.random() * req.query.minutesAgo);
		    		var errors = req.query.minutesAgo - completed;
	    			res.json({"error":{"label":"error","timestamp":1587733229411,"count":errors},"complete":{"label":"complete","timestamp":1587733229411,"count":completed}})
		    	} else {
		    		console.log(req.params[0] + ' matched nothing!');
		    		res.json({'status' : 'doh!'});
		    	}
		      });
		   }
	},
});
