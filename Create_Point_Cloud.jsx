packages.push( ('\n' + File($.fileName).name ) );

//vars

var imp_Points_Arr = [];

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

    shadow_highlight_correction();
    shadow_highlight_correction();

    //gaussian blur for cleaning low pass noise
    gaussian_blur(2);

    Convert_Points_To_Selection_And_Apply_Extraction();

    //debug from here
    // final check
    alert( imp_Points_Arr[0].toString() );

} //end of function

//seperated to another function for easier debugging

function Convert_Points_To_Selection_And_Apply_Extraction() {

    app.activeDocument.selection.selectAll();

    prepare_for_extraction();

} //function end

function prepare_for_extraction() {

  if ( app.activeDocument.selection != null ) {
    //keep process on a temporary layer for cpu safety
    duplicate_layer();

    //hide other layers
    app.activeDocument.layers[1].visible = false;
    app.activeDocument.layers[2].visible = false;

    treshold(120);

    color_range_selection();

      make_work_path(5);
      extract_points_from_paths();

    //cleaning
    deselect();
    app.activeDocument.pathItems.removeAll();

    //show other layers
    app.activeDocument.layers[1].visible = true;
    app.activeDocument.layers[2].visible = true;

    //delete layer
    var idDlt = charIDToTypeID( "Dlt " );
      var desc2 = new ActionDescriptor();
      var idnull = charIDToTypeID( "null" );
          var ref1 = new ActionReference();
          var idLyr = charIDToTypeID( "Lyr " );
          var idOrdn = charIDToTypeID( "Ordn" );
          var idTrgt = charIDToTypeID( "Trgt" );
          ref1.putEnumerated( idLyr, idOrdn, idTrgt );
      desc2.putReference( idnull, ref1 );
      var idLyrI = charIDToTypeID( "LyrI" );
          var list1 = new ActionList();
          list1.putInteger( 3 );
      desc2.putList( idLyrI, list1 );
      executeAction( idDlt, desc2, DialogModes.NO );
  }

}

/////////////////////////////////////////////// ******** MAIN FUNCTION END


function extract_points_from_paths() {

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

/////////////////////////////////////

function deselect() {
  var idsetd = charIDToTypeID( "setd" );
    var desc273 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref145 = new ActionReference();
        var idChnl = charIDToTypeID( "Chnl" );
        var idfsel = charIDToTypeID( "fsel" );
        ref145.putProperty( idChnl, idfsel );
    desc273.putReference( idnull, ref145 );
    var idT = charIDToTypeID( "T   " );
    var idOrdn = charIDToTypeID( "Ordn" );
    var idNone = charIDToTypeID( "None" );
    desc273.putEnumerated( idT, idOrdn, idNone );
    executeAction( idsetd, desc273, DialogModes.NO );
}

/////////////////////////////////////
