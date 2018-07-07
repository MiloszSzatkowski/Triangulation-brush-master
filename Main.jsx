var pluginName = "Triangulation-brush";

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
$.level = 0;
//debugger;  launch debugger on next line

// on localized builds we pull the $$$/Strings from a .dat file, see documentation for more details
$.localize = true;

app.notifiers.removeAll();

app.notifiersEnabled = true;

//trigger only on sampler
app.notifiers.add("Mk  ", new File((new File($.fileName)).parent + "/Triangulate.jsx"));

var aDoc = app.activeDocument;
// clean document
aDoc.flatten();
app.activeDocument.pathItems.removeAll();

aDoc.activeLayer.name = "Color_Base";

//rename
var tr = aDoc.artLayers.add();
tr.name = "Triangulation";

try {
  //remove all_sample points
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
} catch (e) {

} 


//select Sampler
var idslct = charIDToTypeID("slct");
var desc5 = new ActionDescriptor();
var idnull = charIDToTypeID("null");
var ref1 = new ActionReference();
var idcolorSamplerTool = stringIDToTypeID("colorSamplerTool");
ref1.putClass(idcolorSamplerTool);
desc5.putReference(idnull, ref1);
var iddontRecord = stringIDToTypeID("dontRecord");
desc5.putBoolean(iddontRecord, true);
var idforceNotify = stringIDToTypeID("forceNotify");
desc5.putBoolean(idforceNotify, true);
executeAction(idslct, desc5, DialogModes.NO);
