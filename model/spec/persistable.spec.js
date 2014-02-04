describe('Sudo Model persistance', function() {

  sudo.getXhr = function(params) {
    // by this point all the data has been stringified
    //if(opts.data && (typeof opts.data === 'string')) opts.data = JSON.parse(opts.data);
    var _xhr = {
      send: function(data) {
        // the data has been stringified by this point
        var parsed = data ? (typeof data === 'string' ? JSON.parse(data) : data) : {};
        
        switch(this.verb) {
          case 'POST':
            parsed.id = 42;
            parsed.message = 'POST to ' + this.url;
            this.status = 200;
            this.responseText = JSON.stringify(parsed);
            this.onload(this);
            break;
          case 'PUT':
            parsed.message = 'PUT to ' + this.url;
            this.status = 200;
            this.responseText = JSON.stringify(parsed);
            this.onload(this);
            break;
          case 'PATCH':
            parsed.message = 'PATCH to ' + this.url;
            this.status = 200;
            this.responseText = JSON.stringify(parsed);
            this.onload(this);
            break;
          case 'GET':
            parsed.message = 'GET to ' + this.url;
            this.status = 200;
            parsed.isKing = true;
            this.responseText = JSON.stringify(parsed);
            this.onload(this);
            break;
          case 'DELETE':
            this.status = 200;
            this.statusText = this.status + ' OK';
            this.onload(this);
            break;
          default:
            // code
          break;
        }
      },
      setRequestHeader: sudo.noop,
      onloadend: params.onloadend,
      onerror: params.onerror,
      onload: params.onload,
      responseType: params.responseType,
      url: params.url,
      verb: params.verb
    };    
    return _xhr;
  };

  beforeEach(function() {
    model = new _.Model({
      ajax: {baseUrl: '/camelot'},
      name: 'Arthur',
      occupation: 'King of the Brittons'
    });

    $.extend(model, _.extensions.persistable);
  });

  it('Uses POST for create', function() {
    model.set('onQuest', true).create();
    expect(model.gets(['id', 'message'])).toEqual({
      id: 42, 
      message:'POST to /camelot'
    });
  });

  it('Will POST the passed in data vs the model itself', function() {
    model.set('onQuest', true).create({
      data: model.data,
      onload: function(xhr) {
        this.sets({
          ajaxStatus: xhr.status,
          json: xhr.responseText
        });
      }.bind(model)
    });
      
    expect(typeof (model.get('json'))).toBe('string');
    expect(model.get('ajaxStatus')).toBe(200);
  });

  it('Uses PUT for update by default, and adjusts the url', function() {
    model.sets({id: 43, squire: 'Patsy'}).update();
    expect(model.get('message')).toBe('PUT to /camelot/43');
  });

  it('Uses PATCH for update if set, and adjusts the url', function() {
    model.sets({'ajax.patch': true, id: 44, squire: 'Patsy'}).update();
    expect(model.get('message')).toBe('PATCH to /camelot/44');
  });

  it('Uses PATCH for update if passed, and adjusts the url', function() {
    model.sets({id: 45, squire: 'Patsy'}).update({patch:true});
    expect(model.get('message')).toBe('PATCH to /camelot/45');
  });

  it('Uses POST for a "new" model when "saved"', function() {
    // should behave as a `new` model (there is no `id` yet)
    model.save();
    expect(model.gets(['id', 'message'])).toEqual({
      id: 42, 
      message:'POST to /camelot'
    });
  });

  it('Uses PUT for a "persisted" model when "saved"', function() {
    // should behave as a `new` model (there is no `id` yet)
    model.set('id', 47).save();
    expect(model.get('message')).toBe('PUT to /camelot/47');
  });

  it('Uses PATCH for a "persisted" model when "saved" if patch set', function() {
    // should behave as a `new` model (there is no `id` yet)
    model.sets({id: 48, 'ajax.patch': true}).save();
    expect(model.get('message')).toBe('PATCH to /camelot/48');
  });

  it('Uses GET for read', function() {
    model.set('id', 46).read();
    expect(model.gets(['isKing', 'message'])).toEqual({
      isKing: true,
      message: 'GET to /camelot/46'
    });
  });

  it('Uses DELETE for destroy', function() {
    model.set('id', 47).destroy();
    expect(model.get('ajaxStatusText')).toBe('200 OK');
  });

  it('Removes the items in the serverDataBlacklist', function() {
    // now just return what showed up
    
    model.sets({
      template: '<section></section>',
      renderTarget: '#camelot',
      renderMethod: 'spanking'
    });
    
    var res = model._prepareData_(model.data);
    
    expect(('name' in res)).toBe(true);    
    expect(('occupation' in res)).toBe(true);
    expect(('ajax' in res)).toBe(false);
    expect(('renderTarget' in res)).toBe(false);
    expect(('renderMethod' in res)).toBe(false);
    expect(('template' in res)).toBe(false);
  });
});