import {
  init_lib,
  lib_exports
} from "./chunk-NNM2Z5PN.js";
import "./chunk-G7U7252R.js";
import {
  __commonJS,
  __toCommonJS
} from "./chunk-V4OQ3NZ2.js";

// ../../node_modules/@formatjs/intl-pluralrules/supported-locales.generated.js
var require_supported_locales_generated = __commonJS({
  "../../node_modules/@formatjs/intl-pluralrules/supported-locales.generated.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.supportedLocales = void 0;
    exports.supportedLocales = ["af", "ak", "am", "an", "ar", "ars", "as", "asa", "ast", "az", "bal", "be", "bem", "bez", "bg", "bho", "bm", "bn", "bo", "br", "brx", "bs", "ca", "ce", "ceb", "cgg", "chr", "ckb", "cs", "cy", "da", "de", "doi", "dsb", "dv", "dz", "ee", "el", "en", "eo", "es", "et", "eu", "fa", "ff", "fi", "fil", "fo", "fr", "fur", "fy", "ga", "gd", "gl", "gsw", "gu", "guw", "gv", "ha", "haw", "he", "hi", "hnj", "hr", "hsb", "hu", "hy", "ia", "id", "ig", "ii", "io", "is", "it", "iu", "ja", "jbo", "jgo", "jmc", "jv", "jw", "ka", "kab", "kaj", "kcg", "kde", "kea", "kk", "kkj", "kl", "km", "kn", "ko", "ks", "ksb", "ksh", "ku", "kw", "ky", "lag", "lb", "lg", "lij", "lkt", "ln", "lo", "lt", "lv", "mas", "mg", "mgo", "mk", "ml", "mn", "mo", "mr", "ms", "mt", "my", "nah", "naq", "nb", "nd", "ne", "nl", "nn", "nnh", "no", "nqo", "nr", "nso", "ny", "nyn", "om", "or", "os", "osa", "pa", "pap", "pcm", "pl", "prg", "ps", "pt", "pt-PT", "rm", "ro", "rof", "ru", "rwk", "sah", "saq", "sat", "sc", "scn", "sd", "sdh", "se", "seh", "ses", "sg", "sh", "shi", "si", "sk", "sl", "sma", "smi", "smj", "smn", "sms", "sn", "so", "sq", "sr", "ss", "ssy", "st", "su", "sv", "sw", "syr", "ta", "te", "teo", "th", "ti", "tig", "tk", "tl", "tn", "to", "tpi", "tr", "ts", "tzm", "ug", "uk", "und", "ur", "uz", "ve", "vi", "vo", "vun", "wa", "wae", "wo", "xh", "xog", "yi", "yo", "yue", "zh", "zu"];
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/should-polyfill.js
var require_should_polyfill = __commonJS({
  "../../node_modules/@formatjs/intl-pluralrules/should-polyfill.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.shouldPolyfill = shouldPolyfill;
    var intl_localematcher_1 = (init_lib(), __toCommonJS(lib_exports));
    var supported_locales_generated_1 = require_supported_locales_generated();
    function supportedLocalesOf(locale) {
      if (!locale) {
        return true;
      }
      var locales = Array.isArray(locale) ? locale : [locale];
      return Intl.PluralRules.supportedLocalesOf(locales).length === locales.length;
    }
    function shouldPolyfill(locale) {
      if (locale === void 0) {
        locale = "en";
      }
      if (!("PluralRules" in Intl) || new Intl.PluralRules("en", { minimumFractionDigits: 2 }).select(1) === "one" || !supportedLocalesOf(locale)) {
        return locale ? (0, intl_localematcher_1.match)([locale], supported_locales_generated_1.supportedLocales, "en") : void 0;
      }
    }
  }
});
export default require_should_polyfill();
//# sourceMappingURL=@formatjs_intl-pluralrules_should-polyfill.js.map
