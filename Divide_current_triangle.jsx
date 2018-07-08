packages.push( ('\n' + File($.fileName).name ) );

function findNearbyCoordinates() {

  //check if there is any path in a document
    if (app.activeDocument.    pathItems[0].    subPathItems[0].    pathPoints[0].   anchor[0] == undefined) {
        alert("There are no paths to search through.");
        return; }

  //loop through paths to find nearby coordinates
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
          [              samplX, samplY            ],
          [              triangle.x1,triangle.y1            ],
          [              triangle.x2,triangle.y2            ],
          [              triangle.x3,triangle.y3            ]
          //if statement start
        )) {

          app.activeDocument.pathItems[i].remove();

            make_path_object(
              [
                [                    samplX, samplY                  ],
                [                    triangle.x1,triangle.y1                  ],
                [                    triangle.x2,triangle.y2                  ],
                [                    samplX, samplY                  ]
              ]
            );

            make_path_object(
              [
                [                    samplX, samplY                  ],
                [                    triangle.x1,triangle.y1                  ],
                [                    triangle.x3,triangle.y3                  ],
                [                    samplX, samplY                  ]
              ]
            );

            make_path_object(
              [
                [                    samplX, samplY                  ],
                [                    triangle.x2,triangle.y2                  ],
                [                    triangle.x3,triangle.y3                  ],
                [                    samplX, samplY                  ]
              ]
            );
            break;

            } //if statement end
        } //for loop end
    } //function end

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
