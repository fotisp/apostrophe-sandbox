var _ = require('lodash');
var async = require('async');

module.exports = factory;

function factory(options, callback) {
  return new Construct(options, callback);
}

function Construct(options, callback) {

  var self = this;
  var _apos = options.apos;

  self.setBridge = function(bridge) {
    // We want to invoke methods of the blog module;
    // grab a reference to it
    self._brands= bridge['brands'];

  };

 self.loader=function(req,callback){

    if(!req.page || !req.page.type==='brands'){
      return callback();
    }

    self._brands.get(req, {}, {areas:true}, function (err, results) {

      if(err || results.total <=0){
        return callback();
      }


      var _brands = [];
      _.each(results.snippets,function(brand){
        if(brand.brochure){

          console.log("See it doesn't exist ==> ",brand.brochure.items[0]._items);
        }
        var _file = _apos.areaFile(brand,"brochure");
        if(_file){


          brand._pdf = _apos.filePath(_file,{uploadfsPath:true});
          _brands.push(brand);
        }

      });

      req.extras._brands = _brands;

      return callback();
    })

  };


  // Invoke the callback. This must happen on next tick or later!
  if (callback) {
    return process.nextTick(function() {
      return callback(null);
    });
  }
}

// Export the constructor so others can subclass
factory.Construct = Construct;