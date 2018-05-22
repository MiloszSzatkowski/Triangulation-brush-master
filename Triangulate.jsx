// app.displayDialogs = DialogModes.NO;

preferences.rulerUnits = Units.PIXELS;

var logFile = new File((new File($.fileName)).parent + "/Array.txt");
var boolFile = new File((new File($.fileName)).parent + "/First_bool.txt");
var arrP;

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


  // alert('first');

  make_path_object([    [      0, 0    ],    [      aW, 0    ],    [      centerX, centerY    ], [      0, 0    ]  ]);
  remove_All_Points();
  writeData(0 + ',' + 0 + ',' + aW + ',' + 0 + ',' + centerX + ',' + centerY + '#');

  make_path_object([    [      0, 0    ],    [      centerX, centerY    ],    [      0, aH    ], [      0, 0     ]  ]);
  writeData(0 + ',' + 0 + ',' + centerX + ',' + centerY + ',' + 0 + ',' + aH + '#');

  make_path_object([    [      0, aH   ],    [      centerX, centerY    ],    [      aW, aH   ], [      0, aH    ]  ]);
  writeData(0 + ',' + aH + ',' + centerX + ',' + centerY + ',' + aW + ',' + aH + '#');

  make_path_object([    [      aW, aH   ],    [      centerX, centerY    ],    [      aW, 0  ], [      aW, aH   ]  ]);
  writeData(aW + ',' + aH + ',' + centerX + ',' + centerY + ',' + aW + ',' + 0 + '#');

  // boolFile.open("w");
  // boolFile.writeln("0");
  // boolFile.close();

} else if (!First_bool) {
  // alert('second');
}

function writeData(new_data) {
  logFile.open("a");
  logFile.writeln(new_data);
}

var counter = 0;
function make_path_object(points,counter) {

  var lineArr = [];

  for (x = 0; x < points.length; x++) {
    lineArr[x] = new PathPointInfo();
    lineArr[x].kind = PointKind.CORNERPOINT;
    lineArr[x].anchor = [
      points[x][0],
      points[x][1]
    ];
    lineArr[x].leftDirection = lineArr[x].anchor;
    lineArr[x].rightDirection = lineArr[x].anchor;
  }

  // alert(lineArr[0].leftDirection.anchor.toString());

  var lineSubPathArray = new Array();
  lineSubPathArray[0] = new SubPathInfo();
  lineSubPathArray[0].operation = ShapeOperation.SHAPEXOR;
  lineSubPathArray[0].closed = true;
  lineSubPathArray[0].entireSubPath = lineArr;
  var myPathItem = app.activeDocument.pathItems.add(counter, lineSubPathArray);
  counter++;
  return myPathItem;

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
