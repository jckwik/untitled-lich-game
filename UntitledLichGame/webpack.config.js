/// <binding />
module.exports = {
	module: {
		rules: [
			{
                test: /\.(jsx|js)$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader'
				}
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
		]
	}
}