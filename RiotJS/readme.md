# RiotJS

RiotJS is small frontend framework

## Docs

* Main site - http://riotjs.com/
* Repository - https://github.com/riot/riot
* Cheatsheet - http://martinmuzatko.github.io/riot-cheatsheet/


## Description

I'm using ES6 with babel for all files, also for gulp
(keep in mind that you need `.bablerc` in order to make ES6 work in gulp)

For creating tag components I used [`Riot.tag()`](http://riotjs.com/api/#tag) notation in order to e more
flexible with ES2015 syntax.

But you actually can mix components written in way to be compiled (`*.tag` files) and with `Riot.tag()`.

`gulpfile.babel.js` - as it build today is supporting mixin of `*.tag` and `Riot.tag()`.

## important about *.tag files

Instead of `*.tag` files, I use `*.riot` extension, case IDEA already has prebuild `*.tag`.
