// app.displayDialogs = DialogModes.NO;

preferences.rulerUnits = Units.PIXELS;

// var NewSelection;
//
// var h = app.activeDocument.width.value;
// var v = app.activeDocument.width.value;

// alert("working");

// var idslct = charIDToTypeID( "slct" );
//     var desc5 = new ActionDescriptor();
//     var idnull = charIDToTypeID( "null" );
//         var ref1 = new ActionReference();
//         var idcolorSamplerTool = stringIDToTypeID( "colorSamplerTool" );
//         ref1.putClass( idcolorSamplerTool );
//     desc5.putReference( idnull, ref1 );
//     var iddontRecord = stringIDToTypeID( "dontRecord" );
//     desc5.putBoolean( iddontRecord, true );
//     var idforceNotify = stringIDToTypeID( "forceNotify" );
//     desc5.putBoolean( idforceNotify, true );
// executeAction( idslct, desc5, DialogModes.NO );

if ( app.activeDocument.colorSamplers.length===3) {
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
                  desc56.putUnitDouble( idHrzn, idPxl, app.activeDocument.colorSamplers[0].position[0].value );
                  var idVrtc = charIDToTypeID( "Vrtc" );
                  var idPxl = charIDToTypeID( "#Pxl" );
                  desc56.putUnitDouble( idVrtc, idPxl, app.activeDocument.colorSamplers[0].position[1].value);
              var idPnt = charIDToTypeID( "Pnt " );
              list1.putObject( idPnt, desc56 );
                  var desc57 = new ActionDescriptor();
                  var idHrzn = charIDToTypeID( "Hrzn" );
                  var idPxl = charIDToTypeID( "#Pxl" );
                  desc57.putUnitDouble( idHrzn, idPxl, app.activeDocument.colorSamplers[1].position[0].value  );
                  var idVrtc = charIDToTypeID( "Vrtc" );
                  var idPxl = charIDToTypeID( "#Pxl" );
                  desc57.putUnitDouble( idVrtc, idPxl, app.activeDocument.colorSamplers[1].position[1].value );
              var idPnt = charIDToTypeID( "Pnt " );
              list1.putObject( idPnt, desc57 );
                  var desc58 = new ActionDescriptor();
                  var idHrzn = charIDToTypeID( "Hrzn" );
                  var idPxl = charIDToTypeID( "#Pxl" );
                  desc58.putUnitDouble( idHrzn, idPxl, app.activeDocument.colorSamplers[2].position[0].value);
                  var idVrtc = charIDToTypeID( "Vrtc" );
                  var idPxl = charIDToTypeID( "#Pxl" );
                  desc58.putUnitDouble( idVrtc, idPxl, app.activeDocument.colorSamplers[2].position[1].value );
              var idPnt = charIDToTypeID( "Pnt " );
              list1.putObject( idPnt, desc58 );
                  var desc59 = new ActionDescriptor();
                  var idHrzn = charIDToTypeID( "Hrzn" );
                  var idPxl = charIDToTypeID( "#Pxl" );
                  desc59.putUnitDouble( idHrzn, idPxl, app.activeDocument.colorSamplers[0].position[0].value );
                  var idVrtc = charIDToTypeID( "Vrtc" );
                  var idPxl = charIDToTypeID( "#Pxl" );
                  desc59.putUnitDouble( idVrtc, idPxl, app.activeDocument.colorSamplers[0].position[1].value );
              var idPnt = charIDToTypeID( "Pnt " );
              list1.putObject( idPnt, desc59 );
          desc55.putList( idPts, list1 );
      var idPlgn = charIDToTypeID( "Plgn" );
      desc54.putObject( idT, idPlgn, desc55 );
      var idAntA = charIDToTypeID( "AntA" );
      desc54.putBoolean( idAntA, true );
  executeAction( idsetd, desc54, DialogModes.NO );
} else if (app.activeDocument.colorSamplers.length>3) {

//deselect
var idsetd = charIDToTypeID( "setd" );
    var desc188 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref120 = new ActionReference();
        var idChnl = charIDToTypeID( "Chnl" );
        var idfsel = charIDToTypeID( "fsel" );
        ref120.putProperty( idChnl, idfsel );
    desc188.putReference( idnull, ref120 );
    var idT = charIDToTypeID( "T   " );
    var idOrdn = charIDToTypeID( "Ordn" );
    var idNone = charIDToTypeID( "None" );
    desc188.putEnumerated( idT, idOrdn, idNone );
executeAction( idsetd, desc188, DialogModes.NO );

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










// alert("x = " + pos[0] + " y = " + pos[1]);
//
// NewSelection = Array (Array(0,0),
//                       Array( w,0),
//                       Array( w,h),
//                       Array(0,0));
//
// app.activeDocument.selection.select(NewSelection);
//
// app.activeDocument.artLayers.add();
