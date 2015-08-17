# sudo.js

###### Annotated Source
[Here](http://sudo-js.github.io/make-me-a-sandwich/)

## Overview

A Small object-oriented library to aid you in your quest for Javascript
awesomeness by establishing hierarchies of objects which are able to utilize
a chain-of-responsibility.

...and the making of sandwiches.

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

#### [Store](https://github.com/sudo-js/make-me-a-sandwich/wiki/store)

+ setPath(path, value)
+ sets(object)
+ getPath(path)
+ gets(array)
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

+ mergeState
+ resetState

### Modules Residing in 'Extras'

#### [Change Delegate](https://github.com/sudo-js/make-me-a-sandwich/wiki/change-delegate)

+ filter

#### [Data Delegate](https://github.com/sudo-js/make-me-a-sandwich/wiki/data-delegate)

+ filter

#### [listener extension](https://github.com/sudo-js/make-me-a-sandwich/wiki/listener-extension)

+ bindEvents
+ unbindEvents

##### and more...

## Test Suite

`npm test` to run them all. You can also run each individually with
`gulp jasmine --spec path/to/spec/file.js`

###### more soon...
