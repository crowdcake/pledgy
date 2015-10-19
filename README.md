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

Initialize your database:
```sh
node script/dbInit.js
```

Build all the stylesheets and assets:
```sh
brunch build -P
```

And start it:
```sh
NODE_ENV=production npm start
```

## Configuration
