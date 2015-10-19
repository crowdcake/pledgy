# pledgy

Crowdfunding for hackspaces and other small communities.

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
