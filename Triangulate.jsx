// app.displayDialogs = DialogModes.NO;
#target photoshop;
// $.level = 0;debugger;
$.localize = true;

preferences.rulerUnits = Units.PIXELS;

var aW = app.activeDocument.width.value;
var aH = app.activeDocument.height.value;

//UI
var w = new Window ('dialog {orientation: "row", alignChildren: [" ", "top"]}',
"Triangulizacja | Triangulation", undefined, {closeButton: false});

var tab = w.add ("tabbedpanel");
    tab.alignChildren = ["fill", "fill"];
    tab.preferredSize = [350,300];

var First_Tab =  tab.add ("tab", undefined, 'test');

w.show();

#include Triangulate_Evenly.jsx
#include Make_Triangle.jsx
#include Remove_All_Sample_Points.jsx
#include Divide_current_triangle.jsx
