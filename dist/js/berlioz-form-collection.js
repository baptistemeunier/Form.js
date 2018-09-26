/*!
  * Berlioz Form JS v1.0.0 (https://github.com/BerliozFramework/Form.js#readme)
  * Copyright 2018 Berlioz Form JS Authors (https://github.com/BerliozFramework/Form.js/graphs/contributors)
  * Licensed under MIT (https://github.com/BerliozFramework/Form.js/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (global.BerliozCollection = factory(global.jQuery));
}(this, (function ($) { 'use strict';

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

  var BerliozCollection = function ($$$1) {
    var Collection =
    /*#__PURE__*/
    function () {
      function Collection(target) {
        _classCallCheck(this, Collection);

        this.target = $$$1(target);
      }

      _createClass(Collection, [{
        key: "addElement",
        value: function addElement() {
          // Count the total element count in the collection
          var newCount = this.target.find('[data-collection-key]').length;
          var newElement = $$$1('<div data-collection-key="' + newCount + '"></div>');
          var prototypeString = this.target.data('prototype').replace(/___name___/g, newCount);
          newElement.append($$$1(prototypeString));
          this.target.append(newElement);
        }
      }, {
        key: "deleteElement",
        value: function deleteElement(element) {
          element = $$$1(element); // If the element doesn't have the key attribute, it may be a child element of the item, so we try to get
          // the item base element from its parents

          if (!element.data('collection-key')) {
            element = element.parents('[data-collection-key]');
          }

          var collection = $$$1(element.parents('[data-collection]'));
          element.remove(); // Update the indexes on each element

          var collectionName = collection.data('collection');
          var collectionNameEscaped = this.escapeRegExp(collection.data('collection'));
          var collectionId = collection.attr('id');
          $$$1('[data-collection-key]', collection).each(function (index) {
            $$$1(this).attr('data-collection-key', index);
            $$$1('input, select, textarea, label', this).each(function () {
              var idPattern = new RegExp(collectionId + '_\\d+');
              var namePattern = new RegExp(collectionNameEscaped + '\\[\\d+');

              if ($$$1(this)[0].hasAttribute('for')) {
                $$$1(this).attr('for', $$$1(this).attr('for').replace(idPattern, collectionId + '_' + index));
              }

              if ($$$1(this)[0].hasAttribute('name')) {
                $$$1(this).attr('name', $$$1(this).attr('name').replace(namePattern, collectionName + '[' + index));
              }

              if ($$$1(this)[0].hasAttribute('id')) {
                $$$1(this).attr('id', $$$1(this).attr('id').replace(idPattern, collectionId + '_' + index));
              }
            });
          });
        }
      }, {
        key: "escapeRegExp",
        value: function escapeRegExp(string) {
          return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
        }
      }], [{
        key: "_jQueryInterface",
        value: function _jQueryInterface(action, arg1) {
          this.each(function () {
            if (!(_typeof($$$1(this).data('collection-object')) === 'object' && $$$1(this).data('collection-object') instanceof Collection)) {
              $$$1(this).data('collection-object', new Collection(this));
            }

            switch (action) {
              case 'add':
                $$$1(this).data('collection-object').addElement();
                break;

              case 'delete':
                $$$1(this).data('collection-object').deleteElement(arg1);
                break;
            }
          });
        }
      }]);

      return Collection;
    }();

    $$$1.fn.berliozCollection = Collection._jQueryInterface;

    $$$1.fn.berliozCollection.noConflict = function () {
      return Collection._jQueryInterface;
    };
  }($);

  return BerliozCollection;

})));
//# sourceMappingURL=berlioz-form-collection.js.map
