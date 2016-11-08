![Magenta](https://cloud.githubusercontent.com/assets/1455979/19179661/c962f6cc-8c14-11e6-9e0d-1b875fa5173c.png)

A pretty test reporter for Test'em!

![Screenshot](https://cloud.githubusercontent.com/assets/1455979/19179674/016d3c58-8c15-11e6-9cc9-dfbe368fcd37.png)

####Installation
In your snazzy terminal:
```
npm install magenta-testem --save-dev
```

In your testem.js (notice the JS)
```
var Magenta = require('magenta-testem');
module.exports = {
    "framework": "mocha",
    "src_files": [
        "src/*.js",
        "tests/*_tests.js"
    ]
    "reporter": new Magenta()
};
```

####Known things
Pending tests and skipped tests are reported under the same cateogry. This is due to the way they're reported via testem.
