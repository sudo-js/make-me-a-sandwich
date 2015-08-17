// class fixture used in the send spec. needs to be loaded via require
// so that babel can process it
var Container = require('../container');

class Child extends Container {
  constructor(name) {
    super();
    this.name = name;
  }
}

class Parent extends Child {
  constructor(name) {
    super(name);
    this.fooRecieved = {};
  }
  // sendTarget
  foo(data) {
    this.fooRecieved[data.from] = { key: data.key, value: data.value };
  }
}

class Grandparent extends Parent {
  constructor(name) {
    super(name);
    this.barRecieved = {};
  }
  // sendTarget
  bar(data) {
    this.barRecieved[data.from] = { key: data.key, value: data.value };
  }
}

module.exports.Child = Child;
module.exports.Parent = Parent;
module.exports.Grandparent = Grandparent;
