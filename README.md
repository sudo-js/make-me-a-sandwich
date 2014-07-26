# sudo.js

######Annotated Source 
[Here](http://sudo-js.github.io/make-me-a-sandwich/)

## Overview

A Small object-oriented library made to aide you in your quest for Javascript
awesomeness by assisting with such things as implementing inheritance patterns, 
handling data-mutation observation, establishing hierarchies of objects which 
resemble the DOM they control (thus able to utilize a chain-of-responsibility), 
and the making of sandwiches.

## Documentaion

- Specific `module` documentation and examples moved to [the wiki](https://github.com/sudo-js/make-me-a-sandwich/wiki/_pages).
- See the Docco annotated source code located in the docs directory.

## API Reference

### Methods Exposed by Module and Their Corresponding Wiki Page

#### [Base](https://github.com/sudo-js/make-me-a-sandwich/wiki/base)

+ addDelegate(object)
+ getDelegate(role)
+ removeDelegate(role)
+ delegate(role, method)
+ construct([el][, data])
+ base(methodName[, args...])

####[Model](https://github.com/sudo-js/make-me-a-sandwich/wiki/model)

+ set(key, value)
+ setPath(path, value)
+ sets(object)
+ get(key)
+ getPath(path)
+ gets(array)
+ unset(key)
+ unsetPath(path)
+ unsets(array)

#### [Container](https://github.com/sudo-js/make-me-a-sandwich/wiki/container)

+ addChild(child, name)
+ getChild(_argument_)
+ removeChild(_argument_)
+ bubble()
+ removedFromParent()
+ send(_arguments_)

#### [View](https://github.com/sudo-js/make-me-a-sandwich/wiki/view)

+ setEl(_argument_)
+ qs(selector)
+ qsa(selector)

#### [observable extension](https://github.com/sudo-js/make-me-a-sandwich/wiki/observable-extension)

+ observe(fn)
+ observes(array)
+ unobserve(fn)
+ unobserves(ary)
+ deliverChangeReords

### Modules Residing in 'Extras'

####[Change Delegate](https://github.com/sudo-js/make-me-a-sandwich/wiki/change-delegate)

+ filter

####[Data Delegate](https://github.com/sudo-js/make-me-a-sandwich/wiki/data-delegate)

+ filter

#### [listener extension](https://github.com/sudo-js/make-me-a-sandwich/wiki/listener-extension)

+ bindEvents
+ unbindEvents

#### [persistable extension](https://github.com/sudo-js/make-me-a-sandwich/wiki/persistable-extension)

+ create([options])
+ read([options])
+ update([options])
+ destroy([options])
+ save([options])

#### [template](https://github.com/sudo-js/make-me-a-sandwich/wiki/template)

+ template(string, data, scope)

#####and more...

## Test Suite

The `specRunner.html` file in `root` runs each individual module's specs. Load it as a file in your browser of
choice or, if you have Node.js installed you can `npm install http-server` then execute `http-server` from the project root which will
serve the spec runner at `localhost:8080/specRunner.html`. This is useful, for me at least, for x-platform
testing as I can just point virtual machines at the host.

When making a custom build, just uncomment the spec(s) that apply to the module you are adding, or, 
if you are making a new module don't forget to write the specs or we will frown at you...

## Node.js Module

A simplified version of `sudo.js` is available for Node:
    
    npm install sudoclass

It provides `sudo.js` style inheritance, key-value coding (the `sudo.js Base Object`), delegation, and data-mutation-observation via
the `Observable` extension. The `sudo.js` build tool is built with this.

## Build Tool

The latest concatonated (but unminified) version of `sudo.js` is always
located in `build/debug`. If you are making changes, adding new modules, or creating a custom build and need the `debug/`
files to be rebuilt run:

    node build sudo

This puts together the `build/debug/sudo.js` file. You can make a custom build file of your own by putting an `html` file into root, listing
whichever modules you want then running `node build <filename>`. Note, the `.html` extension is not passed.

You will need `Node.js` installed as well as the `sudoclass` module mentioned above along with the `jsdom` and `walk` modules (both available via npm).

### Extras

The debug version, `build/debug/sudo.js`, contains the Base, Container, Model, View and Observable 'modules'. Others are located, appropriately enough, 
in the `extras` dir (such as a `Navigator` for push-state/hash-change observation, 
and `template` for string-style templating). Others may come in the future, they may
come from you.
