var _ = require('lodash');
var async = require('async');

module.exports = factory;

function factory(options, callback) {
  return new Construct(options, callback);
}

function Construct(options, callback) {

  var app = options.app;
  var apos = options.apos;
  var self = this;
  self._apos = apos;
  self._app = app;


  var _availableDupers=
  {
    "pageId": {
      "data": "id",
      "label": "Page ID"
    },
    "pageUrl": {
      "data": "/slug",
      "label": "Page Slug"
    },
    "pageTitle": {
      "data": "Super Duper Title",
      "label": "Test Drive",
    }
  };


  self._apos.mixinModuleAssets(self, 'superDuper', __dirname, options);
  self.pushAsset('template', 'superDuperEditor', { when: 'user'});
  self.pushAsset('script', 'editor', { when: 'user' });
  self.pushAsset('stylesheet', 'content', { when: 'always' });



  self.widget = true;
  self.label = options.label || 'CTA';
  self.css = options.css || 'super-dupers';
  self.icon = options.icon || 'icon-super-dupers';




  self.renderWidget = function(data) {
    return self.render('superDuper', data);
  };



  self.load = function(req, item, callback) {


    console.log("Widget =>  self.load called");
    console.log("Widget ==>  req.url=",req.url);


    item._dupers =[];
    /**
     * We don't have the page here,
     *
     * This is a dirty dirty hack with the url of the page,
     * which most definately will break, but lets hope
     * it doesn't
     *
     */

    console.log("SuperDuper boot",item.ctas);
    async.eachSeries(item.ctas,function(cta,done){


      var _duper = _availableDupers[cta];

      if(!_duper){
        console.log("Duper not found for ",cta);
        return done();

      }


      apos.getPage(req,req.url,{},function(err,page){

        if(err || !page){
          return done(err);
        }


        if(cta === 'pageId') {
          _duper.data = page._id;
        }


        if(cta === 'pageUrl') {
          _duper.data = page.slug;
        }

        if(cta === 'pageTitle'){
          _duper.data = page.title;
        }


        item._dupers.push(_duper);
        return done();

      });


    },function(err){

      console.log(req.url,"=>",item._dupers);
      return setImmediate(callback);
    });



  };



  apos.addWidgetType('superDuper', self);

  ///** I took this from his source code */
  return setImmediate(function() { return callback(null); });

}

// Export the constructor so others can subclass
factory.Construct = Construct;