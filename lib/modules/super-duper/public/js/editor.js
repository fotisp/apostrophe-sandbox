
function SuperDuper(options){

  var self = this;

  if(!options.messages){
    options.messages ={};
  }

  self.type = 'superDuper'; // this needs to be the same as the type
  options.template = ".super-duper-editor"; //this needs to be the same in editor.html


  AposWidgetEditor.call(self,options);


  self.prePreview = serSuperDuper;
  self.preSave = serSuperDuper;


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
      "label": "Test Drive"
    }
  };




  self.afterCreatingEl= function(){

    var trs = self.$el.find('#available-dupers');
    var keys = Object.keys(_availableDupers);
    _.each(keys,function(duper,i){

      var checkbox = $("<input />")
        .attr("type","checkbox")
        .attr("name","ctas")
        .attr("value",cta);


      if(_.contains(self.data.ctas,duper)){
        checkbox.prop('checked', true);
      }


      trs.append(
        $("<div/>")
          .addClass("checkbox")
          .append(
          $("<label/>")
            .append(checkbox)
            .append(
              "<span>"+_availableDupers[duper].label+"</span>"
          )
        )

      );
    });

    self.$ctas = self.$el.find('input[type=checkbox]');


  };



  function serSuperDuper(callback) {


    var selectedCtas = $('input[type=checkbox]:checked').map(function(_, el) {
      return $(el).val()
    }).get();

    self.exists  = !!selectedCtas;

    if (self.exists) {
      self.data.ctas = selectedCtas;
    }

    return callback();
  }

}

SuperDuper.label = 'Super Duper';
apos.addWidgetType('superDuper','SuperDuper');
