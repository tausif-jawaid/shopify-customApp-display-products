// ../../node_modules/@formatjs/intl-pluralrules/locale-data/de.js
if (Intl.PluralRules && typeof Intl.PluralRules.__addLocaleData === "function") {
  Intl.PluralRules.__addLocaleData({ "data": { "categories": { "cardinal": ["one", "other"], "ordinal": ["other"] }, "fn": function(n, ord) {
    var s = String(n).split("."), v0 = !s[1];
    if (ord) return "other";
    return n == 1 && v0 ? "one" : "other";
  } }, "locale": "de" });
}
//# sourceMappingURL=@formatjs_intl-pluralrules_locale-data_de.js.map
