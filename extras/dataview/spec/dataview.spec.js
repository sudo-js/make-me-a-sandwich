/*global spyOn*/
describe('sudo.js Dataview Object', function() {
  
  var DV = function(el, data) {
    this.construct(el, data);
  };

  DV.prototype = Object.create(sudo.DataView.prototype);

  DV.prototype.buttonClicked = function(e) {
    console.log('my button ' + e.target.className + ' wuz clicked');
  };

  var dv = new DV(null, {
    attributes: {
      id: 'spam', 
      'class': 'eggs'
    },
    renderTarget: '#testTarget',
    renderOnModelChange: true, 
    template: '' +
      '<div id="one">' +
        '<span>{{= data.sayingOne }}</span>' +
        '<button class="first">{{= data.buttonOneValue }}</button>' +
      '</div>' +
      '<div id="two">' +
        '<span>{{= data.sayingTwo }}</span>' +
        '<button class="second">{{= data.buttonTwoValue }}</button>' +
      '</div>'
  });
  
  it('has not rendered yet', function() {
    expect(document.querySelector('#testTarget').innerHTML).toBeFalsy();
  });

  dv.addedToParent();

  it('exists, but without the inner content', function() {
    expect(document.querySelector('#testTarget').innerHTML).toBeFalsy();
    expect(dv.el.innerHTML).toBeFalsy();
  });

  it('renders correctly', function() {
    dv.model.sets({
      sayingOne:"Let's not bicker and argue over who killed who.",
      buttonOneValue: "I'm not worthy",
      sayingTwo: "You were in terrible peril.",
      buttonTwoValue: "I bet you're gay"
    });
    
    expect(document.querySelector('#testTarget').innerHTML).toBeTruthy();

    expect(dv.qs('#one span').textContent).toBe("Let's not bicker and argue over who killed who.");
    expect(dv.qs('#one button').textContent).toBe("I'm not worthy");
    expect(dv.qs('#two span').textContent).toBe("You were in terrible peril.");
    expect(dv.qs('#two button').textContent).toBe("I bet you're gay");
  });

  it('deleted the renderTarget', function() {
      expect(dv.model.get('renderTarget')).toBeFalsy();
  });

  it('has not yet bound the click event', function() {
    var spy = spyOn(dv, 'buttonClicked');
    $(dv.el).find('button').trigger('click');
    expect(spy.callCount).toBe(0);	
  });

  it('has delegated the event, maintaining it even when html is refreshed', function() {
    var spy = spyOn(dv, 'buttonClicked').andCallThrough();
    // set and bind after spy declaration or jasmine won't see it
    dv.model.set('event', {
      name: 'click',
      sel: 'button',
      fn: 'buttonClicked'
    });
    dv.bindEvents();

    $(dv.el).find('button').trigger('click');
    expect(spy.callCount).toBe(2);

    dv.el.innerHTML = '';
    expect(dv.el.innerHTML).toBeFalsy();

    dv.model.sets({
      sayingOne:"You've got no arms left.",
      buttonOneValue: "Yes I have",
      sayingTwo: "Look!",
      buttonTwoValue: "It's just a flesh wound"
    });

    expect(dv.qs('#one span').textContent).toBe("You've got no arms left.");
    expect(dv.qs('#one button').textContent).toBe("Yes I have");
    expect(dv.qs('#two span').textContent).toBe("Look!");
    expect(dv.qs('#two button').textContent).toBe("It's just a flesh wound");

    $(dv.el).find('button').trigger('click');
    expect(spy.callCount).toBe(4);

    // can unbind events as well
    dv.unbindEvents();
    $(dv.el).find('button').trigger('click');
    expect(spy.callCount).toBe(4);
  });

  it('can insert and remove itself from a parent View', function() {
    var dv2 = new sudo.DataView(null, {
      attributes: {
        id: 'spam', 
        'class': 'eggs'
      },
      renderTarget: '#testTarget', 
      template: '<div id="two"></div>'
    });

    var vc = new sudo.View('#testTarget');
    vc.el.innerHTML = '';
    
    expect(document.querySelector('#testTarget').innerHTML).toBeFalsy();

    dv2.model.sets({
      renderTarget: vc.el,
      // test the auto render on added option
      renderOnAddedToParent: true
    });
    
    vc.addChild(dv2);
    expect(document.querySelector('#testTarget').innerHTML).toBeTruthy();

    dv2.removeFromParent();
    expect(document.querySelector('#testTarget').innerHTML).toBeFalsy();
  });
  
  it('does no rendering in the default state', function() {
    var dv2 = new sudo.DataView(null, {
      attributes: {
        id: 'spam', 
        'class': 'eggs'
      },
      renderTarget: '#testTarget', 
      template: '<div id="two"></div>'
    });

    var vc = new sudo.View('#testTarget');
    vc.el.innerHTML = '';
    
    expect(document.querySelector('#testTarget').innerHTML).toBeFalsy();

    dv2.model.set('renderTarget', vc.el);
    
    vc.addChild(dv2);
    
    expect(document.querySelector('#testTarget').innerHTML).toBeFalsy();

    dv2.render();
    expect(document.querySelector('#testTarget').innerHTML).toBeTruthy();
  });
  
});
