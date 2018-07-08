packages.push( ('\n' + File($.fileName).name ) );

function _select(a1, a2, b1, b2, c1, c2, d1, d2) {

  if (a1 == NaN ||  a2 == NaN ||  b1 == NaN ||  b2 == NaN ||  c1 == NaN ||  c2 == NaN ||  d1 == NaN ||  d2 == NaN ) {
   return;
  }

  var idsetd = charIDToTypeID( "setd" );
      var desc22 = new ActionDescriptor();
      var idnull = charIDToTypeID( "null" );
          var ref19 = new ActionReference();
          var idChnl = charIDToTypeID( "Chnl" );
          var idfsel = charIDToTypeID( "fsel" );
          ref19.putProperty( idChnl, idfsel );
      desc22.putReference( idnull, ref19 );
      var idT = charIDToTypeID( "T   " );
          var desc23 = new ActionDescriptor();
          var idPts = charIDToTypeID( "Pts " );
              var list12 = new ActionList();
                  var desc24 = new ActionDescriptor();
                  var idHrzn = charIDToTypeID( "Hrzn" );
                  var idPxl = charIDToTypeID( "#Pxl" );
                  desc24.putUnitDouble( idHrzn, idPxl, a1 );
                  var idVrtc = charIDToTypeID( "Vrtc" );
                  var idPxl = charIDToTypeID( "#Pxl" );
                  desc24.putUnitDouble( idVrtc, idPxl, a2 );
              var idPnt = charIDToTypeID( "Pnt " );
              list12.putObject( idPnt, desc24 );
                  var desc25 = new ActionDescriptor();
                  var idHrzn = charIDToTypeID( "Hrzn" );
                  var idPxl = charIDToTypeID( "#Pxl" );
                  desc25.putUnitDouble( idHrzn, idPxl, b1 );
                  var idVrtc = charIDToTypeID( "Vrtc" );
                  var idPxl = charIDToTypeID( "#Pxl" );
                  desc25.putUnitDouble( idVrtc, idPxl, b2 );
              var idPnt = charIDToTypeID( "Pnt " );
              list12.putObject( idPnt, desc25 );
                  var desc26 = new ActionDescriptor();
                  var idHrzn = charIDToTypeID( "Hrzn" );
                  var idPxl = charIDToTypeID( "#Pxl" );
                  desc26.putUnitDouble( idHrzn, idPxl, c1 );
                  var idVrtc = charIDToTypeID( "Vrtc" );
                  var idPxl = charIDToTypeID( "#Pxl" );
                  desc26.putUnitDouble( idVrtc, idPxl, c2 );
              var idPnt = charIDToTypeID( "Pnt " );
              list12.putObject( idPnt, desc26 );
                  var desc27 = new ActionDescriptor();
                  var idHrzn = charIDToTypeID( "Hrzn" );
                  var idPxl = charIDToTypeID( "#Pxl" );
                  desc27.putUnitDouble( idHrzn, idPxl, d1 );
                  var idVrtc = charIDToTypeID( "Vrtc" );
                  var idPxl = charIDToTypeID( "#Pxl" );
                  desc27.putUnitDouble( idVrtc, idPxl, d2 );
              var idPnt = charIDToTypeID( "Pnt " );
              list12.putObject( idPnt, desc27 );
                  var desc28 = new ActionDescriptor();
                  var idHrzn = charIDToTypeID( "Hrzn" );
                  var idPxl = charIDToTypeID( "#Pxl" );
                  desc28.putUnitDouble( idHrzn, idPxl, d1 );
                  var idVrtc = charIDToTypeID( "Vrtc" );
                  var idPxl = charIDToTypeID( "#Pxl" );
                  desc28.putUnitDouble( idVrtc, idPxl, d2 );
              var idPnt = charIDToTypeID( "Pnt " );
              list12.putObject( idPnt, desc28 );
          desc23.putList( idPts, list12 );
      var idPlgn = charIDToTypeID( "Plgn" );
      desc22.putObject( idT, idPlgn, desc23 );
      var idAntA = charIDToTypeID( "AntA" );
      desc22.putBoolean( idAntA, true );
  executeAction( idsetd, desc22, DialogModes.NO );

}
