/*!
  * Berlioz Form JS v1.0.0 (https://github.com/BerliozFramework/Form.js#readme)
  * Copyright 2018 Berlioz Form JS Authors (https://github.com/BerliozFramework/Form.js/graphs/contributors)
  * Licensed under MIT (https://github.com/BerliozFramework/Form.js/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (global = global || self, global.BerliozCollection = factory(global.jQuery));
}(this, function ($) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var BerliozCollection = function ($) {
    /**
     * Events.
     */
    var Event = {
      ADD: 'add.collection.berlioz',
      ADDED: 'added.collection.berlioz',
      DELETE: 'delete.collection.berlioz',
      DELETED: 'deleted.collection.berlioz',
      MIN: 'min.collection.berlioz',
      MAX: 'max.collection.berlioz',
      // Selectors
      CLICK_ADD: 'click.add.collection.berlioz',
      CLICK_DELETE: 'click.delete.collection.berlioz'
      /**
       * Selectors.
       */

    };
    var Selector = {
      DATA_ADD: '[data-add="collection"]',
      DATA_DELETE: '[data-delete="collection"]',
      COLLECTION: '[data-collection]',
      COLLECTION_KEY: '[data-collection-key]'
      /**
       * Collection class.
       */

    };

    var Collection =
    /*#__PURE__*/
    function () {
      function Collection(target) {
        _classCallCheck(this, Collection);

        this.target = $(target);
      }

      _createClass(Collection, [{
        key: "addElement",
        value: function addElement() {
          // Count the total element count in the collection
          var newCount = this._nbElements();

          var newElement = $('<div data-collection-key="' + newCount + '"></div>');
          var prototypeString = this.target.data('prototype').replace(/___name___/g, newCount); // Control maximum

          if (this._controlMaximum()) {
            return;
          } // ADD event


          var eventAdd = $.Event(Event.ADD);
          this.target.trigger(eventAdd);

          if (!eventAdd.isPropagationStopped()) {
            newElement.append($(prototypeString));
            var lastElement = $(Selector.COLLECTION_KEY, this.target).last();

            if (lastElement.length === 1) {
              newElement.insertAfter(lastElement);
            } else {
              this.target.prepend(newElement);
            } // ADDED event


            this.target.trigger(Event.ADDED); // Control maximum

            this._controlMaximum();
          }
        }
      }, {
        key: "deleteElement",
        value: function deleteElement(element) {
          element = $(element); // If the element doesn't have the key attribute, it may be a child element of the item, so we try to get
          // the item base element from its parents

          if (typeof element.data('collection-key') === 'undefined') {
            element = element.parents(Selector.COLLECTION_KEY);
          } // If no element found!


          if (element.length === 0) {
            return;
          } // Control minimum


          if (this._controlMinimum()) {
            return;
          } // DELETE event


          var eventDelete = $.Event(Event.DELETE);
          this.target.trigger(eventDelete);

          if (!eventDelete.isPropagationStopped()) {
            element.remove(); // Update the indexes on each element

            var collectionName = this.target.data('collection');

            var collectionNameEscaped = Collection._escapeRegExp(this.target.data('collection'));

            var collectionId = this.target.attr('id');
            $(Selector.COLLECTION_KEY, this.target).each(function (index) {
              $(this).attr('data-collection-key', index);
              $('input, select, textarea, label', this).each(function () {
                var idPattern = new RegExp(collectionId + '_\\d+');
                var namePattern = new RegExp(collectionNameEscaped + '\\[\\d+');

                if ($(this)[0].hasAttribute('for')) {
                  $(this).attr('for', $(this).attr('for').replace(idPattern, collectionId + '_' + index));
                }

                if ($(this)[0].hasAttribute('name')) {
                  $(this).attr('name', $(this).attr('name').replace(namePattern, collectionName + '[' + index));
                }

                if ($(this)[0].hasAttribute('id')) {
                  $(this).attr('id', $(this).attr('id').replace(idPattern, collectionId + '_' + index));
                }
              });
            }); // DELETED event

            this.target.trigger(Event.DELETED); // Control minimum

            this._controlMinimum();
          }
        }
      }, {
        key: "_nbElements",
        value: function _nbElements() {
          return $(Selector.COLLECTION_KEY, this.target).length;
        }
      }, {
        key: "_controlMinimum",
        value: function _controlMinimum() {
          var minElements = this.target.data('collectionMin') || 0;

          if (minElements >= this._nbElements()) {
            this.target.trigger(Event.MIN);
            return true;
          }

          return false;
        }
      }, {
        key: "_controlMaximum",
        value: function _controlMaximum() {
          var maxElements = this.target.data('collectionMax') || null;

          if (maxElements !== null && maxElements <= this._nbElements()) {
            this.target.trigger(Event.MAX);
            return true;
          }

          return false;
        }
      }], [{
        key: "_escapeRegExp",
        value: function _escapeRegExp(string) {
          return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
        }
      }, {
        key: "_jQueryInterface",
        value: function _jQueryInterface(action, arg1) {
          this.each(function () {
            var collectionObj = $(this).data('collection-object');

            if (!(_typeof(collectionObj) === 'object' && collectionObj instanceof Collection)) {
              $(this).data('collection-object', collectionObj = new Collection(this));
            }

            switch (action) {
              case 'add':
                collectionObj.addElement();
                break;

              case 'delete':
                collectionObj.deleteElement(arg1);
                break;
            }
          });
        }
      }]);

      return Collection;
    }();

    $.fn.berliozCollection = Collection._jQueryInterface;

    $.fn.berliozCollection.noConflict = function () {
      return Collection._jQueryInterface;
    }; // Events


    $(document).off(Event.CLICK_ADD, Selector.DATA_ADD).on(Event.CLICK_ADD, Selector.DATA_ADD, function (event) {
      $(event.currentTarget).parents(Selector.COLLECTION).berliozCollection('add');
    }).off(Event.CLICK_DELETE, Selector.DATA_DELETE).on(Event.CLICK_DELETE, Selector.DATA_DELETE, function (event) {
      $(event.currentTarget).parents(Selector.COLLECTION).berliozCollection('delete', $(event.currentTarget).parents(Selector.COLLECTION_KEY));
    });
  }($);

  return BerliozCollection;

}));
//# sourceMappingURL=berlioz-form-collection.js.map
