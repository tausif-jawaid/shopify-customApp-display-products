import "./chunk-V4OQ3NZ2.js";

// ../../node_modules/@formatjs/intl-localematcher/lib/abstract/CanonicalizeLocaleList.js
function CanonicalizeLocaleList(locales) {
  return Intl.getCanonicalLocales(locales);
}

// ../../node_modules/@formatjs/intl-localematcher/lib/abstract/utils.js
var UNICODE_EXTENSION_SEQUENCE_REGEX = /-u(?:-[0-9a-z]{2,8})+/gi;
function invariant(condition, message, Err) {
  if (Err === void 0) {
    Err = Error;
  }
  if (!condition) {
    throw new Err(message);
  }
}

// ../../node_modules/@formatjs/intl-localematcher/lib/abstract/BestAvailableLocale.js
function BestAvailableLocale(availableLocales, locale) {
  var candidate = locale;
  while (true) {
    if (availableLocales.has(candidate)) {
      return candidate;
    }
    var pos = candidate.lastIndexOf("-");
    if (!~pos) {
      return void 0;
    }
    if (pos >= 2 && candidate[pos - 2] === "-") {
      pos -= 2;
    }
    candidate = candidate.slice(0, pos);
  }
}

// ../../node_modules/@formatjs/intl-localematcher/lib/abstract/LookupMatcher.js
function LookupMatcher(availableLocales, requestedLocales, getDefaultLocale) {
  var result = { locale: "" };
  for (var _i = 0, requestedLocales_1 = requestedLocales; _i < requestedLocales_1.length; _i++) {
    var locale = requestedLocales_1[_i];
    var noExtensionLocale = locale.replace(UNICODE_EXTENSION_SEQUENCE_REGEX, "");
    var availableLocale = BestAvailableLocale(availableLocales, noExtensionLocale);
    if (availableLocale) {
      result.locale = availableLocale;
      if (locale !== noExtensionLocale) {
        result.extension = locale.slice(noExtensionLocale.length, locale.length);
      }
      return result;
    }
  }
  result.locale = getDefaultLocale();
  return result;
}

// ../../node_modules/@formatjs/intl-localematcher/lib/abstract/BestFitMatcher.js
function BestFitMatcher(availableLocales, requestedLocales, getDefaultLocale) {
  var minimizedAvailableLocaleMap = {};
  var availableLocaleMap = {};
  var canonicalizedLocaleMap = {};
  var minimizedAvailableLocales = /* @__PURE__ */ new Set();
  availableLocales.forEach(function(locale2) {
    var minimizedLocale = new Intl.Locale(locale2).minimize().toString();
    var canonicalizedLocale = Intl.getCanonicalLocales(locale2)[0] || locale2;
    minimizedAvailableLocaleMap[minimizedLocale] = locale2;
    availableLocaleMap[locale2] = locale2;
    canonicalizedLocaleMap[canonicalizedLocale] = locale2;
    minimizedAvailableLocales.add(minimizedLocale);
    minimizedAvailableLocales.add(locale2);
    minimizedAvailableLocales.add(canonicalizedLocale);
  });
  var foundLocale;
  var extension;
  for (var _i = 0, requestedLocales_1 = requestedLocales; _i < requestedLocales_1.length; _i++) {
    var l = requestedLocales_1[_i];
    if (foundLocale) {
      break;
    }
    var noExtensionLocale = l.replace(UNICODE_EXTENSION_SEQUENCE_REGEX, "");
    if (l !== noExtensionLocale) {
      extension = l.slice(noExtensionLocale.length, l.length);
    }
    if (availableLocales.has(noExtensionLocale)) {
      foundLocale = noExtensionLocale;
      break;
    }
    if (minimizedAvailableLocales.has(noExtensionLocale)) {
      foundLocale = noExtensionLocale;
      break;
    }
    var locale = new Intl.Locale(noExtensionLocale);
    var maximizedRequestedLocale = locale.maximize().toString();
    var minimizedRequestedLocale = locale.minimize().toString();
    if (minimizedAvailableLocales.has(minimizedRequestedLocale)) {
      foundLocale = minimizedRequestedLocale;
      break;
    }
    foundLocale = BestAvailableLocale(minimizedAvailableLocales, maximizedRequestedLocale);
  }
  if (!foundLocale) {
    return { locale: getDefaultLocale() };
  }
  return {
    locale: availableLocaleMap[foundLocale] || canonicalizedLocaleMap[foundLocale] || minimizedAvailableLocaleMap[foundLocale] || foundLocale,
    extension
  };
}

// ../../node_modules/@formatjs/intl-localematcher/lib/abstract/UnicodeExtensionValue.js
function UnicodeExtensionValue(extension, key) {
  invariant(key.length === 2, "key must have 2 elements");
  var size = extension.length;
  var searchValue = "-".concat(key, "-");
  var pos = extension.indexOf(searchValue);
  if (pos !== -1) {
    var start = pos + 4;
    var end = start;
    var k = start;
    var done = false;
    while (!done) {
      var e = extension.indexOf("-", k);
      var len = void 0;
      if (e === -1) {
        len = size - k;
      } else {
        len = e - k;
      }
      if (len === 2) {
        done = true;
      } else if (e === -1) {
        end = size;
        done = true;
      } else {
        end = e;
        k = e + 1;
      }
    }
    return extension.slice(start, end);
  }
  searchValue = "-".concat(key);
  pos = extension.indexOf(searchValue);
  if (pos !== -1 && pos + 3 === size) {
    return "";
  }
  return void 0;
}

// ../../node_modules/@formatjs/intl-localematcher/lib/abstract/ResolveLocale.js
function ResolveLocale(availableLocales, requestedLocales, options, relevantExtensionKeys, localeData, getDefaultLocale) {
  var matcher = options.localeMatcher;
  var r;
  if (matcher === "lookup") {
    r = LookupMatcher(availableLocales, requestedLocales, getDefaultLocale);
  } else {
    r = BestFitMatcher(availableLocales, requestedLocales, getDefaultLocale);
  }
  var foundLocale = r.locale;
  var result = { locale: "", dataLocale: foundLocale };
  var supportedExtension = "-u";
  for (var _i = 0, relevantExtensionKeys_1 = relevantExtensionKeys; _i < relevantExtensionKeys_1.length; _i++) {
    var key = relevantExtensionKeys_1[_i];
    invariant(foundLocale in localeData, "Missing locale data for ".concat(foundLocale));
    var foundLocaleData = localeData[foundLocale];
    invariant(typeof foundLocaleData === "object" && foundLocaleData !== null, "locale data ".concat(key, " must be an object"));
    var keyLocaleData = foundLocaleData[key];
    invariant(Array.isArray(keyLocaleData), "keyLocaleData for ".concat(key, " must be an array"));
    var value = keyLocaleData[0];
    invariant(typeof value === "string" || value === null, "value must be string or null but got ".concat(typeof value, " in key ").concat(key));
    var supportedExtensionAddition = "";
    if (r.extension) {
      var requestedValue = UnicodeExtensionValue(r.extension, key);
      if (requestedValue !== void 0) {
        if (requestedValue !== "") {
          if (~keyLocaleData.indexOf(requestedValue)) {
            value = requestedValue;
            supportedExtensionAddition = "-".concat(key, "-").concat(value);
          }
        } else if (~requestedValue.indexOf("true")) {
          value = "true";
          supportedExtensionAddition = "-".concat(key);
        }
      }
    }
    if (key in options) {
      var optionsValue = options[key];
      invariant(typeof optionsValue === "string" || typeof optionsValue === "undefined" || optionsValue === null, "optionsValue must be String, Undefined or Null");
      if (~keyLocaleData.indexOf(optionsValue)) {
        if (optionsValue !== value) {
          value = optionsValue;
          supportedExtensionAddition = "";
        }
      }
    }
    result[key] = value;
    supportedExtension += supportedExtensionAddition;
  }
  if (supportedExtension.length > 2) {
    var privateIndex = foundLocale.indexOf("-x-");
    if (privateIndex === -1) {
      foundLocale = foundLocale + supportedExtension;
    } else {
      var preExtension = foundLocale.slice(0, privateIndex);
      var postExtension = foundLocale.slice(privateIndex, foundLocale.length);
      foundLocale = preExtension + supportedExtension + postExtension;
    }
    foundLocale = Intl.getCanonicalLocales(foundLocale)[0];
  }
  result.locale = foundLocale;
  return result;
}

// ../../node_modules/@formatjs/intl-localematcher/lib/abstract/LookupSupportedLocales.js
function LookupSupportedLocales(availableLocales, requestedLocales) {
  var subset = [];
  for (var _i = 0, requestedLocales_1 = requestedLocales; _i < requestedLocales_1.length; _i++) {
    var locale = requestedLocales_1[_i];
    var noExtensionLocale = locale.replace(UNICODE_EXTENSION_SEQUENCE_REGEX, "");
    var availableLocale = BestAvailableLocale(availableLocales, noExtensionLocale);
    if (availableLocale) {
      subset.push(availableLocale);
    }
  }
  return subset;
}

// ../../node_modules/@formatjs/intl-localematcher/lib/index.js
function match(requestedLocales, availableLocales, defaultLocale, opts) {
  var locales = availableLocales.reduce(function(all, l) {
    all.add(l);
    return all;
  }, /* @__PURE__ */ new Set());
  return ResolveLocale(locales, CanonicalizeLocaleList(requestedLocales), {
    localeMatcher: (opts === null || opts === void 0 ? void 0 : opts.algorithm) || "best fit"
  }, [], {}, function() {
    return defaultLocale;
  }).locale;
}
export {
  LookupSupportedLocales,
  ResolveLocale,
  match
};
//# sourceMappingURL=@formatjs_intl-localematcher.js.map
