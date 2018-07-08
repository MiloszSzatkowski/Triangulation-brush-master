packages.push( ('\n' + File($.fileName).name ) );

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
