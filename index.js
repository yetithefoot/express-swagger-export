/* jshint node:true, esversion:6 */
module.exports = function express3toSwagger2(app, filepath, options = {
	includeRoot: true
}) {
	let template = {
		swagger: "2.0",
		info: {
			title: 'Swagger app',
			description: 'Swagger app description',
		},
		"paths": {}
	};
	template = Object.assign(template, options.template);
	// export all files
	Object.keys(app.routes).forEach(method => {
		app.routes[method].forEach(r => {
			// ignore non-string paths
			if (typeof r.path !== 'string') {
				return;
			}
			if ((r.path === '/' || r.path === '/*') && !options.includeRoot) {
				return;
			}
			let endpointPath = Object.clone(r.path);
			r.keys.forEach(key => {
				// replace optional and required params
				endpointPath = endpointPath.replace(`?:${key.name}`, `{${key.name}}`).replace(`:${key.name}`, `{${key.name}}`);
			});
			// create endpoint if not exists
			if (!template.paths[endpointPath]) {
				template.paths[endpointPath] = {};
			}
			template.paths[endpointPath][r.method] = {
				"responses": {
					"200": {
						"description": `${r.method} ${endpointPath}`
					}
				}
			}
		})
	});
	fs.writeFile(filepath, JSON.stringify(template, null, 2));
	console.log(`express-swagger-export: API exported to ${filepath} file`);
}