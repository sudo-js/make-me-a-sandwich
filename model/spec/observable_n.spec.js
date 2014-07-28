describe('Sudo Observable Model', function() {
  beforeEach(function() {
    model = $.extend(new _.Model(), _.extensions.observable);
    cb = jasmine.createSpy();
  });

  it('calls the cb with correct args when new', function() {
      model.observe(cb);
      model.set('Arthur', 'King of the Britians');
      
      waitsFor(function() {
        return cb.callCount === 1;
      }, 'change records to be delivered', 3000);
      
      runs(function() {
        expect(cb.mostRecentCall.args[0][0].type).toBe('add');
        expect(model.get('Arthur')).toBe('King of the Britians');
      });
  });

  it('calls the cb with correct args when updating', function() {
      model.set('Arthur', 'King of the Britians');
      model.observe(cb);
      model.set('Arthur', 'On a quest...');
      
      waitsFor(function() {
        return cb.callCount === 1;
      }, 'change records to be delivered', 3000);
      
      runs(function() {
        expect(cb.mostRecentCall.args[0][0].type).toBe('update');
        expect(cb.mostRecentCall.args[0][0].name).toBe('Arthur');
        expect(cb.mostRecentCall.args[0][0].oldValue).toBe('King of the Britians');
        expect(model.get('Arthur')).toBe('On a quest...');
      });
  });

  it('calls the cb with correct args when deleting', function() {
      model.set('Arthur', 'Must be a king');
      model.observe(cb);
      model.unset('Arthur');
      
      waitsFor(function() {
        return cb.callCount === 1;
      }, 'change records to be delivered', 3000);
      
      runs(function() {
        expect(cb.mostRecentCall.args[0][0].type).toBe('delete');
        expect(cb.mostRecentCall.args[0][0].name).toBe('Arthur');
        expect(cb.mostRecentCall.args[0][0].oldValue).toBe('Must be a king');
        expect(model.get('Arthur')).toBeFalsy();
      });
  });

  it('can be unobserved', function() {
    model.observe(cb);
    model.unobserve(cb);
    model.set('Arthur', "Because he's the only one...");
    
    waits(250);
    
    runs(function() {
      expect(cb).not.toHaveBeenCalled();
      expect(model.get('Arthur')).toBe("Because he's the only one...");
    });
  });
  
  it('delivers changeRecords after setting multiple items via sets', function() {
      model.observe(cb);
      model.sets({Lancelot: 'The brave', Bedemir: 'The wise', Galahad: 'The pure'});
      
      waitsFor(function() {
        return cb.callCount === 1;
      }, 'change records to be delivered', 3000);
      
      runs(function() {
        // even tho there is 1 call, there should be 3 changerecords
        expect(cb.mostRecentCall.args[0].length).toBe(3);
      });
      
  });

  // it('calls the cb with correct args when new path', function() {
  //     var cb = model.observe(jasmine.createSpy());
  //     model.setPath('montyPython.holyGrail.Arthur', 'King of the Britians');
  //     expect(cb).toHaveBeenCalledWith({name: 'montyPython.holyGrail.Arthur', object: model.data, type: 'new'});
  //     expect(model.getPath('montyPython.holyGrail.Arthur')).toBe('King of the Britians');
  // });
  //
  //   it('calls the cb with correct args when updating path', function() {
  //   var cb = jasmine.createSpy();
  //   model.setPath('montyPython.holyGrail.Arthur', 'King of the Britians');
  //   model.observe(cb);
  //   model.setPath('montyPython.holyGrail.Arthur', 'On a quest...');
  //   expect(cb).toHaveBeenCalledWith({name: 'montyPython.holyGrail.Arthur', object: model.data, oldValue: 'King of the Britians', type: 'updated'});
  //   expect(model.getPath('montyPython.holyGrail.Arthur')).toBe('On a quest...');
  // });
  //
  // it('calls the cb with correct args when deleting a path', function() {
  //   var cb = jasmine.createSpy();
  //   model.setPath('montyPython.holyGrail.Arthur', 'Must be a king');
  //   model.observe(cb);
  //   model.unsetPath('montyPython.holyGrail.Arthur');
  //   expect(cb).toHaveBeenCalledWith({name: 'montyPython.holyGrail.Arthur', object: model.data, type: 'deleted'});
  //   expect(model.getPath('montyPython.holyGrail.Arthur')).toBeFalsy();
  // });
  //
  //   it('can be unobserved path', function() {
  //   var cb = model.observe(jasmine.createSpy());
  //   model.setPath('montyPython.holyGrail.Patsy', 'dead');
  //   expect(cb).toHaveBeenCalledWith({name: 'montyPython.holyGrail.Patsy', object: model.data, type: 'new'});
  //   expect(cb.callCount).toBe(1);
  //   model.unobserve(cb).setPath('montyPython.holyGrail.Patsy', 'gravely injured');
  //   expect(cb.callCount).toBe(1);
  // });

});
