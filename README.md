# express-swagger-export

Generates swagger 2.0 file from existing express 3 app.

## Problem
I have express 3 apps and want migrate to Swagger 2. I'm using Postman and want to import my API as Postman collections. 


## Usage 

>Run this code *AFTER* express server is started (and all routes inited).

```
if (env === 'development') {
        // write all routes to swagger file
        const filepath = Path.join(__dirname, './docs/swagger.json');
        const writeSwaggerFile = require('express-swagger-export');
        const template = {
            info: {
                title: 'Pics.io exported',
                description: 'Pics.io app API',
                version: '1.0.0'
            },
        };
        writeSwaggerFile(app, filepath, {template, includeRoot:false});
    }
```






