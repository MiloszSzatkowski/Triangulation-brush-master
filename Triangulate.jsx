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

//if it's a first division
if (First_bool) {

  var centerX = Math.round(app.activeDocument.colorSamplers[0].position[0].value);
  var centerY = Math.round(app.activeDocument.colorSamplers[0].position[1].value);

  remove_All_Points();

  // alert('first');

  _select(0,0, app.activeDocument.width.value,0, centerX,centerY);
  applyBlur(0,0, app.activeDocument.width.value,0, centerX,centerY);
  writeData(0+','+0+','+ app.activeDocument.width.value+','+0+','+ centerX+','+centerY+'#');
  mergeIt();
  //
  _select(0,0, centerX,centerY, 0,app.activeDocument.height.value);
  applyBlur(0,0, centerX,centerY, 0,app.activeDocument.height.value);
  writeData(0+','+0+','+ centerX+','+centerY+','+ 0+','+app.activeDocument.height.value+'#');
  mergeIt();


  _select(0,app.activeDocument.height.value, centerX,centerY, app.activeDocument.width.value,app.activeDocument.height.value);
  applyBlur(0,app.activeDocument.height.value, centerX,centerY, app.activeDocument.width.value,app.activeDocument.height.value);
  writeData(0+','+app.activeDocument.height.value+','+ centerX+','+centerY+','+ app.activeDocument.width.value+','+app.activeDocument.height.value+'#');
  mergeIt();


  _select(app.activeDocument.width.value,app.activeDocument.height.value, centerX,centerY, app.activeDocument.width.value,0);
  applyBlur(app.activeDocument.width.value,app.activeDocument.height.value, centerX,centerY, app.activeDocument.width.value,0);
  writeData(app.activeDocument.width.value+','+app.activeDocument.height.value+','+ centerX+','+centerY+','+ app.activeDocument.width.value+','+0+'#');
  mergeIt();

  //
  // boolFile.open("w");
  // boolFile.writeln("0");
  // boolFile.close();

} else if (!First_bool) {

  alert('second');

}

function writeData(new_data) {
  logFile.open("a");
  logFile.writeln(new_data);
}

function mergeIt() {
  // select and merge
  var idmove = charIDToTypeID( "move" );
      var desc141 = new ActionDescriptor();
      var idnull = charIDToTypeID( "null" );
          var ref91 = new ActionReference();
          var idLyr = charIDToTypeID( "Lyr " );
          var idOrdn = charIDToTypeID( "Ordn" );
          var idTrgt = charIDToTypeID( "Trgt" );
          ref91.putEnumerated( idLyr, idOrdn, idTrgt );
      desc141.putReference( idnull, ref91 );
      var idT = charIDToTypeID( "T   " );
          var ref92 = new ActionReference();
          var idLyr = charIDToTypeID( "Lyr " );
          ref92.putIndex( idLyr, 3 );
      desc141.putReference( idT, ref92 );
      var idAdjs = charIDToTypeID( "Adjs" );
      desc141.putBoolean( idAdjs, false );
      var idVrsn = charIDToTypeID( "Vrsn" );
      desc141.putInteger( idVrsn, 5 );
      var idLyrI = charIDToTypeID( "LyrI" );
          var list16 = new ActionList();
          list16.putInteger( 17 );
      desc141.putList( idLyrI, list16 );
  executeAction( idmove, desc141, DialogModes.NO );

  // =======================================================
  var idslct = charIDToTypeID( "slct" );
      var desc142 = new ActionDescriptor();
      var idnull = charIDToTypeID( "null" );
          var ref93 = new ActionReference();
          var idLyr = charIDToTypeID( "Lyr " );
          ref93.putName( idLyr, "Triangulation" );
      desc142.putReference( idnull, ref93 );
      var idselectionModifier = stringIDToTypeID( "selectionModifier" );
      var idselectionModifierType = stringIDToTypeID( "selectionModifierType" );
      var idaddToSelection = stringIDToTypeID( "addToSelection" );
      desc142.putEnumerated( idselectionModifier, idselectionModifierType, idaddToSelection );
      var idMkVs = charIDToTypeID( "MkVs" );
      desc142.putBoolean( idMkVs, false );
      var idLyrI = charIDToTypeID( "LyrI" );
          var list17 = new ActionList();
          list17.putInteger( 3 );
          list17.putInteger( 17 );
      desc142.putList( idLyrI, list17 );
  executeAction( idslct, desc142, DialogModes.NO );

  // =======================================================
  var idMrgtwo = charIDToTypeID( "Mrg2" );
      var desc143 = new ActionDescriptor();
  executeAction( idMrgtwo, desc143, DialogModes.NO );
  var idsetd = charIDToTypeID( "setd" );
    var desc169 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref117 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref117.putEnumerated( idLyr, idOrdn, idTrgt );
    desc169.putReference( idnull, ref117 );
    var idT = charIDToTypeID( "T   " );
        var desc170 = new ActionDescriptor();
        var idNm = charIDToTypeID( "Nm  " );
        desc170.putString( idNm, """Triangulation""" );
    var idLyr = charIDToTypeID( "Lyr " );
    desc169.putObject( idT, idLyr, desc170 );
executeAction( idsetd, desc169, DialogModes.NO );
}

// merge new layer
// var idMrgtwo = charIDToTypeID("Mrg2");
// var desc541 = new ActionDescriptor();
// executeAction(idMrgtwo, desc541, DialogModes.NO);

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

function applyBlur(a1, a2, b1, b2, c1, c2) {
  //select
  var idslct = charIDToTypeID("slct");
  var desc503 = new ActionDescriptor();
  var idnull = charIDToTypeID("null");
  var ref278 = new ActionReference();
  var idLyr = charIDToTypeID("Lyr ");
  ref278.putName(idLyr, "Color_Base");
  desc503.putReference(idnull, ref278);
  var idMkVs = charIDToTypeID("MkVs");
  desc503.putBoolean(idMkVs, false);
  var idLyrI = charIDToTypeID("LyrI");
  var list12 = new ActionList();
  list12.putInteger(64);
  desc503.putList(idLyrI, list12);
  executeAction(idslct, desc503, DialogModes.NO);

  //copy content of selection to new layer
  var idCpTL = charIDToTypeID("CpTL");
  executeAction(idCpTL, undefined, DialogModes.NO);
  _select(a1, a2, b1, b2, c1, c2);
  //blur avarage layer
  var idAvrg = charIDToTypeID("Avrg");
  executeAction(idAvrg, undefined, DialogModes.NO);
  //deselect
  var idsetd = charIDToTypeID("setd");
  var desc846 = new ActionDescriptor();
  var idnull = charIDToTypeID("null");
  var ref450 = new ActionReference();
  var idChnl = charIDToTypeID("Chnl");
  var idfsel = charIDToTypeID("fsel");
  ref450.putProperty(idChnl, idfsel);
  desc846.putReference(idnull, ref450);
  var idT = charIDToTypeID("T   ");
  var idOrdn = charIDToTypeID("Ordn");
  var idNone = charIDToTypeID("None");
  desc846.putEnumerated(idT, idOrdn, idNone);
  executeAction(idsetd, desc846, DialogModes.NO);
}

function _select(a1, a2, b1, b2, c1, c2) {
  var idsetd = charIDToTypeID("setd");
  var desc54 = new ActionDescriptor();
  var idnull = charIDToTypeID("null");
  var ref38 = new ActionReference();
  var idChnl = charIDToTypeID("Chnl");
  var idfsel = charIDToTypeID("fsel");
  ref38.putProperty(idChnl, idfsel);
  desc54.putReference(idnull, ref38);
  var idT = charIDToTypeID("T   ");
  var desc55 = new ActionDescriptor();
  var idPts = charIDToTypeID("Pts ");
  var list1 = new ActionList();
  var desc56 = new ActionDescriptor();
  var idHrzn = charIDToTypeID("Hrzn");
  var idPxl = charIDToTypeID("#Pxl");
  // FIRST POINT
  desc56.putUnitDouble(idHrzn, idPxl, a1);
  var idVrtc = charIDToTypeID("Vrtc");
  var idPxl = charIDToTypeID("#Pxl");
  desc56.putUnitDouble(idVrtc, idPxl, a2);
  var idPnt = charIDToTypeID("Pnt ");
  list1.putObject(idPnt, desc56);
  var desc57 = new ActionDescriptor();
  var idHrzn = charIDToTypeID("Hrzn");
  var idPxl = charIDToTypeID("#Pxl");
  // SECOND POINT
  desc57.putUnitDouble(idHrzn, idPxl, b1);
  var idVrtc = charIDToTypeID("Vrtc");
  var idPxl = charIDToTypeID("#Pxl");
  desc57.putUnitDouble(idVrtc, idPxl, b2);
  var idPnt = charIDToTypeID("Pnt ");
  list1.putObject(idPnt, desc57);
  var desc58 = new ActionDescriptor();
  var idHrzn = charIDToTypeID("Hrzn");
  var idPxl = charIDToTypeID("#Pxl");
  // THIRD POINT
  desc58.putUnitDouble(idHrzn, idPxl, c1);
  var idVrtc = charIDToTypeID("Vrtc");
  var idPxl = charIDToTypeID("#Pxl");
  desc58.putUnitDouble(idVrtc, idPxl, c2);
  var idPnt = charIDToTypeID("Pnt ");
  list1.putObject(idPnt, desc58);
  var desc59 = new ActionDescriptor();
  var idHrzn = charIDToTypeID("Hrzn");
  var idPxl = charIDToTypeID("#Pxl");
  // CLOSE SELECTION
  desc59.putUnitDouble(idHrzn, idPxl, a1);
  var idVrtc = charIDToTypeID("Vrtc");
  var idPxl = charIDToTypeID("#Pxl");
  desc59.putUnitDouble(idVrtc, idPxl, a2);
  var idPnt = charIDToTypeID("Pnt ");
  list1.putObject(idPnt, desc59);
  desc55.putList(idPts, list1);
  var idPlgn = charIDToTypeID("Plgn");
  desc54.putObject(idT, idPlgn, desc55);
  var idAntA = charIDToTypeID("AntA");
  desc54.putBoolean(idAntA, true);
  executeAction(idsetd, desc54, DialogModes.NO);
}

function findNearbyCoordinates() {}
