packages.push( ('\n' + File($.fileName).name ) );

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
