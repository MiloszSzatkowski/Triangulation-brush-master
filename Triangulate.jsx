// app.displayDialogs = DialogModes.NO;

preferences.rulerUnits = Units.PIXELS;

var logFile = new File((new File($.fileName)).parent + "/Array.txt");
var boolFile = new File((new File($.fileName)).parent + "/First_bool.txt");

//check whether it is initial division or not
var a = boolFile;
a.open('r');
var First_bool = "";
while (!a.eof)
  First_bool += a.readln();
a.close();

//parse bool config
First_bool = parseInt(First_bool);

var aW = app.activeDocument.width.value;
var aH = app.activeDocument.height.value;

//if it's a first division
if (First_bool) {

  var centerX = Math.round(app.activeDocument.colorSamplers[0].position[0].value);
  var centerY = Math.round(app.activeDocument.colorSamplers[0].position[1].value);

  make_path_object([
    [      0, 0    ],
    [      aW, 0    ],
    [      centerX, centerY    ],
    [      0, 0    ]
  ]);

  make_path_object([
    [      0, 0    ],
    [      centerX, centerY    ],
    [      0, aH    ],
    [      0, 0    ]
  ]);

  make_path_object([
    [      0, aH    ],
    [      centerX, centerY    ],
    [      aW, aH    ],
    [      0, aH    ]
  ]);

  make_path_object([
    [      aW, aH    ],
    [      centerX, centerY    ],
    [      aW, 0    ],
    [      aW, aH    ]
  ]);

  remove_All_Points();
  // app.activeDocument.pathItems.removeAll();

  boolFile.open("w");
  boolFile.writeln("0");
  boolFile.close();

} else if (!First_bool) {

  if (app.activeDocument.pathItems.length > 0) {

    //sort paths vars
    var tArr = [];
    var area, Tstring;
    var expr = /#/;
    //sort path loop
    for (var i = 0; i < app.activeDocument.pathItems.length; i++) {
      Tstring = app.activeDocument.pathItems[i].name;
      if (Tstring.match(expr)) {
        tArr = Tstring.split('#');
        for (var j = 0; j < tArr.length; j++) {
          tArr[j] = parseFloat(tArr[j]);
        }
        //calc relative
        tArr[2] = tArr[2]-tArr[0];
        tArr[3] = tArr[3]-tArr[1];
        area = tArr[2] * tArr[3];

        app.activeDocument.pathItems[i].name = area;
      }
    }

    //findNearbyCoordinates
    for (var i = 0; i < app.activeDocument.pathItems.length; i++) {
      //vars
      var samplX = Math.round(app.activeDocument.colorSamplers[0].position[0].value);
      var samplY = Math.round(app.activeDocument.colorSamplers[0].position[1].value);
      var triangle = {};
      triangle.x1 = app.activeDocument.
        pathItems[i].
        subPathItems[0].
        pathPoints[0].
        anchor[0];
      triangle.y1 = app.activeDocument.
        pathItems[i].
        subPathItems[0].
        pathPoints[0].
        anchor[1];
      triangle.x2 = app.activeDocument.
        pathItems[i].
        subPathItems[0].
        pathPoints[1].
        anchor[0];
      triangle.y2 = app.activeDocument.
        pathItems[i].
        subPathItems[0].
        pathPoints[1].
        anchor[1];
      triangle.x3 = app.activeDocument.
        pathItems[i].
        subPathItems[0].
        pathPoints[2].
        anchor[0];
      triangle.y3 = app.activeDocument.
        pathItems[i].
        subPathItems[0].
        pathPoints[2].
        anchor[1];
      if (pointInTriange(
            [
              samplX, samplY
            ],
            [
              triangle.x1,triangle.y1
            ],
            [
              triangle.x2,triangle.y2
            ],
            [
              triangle.x3,triangle.y3
            ]
          )) {
            // alert('lol');
            // alert(app.activeDocument.
            //   pathItems[i].name);

              make_path_object(
                [
                  [
                    samplX, samplY
                  ],
                  [
                    triangle.x1,triangle.y1
                  ],
                  [
                    triangle.x2,triangle.y2
                  ],
                  [
                    samplX, samplY
                  ]
                ]
              );

              make_path_object(
                [
                  [
                    samplX, samplY
                  ],
                  [
                    triangle.x1,triangle.y1
                  ],
                  [
                    triangle.x3,triangle.y3
                  ],
                  [
                    samplX, samplY
                  ]
                ]
              );

              make_path_object(
                [
                  [
                    samplX, samplY
                  ],
                  [
                    triangle.x2,triangle.y2
                  ],
                  [
                    triangle.x3,triangle.y3
                  ],
                  [
                    samplX, samplY
                  ]
                ]
              );
              break;
            }
        }

  } else {
    alert("There are no paths to search through.")
  }

  remove_All_Points();
}

function pointInTriange(P, A, B, C) {
  // Round
  var Ar = A; var Br = B; var Cr = C; var Pr = P;
  // var Ar = []; var Br = []; var Cr = []; var Pr = [];
  // Pr[0] = Math.Round(P[0]); Ar[0] = Math.Round(A[0]);
  // Pr[1] = Math.Round(P[1]); Ar[1] = Math.Round(A[1]);
  // Br[0] = Math.Round(B[0]); Cr[0] = Math.Round(C[0]);
  // Br[1] = Math.Round(B[1]); Cr[1] = Math.Round(C[1]);
  // Compute vectors
  function vec(from, to) {  return [to[0] - from[0], to[1] - from[1]];  }
  var v0 = vec(Ar, Cr);
  var v1 = vec(Ar, Br);
  var v2 = vec(Ar, Pr);
  // Compute dot products
  function dot(u, v) {  return u[0] * v[0] + u[1] * v[1];  }
  var dot00 = dot(v0, v0);
  var dot01 = dot(v0, v1);
  var dot02 = dot(v0, v2);
  var dot11 = dot(v1, v1);
  var dot12 = dot(v1, v2);
  // Compute barycentric coordinates
  var invDenom = 1.0 / (dot00 * dot11 - dot01 * dot01);
  var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
  var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
  //test
  // alert(P + '|' + A + '|' + B + '|' + C);
  // Check if point is in triangle
  return (u >= 0) && (v >= 0) && (u + v < 1);
}

// function quickSort(arr, leftPos, rightPos, arrLength) {
//   let initialLeftPos = leftPos;
//   let initialRightPos = rightPos;
//   let direction = true;
//   let pivot = rightPos;
//   while ((leftPos - rightPos) < 0) {
//     if (direction) {
//       if (arr[pivot] < arr[leftPos]) {
//         quickSort.swap(arr, pivot, leftPos);
//         pivot = leftPos;
//         rightPos--;
//         direction = !direction;
//       } else
//         leftPos++;
//     } else {
//       if (arr[pivot] <= arr[rightPos]) {
//         rightPos--;
//       } else {
//         quickSort.swap(arr, pivot, rightPos);
//         leftPos++;
//         pivot = rightPos;
//         direction = !direction;
//       }
//     }
//   }
//   if (pivot - 1 > initialLeftPos) {
//     quickSort(arr, initialLeftPos, pivot - 1, arrLength);
//   }
//   if (pivot + 1 < initialRightPos) {
//     quickSort(arr, pivot + 1, initialRightPos, arrLength);
//   }
// }

// quickSort.swap = (arr, el1, el2) => {
//   let swapedElem = arr[el1];
//   arr[el1] = arr[el2];
//   arr[el2] = swapedElem;
// }

function make_path_object(points, counter) {

  var lineArr = [];

  for (var i = 0; i < points.length; i++) {
    lineArr[i] = new PathPointInfo();
    lineArr[i].kind = PointKind.CORNERPOINT;
    //our points
    lineArr[i].anchor = Array(points[i][0], points[i][1]);
    //handles have the same coord as main point - str line
    lineArr[i].leftDirection = lineArr[i].anchor;
    lineArr[i].rightDirection = lineArr[i].anchor;
  }

  var lineSubPathArray = [];
  var lineSubPathArray = new SubPathInfo();
  lineSubPathArray.operation = ShapeOperation.SHAPEXOR;
  lineSubPathArray.closed = true;
  lineSubPathArray.entireSubPath = lineArr;

  //bounds:
  var minimumX = Math.min(
    lineArr[0].anchor[0], lineArr[1].anchor[0], lineArr[2].anchor[0]);

  var minimumY = Math.min(
    lineArr[0].anchor[1], lineArr[1].anchor[1], lineArr[2].anchor[1]);

  var maximumX = Math.max(
    lineArr[0].anchor[0], lineArr[1].anchor[0], lineArr[2].anchor[0]);

  var maximumY = Math.max(
    lineArr[0].anchor[1], lineArr[1].anchor[1], lineArr[2].anchor[1]);

  var Name = minimumX + '#' + minimumY +
  '#' + maximumX + '#' + maximumY;

  var myPathItem = app.activeDocument.pathItems.add(Name, [lineSubPathArray]);

  myPathItem.strokePath(ToolType.BRUSH);

}

function remove_All_Points() {
  //remove all sample points
  var idDlt = charIDToTypeID("Dlt ");
  var desc37 = new ActionDescriptor();
  var idnull = charIDToTypeID("null");
  var ref26 = new ActionReference();
  var idClSm = charIDToTypeID("ClSm");
  var idOrdn = charIDToTypeID("Ordn");
  var idAl = charIDToTypeID("Al  ");
  ref26.putEnumerated(idClSm, idOrdn, idAl);
  desc37.putReference(idnull, ref26);
  executeAction(idDlt, desc37, DialogModes.NO);
}

function findNearbyCoordinates() {}
