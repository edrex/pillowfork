module.exports = {
	entry: './app/app.jsx',
	output: {
		filename: 'app/bundle.js'
		//at this directory our bundle file will be available
		//make sure port 8090 is used when launching webpack-dev-server
	},
	module: {
		loaders: [
		{
			//tell webpack to use jsx-loader for all *.jsx files
			test: /\.jsx$/,
			loader: 'jsx-loader?insertPragma=React.DOM&harmony'
		}
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	}
}
