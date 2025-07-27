import {
  require_react
} from "./chunk-ER63SWST.js";
import {
  __toESM
} from "./chunk-V4OQ3NZ2.js";

// ../../node_modules/@shopify/i18next-shopify/dist/es/utils.js
var import_react = __toESM(require_react());
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
var arr = [];
var each = arr.forEach;
function defaults(obj) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  each.call(args, function(source) {
    if (source) {
      for (var prop in source) {
        if (obj[prop] === void 0) {
          obj[prop] = source[prop];
        }
      }
    }
  });
  return obj;
}
function replaceValue(interpolated, pattern, replacement) {
  var _interpolated$props;
  switch (_typeof(interpolated)) {
    case "string": {
      var split = interpolated.split(pattern);
      if (split.length !== 1 && _typeof(replacement) === "object") {
        if (!replacement.key && (0, import_react.isValidElement)(replacement)) {
          replacement = (0, import_react.cloneElement)(replacement, {
            key: pattern.toString()
          });
        }
        return [split[0], replacement, split[1]].flat();
      }
      return interpolated.replace(pattern, replacement);
    }
    case "object":
      if (Array.isArray(interpolated)) {
        return interpolated.map(function(item) {
          return replaceValue(item, pattern, replacement);
        }).flat();
      }
      if (interpolated !== null && interpolated !== void 0 && (_interpolated$props = interpolated.props) !== null && _interpolated$props !== void 0 && _interpolated$props.children) {
        var newChildren = replaceValue(interpolated.props.children, pattern, replacement);
        if (newChildren !== interpolated.props.children) {
          return _objectSpread(_objectSpread({}, interpolated), {}, {
            props: _objectSpread(_objectSpread({}, interpolated.props), {}, {
              children: newChildren
            })
          });
        }
      }
  }
  return interpolated;
}

// ../../node_modules/@shopify/i18next-shopify/dist/es/index.js
function ownKeys2(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys2(Object(t), true).forEach(function(r2) {
      _defineProperty2(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys2(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty2(e, r, t) {
  return (r = _toPropertyKey2(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = false;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _typeof2(o) {
  "@babel/helpers - typeof";
  return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof2(o);
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey2(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: false }), e;
}
function _toPropertyKey2(t) {
  var i = _toPrimitive2(t, "string");
  return "symbol" == _typeof2(i) ? i : i + "";
}
function _toPrimitive2(t, r) {
  if ("object" != _typeof2(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof2(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function getDefaults() {
  return {};
}
var MUSTACHE_FORMAT = /{{?\s*(\w+)\s*}}?/g;
var ShopifyFormat = function() {
  function ShopifyFormat2(options) {
    _classCallCheck(this, ShopifyFormat2);
    this.type = "i18nFormat";
    this.init(null, options);
  }
  return _createClass(ShopifyFormat2, [{
    key: "init",
    value: function init(i18next, options) {
      var i18nextOptions = i18next && i18next.options && i18next.options.i18nFormat || {};
      this.options = defaults(i18nextOptions, options, this.options || {}, getDefaults());
      this.i18next = i18next;
    }
    // Implement custom interpolation logic
    // While i18next and Shopify's format both use the mustache syntax for interpolation,
    // Shopify uses the `ordinal` interpolation for ordinal pluralization, while i18next uses `count`.
    // parse(res, options, lng, ns, key, info)
  }, {
    key: "parse",
    value: function parse(res, options) {
      var _this = this;
      if (res === null) {
        return res;
      }
      if (_typeof2(res) === "object") {
        var newRes = {};
        for (var _i = 0, _Object$entries = Object.entries(res); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
          newRes[key] = this.parse(value, options);
        }
        return newRes;
      }
      var matches = res.match(MUSTACHE_FORMAT);
      if (!matches) {
        return res;
      }
      var interpolated = res;
      matches.forEach(function(match) {
        var interpolation_key = match.replace(MUSTACHE_FORMAT, "$1");
        var value2 = interpolation_key === "ordinal" ? options.count || options.ordinal : options[interpolation_key];
        if ((interpolation_key === "ordinal" || interpolation_key === "count") && typeof value2 === "number") {
          value2 = new Intl.NumberFormat(_this.i18next.resolvedLanguage).format(value2);
        }
        interpolated = replaceValue(interpolated, match, value2 !== null && value2 !== void 0 ? value2 : "");
      });
      return interpolated;
    }
    // Add any other locations that should be searched first for an answer to the lookup
    // Add keys to `finalKeys` in reverse order (e.g., least specific -> most specific)
    // Useful when defining keys for pluralization or other context cases (e.g., grammatical gender)
  }, {
    key: "addLookupKeys",
    value: function addLookupKeys(finalKeys, key, code, ns, options) {
      var needsPluralHandling = Boolean(options.count !== void 0 && typeof options.count !== "string" || typeof options.ordinal === "number");
      if (needsPluralHandling) {
        if (!Intl) {
          throw new Error("Error: The application was unable to use the Intl API. This may be due to a missing or incomplete polyfill.");
        }
        var needsOrdinalHandling = Boolean(options.ordinal || options.ordinal === 0 && options.count === void 0);
        var pluralRule = this.i18next.translator.pluralResolver.getRule(code, _objectSpread2(_objectSpread2({}, options), {}, {
          ordinal: needsOrdinalHandling
        }));
        if (needsOrdinalHandling) {
          var ruleName = pluralRule.select(options.count === void 0 ? options.ordinal : options.count);
          var pluralSuffix = "".concat(this.i18next.options.keySeparator, "ordinal").concat(this.i18next.options.keySeparator).concat(ruleName);
          finalKeys.push(key + pluralSuffix);
        } else {
          var _ruleName = pluralRule.select(options.count);
          if (_ruleName !== "other") {
            var otherSubkey = "".concat(this.i18next.options.keySeparator, "other");
            finalKeys.push(key + otherSubkey);
          }
          var _pluralSuffix = "".concat(this.i18next.options.keySeparator).concat(_ruleName);
          finalKeys.push(key + _pluralSuffix);
          if (options.count === 0) {
            var explicit0Subkey = "".concat(this.i18next.options.keySeparator, "0");
            finalKeys.push(key + explicit0Subkey);
          } else if (options.count === 1) {
            var explicit1Subkey = "".concat(this.i18next.options.keySeparator, "1");
            finalKeys.push(key + explicit1Subkey);
          }
        }
      }
      return finalKeys;
    }
  }]);
}();
ShopifyFormat.type = "i18nFormat";
var es_default = ShopifyFormat;
export {
  es_default as default
};
//# sourceMappingURL=@shopify_i18next-shopify.js.map
