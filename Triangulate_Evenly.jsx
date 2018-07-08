packages.push( ('\n' + File($.fileName).name ) );

var swirl_Arr = [];

function triangulate_evenly(Tswirl_X_count, Tswirl_Y_count, TrandomX, TrandomY, commit) {

  var swirl_X_count = Tswirl_X_count;
  var swirl_Y_count = Tswirl_Y_count;
  var total_swirls = parseInt(swirl_X_count * swirl_Y_count);
  var divideX, divideY;

  divideX = Math.floor  (aW  / swirl_X_count) ;
  divideY = Math.floor  (aH / swirl_Y_count) ;

  // var user_input_Randomness = 1;
  // user_input_Randomness = user_input_Randomness / 100;
  // var randomness_amount = (user_input_Randomness > 1) ? 1 : user_input_Randomness;

  var max_jiggle_X = parseInt(Math.floor( divideX / TrandomX  )) ;
  var min_jiggle_X = (0-max_jiggle_X);
  if (isNaN(max_jiggle_X) ) { max_jiggle_X = 0; min_jiggle_X = 0;  }

  var max_jiggle_Y = parseInt(Math.floor( divideY / TrandomY  )) ;
  var min_jiggle_Y = (0-max_jiggle_Y);
  if (isNaN(max_jiggle_Y) ) { max_jiggle_Y = 0; min_jiggle_Y = 0;  }

  var INDEX;
    for (var i = 0; i < swirl_Y_count; i++) {
      for (var j = 0; j < swirl_X_count; j++) {
        INDEX = (i*swirl_X_count) + j;

        // MOVING ON GRID:
        // 7 8 9
        // 4 5 6
        // 1 2 3

        // 77777777777777777777777777777777777
        if ( i === 0 && j === 0) {

          swirl_Arr[INDEX] = [
            //left_upper     0
            [0, 0]  ,
            //right_upper    1
            [ (divideX * (j+1)) + random_num_between( min_jiggle_X , max_jiggle_X ) ,  0 ]  ,
            //left_bottom    2
            [ 0 , (divideY * (i+1)) + random_num_between( min_jiggle_Y , max_jiggle_Y )  ] ,
            //right_bottom   3
            [  (divideX * (j+1)) + random_num_between( min_jiggle_X , max_jiggle_X ) ,
            (divideY * (i+1)) + random_num_between( min_jiggle_Y , max_jiggle_Y )   ],
            "||" + (INDEX + 1) + "||" + "\n"
          ];

        // 88888888888888888888888888888888888888
        } else if ( i === 0 && isInRange(j, 0, (swirl_X_count-1)) ){

          swirl_Arr[INDEX] = [
            //left_upper
            swirl_Arr[INDEX-1][1] ,
            //right_upper
            [ (divideX * (j+1)) + random_num_between( min_jiggle_X , max_jiggle_X ) ,  0 ]  ,
            //left_bottom
            swirl_Arr[INDEX-1][3] ,
            //right_bottom
            [  (divideX * (j+1)) + random_num_between( min_jiggle_X , max_jiggle_X ) ,
            (divideY * (i+1)) + random_num_between( min_jiggle_Y , max_jiggle_Y )   ],
            "||" + (INDEX + 1) + "||" + "\n"
          ];

        // 99999999999999999999999999999999999999999
        } else if ( i === 0 && j === (swirl_X_count-1) ) {

            swirl_Arr[INDEX] = [
            //left_upper
            swirl_Arr[INDEX-1][1] ,
            //right_upper
            [ aW ,  0 ]  ,
            //left_bottom
            swirl_Arr[INDEX-1][3] ,
            //right_bottom
            [  aW ,  (divideY * (i+1)) + random_num_between( min_jiggle_Y , max_jiggle_Y )   ],
            "||" + (INDEX + 1) + "||" + "\n"
          ];

        // 44444444444444444444444444444444444444
        } else if ( i > 0 && j===0 && i!==(swirl_Y_count-1) ) {

          swirl_Arr[INDEX] = [
            //left_upper
            swirl_Arr[INDEX-swirl_X_count][2] ,
            //right_upper
            swirl_Arr[INDEX-swirl_X_count][3]  ,
            //left_bottom
            [ 0 , (divideY * (i+1)) + random_num_between( min_jiggle_Y , max_jiggle_Y )] ,
            //right_bottom
            [  (divideX * (j+1)) + random_num_between( min_jiggle_X , max_jiggle_X ) ,
              (divideY * (i+1)) + random_num_between( min_jiggle_Y , max_jiggle_Y )   ],
              "||" + (INDEX + 1) + "||" + "\n"
          ];

        // 55555555555555555555555555555555555555555555
        } else if (i > 0 && isInRange(j, 0, (swirl_X_count-1)) && i!==(swirl_Y_count-1) ) {

          swirl_Arr[INDEX] = [
            //left_upper
            swirl_Arr[INDEX-swirl_X_count][2] ,
            //right_upper
            swirl_Arr[INDEX-swirl_X_count][3]  ,
            //left_bottom
            swirl_Arr[INDEX-1][3] ,
            //right_bottom
            [  (divideX * (j+1)) + random_num_between( min_jiggle_X , max_jiggle_X ) ,
              (divideY * (i+1)) + random_num_between( min_jiggle_Y , max_jiggle_Y )   ],
              "||" + (INDEX + 1) + "||" + "\n"
          ];

        // 66666666666666666666666666666666666666
      } else if (i > 0 && j%(swirl_X_count-1)===0 && i!==(swirl_Y_count-1) ) {

          swirl_Arr[INDEX] = [
            //left_upper
            swirl_Arr[INDEX-swirl_X_count][2] ,
            //right_upper
            swirl_Arr[INDEX-swirl_X_count][3]  ,
            //left_bottom
            swirl_Arr[INDEX-1][3] ,
            //right_bottom
            [  aW ,  (divideY * (i+1)) + random_num_between( min_jiggle_Y , max_jiggle_Y )   ],
            "||" + (INDEX + 1) + "||" + "\n"
          ];

        // 111111111111111111111111111111111111
        } else if (j===0 && i%(swirl_Y_count-1)===0 ) {

          swirl_Arr[INDEX] = [
            //left_upper
            swirl_Arr[INDEX-swirl_X_count][2] ,
            //right_upper
            swirl_Arr[INDEX-swirl_X_count][3]  ,
            //left_bottom
            [0 , aH] ,
            //right_bottom
            [  (divideX * (j+1)) + random_num_between( min_jiggle_X , max_jiggle_X ) , aH ],
            "||" + (INDEX + 1) + "||" + "\n"
          ];

        // 22222222222222222222222222222222222222222
        } else if ( isInRange(j, 0, (swirl_X_count-1)) && i%(swirl_Y_count-1)===0 ) {

          swirl_Arr[INDEX] = [
            //left_upper
            swirl_Arr[INDEX-swirl_X_count][2] ,
            //right_upper
            swirl_Arr[INDEX-swirl_X_count][3]  ,
            //left_bottom
            swirl_Arr[INDEX-1][3] ,
            //right_bottom
            [  (divideX * (j+1)) + random_num_between( min_jiggle_X , max_jiggle_X ) , aH ],
            "||" + (INDEX + 1) + "||" + "\n"
          ];

        // 333333333333333333333333333333333333
        } else if ( j%(swirl_X_count-1)===0 && i%(swirl_Y_count-1)===0  ){

          swirl_Arr[INDEX] = [
            //left_upper
            swirl_Arr[INDEX-swirl_X_count][2] ,
            //right_upper
            swirl_Arr[INDEX-swirl_X_count][3]  ,
            //left_bottom
            swirl_Arr[INDEX-1][3]  ,
            //right_bottom
            [  aW ,   aH   ],
            "||" + (INDEX + 1) + "||" + "\n"
          ];

        }

      }
    }

    if (commit) {   make_path_from_regular_division();   }

}

  ///////////////////////////////////////////

  function isInRange(x, min, max) {
    if ( x > min && x < max  ) {  return true;  } else { return false; }
  }

  /////////////////////////////////////////////////////////

  function random_num_between(min, max) {
    if (min === 0 || max === 0) {
      return 0;
    } else {
      return Math.floor(Math.random() * (max - min) + min);
    }
  }

  ////////////////////////////////////////////////

var center;

  function make_path_from_regular_division() {

    //progress bar pallete
    var temp_w_1 = new Window ('palette', "Progress", undefined, {closeButton: false});
    var desc_temp_1 = temp_w_1.add('statictext', undefined, ('Liczba trojkatow | Amount of triangles:' + (swirl_Arr.length*4) ));
    var p_bar_1 = temp_w_1.add("progressbar", undefined, 0, swirl_Arr.length);
    temp_w_1.show();

    //loop to make paths
    for (var i = 0; i < swirl_Arr.length; i++) {

      center =[];
      center = [ Math.floor( ((swirl_Arr[i][3][0] + swirl_Arr[i][0][0])   / 2 ) ) ,
                 Math.floor( ((swirl_Arr[i][3][1] + swirl_Arr[i][0][1])   / 2 ) ) ];

      make_path_object([
              swirl_Arr[i][0]    ,
              swirl_Arr[i][1]    ,
              center   ,
              swirl_Arr[i][0]
      ]);

      make_path_object([
              swirl_Arr[i][0]     ,
              center   ,
              swirl_Arr[i][2]    ,
              swirl_Arr[i][0]
      ]);

      make_path_object([
              swirl_Arr[i][2]    ,
              center    ,
              swirl_Arr[i][3]    ,
              swirl_Arr[i][2]
      ]);

      make_path_object([
              swirl_Arr[i][3]    ,
              center   ,
              swirl_Arr[i][1]    ,
              swirl_Arr[i][3]
      ]);

      //add value to progress bar
      p_bar_1.value++;

    } //end of loop

    // close proress bar
    temp_w_1.close();

  } // end of function

///////////////////////////////////////////////////////////////////
