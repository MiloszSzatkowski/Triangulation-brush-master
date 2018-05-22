// app.displayDialogs = DialogModes.NO;

preferences.rulerUnits = Units.PIXELS;

var logFile = new File((new File($.fileName)).parent + "/Array.txt");
// logFile.open("a");
// logFile.writeln(",");

var arrP;

if (true) {
writeData(
  Math.round(app.activeDocument.colorSamplers[0].position[0].value)+
    ',' +
  Math.round(app.activeDocument.colorSamplers[0].position[1].value)+
    ','
  );
          // writeData();
          // alert("ww");
          remove_All_Points();

            var b = logFile;
            b.open('r');
            points = "";
            while(!b.eof)
            points += b.readln();
            b.close();

            arrP = points.split(",");

          // alert(arrP.toString());

          if (arrP.length>6) {
            _select(arrP[0],
                    arrP[1],
                    arrP[2],
                    arrP[3],
                    arrP[4],
                    arrP[5]
                  );
                  applyBlur();
                  logFile.open("w");
                  logFile.writeln(" ");
                  //merge new layer
                  var idMrgtwo = charIDToTypeID( "Mrg2" );
                    var desc541 = new ActionDescriptor();
                executeAction( idMrgtwo, desc541, DialogModes.NO );
                }
          }
          // _select()




//
// var _file = new File((new File($.fileName)).parent + "/Array.txt");
// var points = "";

// var old_data = "";
function writeData(new_data) {
  // old_data = readData();
  logFile.open("a");
  logFile.writeln(new_data);
}


function remove_All_Points() {
    //remove all sample points
    var idDlt = charIDToTypeID( "Dlt " );
        var desc37 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var ref26 = new ActionReference();
            var idClSm = charIDToTypeID( "ClSm" );
            var idOrdn = charIDToTypeID( "Ordn" );
            var idAl = charIDToTypeID( "Al  " );
            ref26.putEnumerated( idClSm, idOrdn, idAl );
        desc37.putReference( idnull, ref26 );
    executeAction( idDlt, desc37, DialogModes.NO );
}

// function readData() {
//   var b = _file;
//   b.open('r');
//   points = "";
//   while(!b.eof)
//   points += b.readln();
//   b.close();
//   return points;
// }



// var arrPoints = points.split(",");
// alert(arrPoints);

function applyBlur() {
  //select
  var idslct = charIDToTypeID( "slct" );
      var desc503 = new ActionDescriptor();
      var idnull = charIDToTypeID( "null" );
          var ref278 = new ActionReference();
          var idLyr = charIDToTypeID( "Lyr " );
          ref278.putName( idLyr, "Color_Base" );
      desc503.putReference( idnull, ref278 );
      var idMkVs = charIDToTypeID( "MkVs" );
      desc503.putBoolean( idMkVs, false );
      var idLyrI = charIDToTypeID( "LyrI" );
          var list12 = new ActionList();
          list12.putInteger( 64 );
      desc503.putList( idLyrI, list12 );
  executeAction( idslct, desc503, DialogModes.NO );

//copy content of selection to new layer
var idCpTL = charIDToTypeID( "CpTL" );
executeAction( idCpTL, undefined, DialogModes.NO );
_select(arrP[0],
        arrP[1],
        arrP[2],
        arrP[3],
        arrP[4],
        arrP[5]
      );
//blur avarage layer
var idAvrg = charIDToTypeID( "Avrg" );
executeAction( idAvrg, undefined, DialogModes.NO );
//deselect
var idsetd = charIDToTypeID( "setd" );
    var desc846 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref450 = new ActionReference();
        var idChnl = charIDToTypeID( "Chnl" );
        var idfsel = charIDToTypeID( "fsel" );
        ref450.putProperty( idChnl, idfsel );
    desc846.putReference( idnull, ref450 );
    var idT = charIDToTypeID( "T   " );
    var idOrdn = charIDToTypeID( "Ordn" );
    var idNone = charIDToTypeID( "None" );
    desc846.putEnumerated( idT, idOrdn, idNone );
executeAction( idsetd, desc846, DialogModes.NO );
}

//
// if ( app.activeDocument.colorSamplers.length===3) {
// _select
// } else if (app.activeDocument.colorSamplers.length>3) {
//
// //deselect
// var idsetd = charIDToTypeID( "setd" );
//     var desc188 = new ActionDescriptor();
//     var idnull = charIDToTypeID( "null" );
//         var ref120 = new ActionReference();
//         var idChnl = charIDToTypeID( "Chnl" );
//         var idfsel = charIDToTypeID( "fsel" );
//         ref120.putProperty( idChnl, idfsel );
//     desc188.putReference( idnull, ref120 );
//     var idT = charIDToTypeID( "T   " );
//     var idOrdn = charIDToTypeID( "Ordn" );
//     var idNone = charIDToTypeID( "None" );
//     desc188.putEnumerated( idT, idOrdn, idNone );
// executeAction( idsetd, desc188, DialogModes.NO );
//

// }
//
//
//
function _select(a1,a2,b1,b2,c1,c2) {
  var idsetd = charIDToTypeID( "setd" );
      var desc54 = new ActionDescriptor();
      var idnull = charIDToTypeID( "null" );
          var ref38 = new ActionReference();
          var idChnl = charIDToTypeID( "Chnl" );
          var idfsel = charIDToTypeID( "fsel" );
          ref38.putProperty( idChnl, idfsel );
      desc54.putReference( idnull, ref38 );
      var idT = charIDToTypeID( "T   " );
          var desc55 = new ActionDescriptor();
          var idPts = charIDToTypeID( "Pts " );
              var list1 = new ActionList();
                  var desc56 = new ActionDescriptor();
                  var idHrzn = charIDToTypeID( "Hrzn" );
                  var idPxl = charIDToTypeID( "#Pxl" );
                  desc56.putUnitDouble( idHrzn, idPxl, a1);
                  var idVrtc = charIDToTypeID( "Vrtc" );
                  var idPxl = charIDToTypeID( "#Pxl" );
                  desc56.putUnitDouble( idVrtc, idPxl, a2);
              var idPnt = charIDToTypeID( "Pnt " );
              list1.putObject( idPnt, desc56 );
                  var desc57 = new ActionDescriptor();
                  var idHrzn = charIDToTypeID( "Hrzn" );
                  var idPxl = charIDToTypeID( "#Pxl" );
                  desc57.putUnitDouble( idHrzn, idPxl, b1 );
                  var idVrtc = charIDToTypeID( "Vrtc" );
                  var idPxl = charIDToTypeID( "#Pxl" );
                  desc57.putUnitDouble( idVrtc, idPxl, b2 );
              var idPnt = charIDToTypeID( "Pnt " );
              list1.putObject( idPnt, desc57 );
                  var desc58 = new ActionDescriptor();
                  var idHrzn = charIDToTypeID( "Hrzn" );
                  var idPxl = charIDToTypeID( "#Pxl" );
                  desc58.putUnitDouble( idHrzn, idPxl, c1);
                  var idVrtc = charIDToTypeID( "Vrtc" );
                  var idPxl = charIDToTypeID( "#Pxl" );
                  desc58.putUnitDouble( idVrtc, idPxl, c2);
              var idPnt = charIDToTypeID( "Pnt " );
              list1.putObject( idPnt, desc58 );
                  var desc59 = new ActionDescriptor();
                  var idHrzn = charIDToTypeID( "Hrzn" );
                  var idPxl = charIDToTypeID( "#Pxl" );
                  desc59.putUnitDouble( idHrzn, idPxl, a1 );
                  var idVrtc = charIDToTypeID( "Vrtc" );
                  var idPxl = charIDToTypeID( "#Pxl" );
                  desc59.putUnitDouble( idVrtc, idPxl, a2);
              var idPnt = charIDToTypeID( "Pnt " );
              list1.putObject( idPnt, desc59 );
          desc55.putList( idPts, list1 );
      var idPlgn = charIDToTypeID( "Plgn" );
      desc54.putObject( idT, idPlgn, desc55 );
      var idAntA = charIDToTypeID( "AntA" );
      desc54.putBoolean( idAntA, true );
  executeAction( idsetd, desc54, DialogModes.NO );
}
