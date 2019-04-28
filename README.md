# Black vs. Red
(In Progress) An ant colony game; army ants against fire ants.</br></br>

![Game Play Example](https://github.com/WilliamRADFunk/black-v-red/blob/master/src/assets/images/game-play.gif)

***

## Intro

An ant colony game; army ants against fire ants.</br></br>

***

## Instructions

TBD</br></br>

***

## Endgame

Grow your colony, and eliminate your competitor.</br></br>

See in game help tutorial for a more visual description of how the game works.</br></br>

![In Game Help Screen](https://github.com/WilliamRADFunk/black-v-red/blob/master/src/assets/images/help-screen.jpg)

***

## Where It's At

Game is live and playable at [Black vs Red](https://tenacious-teal.itch.io/black-v-red)

***

## Classes

Detailed [documentation](docs/README.md)</br></br>

***

## First Steps

1. Navigate to the root folder where you want your project to reside.</br></br>

2. Run `git clone https://github.com/WilliamRADFunk/black-v-red.git`.</br></br>

3. Run `npm install`. If failure, see Common Gotchas section below.</br></br>

4. Run `npm run start` and then simply navigate to `http://localhost:8080` in your browser.</br></br>

***

## New to Gulp

-- Make sure to install Gulp at the global level, as this is a necessary step to make the boilerplate's scripts run.</br></br>

`npm install -g gulp`</br></br>

***

## Common Gotchas

--Might get a failure to fully install when running `npm install`</br></br>

Try running `npm install --ignore-scripts`</br></br>

-- Might get the error</br>
"Error: ENOENT: no such file or directory, scandir 'your-path/small-project-boilerplate\node_modules\node-sass\vendor'"</br></br>

To remedy this, simply run `npm rebuild node-sass`</br></br>

-- If you're running the `npm run readme` command, and your classes are not all present.</br></br>

Make sure you aren't importing a capitalized version of the name (ie. `import { Doug } from './Doug'` when it should in fact be `import { Doug } from './doug'`) assuming of course you've name the file with standard camelCase.
