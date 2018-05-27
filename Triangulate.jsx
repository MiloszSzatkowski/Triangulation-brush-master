// app.displayDialogs = DialogModes.NO;
#target photoshop;
$.level = 0;debugger;
$.localize = true;

preferences.rulerUnits = Units.PIXELS;

// var logFile = new File((new File($.fileName)).parent + "/Array.txt");
// var boolFile = new File((new File($.fileName)).parent + "/First_bool.txt");
//
// //check whether it is initial division or not
// var a = boolFile;
// a.open('r');
// var First_bool = "";
// while (!a.eof)
//   First_bool += a.readln();
// a.close();
//
// //parse bool config
// First_bool = parseInt(First_bool);

var aW = app.activeDocument.width.value;
var aH = app.activeDocument.height.value;

//if it's a first division
// if (First_bool) {

  // var centerX = Math.round(app.activeDocument.colorSamplers[0].position[0].value);
  // var centerY = Math.round(app.activeDocument.colorSamplers[0].position[1].value);

  var swirl_X_count = 30;
  var swirl_Y_count = 30;
  var total_swirls = parseInt(swirl_X_count * swirl_Y_count);
  var swirl_Arr = [];
  var divideX, divideY;

  divideX = Math.floor  (aW  / swirl_X_count) ;
  divideY = Math.floor  (aH / swirl_Y_count) ;

  var user_input_Randomness = 1;
  user_input_Randomness = user_input_Randomness / 100;
  var randomness_amount = (user_input_Randomness > 1) ? 1 : user_input_Randomness;

  var max_jiggle_X = Math.floor( divideX / 4  ) ;
  var min_jiggle_X = (0-max_jiggle_X);

  var max_jiggle_Y = Math.floor( divideY / 4  ) ;
  var min_jiggle_Y = (0-max_jiggle_X);


  var INDEX;
    for (var i = 0; i < swirl_Y_count; i++) {
      for (var j = 0; j < swirl_X_count; j++) {
        INDEX = (i*swirl_X_count) + j;

        // MOVING ON GRID:
        // 7 8 9
        // 4 5 6
        // 1 2 3

        // 77777777777777777777777777777777777
        if ( i === 0 && j === 0) {

          swirl_Arr[INDEX] = [
            //left_upper     0
            [0, 0]  ,
            //right_upper    1
            [ (divideX * (j+1)) + random_num_between( min_jiggle_X , max_jiggle_X ) ,  0 ]  ,
            //left_bottom    2
            [ 0 , (divideY * (i+1)) + random_num_between( min_jiggle_Y , max_jiggle_Y )  ] ,
            //right_bottom   3
            [  (divideX * (j+1)) + random_num_between( min_jiggle_X , max_jiggle_X ) ,
            (divideY * (i+1)) + random_num_between( min_jiggle_Y , max_jiggle_Y )   ],
            "||" + (INDEX + 1) + "||" + "\n"
          ];

        // 88888888888888888888888888888888888888
        } else if ( i === 0 && isInRange(j, 0, (swirl_X_count-1)) ){

          swirl_Arr[INDEX] = [
            //left_upper
            swirl_Arr[INDEX-1][1] ,
            //right_upper
            [ (divideX * (j+1)) + random_num_between( min_jiggle_X , max_jiggle_X ) ,  0 ]  ,
            //left_bottom
            swirl_Arr[INDEX-1][3] ,
            //right_bottom
            [  (divideX * (j+1)) + random_num_between( min_jiggle_X , max_jiggle_X ) ,
            (divideY * (i+1)) + random_num_between( min_jiggle_Y , max_jiggle_Y )   ],
            "||" + (INDEX + 1) + "||" + "\n"
          ];

        // 99999999999999999999999999999999999999999
        } else if ( i === 0 && j === (swirl_X_count-1) ) {

            swirl_Arr[INDEX] = [
            //left_upper
            swirl_Arr[INDEX-1][1] ,
            //right_upper
            [ aW ,  0 ]  ,
            //left_bottom
            swirl_Arr[INDEX-1][3] ,
            //right_bottom
            [  aW ,  (divideY * (i+1)) + random_num_between( min_jiggle_Y , max_jiggle_Y )   ],
            "||" + (INDEX + 1) + "||" + "\n"
          ];

        // 44444444444444444444444444444444444444
        } else if ( i > 0 && j===0 && i!==(swirl_Y_count-1) ) {

          swirl_Arr[INDEX] = [
            //left_upper
            swirl_Arr[INDEX-swirl_X_count][2] ,
            //right_upper
            swirl_Arr[INDEX-swirl_X_count][3]  ,
            //left_bottom
            [ 0 , (divideY * (i+1)) + random_num_between( min_jiggle_Y , max_jiggle_Y )] ,
            //right_bottom
            [  (divideX * (j+1)) + random_num_between( min_jiggle_X , max_jiggle_X ) ,
              (divideY * (i+1)) + random_num_between( min_jiggle_Y , max_jiggle_Y )   ],
              "||" + (INDEX + 1) + "||" + "\n"
          ];

        // 55555555555555555555555555555555555555555555
        } else if (i > 0 && isInRange(j, 0, (swirl_X_count-1)) && i!==(swirl_Y_count-1) ) {

          swirl_Arr[INDEX] = [
            //left_upper
            swirl_Arr[INDEX-swirl_X_count][2] ,
            //right_upper
            swirl_Arr[INDEX-swirl_X_count][3]  ,
            //left_bottom
            swirl_Arr[INDEX-1][3] ,
            //right_bottom
            [  (divideX * (j+1)) + random_num_between( min_jiggle_X , max_jiggle_X ) ,
              (divideY * (i+1)) + random_num_between( min_jiggle_Y , max_jiggle_Y )   ],
              "||" + (INDEX + 1) + "||" + "\n"
          ];

        // 66666666666666666666666666666666666666
      } else if (i > 0 && j%(swirl_X_count-1)===0 && i!==(swirl_Y_count-1) ) {

          swirl_Arr[INDEX] = [
            //left_upper
            swirl_Arr[INDEX-swirl_X_count][2] ,
            //right_upper
            swirl_Arr[INDEX-swirl_X_count][3]  ,
            //left_bottom
            swirl_Arr[INDEX-1][3] ,
            //right_bottom
            [  aW ,  (divideY * (i+1)) + random_num_between( min_jiggle_Y , max_jiggle_Y )   ],
            "||" + (INDEX + 1) + "||" + "\n"
          ];

        // 111111111111111111111111111111111111
        } else if (j===0 && i%(swirl_Y_count-1)===0 ) {

          swirl_Arr[INDEX] = [
            //left_upper
            swirl_Arr[INDEX-swirl_X_count][2] ,
            //right_upper
            swirl_Arr[INDEX-swirl_X_count][3]  ,
            //left_bottom
            [0 , aH] ,
            //right_bottom
            [  (divideX * (j+1)) + random_num_between( min_jiggle_X , max_jiggle_X ) , aH ],
            "||" + (INDEX + 1) + "||" + "\n"
          ];

        // 22222222222222222222222222222222222222222
        } else if ( isInRange(j, 0, (swirl_X_count-1)) && i%(swirl_Y_count-1)===0 ) {

          swirl_Arr[INDEX] = [
            //left_upper
            swirl_Arr[INDEX-swirl_X_count][2] ,
            //right_upper
            swirl_Arr[INDEX-swirl_X_count][3]  ,
            //left_bottom
            swirl_Arr[INDEX-1][3] ,
            //right_bottom
            [  (divideX * (j+1)) + random_num_between( min_jiggle_X , max_jiggle_X ) , aH ],
            "||" + (INDEX + 1) + "||" + "\n"
          ];

        // 333333333333333333333333333333333333
        } else if ( j%(swirl_X_count-1)===0 && i%(swirl_Y_count-1)===0  ){

          swirl_Arr[INDEX] = [
            //left_upper
            swirl_Arr[INDEX-swirl_X_count][2] ,
            //right_upper
            swirl_Arr[INDEX-swirl_X_count][3]  ,
            //left_bottom
            swirl_Arr[INDEX-1][3]  ,
            //right_bottom
            [  aW ,   aH   ],
            "||" + (INDEX + 1) + "||" + "\n"
          ];

        }

      }
    }

    function isInRange(x, min, max) {
      if ( x > min && x < max  ) {  return true;  } else { return false; }
    }

    function random_num_between(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }

    // alert(swirl_Arr.toString());

    var center;

    for (var i = 0; i < swirl_Arr.length; i++) {

      center =[];
      center = [ Math.floor( ((swirl_Arr[i][3][0] + swirl_Arr[i][0][0])   / 2 ) ) ,
                 Math.floor( ((swirl_Arr[i][3][1] + swirl_Arr[i][0][1])   / 2 ) ) ];

      make_path_object([
              swirl_Arr[i][0]    ,
              swirl_Arr[i][1]    ,
              center   ,
              swirl_Arr[i][0]
      ]);

      make_path_object([
              swirl_Arr[i][0]     ,
              center   ,
              swirl_Arr[i][2]    ,
              swirl_Arr[i][0]
      ]);

      make_path_object([
              swirl_Arr[i][2]    ,
              center    ,
              swirl_Arr[i][3]    ,
              swirl_Arr[i][2]
      ]);

      make_path_object([
              swirl_Arr[i][3]    ,
              center   ,
              swirl_Arr[i][1]    ,
              swirl_Arr[i][3]
      ]);
    }

    // alert ( swirl_Arr[0][0] + '|' + swirl_Arr[0][1]  + '|' + swirl_Arr[0][2] + '|' + swirl_Arr[0][3] );
    // app.activeDocument.pathItems.removeAll();

//
//   remove_All_Points();
//   // app.activeDocument.pathItems.removeAll();
//
//   boolFile.open("w");
//   boolFile.writeln("0");
//   boolFile.close();
//
// } else if (!First_bool) {
//
//   if (app.activeDocument.pathItems.length > 0) {
//
//
//     //findNearbyCoordinates
//     for (var i = 0; i < app.activeDocument.pathItems.length; i++) {
//       //vars
//       var samplX = Math.round(app.activeDocument.colorSamplers[0].position[0].value);
//       var samplY = Math.round(app.activeDocument.colorSamplers[0].position[1].value);
//       var triangle = {};
//       triangle.x1 = app.activeDocument.
//         pathItems[i].
//         subPathItems[0].
//         pathPoints[0].
//         anchor[0];
//       triangle.y1 = app.activeDocument.
//         pathItems[i].
//         subPathItems[0].
//         pathPoints[0].
//         anchor[1];
//       triangle.x2 = app.activeDocument.
//         pathItems[i].
//         subPathItems[0].
//         pathPoints[1].
//         anchor[0];
//       triangle.y2 = app.activeDocument.
//         pathItems[i].
//         subPathItems[0].
//         pathPoints[1].
//         anchor[1];
//       triangle.x3 = app.activeDocument.
//         pathItems[i].
//         subPathItems[0].
//         pathPoints[2].
//         anchor[0];
//       triangle.y3 = app.activeDocument.
//         pathItems[i].
//         subPathItems[0].
//         pathPoints[2].
//         anchor[1];
//       if (pointInTriange(
//             [              samplX, samplY            ],
//             [              triangle.x1,triangle.y1            ],
//             [              triangle.x2,triangle.y2            ],
//             [              triangle.x3,triangle.y3            ]
//           )) {
//
//             app.activeDocument.pathItems[i].remove();
//
//               make_path_object(
//                 [
//                   [                    samplX, samplY                  ],
//                   [                    triangle.x1,triangle.y1                  ],
//                   [                    triangle.x2,triangle.y2                  ],
//                   [                    samplX, samplY                  ]
//                 ]
//               );
//
//               make_path_object(
//                 [
//                   [                    samplX, samplY                  ],
//                   [                    triangle.x1,triangle.y1                  ],
//                   [                    triangle.x3,triangle.y3                  ],
//                   [                    samplX, samplY                  ]
//                 ]
//               );
//
//               make_path_object(
//                 [
//                   [                    samplX, samplY                  ],
//                   [                    triangle.x2,triangle.y2                  ],
//                   [                    triangle.x3,triangle.y3                  ],
//                   [                    samplX, samplY                  ]
//                 ]
//               );
//               break;
//             }
//         }
//
//   } else {
//     alert("There are no paths to search through.")
//   }
//
//   remove_All_Points();
// }
//
// function pointInTriange(P, A, B, C) {
//   // Round
//   var Ar = A; var Br = B; var Cr = C; var Pr = P;
//   // var Ar = []; var Br = []; var Cr = []; var Pr = [];
//   // Pr[0] = Math.Round(P[0]); Ar[0] = Math.Round(A[0]);
//   // Pr[1] = Math.Round(P[1]); Ar[1] = Math.Round(A[1]);
//   // Br[0] = Math.Round(B[0]); Cr[0] = Math.Round(C[0]);
//   // Br[1] = Math.Round(B[1]); Cr[1] = Math.Round(C[1]);
//   // Compute vectors
//   function vec(from, to) {  return [to[0] - from[0], to[1] - from[1]];  }
//   var v0 = vec(Ar, Cr);
//   var v1 = vec(Ar, Br);
//   var v2 = vec(Ar, Pr);
//   // Compute dot products
//   function dot(u, v) {  return u[0] * v[0] + u[1] * v[1];  }
//   var dot00 = dot(v0, v0);
//   var dot01 = dot(v0, v1);
//   var dot02 = dot(v0, v2);
//   var dot11 = dot(v1, v1);
//   var dot12 = dot(v1, v2);
//   // Compute barycentric coordinates
//   var invDenom = 1.0 / (dot00 * dot11 - dot01 * dot01);
//   var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
//   var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
//   //test
//   // alert(P + '|' + A + '|' + B + '|' + C);
//   // Check if point is in triangle
//   return (u >= 0) && (v >= 0) && (u + v < 1);
// }
//
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
  var minimumX = Math.min( lineArr[0].anchor[0], lineArr[1].anchor[0], lineArr[2].anchor[0]);

  var minimumY = Math.min( lineArr[0].anchor[1], lineArr[1].anchor[1], lineArr[2].anchor[1]);

  var maximumX = Math.max( lineArr[0].anchor[0], lineArr[1].anchor[0], lineArr[2].anchor[0]);

  var maximumY = Math.max( lineArr[0].anchor[1], lineArr[1].anchor[1], lineArr[2].anchor[1]);

  var area = (maximumX-minimumX) * (maximumX-minimumY);

  var Name = area + Math.random();

  var myPathItem = app.activeDocument.pathItems.add(Name, [lineSubPathArray]);

  myPathItem.strokePath(ToolType.BRUSH);

}
//
// function remove_All_Points() {
//   //remove all sample points
//   var idDlt = charIDToTypeID("Dlt ");
//   var desc37 = new ActionDescriptor();
//   var idnull = charIDToTypeID("null");
//   var ref26 = new ActionReference();
//   var idClSm = charIDToTypeID("ClSm");
//   var idOrdn = charIDToTypeID("Ordn");
//   var idAl = charIDToTypeID("Al  ");
//   ref26.putEnumerated(idClSm, idOrdn, idAl);
//   desc37.putReference(idnull, ref26);
//   executeAction(idDlt, desc37, DialogModes.NO);
// }
//
// function findNearbyCoordinates() {}
