# pledgy

Crowdfunding for hackspaces and other small communities.

## Features
TODO

## Installation

Make sure, that you've already installed `brunch`.
```sh
npm install brunch -g
```

Then, install pledgy:


Clone this repository:
```sh
git clone https://github.com/h42i/pledgy.git 
cd pledgy
```

Install all the dependecies:
```sh
npm install
bower install
```

Copy configuration and initialize your database:
```sh
cp config/config.json.example config/config.json
node script/dbInit.js
```

Build all the stylesheets copy the font files:
```sh
brunch build -P
cp -r bower_components/Materialize/font public/font
```

And start it:
```sh
NODE_ENV=production npm start
```

## Configuration
TODO

## License

```
Copyright 2015 crowdcake

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
