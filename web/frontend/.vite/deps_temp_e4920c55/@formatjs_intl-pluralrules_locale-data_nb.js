// ../../node_modules/@formatjs/intl-pluralrules/locale-data/nb.js
if (Intl.PluralRules && typeof Intl.PluralRules.__addLocaleData === "function") {
  Intl.PluralRules.__addLocaleData({ "data": { "categories": { "cardinal": ["one", "other"], "ordinal": ["other"] }, "fn": function(n, ord) {
    if (ord) return "other";
    return n == 1 ? "one" : "other";
  } }, "locale": "nb" });
}
//# sourceMappingURL=@formatjs_intl-pluralrules_locale-data_nb.js.map
