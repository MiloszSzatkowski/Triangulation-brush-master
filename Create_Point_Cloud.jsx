packages.push( ('\n' + File($.fileName).name ) );

//vars

var imp_Points_Arr;

////////////////////////////////////////////// ******** MAIN FUNCTION START

function create_point_cloud(  ) {

  ////////////////////////  * initial preperations

  app.activeDocument.flatten();

  //convert layer to smart object
  var idnewPlacedLayer = stringIDToTypeID( "newPlacedLayer" );
  executeAction( idnewPlacedLayer, undefined, DialogModes.NO );

  duplicate_layer();

  //rasterize layer
  var idrasterizeLayer = stringIDToTypeID( "rasterizeLayer" );
    var desc11 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref10 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref10.putEnumerated( idLyr, idOrdn, idTrgt );
    desc11.putReference( idnull, ref10 );
  executeAction( idrasterizeLayer, desc11, DialogModes.NO );

  //image size - scale to 750 px
  var idImgS = charIDToTypeID( "ImgS" );
    var desc18 = new ActionDescriptor();
    var idWdth = charIDToTypeID( "Wdth" );
    var idPxl = charIDToTypeID( "#Pxl" );
    desc18.putUnitDouble( idWdth, idPxl, 750 );
    var idscaleStyles = stringIDToTypeID( "scaleStyles" );
    desc18.putBoolean( idscaleStyles, true );
    var idCnsP = charIDToTypeID( "CnsP" );
    desc18.putBoolean( idCnsP, true );
    var idIntr = charIDToTypeID( "Intr" );
    var idIntp = charIDToTypeID( "Intp" );
    var idautomaticInterpolation = stringIDToTypeID( "automaticInterpolation" );
    desc18.putEnumerated( idIntr, idIntp, idautomaticInterpolation );
    executeAction( idImgS, desc18, DialogModes.NO );

    ////////////////////////  * restoring shapes

    //gaussian blur

    shadow_highlight_correction();
    shadow_highlight_correction();



    // extract_points_from_paths();
    // app.activeDocument.pathItems.removeAll();

} //end of function

/////////////////////////////////////////////// ******** MAIN FUNCTION END


function extract_points_from_paths() {

  imp_Points_Arr = [];
  for (var i = 0; i < app.activeDocument.pathItems.length; i++) {
    for (var j = 0; j < app.activeDocument.pathItems[i].subPathItems.length; j++) {
      for (var k = 0; k < app.activeDocument.pathItems[i].subPathItems[j].pathPoints.length; k++) {
        imp_Points_Arr.push([
          app.activeDocument.pathItems[i].subPathItems[j].pathPoints[k].anchor[0],
          app.activeDocument.pathItems[i].subPathItems[j].pathPoints[k].anchor[1]
        ]);
      }
    }
  } //end of for loop

}

////////////////////////////////////////////

function shadow_highlight_correction() {
  //shadow highlights correction
  var idadaptCorrect = stringIDToTypeID( "adaptCorrect" );
  var desc24 = new ActionDescriptor();
    var idsdwM = charIDToTypeID( "sdwM" );
        var desc25 = new ActionDescriptor();
        var idAmnt = charIDToTypeID( "Amnt" );
        var idPrc = charIDToTypeID( "#Prc" );
        desc25.putUnitDouble( idAmnt, idPrc, 100.000000 );
        var idWdth = charIDToTypeID( "Wdth" );
        var idPrc = charIDToTypeID( "#Prc" );
        desc25.putUnitDouble( idWdth, idPrc, 40.000000 );
        var idRds = charIDToTypeID( "Rds " );
        desc25.putInteger( idRds, 10 );
    var idadaptCorrectTones = stringIDToTypeID( "adaptCorrectTones" );
    desc24.putObject( idsdwM, idadaptCorrectTones, desc25 );
    var idhglM = charIDToTypeID( "hglM" );
        var desc26 = new ActionDescriptor();
        var idAmnt = charIDToTypeID( "Amnt" );
        var idPrc = charIDToTypeID( "#Prc" );
        desc26.putUnitDouble( idAmnt, idPrc, 100.000000 );
        var idWdth = charIDToTypeID( "Wdth" );
        var idPrc = charIDToTypeID( "#Prc" );
        desc26.putUnitDouble( idWdth, idPrc, 40.000000 );
        var idRds = charIDToTypeID( "Rds " );
        desc26.putInteger( idRds, 10 );
    var idadaptCorrectTones = stringIDToTypeID( "adaptCorrectTones" );
    desc24.putObject( idhglM, idadaptCorrectTones, desc26 );
    var idBlcC = charIDToTypeID( "BlcC" );
    desc24.putDouble( idBlcC, 0.010000 );
    var idWhtC = charIDToTypeID( "WhtC" );
    desc24.putDouble( idWhtC, 0.010000 );
    var idCntr = charIDToTypeID( "Cntr" );
    desc24.putInteger( idCntr, 100 );
    var idClrC = charIDToTypeID( "ClrC" );
    desc24.putInteger( idClrC, 20 );
  executeAction( idadaptCorrect, desc24, DialogModes.NO );
}

/////////////////////////////////////

function duplicate_layer() {
  var idCpTL = charIDToTypeID( "CpTL" );
  executeAction( idCpTL, undefined, DialogModes.NO );
}

/////////////////////////////////////

function treshold(am) {
  var idThrs = charIDToTypeID( "Thrs" );
  var desc30 = new ActionDescriptor();
  var idLvl = charIDToTypeID( "Lvl " );
  desc30.putInteger( idLvl, am );
  executeAction( idThrs, desc30, DialogModes.NO );
}

/////////////////////////////////////

function gaussian_blur(am) {
  var idGsnB = charIDToTypeID( "GsnB" );
  var desc21 = new ActionDescriptor();
  var idRds = charIDToTypeID( "Rds " );
  var idPxl = charIDToTypeID( "#Pxl" );
  desc21.putUnitDouble( idRds, idPxl, am );
  executeAction( idGsnB, desc21, DialogModes.NO );
}

/////////////////////////////////////

function color_range_selection() {
  //make selection using color range
  var idClrR = charIDToTypeID( "ClrR" );
  var desc33 = new ActionDescriptor();
  var idFzns = charIDToTypeID( "Fzns" );
  desc33.putInteger( idFzns, 200 );
  var idMnm = charIDToTypeID( "Mnm " );
      var desc34 = new ActionDescriptor();
      var idLmnc = charIDToTypeID( "Lmnc" );
      desc34.putDouble( idLmnc, 13.120000 );
      var idA = charIDToTypeID( "A   " );
      desc34.putDouble( idA, 3.520000 );
      var idB = charIDToTypeID( "B   " );
      desc34.putDouble( idB, 3.560000 );
  var idLbCl = charIDToTypeID( "LbCl" );
  desc33.putObject( idMnm, idLbCl, desc34 );
  var idMxm = charIDToTypeID( "Mxm " );
      var desc35 = new ActionDescriptor();
      var idLmnc = charIDToTypeID( "Lmnc" );
      desc35.putDouble( idLmnc, 13.120000 );
      var idA = charIDToTypeID( "A   " );
      desc35.putDouble( idA, 3.520000 );
      var idB = charIDToTypeID( "B   " );
      desc35.putDouble( idB, 3.560000 );
  var idLbCl = charIDToTypeID( "LbCl" );
  desc33.putObject( idMxm, idLbCl, desc35 );
  var idcolorModel = stringIDToTypeID( "colorModel" );
  desc33.putInteger( idcolorModel, 0 );
  executeAction( idClrR, desc33, DialogModes.NO );
}

/////////////////////////////////////

function make_work_path(am) {
  //make work path from selection
  var idMk = charIDToTypeID( "Mk  " );
  var desc39 = new ActionDescriptor();
  var idnull = charIDToTypeID( "null" );
      var ref12 = new ActionReference();
      var idPath = charIDToTypeID( "Path" );
      ref12.putClass( idPath );
  desc39.putReference( idnull, ref12 );
  var idFrom = charIDToTypeID( "From" );
      var ref13 = new ActionReference();
      var idcsel = charIDToTypeID( "csel" );
      var idfsel = charIDToTypeID( "fsel" );
      ref13.putProperty( idcsel, idfsel );
  desc39.putReference( idFrom, ref13 );
  var idTlrn = charIDToTypeID( "Tlrn" );
  var idPxl = charIDToTypeID( "#Pxl" );
  desc39.putUnitDouble( idTlrn, idPxl, am );
  executeAction( idMk, desc39, DialogModes.NO );
}
