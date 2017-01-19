module.exports = function()
{
  $('body').on('click', '.btn-clear, .geodash-clear', function(event) {
    // "this" doesn't always point to what you think it does,
    // that's why need to use event.currentTarget

    var input_id = $(event.currentTarget).attr('data-target-input-id');
    if(angular.isString(input_id))
    {
      try{ $("#"+input_id).typeahead('close'); }catch(err){};
      geodash.ui.saveToInput(event.currentTarget, null);
    }

    geodash.ui.clearFromScope(event.currentTarget);
    geodash.ui.changeTab(event.currentTarget, null);
  });

  $('body').on('click', '.btn-off', function(event) {
    var input_id = $(event.currentTarget).attr('data-target-input-id');
    var input = $("#"+input_id);
    input.val("false");
    input.trigger('input');
    input.change();
  });
  $('body').on('click', '.btn-on', function(event) {
    var input_id = $(event.currentTarget).attr('data-target-input-id');
    var input = $("#"+input_id);
    input.val("true");
    input.trigger('input');
    input.change();
  });

  $('body').on('click', '.geodash-intent', function(event) {
    event.preventDefault();  // For anchor tags
    var that = $(this);
    //var scope = angular.element('[ng-controller='+that.data('intent-ctrl')+']').scope();
    var scope = geodash.util.getScope(that.attr('data-intent-ctrl'));
    var intents = [];
    if(that.hasClass('geodash-toggle'))
    {
      var intentData = JSON.parse(that.attr('data-intent-data')); // b/c jquery data not updated by angular
      if(that.hasClass('geodash-off'))
      {
        that.removeClass('geodash-off');
        geodash.api.intend(that.attr('data-intent-names')[0], intentData, scope);
      }
      else
      {
        that.addClass('geodash-off');
        geodash.api.intend(that.attr('data-intent-names')[1], intentData, scope);
      }
    }
    else if(that.hasClass('geodash-radio'))
    {
      var siblings = that.parents('.geodash-radio-group:first').find(".geodash-radio").not(that);
      if(!(that.hasClass('geodash-on')))
      {
        that.addClass('geodash-on');
        if(that.data("intent-class-on"))
        {
          that.addClass(that.data("intent-class-on"));
          siblings.removeClass(that.data("intent-class-on"));
        }
        siblings.removeClass('geodash-on');
        if(that.data("intent-class-off"))
        {
          that.removeClass(that.data("intent-class-off"));
          siblings.addClass(that.data("intent-class-off"));
        }

        if(geodash.util.isDefined(that.attr('data-intents')) && Array.isArray(JSON.parse(that.attr('data-intents'))))
        {
          intents = intents.concat(JSON.parse(that.attr('data-intents')));
        }
        else
        {
          var intentName = that.attr('data-intent-name');
          if(geodash.util.isDefined(intentName))
          {
            var intentData = that.attr('data-intent-data');
            if(geodash.util.isDefined(intentData))
            {
              intentData = JSON.parse(intentData);
              angular.extend(intentData, {'element': this});
              intents.push({"name": intentName, "data": intentData});
            }
          }
        }
        
      }
    }
    else
    {
      if(geodash.util.isDefined(that.attr('data-intents')) && Array.isArray(JSON.parse(that.attr('data-intents'))))
      {
        intents = intents.concat(JSON.parse(that.attr('data-intents')));
      }
      else
      {
        var intentName = that.attr('data-intent-name');
        if(geodash.util.isDefined(intentName))
        {
          var intentData = that.attr('data-intent-data');
          if(geodash.util.isDefined(intentData))
          {
            intentData = JSON.parse(intentData);
            angular.extend(intentData, {'element': this});
            intents.push({"name": intentName, "data": intentData});
          }
        }
      }
    }

    for(var i = 0; i < intents.length; i++)
    {
      geodash.api.intend(intents[i].name, intents[i].data, scope);
    }
  });
};
