import {
  __commonJS
} from "./chunk-V4OQ3NZ2.js";

// ../../node_modules/@formatjs/intl-locale/should-polyfill.js
var require_should_polyfill = __commonJS({
  "../../node_modules/@formatjs/intl-locale/should-polyfill.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.shouldPolyfill = void 0;
    function hasIntlGetCanonicalLocalesBug() {
      try {
        return new Intl.Locale("und-x-private").toString() === "x-private";
      } catch (e) {
        return true;
      }
    }
    function shouldPolyfill() {
      return !("Locale" in Intl) || hasIntlGetCanonicalLocalesBug();
    }
    exports.shouldPolyfill = shouldPolyfill;
  }
});

export {
  require_should_polyfill
};
//# sourceMappingURL=chunk-QZWISLV2.js.map
