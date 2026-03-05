var csc = function (x) {
  return 1.0 / Math.sin(x);
};
var sec = function (x) {
  return 1.0 / Math.cos(x);
};
var cot = function (x) {
  return 1.0 / Math.tan(x);
};
var acsc = function (x) {
  return Math.asin(1.0 / x);
};
var asec = function (x) {
  return Math.acos(1.0 / x);
};
var acot = function (x) {
  return Math.atan(1.0 / x);
};
var u = function (x) {
  if (x < 0) {
    return 0;
  } else {
    return 1;
  }
};

var addImplicitMultiplication = function (S) {
  S = S.replace(/\s+/g, " ").trim();

  var functionNames = [
    "sin",
    "cos",
    "tan",
    "csc",
    "sec",
    "cot",
    "asin",
    "acos",
    "atan",
    "acsc",
    "asec",
    "acot",
    "arcsin",
    "arccos",
    "arctan",
    "arccsc",
    "arcsec",
    "arccot",
    "sqrt",
    "exp",
    "ln",
    "log",
    "abs",
  ];

  for (var fi = 0; fi < functionNames.length; fi++) {
    var fname = functionNames[fi];

    var pattern = new RegExp(fname + "\\s+([a-zA-Z0-9])", "g");
    S = S.replace(pattern, fname + "($1)");
  }

  S = S.replace(/\s+/g, "");

  var result = "";
  for (var i = 0; i < S.length; i++) {
    result += S[i];

    if (i < S.length - 1) {
      var curr = S[i];
      var next = S[i + 1];
      var shouldInsertMult = false;

      if (/[0-9)]/.test(curr) && /[a-zA-Z(]/.test(next)) {
        shouldInsertMult = true;
      } else if (/[a-zA-Z]/.test(curr) && /[0-9a-zA-Z(]/.test(next)) {
        if (/[xytvpea]/.test(curr)) {
          shouldInsertMult = true;
        }
      }

      if (shouldInsertMult) {
        result += "*";
      }
    }
  }
  return result;
};

var parseFunction = function (S) {
  S = addImplicitMultiplication(S);

  var carets;
  carets = parseCaret(S);
  var output;

  i = 0;
  output = "";
  while (i < carets.length) {
    if (allowablechar(carets[i])) {
      output = output + carets[i];
      i = i + 1;
    } else if (
      carets[i] === "x" &&
      (i === carets.length - 1 || allowablechar(carets[i + 1]))
    ) {
      output = output + carets[i];
      i = i + 1;
    } else if (
      carets[i] === "v" &&
      (i === carets.length - 1 || allowablechar(carets[i + 1]))
    ) {
      output = output + carets[i];
      i = i + 1;
    } else if (
      carets[i] === "y" &&
      (i === carets.length - 1 || allowablechar(carets[i + 1]))
    ) {
      output = output + carets[i];
      i = i + 1;
    } else if (
      carets[i] === "e" &&
      (i === carets.length - 1 || allowablechar(carets[i + 1]))
    ) {
      output = output + "(Math.E)";
      i = i + 1;
    } else if (
      carets[i] === "t" &&
      (i === carets.length - 1 || allowablechar(carets[i + 1]))
    ) {
      output = output + "t";
      i = i + 1;
    } else if (
      carets[i] === "a" &&
      (i === carets.length - 1 || allowablechar(carets[i + 1]))
    ) {
      output = output + "a";
      i = i + 1;
    } else if (
      carets.substring(i, i + 2) === "x'" &&
      (i === carets.length - 2 || allowablechar(carets[i + 2]))
    ) {
      output = output + "v";
      i = i + 2;
    } else if (
      carets.substring(i, i + 2) === "pi" &&
      (i === carets.length - 2 || allowablechar(carets[i + 2]))
    ) {
      output = output + "(Math.PI)";
      i = i + 2;
    } else if (carets.substring(i, i + 2) === "u(") {
      output = output + "u(";
      i = i + 2;
    } else if (carets.substring(i, i + 3) === "ln(") {
      output = output + "Math.log(";
      i = i + 3;
    } else if (carets.substring(i, i + 4) === "abs(") {
      output = output + "Math.abs(";
      i = i + 4;
    } else if (carets.substring(i, i + 4) === "max(") {
      output = output + "Math.max(";
      i = i + 4;
    } else if (carets.substring(i, i + 4) === "min(") {
      output = output + "Math.min(";
      i = i + 4;
    } else if (carets.substring(i, i + 4) === "exp(") {
      output = output + "Math.exp(";
      i = i + 4;
    } else if (carets.substring(i, i + 4) === "log(") {
      output = output + "Math.log(";
      i = i + 4;
    } else if (carets.substring(i, i + 4) === "sin(") {
      output = output + "Math.sin(";
      i = i + 4;
    } else if (carets.substring(i, i + 4) === "cos(") {
      output = output + "Math.cos(";
      i = i + 4;
    } else if (carets.substring(i, i + 4) === "tan(") {
      output = output + "Math.tan(";
      i = i + 4;
    } else if (carets.substring(i, i + 4) === "csc(") {
      output = output + "csc(";
      i = i + 4;
    } else if (carets.substring(i, i + 4) === "sec(") {
      output = output + "sec(";
      i = i + 4;
    } else if (carets.substring(i, i + 4) === "cot(") {
      output = output + "cot(";
      i = i + 4;
    } else if (carets.substring(i, i + 5) === "sqrt(") {
      output = output + "Math.sqrt(";
      i = i + 5;
    } else if (carets.substring(i, i + 5) === "asin(") {
      output = output + "Math.asin(";
      i = i + 5;
    } else if (carets.substring(i, i + 5) === "acos(") {
      output = output + "Math.acos(";
      i = i + 5;
    } else if (carets.substring(i, i + 5) === "atan(") {
      output = output + "Math.atan(";
      i = i + 5;
    } else if (carets.substring(i, i + 5) === "acsc(") {
      output = output + "acsc(";
      i = i + 5;
    } else if (carets.substring(i, i + 5) === "asec(") {
      output = output + "asec(";
      i = i + 5;
    } else if (carets.substring(i, i + 5) === "acot(") {
      output = output + "acot(";
      i = i + 5;
    } else if (carets.substring(i, i + 7) === "arcsin(") {
      output = output + "Math.asin(";
      i = i + 7;
    } else if (carets.substring(i, i + 7) === "arccos(") {
      output = output + "Math.acos(";
      i = i + 7;
    } else if (carets.substring(i, i + 7) === "arctan(") {
      output = output + "Math.atan(";
      i = i + 7;
    } else if (carets.substring(i, i + 7) === "arccsc(") {
      output = output + "acsc(";
      i = i + 7;
    } else if (carets.substring(i, i + 7) === "arcsec(") {
      output = output + "asec(";
      i = i + 7;
    } else if (carets.substring(i, i + 7) === "arccot(") {
      output = output + "acot(";
      i = i + 7;
    } else if (carets.substring(i, i + 9) === "Math.pow(") {
      output = output + "Math.pow(";
      i = i + 9;
    } else {
      return "";
    }
  }

  return output;
};

function allowablechar(x) {
  if (x === ".") {
    return true;
  } else if (x === ",") {
    return true;
  } else if (x === "0") {
    return true;
  } else if (x === "1") {
    return true;
  } else if (x === "2") {
    return true;
  } else if (x === "3") {
    return true;
  } else if (x === "4") {
    return true;
  } else if (x === "5") {
    return true;
  } else if (x === "6") {
    return true;
  } else if (x === "7") {
    return true;
  } else if (x === "8") {
    return true;
  } else if (x === "9") {
    return true;
  } else if (x === "+") {
    return true;
  } else if (x === "-") {
    return true;
  } else if (x === "*") {
    return true;
  } else if (x === "/") {
    return true;
  } else if (x === "(") {
    return true;
  } else if (x === ")") {
    return true;
  } else if (x === "[") {
    return true;
  } else if (x === "]") {
    return true;
  } else {
    return false;
  }
}

var parseCaret = function (S) {
  var caretPosition = 0;
  for (i = 1; i < S.length; i++) {
    if (S[i] === "^") {
      caretPosition = i;
    }
  }
  if (caretPosition === 0) {
    return S;
  } else {
    var result;
    var firstPart, head, base;
    var secondPart, exponent, tail;
    firstPart = lastParentheses(S.substring(0, caretPosition));
    head = firstPart[0];
    base = firstPart[1];
    secondPart = firstParentheses(S.substring(caretPosition + 1, S.length));
    exponent = secondPart[0];
    tail = secondPart[1];
    result = head + "Math.pow(" + base + "," + exponent + ")" + tail;
    return parseCaret(result);
  }
};

var firstParentheses = function (S) {
  if (S[0] === "(" || S[0] === "[") {
    var parentheses = 1;
    var cutoff = 1;
    while (parentheses > 0) {
      if (S[cutoff] === "(") {
        parentheses = parentheses + 1;
      }
      if (S[cutoff] === ")") {
        parentheses = parentheses - 1;
      }
      if (S[cutoff] === "[") {
        parentheses = parentheses + 1;
      }
      if (S[cutoff] === "]") {
        parentheses = parentheses - 1;
      }
      cutoff = cutoff + 1;
    }
    return [S.substring(0, cutoff), S.substring(cutoff, S.length)];
  } else {
    return [S[0], S.substring(1, S.length)];
  }
};

var lastParentheses = function (S) {
  if (S[S.length - 1] === ")" || S[S.length - 1] === "]") {
    var parentheses = 1;
    var cutoff = S.length - 2;
    while (parentheses > 0) {
      if (S[cutoff] === ")") {
        parentheses = parentheses + 1;
      }
      if (S[cutoff] === "(") {
        parentheses = parentheses - 1;
      }
      if (S[cutoff] === "]") {
        parentheses = parentheses + 1;
      }
      if (S[cutoff] === "[") {
        parentheses = parentheses - 1;
      }
      cutoff = cutoff - 1;
    }
    return [S.substring(0, cutoff + 1), S.substring(cutoff + 1, S.length)];
  } else {
    return [S.substring(0, S.length - 1), S[S.length - 1]];
  }
};

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var xscale, yscale;
var xmin, xmax, ymin, ymax, tmin, tmax, tstepcount, tO;
var x0, y0;
var xmid, ymid, tmid;
var arrow;
var linewidth;
var xstepsize, ystepsize;

const mycolors = [
  "rgba(100,100,100)",
  "#8b4513",
  "#ff8c00",
  "#d63031",
  "#6c5ce7",
  "#0984e3",
  "#00b894",
  "#2d3436",
];
var steps;

var isBlank;
isBlank = true;

function initializeCanvas() {
  updateHuePreview();
}

function updateHuePreview() {
  var hue = document.getElementById("hue_id").value;
  var color = "hsl(" + hue + ", 80%, 45%)";
  document.getElementById("hue-preview").style.backgroundColor = color;
}

function setDerivatives() {
  yprimeString = parseFunction(document.getElementById("yprime_id").value);
  xprimeString = parseFunction(document.getElementById("xprime_id").value);
  try {
    eval(
      "yprime = function (x,y,t,a) { with(Math) {return " +
        yprimeString +
        ";}}",
    );
  } catch (e) {
    alert(e);
    throw e;
  }
  try {
    eval(
      "xprime = function (x,y,t,a) { with(Math) {return " +
        xprimeString +
        ";}}",
    );
  } catch (e) {
    alert(e);
    throw e;
  }
}

function zoomIn() {
  xmin = document.getElementById("xmin_id").value;
  xmax = document.getElementById("xmax_id").value;
  ymin = document.getElementById("ymin_id").value;
  ymax = document.getElementById("ymax_id").value;

  xmid = 0.5 * xmin + 0.5 * xmax;
  ymid = 0.5 * ymin + 0.5 * ymax;

  document.getElementById("xmin_id").value = Math.floor(
    xmid - 0.65 * (xmid - xmin),
  );
  document.getElementById("xmax_id").value = Math.ceil(
    xmid + 0.65 * (xmid - xmin),
  );
  document.getElementById("ymin_id").value = Math.floor(
    ymid - 0.65 * (ymid - ymin),
  );
  document.getElementById("ymax_id").value = Math.ceil(
    ymid + 0.65 * (ymid - ymin),
  );

  xmin = document.getElementById("xmin_id").value;
  xmax = document.getElementById("xmax_id").value;
  ymin = document.getElementById("ymin_id").value;
  ymax = document.getElementById("ymax_id").value;

  draw();
}

function plusT() {
  tO = document.getElementById("tO_id").value;
  document.getElementById("tO_id").value = 1.0 * tO + 1;
  tO = document.getElementById("tO_id").value;
}

function minusT() {
  tO = document.getElementById("tO_id").value;
  document.getElementById("tO_id").value = 1.0 * tO - 1;
  tO = document.getElementById("tO_id").value;
}

function pluslinewidth() {
  linewidth = document.getElementById("linewidth_id").value;
  if (linewidth > 1) {
    document.getElementById("linewidth_id").value = Math.round(
      1.0 * linewidth + 1,
    );
  } else {
    document.getElementById("linewidth_id").value = 1.41421356 * linewidth;
  }
  linewidth = document.getElementById("linewidth_id").value;
}

function minuslinewidth() {
  linewidth = document.getElementById("linewidth_id").value;
  if (linewidth > 1) {
    document.getElementById("linewidth_id").value = Math.round(
      1.0 * linewidth - 1,
    );
  } else {
    document.getElementById("linewidth_id").value = 0.70710678 * linewidth;
  }
  linewidth = document.getElementById("linewidth_id").value;
}

function longerArrows() {
  arrow = document.getElementById("arrow_id").value;
  arrow = arrow * 1.0;
  if (arrow > 2) {
    document.getElementById("arrow_id").value = Math.ceil(1.3 * arrow);
  } else {
    document.getElementById("arrow_id").value = 1.3 * arrow;
  }
  arrow = document.getElementById("arrow_id").value;
  draw();
}

function shorterArrows() {
  arrow = document.getElementById("arrow_id").value;
  arrow = arrow * 1.0;
  if (arrow > 2) {
    document.getElementById("arrow_id").value = Math.ceil(0.65 * arrow);
  } else {
    document.getElementById("arrow_id").value = 0.65 * arrow;
  }
  arrow = document.getElementById("arrow_id").value;
  draw();
}

function moreArrows() {
  steps = document.getElementById("arrownumber_id").value;
  document.getElementById("arrownumber_id").value = Math.ceil(1.4142 * steps);
  steps = document.getElementById("arrownumber_id").value;
  draw();
}

function fewerArrows() {
  steps = document.getElementById("arrownumber_id").value;
  document.getElementById("arrownumber_id").value = Math.ceil(0.7071 * steps);
  steps = document.getElementById("arrownumber_id").value;
  draw();
}

function resetArrows() {
  xmin = document.getElementById("xmin_id").value;
  xmax = document.getElementById("xmax_id").value;
  ymin = document.getElementById("ymin_id").value;
  ymax = document.getElementById("ymax_id").value;
  xstepsize = Math.ceil(1.0 * ((xmax - xmin) / 20.0));
  document.getElementById("arrownumber_id").value = Math.round(
    (1.0 * xmax - 1.0 * xmin) / (1.0 * xstepsize),
  );
  draw();
}

function zoomOut() {
  xmin = document.getElementById("xmin_id").value;
  xmax = document.getElementById("xmax_id").value;
  ymin = document.getElementById("ymin_id").value;
  ymax = document.getElementById("ymax_id").value;

  xmid = 0.5 * xmin + 0.5 * xmax;
  ymid = 0.5 * ymin + 0.5 * ymax;

  document.getElementById("xmin_id").value = Math.floor(
    1.0 * xmid - 1.2 * (xmid - xmin),
  );
  document.getElementById("xmax_id").value = Math.ceil(
    1.0 * xmid + 1.2 * (xmax - xmid),
  );
  document.getElementById("ymin_id").value = Math.floor(
    1.0 * ymid - 1.2 * (ymid - ymin),
  );
  document.getElementById("ymax_id").value = Math.ceil(
    1.0 * ymid + 1.2 * (ymax - ymid),
  );

  xmin = document.getElementById("xmin_id").value;
  xmax = document.getElementById("xmax_id").value;
  ymin = document.getElementById("ymin_id").value;
  ymax = document.getElementById("ymax_id").value;

  draw();
}

function zoomOutT() {
  tmin = document.getElementById("tmin_id").value;
  tmax = document.getElementById("tmax_id").value;
  tO = document.getElementById("tO_id").value;

  document.getElementById("tmin_id").value = Math.floor(
    1.0 * tO - 2 * (1.0 * tO - 1.0 * tmin),
  );
  document.getElementById("tmax_id").value = Math.ceil(
    1.0 * tO + 2 * (1.0 * tmax - 1.0 * tO),
  );

  tmin = document.getElementById("tmin_id").value;
  tmax = document.getElementById("tmax_id").value;
}

function zoomInT() {
  tmin = document.getElementById("tmin_id").value;
  tmax = document.getElementById("tmax_id").value;
  tO = document.getElementById("tO_id").value;

  document.getElementById("tmin_id").value = Math.floor(
    1.0 * tO - 0.5 * (1.0 * tO - 1.0 * tmin),
  );
  document.getElementById("tmax_id").value = Math.ceil(
    1.0 * tO + 0.5 * (1.0 * tmax - 1.0 * tO),
  );

  tmin = document.getElementById("tmin_id").value;
  tmax = document.getElementById("tmax_id").value;
}

function syncParamSlider() {
  var val = parseFloat(document.getElementById("param_a_id").value);
  if (!isNaN(val)) {
    document.getElementById("param_a_slider").value = val;
  }
}

function syncParamInput() {
  var val = document.getElementById("param_a_slider").value;
  document.getElementById("param_a_id").value = val;
  if (document.getElementById("auto_on_slide").checked) {
    autopopulate();
  } else {
    draw();
  }
}

function autopopulate() {
  draw();
  var count =
    parseInt(document.getElementById("autopopulate_count").value) || 8;

  var xminVal = parseFloat(document.getElementById("xmin_id").value);
  var xmaxVal = parseFloat(document.getElementById("xmax_id").value);
  var yminVal = parseFloat(document.getElementById("ymin_id").value);
  var ymaxVal = parseFloat(document.getElementById("ymax_id").value);

  var gridSize = Math.ceil(Math.sqrt(count));
  var xStep = (xmaxVal - xminVal) / (gridSize + 1);
  var yStep = (ymaxVal - yminVal) / (gridSize + 1);

  var traced = 0;
  for (var i = 1; i <= gridSize && traced < count; i++) {
    for (var j = 1; j <= gridSize && traced < count; j++) {
      var startX = xminVal + i * xStep;
      var startY = yminVal + j * yStep;

      var canvasX = startX * xscale + x0;
      var canvasY = startY * -1.0 * yscale + y0;
      doMouseDown(canvas, canvasX, canvasY);
      traced++;
    }
  }
}

function updateParamRange() {
  var min = parseFloat(document.getElementById("param_a_min").value);
  var max = parseFloat(document.getElementById("param_a_max").value);
  if (!isNaN(min) && !isNaN(max)) {
    document.getElementById("param_a_slider").min = min;
    document.getElementById("param_a_slider").max = max;
  }
}

function draw() {
  isBlank = false;
  steps = document.getElementById("arrownumber_id").value;
  if (document.getElementById("manyArrows").checked) {
    tstepcount = mycolors.length - 1;
  } else {
    tstepcount = 0;
  }
  xmin = document.getElementById("xmin_id").value;
  xmax = document.getElementById("xmax_id").value;
  tmin = document.getElementById("tmin_id").value;
  tmax = document.getElementById("tmax_id").value;
  ymin = document.getElementById("ymin_id").value;
  ymax = document.getElementById("ymax_id").value;
  tO = document.getElementById("tO_id").value;
  arrow = document.getElementById("arrow_id").value;

  var paramA = parseFloat(document.getElementById("param_a_id").value);

  var xAxis = document.getElementById("xAxisCanvas");
  var yAxis = document.getElementById("yAxisCanvas");
  var xCtx = xAxis.getContext("2d");
  var yCtx = yAxis.getContext("2d");
  xCtx.font = "16px Courier New";
  yCtx.font = "16px Courier New";
  xCtx.fillStyle = "#333";
  yCtx.fillStyle = "#333";
  var axismax;
  axismax = Math.max(
    Math.abs(xmin),
    Math.abs(xmax),
    Math.abs(ymin),
    Math.abs(ymax),
  );
  if (axismax > 10) {
    xCtx.font = "12px Courier New";
    yCtx.font = "12px Courier New";
  }
  if (axismax > 100) {
    xCtx.font = "9px Courier New";
    yCtx.font = "9px Courier New";
  }
  context.clearRect(0, 0, canvas.width, canvas.height);
  xCtx.clearRect(0, 0, xAxis.width, xAxis.height);
  yCtx.clearRect(0, 0, yAxis.width, yAxis.height);

  context.lineWidth = 1;

  setDerivatives();

  xmid = 0.5 * (xmin + xmax);
  ymid = 0.5 * (ymin + ymax);

  xscale = (1.0 * canvas.width) / (xmax - xmin);
  yscale = (1.0 * canvas.height) / (ymax - ymin);

  x0 = -1 * xmin * xscale;
  y0 = ymax * yscale;
  var xstep = (xmax - xmin) / steps;
  var ystep = (ymax - ymin) / steps;

  context.lineWidth = 1;
  context.strokeStyle = "#666";
  context.beginPath();
  xCtx.textAlign = "center";
  yCtx.textAlign = "end";
  xCtx.textBaseline = "top";
  yCtx.textBaseline = "middle";
  xstepsize = Math.ceil(1.0 * ((xmax - xmin) / 20.0));
  ystepsize = Math.ceil(1.0 * ((ymax - ymin) / 20.0));
  var x;
  x = Math.round(1.0 * xmin) + xstepsize;
  while (x <= xmax - 0.2) {
    if (x != 0) {
      context.moveTo(x * xscale + x0, 0);
      context.lineTo(x * xscale + x0, canvas.height);
    }
    if (x == Math.round(x)) {
      xCtx.fillText(x, x * xscale + x0, 1);
    }
    x = x + xstepsize;
  }
  var y;
  y = Math.round(1.0 * ymin) + ystepsize;
  while (y <= ymax - 0.2) {
    if (y != 0) {
      context.moveTo(0, y0 - y * yscale);
      context.lineTo(canvas.width, y0 - y * yscale);
    }
    if (y == Math.round(y)) {
      yCtx.fillText(y, yAxis.width - 1, y0 - y * yscale);
    }
    y = y + ystepsize;
  }
  context.stroke();

  context.strokeStyle = "#000";
  context.beginPath();
  context.moveTo(x0, 0);
  context.lineTo(x0, canvas.height);
  context.moveTo(0, y0);
  context.lineTo(canvas.width, y0);
  context.stroke();

  context.strokeStyle = "#000";
  context.beginPath();

  var dx, dy;
  var arrowheaddx, arrowheaddy;

  var t;
  for (tstep = 0; tstep <= tstepcount; tstep = tstep + 1) {
    if (tstep < tstepcount) {
      context.strokeStyle = mycolors[tstep];
    } else {
      context.strokeStyle = "#000";
    }
    t = 1.0 * tO;
    if (tstepcount > 0) {
      t = 1.0 * tmin + (tstep * (1.0 * tmax - 1.0 * tmin)) / (1.0 * tstepcount);
    }
    context.beginPath();
    x = 1.0 * xmin + xstep / 2;
    var dxfinal, dyfinal, arrowdiff;
    while (x <= xmax) {
      y = 1.0 * ymin + ystep / 2;
      while (y <= ymax) {
        plotdiagonal = Math.sqrt(
          (ymax - ymin) * (ymax - ymin) + (xmax - xmin) * (xmax - xmin),
        );
        dx =
          (xprime(x, y, t, paramA) * arrow * (1.0 * ymax - 1.0 * ymin)) /
          plotdiagonal;
        dy =
          (yprime(x, y, t, paramA) * arrow * (1.0 * xmax - 1.0 * xmin)) /
          plotdiagonal;
        dxfinal =
          (xprime(x, y, 1.0 * tmax, paramA) *
            arrow *
            (1.0 * ymax - 1.0 * ymin)) /
          plotdiagonal;
        dyfinal =
          (yprime(x, y, 1.0 * tmax, paramA) *
            arrow *
            (1.0 * xmax - 1.0 * xmin)) /
          plotdiagonal;
        arrowdiff =
          Math.abs(1.0 * dx - 1.0 * dxfinal) +
          Math.abs(1.0 * dy - 1.0 * dyfinal);
        if (arrowdiff > 0.1) {
          document.getElementById("manyArrows").checked = true;
        }
        if (tstep == tstepcount || arrowdiff > 0.1) {
          arrowlength = Math.sqrt(dx * dx + dy * dy);
          if (document.getElementById("variableArrows").checked) {
            arrowheaddx = (0.5 * dx) / (1 + arrowlength / 20);
            arrowheaddy = (0.5 * dy) / (1 + arrowlength / 20);
          } else {
            dx = (dx * arrow) / arrowlength;
            dy = (dy * arrow) / arrowlength;
            arrowlength = 1;
            arrowheaddx = 0.3 * dx;
            arrowheaddy = 0.3 * dy;
          }
          var arrowheadlength;
          arrowheadlength = Math.sqrt(
            arrowheaddx * arrowheaddx + arrowheaddy * arrowheaddy,
          );
          if (arrowheadlength > 6) {
            arrowheaddx = (6.0 / arrowheadlength) * arrowheaddx;
            arrowheaddy = (6.0 / arrowheadlength) * arrowheaddy;
          }
          context.beginPath();
          context.moveTo(x0 + x * xscale - dx / 2, y0 - y * yscale + dy / 2);
          context.lineTo(x0 + x * xscale + dx / 2, y0 - y * yscale - dy / 2);
          context.moveTo(
            x0 + x * xscale + dx / 2 - arrowheaddx + 0.5 * arrowheaddy,
            y0 - y * yscale - dy / 2 + arrowheaddy + 0.5 * arrowheaddx,
          );
          context.lineTo(x0 + x * xscale + dx / 2, y0 - y * yscale - dy / 2);
          context.lineTo(
            x0 + x * xscale + dx / 2 - arrowheaddx - 0.5 * arrowheaddy,
            y0 - y * yscale - dy / 2 + arrowheaddy - 0.5 * arrowheaddx,
          );
          context.stroke();
        }
        y = y + ystep;
      }
      x = x + xstep;
    }
  }
}

canvas.addEventListener(
  "mousedown",
  function (evt) {
    var mousePos = getMousePos(canvas, evt);
    doMouseDown(canvas, mousePos.x, mousePos.y);
  },
  false,
);

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}

function setColor(T) {
  whichcolor = Math.round(
    ((T - 1.0 * tmin) * tstepcount) / (1.0 * tmax - 1.0 * tmin),
  );
  if (whichcolor >= tstepcount + 1) {
    whichcolor = tstepcount;
  }
  if (whichcolor < 0) {
    whichcolor = 0;
  }
  if (tstepcount > 0) {
    context.strokeStyle = mycolors[whichcolor];
    context.fillStyle = mycolors[whichcolor];
  }
}

var doMouseDown = function (canvas, xcoord, ycoord) {
  if (document.getElementById("manyArrows").checked) {
    tstepcount = mycolors.length - 1;
  } else {
    tstepcount = 0;
  }
  xmin = document.getElementById("xmin_id").value;
  xmax = document.getElementById("xmax_id").value;
  tmin = document.getElementById("tmin_id").value;
  tmax = document.getElementById("tmax_id").value;
  ymin = document.getElementById("ymin_id").value;
  ymax = document.getElementById("ymax_id").value;
  tO = document.getElementById("tO_id").value;
  arrow = document.getElementById("arrow_id").value;

  var paramA = parseFloat(document.getElementById("param_a_id").value);

  var hue = document.getElementById("hue_id").value;
  var traceColor = "hsl(" + hue + ", 80%, 45%)";
  context.strokeStyle = traceColor;
  context.fillStyle = traceColor;
  linewidth = document.getElementById("linewidth_id").value;
  context.lineWidth = linewidth;
  arrow = document.getElementById("arrow_id").value;
  var dt;
  var dT;
  dT = tmax * 0.001 - tmin * 0.001;
  tO = document.getElementById("tO_id").value;

  var X, Y, T, prevX, prevY;
  var dx, dy, tstep;
  var startingX, startingY, isMoving, isNotBlowingUp;
  var RKX1, RKX2, RKX3, RKX4;
  var RKY1, RKY2, RKY3, RKY4;

  T = tO * 1.0;
  setColor(T);

  for (i = -1; i <= 1; i = i + 2) {
    context.beginPath();
    context.moveTo(xcoord, ycoord);
    X = (xcoord - x0) / xscale;
    Y = -(ycoord - y0) / yscale;
    prevX = X;
    prevY = Y;
    tstep = 0;
    isMoving = false;
    isNotBlowingUp = true;
    startingX = X;
    startingY = Y;
    prevX = X;
    prevY = Y;
    T = tO * 1.0;
    while (
      tstep < 50000 &&
      X < xmax + 100 * (xmax - xmin) &&
      X > xmin - 100 * (xmax - xmin) &&
      Y < ymax + 100 * (xmax - xmin) &&
      Y > ymin - 100 * (xmax - xmin) &&
      T <= tmax &&
      T >= tmin &&
      Math.abs(X - prevX) < (xmax - xmin) / 20 &&
      Math.abs(Y - prevY) < (ymax - ymin) / 20 &&
      isNotBlowingUp
    ) {
      tstep = tstep + 1;

      RKX1 = i * xprime(X, Y, T, paramA);
      RKY1 = i * yprime(X, Y, T, paramA);
      dt = dT / (1 + Math.sqrt(RKX1 * RKX1 + RKY1 * RKY1));
      RKX2 =
        i *
        xprime(
          X + 0.5 * dt * RKX1,
          Y + 0.5 * dt * RKY1,
          T + i * 0.5 * dt,
          paramA,
        );
      RKY2 =
        i *
        yprime(
          X + 0.5 * dt * RKX1,
          Y + 0.5 * dt * RKY1,
          T + i * 0.5 * dt,
          paramA,
        );
      RKX3 =
        i *
        xprime(
          X + 0.5 * dt * RKX2,
          Y + 0.5 * dt * RKY2,
          T + i * 0.5 * dt,
          paramA,
        );
      RKY3 =
        i *
        yprime(
          X + 0.5 * dt * RKX2,
          Y + 0.5 * dt * RKY2,
          T + i * 0.5 * dt,
          paramA,
        );
      RKX4 = i * xprime(X + dt * RKX3, Y + dt * RKY3, T + i * dt, paramA);
      RKY4 = i * yprime(X + dt * RKX3, Y + dt * RKY3, T + i * dt, paramA);
      dx = (1 / 6) * dt * (RKX1 + 2 * RKX2 + 2 * RKX3 + RKX4);
      dy = (1 / 6) * dt * (RKY1 + 2 * RKY2 + 2 * RKY3 + RKY4);
      prevX = X;
      prevY = Y;
      setColor(T);
      context.beginPath();
      context.moveTo(x0 + X * xscale, y0 - Y * yscale);
      X = X + dx;
      Y = Y + dy;
      T = T + i * dt;
      isNotBlowingUp = false;
      if (Math.abs(dx) / (xmax - xmin) + Math.abs(dy) / (ymax - ymin) < 0.01) {
        context.lineTo(x0 + X * xscale, y0 - Y * yscale);
        isNotBlowingUp = true;
      }
      if (Math.abs((startingX - X) * xscale) > 2) {
        isMoving = true;
      }
      if (Math.abs((startingY - Y) * yscale) > 2) {
        isMoving = true;
      }
      context.stroke();
    }
  }
};
