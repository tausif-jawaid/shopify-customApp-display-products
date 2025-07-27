import {
  LookupSupportedLocales,
  ResolveLocale,
  init_lib,
  lib_exports
} from "./chunk-NNM2Z5PN.js";
import {
  __extends,
  __spreadArray,
  init_tslib_es6,
  tslib_es6_exports
} from "./chunk-G7U7252R.js";
import {
  __commonJS,
  __esm,
  __export,
  __toCommonJS
} from "./chunk-V4OQ3NZ2.js";

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/CanonicalizeLocaleList.js
function CanonicalizeLocaleList(locales) {
  return Intl.getCanonicalLocales(locales);
}
var init_CanonicalizeLocaleList = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/CanonicalizeLocaleList.js"() {
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/CanonicalizeTimeZoneName.js
function CanonicalizeTimeZoneName(tz, _a) {
  var zoneNames = _a.zoneNames, uppercaseLinks = _a.uppercaseLinks;
  var uppercasedTz = tz.toUpperCase();
  var uppercasedZones = zoneNames.reduce(function(all, z) {
    all[z.toUpperCase()] = z;
    return all;
  }, {});
  var ianaTimeZone = uppercaseLinks[uppercasedTz] || uppercasedZones[uppercasedTz];
  if (ianaTimeZone === "Etc/UTC" || ianaTimeZone === "Etc/GMT") {
    return "UTC";
  }
  return ianaTimeZone;
}
var init_CanonicalizeTimeZoneName = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/CanonicalizeTimeZoneName.js"() {
  }
});

// ../../node_modules/decimal.js/decimal.mjs
function digitsToString(d) {
  var i, k, ws, indexOfLastWord = d.length - 1, str = "", w = d[0];
  if (indexOfLastWord > 0) {
    str += w;
    for (i = 1; i < indexOfLastWord; i++) {
      ws = d[i] + "";
      k = LOG_BASE - ws.length;
      if (k) str += getZeroString(k);
      str += ws;
    }
    w = d[i];
    ws = w + "";
    k = LOG_BASE - ws.length;
    if (k) str += getZeroString(k);
  } else if (w === 0) {
    return "0";
  }
  for (; w % 10 === 0; ) w /= 10;
  return str + w;
}
function checkInt32(i, min2, max2) {
  if (i !== ~~i || i < min2 || i > max2) {
    throw Error(invalidArgument + i);
  }
}
function checkRoundingDigits(d, i, rm, repeating) {
  var di, k, r, rd;
  for (k = d[0]; k >= 10; k /= 10) --i;
  if (--i < 0) {
    i += LOG_BASE;
    di = 0;
  } else {
    di = Math.ceil((i + 1) / LOG_BASE);
    i %= LOG_BASE;
  }
  k = mathpow(10, LOG_BASE - i);
  rd = d[di] % k | 0;
  if (repeating == null) {
    if (i < 3) {
      if (i == 0) rd = rd / 100 | 0;
      else if (i == 1) rd = rd / 10 | 0;
      r = rm < 4 && rd == 99999 || rm > 3 && rd == 49999 || rd == 5e4 || rd == 0;
    } else {
      r = (rm < 4 && rd + 1 == k || rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 100 | 0) == mathpow(10, i - 2) - 1 || (rd == k / 2 || rd == 0) && (d[di + 1] / k / 100 | 0) == 0;
    }
  } else {
    if (i < 4) {
      if (i == 0) rd = rd / 1e3 | 0;
      else if (i == 1) rd = rd / 100 | 0;
      else if (i == 2) rd = rd / 10 | 0;
      r = (repeating || rm < 4) && rd == 9999 || !repeating && rm > 3 && rd == 4999;
    } else {
      r = ((repeating || rm < 4) && rd + 1 == k || !repeating && rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 1e3 | 0) == mathpow(10, i - 3) - 1;
    }
  }
  return r;
}
function convertBase(str, baseIn, baseOut) {
  var j, arr = [0], arrL, i = 0, strL = str.length;
  for (; i < strL; ) {
    for (arrL = arr.length; arrL--; ) arr[arrL] *= baseIn;
    arr[0] += NUMERALS.indexOf(str.charAt(i++));
    for (j = 0; j < arr.length; j++) {
      if (arr[j] > baseOut - 1) {
        if (arr[j + 1] === void 0) arr[j + 1] = 0;
        arr[j + 1] += arr[j] / baseOut | 0;
        arr[j] %= baseOut;
      }
    }
  }
  return arr.reverse();
}
function cosine(Ctor, x) {
  var k, len, y;
  if (x.isZero()) return x;
  len = x.d.length;
  if (len < 32) {
    k = Math.ceil(len / 3);
    y = (1 / tinyPow(4, k)).toString();
  } else {
    k = 16;
    y = "2.3283064365386962890625e-10";
  }
  Ctor.precision += k;
  x = taylorSeries(Ctor, 1, x.times(y), new Ctor(1));
  for (var i = k; i--; ) {
    var cos2x = x.times(x);
    x = cos2x.times(cos2x).minus(cos2x).times(8).plus(1);
  }
  Ctor.precision -= k;
  return x;
}
function finalise(x, sd, rm, isTruncated) {
  var digits, i, j, k, rd, roundUp, w, xd, xdi, Ctor = x.constructor;
  out: if (sd != null) {
    xd = x.d;
    if (!xd) return x;
    for (digits = 1, k = xd[0]; k >= 10; k /= 10) digits++;
    i = sd - digits;
    if (i < 0) {
      i += LOG_BASE;
      j = sd;
      w = xd[xdi = 0];
      rd = w / mathpow(10, digits - j - 1) % 10 | 0;
    } else {
      xdi = Math.ceil((i + 1) / LOG_BASE);
      k = xd.length;
      if (xdi >= k) {
        if (isTruncated) {
          for (; k++ <= xdi; ) xd.push(0);
          w = rd = 0;
          digits = 1;
          i %= LOG_BASE;
          j = i - LOG_BASE + 1;
        } else {
          break out;
        }
      } else {
        w = k = xd[xdi];
        for (digits = 1; k >= 10; k /= 10) digits++;
        i %= LOG_BASE;
        j = i - LOG_BASE + digits;
        rd = j < 0 ? 0 : w / mathpow(10, digits - j - 1) % 10 | 0;
      }
    }
    isTruncated = isTruncated || sd < 0 || xd[xdi + 1] !== void 0 || (j < 0 ? w : w % mathpow(10, digits - j - 1));
    roundUp = rm < 4 ? (rd || isTruncated) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || isTruncated || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
    (i > 0 ? j > 0 ? w / mathpow(10, digits - j) : 0 : xd[xdi - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));
    if (sd < 1 || !xd[0]) {
      xd.length = 0;
      if (roundUp) {
        sd -= x.e + 1;
        xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
        x.e = -sd || 0;
      } else {
        xd[0] = x.e = 0;
      }
      return x;
    }
    if (i == 0) {
      xd.length = xdi;
      k = 1;
      xdi--;
    } else {
      xd.length = xdi + 1;
      k = mathpow(10, LOG_BASE - i);
      xd[xdi] = j > 0 ? (w / mathpow(10, digits - j) % mathpow(10, j) | 0) * k : 0;
    }
    if (roundUp) {
      for (; ; ) {
        if (xdi == 0) {
          for (i = 1, j = xd[0]; j >= 10; j /= 10) i++;
          j = xd[0] += k;
          for (k = 1; j >= 10; j /= 10) k++;
          if (i != k) {
            x.e++;
            if (xd[0] == BASE) xd[0] = 1;
          }
          break;
        } else {
          xd[xdi] += k;
          if (xd[xdi] != BASE) break;
          xd[xdi--] = 0;
          k = 1;
        }
      }
    }
    for (i = xd.length; xd[--i] === 0; ) xd.pop();
  }
  if (external) {
    if (x.e > Ctor.maxE) {
      x.d = null;
      x.e = NaN;
    } else if (x.e < Ctor.minE) {
      x.e = 0;
      x.d = [0];
    }
  }
  return x;
}
function finiteToString(x, isExp, sd) {
  if (!x.isFinite()) return nonFiniteToString(x);
  var k, e = x.e, str = digitsToString(x.d), len = str.length;
  if (isExp) {
    if (sd && (k = sd - len) > 0) {
      str = str.charAt(0) + "." + str.slice(1) + getZeroString(k);
    } else if (len > 1) {
      str = str.charAt(0) + "." + str.slice(1);
    }
    str = str + (x.e < 0 ? "e" : "e+") + x.e;
  } else if (e < 0) {
    str = "0." + getZeroString(-e - 1) + str;
    if (sd && (k = sd - len) > 0) str += getZeroString(k);
  } else if (e >= len) {
    str += getZeroString(e + 1 - len);
    if (sd && (k = sd - e - 1) > 0) str = str + "." + getZeroString(k);
  } else {
    if ((k = e + 1) < len) str = str.slice(0, k) + "." + str.slice(k);
    if (sd && (k = sd - len) > 0) {
      if (e + 1 === len) str += ".";
      str += getZeroString(k);
    }
  }
  return str;
}
function getBase10Exponent(digits, e) {
  var w = digits[0];
  for (e *= LOG_BASE; w >= 10; w /= 10) e++;
  return e;
}
function getLn10(Ctor, sd, pr) {
  if (sd > LN10_PRECISION) {
    external = true;
    if (pr) Ctor.precision = pr;
    throw Error(precisionLimitExceeded);
  }
  return finalise(new Ctor(LN10), sd, 1, true);
}
function getPi(Ctor, sd, rm) {
  if (sd > PI_PRECISION) throw Error(precisionLimitExceeded);
  return finalise(new Ctor(PI), sd, rm, true);
}
function getPrecision(digits) {
  var w = digits.length - 1, len = w * LOG_BASE + 1;
  w = digits[w];
  if (w) {
    for (; w % 10 == 0; w /= 10) len--;
    for (w = digits[0]; w >= 10; w /= 10) len++;
  }
  return len;
}
function getZeroString(k) {
  var zs = "";
  for (; k--; ) zs += "0";
  return zs;
}
function intPow(Ctor, x, n, pr) {
  var isTruncated, r = new Ctor(1), k = Math.ceil(pr / LOG_BASE + 4);
  external = false;
  for (; ; ) {
    if (n % 2) {
      r = r.times(x);
      if (truncate(r.d, k)) isTruncated = true;
    }
    n = mathfloor(n / 2);
    if (n === 0) {
      n = r.d.length - 1;
      if (isTruncated && r.d[n] === 0) ++r.d[n];
      break;
    }
    x = x.times(x);
    truncate(x.d, k);
  }
  external = true;
  return r;
}
function isOdd(n) {
  return n.d[n.d.length - 1] & 1;
}
function maxOrMin(Ctor, args, n) {
  var k, y, x = new Ctor(args[0]), i = 0;
  for (; ++i < args.length; ) {
    y = new Ctor(args[i]);
    if (!y.s) {
      x = y;
      break;
    }
    k = x.cmp(y);
    if (k === n || k === 0 && x.s === n) {
      x = y;
    }
  }
  return x;
}
function naturalExponential(x, sd) {
  var denominator, guard, j, pow2, sum2, t, wpr, rep = 0, i = 0, k = 0, Ctor = x.constructor, rm = Ctor.rounding, pr = Ctor.precision;
  if (!x.d || !x.d[0] || x.e > 17) {
    return new Ctor(x.d ? !x.d[0] ? 1 : x.s < 0 ? 0 : 1 / 0 : x.s ? x.s < 0 ? 0 : x : 0 / 0);
  }
  if (sd == null) {
    external = false;
    wpr = pr;
  } else {
    wpr = sd;
  }
  t = new Ctor(0.03125);
  while (x.e > -2) {
    x = x.times(t);
    k += 5;
  }
  guard = Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0;
  wpr += guard;
  denominator = pow2 = sum2 = new Ctor(1);
  Ctor.precision = wpr;
  for (; ; ) {
    pow2 = finalise(pow2.times(x), wpr, 1);
    denominator = denominator.times(++i);
    t = sum2.plus(divide(pow2, denominator, wpr, 1));
    if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum2.d).slice(0, wpr)) {
      j = k;
      while (j--) sum2 = finalise(sum2.times(sum2), wpr, 1);
      if (sd == null) {
        if (rep < 3 && checkRoundingDigits(sum2.d, wpr - guard, rm, rep)) {
          Ctor.precision = wpr += 10;
          denominator = pow2 = t = new Ctor(1);
          i = 0;
          rep++;
        } else {
          return finalise(sum2, Ctor.precision = pr, rm, external = true);
        }
      } else {
        Ctor.precision = pr;
        return sum2;
      }
    }
    sum2 = t;
  }
}
function naturalLogarithm(y, sd) {
  var c, c0, denominator, e, numerator, rep, sum2, t, wpr, x1, x2, n = 1, guard = 10, x = y, xd = x.d, Ctor = x.constructor, rm = Ctor.rounding, pr = Ctor.precision;
  if (x.s < 0 || !xd || !xd[0] || !x.e && xd[0] == 1 && xd.length == 1) {
    return new Ctor(xd && !xd[0] ? -1 / 0 : x.s != 1 ? NaN : xd ? 0 : x);
  }
  if (sd == null) {
    external = false;
    wpr = pr;
  } else {
    wpr = sd;
  }
  Ctor.precision = wpr += guard;
  c = digitsToString(xd);
  c0 = c.charAt(0);
  if (Math.abs(e = x.e) < 15e14) {
    while (c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3) {
      x = x.times(y);
      c = digitsToString(x.d);
      c0 = c.charAt(0);
      n++;
    }
    e = x.e;
    if (c0 > 1) {
      x = new Ctor("0." + c);
      e++;
    } else {
      x = new Ctor(c0 + "." + c.slice(1));
    }
  } else {
    t = getLn10(Ctor, wpr + 2, pr).times(e + "");
    x = naturalLogarithm(new Ctor(c0 + "." + c.slice(1)), wpr - guard).plus(t);
    Ctor.precision = pr;
    return sd == null ? finalise(x, pr, rm, external = true) : x;
  }
  x1 = x;
  sum2 = numerator = x = divide(x.minus(1), x.plus(1), wpr, 1);
  x2 = finalise(x.times(x), wpr, 1);
  denominator = 3;
  for (; ; ) {
    numerator = finalise(numerator.times(x2), wpr, 1);
    t = sum2.plus(divide(numerator, new Ctor(denominator), wpr, 1));
    if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum2.d).slice(0, wpr)) {
      sum2 = sum2.times(2);
      if (e !== 0) sum2 = sum2.plus(getLn10(Ctor, wpr + 2, pr).times(e + ""));
      sum2 = divide(sum2, new Ctor(n), wpr, 1);
      if (sd == null) {
        if (checkRoundingDigits(sum2.d, wpr - guard, rm, rep)) {
          Ctor.precision = wpr += guard;
          t = numerator = x = divide(x1.minus(1), x1.plus(1), wpr, 1);
          x2 = finalise(x.times(x), wpr, 1);
          denominator = rep = 1;
        } else {
          return finalise(sum2, Ctor.precision = pr, rm, external = true);
        }
      } else {
        Ctor.precision = pr;
        return sum2;
      }
    }
    sum2 = t;
    denominator += 2;
  }
}
function nonFiniteToString(x) {
  return String(x.s * x.s / 0);
}
function parseDecimal(x, str) {
  var e, i, len;
  if ((e = str.indexOf(".")) > -1) str = str.replace(".", "");
  if ((i = str.search(/e/i)) > 0) {
    if (e < 0) e = i;
    e += +str.slice(i + 1);
    str = str.substring(0, i);
  } else if (e < 0) {
    e = str.length;
  }
  for (i = 0; str.charCodeAt(i) === 48; i++) ;
  for (len = str.length; str.charCodeAt(len - 1) === 48; --len) ;
  str = str.slice(i, len);
  if (str) {
    len -= i;
    x.e = e = e - i - 1;
    x.d = [];
    i = (e + 1) % LOG_BASE;
    if (e < 0) i += LOG_BASE;
    if (i < len) {
      if (i) x.d.push(+str.slice(0, i));
      for (len -= LOG_BASE; i < len; ) x.d.push(+str.slice(i, i += LOG_BASE));
      str = str.slice(i);
      i = LOG_BASE - str.length;
    } else {
      i -= len;
    }
    for (; i--; ) str += "0";
    x.d.push(+str);
    if (external) {
      if (x.e > x.constructor.maxE) {
        x.d = null;
        x.e = NaN;
      } else if (x.e < x.constructor.minE) {
        x.e = 0;
        x.d = [0];
      }
    }
  } else {
    x.e = 0;
    x.d = [0];
  }
  return x;
}
function parseOther(x, str) {
  var base, Ctor, divisor, i, isFloat, len, p, xd, xe;
  if (str.indexOf("_") > -1) {
    str = str.replace(/(\d)_(?=\d)/g, "$1");
    if (isDecimal.test(str)) return parseDecimal(x, str);
  } else if (str === "Infinity" || str === "NaN") {
    if (!+str) x.s = NaN;
    x.e = NaN;
    x.d = null;
    return x;
  }
  if (isHex.test(str)) {
    base = 16;
    str = str.toLowerCase();
  } else if (isBinary.test(str)) {
    base = 2;
  } else if (isOctal.test(str)) {
    base = 8;
  } else {
    throw Error(invalidArgument + str);
  }
  i = str.search(/p/i);
  if (i > 0) {
    p = +str.slice(i + 1);
    str = str.substring(2, i);
  } else {
    str = str.slice(2);
  }
  i = str.indexOf(".");
  isFloat = i >= 0;
  Ctor = x.constructor;
  if (isFloat) {
    str = str.replace(".", "");
    len = str.length;
    i = len - i;
    divisor = intPow(Ctor, new Ctor(base), i, i * 2);
  }
  xd = convertBase(str, base, BASE);
  xe = xd.length - 1;
  for (i = xe; xd[i] === 0; --i) xd.pop();
  if (i < 0) return new Ctor(x.s * 0);
  x.e = getBase10Exponent(xd, xe);
  x.d = xd;
  external = false;
  if (isFloat) x = divide(x, divisor, len * 4);
  if (p) x = x.times(Math.abs(p) < 54 ? mathpow(2, p) : Decimal.pow(2, p));
  external = true;
  return x;
}
function sine(Ctor, x) {
  var k, len = x.d.length;
  if (len < 3) {
    return x.isZero() ? x : taylorSeries(Ctor, 2, x, x);
  }
  k = 1.4 * Math.sqrt(len);
  k = k > 16 ? 16 : k | 0;
  x = x.times(1 / tinyPow(5, k));
  x = taylorSeries(Ctor, 2, x, x);
  var sin2_x, d5 = new Ctor(5), d16 = new Ctor(16), d20 = new Ctor(20);
  for (; k--; ) {
    sin2_x = x.times(x);
    x = x.times(d5.plus(sin2_x.times(d16.times(sin2_x).minus(d20))));
  }
  return x;
}
function taylorSeries(Ctor, n, x, y, isHyperbolic) {
  var j, t, u, x2, i = 1, pr = Ctor.precision, k = Math.ceil(pr / LOG_BASE);
  external = false;
  x2 = x.times(x);
  u = new Ctor(y);
  for (; ; ) {
    t = divide(u.times(x2), new Ctor(n++ * n++), pr, 1);
    u = isHyperbolic ? y.plus(t) : y.minus(t);
    y = divide(t.times(x2), new Ctor(n++ * n++), pr, 1);
    t = u.plus(y);
    if (t.d[k] !== void 0) {
      for (j = k; t.d[j] === u.d[j] && j--; ) ;
      if (j == -1) break;
    }
    j = u;
    u = y;
    y = t;
    t = j;
    i++;
  }
  external = true;
  t.d.length = k + 1;
  return t;
}
function tinyPow(b, e) {
  var n = b;
  while (--e) n *= b;
  return n;
}
function toLessThanHalfPi(Ctor, x) {
  var t, isNeg = x.s < 0, pi = getPi(Ctor, Ctor.precision, 1), halfPi = pi.times(0.5);
  x = x.abs();
  if (x.lte(halfPi)) {
    quadrant = isNeg ? 4 : 1;
    return x;
  }
  t = x.divToInt(pi);
  if (t.isZero()) {
    quadrant = isNeg ? 3 : 2;
  } else {
    x = x.minus(t.times(pi));
    if (x.lte(halfPi)) {
      quadrant = isOdd(t) ? isNeg ? 2 : 3 : isNeg ? 4 : 1;
      return x;
    }
    quadrant = isOdd(t) ? isNeg ? 1 : 4 : isNeg ? 3 : 2;
  }
  return x.minus(pi).abs();
}
function toStringBinary(x, baseOut, sd, rm) {
  var base, e, i, k, len, roundUp, str, xd, y, Ctor = x.constructor, isExp = sd !== void 0;
  if (isExp) {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);
  } else {
    sd = Ctor.precision;
    rm = Ctor.rounding;
  }
  if (!x.isFinite()) {
    str = nonFiniteToString(x);
  } else {
    str = finiteToString(x);
    i = str.indexOf(".");
    if (isExp) {
      base = 2;
      if (baseOut == 16) {
        sd = sd * 4 - 3;
      } else if (baseOut == 8) {
        sd = sd * 3 - 2;
      }
    } else {
      base = baseOut;
    }
    if (i >= 0) {
      str = str.replace(".", "");
      y = new Ctor(1);
      y.e = str.length - i;
      y.d = convertBase(finiteToString(y), 10, base);
      y.e = y.d.length;
    }
    xd = convertBase(str, 10, base);
    e = len = xd.length;
    for (; xd[--len] == 0; ) xd.pop();
    if (!xd[0]) {
      str = isExp ? "0p+0" : "0";
    } else {
      if (i < 0) {
        e--;
      } else {
        x = new Ctor(x);
        x.d = xd;
        x.e = e;
        x = divide(x, y, sd, rm, 0, base);
        xd = x.d;
        e = x.e;
        roundUp = inexact;
      }
      i = xd[sd];
      k = base / 2;
      roundUp = roundUp || xd[sd + 1] !== void 0;
      roundUp = rm < 4 ? (i !== void 0 || roundUp) && (rm === 0 || rm === (x.s < 0 ? 3 : 2)) : i > k || i === k && (rm === 4 || roundUp || rm === 6 && xd[sd - 1] & 1 || rm === (x.s < 0 ? 8 : 7));
      xd.length = sd;
      if (roundUp) {
        for (; ++xd[--sd] > base - 1; ) {
          xd[sd] = 0;
          if (!sd) {
            ++e;
            xd.unshift(1);
          }
        }
      }
      for (len = xd.length; !xd[len - 1]; --len) ;
      for (i = 0, str = ""; i < len; i++) str += NUMERALS.charAt(xd[i]);
      if (isExp) {
        if (len > 1) {
          if (baseOut == 16 || baseOut == 8) {
            i = baseOut == 16 ? 4 : 3;
            for (--len; len % i; len++) str += "0";
            xd = convertBase(str, base, baseOut);
            for (len = xd.length; !xd[len - 1]; --len) ;
            for (i = 1, str = "1."; i < len; i++) str += NUMERALS.charAt(xd[i]);
          } else {
            str = str.charAt(0) + "." + str.slice(1);
          }
        }
        str = str + (e < 0 ? "p" : "p+") + e;
      } else if (e < 0) {
        for (; ++e; ) str = "0" + str;
        str = "0." + str;
      } else {
        if (++e > len) for (e -= len; e--; ) str += "0";
        else if (e < len) str = str.slice(0, e) + "." + str.slice(e);
      }
    }
    str = (baseOut == 16 ? "0x" : baseOut == 2 ? "0b" : baseOut == 8 ? "0o" : "") + str;
  }
  return x.s < 0 ? "-" + str : str;
}
function truncate(arr, len) {
  if (arr.length > len) {
    arr.length = len;
    return true;
  }
}
function abs(x) {
  return new this(x).abs();
}
function acos(x) {
  return new this(x).acos();
}
function acosh(x) {
  return new this(x).acosh();
}
function add(x, y) {
  return new this(x).plus(y);
}
function asin(x) {
  return new this(x).asin();
}
function asinh(x) {
  return new this(x).asinh();
}
function atan(x) {
  return new this(x).atan();
}
function atanh(x) {
  return new this(x).atanh();
}
function atan2(y, x) {
  y = new this(y);
  x = new this(x);
  var r, pr = this.precision, rm = this.rounding, wpr = pr + 4;
  if (!y.s || !x.s) {
    r = new this(NaN);
  } else if (!y.d && !x.d) {
    r = getPi(this, wpr, 1).times(x.s > 0 ? 0.25 : 0.75);
    r.s = y.s;
  } else if (!x.d || y.isZero()) {
    r = x.s < 0 ? getPi(this, pr, rm) : new this(0);
    r.s = y.s;
  } else if (!y.d || x.isZero()) {
    r = getPi(this, wpr, 1).times(0.5);
    r.s = y.s;
  } else if (x.s < 0) {
    this.precision = wpr;
    this.rounding = 1;
    r = this.atan(divide(y, x, wpr, 1));
    x = getPi(this, wpr, 1);
    this.precision = pr;
    this.rounding = rm;
    r = y.s < 0 ? r.minus(x) : r.plus(x);
  } else {
    r = this.atan(divide(y, x, wpr, 1));
  }
  return r;
}
function cbrt(x) {
  return new this(x).cbrt();
}
function ceil(x) {
  return finalise(x = new this(x), x.e + 1, 2);
}
function clamp(x, min2, max2) {
  return new this(x).clamp(min2, max2);
}
function config(obj) {
  if (!obj || typeof obj !== "object") throw Error(decimalError + "Object expected");
  var i, p, v, useDefaults = obj.defaults === true, ps = [
    "precision",
    1,
    MAX_DIGITS,
    "rounding",
    0,
    8,
    "toExpNeg",
    -EXP_LIMIT,
    0,
    "toExpPos",
    0,
    EXP_LIMIT,
    "maxE",
    0,
    EXP_LIMIT,
    "minE",
    -EXP_LIMIT,
    0,
    "modulo",
    0,
    9
  ];
  for (i = 0; i < ps.length; i += 3) {
    if (p = ps[i], useDefaults) this[p] = DEFAULTS[p];
    if ((v = obj[p]) !== void 0) {
      if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2]) this[p] = v;
      else throw Error(invalidArgument + p + ": " + v);
    }
  }
  if (p = "crypto", useDefaults) this[p] = DEFAULTS[p];
  if ((v = obj[p]) !== void 0) {
    if (v === true || v === false || v === 0 || v === 1) {
      if (v) {
        if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
          this[p] = true;
        } else {
          throw Error(cryptoUnavailable);
        }
      } else {
        this[p] = false;
      }
    } else {
      throw Error(invalidArgument + p + ": " + v);
    }
  }
  return this;
}
function cos(x) {
  return new this(x).cos();
}
function cosh(x) {
  return new this(x).cosh();
}
function clone(obj) {
  var i, p, ps;
  function Decimal2(v) {
    var e, i2, t, x = this;
    if (!(x instanceof Decimal2)) return new Decimal2(v);
    x.constructor = Decimal2;
    if (isDecimalInstance(v)) {
      x.s = v.s;
      if (external) {
        if (!v.d || v.e > Decimal2.maxE) {
          x.e = NaN;
          x.d = null;
        } else if (v.e < Decimal2.minE) {
          x.e = 0;
          x.d = [0];
        } else {
          x.e = v.e;
          x.d = v.d.slice();
        }
      } else {
        x.e = v.e;
        x.d = v.d ? v.d.slice() : v.d;
      }
      return;
    }
    t = typeof v;
    if (t === "number") {
      if (v === 0) {
        x.s = 1 / v < 0 ? -1 : 1;
        x.e = 0;
        x.d = [0];
        return;
      }
      if (v < 0) {
        v = -v;
        x.s = -1;
      } else {
        x.s = 1;
      }
      if (v === ~~v && v < 1e7) {
        for (e = 0, i2 = v; i2 >= 10; i2 /= 10) e++;
        if (external) {
          if (e > Decimal2.maxE) {
            x.e = NaN;
            x.d = null;
          } else if (e < Decimal2.minE) {
            x.e = 0;
            x.d = [0];
          } else {
            x.e = e;
            x.d = [v];
          }
        } else {
          x.e = e;
          x.d = [v];
        }
        return;
      }
      if (v * 0 !== 0) {
        if (!v) x.s = NaN;
        x.e = NaN;
        x.d = null;
        return;
      }
      return parseDecimal(x, v.toString());
    }
    if (t === "string") {
      if ((i2 = v.charCodeAt(0)) === 45) {
        v = v.slice(1);
        x.s = -1;
      } else {
        if (i2 === 43) v = v.slice(1);
        x.s = 1;
      }
      return isDecimal.test(v) ? parseDecimal(x, v) : parseOther(x, v);
    }
    if (t === "bigint") {
      if (v < 0) {
        v = -v;
        x.s = -1;
      } else {
        x.s = 1;
      }
      return parseDecimal(x, v.toString());
    }
    throw Error(invalidArgument + v);
  }
  Decimal2.prototype = P;
  Decimal2.ROUND_UP = 0;
  Decimal2.ROUND_DOWN = 1;
  Decimal2.ROUND_CEIL = 2;
  Decimal2.ROUND_FLOOR = 3;
  Decimal2.ROUND_HALF_UP = 4;
  Decimal2.ROUND_HALF_DOWN = 5;
  Decimal2.ROUND_HALF_EVEN = 6;
  Decimal2.ROUND_HALF_CEIL = 7;
  Decimal2.ROUND_HALF_FLOOR = 8;
  Decimal2.EUCLID = 9;
  Decimal2.config = Decimal2.set = config;
  Decimal2.clone = clone;
  Decimal2.isDecimal = isDecimalInstance;
  Decimal2.abs = abs;
  Decimal2.acos = acos;
  Decimal2.acosh = acosh;
  Decimal2.add = add;
  Decimal2.asin = asin;
  Decimal2.asinh = asinh;
  Decimal2.atan = atan;
  Decimal2.atanh = atanh;
  Decimal2.atan2 = atan2;
  Decimal2.cbrt = cbrt;
  Decimal2.ceil = ceil;
  Decimal2.clamp = clamp;
  Decimal2.cos = cos;
  Decimal2.cosh = cosh;
  Decimal2.div = div;
  Decimal2.exp = exp;
  Decimal2.floor = floor;
  Decimal2.hypot = hypot;
  Decimal2.ln = ln;
  Decimal2.log = log;
  Decimal2.log10 = log10;
  Decimal2.log2 = log2;
  Decimal2.max = max;
  Decimal2.min = min;
  Decimal2.mod = mod;
  Decimal2.mul = mul;
  Decimal2.pow = pow;
  Decimal2.random = random;
  Decimal2.round = round;
  Decimal2.sign = sign;
  Decimal2.sin = sin;
  Decimal2.sinh = sinh;
  Decimal2.sqrt = sqrt;
  Decimal2.sub = sub;
  Decimal2.sum = sum;
  Decimal2.tan = tan;
  Decimal2.tanh = tanh;
  Decimal2.trunc = trunc;
  if (obj === void 0) obj = {};
  if (obj) {
    if (obj.defaults !== true) {
      ps = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"];
      for (i = 0; i < ps.length; ) if (!obj.hasOwnProperty(p = ps[i++])) obj[p] = this[p];
    }
  }
  Decimal2.config(obj);
  return Decimal2;
}
function div(x, y) {
  return new this(x).div(y);
}
function exp(x) {
  return new this(x).exp();
}
function floor(x) {
  return finalise(x = new this(x), x.e + 1, 3);
}
function hypot() {
  var i, n, t = new this(0);
  external = false;
  for (i = 0; i < arguments.length; ) {
    n = new this(arguments[i++]);
    if (!n.d) {
      if (n.s) {
        external = true;
        return new this(1 / 0);
      }
      t = n;
    } else if (t.d) {
      t = t.plus(n.times(n));
    }
  }
  external = true;
  return t.sqrt();
}
function isDecimalInstance(obj) {
  return obj instanceof Decimal || obj && obj.toStringTag === tag || false;
}
function ln(x) {
  return new this(x).ln();
}
function log(x, y) {
  return new this(x).log(y);
}
function log2(x) {
  return new this(x).log(2);
}
function log10(x) {
  return new this(x).log(10);
}
function max() {
  return maxOrMin(this, arguments, -1);
}
function min() {
  return maxOrMin(this, arguments, 1);
}
function mod(x, y) {
  return new this(x).mod(y);
}
function mul(x, y) {
  return new this(x).mul(y);
}
function pow(x, y) {
  return new this(x).pow(y);
}
function random(sd) {
  var d, e, k, n, i = 0, r = new this(1), rd = [];
  if (sd === void 0) sd = this.precision;
  else checkInt32(sd, 1, MAX_DIGITS);
  k = Math.ceil(sd / LOG_BASE);
  if (!this.crypto) {
    for (; i < k; ) rd[i++] = Math.random() * 1e7 | 0;
  } else if (crypto.getRandomValues) {
    d = crypto.getRandomValues(new Uint32Array(k));
    for (; i < k; ) {
      n = d[i];
      if (n >= 429e7) {
        d[i] = crypto.getRandomValues(new Uint32Array(1))[0];
      } else {
        rd[i++] = n % 1e7;
      }
    }
  } else if (crypto.randomBytes) {
    d = crypto.randomBytes(k *= 4);
    for (; i < k; ) {
      n = d[i] + (d[i + 1] << 8) + (d[i + 2] << 16) + ((d[i + 3] & 127) << 24);
      if (n >= 214e7) {
        crypto.randomBytes(4).copy(d, i);
      } else {
        rd.push(n % 1e7);
        i += 4;
      }
    }
    i = k / 4;
  } else {
    throw Error(cryptoUnavailable);
  }
  k = rd[--i];
  sd %= LOG_BASE;
  if (k && sd) {
    n = mathpow(10, LOG_BASE - sd);
    rd[i] = (k / n | 0) * n;
  }
  for (; rd[i] === 0; i--) rd.pop();
  if (i < 0) {
    e = 0;
    rd = [0];
  } else {
    e = -1;
    for (; rd[0] === 0; e -= LOG_BASE) rd.shift();
    for (k = 1, n = rd[0]; n >= 10; n /= 10) k++;
    if (k < LOG_BASE) e -= LOG_BASE - k;
  }
  r.e = e;
  r.d = rd;
  return r;
}
function round(x) {
  return finalise(x = new this(x), x.e + 1, this.rounding);
}
function sign(x) {
  x = new this(x);
  return x.d ? x.d[0] ? x.s : 0 * x.s : x.s || NaN;
}
function sin(x) {
  return new this(x).sin();
}
function sinh(x) {
  return new this(x).sinh();
}
function sqrt(x) {
  return new this(x).sqrt();
}
function sub(x, y) {
  return new this(x).sub(y);
}
function sum() {
  var i = 0, args = arguments, x = new this(args[i]);
  external = false;
  for (; x.s && ++i < args.length; ) x = x.plus(args[i]);
  external = true;
  return finalise(x, this.precision, this.rounding);
}
function tan(x) {
  return new this(x).tan();
}
function tanh(x) {
  return new this(x).tanh();
}
function trunc(x) {
  return finalise(x = new this(x), x.e + 1, 1);
}
var EXP_LIMIT, MAX_DIGITS, NUMERALS, LN10, PI, DEFAULTS, inexact, quadrant, external, decimalError, invalidArgument, precisionLimitExceeded, cryptoUnavailable, tag, mathfloor, mathpow, isBinary, isHex, isOctal, isDecimal, BASE, LOG_BASE, MAX_SAFE_INTEGER, LN10_PRECISION, PI_PRECISION, P, divide, Decimal, decimal_default;
var init_decimal = __esm({
  "../../node_modules/decimal.js/decimal.mjs"() {
    EXP_LIMIT = 9e15;
    MAX_DIGITS = 1e9;
    NUMERALS = "0123456789abcdef";
    LN10 = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058";
    PI = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789";
    DEFAULTS = {
      // These values must be integers within the stated ranges (inclusive).
      // Most of these values can be changed at run-time using the `Decimal.config` method.
      // The maximum number of significant digits of the result of a calculation or base conversion.
      // E.g. `Decimal.config({ precision: 20 });`
      precision: 20,
      // 1 to MAX_DIGITS
      // The rounding mode used when rounding to `precision`.
      //
      // ROUND_UP         0 Away from zero.
      // ROUND_DOWN       1 Towards zero.
      // ROUND_CEIL       2 Towards +Infinity.
      // ROUND_FLOOR      3 Towards -Infinity.
      // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
      // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
      // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
      // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
      // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
      //
      // E.g.
      // `Decimal.rounding = 4;`
      // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
      rounding: 4,
      // 0 to 8
      // The modulo mode used when calculating the modulus: a mod n.
      // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
      // The remainder (r) is calculated as: r = a - n * q.
      //
      // UP         0 The remainder is positive if the dividend is negative, else is negative.
      // DOWN       1 The remainder has the same sign as the dividend (JavaScript %).
      // FLOOR      3 The remainder has the same sign as the divisor (Python %).
      // HALF_EVEN  6 The IEEE 754 remainder function.
      // EUCLID     9 Euclidian division. q = sign(n) * floor(a / abs(n)). Always positive.
      //
      // Truncated division (1), floored division (3), the IEEE 754 remainder (6), and Euclidian
      // division (9) are commonly used for the modulus operation. The other rounding modes can also
      // be used, but they may not give useful results.
      modulo: 1,
      // 0 to 9
      // The exponent value at and beneath which `toString` returns exponential notation.
      // JavaScript numbers: -7
      toExpNeg: -7,
      // 0 to -EXP_LIMIT
      // The exponent value at and above which `toString` returns exponential notation.
      // JavaScript numbers: 21
      toExpPos: 21,
      // 0 to EXP_LIMIT
      // The minimum exponent value, beneath which underflow to zero occurs.
      // JavaScript numbers: -324  (5e-324)
      minE: -EXP_LIMIT,
      // -1 to -EXP_LIMIT
      // The maximum exponent value, above which overflow to Infinity occurs.
      // JavaScript numbers: 308  (1.7976931348623157e+308)
      maxE: EXP_LIMIT,
      // 1 to EXP_LIMIT
      // Whether to use cryptographically-secure random number generation, if available.
      crypto: false
      // true/false
    };
    external = true;
    decimalError = "[DecimalError] ";
    invalidArgument = decimalError + "Invalid argument: ";
    precisionLimitExceeded = decimalError + "Precision limit exceeded";
    cryptoUnavailable = decimalError + "crypto unavailable";
    tag = "[object Decimal]";
    mathfloor = Math.floor;
    mathpow = Math.pow;
    isBinary = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i;
    isHex = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i;
    isOctal = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i;
    isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
    BASE = 1e7;
    LOG_BASE = 7;
    MAX_SAFE_INTEGER = 9007199254740991;
    LN10_PRECISION = LN10.length - 1;
    PI_PRECISION = PI.length - 1;
    P = { toStringTag: tag };
    P.absoluteValue = P.abs = function() {
      var x = new this.constructor(this);
      if (x.s < 0) x.s = 1;
      return finalise(x);
    };
    P.ceil = function() {
      return finalise(new this.constructor(this), this.e + 1, 2);
    };
    P.clampedTo = P.clamp = function(min2, max2) {
      var k, x = this, Ctor = x.constructor;
      min2 = new Ctor(min2);
      max2 = new Ctor(max2);
      if (!min2.s || !max2.s) return new Ctor(NaN);
      if (min2.gt(max2)) throw Error(invalidArgument + max2);
      k = x.cmp(min2);
      return k < 0 ? min2 : x.cmp(max2) > 0 ? max2 : new Ctor(x);
    };
    P.comparedTo = P.cmp = function(y) {
      var i, j, xdL, ydL, x = this, xd = x.d, yd = (y = new x.constructor(y)).d, xs = x.s, ys = y.s;
      if (!xd || !yd) {
        return !xs || !ys ? NaN : xs !== ys ? xs : xd === yd ? 0 : !xd ^ xs < 0 ? 1 : -1;
      }
      if (!xd[0] || !yd[0]) return xd[0] ? xs : yd[0] ? -ys : 0;
      if (xs !== ys) return xs;
      if (x.e !== y.e) return x.e > y.e ^ xs < 0 ? 1 : -1;
      xdL = xd.length;
      ydL = yd.length;
      for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
        if (xd[i] !== yd[i]) return xd[i] > yd[i] ^ xs < 0 ? 1 : -1;
      }
      return xdL === ydL ? 0 : xdL > ydL ^ xs < 0 ? 1 : -1;
    };
    P.cosine = P.cos = function() {
      var pr, rm, x = this, Ctor = x.constructor;
      if (!x.d) return new Ctor(NaN);
      if (!x.d[0]) return new Ctor(1);
      pr = Ctor.precision;
      rm = Ctor.rounding;
      Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
      Ctor.rounding = 1;
      x = cosine(Ctor, toLessThanHalfPi(Ctor, x));
      Ctor.precision = pr;
      Ctor.rounding = rm;
      return finalise(quadrant == 2 || quadrant == 3 ? x.neg() : x, pr, rm, true);
    };
    P.cubeRoot = P.cbrt = function() {
      var e, m, n, r, rep, s, sd, t, t3, t3plusx, x = this, Ctor = x.constructor;
      if (!x.isFinite() || x.isZero()) return new Ctor(x);
      external = false;
      s = x.s * mathpow(x.s * x, 1 / 3);
      if (!s || Math.abs(s) == 1 / 0) {
        n = digitsToString(x.d);
        e = x.e;
        if (s = (e - n.length + 1) % 3) n += s == 1 || s == -2 ? "0" : "00";
        s = mathpow(n, 1 / 3);
        e = mathfloor((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2));
        if (s == 1 / 0) {
          n = "5e" + e;
        } else {
          n = s.toExponential();
          n = n.slice(0, n.indexOf("e") + 1) + e;
        }
        r = new Ctor(n);
        r.s = x.s;
      } else {
        r = new Ctor(s.toString());
      }
      sd = (e = Ctor.precision) + 3;
      for (; ; ) {
        t = r;
        t3 = t.times(t).times(t);
        t3plusx = t3.plus(x);
        r = divide(t3plusx.plus(x).times(t), t3plusx.plus(t3), sd + 2, 1);
        if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
          n = n.slice(sd - 3, sd + 1);
          if (n == "9999" || !rep && n == "4999") {
            if (!rep) {
              finalise(t, e + 1, 0);
              if (t.times(t).times(t).eq(x)) {
                r = t;
                break;
              }
            }
            sd += 4;
            rep = 1;
          } else {
            if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
              finalise(r, e + 1, 1);
              m = !r.times(r).times(r).eq(x);
            }
            break;
          }
        }
      }
      external = true;
      return finalise(r, e, Ctor.rounding, m);
    };
    P.decimalPlaces = P.dp = function() {
      var w, d = this.d, n = NaN;
      if (d) {
        w = d.length - 1;
        n = (w - mathfloor(this.e / LOG_BASE)) * LOG_BASE;
        w = d[w];
        if (w) for (; w % 10 == 0; w /= 10) n--;
        if (n < 0) n = 0;
      }
      return n;
    };
    P.dividedBy = P.div = function(y) {
      return divide(this, new this.constructor(y));
    };
    P.dividedToIntegerBy = P.divToInt = function(y) {
      var x = this, Ctor = x.constructor;
      return finalise(divide(x, new Ctor(y), 0, 1, 1), Ctor.precision, Ctor.rounding);
    };
    P.equals = P.eq = function(y) {
      return this.cmp(y) === 0;
    };
    P.floor = function() {
      return finalise(new this.constructor(this), this.e + 1, 3);
    };
    P.greaterThan = P.gt = function(y) {
      return this.cmp(y) > 0;
    };
    P.greaterThanOrEqualTo = P.gte = function(y) {
      var k = this.cmp(y);
      return k == 1 || k === 0;
    };
    P.hyperbolicCosine = P.cosh = function() {
      var k, n, pr, rm, len, x = this, Ctor = x.constructor, one = new Ctor(1);
      if (!x.isFinite()) return new Ctor(x.s ? 1 / 0 : NaN);
      if (x.isZero()) return one;
      pr = Ctor.precision;
      rm = Ctor.rounding;
      Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
      Ctor.rounding = 1;
      len = x.d.length;
      if (len < 32) {
        k = Math.ceil(len / 3);
        n = (1 / tinyPow(4, k)).toString();
      } else {
        k = 16;
        n = "2.3283064365386962890625e-10";
      }
      x = taylorSeries(Ctor, 1, x.times(n), new Ctor(1), true);
      var cosh2_x, i = k, d8 = new Ctor(8);
      for (; i--; ) {
        cosh2_x = x.times(x);
        x = one.minus(cosh2_x.times(d8.minus(cosh2_x.times(d8))));
      }
      return finalise(x, Ctor.precision = pr, Ctor.rounding = rm, true);
    };
    P.hyperbolicSine = P.sinh = function() {
      var k, pr, rm, len, x = this, Ctor = x.constructor;
      if (!x.isFinite() || x.isZero()) return new Ctor(x);
      pr = Ctor.precision;
      rm = Ctor.rounding;
      Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
      Ctor.rounding = 1;
      len = x.d.length;
      if (len < 3) {
        x = taylorSeries(Ctor, 2, x, x, true);
      } else {
        k = 1.4 * Math.sqrt(len);
        k = k > 16 ? 16 : k | 0;
        x = x.times(1 / tinyPow(5, k));
        x = taylorSeries(Ctor, 2, x, x, true);
        var sinh2_x, d5 = new Ctor(5), d16 = new Ctor(16), d20 = new Ctor(20);
        for (; k--; ) {
          sinh2_x = x.times(x);
          x = x.times(d5.plus(sinh2_x.times(d16.times(sinh2_x).plus(d20))));
        }
      }
      Ctor.precision = pr;
      Ctor.rounding = rm;
      return finalise(x, pr, rm, true);
    };
    P.hyperbolicTangent = P.tanh = function() {
      var pr, rm, x = this, Ctor = x.constructor;
      if (!x.isFinite()) return new Ctor(x.s);
      if (x.isZero()) return new Ctor(x);
      pr = Ctor.precision;
      rm = Ctor.rounding;
      Ctor.precision = pr + 7;
      Ctor.rounding = 1;
      return divide(x.sinh(), x.cosh(), Ctor.precision = pr, Ctor.rounding = rm);
    };
    P.inverseCosine = P.acos = function() {
      var x = this, Ctor = x.constructor, k = x.abs().cmp(1), pr = Ctor.precision, rm = Ctor.rounding;
      if (k !== -1) {
        return k === 0 ? x.isNeg() ? getPi(Ctor, pr, rm) : new Ctor(0) : new Ctor(NaN);
      }
      if (x.isZero()) return getPi(Ctor, pr + 4, rm).times(0.5);
      Ctor.precision = pr + 6;
      Ctor.rounding = 1;
      x = new Ctor(1).minus(x).div(x.plus(1)).sqrt().atan();
      Ctor.precision = pr;
      Ctor.rounding = rm;
      return x.times(2);
    };
    P.inverseHyperbolicCosine = P.acosh = function() {
      var pr, rm, x = this, Ctor = x.constructor;
      if (x.lte(1)) return new Ctor(x.eq(1) ? 0 : NaN);
      if (!x.isFinite()) return new Ctor(x);
      pr = Ctor.precision;
      rm = Ctor.rounding;
      Ctor.precision = pr + Math.max(Math.abs(x.e), x.sd()) + 4;
      Ctor.rounding = 1;
      external = false;
      x = x.times(x).minus(1).sqrt().plus(x);
      external = true;
      Ctor.precision = pr;
      Ctor.rounding = rm;
      return x.ln();
    };
    P.inverseHyperbolicSine = P.asinh = function() {
      var pr, rm, x = this, Ctor = x.constructor;
      if (!x.isFinite() || x.isZero()) return new Ctor(x);
      pr = Ctor.precision;
      rm = Ctor.rounding;
      Ctor.precision = pr + 2 * Math.max(Math.abs(x.e), x.sd()) + 6;
      Ctor.rounding = 1;
      external = false;
      x = x.times(x).plus(1).sqrt().plus(x);
      external = true;
      Ctor.precision = pr;
      Ctor.rounding = rm;
      return x.ln();
    };
    P.inverseHyperbolicTangent = P.atanh = function() {
      var pr, rm, wpr, xsd, x = this, Ctor = x.constructor;
      if (!x.isFinite()) return new Ctor(NaN);
      if (x.e >= 0) return new Ctor(x.abs().eq(1) ? x.s / 0 : x.isZero() ? x : NaN);
      pr = Ctor.precision;
      rm = Ctor.rounding;
      xsd = x.sd();
      if (Math.max(xsd, pr) < 2 * -x.e - 1) return finalise(new Ctor(x), pr, rm, true);
      Ctor.precision = wpr = xsd - x.e;
      x = divide(x.plus(1), new Ctor(1).minus(x), wpr + pr, 1);
      Ctor.precision = pr + 4;
      Ctor.rounding = 1;
      x = x.ln();
      Ctor.precision = pr;
      Ctor.rounding = rm;
      return x.times(0.5);
    };
    P.inverseSine = P.asin = function() {
      var halfPi, k, pr, rm, x = this, Ctor = x.constructor;
      if (x.isZero()) return new Ctor(x);
      k = x.abs().cmp(1);
      pr = Ctor.precision;
      rm = Ctor.rounding;
      if (k !== -1) {
        if (k === 0) {
          halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
          halfPi.s = x.s;
          return halfPi;
        }
        return new Ctor(NaN);
      }
      Ctor.precision = pr + 6;
      Ctor.rounding = 1;
      x = x.div(new Ctor(1).minus(x.times(x)).sqrt().plus(1)).atan();
      Ctor.precision = pr;
      Ctor.rounding = rm;
      return x.times(2);
    };
    P.inverseTangent = P.atan = function() {
      var i, j, k, n, px, t, r, wpr, x2, x = this, Ctor = x.constructor, pr = Ctor.precision, rm = Ctor.rounding;
      if (!x.isFinite()) {
        if (!x.s) return new Ctor(NaN);
        if (pr + 4 <= PI_PRECISION) {
          r = getPi(Ctor, pr + 4, rm).times(0.5);
          r.s = x.s;
          return r;
        }
      } else if (x.isZero()) {
        return new Ctor(x);
      } else if (x.abs().eq(1) && pr + 4 <= PI_PRECISION) {
        r = getPi(Ctor, pr + 4, rm).times(0.25);
        r.s = x.s;
        return r;
      }
      Ctor.precision = wpr = pr + 10;
      Ctor.rounding = 1;
      k = Math.min(28, wpr / LOG_BASE + 2 | 0);
      for (i = k; i; --i) x = x.div(x.times(x).plus(1).sqrt().plus(1));
      external = false;
      j = Math.ceil(wpr / LOG_BASE);
      n = 1;
      x2 = x.times(x);
      r = new Ctor(x);
      px = x;
      for (; i !== -1; ) {
        px = px.times(x2);
        t = r.minus(px.div(n += 2));
        px = px.times(x2);
        r = t.plus(px.div(n += 2));
        if (r.d[j] !== void 0) for (i = j; r.d[i] === t.d[i] && i--; ) ;
      }
      if (k) r = r.times(2 << k - 1);
      external = true;
      return finalise(r, Ctor.precision = pr, Ctor.rounding = rm, true);
    };
    P.isFinite = function() {
      return !!this.d;
    };
    P.isInteger = P.isInt = function() {
      return !!this.d && mathfloor(this.e / LOG_BASE) > this.d.length - 2;
    };
    P.isNaN = function() {
      return !this.s;
    };
    P.isNegative = P.isNeg = function() {
      return this.s < 0;
    };
    P.isPositive = P.isPos = function() {
      return this.s > 0;
    };
    P.isZero = function() {
      return !!this.d && this.d[0] === 0;
    };
    P.lessThan = P.lt = function(y) {
      return this.cmp(y) < 0;
    };
    P.lessThanOrEqualTo = P.lte = function(y) {
      return this.cmp(y) < 1;
    };
    P.logarithm = P.log = function(base) {
      var isBase10, d, denominator, k, inf, num, sd, r, arg = this, Ctor = arg.constructor, pr = Ctor.precision, rm = Ctor.rounding, guard = 5;
      if (base == null) {
        base = new Ctor(10);
        isBase10 = true;
      } else {
        base = new Ctor(base);
        d = base.d;
        if (base.s < 0 || !d || !d[0] || base.eq(1)) return new Ctor(NaN);
        isBase10 = base.eq(10);
      }
      d = arg.d;
      if (arg.s < 0 || !d || !d[0] || arg.eq(1)) {
        return new Ctor(d && !d[0] ? -1 / 0 : arg.s != 1 ? NaN : d ? 0 : 1 / 0);
      }
      if (isBase10) {
        if (d.length > 1) {
          inf = true;
        } else {
          for (k = d[0]; k % 10 === 0; ) k /= 10;
          inf = k !== 1;
        }
      }
      external = false;
      sd = pr + guard;
      num = naturalLogarithm(arg, sd);
      denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
      r = divide(num, denominator, sd, 1);
      if (checkRoundingDigits(r.d, k = pr, rm)) {
        do {
          sd += 10;
          num = naturalLogarithm(arg, sd);
          denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
          r = divide(num, denominator, sd, 1);
          if (!inf) {
            if (+digitsToString(r.d).slice(k + 1, k + 15) + 1 == 1e14) {
              r = finalise(r, pr + 1, 0);
            }
            break;
          }
        } while (checkRoundingDigits(r.d, k += 10, rm));
      }
      external = true;
      return finalise(r, pr, rm);
    };
    P.minus = P.sub = function(y) {
      var d, e, i, j, k, len, pr, rm, xd, xe, xLTy, yd, x = this, Ctor = x.constructor;
      y = new Ctor(y);
      if (!x.d || !y.d) {
        if (!x.s || !y.s) y = new Ctor(NaN);
        else if (x.d) y.s = -y.s;
        else y = new Ctor(y.d || x.s !== y.s ? x : NaN);
        return y;
      }
      if (x.s != y.s) {
        y.s = -y.s;
        return x.plus(y);
      }
      xd = x.d;
      yd = y.d;
      pr = Ctor.precision;
      rm = Ctor.rounding;
      if (!xd[0] || !yd[0]) {
        if (yd[0]) y.s = -y.s;
        else if (xd[0]) y = new Ctor(x);
        else return new Ctor(rm === 3 ? -0 : 0);
        return external ? finalise(y, pr, rm) : y;
      }
      e = mathfloor(y.e / LOG_BASE);
      xe = mathfloor(x.e / LOG_BASE);
      xd = xd.slice();
      k = xe - e;
      if (k) {
        xLTy = k < 0;
        if (xLTy) {
          d = xd;
          k = -k;
          len = yd.length;
        } else {
          d = yd;
          e = xe;
          len = xd.length;
        }
        i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;
        if (k > i) {
          k = i;
          d.length = 1;
        }
        d.reverse();
        for (i = k; i--; ) d.push(0);
        d.reverse();
      } else {
        i = xd.length;
        len = yd.length;
        xLTy = i < len;
        if (xLTy) len = i;
        for (i = 0; i < len; i++) {
          if (xd[i] != yd[i]) {
            xLTy = xd[i] < yd[i];
            break;
          }
        }
        k = 0;
      }
      if (xLTy) {
        d = xd;
        xd = yd;
        yd = d;
        y.s = -y.s;
      }
      len = xd.length;
      for (i = yd.length - len; i > 0; --i) xd[len++] = 0;
      for (i = yd.length; i > k; ) {
        if (xd[--i] < yd[i]) {
          for (j = i; j && xd[--j] === 0; ) xd[j] = BASE - 1;
          --xd[j];
          xd[i] += BASE;
        }
        xd[i] -= yd[i];
      }
      for (; xd[--len] === 0; ) xd.pop();
      for (; xd[0] === 0; xd.shift()) --e;
      if (!xd[0]) return new Ctor(rm === 3 ? -0 : 0);
      y.d = xd;
      y.e = getBase10Exponent(xd, e);
      return external ? finalise(y, pr, rm) : y;
    };
    P.modulo = P.mod = function(y) {
      var q, x = this, Ctor = x.constructor;
      y = new Ctor(y);
      if (!x.d || !y.s || y.d && !y.d[0]) return new Ctor(NaN);
      if (!y.d || x.d && !x.d[0]) {
        return finalise(new Ctor(x), Ctor.precision, Ctor.rounding);
      }
      external = false;
      if (Ctor.modulo == 9) {
        q = divide(x, y.abs(), 0, 3, 1);
        q.s *= y.s;
      } else {
        q = divide(x, y, 0, Ctor.modulo, 1);
      }
      q = q.times(y);
      external = true;
      return x.minus(q);
    };
    P.naturalExponential = P.exp = function() {
      return naturalExponential(this);
    };
    P.naturalLogarithm = P.ln = function() {
      return naturalLogarithm(this);
    };
    P.negated = P.neg = function() {
      var x = new this.constructor(this);
      x.s = -x.s;
      return finalise(x);
    };
    P.plus = P.add = function(y) {
      var carry, d, e, i, k, len, pr, rm, xd, yd, x = this, Ctor = x.constructor;
      y = new Ctor(y);
      if (!x.d || !y.d) {
        if (!x.s || !y.s) y = new Ctor(NaN);
        else if (!x.d) y = new Ctor(y.d || x.s === y.s ? x : NaN);
        return y;
      }
      if (x.s != y.s) {
        y.s = -y.s;
        return x.minus(y);
      }
      xd = x.d;
      yd = y.d;
      pr = Ctor.precision;
      rm = Ctor.rounding;
      if (!xd[0] || !yd[0]) {
        if (!yd[0]) y = new Ctor(x);
        return external ? finalise(y, pr, rm) : y;
      }
      k = mathfloor(x.e / LOG_BASE);
      e = mathfloor(y.e / LOG_BASE);
      xd = xd.slice();
      i = k - e;
      if (i) {
        if (i < 0) {
          d = xd;
          i = -i;
          len = yd.length;
        } else {
          d = yd;
          e = k;
          len = xd.length;
        }
        k = Math.ceil(pr / LOG_BASE);
        len = k > len ? k + 1 : len + 1;
        if (i > len) {
          i = len;
          d.length = 1;
        }
        d.reverse();
        for (; i--; ) d.push(0);
        d.reverse();
      }
      len = xd.length;
      i = yd.length;
      if (len - i < 0) {
        i = len;
        d = yd;
        yd = xd;
        xd = d;
      }
      for (carry = 0; i; ) {
        carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
        xd[i] %= BASE;
      }
      if (carry) {
        xd.unshift(carry);
        ++e;
      }
      for (len = xd.length; xd[--len] == 0; ) xd.pop();
      y.d = xd;
      y.e = getBase10Exponent(xd, e);
      return external ? finalise(y, pr, rm) : y;
    };
    P.precision = P.sd = function(z) {
      var k, x = this;
      if (z !== void 0 && z !== !!z && z !== 1 && z !== 0) throw Error(invalidArgument + z);
      if (x.d) {
        k = getPrecision(x.d);
        if (z && x.e + 1 > k) k = x.e + 1;
      } else {
        k = NaN;
      }
      return k;
    };
    P.round = function() {
      var x = this, Ctor = x.constructor;
      return finalise(new Ctor(x), x.e + 1, Ctor.rounding);
    };
    P.sine = P.sin = function() {
      var pr, rm, x = this, Ctor = x.constructor;
      if (!x.isFinite()) return new Ctor(NaN);
      if (x.isZero()) return new Ctor(x);
      pr = Ctor.precision;
      rm = Ctor.rounding;
      Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
      Ctor.rounding = 1;
      x = sine(Ctor, toLessThanHalfPi(Ctor, x));
      Ctor.precision = pr;
      Ctor.rounding = rm;
      return finalise(quadrant > 2 ? x.neg() : x, pr, rm, true);
    };
    P.squareRoot = P.sqrt = function() {
      var m, n, sd, r, rep, t, x = this, d = x.d, e = x.e, s = x.s, Ctor = x.constructor;
      if (s !== 1 || !d || !d[0]) {
        return new Ctor(!s || s < 0 && (!d || d[0]) ? NaN : d ? x : 1 / 0);
      }
      external = false;
      s = Math.sqrt(+x);
      if (s == 0 || s == 1 / 0) {
        n = digitsToString(d);
        if ((n.length + e) % 2 == 0) n += "0";
        s = Math.sqrt(n);
        e = mathfloor((e + 1) / 2) - (e < 0 || e % 2);
        if (s == 1 / 0) {
          n = "5e" + e;
        } else {
          n = s.toExponential();
          n = n.slice(0, n.indexOf("e") + 1) + e;
        }
        r = new Ctor(n);
      } else {
        r = new Ctor(s.toString());
      }
      sd = (e = Ctor.precision) + 3;
      for (; ; ) {
        t = r;
        r = t.plus(divide(x, t, sd + 2, 1)).times(0.5);
        if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
          n = n.slice(sd - 3, sd + 1);
          if (n == "9999" || !rep && n == "4999") {
            if (!rep) {
              finalise(t, e + 1, 0);
              if (t.times(t).eq(x)) {
                r = t;
                break;
              }
            }
            sd += 4;
            rep = 1;
          } else {
            if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
              finalise(r, e + 1, 1);
              m = !r.times(r).eq(x);
            }
            break;
          }
        }
      }
      external = true;
      return finalise(r, e, Ctor.rounding, m);
    };
    P.tangent = P.tan = function() {
      var pr, rm, x = this, Ctor = x.constructor;
      if (!x.isFinite()) return new Ctor(NaN);
      if (x.isZero()) return new Ctor(x);
      pr = Ctor.precision;
      rm = Ctor.rounding;
      Ctor.precision = pr + 10;
      Ctor.rounding = 1;
      x = x.sin();
      x.s = 1;
      x = divide(x, new Ctor(1).minus(x.times(x)).sqrt(), pr + 10, 0);
      Ctor.precision = pr;
      Ctor.rounding = rm;
      return finalise(quadrant == 2 || quadrant == 4 ? x.neg() : x, pr, rm, true);
    };
    P.times = P.mul = function(y) {
      var carry, e, i, k, r, rL, t, xdL, ydL, x = this, Ctor = x.constructor, xd = x.d, yd = (y = new Ctor(y)).d;
      y.s *= x.s;
      if (!xd || !xd[0] || !yd || !yd[0]) {
        return new Ctor(!y.s || xd && !xd[0] && !yd || yd && !yd[0] && !xd ? NaN : !xd || !yd ? y.s / 0 : y.s * 0);
      }
      e = mathfloor(x.e / LOG_BASE) + mathfloor(y.e / LOG_BASE);
      xdL = xd.length;
      ydL = yd.length;
      if (xdL < ydL) {
        r = xd;
        xd = yd;
        yd = r;
        rL = xdL;
        xdL = ydL;
        ydL = rL;
      }
      r = [];
      rL = xdL + ydL;
      for (i = rL; i--; ) r.push(0);
      for (i = ydL; --i >= 0; ) {
        carry = 0;
        for (k = xdL + i; k > i; ) {
          t = r[k] + yd[i] * xd[k - i - 1] + carry;
          r[k--] = t % BASE | 0;
          carry = t / BASE | 0;
        }
        r[k] = (r[k] + carry) % BASE | 0;
      }
      for (; !r[--rL]; ) r.pop();
      if (carry) ++e;
      else r.shift();
      y.d = r;
      y.e = getBase10Exponent(r, e);
      return external ? finalise(y, Ctor.precision, Ctor.rounding) : y;
    };
    P.toBinary = function(sd, rm) {
      return toStringBinary(this, 2, sd, rm);
    };
    P.toDecimalPlaces = P.toDP = function(dp, rm) {
      var x = this, Ctor = x.constructor;
      x = new Ctor(x);
      if (dp === void 0) return x;
      checkInt32(dp, 0, MAX_DIGITS);
      if (rm === void 0) rm = Ctor.rounding;
      else checkInt32(rm, 0, 8);
      return finalise(x, dp + x.e + 1, rm);
    };
    P.toExponential = function(dp, rm) {
      var str, x = this, Ctor = x.constructor;
      if (dp === void 0) {
        str = finiteToString(x, true);
      } else {
        checkInt32(dp, 0, MAX_DIGITS);
        if (rm === void 0) rm = Ctor.rounding;
        else checkInt32(rm, 0, 8);
        x = finalise(new Ctor(x), dp + 1, rm);
        str = finiteToString(x, true, dp + 1);
      }
      return x.isNeg() && !x.isZero() ? "-" + str : str;
    };
    P.toFixed = function(dp, rm) {
      var str, y, x = this, Ctor = x.constructor;
      if (dp === void 0) {
        str = finiteToString(x);
      } else {
        checkInt32(dp, 0, MAX_DIGITS);
        if (rm === void 0) rm = Ctor.rounding;
        else checkInt32(rm, 0, 8);
        y = finalise(new Ctor(x), dp + x.e + 1, rm);
        str = finiteToString(y, false, dp + y.e + 1);
      }
      return x.isNeg() && !x.isZero() ? "-" + str : str;
    };
    P.toFraction = function(maxD) {
      var d, d0, d1, d2, e, k, n, n0, n1, pr, q, r, x = this, xd = x.d, Ctor = x.constructor;
      if (!xd) return new Ctor(x);
      n1 = d0 = new Ctor(1);
      d1 = n0 = new Ctor(0);
      d = new Ctor(d1);
      e = d.e = getPrecision(xd) - x.e - 1;
      k = e % LOG_BASE;
      d.d[0] = mathpow(10, k < 0 ? LOG_BASE + k : k);
      if (maxD == null) {
        maxD = e > 0 ? d : n1;
      } else {
        n = new Ctor(maxD);
        if (!n.isInt() || n.lt(n1)) throw Error(invalidArgument + n);
        maxD = n.gt(d) ? e > 0 ? d : n1 : n;
      }
      external = false;
      n = new Ctor(digitsToString(xd));
      pr = Ctor.precision;
      Ctor.precision = e = xd.length * LOG_BASE * 2;
      for (; ; ) {
        q = divide(n, d, 0, 1, 1);
        d2 = d0.plus(q.times(d1));
        if (d2.cmp(maxD) == 1) break;
        d0 = d1;
        d1 = d2;
        d2 = n1;
        n1 = n0.plus(q.times(d2));
        n0 = d2;
        d2 = d;
        d = n.minus(q.times(d2));
        n = d2;
      }
      d2 = divide(maxD.minus(d0), d1, 0, 1, 1);
      n0 = n0.plus(d2.times(n1));
      d0 = d0.plus(d2.times(d1));
      n0.s = n1.s = x.s;
      r = divide(n1, d1, e, 1).minus(x).abs().cmp(divide(n0, d0, e, 1).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0];
      Ctor.precision = pr;
      external = true;
      return r;
    };
    P.toHexadecimal = P.toHex = function(sd, rm) {
      return toStringBinary(this, 16, sd, rm);
    };
    P.toNearest = function(y, rm) {
      var x = this, Ctor = x.constructor;
      x = new Ctor(x);
      if (y == null) {
        if (!x.d) return x;
        y = new Ctor(1);
        rm = Ctor.rounding;
      } else {
        y = new Ctor(y);
        if (rm === void 0) {
          rm = Ctor.rounding;
        } else {
          checkInt32(rm, 0, 8);
        }
        if (!x.d) return y.s ? x : y;
        if (!y.d) {
          if (y.s) y.s = x.s;
          return y;
        }
      }
      if (y.d[0]) {
        external = false;
        x = divide(x, y, 0, rm, 1).times(y);
        external = true;
        finalise(x);
      } else {
        y.s = x.s;
        x = y;
      }
      return x;
    };
    P.toNumber = function() {
      return +this;
    };
    P.toOctal = function(sd, rm) {
      return toStringBinary(this, 8, sd, rm);
    };
    P.toPower = P.pow = function(y) {
      var e, k, pr, r, rm, s, x = this, Ctor = x.constructor, yn = +(y = new Ctor(y));
      if (!x.d || !y.d || !x.d[0] || !y.d[0]) return new Ctor(mathpow(+x, yn));
      x = new Ctor(x);
      if (x.eq(1)) return x;
      pr = Ctor.precision;
      rm = Ctor.rounding;
      if (y.eq(1)) return finalise(x, pr, rm);
      e = mathfloor(y.e / LOG_BASE);
      if (e >= y.d.length - 1 && (k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
        r = intPow(Ctor, x, k, pr);
        return y.s < 0 ? new Ctor(1).div(r) : finalise(r, pr, rm);
      }
      s = x.s;
      if (s < 0) {
        if (e < y.d.length - 1) return new Ctor(NaN);
        if ((y.d[e] & 1) == 0) s = 1;
        if (x.e == 0 && x.d[0] == 1 && x.d.length == 1) {
          x.s = s;
          return x;
        }
      }
      k = mathpow(+x, yn);
      e = k == 0 || !isFinite(k) ? mathfloor(yn * (Math.log("0." + digitsToString(x.d)) / Math.LN10 + x.e + 1)) : new Ctor(k + "").e;
      if (e > Ctor.maxE + 1 || e < Ctor.minE - 1) return new Ctor(e > 0 ? s / 0 : 0);
      external = false;
      Ctor.rounding = x.s = 1;
      k = Math.min(12, (e + "").length);
      r = naturalExponential(y.times(naturalLogarithm(x, pr + k)), pr);
      if (r.d) {
        r = finalise(r, pr + 5, 1);
        if (checkRoundingDigits(r.d, pr, rm)) {
          e = pr + 10;
          r = finalise(naturalExponential(y.times(naturalLogarithm(x, e + k)), e), e + 5, 1);
          if (+digitsToString(r.d).slice(pr + 1, pr + 15) + 1 == 1e14) {
            r = finalise(r, pr + 1, 0);
          }
        }
      }
      r.s = s;
      external = true;
      Ctor.rounding = rm;
      return finalise(r, pr, rm);
    };
    P.toPrecision = function(sd, rm) {
      var str, x = this, Ctor = x.constructor;
      if (sd === void 0) {
        str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
      } else {
        checkInt32(sd, 1, MAX_DIGITS);
        if (rm === void 0) rm = Ctor.rounding;
        else checkInt32(rm, 0, 8);
        x = finalise(new Ctor(x), sd, rm);
        str = finiteToString(x, sd <= x.e || x.e <= Ctor.toExpNeg, sd);
      }
      return x.isNeg() && !x.isZero() ? "-" + str : str;
    };
    P.toSignificantDigits = P.toSD = function(sd, rm) {
      var x = this, Ctor = x.constructor;
      if (sd === void 0) {
        sd = Ctor.precision;
        rm = Ctor.rounding;
      } else {
        checkInt32(sd, 1, MAX_DIGITS);
        if (rm === void 0) rm = Ctor.rounding;
        else checkInt32(rm, 0, 8);
      }
      return finalise(new Ctor(x), sd, rm);
    };
    P.toString = function() {
      var x = this, Ctor = x.constructor, str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
      return x.isNeg() && !x.isZero() ? "-" + str : str;
    };
    P.truncated = P.trunc = function() {
      return finalise(new this.constructor(this), this.e + 1, 1);
    };
    P.valueOf = P.toJSON = function() {
      var x = this, Ctor = x.constructor, str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
      return x.isNeg() ? "-" + str : str;
    };
    divide = /* @__PURE__ */ function() {
      function multiplyInteger(x, k, base) {
        var temp, carry = 0, i = x.length;
        for (x = x.slice(); i--; ) {
          temp = x[i] * k + carry;
          x[i] = temp % base | 0;
          carry = temp / base | 0;
        }
        if (carry) x.unshift(carry);
        return x;
      }
      function compare(a, b, aL, bL) {
        var i, r;
        if (aL != bL) {
          r = aL > bL ? 1 : -1;
        } else {
          for (i = r = 0; i < aL; i++) {
            if (a[i] != b[i]) {
              r = a[i] > b[i] ? 1 : -1;
              break;
            }
          }
        }
        return r;
      }
      function subtract(a, b, aL, base) {
        var i = 0;
        for (; aL--; ) {
          a[aL] -= i;
          i = a[aL] < b[aL] ? 1 : 0;
          a[aL] = i * base + a[aL] - b[aL];
        }
        for (; !a[0] && a.length > 1; ) a.shift();
      }
      return function(x, y, pr, rm, dp, base) {
        var cmp, e, i, k, logBase, more, prod, prodL, q, qd, rem, remL, rem0, sd, t, xi, xL, yd0, yL, yz, Ctor = x.constructor, sign2 = x.s == y.s ? 1 : -1, xd = x.d, yd = y.d;
        if (!xd || !xd[0] || !yd || !yd[0]) {
          return new Ctor(
            // Return NaN if either NaN, or both Infinity or 0.
            !x.s || !y.s || (xd ? yd && xd[0] == yd[0] : !yd) ? NaN : (
              // Return ±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
              xd && xd[0] == 0 || !yd ? sign2 * 0 : sign2 / 0
            )
          );
        }
        if (base) {
          logBase = 1;
          e = x.e - y.e;
        } else {
          base = BASE;
          logBase = LOG_BASE;
          e = mathfloor(x.e / logBase) - mathfloor(y.e / logBase);
        }
        yL = yd.length;
        xL = xd.length;
        q = new Ctor(sign2);
        qd = q.d = [];
        for (i = 0; yd[i] == (xd[i] || 0); i++) ;
        if (yd[i] > (xd[i] || 0)) e--;
        if (pr == null) {
          sd = pr = Ctor.precision;
          rm = Ctor.rounding;
        } else if (dp) {
          sd = pr + (x.e - y.e) + 1;
        } else {
          sd = pr;
        }
        if (sd < 0) {
          qd.push(1);
          more = true;
        } else {
          sd = sd / logBase + 2 | 0;
          i = 0;
          if (yL == 1) {
            k = 0;
            yd = yd[0];
            sd++;
            for (; (i < xL || k) && sd--; i++) {
              t = k * base + (xd[i] || 0);
              qd[i] = t / yd | 0;
              k = t % yd | 0;
            }
            more = k || i < xL;
          } else {
            k = base / (yd[0] + 1) | 0;
            if (k > 1) {
              yd = multiplyInteger(yd, k, base);
              xd = multiplyInteger(xd, k, base);
              yL = yd.length;
              xL = xd.length;
            }
            xi = yL;
            rem = xd.slice(0, yL);
            remL = rem.length;
            for (; remL < yL; ) rem[remL++] = 0;
            yz = yd.slice();
            yz.unshift(0);
            yd0 = yd[0];
            if (yd[1] >= base / 2) ++yd0;
            do {
              k = 0;
              cmp = compare(yd, rem, yL, remL);
              if (cmp < 0) {
                rem0 = rem[0];
                if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);
                k = rem0 / yd0 | 0;
                if (k > 1) {
                  if (k >= base) k = base - 1;
                  prod = multiplyInteger(yd, k, base);
                  prodL = prod.length;
                  remL = rem.length;
                  cmp = compare(prod, rem, prodL, remL);
                  if (cmp == 1) {
                    k--;
                    subtract(prod, yL < prodL ? yz : yd, prodL, base);
                  }
                } else {
                  if (k == 0) cmp = k = 1;
                  prod = yd.slice();
                }
                prodL = prod.length;
                if (prodL < remL) prod.unshift(0);
                subtract(rem, prod, remL, base);
                if (cmp == -1) {
                  remL = rem.length;
                  cmp = compare(yd, rem, yL, remL);
                  if (cmp < 1) {
                    k++;
                    subtract(rem, yL < remL ? yz : yd, remL, base);
                  }
                }
                remL = rem.length;
              } else if (cmp === 0) {
                k++;
                rem = [0];
              }
              qd[i++] = k;
              if (cmp && rem[0]) {
                rem[remL++] = xd[xi] || 0;
              } else {
                rem = [xd[xi]];
                remL = 1;
              }
            } while ((xi++ < xL || rem[0] !== void 0) && sd--);
            more = rem[0] !== void 0;
          }
          if (!qd[0]) qd.shift();
        }
        if (logBase == 1) {
          q.e = e;
          inexact = more;
        } else {
          for (i = 1, k = qd[0]; k >= 10; k /= 10) i++;
          q.e = i + e * logBase - 1;
          finalise(q, dp ? pr + q.e + 1 : pr, rm, more);
        }
        return q;
      };
    }();
    P[Symbol.for("nodejs.util.inspect.custom")] = P.toString;
    P[Symbol.toStringTag] = "Decimal";
    Decimal = P.constructor = clone(DEFAULTS);
    LN10 = new Decimal(LN10);
    PI = new Decimal(PI);
    decimal_default = Decimal;
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/constants.js
var TEN, ZERO, NEGATIVE_ZERO;
var init_constants = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/constants.js"() {
    init_decimal();
    TEN = new decimal_default(10);
    ZERO = new decimal_default(0);
    NEGATIVE_ZERO = new decimal_default(-0);
  }
});

// ../../node_modules/@formatjs/fast-memoize/lib/index.js
function memoize(fn, options) {
  var cache = options && options.cache ? options.cache : cacheDefault;
  var serializer = options && options.serializer ? options.serializer : serializerDefault;
  var strategy = options && options.strategy ? options.strategy : strategyDefault;
  return strategy(fn, {
    cache,
    serializer
  });
}
function isPrimitive(value) {
  return value == null || typeof value === "number" || typeof value === "boolean";
}
function monadic(fn, cache, serializer, arg) {
  var cacheKey = isPrimitive(arg) ? arg : serializer(arg);
  var computedValue = cache.get(cacheKey);
  if (typeof computedValue === "undefined") {
    computedValue = fn.call(this, arg);
    cache.set(cacheKey, computedValue);
  }
  return computedValue;
}
function variadic(fn, cache, serializer) {
  var args = Array.prototype.slice.call(arguments, 3);
  var cacheKey = serializer(args);
  var computedValue = cache.get(cacheKey);
  if (typeof computedValue === "undefined") {
    computedValue = fn.apply(this, args);
    cache.set(cacheKey, computedValue);
  }
  return computedValue;
}
function assemble(fn, context, strategy, cache, serialize) {
  return strategy.bind(context, fn, cache, serialize);
}
function strategyDefault(fn, options) {
  var strategy = fn.length === 1 ? monadic : variadic;
  return assemble(fn, this, strategy, options.cache.create(), options.serializer);
}
function strategyVariadic(fn, options) {
  return assemble(fn, this, variadic, options.cache.create(), options.serializer);
}
function strategyMonadic(fn, options) {
  return assemble(fn, this, monadic, options.cache.create(), options.serializer);
}
var serializerDefault, ObjectWithoutPrototypeCache, cacheDefault, strategies;
var init_lib2 = __esm({
  "../../node_modules/@formatjs/fast-memoize/lib/index.js"() {
    serializerDefault = function() {
      return JSON.stringify(arguments);
    };
    ObjectWithoutPrototypeCache = /** @class */
    function() {
      function ObjectWithoutPrototypeCache2() {
        this.cache = /* @__PURE__ */ Object.create(null);
      }
      ObjectWithoutPrototypeCache2.prototype.get = function(key) {
        return this.cache[key];
      };
      ObjectWithoutPrototypeCache2.prototype.set = function(key, value) {
        this.cache[key] = value;
      };
      return ObjectWithoutPrototypeCache2;
    }();
    cacheDefault = {
      create: function create() {
        return new ObjectWithoutPrototypeCache();
      }
    };
    strategies = {
      variadic: strategyVariadic,
      monadic: strategyMonadic
    };
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/utils.js
function repeat(s, times) {
  if (typeof s.repeat === "function") {
    return s.repeat(times);
  }
  var arr = new Array(times);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = s;
  }
  return arr.join("");
}
function setInternalSlot(map, pl, field, value) {
  if (!map.get(pl)) {
    map.set(pl, /* @__PURE__ */ Object.create(null));
  }
  var slots = map.get(pl);
  slots[field] = value;
}
function setMultiInternalSlots(map, pl, props) {
  for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
    var k = _a[_i];
    setInternalSlot(map, pl, k, props[k]);
  }
}
function getInternalSlot(map, pl, field) {
  return getMultiInternalSlots(map, pl, field)[field];
}
function getMultiInternalSlots(map, pl) {
  var fields = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    fields[_i - 2] = arguments[_i];
  }
  var slots = map.get(pl);
  if (!slots) {
    throw new TypeError("".concat(pl, " InternalSlot has not been initialized"));
  }
  return fields.reduce(function(all, f) {
    all[f] = slots[f];
    return all;
  }, /* @__PURE__ */ Object.create(null));
}
function isLiteralPart(patternPart) {
  return patternPart.type === "literal";
}
function defineProperty(target, name, _a) {
  var value = _a.value;
  Object.defineProperty(target, name, {
    configurable: true,
    enumerable: false,
    writable: true,
    value
  });
}
function createDataProperty(target, name, value) {
  Object.defineProperty(target, name, {
    configurable: true,
    enumerable: true,
    writable: true,
    value
  });
}
function invariant(condition, message, Err) {
  if (Err === void 0) {
    Err = Error;
  }
  if (!condition) {
    throw new Err(message);
  }
}
var createMemoizedNumberFormat, createMemoizedDateTimeFormat, createMemoizedPluralRules, createMemoizedLocale, createMemoizedListFormat;
var init_utils = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/utils.js"() {
    init_tslib_es6();
    init_lib2();
    createMemoizedNumberFormat = memoize(function() {
      var _a;
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return new ((_a = Intl.NumberFormat).bind.apply(_a, __spreadArray([void 0], args, false)))();
    }, {
      strategy: strategies.variadic
    });
    createMemoizedDateTimeFormat = memoize(function() {
      var _a;
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return new ((_a = Intl.DateTimeFormat).bind.apply(_a, __spreadArray([void 0], args, false)))();
    }, {
      strategy: strategies.variadic
    });
    createMemoizedPluralRules = memoize(function() {
      var _a;
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return new ((_a = Intl.PluralRules).bind.apply(_a, __spreadArray([void 0], args, false)))();
    }, {
      strategy: strategies.variadic
    });
    createMemoizedLocale = memoize(function() {
      var _a;
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return new ((_a = Intl.Locale).bind.apply(_a, __spreadArray([void 0], args, false)))();
    }, {
      strategy: strategies.variadic
    });
    createMemoizedListFormat = memoize(function() {
      var _a;
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return new ((_a = Intl.ListFormat).bind.apply(_a, __spreadArray([void 0], args, false)))();
    }, {
      strategy: strategies.variadic
    });
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/262.js
function ToString(o) {
  if (typeof o === "symbol") {
    throw TypeError("Cannot convert a Symbol value to a string");
  }
  return String(o);
}
function ToNumber(arg) {
  if (typeof arg === "number") {
    return new Decimal(arg);
  }
  invariant(typeof arg !== "bigint" && typeof arg !== "symbol", "BigInt and Symbol are not supported", TypeError);
  if (arg === void 0) {
    return new Decimal(NaN);
  }
  if (arg === null || arg === 0) {
    return ZERO;
  }
  if (arg === true) {
    return new Decimal(1);
  }
  if (typeof arg === "string") {
    try {
      return new Decimal(arg);
    } catch (e) {
      return new Decimal(NaN);
    }
  }
  invariant(typeof arg === "object", "object expected", TypeError);
  var primValue = ToPrimitive(arg, "number");
  invariant(typeof primValue !== "object", "object expected", TypeError);
  return ToNumber(primValue);
}
function ToInteger(n) {
  var number = ToNumber(n);
  if (number.isNaN() || number.isZero()) {
    return ZERO;
  }
  if (number.isFinite()) {
    return number;
  }
  var integer = number.abs().floor();
  if (number.isNegative()) {
    integer = integer.negated();
  }
  return integer;
}
function TimeClip(time) {
  if (!time.isFinite()) {
    return new Decimal(NaN);
  }
  if (time.abs().greaterThan(8.64 * 1e15)) {
    return new Decimal(NaN);
  }
  return ToInteger(time);
}
function ToObject(arg) {
  if (arg == null) {
    throw new TypeError("undefined/null cannot be converted to object");
  }
  return Object(arg);
}
function SameValue(x, y) {
  if (Object.is) {
    return Object.is(x, y);
  }
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  }
  return x !== x && y !== y;
}
function ArrayCreate(len) {
  return new Array(len);
}
function HasOwnProperty(o, prop) {
  return Object.prototype.hasOwnProperty.call(o, prop);
}
function Type(x) {
  if (x === null) {
    return "Null";
  }
  if (typeof x === "undefined") {
    return "Undefined";
  }
  if (typeof x === "function" || typeof x === "object") {
    return "Object";
  }
  if (typeof x === "number") {
    return "Number";
  }
  if (typeof x === "boolean") {
    return "Boolean";
  }
  if (typeof x === "string") {
    return "String";
  }
  if (typeof x === "symbol") {
    return "Symbol";
  }
  if (typeof x === "bigint") {
    return "BigInt";
  }
}
function mod2(x, y) {
  return x - Math.floor(x / y) * y;
}
function Day(t) {
  return Math.floor(t / MS_PER_DAY);
}
function WeekDay(t) {
  return mod2(Day(t) + 4, 7);
}
function DayFromYear(y) {
  return Date.UTC(y, 0) / MS_PER_DAY;
}
function TimeFromYear(y) {
  return Date.UTC(y, 0);
}
function YearFromTime(t) {
  return new Date(t).getUTCFullYear();
}
function DaysInYear(y) {
  if (y % 4 !== 0) {
    return 365;
  }
  if (y % 100 !== 0) {
    return 366;
  }
  if (y % 400 !== 0) {
    return 365;
  }
  return 366;
}
function DayWithinYear(t) {
  return Day(t) - DayFromYear(YearFromTime(t));
}
function InLeapYear(t) {
  return DaysInYear(YearFromTime(t)) === 365 ? 0 : 1;
}
function MonthFromTime(t) {
  var dwy = DayWithinYear(t);
  var leap = InLeapYear(t);
  if (dwy >= 0 && dwy < 31) {
    return 0;
  }
  if (dwy < 59 + leap) {
    return 1;
  }
  if (dwy < 90 + leap) {
    return 2;
  }
  if (dwy < 120 + leap) {
    return 3;
  }
  if (dwy < 151 + leap) {
    return 4;
  }
  if (dwy < 181 + leap) {
    return 5;
  }
  if (dwy < 212 + leap) {
    return 6;
  }
  if (dwy < 243 + leap) {
    return 7;
  }
  if (dwy < 273 + leap) {
    return 8;
  }
  if (dwy < 304 + leap) {
    return 9;
  }
  if (dwy < 334 + leap) {
    return 10;
  }
  if (dwy < 365 + leap) {
    return 11;
  }
  throw new Error("Invalid time");
}
function DateFromTime(t) {
  var dwy = DayWithinYear(t);
  var mft = MonthFromTime(t);
  var leap = InLeapYear(t);
  if (mft === 0) {
    return dwy + 1;
  }
  if (mft === 1) {
    return dwy - 30;
  }
  if (mft === 2) {
    return dwy - 58 - leap;
  }
  if (mft === 3) {
    return dwy - 89 - leap;
  }
  if (mft === 4) {
    return dwy - 119 - leap;
  }
  if (mft === 5) {
    return dwy - 150 - leap;
  }
  if (mft === 6) {
    return dwy - 180 - leap;
  }
  if (mft === 7) {
    return dwy - 211 - leap;
  }
  if (mft === 8) {
    return dwy - 242 - leap;
  }
  if (mft === 9) {
    return dwy - 272 - leap;
  }
  if (mft === 10) {
    return dwy - 303 - leap;
  }
  if (mft === 11) {
    return dwy - 333 - leap;
  }
  throw new Error("Invalid time");
}
function HourFromTime(t) {
  return mod2(Math.floor(t / MS_PER_HOUR), HOURS_PER_DAY);
}
function MinFromTime(t) {
  return mod2(Math.floor(t / MS_PER_MINUTE), MINUTES_PER_HOUR);
}
function SecFromTime(t) {
  return mod2(Math.floor(t / MS_PER_SECOND), SECONDS_PER_MINUTE);
}
function IsCallable(fn) {
  return typeof fn === "function";
}
function OrdinaryHasInstance(C, O, internalSlots) {
  if (!IsCallable(C)) {
    return false;
  }
  if (internalSlots === null || internalSlots === void 0 ? void 0 : internalSlots.boundTargetFunction) {
    var BC = internalSlots === null || internalSlots === void 0 ? void 0 : internalSlots.boundTargetFunction;
    return O instanceof BC;
  }
  if (typeof O !== "object") {
    return false;
  }
  var P2 = C.prototype;
  if (typeof P2 !== "object") {
    throw new TypeError("OrdinaryHasInstance called on an object with an invalid prototype property.");
  }
  return Object.prototype.isPrototypeOf.call(P2, O);
}
function msFromTime(t) {
  return mod2(t, MS_PER_SECOND);
}
function OrdinaryToPrimitive(O, hint) {
  var methodNames;
  if (hint === "string") {
    methodNames = ["toString", "valueOf"];
  } else {
    methodNames = ["valueOf", "toString"];
  }
  for (var _i = 0, methodNames_1 = methodNames; _i < methodNames_1.length; _i++) {
    var name_1 = methodNames_1[_i];
    var method = O[name_1];
    if (IsCallable(method)) {
      var result = method.call(O);
      if (typeof result !== "object") {
        return result;
      }
    }
  }
  throw new TypeError("Cannot convert object to primitive value");
}
function ToPrimitive(input, preferredType) {
  if (typeof input === "object" && input != null) {
    var exoticToPrim = Symbol.toPrimitive in input ? input[Symbol.toPrimitive] : void 0;
    var hint = void 0;
    if (exoticToPrim !== void 0) {
      if (preferredType === void 0) {
        hint = "default";
      } else if (preferredType === "string") {
        hint = "string";
      } else {
        invariant(preferredType === "number", 'preferredType must be "string" or "number"');
        hint = "number";
      }
      var result = exoticToPrim.call(input, hint);
      if (typeof result !== "object") {
        return result;
      }
      throw new TypeError("Cannot convert exotic object to primitive.");
    }
    if (preferredType === void 0) {
      preferredType = "number";
    }
    return OrdinaryToPrimitive(input, preferredType);
  }
  return input;
}
var MS_PER_DAY, HOURS_PER_DAY, MINUTES_PER_HOUR, SECONDS_PER_MINUTE, MS_PER_SECOND, MS_PER_MINUTE, MS_PER_HOUR;
var init__ = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/262.js"() {
    init_decimal();
    init_constants();
    init_utils();
    MS_PER_DAY = 864e5;
    HOURS_PER_DAY = 24;
    MINUTES_PER_HOUR = 60;
    SECONDS_PER_MINUTE = 60;
    MS_PER_SECOND = 1e3;
    MS_PER_MINUTE = MS_PER_SECOND * SECONDS_PER_MINUTE;
    MS_PER_HOUR = MS_PER_MINUTE * MINUTES_PER_HOUR;
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/CoerceOptionsToObject.js
function CoerceOptionsToObject(options) {
  if (typeof options === "undefined") {
    return /* @__PURE__ */ Object.create(null);
  }
  return ToObject(options);
}
var init_CoerceOptionsToObject = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/CoerceOptionsToObject.js"() {
    init__();
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/DefaultNumberOption.js
function DefaultNumberOption(inputVal, min2, max2, fallback) {
  if (inputVal === void 0) {
    return fallback;
  }
  var val = Number(inputVal);
  if (isNaN(val) || val < min2 || val > max2) {
    throw new RangeError("".concat(val, " is outside of range [").concat(min2, ", ").concat(max2, "]"));
  }
  return Math.floor(val);
}
var init_DefaultNumberOption = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/DefaultNumberOption.js"() {
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/GetNumberOption.js
function GetNumberOption(options, property, minimum, maximum, fallback) {
  var val = options[property];
  return DefaultNumberOption(val, minimum, maximum, fallback);
}
var init_GetNumberOption = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/GetNumberOption.js"() {
    init_DefaultNumberOption();
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/GetOption.js
function GetOption(opts, prop, type, values, fallback) {
  if (typeof opts !== "object") {
    throw new TypeError("Options must be an object");
  }
  var value = opts[prop];
  if (value !== void 0) {
    if (type !== "boolean" && type !== "string") {
      throw new TypeError("invalid type");
    }
    if (type === "boolean") {
      value = Boolean(value);
    }
    if (type === "string") {
      value = ToString(value);
    }
    if (values !== void 0 && !values.filter(function(val) {
      return val == value;
    }).length) {
      throw new RangeError("".concat(value, " is not within ").concat(values.join(", ")));
    }
    return value;
  }
  return fallback;
}
var init_GetOption = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/GetOption.js"() {
    init__();
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/GetOptionsObject.js
function GetOptionsObject(options) {
  if (typeof options === "undefined") {
    return /* @__PURE__ */ Object.create(null);
  }
  if (typeof options === "object") {
    return options;
  }
  throw new TypeError("Options must be an object");
}
var init_GetOptionsObject = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/GetOptionsObject.js"() {
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/GetStringOrBooleanOption.js
function GetStringOrBooleanOption(opts, prop, values, trueValue, falsyValue, fallback) {
  var value = opts[prop];
  if (value === void 0) {
    return fallback;
  }
  if (value === true) {
    return trueValue;
  }
  var valueBoolean = Boolean(value);
  if (valueBoolean === false) {
    return falsyValue;
  }
  value = ToString(value);
  if (value === "true" || value === "false") {
    return fallback;
  }
  if ((values || []).indexOf(value) === -1) {
    throw new RangeError("Invalid value ".concat(value));
  }
  return value;
}
var init_GetStringOrBooleanOption = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/GetStringOrBooleanOption.js"() {
    init__();
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/IsSanctionedSimpleUnitIdentifier.js
function removeUnitNamespace(unit) {
  return unit.slice(unit.indexOf("-") + 1);
}
function IsSanctionedSimpleUnitIdentifier(unitIdentifier) {
  return SIMPLE_UNITS.indexOf(unitIdentifier) > -1;
}
var SANCTIONED_UNITS, SIMPLE_UNITS;
var init_IsSanctionedSimpleUnitIdentifier = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/IsSanctionedSimpleUnitIdentifier.js"() {
    SANCTIONED_UNITS = [
      "angle-degree",
      "area-acre",
      "area-hectare",
      "concentr-percent",
      "digital-bit",
      "digital-byte",
      "digital-gigabit",
      "digital-gigabyte",
      "digital-kilobit",
      "digital-kilobyte",
      "digital-megabit",
      "digital-megabyte",
      "digital-petabyte",
      "digital-terabit",
      "digital-terabyte",
      "duration-day",
      "duration-hour",
      "duration-millisecond",
      "duration-minute",
      "duration-month",
      "duration-second",
      "duration-week",
      "duration-year",
      "length-centimeter",
      "length-foot",
      "length-inch",
      "length-kilometer",
      "length-meter",
      "length-mile-scandinavian",
      "length-mile",
      "length-millimeter",
      "length-yard",
      "mass-gram",
      "mass-kilogram",
      "mass-ounce",
      "mass-pound",
      "mass-stone",
      "temperature-celsius",
      "temperature-fahrenheit",
      "volume-fluid-ounce",
      "volume-gallon",
      "volume-liter",
      "volume-milliliter"
    ];
    SIMPLE_UNITS = SANCTIONED_UNITS.map(removeUnitNamespace);
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/IsValidTimeZoneName.js
function IsValidTimeZoneName(tz, _a) {
  var zoneNamesFromData = _a.zoneNamesFromData, uppercaseLinks = _a.uppercaseLinks;
  var uppercasedTz = tz.toUpperCase();
  var zoneNames = /* @__PURE__ */ new Set();
  var linkNames = /* @__PURE__ */ new Set();
  zoneNamesFromData.map(function(z) {
    return z.toUpperCase();
  }).forEach(function(z) {
    return zoneNames.add(z);
  });
  Object.keys(uppercaseLinks).forEach(function(linkName) {
    linkNames.add(linkName.toUpperCase());
    zoneNames.add(uppercaseLinks[linkName].toUpperCase());
  });
  return zoneNames.has(uppercasedTz) || linkNames.has(uppercasedTz);
}
var init_IsValidTimeZoneName = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/IsValidTimeZoneName.js"() {
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/IsWellFormedCurrencyCode.js
function toUpperCase(str) {
  return str.replace(/([a-z])/g, function(_, c) {
    return c.toUpperCase();
  });
}
function IsWellFormedCurrencyCode(currency) {
  currency = toUpperCase(currency);
  if (currency.length !== 3) {
    return false;
  }
  if (NOT_A_Z_REGEX.test(currency)) {
    return false;
  }
  return true;
}
var NOT_A_Z_REGEX;
var init_IsWellFormedCurrencyCode = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/IsWellFormedCurrencyCode.js"() {
    NOT_A_Z_REGEX = /[^A-Z]/;
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/IsWellFormedUnitIdentifier.js
function toLowerCase(str) {
  return str.replace(/([A-Z])/g, function(_, c) {
    return c.toLowerCase();
  });
}
function IsWellFormedUnitIdentifier(unit) {
  unit = toLowerCase(unit);
  if (IsSanctionedSimpleUnitIdentifier(unit)) {
    return true;
  }
  var units = unit.split("-per-");
  if (units.length !== 2) {
    return false;
  }
  var numerator = units[0], denominator = units[1];
  if (!IsSanctionedSimpleUnitIdentifier(numerator) || !IsSanctionedSimpleUnitIdentifier(denominator)) {
    return false;
  }
  return true;
}
var init_IsWellFormedUnitIdentifier = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/IsWellFormedUnitIdentifier.js"() {
    init_IsSanctionedSimpleUnitIdentifier();
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/ApplyUnsignedRoundingMode.js
function ApplyUnsignedRoundingMode(x, r1, r2, unsignedRoundingMode) {
  if (x.eq(r1))
    return r1;
  invariant(r1.lessThan(x) && x.lessThan(r2), "x should be between r1 and r2 but x=".concat(x, ", r1=").concat(r1, ", r2=").concat(r2));
  if (unsignedRoundingMode === "zero") {
    return r1;
  }
  if (unsignedRoundingMode === "infinity") {
    return r2;
  }
  var d1 = x.minus(r1);
  var d2 = r2.minus(x);
  if (d1.lessThan(d2)) {
    return r1;
  }
  if (d2.lessThan(d1)) {
    return r2;
  }
  invariant(d1.eq(d2), "d1 should be equal to d2");
  if (unsignedRoundingMode === "half-zero") {
    return r1;
  }
  if (unsignedRoundingMode === "half-infinity") {
    return r2;
  }
  invariant(unsignedRoundingMode === "half-even", "unsignedRoundingMode should be half-even");
  var cardinality = r1.div(r2.minus(r1)).mod(2);
  if (cardinality.isZero()) {
    return r1;
  }
  return r2;
}
var init_ApplyUnsignedRoundingMode = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/ApplyUnsignedRoundingMode.js"() {
    init_utils();
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/CollapseNumberRange.js
function CollapseNumberRange(numberFormat, result, _a) {
  var getInternalSlots = _a.getInternalSlots;
  var internalSlots = getInternalSlots(numberFormat);
  var symbols = internalSlots.dataLocaleData.numbers.symbols[internalSlots.numberingSystem];
  var rangeSignRegex = new RegExp("s?[".concat(symbols.rangeSign, "]s?"));
  var rangeSignIndex = result.findIndex(function(r) {
    return r.type === "literal" && rangeSignRegex.test(r.value);
  });
  var prefixSignParts = [];
  for (var i = rangeSignIndex - 1; i >= 0; i--) {
    if (!PART_TYPES_TO_COLLAPSE.has(result[i].type)) {
      break;
    }
    prefixSignParts.unshift(result[i]);
  }
  if (Array.from(prefixSignParts.map(function(p) {
    return p.value;
  }).join("")).length > 1) {
    var newResult = Array.from(result);
    newResult.splice(rangeSignIndex - prefixSignParts.length, prefixSignParts.length);
    return newResult;
  }
  var suffixSignParts = [];
  for (var i = rangeSignIndex + 1; i < result.length; i++) {
    if (!PART_TYPES_TO_COLLAPSE.has(result[i].type)) {
      break;
    }
    suffixSignParts.push(result[i]);
  }
  if (Array.from(suffixSignParts.map(function(p) {
    return p.value;
  }).join("")).length > 1) {
    var newResult = Array.from(result);
    newResult.splice(rangeSignIndex + 1, suffixSignParts.length);
    return newResult;
  }
  return result;
}
var PART_TYPES_TO_COLLAPSE;
var init_CollapseNumberRange = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/CollapseNumberRange.js"() {
    PART_TYPES_TO_COLLAPSE = /* @__PURE__ */ new Set([
      "unit",
      "exponentMinusSign",
      "minusSign",
      "plusSign",
      "percentSign",
      "exponentSeparator",
      "percent",
      "percentSign",
      "currency",
      "literal"
    ]);
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/ComputeExponentForMagnitude.js
function ComputeExponentForMagnitude(internalSlots, magnitude) {
  var notation = internalSlots.notation, dataLocaleData = internalSlots.dataLocaleData, numberingSystem = internalSlots.numberingSystem;
  switch (notation) {
    case "standard":
      return 0;
    case "scientific":
      return magnitude.toNumber();
    case "engineering":
      var thousands = magnitude.div(3).floor();
      return thousands.times(3).toNumber();
    default: {
      invariant(notation === "compact", "Invalid notation");
      var compactDisplay = internalSlots.compactDisplay, style = internalSlots.style, currencyDisplay = internalSlots.currencyDisplay;
      var thresholdMap = void 0;
      if (style === "currency" && currencyDisplay !== "name") {
        var currency = dataLocaleData.numbers.currency[numberingSystem] || dataLocaleData.numbers.currency[dataLocaleData.numbers.nu[0]];
        thresholdMap = currency.short;
      } else {
        var decimal = dataLocaleData.numbers.decimal[numberingSystem] || dataLocaleData.numbers.decimal[dataLocaleData.numbers.nu[0]];
        thresholdMap = compactDisplay === "long" ? decimal.long : decimal.short;
      }
      if (!thresholdMap) {
        return 0;
      }
      var num = decimal_default.pow(10, magnitude).toString();
      var thresholds = Object.keys(thresholdMap);
      if (num < thresholds[0]) {
        return 0;
      }
      if (num > thresholds[thresholds.length - 1]) {
        return thresholds[thresholds.length - 1].length - 1;
      }
      var i = thresholds.indexOf(num);
      if (i === -1) {
        return 0;
      }
      var magnitudeKey = thresholds[i];
      var compactPattern = thresholdMap[magnitudeKey].other;
      if (compactPattern === "0") {
        return 0;
      }
      return magnitudeKey.length - thresholdMap[magnitudeKey].other.match(/0+/)[0].length;
    }
  }
}
var init_ComputeExponentForMagnitude = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/ComputeExponentForMagnitude.js"() {
    init_decimal();
    init_utils();
    decimal_default.set({
      toExpPos: 100
    });
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/GetUnsignedRoundingMode.js
function GetUnsignedRoundingMode(roundingMode, isNegative) {
  if (isNegative) {
    return negativeMapping[roundingMode];
  }
  return positiveMapping[roundingMode];
}
var negativeMapping, positiveMapping;
var init_GetUnsignedRoundingMode = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/GetUnsignedRoundingMode.js"() {
    negativeMapping = {
      ceil: "zero",
      floor: "infinity",
      expand: "infinity",
      trunc: "zero",
      halfCeil: "half-zero",
      halfFloor: "half-infinity",
      halfExpand: "half-infinity",
      halfTrunc: "half-zero",
      halfEven: "half-even"
    };
    positiveMapping = {
      ceil: "infinity",
      floor: "zero",
      expand: "infinity",
      trunc: "zero",
      halfCeil: "half-infinity",
      halfFloor: "half-zero",
      halfExpand: "half-infinity",
      halfTrunc: "half-zero",
      halfEven: "half-even"
    };
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/ToRawFixed.js
function ToRawFixedFn(n, f) {
  return n.times(decimal_default.pow(10, -f));
}
function findN1R1(x, f, roundingIncrement) {
  var nx = x.times(decimal_default.pow(10, f)).floor();
  var n1 = nx.div(roundingIncrement).floor().times(roundingIncrement);
  var r1 = ToRawFixedFn(n1, f);
  return {
    n1,
    r1
  };
}
function findN2R2(x, f, roundingIncrement) {
  var nx = x.times(decimal_default.pow(10, f)).ceil();
  var n2 = nx.div(roundingIncrement).ceil().times(roundingIncrement);
  var r2 = ToRawFixedFn(n2, f);
  return {
    n2,
    r2
  };
}
function ToRawFixed(x, minFraction, maxFraction, roundingIncrement, unsignedRoundingMode) {
  var f = maxFraction;
  var _a = findN1R1(x, f, roundingIncrement), n1 = _a.n1, r1 = _a.r1;
  var _b = findN2R2(x, f, roundingIncrement), n2 = _b.n2, r2 = _b.r2;
  var r = ApplyUnsignedRoundingMode(x, r1, r2, unsignedRoundingMode);
  var n, xFinal;
  var m;
  if (r.eq(r1)) {
    n = n1;
    xFinal = r1;
  } else {
    n = n2;
    xFinal = r2;
  }
  if (n.isZero()) {
    m = "0";
  } else {
    m = n.toString();
  }
  var int;
  if (f !== 0) {
    var k = m.length;
    if (k <= f) {
      var z = repeat("0", f - k + 1);
      m = z + m;
      k = f + 1;
    }
    var a = m.slice(0, k - f);
    var b = m.slice(m.length - f);
    m = a + "." + b;
    int = a.length;
  } else {
    int = m.length;
  }
  var cut = maxFraction - minFraction;
  while (cut > 0 && m[m.length - 1] === "0") {
    m = m.slice(0, m.length - 1);
    cut--;
  }
  if (m[m.length - 1] === ".") {
    m = m.slice(0, m.length - 1);
  }
  return {
    formattedString: m,
    roundedNumber: xFinal,
    integerDigitsCount: int,
    roundingMagnitude: -f
  };
}
var init_ToRawFixed = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/ToRawFixed.js"() {
    init_decimal();
    init_utils();
    init_ApplyUnsignedRoundingMode();
    decimal_default.set({
      toExpPos: 100
    });
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/ToRawPrecision.js
function findN1E1R1(x, p) {
  var maxN1 = decimal_default.pow(10, p);
  var minN1 = decimal_default.pow(10, p - 1);
  var maxE1 = x.div(minN1).log(10).plus(p).minus(1).ceil();
  var currentE1 = maxE1;
  while (true) {
    var currentN1 = x.div(decimal_default.pow(10, currentE1.minus(p).plus(1))).floor();
    if (currentN1.lessThan(maxN1) && currentN1.greaterThanOrEqualTo(minN1)) {
      var currentR1 = currentN1.times(decimal_default.pow(10, currentE1.minus(p).plus(1)));
      if (currentR1.lessThanOrEqualTo(x)) {
        return {
          n1: currentN1,
          e1: currentE1,
          r1: currentR1
        };
      }
    }
    currentE1 = currentE1.minus(1);
  }
}
function findN2E2R2(x, p) {
  var maxN2 = decimal_default.pow(10, p);
  var minN2 = decimal_default.pow(10, p - 1);
  var minE2 = x.div(maxN2).log(10).plus(p).minus(1).floor();
  var currentE2 = minE2;
  while (true) {
    var currentN2 = x.div(decimal_default.pow(10, currentE2.minus(p).plus(1))).ceil();
    if (currentN2.lessThan(maxN2) && currentN2.greaterThanOrEqualTo(minN2)) {
      var currentR2 = currentN2.times(decimal_default.pow(10, currentE2.minus(p).plus(1)));
      if (currentR2.greaterThanOrEqualTo(x)) {
        return {
          n2: currentN2,
          e2: currentE2,
          r2: currentR2
        };
      }
    }
    currentE2 = currentE2.plus(1);
  }
}
function ToRawPrecision(x, minPrecision, maxPrecision, unsignedRoundingMode) {
  var p = maxPrecision;
  var m;
  var e;
  var xFinal;
  if (x.isZero()) {
    m = repeat("0", p);
    e = 0;
    xFinal = ZERO;
  } else {
    var _a = findN1E1R1(x, p), n1 = _a.n1, e1 = _a.e1, r1 = _a.r1;
    var _b = findN2E2R2(x, p), n2 = _b.n2, e2 = _b.e2, r2 = _b.r2;
    var r = ApplyUnsignedRoundingMode(x, r1, r2, unsignedRoundingMode);
    var n = void 0;
    if (r.eq(r1)) {
      n = n1;
      e = e1.toNumber();
      xFinal = r1;
    } else {
      n = n2;
      e = e2.toNumber();
      xFinal = r2;
    }
    m = n.toString();
  }
  var int;
  if (e >= p - 1) {
    m = m + repeat("0", e - p + 1);
    int = e + 1;
  } else if (e >= 0) {
    m = m.slice(0, e + 1) + "." + m.slice(m.length - (p - (e + 1)));
    int = e + 1;
  } else {
    invariant(e < 0, "e should be less than 0");
    m = "0." + repeat("0", -e - 1) + m;
    int = 1;
  }
  if (m.includes(".") && maxPrecision > minPrecision) {
    var cut = maxPrecision - minPrecision;
    while (cut > 0 && m[m.length - 1] === "0") {
      m = m.slice(0, m.length - 1);
      cut--;
    }
    if (m[m.length - 1] === ".") {
      m = m.slice(0, m.length - 1);
    }
  }
  return {
    formattedString: m,
    roundedNumber: xFinal,
    integerDigitsCount: int,
    roundingMagnitude: e
  };
}
var init_ToRawPrecision = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/ToRawPrecision.js"() {
    init_decimal();
    init_constants();
    init_utils();
    init_ApplyUnsignedRoundingMode();
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/FormatNumericToString.js
function FormatNumericToString(intlObject, _x) {
  var x = _x;
  var sign2;
  if (x.isZero() && x.isNegative()) {
    sign2 = "negative";
    x = ZERO;
  } else {
    invariant(x.isFinite(), "NumberFormatDigitInternalSlots value is not finite");
    if (x.lessThan(0)) {
      sign2 = "negative";
    } else {
      sign2 = "positive";
    }
    if (sign2 === "negative") {
      x = x.negated();
    }
  }
  var result;
  var roundingType = intlObject.roundingType;
  var unsignedRoundingMode = GetUnsignedRoundingMode(intlObject.roundingMode, sign2 === "negative");
  switch (roundingType) {
    case "significantDigits":
      result = ToRawPrecision(x, intlObject.minimumSignificantDigits, intlObject.maximumSignificantDigits, unsignedRoundingMode);
      break;
    case "fractionDigits":
      result = ToRawFixed(x, intlObject.minimumFractionDigits, intlObject.maximumFractionDigits, intlObject.roundingIncrement, unsignedRoundingMode);
      break;
    default:
      var sResult = ToRawPrecision(x, intlObject.minimumSignificantDigits, intlObject.maximumSignificantDigits, unsignedRoundingMode);
      var fResult = ToRawFixed(x, intlObject.minimumFractionDigits, intlObject.maximumFractionDigits, intlObject.roundingIncrement, unsignedRoundingMode);
      if (intlObject.roundingType === "morePrecision") {
        if (sResult.roundingMagnitude <= fResult.roundingMagnitude) {
          result = sResult;
        } else {
          result = fResult;
        }
      } else {
        invariant(intlObject.roundingType === "lessPrecision", "Invalid roundingType");
        if (sResult.roundingMagnitude <= fResult.roundingMagnitude) {
          result = fResult;
        } else {
          result = sResult;
        }
      }
      break;
  }
  x = result.roundedNumber;
  var string = result.formattedString;
  if (intlObject.trailingZeroDisplay === "stripIfInteger" && x.isInteger()) {
    var i = string.indexOf(".");
    if (i > -1) {
      string = string.slice(0, i);
    }
  }
  var int = result.integerDigitsCount;
  var minInteger = intlObject.minimumIntegerDigits;
  if (int < minInteger) {
    var forwardZeros = repeat("0", minInteger - int);
    string = forwardZeros + string;
  }
  if (sign2 === "negative") {
    if (x.isZero()) {
      x = NEGATIVE_ZERO;
    } else {
      x = x.negated();
    }
  }
  return { roundedNumber: x, formattedString: string };
}
var init_FormatNumericToString = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/FormatNumericToString.js"() {
    init_constants();
    init_utils();
    init_GetUnsignedRoundingMode();
    init_ToRawFixed();
    init_ToRawPrecision();
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/ComputeExponent.js
function ComputeExponent(internalSlots, x) {
  if (x.isZero()) {
    return [0, 0];
  }
  if (x.isNegative()) {
    x = x.negated();
  }
  var magnitude = x.log(10).floor();
  var exponent = ComputeExponentForMagnitude(internalSlots, magnitude);
  x = x.times(decimal_default.pow(10, -exponent));
  var formatNumberResult = FormatNumericToString(internalSlots, x);
  if (formatNumberResult.roundedNumber.isZero()) {
    return [exponent, magnitude.toNumber()];
  }
  var newMagnitude = formatNumberResult.roundedNumber.log(10).floor();
  if (newMagnitude.eq(magnitude.minus(exponent))) {
    return [exponent, magnitude.toNumber()];
  }
  return [
    ComputeExponentForMagnitude(internalSlots, magnitude.plus(1)),
    magnitude.plus(1).toNumber()
  ];
}
var init_ComputeExponent = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/ComputeExponent.js"() {
    init_decimal();
    init_ComputeExponentForMagnitude();
    init_FormatNumericToString();
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/CurrencyDigits.js
function CurrencyDigits(c, _a) {
  var currencyDigitsData = _a.currencyDigitsData;
  return HasOwnProperty(currencyDigitsData, c) ? currencyDigitsData[c] : 2;
}
var init_CurrencyDigits = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/CurrencyDigits.js"() {
    init__();
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/regex.generated.js
var S_UNICODE_REGEX;
var init_regex_generated = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/regex.generated.js"() {
    S_UNICODE_REGEX = /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20BF\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC1\uFDFC\uFDFD\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDE8\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEE0-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF73\uDF80-\uDFD8\uDFE0-\uDFEB]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDD78\uDD7A-\uDDCB\uDDCD-\uDE53\uDE60-\uDE6D\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6\uDF00-\uDF92\uDF94-\uDFCA]/;
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/digit-mapping.generated.js
var digitMapping;
var init_digit_mapping_generated = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/digit-mapping.generated.js"() {
    digitMapping = {
      "adlm": [
        "𞥐",
        "𞥑",
        "𞥒",
        "𞥓",
        "𞥔",
        "𞥕",
        "𞥖",
        "𞥗",
        "𞥘",
        "𞥙"
      ],
      "ahom": [
        "𑜰",
        "𑜱",
        "𑜲",
        "𑜳",
        "𑜴",
        "𑜵",
        "𑜶",
        "𑜷",
        "𑜸",
        "𑜹"
      ],
      "arab": [
        "٠",
        "١",
        "٢",
        "٣",
        "٤",
        "٥",
        "٦",
        "٧",
        "٨",
        "٩"
      ],
      "arabext": [
        "۰",
        "۱",
        "۲",
        "۳",
        "۴",
        "۵",
        "۶",
        "۷",
        "۸",
        "۹"
      ],
      "bali": [
        "᭐",
        "᭑",
        "᭒",
        "᭓",
        "᭔",
        "᭕",
        "᭖",
        "᭗",
        "᭘",
        "᭙"
      ],
      "beng": [
        "০",
        "১",
        "২",
        "৩",
        "৪",
        "৫",
        "৬",
        "৭",
        "৮",
        "৯"
      ],
      "bhks": [
        "𑱐",
        "𑱑",
        "𑱒",
        "𑱓",
        "𑱔",
        "𑱕",
        "𑱖",
        "𑱗",
        "𑱘",
        "𑱙"
      ],
      "brah": [
        "𑁦",
        "𑁧",
        "𑁨",
        "𑁩",
        "𑁪",
        "𑁫",
        "𑁬",
        "𑁭",
        "𑁮",
        "𑁯"
      ],
      "cakm": [
        "𑄶",
        "𑄷",
        "𑄸",
        "𑄹",
        "𑄺",
        "𑄻",
        "𑄼",
        "𑄽",
        "𑄾",
        "𑄿"
      ],
      "cham": [
        "꩐",
        "꩑",
        "꩒",
        "꩓",
        "꩔",
        "꩕",
        "꩖",
        "꩗",
        "꩘",
        "꩙"
      ],
      "deva": [
        "०",
        "१",
        "२",
        "३",
        "४",
        "५",
        "६",
        "७",
        "८",
        "९"
      ],
      "diak": [
        "𑥐",
        "𑥑",
        "𑥒",
        "𑥓",
        "𑥔",
        "𑥕",
        "𑥖",
        "𑥗",
        "𑥘",
        "𑥙"
      ],
      "fullwide": [
        "０",
        "１",
        "２",
        "３",
        "４",
        "５",
        "６",
        "７",
        "８",
        "９"
      ],
      "gong": [
        "𑶠",
        "𑶡",
        "𑶢",
        "𑶣",
        "𑶤",
        "𑶥",
        "𑶦",
        "𑶧",
        "𑶨",
        "𑶩"
      ],
      "gonm": [
        "𑵐",
        "𑵑",
        "𑵒",
        "𑵓",
        "𑵔",
        "𑵕",
        "𑵖",
        "𑵗",
        "𑵘",
        "𑵙"
      ],
      "gujr": [
        "૦",
        "૧",
        "૨",
        "૩",
        "૪",
        "૫",
        "૬",
        "૭",
        "૮",
        "૯"
      ],
      "guru": [
        "੦",
        "੧",
        "੨",
        "੩",
        "੪",
        "੫",
        "੬",
        "੭",
        "੮",
        "੯"
      ],
      "hanidec": [
        "〇",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九"
      ],
      "hmng": [
        "𖭐",
        "𖭑",
        "𖭒",
        "𖭓",
        "𖭔",
        "𖭕",
        "𖭖",
        "𖭗",
        "𖭘",
        "𖭙"
      ],
      "hmnp": [
        "𞅀",
        "𞅁",
        "𞅂",
        "𞅃",
        "𞅄",
        "𞅅",
        "𞅆",
        "𞅇",
        "𞅈",
        "𞅉"
      ],
      "java": [
        "꧐",
        "꧑",
        "꧒",
        "꧓",
        "꧔",
        "꧕",
        "꧖",
        "꧗",
        "꧘",
        "꧙"
      ],
      "kali": [
        "꤀",
        "꤁",
        "꤂",
        "꤃",
        "꤄",
        "꤅",
        "꤆",
        "꤇",
        "꤈",
        "꤉"
      ],
      "khmr": [
        "០",
        "១",
        "២",
        "៣",
        "៤",
        "៥",
        "៦",
        "៧",
        "៨",
        "៩"
      ],
      "knda": [
        "೦",
        "೧",
        "೨",
        "೩",
        "೪",
        "೫",
        "೬",
        "೭",
        "೮",
        "೯"
      ],
      "lana": [
        "᪀",
        "᪁",
        "᪂",
        "᪃",
        "᪄",
        "᪅",
        "᪆",
        "᪇",
        "᪈",
        "᪉"
      ],
      "lanatham": [
        "᪐",
        "᪑",
        "᪒",
        "᪓",
        "᪔",
        "᪕",
        "᪖",
        "᪗",
        "᪘",
        "᪙"
      ],
      "laoo": [
        "໐",
        "໑",
        "໒",
        "໓",
        "໔",
        "໕",
        "໖",
        "໗",
        "໘",
        "໙"
      ],
      "lepc": [
        "᪐",
        "᪑",
        "᪒",
        "᪓",
        "᪔",
        "᪕",
        "᪖",
        "᪗",
        "᪘",
        "᪙"
      ],
      "limb": [
        "᥆",
        "᥇",
        "᥈",
        "᥉",
        "᥊",
        "᥋",
        "᥌",
        "᥍",
        "᥎",
        "᥏"
      ],
      "mathbold": [
        "𝟎",
        "𝟏",
        "𝟐",
        "𝟑",
        "𝟒",
        "𝟓",
        "𝟔",
        "𝟕",
        "𝟖",
        "𝟗"
      ],
      "mathdbl": [
        "𝟘",
        "𝟙",
        "𝟚",
        "𝟛",
        "𝟜",
        "𝟝",
        "𝟞",
        "𝟟",
        "𝟠",
        "𝟡"
      ],
      "mathmono": [
        "𝟶",
        "𝟷",
        "𝟸",
        "𝟹",
        "𝟺",
        "𝟻",
        "𝟼",
        "𝟽",
        "𝟾",
        "𝟿"
      ],
      "mathsanb": [
        "𝟬",
        "𝟭",
        "𝟮",
        "𝟯",
        "𝟰",
        "𝟱",
        "𝟲",
        "𝟳",
        "𝟴",
        "𝟵"
      ],
      "mathsans": [
        "𝟢",
        "𝟣",
        "𝟤",
        "𝟥",
        "𝟦",
        "𝟧",
        "𝟨",
        "𝟩",
        "𝟪",
        "𝟫"
      ],
      "mlym": [
        "൦",
        "൧",
        "൨",
        "൩",
        "൪",
        "൫",
        "൬",
        "൭",
        "൮",
        "൯"
      ],
      "modi": [
        "𑙐",
        "𑙑",
        "𑙒",
        "𑙓",
        "𑙔",
        "𑙕",
        "𑙖",
        "𑙗",
        "𑙘",
        "𑙙"
      ],
      "mong": [
        "᠐",
        "᠑",
        "᠒",
        "᠓",
        "᠔",
        "᠕",
        "᠖",
        "᠗",
        "᠘",
        "᠙"
      ],
      "mroo": [
        "𖩠",
        "𖩡",
        "𖩢",
        "𖩣",
        "𖩤",
        "𖩥",
        "𖩦",
        "𖩧",
        "𖩨",
        "𖩩"
      ],
      "mtei": [
        "꯰",
        "꯱",
        "꯲",
        "꯳",
        "꯴",
        "꯵",
        "꯶",
        "꯷",
        "꯸",
        "꯹"
      ],
      "mymr": [
        "၀",
        "၁",
        "၂",
        "၃",
        "၄",
        "၅",
        "၆",
        "၇",
        "၈",
        "၉"
      ],
      "mymrshan": [
        "႐",
        "႑",
        "႒",
        "႓",
        "႔",
        "႕",
        "႖",
        "႗",
        "႘",
        "႙"
      ],
      "mymrtlng": [
        "꧰",
        "꧱",
        "꧲",
        "꧳",
        "꧴",
        "꧵",
        "꧶",
        "꧷",
        "꧸",
        "꧹"
      ],
      "newa": [
        "𑑐",
        "𑑑",
        "𑑒",
        "𑑓",
        "𑑔",
        "𑑕",
        "𑑖",
        "𑑗",
        "𑑘",
        "𑑙"
      ],
      "nkoo": [
        "߀",
        "߁",
        "߂",
        "߃",
        "߄",
        "߅",
        "߆",
        "߇",
        "߈",
        "߉"
      ],
      "olck": [
        "᱐",
        "᱑",
        "᱒",
        "᱓",
        "᱔",
        "᱕",
        "᱖",
        "᱗",
        "᱘",
        "᱙"
      ],
      "orya": [
        "୦",
        "୧",
        "୨",
        "୩",
        "୪",
        "୫",
        "୬",
        "୭",
        "୮",
        "୯"
      ],
      "osma": [
        "𐒠",
        "𐒡",
        "𐒢",
        "𐒣",
        "𐒤",
        "𐒥",
        "𐒦",
        "𐒧",
        "𐒨",
        "𐒩"
      ],
      "rohg": [
        "𐴰",
        "𐴱",
        "𐴲",
        "𐴳",
        "𐴴",
        "𐴵",
        "𐴶",
        "𐴷",
        "𐴸",
        "𐴹"
      ],
      "saur": [
        "꣐",
        "꣑",
        "꣒",
        "꣓",
        "꣔",
        "꣕",
        "꣖",
        "꣗",
        "꣘",
        "꣙"
      ],
      "segment": [
        "🯰",
        "🯱",
        "🯲",
        "🯳",
        "🯴",
        "🯵",
        "🯶",
        "🯷",
        "🯸",
        "🯹"
      ],
      "shrd": [
        "𑇐",
        "𑇑",
        "𑇒",
        "𑇓",
        "𑇔",
        "𑇕",
        "𑇖",
        "𑇗",
        "𑇘",
        "𑇙"
      ],
      "sind": [
        "𑋰",
        "𑋱",
        "𑋲",
        "𑋳",
        "𑋴",
        "𑋵",
        "𑋶",
        "𑋷",
        "𑋸",
        "𑋹"
      ],
      "sinh": [
        "෦",
        "෧",
        "෨",
        "෩",
        "෪",
        "෫",
        "෬",
        "෭",
        "෮",
        "෯"
      ],
      "sora": [
        "𑃰",
        "𑃱",
        "𑃲",
        "𑃳",
        "𑃴",
        "𑃵",
        "𑃶",
        "𑃷",
        "𑃸",
        "𑃹"
      ],
      "sund": [
        "᮰",
        "᮱",
        "᮲",
        "᮳",
        "᮴",
        "᮵",
        "᮶",
        "᮷",
        "᮸",
        "᮹"
      ],
      "takr": [
        "𑛀",
        "𑛁",
        "𑛂",
        "𑛃",
        "𑛄",
        "𑛅",
        "𑛆",
        "𑛇",
        "𑛈",
        "𑛉"
      ],
      "talu": [
        "᧐",
        "᧑",
        "᧒",
        "᧓",
        "᧔",
        "᧕",
        "᧖",
        "᧗",
        "᧘",
        "᧙"
      ],
      "tamldec": [
        "௦",
        "௧",
        "௨",
        "௩",
        "௪",
        "௫",
        "௬",
        "௭",
        "௮",
        "௯"
      ],
      "telu": [
        "౦",
        "౧",
        "౨",
        "౩",
        "౪",
        "౫",
        "౬",
        "౭",
        "౮",
        "౯"
      ],
      "thai": [
        "๐",
        "๑",
        "๒",
        "๓",
        "๔",
        "๕",
        "๖",
        "๗",
        "๘",
        "๙"
      ],
      "tibt": [
        "༠",
        "༡",
        "༢",
        "༣",
        "༤",
        "༥",
        "༦",
        "༧",
        "༨",
        "༩"
      ],
      "tirh": [
        "𑓐",
        "𑓑",
        "𑓒",
        "𑓓",
        "𑓔",
        "𑓕",
        "𑓖",
        "𑓗",
        "𑓘",
        "𑓙"
      ],
      "vaii": [
        "ᘠ",
        "ᘡ",
        "ᘢ",
        "ᘣ",
        "ᘤ",
        "ᘥ",
        "ᘦ",
        "ᘧ",
        "ᘨ",
        "ᘩ"
      ],
      "wara": [
        "𑣠",
        "𑣡",
        "𑣢",
        "𑣣",
        "𑣤",
        "𑣥",
        "𑣦",
        "𑣧",
        "𑣨",
        "𑣩"
      ],
      "wcho": [
        "𞋰",
        "𞋱",
        "𞋲",
        "𞋳",
        "𞋴",
        "𞋵",
        "𞋶",
        "𞋷",
        "𞋸",
        "𞋹"
      ]
    };
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/format_to_parts.js
function formatToParts(numberResult, data, pl, options) {
  var _a;
  var sign2 = numberResult.sign, exponent = numberResult.exponent, magnitude = numberResult.magnitude;
  var notation = options.notation, style = options.style, numberingSystem = options.numberingSystem;
  var defaultNumberingSystem = data.numbers.nu[0];
  var compactNumberPattern = null;
  if (notation === "compact" && magnitude) {
    compactNumberPattern = getCompactDisplayPattern(numberResult, pl, data, style, options.compactDisplay, options.currencyDisplay, numberingSystem);
  }
  var nonNameCurrencyPart;
  if (style === "currency" && options.currencyDisplay !== "name") {
    var byCurrencyDisplay = data.currencies[options.currency];
    if (byCurrencyDisplay) {
      switch (options.currencyDisplay) {
        case "code":
          nonNameCurrencyPart = options.currency;
          break;
        case "symbol":
          nonNameCurrencyPart = byCurrencyDisplay.symbol;
          break;
        default:
          nonNameCurrencyPart = byCurrencyDisplay.narrow;
          break;
      }
    } else {
      nonNameCurrencyPart = options.currency;
    }
  }
  var numberPattern;
  if (!compactNumberPattern) {
    if (style === "decimal" || style === "unit" || style === "currency" && options.currencyDisplay === "name") {
      var decimalData = data.numbers.decimal[numberingSystem] || data.numbers.decimal[defaultNumberingSystem];
      numberPattern = getPatternForSign(decimalData.standard, sign2);
    } else if (style === "currency") {
      var currencyData = data.numbers.currency[numberingSystem] || data.numbers.currency[defaultNumberingSystem];
      numberPattern = getPatternForSign(currencyData[options.currencySign], sign2);
    } else {
      var percentPattern = data.numbers.percent[numberingSystem] || data.numbers.percent[defaultNumberingSystem];
      numberPattern = getPatternForSign(percentPattern, sign2);
    }
  } else {
    numberPattern = compactNumberPattern;
  }
  var decimalNumberPattern = CLDR_NUMBER_PATTERN.exec(numberPattern)[0];
  numberPattern = numberPattern.replace(CLDR_NUMBER_PATTERN, "{0}").replace(/'(.)'/g, "$1");
  if (style === "currency" && options.currencyDisplay !== "name") {
    var currencyData = data.numbers.currency[numberingSystem] || data.numbers.currency[defaultNumberingSystem];
    var afterCurrency = currencyData.currencySpacing.afterInsertBetween;
    if (afterCurrency && !S_DOLLAR_UNICODE_REGEX.test(nonNameCurrencyPart)) {
      numberPattern = numberPattern.replace("¤{0}", "¤".concat(afterCurrency, "{0}"));
    }
    var beforeCurrency = currencyData.currencySpacing.beforeInsertBetween;
    if (beforeCurrency && !CARET_S_UNICODE_REGEX.test(nonNameCurrencyPart)) {
      numberPattern = numberPattern.replace("{0}¤", "{0}".concat(beforeCurrency, "¤"));
    }
  }
  var numberPatternParts = numberPattern.split(/({c:[^}]+}|\{0\}|[¤%\-\+])/g);
  var numberParts = [];
  var symbols = data.numbers.symbols[numberingSystem] || data.numbers.symbols[defaultNumberingSystem];
  for (var _i = 0, numberPatternParts_1 = numberPatternParts; _i < numberPatternParts_1.length; _i++) {
    var part = numberPatternParts_1[_i];
    if (!part) {
      continue;
    }
    switch (part) {
      case "{0}": {
        numberParts.push.apply(numberParts, partitionNumberIntoParts(
          symbols,
          numberResult,
          notation,
          exponent,
          numberingSystem,
          // If compact number pattern exists, do not insert group separators.
          !compactNumberPattern && ((_a = options.useGrouping) !== null && _a !== void 0 ? _a : true),
          decimalNumberPattern,
          style,
          options.roundingIncrement,
          GetUnsignedRoundingMode(options.roundingMode, sign2 === -1)
        ));
        break;
      }
      case "-":
        numberParts.push({ type: "minusSign", value: symbols.minusSign });
        break;
      case "+":
        numberParts.push({ type: "plusSign", value: symbols.plusSign });
        break;
      case "%":
        numberParts.push({ type: "percentSign", value: symbols.percentSign });
        break;
      case "¤":
        numberParts.push({ type: "currency", value: nonNameCurrencyPart });
        break;
      default:
        if (/^\{c:/.test(part)) {
          numberParts.push({
            type: "compact",
            value: part.substring(3, part.length - 1)
          });
        } else {
          numberParts.push({ type: "literal", value: part });
        }
        break;
    }
  }
  switch (style) {
    case "currency": {
      if (options.currencyDisplay === "name") {
        var unitPattern = (data.numbers.currency[numberingSystem] || data.numbers.currency[defaultNumberingSystem]).unitPattern;
        var unitName = void 0;
        var currencyNameData = data.currencies[options.currency];
        if (currencyNameData) {
          unitName = selectPlural(pl, numberResult.roundedNumber.times(decimal_default.pow(10, exponent)).toNumber(), currencyNameData.displayName);
        } else {
          unitName = options.currency;
        }
        var unitPatternParts = unitPattern.split(/(\{[01]\})/g);
        var result = [];
        for (var _b = 0, unitPatternParts_1 = unitPatternParts; _b < unitPatternParts_1.length; _b++) {
          var part = unitPatternParts_1[_b];
          switch (part) {
            case "{0}":
              result.push.apply(result, numberParts);
              break;
            case "{1}":
              result.push({ type: "currency", value: unitName });
              break;
            default:
              if (part) {
                result.push({ type: "literal", value: part });
              }
              break;
          }
        }
        return result;
      } else {
        return numberParts;
      }
    }
    case "unit": {
      var unit = options.unit, unitDisplay = options.unitDisplay;
      var unitData = data.units.simple[unit];
      var unitPattern = void 0;
      if (unitData) {
        unitPattern = selectPlural(pl, numberResult.roundedNumber.times(decimal_default.pow(10, exponent)).toNumber(), data.units.simple[unit][unitDisplay]);
      } else {
        var _c = unit.split("-per-"), numeratorUnit = _c[0], denominatorUnit = _c[1];
        unitData = data.units.simple[numeratorUnit];
        var numeratorUnitPattern = selectPlural(pl, numberResult.roundedNumber.times(decimal_default.pow(10, exponent)).toNumber(), data.units.simple[numeratorUnit][unitDisplay]);
        var perUnitPattern = data.units.simple[denominatorUnit].perUnit[unitDisplay];
        if (perUnitPattern) {
          unitPattern = perUnitPattern.replace("{0}", numeratorUnitPattern);
        } else {
          var perPattern = data.units.compound.per[unitDisplay];
          var denominatorPattern = selectPlural(pl, 1, data.units.simple[denominatorUnit][unitDisplay]);
          unitPattern = unitPattern = perPattern.replace("{0}", numeratorUnitPattern).replace("{1}", denominatorPattern.replace("{0}", ""));
        }
      }
      var result = [];
      for (var _d = 0, _e = unitPattern.split(/(\s*\{0\}\s*)/); _d < _e.length; _d++) {
        var part = _e[_d];
        var interpolateMatch = /^(\s*)\{0\}(\s*)$/.exec(part);
        if (interpolateMatch) {
          if (interpolateMatch[1]) {
            result.push({ type: "literal", value: interpolateMatch[1] });
          }
          result.push.apply(result, numberParts);
          if (interpolateMatch[2]) {
            result.push({ type: "literal", value: interpolateMatch[2] });
          }
        } else if (part) {
          result.push({ type: "unit", value: part });
        }
      }
      return result;
    }
    default:
      return numberParts;
  }
}
function partitionNumberIntoParts(symbols, numberResult, notation, exponent, numberingSystem, useGrouping, decimalNumberPattern, style, roundingIncrement, unsignedRoundingMode) {
  var result = [];
  var n = numberResult.formattedString, x = numberResult.roundedNumber;
  if (x.isNaN()) {
    return [{ type: "nan", value: n }];
  } else if (!x.isFinite()) {
    return [{ type: "infinity", value: n }];
  }
  var digitReplacementTable = digitMapping[numberingSystem];
  if (digitReplacementTable) {
    n = n.replace(/\d/g, function(digit) {
      return digitReplacementTable[+digit] || digit;
    });
  }
  var decimalSepIndex = n.indexOf(".");
  var integer;
  var fraction;
  if (decimalSepIndex > 0) {
    integer = n.slice(0, decimalSepIndex);
    fraction = n.slice(decimalSepIndex + 1);
  } else {
    integer = n;
  }
  var shouldUseGrouping = false;
  if (useGrouping === "always") {
    shouldUseGrouping = true;
  } else if (useGrouping === "min2") {
    shouldUseGrouping = x.greaterThanOrEqualTo(1e4);
  } else if (useGrouping === "auto" || useGrouping) {
    shouldUseGrouping = notation !== "compact" || x.greaterThanOrEqualTo(1e4);
  }
  if (shouldUseGrouping) {
    var groupSepSymbol = style === "currency" && symbols.currencyGroup != null ? symbols.currencyGroup : symbols.group;
    var groups = [];
    var integerNumberPattern = decimalNumberPattern.split(".")[0];
    var patternGroups = integerNumberPattern.split(",");
    var primaryGroupingSize = 3;
    var secondaryGroupingSize = 3;
    if (patternGroups.length > 1) {
      primaryGroupingSize = patternGroups[patternGroups.length - 1].length;
    }
    if (patternGroups.length > 2) {
      secondaryGroupingSize = patternGroups[patternGroups.length - 2].length;
    }
    var i = integer.length - primaryGroupingSize;
    if (i > 0) {
      groups.push(integer.slice(i, i + primaryGroupingSize));
      for (i -= secondaryGroupingSize; i > 0; i -= secondaryGroupingSize) {
        groups.push(integer.slice(i, i + secondaryGroupingSize));
      }
      groups.push(integer.slice(0, i + secondaryGroupingSize));
    } else {
      groups.push(integer);
    }
    while (groups.length > 0) {
      var integerGroup = groups.pop();
      result.push({ type: "integer", value: integerGroup });
      if (groups.length > 0) {
        result.push({ type: "group", value: groupSepSymbol });
      }
    }
  } else {
    result.push({ type: "integer", value: integer });
  }
  if (fraction !== void 0) {
    var decimalSepSymbol = style === "currency" && symbols.currencyDecimal != null ? symbols.currencyDecimal : symbols.decimal;
    result.push({ type: "decimal", value: decimalSepSymbol }, { type: "fraction", value: fraction });
  }
  if ((notation === "scientific" || notation === "engineering") && x.isFinite()) {
    result.push({ type: "exponentSeparator", value: symbols.exponential });
    if (exponent < 0) {
      result.push({ type: "exponentMinusSign", value: symbols.minusSign });
      exponent = -exponent;
    }
    var exponentResult = ToRawFixed(new decimal_default(exponent), 0, 0, roundingIncrement, unsignedRoundingMode);
    result.push({
      type: "exponentInteger",
      value: exponentResult.formattedString
    });
  }
  return result;
}
function getPatternForSign(pattern, sign2) {
  if (pattern.indexOf(";") < 0) {
    pattern = "".concat(pattern, ";-").concat(pattern);
  }
  var _a = pattern.split(";"), zeroPattern = _a[0], negativePattern = _a[1];
  switch (sign2) {
    case 0:
      return zeroPattern;
    case -1:
      return negativePattern;
    default:
      return negativePattern.indexOf("-") >= 0 ? negativePattern.replace(/-/g, "+") : "+".concat(zeroPattern);
  }
}
function getCompactDisplayPattern(numberResult, pl, data, style, compactDisplay, currencyDisplay, numberingSystem) {
  var _a;
  var roundedNumber = numberResult.roundedNumber, sign2 = numberResult.sign, magnitude = numberResult.magnitude;
  var magnitudeKey = String(Math.pow(10, magnitude));
  var defaultNumberingSystem = data.numbers.nu[0];
  var pattern;
  if (style === "currency" && currencyDisplay !== "name") {
    var byNumberingSystem = data.numbers.currency;
    var currencyData = byNumberingSystem[numberingSystem] || byNumberingSystem[defaultNumberingSystem];
    var compactPluralRules = (_a = currencyData.short) === null || _a === void 0 ? void 0 : _a[magnitudeKey];
    if (!compactPluralRules) {
      return null;
    }
    pattern = selectPlural(pl, roundedNumber.toNumber(), compactPluralRules);
  } else {
    var byNumberingSystem = data.numbers.decimal;
    var byCompactDisplay = byNumberingSystem[numberingSystem] || byNumberingSystem[defaultNumberingSystem];
    var compactPlaralRule = byCompactDisplay[compactDisplay][magnitudeKey];
    if (!compactPlaralRule) {
      return null;
    }
    pattern = selectPlural(pl, roundedNumber.toNumber(), compactPlaralRule);
  }
  if (pattern === "0") {
    return null;
  }
  pattern = getPatternForSign(pattern, sign2).replace(/([^\s;\-\+\d¤]+)/g, "{c:$1}").replace(/0+/, "0");
  return pattern;
}
function selectPlural(pl, x, rules) {
  return rules[pl.select(x)] || rules.other;
}
var CARET_S_UNICODE_REGEX, S_DOLLAR_UNICODE_REGEX, CLDR_NUMBER_PATTERN;
var init_format_to_parts = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/format_to_parts.js"() {
    init_decimal();
    init_regex_generated();
    init_digit_mapping_generated();
    init_GetUnsignedRoundingMode();
    init_ToRawFixed();
    CARET_S_UNICODE_REGEX = new RegExp("^".concat(S_UNICODE_REGEX.source));
    S_DOLLAR_UNICODE_REGEX = new RegExp("".concat(S_UNICODE_REGEX.source, "$"));
    CLDR_NUMBER_PATTERN = /[#0](?:[\.,][#0]+)*/g;
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/FormatApproximately.js
function FormatApproximately(internalSlots, result) {
  var symbols = internalSlots.dataLocaleData.numbers.symbols[internalSlots.numberingSystem];
  var approximatelySign = symbols.approximatelySign;
  result.push({ type: "approximatelySign", value: approximatelySign });
  return result;
}
var init_FormatApproximately = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/FormatApproximately.js"() {
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/PartitionNumberPattern.js
function PartitionNumberPattern(internalSlots, _x) {
  var _a;
  var x = _x;
  var magnitude = 0;
  var pl = internalSlots.pl, dataLocaleData = internalSlots.dataLocaleData, numberingSystem = internalSlots.numberingSystem;
  var symbols = dataLocaleData.numbers.symbols[numberingSystem] || dataLocaleData.numbers.symbols[dataLocaleData.numbers.nu[0]];
  var exponent = 0;
  var n;
  if (x.isNaN()) {
    n = symbols.nan;
  } else if (!x.isFinite()) {
    n = symbols.infinity;
  } else {
    if (!x.isZero()) {
      invariant(x.isFinite(), "Input must be a mathematical value");
      if (internalSlots.style == "percent") {
        x = x.times(100);
      }
      ;
      _a = ComputeExponent(internalSlots, x), exponent = _a[0], // IMPL: We need to record the magnitude of the number
      magnitude = _a[1];
      x = x.times(decimal_default.pow(10, -exponent));
    }
    var formatNumberResult = FormatNumericToString(internalSlots, x);
    n = formatNumberResult.formattedString;
    x = formatNumberResult.roundedNumber;
  }
  var sign2;
  var signDisplay = internalSlots.signDisplay;
  switch (signDisplay) {
    case "never":
      sign2 = 0;
      break;
    case "auto":
      if (x.isPositive() || x.isNaN()) {
        sign2 = 0;
      } else {
        sign2 = -1;
      }
      break;
    case "always":
      if (x.isPositive() || x.isNaN()) {
        sign2 = 1;
      } else {
        sign2 = -1;
      }
      break;
    case "exceptZero":
      if (x.isZero()) {
        sign2 = 0;
      } else if (x.isNegative()) {
        sign2 = -1;
      } else {
        sign2 = 1;
      }
      break;
    default:
      invariant(signDisplay === "negative", 'signDisplay must be "negative"');
      if (x.isNegative() && !x.isZero()) {
        sign2 = -1;
      } else {
        sign2 = 0;
      }
      break;
  }
  return formatToParts({
    roundedNumber: x,
    formattedString: n,
    exponent,
    // IMPL: We're returning this for our implementation of formatToParts
    magnitude,
    sign: sign2
  }, internalSlots.dataLocaleData, pl, internalSlots);
}
var init_PartitionNumberPattern = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/PartitionNumberPattern.js"() {
    init_decimal();
    init_utils();
    init_ComputeExponent();
    init_format_to_parts();
    init_FormatNumericToString();
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/FormatNumeric.js
function FormatNumeric(internalSlots, x) {
  var parts = PartitionNumberPattern(internalSlots, x);
  return parts.map(function(p) {
    return p.value;
  }).join("");
}
var init_FormatNumeric = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/FormatNumeric.js"() {
    init_PartitionNumberPattern();
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/PartitionNumberRangePattern.js
function PartitionNumberRangePattern(numberFormat, x, y, _a) {
  var getInternalSlots = _a.getInternalSlots;
  invariant(!x.isNaN() && !y.isNaN(), "Input must be a number", RangeError);
  var internalSlots = getInternalSlots(numberFormat);
  var xResult = PartitionNumberPattern(internalSlots, x);
  var yResult = PartitionNumberPattern(internalSlots, y);
  if (FormatNumeric(internalSlots, x) === FormatNumeric(internalSlots, y)) {
    var appxResult = FormatApproximately(internalSlots, xResult);
    appxResult.forEach(function(el) {
      el.source = "shared";
    });
    return appxResult;
  }
  var result = [];
  xResult.forEach(function(el) {
    el.source = "startRange";
    result.push(el);
  });
  var rangeSeparator = internalSlots.dataLocaleData.numbers.symbols[internalSlots.numberingSystem].rangeSign;
  result.push({ type: "literal", value: rangeSeparator, source: "shared" });
  yResult.forEach(function(el) {
    el.source = "endRange";
    result.push(el);
  });
  return CollapseNumberRange(numberFormat, result, { getInternalSlots });
}
var init_PartitionNumberRangePattern = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/PartitionNumberRangePattern.js"() {
    init_utils();
    init_CollapseNumberRange();
    init_FormatApproximately();
    init_FormatNumeric();
    init_PartitionNumberPattern();
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/FormatNumericRange.js
function FormatNumericRange(numberFormat, x, y, _a) {
  var getInternalSlots = _a.getInternalSlots;
  var parts = PartitionNumberRangePattern(numberFormat, x, y, {
    getInternalSlots
  });
  return parts.map(function(part) {
    return part.value;
  }).join("");
}
var init_FormatNumericRange = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/FormatNumericRange.js"() {
    init_PartitionNumberRangePattern();
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/FormatNumericRangeToParts.js
function FormatNumericRangeToParts(numberFormat, x, y, _a) {
  var getInternalSlots = _a.getInternalSlots;
  var parts = PartitionNumberRangePattern(numberFormat, x, y, {
    getInternalSlots
  });
  return parts.map(function(part, index) {
    return {
      type: part.type,
      value: part.value,
      source: part.source,
      result: index.toString()
    };
  });
}
var init_FormatNumericRangeToParts = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/FormatNumericRangeToParts.js"() {
    init_PartitionNumberRangePattern();
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/FormatNumericToParts.js
function FormatNumericToParts(nf, x, implDetails) {
  var parts = PartitionNumberPattern(implDetails.getInternalSlots(nf), x);
  var result = ArrayCreate(0);
  for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
    var part = parts_1[_i];
    result.push({
      type: part.type,
      value: part.value
    });
  }
  return result;
}
var init_FormatNumericToParts = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/FormatNumericToParts.js"() {
    init__();
    init_PartitionNumberPattern();
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/SetNumberFormatDigitOptions.js
function SetNumberFormatDigitOptions(internalSlots, opts, mnfdDefault, mxfdDefault, notation) {
  var mnid = GetNumberOption(opts, "minimumIntegerDigits", 1, 21, 1);
  var mnfd = opts.minimumFractionDigits;
  var mxfd = opts.maximumFractionDigits;
  var mnsd = opts.minimumSignificantDigits;
  var mxsd = opts.maximumSignificantDigits;
  internalSlots.minimumIntegerDigits = mnid;
  var roundingIncrement = GetNumberOption(opts, "roundingIncrement", 1, 5e3, 1);
  invariant(VALID_ROUNDING_INCREMENTS.has(roundingIncrement), "Invalid rounding increment value: ".concat(roundingIncrement, ".\nValid values are ").concat(Array.from(VALID_ROUNDING_INCREMENTS).join(", "), "."));
  var roundingMode = GetOption(opts, "roundingMode", "string", [
    "ceil",
    "floor",
    "expand",
    "trunc",
    "halfCeil",
    "halfFloor",
    "halfExpand",
    "halfTrunc",
    "halfEven"
  ], "halfExpand");
  var roundingPriority = GetOption(opts, "roundingPriority", "string", ["auto", "morePrecision", "lessPrecision"], "auto");
  var trailingZeroDisplay = GetOption(opts, "trailingZeroDisplay", "string", ["auto", "stripIfInteger"], "auto");
  if (roundingIncrement !== 1) {
    mxfdDefault = mnfdDefault;
  }
  internalSlots.roundingIncrement = roundingIncrement;
  internalSlots.roundingMode = roundingMode;
  internalSlots.trailingZeroDisplay = trailingZeroDisplay;
  var hasSd = mnsd !== void 0 || mxsd !== void 0;
  var hasFd = mnfd !== void 0 || mxfd !== void 0;
  var needSd = true;
  var needFd = true;
  if (roundingPriority === "auto") {
    needSd = hasSd;
    if (hasSd || !hasFd && notation === "compact") {
      needFd = false;
    }
  }
  if (needSd) {
    if (hasSd) {
      internalSlots.minimumSignificantDigits = DefaultNumberOption(mnsd, 1, 21, 1);
      internalSlots.maximumSignificantDigits = DefaultNumberOption(mxsd, internalSlots.minimumSignificantDigits, 21, 21);
    } else {
      internalSlots.minimumSignificantDigits = 1;
      internalSlots.maximumSignificantDigits = 21;
    }
  }
  if (needFd) {
    if (hasFd) {
      mnfd = DefaultNumberOption(mnfd, 0, 100, void 0);
      mxfd = DefaultNumberOption(mxfd, 0, 100, void 0);
      if (mnfd === void 0) {
        invariant(mxfd !== void 0, "maximumFractionDigits must be defined");
        mnfd = Math.min(mnfdDefault, mxfd);
      } else if (mxfd === void 0) {
        mxfd = Math.max(mxfdDefault, mnfd);
      } else if (mnfd > mxfd) {
        throw new RangeError("Invalid range, ".concat(mnfd, " > ").concat(mxfd));
      }
      internalSlots.minimumFractionDigits = mnfd;
      internalSlots.maximumFractionDigits = mxfd;
    } else {
      internalSlots.minimumFractionDigits = mnfdDefault;
      internalSlots.maximumFractionDigits = mxfdDefault;
    }
  }
  if (!needSd && !needFd) {
    internalSlots.minimumFractionDigits = 0;
    internalSlots.maximumFractionDigits = 0;
    internalSlots.minimumSignificantDigits = 1;
    internalSlots.maximumSignificantDigits = 2;
    internalSlots.roundingType = "morePrecision";
    internalSlots.roundingPriority = "morePrecision";
  } else if (roundingPriority === "morePrecision") {
    internalSlots.roundingType = "morePrecision";
    internalSlots.roundingPriority = "morePrecision";
  } else if (roundingPriority === "lessPrecision") {
    internalSlots.roundingType = "lessPrecision";
    internalSlots.roundingPriority = "lessPrecision";
  } else if (hasSd) {
    internalSlots.roundingType = "significantDigits";
    internalSlots.roundingPriority = "auto";
  } else {
    internalSlots.roundingType = "fractionDigits";
    internalSlots.roundingPriority = "auto";
  }
  if (roundingIncrement !== 1) {
    invariant(internalSlots.roundingType === "fractionDigits", "Invalid roundingType", TypeError);
    invariant(internalSlots.maximumFractionDigits === internalSlots.minimumFractionDigits, "With roundingIncrement > 1, maximumFractionDigits and minimumFractionDigits must be equal.", RangeError);
  }
}
var VALID_ROUNDING_INCREMENTS;
var init_SetNumberFormatDigitOptions = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/SetNumberFormatDigitOptions.js"() {
    init_DefaultNumberOption();
    init_GetNumberOption();
    init_GetOption();
    init_utils();
    VALID_ROUNDING_INCREMENTS = /* @__PURE__ */ new Set([
      1,
      2,
      5,
      10,
      20,
      25,
      50,
      100,
      200,
      250,
      500,
      1e3,
      2e3,
      2500,
      5e3
    ]);
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/SetNumberFormatUnitOptions.js
function SetNumberFormatUnitOptions(internalSlots, options) {
  if (options === void 0) {
    options = /* @__PURE__ */ Object.create(null);
  }
  var style = GetOption(options, "style", "string", ["decimal", "percent", "currency", "unit"], "decimal");
  internalSlots.style = style;
  var currency = GetOption(options, "currency", "string", void 0, void 0);
  invariant(currency === void 0 || IsWellFormedCurrencyCode(currency), "Malformed currency code", RangeError);
  invariant(style !== "currency" || currency !== void 0, "currency cannot be undefined", TypeError);
  var currencyDisplay = GetOption(options, "currencyDisplay", "string", ["code", "symbol", "narrowSymbol", "name"], "symbol");
  var currencySign = GetOption(options, "currencySign", "string", ["standard", "accounting"], "standard");
  var unit = GetOption(options, "unit", "string", void 0, void 0);
  invariant(unit === void 0 || IsWellFormedUnitIdentifier(unit), "Invalid unit argument for Intl.NumberFormat()", RangeError);
  invariant(style !== "unit" || unit !== void 0, "unit cannot be undefined", TypeError);
  var unitDisplay = GetOption(options, "unitDisplay", "string", ["short", "narrow", "long"], "short");
  if (style === "currency") {
    internalSlots.currency = currency.toUpperCase();
    internalSlots.currencyDisplay = currencyDisplay;
    internalSlots.currencySign = currencySign;
  }
  if (style === "unit") {
    internalSlots.unit = unit;
    internalSlots.unitDisplay = unitDisplay;
  }
}
var init_SetNumberFormatUnitOptions = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/SetNumberFormatUnitOptions.js"() {
    init_GetOption();
    init_IsWellFormedCurrencyCode();
    init_IsWellFormedUnitIdentifier();
    init_utils();
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/InitializeNumberFormat.js
function InitializeNumberFormat(nf, locales, opts, _a) {
  var getInternalSlots = _a.getInternalSlots, localeData = _a.localeData, availableLocales = _a.availableLocales, numberingSystemNames = _a.numberingSystemNames, getDefaultLocale = _a.getDefaultLocale, currencyDigitsData = _a.currencyDigitsData;
  var requestedLocales = CanonicalizeLocaleList(locales);
  var options = CoerceOptionsToObject(opts);
  var opt = /* @__PURE__ */ Object.create(null);
  var matcher = GetOption(options, "localeMatcher", "string", ["lookup", "best fit"], "best fit");
  opt.localeMatcher = matcher;
  var numberingSystem = GetOption(options, "numberingSystem", "string", void 0, void 0);
  if (numberingSystem !== void 0 && numberingSystemNames.indexOf(numberingSystem) < 0) {
    throw RangeError("Invalid numberingSystems: ".concat(numberingSystem));
  }
  opt.nu = numberingSystem;
  var r = ResolveLocale(
    Array.from(availableLocales),
    requestedLocales,
    opt,
    // [[RelevantExtensionKeys]] slot, which is a constant
    ["nu"],
    localeData,
    getDefaultLocale
  );
  var dataLocaleData = localeData[r.dataLocale];
  invariant(!!dataLocaleData, "Missing locale data for ".concat(r.dataLocale));
  var internalSlots = getInternalSlots(nf);
  internalSlots.locale = r.locale;
  internalSlots.dataLocale = r.dataLocale;
  internalSlots.numberingSystem = r.nu;
  internalSlots.dataLocaleData = dataLocaleData;
  SetNumberFormatUnitOptions(internalSlots, options);
  var style = internalSlots.style;
  var notation = GetOption(options, "notation", "string", ["standard", "scientific", "engineering", "compact"], "standard");
  internalSlots.notation = notation;
  var mnfdDefault;
  var mxfdDefault;
  if (style === "currency" && notation === "standard") {
    var currency = internalSlots.currency;
    var cDigits = CurrencyDigits(currency, { currencyDigitsData });
    mnfdDefault = cDigits;
    mxfdDefault = cDigits;
  } else {
    mnfdDefault = 0;
    mxfdDefault = style === "percent" ? 0 : 3;
  }
  SetNumberFormatDigitOptions(internalSlots, options, mnfdDefault, mxfdDefault, notation);
  var compactDisplay = GetOption(options, "compactDisplay", "string", ["short", "long"], "short");
  var defaultUseGrouping = "auto";
  if (notation === "compact") {
    internalSlots.compactDisplay = compactDisplay;
    defaultUseGrouping = "min2";
  }
  var useGrouping = GetStringOrBooleanOption(options, "useGrouping", ["min2", "auto", "always"], "always", false, defaultUseGrouping);
  internalSlots.useGrouping = useGrouping;
  var signDisplay = GetOption(options, "signDisplay", "string", ["auto", "never", "always", "exceptZero", "negative"], "auto");
  internalSlots.signDisplay = signDisplay;
  return nf;
}
var init_InitializeNumberFormat = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/InitializeNumberFormat.js"() {
    init_lib();
    init_CanonicalizeLocaleList();
    init_CoerceOptionsToObject();
    init_GetOption();
    init_GetStringOrBooleanOption();
    init_utils();
    init_CurrencyDigits();
    init_SetNumberFormatDigitOptions();
    init_SetNumberFormatUnitOptions();
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/PartitionPattern.js
function PartitionPattern(pattern) {
  var result = [];
  var beginIndex = pattern.indexOf("{");
  var endIndex = 0;
  var nextIndex = 0;
  var length = pattern.length;
  while (beginIndex < pattern.length && beginIndex > -1) {
    endIndex = pattern.indexOf("}", beginIndex);
    invariant(endIndex > beginIndex, "Invalid pattern ".concat(pattern));
    if (beginIndex > nextIndex) {
      result.push({
        type: "literal",
        value: pattern.substring(nextIndex, beginIndex)
      });
    }
    result.push({
      type: pattern.substring(beginIndex + 1, endIndex),
      value: void 0
    });
    nextIndex = endIndex + 1;
    beginIndex = pattern.indexOf("{", nextIndex);
  }
  if (nextIndex < length) {
    result.push({
      type: "literal",
      value: pattern.substring(nextIndex, length)
    });
  }
  return result;
}
var init_PartitionPattern = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/PartitionPattern.js"() {
    init_utils();
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/SupportedLocales.js
function SupportedLocales(availableLocales, requestedLocales, options) {
  var matcher = "best fit";
  if (options !== void 0) {
    options = ToObject(options);
    matcher = GetOption(options, "localeMatcher", "string", ["lookup", "best fit"], "best fit");
  }
  if (matcher === "best fit") {
    return LookupSupportedLocales(Array.from(availableLocales), requestedLocales);
  }
  return LookupSupportedLocales(Array.from(availableLocales), requestedLocales);
}
var init_SupportedLocales = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/SupportedLocales.js"() {
    init_lib();
    init__();
    init_GetOption();
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/data.js
function isMissingLocaleDataError(e) {
  return e.type === "MISSING_LOCALE_DATA";
}
var MissingLocaleDataError;
var init_data = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/data.js"() {
    init_tslib_es6();
    MissingLocaleDataError = /** @class */
    function(_super) {
      __extends(MissingLocaleDataError2, _super);
      function MissingLocaleDataError2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "MISSING_LOCALE_DATA";
        return _this;
      }
      return MissingLocaleDataError2;
    }(Error);
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/types/date-time.js
var RangePatternType;
var init_date_time = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/types/date-time.js"() {
    (function(RangePatternType2) {
      RangePatternType2["startRange"] = "startRange";
      RangePatternType2["shared"] = "shared";
      RangePatternType2["endRange"] = "endRange";
    })(RangePatternType || (RangePatternType = {}));
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/types/displaynames.js
var init_displaynames = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/types/displaynames.js"() {
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/types/list.js
var init_list = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/types/list.js"() {
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/types/number.js
var init_number = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/types/number.js"() {
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/types/plural-rules.js
var init_plural_rules = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/types/plural-rules.js"() {
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/types/relative-time.js
var init_relative_time = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/types/relative-time.js"() {
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/ToIntlMathematicalValue.js
function ToIntlMathematicalValue(input) {
  var primValue = ToPrimitive(input, "number");
  if (typeof primValue === "bigint") {
    return new decimal_default(primValue);
  }
  if (primValue === void 0) {
    return new decimal_default(NaN);
  }
  if (primValue === true) {
    return new decimal_default(1);
  }
  if (primValue === false) {
    return new decimal_default(0);
  }
  if (primValue === null) {
    return new decimal_default(0);
  }
  try {
    return new decimal_default(primValue);
  } catch (e) {
    return new decimal_default(NaN);
  }
}
var init_ToIntlMathematicalValue = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/ToIntlMathematicalValue.js"() {
    init_decimal();
    init__();
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/index.js
var lib_exports2 = {};
__export(lib_exports2, {
  ApplyUnsignedRoundingMode: () => ApplyUnsignedRoundingMode,
  ArrayCreate: () => ArrayCreate,
  CanonicalizeLocaleList: () => CanonicalizeLocaleList,
  CanonicalizeTimeZoneName: () => CanonicalizeTimeZoneName,
  CoerceOptionsToObject: () => CoerceOptionsToObject,
  CollapseNumberRange: () => CollapseNumberRange,
  ComputeExponent: () => ComputeExponent,
  ComputeExponentForMagnitude: () => ComputeExponentForMagnitude,
  CurrencyDigits: () => CurrencyDigits,
  DateFromTime: () => DateFromTime,
  Day: () => Day,
  DayFromYear: () => DayFromYear,
  DayWithinYear: () => DayWithinYear,
  DaysInYear: () => DaysInYear,
  FormatApproximately: () => FormatApproximately,
  FormatNumeric: () => FormatNumeric,
  FormatNumericRange: () => FormatNumericRange,
  FormatNumericRangeToParts: () => FormatNumericRangeToParts,
  FormatNumericToParts: () => FormatNumericToParts,
  FormatNumericToString: () => FormatNumericToString,
  GetNumberOption: () => GetNumberOption,
  GetOption: () => GetOption,
  GetOptionsObject: () => GetOptionsObject,
  GetStringOrBooleanOption: () => GetStringOrBooleanOption,
  GetUnsignedRoundingMode: () => GetUnsignedRoundingMode,
  HasOwnProperty: () => HasOwnProperty,
  HourFromTime: () => HourFromTime,
  InLeapYear: () => InLeapYear,
  InitializeNumberFormat: () => InitializeNumberFormat,
  IsSanctionedSimpleUnitIdentifier: () => IsSanctionedSimpleUnitIdentifier,
  IsValidTimeZoneName: () => IsValidTimeZoneName,
  IsWellFormedCurrencyCode: () => IsWellFormedCurrencyCode,
  IsWellFormedUnitIdentifier: () => IsWellFormedUnitIdentifier,
  MinFromTime: () => MinFromTime,
  MonthFromTime: () => MonthFromTime,
  OrdinaryHasInstance: () => OrdinaryHasInstance,
  PartitionNumberPattern: () => PartitionNumberPattern,
  PartitionNumberRangePattern: () => PartitionNumberRangePattern,
  PartitionPattern: () => PartitionPattern,
  RangePatternType: () => RangePatternType,
  SANCTIONED_UNITS: () => SANCTIONED_UNITS,
  SIMPLE_UNITS: () => SIMPLE_UNITS,
  SameValue: () => SameValue,
  SecFromTime: () => SecFromTime,
  SetNumberFormatDigitOptions: () => SetNumberFormatDigitOptions,
  SetNumberFormatUnitOptions: () => SetNumberFormatUnitOptions,
  SupportedLocales: () => SupportedLocales,
  TimeClip: () => TimeClip,
  TimeFromYear: () => TimeFromYear,
  ToIntlMathematicalValue: () => ToIntlMathematicalValue,
  ToNumber: () => ToNumber,
  ToObject: () => ToObject,
  ToPrimitive: () => ToPrimitive,
  ToRawFixed: () => ToRawFixed,
  ToRawPrecision: () => ToRawPrecision,
  ToString: () => ToString,
  Type: () => Type,
  WeekDay: () => WeekDay,
  YearFromTime: () => YearFromTime,
  ZERO: () => ZERO,
  _formatToParts: () => formatToParts,
  createDataProperty: () => createDataProperty,
  createMemoizedDateTimeFormat: () => createMemoizedDateTimeFormat,
  createMemoizedListFormat: () => createMemoizedListFormat,
  createMemoizedLocale: () => createMemoizedLocale,
  createMemoizedNumberFormat: () => createMemoizedNumberFormat,
  createMemoizedPluralRules: () => createMemoizedPluralRules,
  defineProperty: () => defineProperty,
  getInternalSlot: () => getInternalSlot,
  getMultiInternalSlots: () => getMultiInternalSlots,
  invariant: () => invariant,
  isLiteralPart: () => isLiteralPart,
  isMissingLocaleDataError: () => isMissingLocaleDataError,
  msFromTime: () => msFromTime,
  removeUnitNamespace: () => removeUnitNamespace,
  setInternalSlot: () => setInternalSlot,
  setMultiInternalSlots: () => setMultiInternalSlots
});
var init_lib3 = __esm({
  "../../node_modules/@formatjs/intl-pluralrules/node_modules/@formatjs/ecma402-abstract/lib/index.js"() {
    init_CanonicalizeLocaleList();
    init_CanonicalizeTimeZoneName();
    init_CoerceOptionsToObject();
    init_GetNumberOption();
    init_GetOption();
    init_GetOptionsObject();
    init_GetStringOrBooleanOption();
    init_IsSanctionedSimpleUnitIdentifier();
    init_IsValidTimeZoneName();
    init_IsWellFormedCurrencyCode();
    init_IsWellFormedUnitIdentifier();
    init_ApplyUnsignedRoundingMode();
    init_CollapseNumberRange();
    init_ComputeExponent();
    init_ComputeExponentForMagnitude();
    init_CurrencyDigits();
    init_format_to_parts();
    init_FormatApproximately();
    init_FormatNumeric();
    init_FormatNumericRange();
    init_FormatNumericRangeToParts();
    init_FormatNumericToParts();
    init_FormatNumericToString();
    init_GetUnsignedRoundingMode();
    init_InitializeNumberFormat();
    init_PartitionNumberPattern();
    init_PartitionNumberRangePattern();
    init_SetNumberFormatDigitOptions();
    init_SetNumberFormatUnitOptions();
    init_ToRawFixed();
    init_ToRawPrecision();
    init_PartitionPattern();
    init_SupportedLocales();
    init_utils();
    init__();
    init_data();
    init_date_time();
    init_displaynames();
    init_list();
    init_number();
    init_plural_rules();
    init_relative_time();
    init_utils();
    init_constants();
    init_ToIntlMathematicalValue();
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/abstract/InitializePluralRules.js
var require_InitializePluralRules = __commonJS({
  "../../node_modules/@formatjs/intl-pluralrules/abstract/InitializePluralRules.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InitializePluralRules = InitializePluralRules;
    var ecma402_abstract_1 = (init_lib3(), __toCommonJS(lib_exports2));
    var intl_localematcher_1 = (init_lib(), __toCommonJS(lib_exports));
    function InitializePluralRules(pl, locales, options, _a) {
      var availableLocales = _a.availableLocales, relevantExtensionKeys = _a.relevantExtensionKeys, localeData = _a.localeData, getDefaultLocale = _a.getDefaultLocale, getInternalSlots = _a.getInternalSlots;
      var requestedLocales = (0, ecma402_abstract_1.CanonicalizeLocaleList)(locales);
      var opt = /* @__PURE__ */ Object.create(null);
      var opts = (0, ecma402_abstract_1.CoerceOptionsToObject)(options);
      var internalSlots = getInternalSlots(pl);
      internalSlots.initializedPluralRules = true;
      var matcher = (0, ecma402_abstract_1.GetOption)(opts, "localeMatcher", "string", ["best fit", "lookup"], "best fit");
      opt.localeMatcher = matcher;
      var r = (0, intl_localematcher_1.ResolveLocale)(availableLocales, requestedLocales, opt, relevantExtensionKeys, localeData, getDefaultLocale);
      internalSlots.locale = r.locale;
      internalSlots.type = (0, ecma402_abstract_1.GetOption)(opts, "type", "string", ["cardinal", "ordinal"], "cardinal");
      (0, ecma402_abstract_1.SetNumberFormatDigitOptions)(internalSlots, opts, 0, 3, "standard");
      return pl;
    }
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/abstract/GetOperands.js
var require_GetOperands = __commonJS({
  "../../node_modules/@formatjs/intl-pluralrules/abstract/GetOperands.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GetOperands = GetOperands;
    var ecma402_abstract_1 = (init_lib3(), __toCommonJS(lib_exports2));
    function GetOperands(s) {
      (0, ecma402_abstract_1.invariant)(typeof s === "string", "GetOperands should have been called with a string");
      var n = (0, ecma402_abstract_1.ToNumber)(s);
      (0, ecma402_abstract_1.invariant)(n.isFinite(), "n should be finite");
      var dp = s.indexOf(".");
      var iv;
      var f;
      var v;
      var fv = "";
      if (dp === -1) {
        iv = n;
        f = ecma402_abstract_1.ZERO;
        v = 0;
      } else {
        iv = s.slice(0, dp);
        fv = s.slice(dp, s.length);
        f = (0, ecma402_abstract_1.ToNumber)(fv);
        v = fv.length;
      }
      var i = (0, ecma402_abstract_1.ToNumber)(iv).abs();
      var w;
      var t;
      if (!f.isZero()) {
        var ft = fv.replace(/0+$/, "");
        w = ft.length;
        t = (0, ecma402_abstract_1.ToNumber)(ft);
      } else {
        w = 0;
        t = ecma402_abstract_1.ZERO;
      }
      return {
        Number: n,
        IntegerDigits: i.toNumber(),
        NumberOfFractionDigits: v,
        NumberOfFractionDigitsWithoutTrailing: w,
        FractionDigits: f.toNumber(),
        FractionDigitsWithoutTrailing: t.toNumber()
      };
    }
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/abstract/ResolvePlural.js
var require_ResolvePlural = __commonJS({
  "../../node_modules/@formatjs/intl-pluralrules/abstract/ResolvePlural.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ResolvePlural = ResolvePlural;
    var ecma402_abstract_1 = (init_lib3(), __toCommonJS(lib_exports2));
    var GetOperands_1 = require_GetOperands();
    function ResolvePlural(pl, n, _a) {
      var getInternalSlots = _a.getInternalSlots, PluralRuleSelect = _a.PluralRuleSelect;
      var internalSlots = getInternalSlots(pl);
      (0, ecma402_abstract_1.invariant)((0, ecma402_abstract_1.Type)(internalSlots) === "Object", "pl has to be an object");
      (0, ecma402_abstract_1.invariant)("initializedPluralRules" in internalSlots, "pluralrules must be initialized");
      if (!n.isFinite()) {
        return "other";
      }
      var locale = internalSlots.locale, type = internalSlots.type;
      var res = (0, ecma402_abstract_1.FormatNumericToString)(internalSlots, n);
      var s = res.formattedString;
      var operands = (0, GetOperands_1.GetOperands)(s);
      return PluralRuleSelect(locale, type, n, operands);
    }
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/get_internal_slots.js
var require_get_internal_slots = __commonJS({
  "../../node_modules/@formatjs/intl-pluralrules/get_internal_slots.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = getInternalSlots;
    var internalSlotMap = /* @__PURE__ */ new WeakMap();
    function getInternalSlots(x) {
      var internalSlots = internalSlotMap.get(x);
      if (!internalSlots) {
        internalSlots = /* @__PURE__ */ Object.create(null);
        internalSlotMap.set(x, internalSlots);
      }
      return internalSlots;
    }
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/index.js
var require_intl_pluralrules = __commonJS({
  "../../node_modules/@formatjs/intl-pluralrules/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PluralRules = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var ecma402_abstract_1 = (init_lib3(), __toCommonJS(lib_exports2));
    var InitializePluralRules_1 = require_InitializePluralRules();
    var ResolvePlural_1 = require_ResolvePlural();
    var get_internal_slots_1 = tslib_1.__importDefault(require_get_internal_slots());
    function validateInstance(instance, method) {
      if (!(instance instanceof PluralRules)) {
        throw new TypeError("Method Intl.PluralRules.prototype.".concat(method, " called on incompatible receiver ").concat(String(instance)));
      }
    }
    function PluralRuleSelect(locale, type, _n, _a) {
      var IntegerDigits = _a.IntegerDigits, NumberOfFractionDigits = _a.NumberOfFractionDigits, FractionDigits = _a.FractionDigits;
      return PluralRules.localeData[locale].fn(NumberOfFractionDigits ? "".concat(IntegerDigits, ".").concat(FractionDigits) : IntegerDigits, type === "ordinal");
    }
    var PluralRules = (
      /** @class */
      function() {
        function PluralRules2(locales, options) {
          var newTarget = this && this instanceof PluralRules2 ? this.constructor : void 0;
          if (!newTarget) {
            throw new TypeError("Intl.PluralRules must be called with 'new'");
          }
          return (0, InitializePluralRules_1.InitializePluralRules)(this, locales, options, {
            availableLocales: PluralRules2.availableLocales,
            relevantExtensionKeys: PluralRules2.relevantExtensionKeys,
            localeData: PluralRules2.localeData,
            getDefaultLocale: PluralRules2.getDefaultLocale,
            getInternalSlots: get_internal_slots_1.default
          });
        }
        PluralRules2.prototype.resolvedOptions = function() {
          validateInstance(this, "resolvedOptions");
          var opts = /* @__PURE__ */ Object.create(null);
          var internalSlots = (0, get_internal_slots_1.default)(this);
          opts.locale = internalSlots.locale;
          opts.type = internalSlots.type;
          [
            "minimumIntegerDigits",
            "minimumFractionDigits",
            "maximumFractionDigits",
            "minimumSignificantDigits",
            "maximumSignificantDigits"
          ].forEach(function(field) {
            var val = internalSlots[field];
            if (val !== void 0) {
              opts[field] = val;
            }
          });
          opts.pluralCategories = tslib_1.__spreadArray([], PluralRules2.localeData[opts.locale].categories[opts.type], true);
          return opts;
        };
        PluralRules2.prototype.select = function(val) {
          var pr = this;
          validateInstance(pr, "select");
          var n = (0, ecma402_abstract_1.ToNumber)(val);
          return (0, ResolvePlural_1.ResolvePlural)(pr, n, { getInternalSlots: get_internal_slots_1.default, PluralRuleSelect });
        };
        PluralRules2.prototype.toString = function() {
          return "[object Intl.PluralRules]";
        };
        PluralRules2.supportedLocalesOf = function(locales, options) {
          return (0, ecma402_abstract_1.SupportedLocales)(PluralRules2.availableLocales, (0, ecma402_abstract_1.CanonicalizeLocaleList)(locales), options);
        };
        PluralRules2.__addLocaleData = function() {
          var data = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
          }
          for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
            var _b = data_1[_a], d = _b.data, locale = _b.locale;
            PluralRules2.localeData[locale] = d;
            PluralRules2.availableLocales.add(locale);
            if (!PluralRules2.__defaultLocale) {
              PluralRules2.__defaultLocale = locale;
            }
          }
        };
        PluralRules2.getDefaultLocale = function() {
          return PluralRules2.__defaultLocale;
        };
        PluralRules2.localeData = {};
        PluralRules2.availableLocales = /* @__PURE__ */ new Set();
        PluralRules2.__defaultLocale = "";
        PluralRules2.relevantExtensionKeys = [];
        PluralRules2.polyfilled = true;
        return PluralRules2;
      }()
    );
    exports.PluralRules = PluralRules;
    try {
      if (typeof Symbol !== "undefined") {
        Object.defineProperty(PluralRules.prototype, Symbol.toStringTag, {
          value: "Intl.PluralRules",
          writable: false,
          enumerable: false,
          configurable: true
        });
      }
      try {
        Object.defineProperty(PluralRules, "length", {
          value: 0,
          writable: false,
          enumerable: false,
          configurable: true
        });
      } catch (error) {
      }
      Object.defineProperty(PluralRules.prototype.constructor, "length", {
        value: 0,
        writable: false,
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(PluralRules.supportedLocalesOf, "length", {
        value: 1,
        writable: false,
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(PluralRules, "name", {
        value: "PluralRules",
        writable: false,
        enumerable: false,
        configurable: true
      });
    } catch (ex) {
    }
  }
});

// ../../node_modules/@formatjs/intl-pluralrules/polyfill-force.js
var require_polyfill_force = __commonJS({
  "../../node_modules/@formatjs/intl-pluralrules/polyfill-force.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var _1 = require_intl_pluralrules();
    Object.defineProperty(Intl, "PluralRules", {
      value: _1.PluralRules,
      writable: true,
      enumerable: false,
      configurable: true
    });
  }
});
export default require_polyfill_force();
/*! Bundled license information:

decimal.js/decimal.mjs:
  (*!
   *  decimal.js v10.6.0
   *  An arbitrary-precision Decimal type for JavaScript.
   *  https://github.com/MikeMcl/decimal.js
   *  Copyright (c) 2025 Michael Mclaughlin <M8ch88l@gmail.com>
   *  MIT Licence
   *)
*/
//# sourceMappingURL=@formatjs_intl-pluralrules_polyfill-force.js.map
