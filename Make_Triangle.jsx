packages.push( ('\n' + File($.fileName).name ) );

function make_path_object(points, counter) {

  var lineArr = [];

  for (var i = 0; i < points.length; i++) {
    lineArr[i] = new PathPointInfo();
    lineArr[i].kind = PointKind.CORNERPOINT;
    //our points
    lineArr[i].anchor = Array(points[i][0], points[i][1]);
    //handles have the same coord as main point - str line
    lineArr[i].leftDirection = lineArr[i].anchor;
    lineArr[i].rightDirection = lineArr[i].anchor;
  }

  var lineSubPathArray = [];
  var lineSubPathArray = new SubPathInfo();
  lineSubPathArray.operation = ShapeOperation.SHAPEXOR;
  lineSubPathArray.closed = true;
  lineSubPathArray.entireSubPath = lineArr;

  //bounds:
  var minimumX = Math.min( lineArr[0].anchor[0], lineArr[1].anchor[0], lineArr[2].anchor[0]);

  var minimumY = Math.min( lineArr[0].anchor[1], lineArr[1].anchor[1], lineArr[2].anchor[1]);

  var maximumX = Math.max( lineArr[0].anchor[0], lineArr[1].anchor[0], lineArr[2].anchor[0]);

  var maximumY = Math.max( lineArr[0].anchor[1], lineArr[1].anchor[1], lineArr[2].anchor[1]);

  var area = (maximumX-minimumX) * (maximumX-minimumY);

  var Name = area + Math.random();

  var myPathItem = app.activeDocument.pathItems.add(Name, [lineSubPathArray]);

  myPathItem.strokePath(ToolType.BRUSH);

}
