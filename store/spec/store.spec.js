require('babel/register');
var Store = require('../store');

describe('Sudo Store Object', function() {

  var a = new Store({arrowToThe: 'knee'});
  var b = new Store;

  it('is an instance of the Model class', function() {
    expect(b instanceof Store).toBe(true);
  });

  it('should correctly use paths', function() {
    a.setPath('Skyrim.Whiterun.Companions', 'Jarrvaskr');
    expect(a.getPath('Skyrim.Whiterun.Companions')).toEqual('Jarrvaskr');
  });

  it('should correctly use existing path parts', function() {
    a.setPath('Skyrim.Whiterun.Palace', 'Dragonsreach');
    expect(a.getPath('Skyrim.Whiterun.Palace')).toEqual('Dragonsreach');
  });

  it('can set multiple keys and values via an object literal', function() {
    a.sets({
      Winterhold: 'magesCollege',
      Solitude: 'bluePalace',
      'Falkreath.tourism': 'cemetery'
    });
    expect(a.getPath('Falkreath.tourism')).toEqual('cemetery');
  });

  it('can fetch mutliple values for an array of keys', function() {
    expect(a.gets(['Winterhold','Falkreath.tourism'])).toEqual({
      Winterhold: 'magesCollege',
      'Falkreath.tourism': 'cemetery'
    });
  });
});
