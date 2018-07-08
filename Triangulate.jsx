// app.displayDialogs = DialogModes.NO;
#target photoshop;
// $.level = 0;debugger;
$.localize = true;

preferences.rulerUnits = Units.PIXELS;

var aW = app.activeDocument.width.value;
var aH = app.activeDocument.height.value;

function test (val, val2) {  alert ('test \n' + val.toString() + '\n' + val2.toString() );  }

//array holding currently added package
var packages = [];
// pushing to array by adding a line to the top of an added script:
// packages.push( ('\n' + File($.fileName).name ) );

#include Make_Triangle.jsx
#include Convert_Points_To_Selection.jsx
#include Remove_All_Sample_Points.jsx
#include Triangulate_Evenly.jsx
#include Divide_current_triangle.jsx
#include Create_Point_Cloud.jsx

/////////////////////////// * initial check start ++++++

// check if all packages were included

function raport() {
  try {
    alert(
      packages.toString() + '\n' + '\n' +
      'loaded successfully'
    );
  } catch (e) {
    alert(
      'Packages couldn\'t load, error: \n' + e
    );
  }
}

raport();

/////////////////////////// * initial check end -----

////////////////////////// ****** UI ****** //////////////////////////
var w = new Window ('dialog {orientation: "row", alignChildren: [" ", "top"]}',
"Triangulizacja | Triangulation", undefined, {closeButton: false});

var tab = w.add ("tabbedpanel");
    tab.alignChildren = ["fill", "fill"];
    tab.preferredSize = [500,300];

/////////////// * First Tab

var First_Tab =  tab.add ("tab", undefined, '* Proporcjonalnie | Proportional *');
    First_Tab.alignChildren = ["fill", "fill"];


var des_1 = First_Tab.add ('statictext', undefined, 'Ilość węzłów poziomo | Amount of horizontal anchors');
var Tswirl_X_count_text = First_Tab.add ('edittext', undefined, 2);

var slider_1 = First_Tab.add ("slider", undefined, 2, 2, 50);
slider_1.onChanging = function () {Tswirl_X_count_text.text = Math.round(slider_1.value);}

var des_2 = First_Tab.add ('statictext', undefined, 'Ilość węzłów pionowo | Amount of vertical anchors');
var Tswirl_Y_count_text = First_Tab.add ('edittext', undefined, 2);

var slider_2 = First_Tab.add ("slider", undefined, 2, 2, 50);
slider_2.onChanging = function () {Tswirl_Y_count_text.text = Math.round(slider_2.value);}

var f_image = First_Tab.add ('image', undefined, File(new File((new File($.fileName)).parent +"/images/t1.png")))

//random input

//x
var des_3 = First_Tab.add ('statictext', undefined, 'Losowość na osi X | X axis randomness');
var TrandomX_text = First_Tab.add ('statictext', undefined, 4);

var slider_3 = First_Tab.add ("slider", undefined, 4 , 0 , 4);
slider_3.onChanging = function () {TrandomX_text.text = Math.round(slider_3.value);}

//y
var des_4 = First_Tab.add ('statictext', undefined, 'Losowość na osi Y | Y axis randomness');
var TrandomY_text = First_Tab.add ('statictext', undefined, 4);

var slider_4 = First_Tab.add ("slider", undefined, 4 , 0 , 4);
slider_4.onChanging = function () {TrandomY_text.text = Math.round(slider_4.value);}

/////////////// * Second Tab

var Second_Tab =  tab.add ("tab", undefined, '* Po kształcie | According to shape *');
Second_Tab.alignChildren = ["fill", "fill"];

var s_image = Second_Tab.add ('image', undefined, File(new File((new File($.fileName)).parent +"/images/t2.png")))

/////////////// * Apply - Cancel | buttons

var buttons = w.add('group', undefined, '');

var okButton = buttons.add ("button", undefined, 'Rozpocznij | Begin');

var cancelButton = buttons.add ("button", undefined, "Anuluj | Cancel", {name: "cancel"});

/////////////// * functions

tab.selection = 0;

okButton.onClick = function (){

  app.activeDocument.artLayers.add();

  if (tab.selection.text == First_Tab.text) {
    //First tab is selected - Proportional
    triangulate_evenly( parseInt(Tswirl_X_count_text.text) , parseInt(Tswirl_Y_count_text.text),
                        parseInt(TrandomX_text.text) , parseInt(TrandomY_text.text), true // last arg will commit to draw triangles
                      );
    w.close();
  } else {
    create_point_cloud();
  }
}

/////////////// * show window

w.show();
