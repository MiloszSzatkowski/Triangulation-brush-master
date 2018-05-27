var aDoc = app.activeDocument;

aDoc.activeLayer = aDoc.layers.getByName("Color_Base");
aDoc.activeLayer.name = "Data_Layer";

var backup = aDoc.activeLayer.duplicate(aDoc.activeLayer, ElementPlacement.PLACEAFTER);

backup.name = "Color_Base";

// =======================================================
var idGsnB = charIDToTypeID( "GsnB" );
    var desc626 = new ActionDescriptor();
    var idRds = charIDToTypeID( "Rds " );
    var idPxl = charIDToTypeID( "#Pxl" );
    desc626.putUnitDouble( idRds, idPxl, 3.000000 );
executeAction( idGsnB, desc626, DialogModes.NO );

// =======================================================
var idFndE = charIDToTypeID( "FndE" );
executeAction( idFndE, undefined, DialogModes.NO );

// =======================================================
var idThrs = charIDToTypeID( "Thrs" );
    var desc633 = new ActionDescriptor();
    var idLvl = charIDToTypeID( "Lvl " );
    desc633.putInteger( idLvl, 225 );
executeAction( idThrs, desc633, DialogModes.NO );
