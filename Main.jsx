
var pluginName = "Triangulation-brush";

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
$.level = 0;
//debugger; // launch debugger on next line

// on localized builds we pull the $$$/Strings from a .dat file, see documentation for more details
$.localize = true;

app.notifiers.removeAll();

app.notifiersEnabled = true;
app.notifiers.add( "Mk  ", new File((new File($.fileName)).parent + "/Triangulate.jsx"));


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


// var idMk = charIDToTypeID( "Mk  " );
//     var desc101 = new ActionDescriptor();
//     var idnull = charIDToTypeID( "null" );
//         var ref68 = new ActionReference();
//         var idClSm = charIDToTypeID( "ClSm" );
//         ref68.putClass( idClSm );
//     desc101.putReference( idnull, ref68 );
//     var idPstn = charIDToTypeID( "Pstn" );
//         var desc102 = new ActionDescriptor();
//         var idHrzn = charIDToTypeID( "Hrzn" );
//         var idPxl = charIDToTypeID( "#Pxl" );
//         desc102.putUnitDouble( idHrzn, idPxl, 892.500000 );
//         var idVrtc = charIDToTypeID( "Vrtc" );
//         var idPxl = charIDToTypeID( "#Pxl" );
//         desc102.putUnitDouble( idVrtc, idPxl, 217.500000 );
//     var idPnt = charIDToTypeID( "Pnt " );
//     desc101.putObject( idPstn, idPnt, desc102 );
// executeAction( idMk, desc101, DialogModes.NO );
