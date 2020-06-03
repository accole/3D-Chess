//--------------------------------------------------------------------------------------------------------------------------------
//CHESS PROJECT

//Aditya Sriram
//Adam Cole
//Eli Katz
//Jake Wallin

//-------------------------------------------------------------------------------------------------------------
//BOARD POSITION INDICIES in 3D points
// RIGHT = +X
// LEFT = -X
// UP = -Z
// DOWN = +Z

//                                      WHITE SIDE
/*
  [-10,3,-10]   [-8,3,-10]  [-6,3,-10]  [-4,3,-10]  [-2,3,-10]  [0,3,-10]   [2,3,-10]   [4,3,-10]

  [-10,3,-8]    [-8,3,-8]   [-6,3,-8]   [-4,3,-8]   [-2,3,-8]   [0,3,-8]    [2,3,-8]    [4,3,-8]

  [-10,3,-6]    [-8,3,-6]   [-6,3,-6]   [-4,3,-6]   [-2,3,-6]   [0,3,-6]    [2,3,-6]    [4,3,-6]

  [-10,3,-4]    [-8,3,-4]   [-6,3,-4]   [-4,3,-4]   [-2,3,-4]   [0,3,-4]    [2,3,-4]    [4,3,-4] 

  [-10,3,-2]    [-8,3,-2]   [-6,3,-2]   [-4,3,-2]   [-2,3,-2]   [0,3,-2]    [2,3,-2]    [4,3,-2]

  [-10,3,0]     [-8,3,0]    [-6,3,0]    [-4,3,0]    [-2,3,0]    [0,3,0]     [2,3,0]     [4,3,0]

  [-10,3,2]     [-8,3,2]    [-6,3,2]    [-4,3,2]    [-2,3,2]    [0,3,2]     [2,3,2]     [4,3,2]

  [-10,3,4]     [-8,3,4]    [-6,3,4]    [-4,3,4]    [-2,3,4]    [0,3,4]     [2,3,4]     [4,3,4]
*/
//                          BLACK SIDE & ORIGINAL CAMERA PLACEMENT


//-------------------------------------------------------------------------------------------------------------
//CUBE CLASS

window.Cube = window.classes.Cube =
    class Cube extends Shape {
        // Here's a complete, working example of a Shape subclass.  It is a blueprint for a cube.
        constructor() {
            super("positions", "normals"); // Name the values we'll define per each vertex.  They'll have positions and normals.

            // First, specify the vertex positions -- just a bunch of points that exist at the corners of an imaginary cube.
            this.positions.push(...Vec.cast(
                [-1, -1, -1], [1, -1, -1], 
                [-1, -1, 1], [1, -1, 1], 
                [1, 1, -1], [-1, 1, -1], 
                [1, 1, 1], [-1, 1, 1],
                [-1, -1, -1], [-1, -1, 1], 
                [-1, 1, -1], [-1, 1, 1], 
                [1, -1, 1], [1, -1, -1], 
                [1, 1, 1], [1, 1, -1],
                [-1, -1, 1], [1, -1, 1], 
                [-1, 1, 1], [1, 1, 1], 
                [1, -1, -1], [-1, -1, -1], 
                [1, 1, -1], [-1, 1, -1]));
            // Supply vectors that point away from eace face of the cube.  They should match up with the points in the above list
            // Normal vectors are needed so the graphics engine can know if the shape is pointed at light or not, and color it accordingly.
            this.normals.push(...Vec.cast(
                [0, -1, 0], [0, -1, 0], 
                [0, -1, 0], [0, -1, 0], 
                [0, 1, 0], [0, 1, 0], 
                [0, 1, 0], [0, 1, 0],
                [-1, 0, 0], [-1, 0, 0], 
                [-1, 0, 0], [-1, 0, 0], 
                [1, 0, 0], [1, 0, 0], 
                [1, 0, 0], [1, 0, 0],
                [0, 0, 1], [0, 0, 1], 
                [0, 0, 1], [0, 0, 1], 
                [0, 0, -1], [0, 0, -1], 
                [0, 0, -1], [0, 0, -1]));

            // Those two lists, positions and normals, fully describe the "vertices".  What's the "i"th vertex?  Simply the combined
            // data you get if you look up index "i" of both lists above -- a position and a normal vector, together.  Now let's
            // tell it how to connect vertex entries into triangles.  Every three indices in this list makes one triangle:
            this.indices.push(0, 1, 2, 1, 3, 2, 4, 5, 6, 5, 7, 6, 8, 9, 10, 9, 11, 10, 12, 13,
                14, 13, 15, 14, 16, 17, 18, 17, 19, 18, 20, 21, 22, 21, 23, 22);
            // It stinks to manage arrays this big.  Later we'll show code that generates these same cube vertices more automatically.
        }
    };


//PRISM CLASS

window.HorsePrism = window.classes.HorsePrism =
    class HorsePrism extends Shape {
        // Here's a complete, working example of a Shape subclass.  It is a blueprint for a cube.
        constructor() {
            super("positions", "normals"); // Name the values we'll define per each vertex.  They'll have positions and normals.

            // First, specify the vertex positions -- just a bunch of points that exist at the corners of an imaginary cube.
            this.positions.push(...Vec.cast(
                [-1, -1, -1], [1, -1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, -1], [-1, 1, -1],
                [-1, -1, -1], [-1, -1, 1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, -1, -1], [1, -1, 1], [1, 1, -1],
                [-1, -1, 1], [1, -1, 1], [1, -1, -1], [-1, -1, -1], [1, 1, -1], [-1, 1, -1], 
                //add vertical lines to box
                [-1, -1, -1], [-1, 1, -1], [1, -1, -1], [1, 1, -1]));
            
            // Supply vectors that point away from eace face of the cube.  They should match up with the points in the above list
            // Normal vectors are needed so the graphics engine can know if the shape is pointed at light or not, and color it accordingly.
            this.normals.push(...Vec.cast(
                [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, 1, 0], [0, 1, 0],
                [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0],
                [0, 0, 1], [0, 0, 1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1],
                [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1]));

            // Those two lists, positions and normals, fully describe the "vertices".  What's the "i"th vertex?  Simply the combined
            // data you get if you look up index "i" of both lists above -- a position and a normal vector, together.  Now let's
            // tell it how to connect vertex entries into triangles.  Every three indices in this list makes one triangle:
            this.indices.push(0, 1, 2, //good
                              1, 3, 2, //good
                              4, 5, 0,
                              4, 1, 0,
                              4, 3, 1,
                              5, 0, 2,
                              4, 5, 3,
                              5, 2, 3);
        }
    };

window.TPrism = window.classes.TPrism =
    class TPrism extends Shape {
        // Here's a complete, working example of a Shape subclass.  It is a blueprint for a cube.
        constructor() {
            super("positions", "normals"); // Name the values we'll define per each vertex.  They'll have positions and normals.

            // First, specify the vertex positions -- just a bunch of points that exist at the corners of an imaginary cube.
            this.positions.push(...Vec.cast(
                [-1, -1, -1], [1, -1, -1],   //good
                [-1, -1, 1], [1, -1, 1],    //good
                [1, 1, -1], [-1, 1, -1],    //good
                [-1, -1, -1], [-1, -1, 1],  //good
                [1, -1, 1], [1, -1, -1],   //good
                [-1, -1, 1], [-1, 1, -1],   //slant 1
                [1, -1, 1], [1, 1, -1],    //slant 2
                [-1, -1, -1], [-1, 1, -1],   //up down 1
                [1, -1, -1], [1, 1, -1]    //up down 2
                ));
            // Supply vectors that point away from eace face of the cube.  They should match up with the points in the above list
            // Normal vectors are needed so the graphics engine can know if the shape is pointed at light or not, and color it accordingly.
            this.normals.push(...Vec.cast(
                [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0],
                [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0],
                [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1]));

            // Those two lists, positions and normals, fully describe the "vertices".  What's the "i"th vertex?  Simply the combined
            // data you get if you look up index "i" of both lists above -- a position and a normal vector, together.  Now let's
            // tell it how to connect vertex entries into triangles.  Every three indices in this list makes one triangle:
            this.indices.push(0, 1, 2, 1, 3, 2, 4, 5, 6, 5, 7, 6, 8, 9, 10, 9, 11, 10, 12, 13,
                14, 13, 15, 14, 16, 17, 18, 17, 19, 18, 20, 21, 22, 21, 23, 22);
            // It stinks to manage arrays this big.  Later we'll show code that generates these same cube vertices more automatically.
        }
    };

    
    //SQUARE OUTLINE CLASS

    window.Outline = window.classes.Outline =
    class Outline extends Shape {
        constructor() {
            super("positions", "colors"); // Name the values we'll define per each vertex.

            //make wireframe square
            this.positions.push(...Vec.cast(
                [1, 1, -1], [-1, 1, -1], [1, 1, 1], [-1, 1, 1], [1, 1, -1], [1, 1, 1], [-1, 1, 1], [-1, 1, -1]));
            
            //color it bright purple or bright blue
            const blue = Color.of(0, 0, 255, 1);

            this.colors.push(...Vec.cast(blue, blue, blue, blue, blue, blue, blue, blue));

            this.indexed = false;
            // Do this so we won't need to define "this.indices".
        }
    };


    window.Next_Outline = window.classes.Next_Outline =
    class Next_Outline extends Shape {
        constructor() {
            super("positions", "colors"); // Name the values we'll define per each vertex.

            //make wireframe square
            this.positions.push(...Vec.cast(
                [1, 1, -1], [-1, 1, -1], [1, 1, 1], [-1, 1, 1], [1, 1, -1], [1, 1, 1], [-1, 1, 1], [-1, 1, -1]));
            
            //color it bright purple or bright blue
            const red = Color.of(111, 0, 0, 1);

            this.colors.push(...Vec.cast(red, red, red, red, red, red, red, red));

            this.indexed = false;
            // Do this so we won't need to define "this.indices".
        }
    };
        

    //cube outline
    window.Cube_Outline = window.classes.Cube_Outline =
    class Cube_Outline extends Shape {
        constructor() {
            super("positions", "colors"); // Name the values we'll define per each vertex.

            //  TODO (Requirement 5).
            // When a set of lines is used in graphics, you should think of the list entries as
            // broken down into pairs; each pair of vertices will be drawn as a line segment.

            this.positions.push(...Vec.cast(
                [-1, -1, -1], [1, -1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, -1], [-1, 1, -1], [1, 1, 1], [-1, 1, 1],
                [-1, -1, -1], [-1, -1, 1], [-1, 1, -1], [-1, 1, 1], [1, -1, 1], [1, -1, -1], [1, 1, 1], [1, 1, -1],
                [-1, -1, 1], [1, -1, 1], [-1, 1, 1], [1, 1, 1], [1, -1, -1], [-1, -1, -1],[1, 1, -1], [-1, 1, -1],
                //add vertical lines to box
                [-1, -1, -1], [-1, 1, -1], [-1, -1, 1], [-1, 1, 1], [1, -1, 1], [1, 1, 1], [1, -1, -1], [1, 1, -1],));
            

            const white = Color.of(100, 100, 100, 1);

            this.colors.push(...Vec.cast(
                white, white, white, white, white, white, white, white,
                white, white, white, white, white, white, white, white,
                white, white, white, white, white, white, white, white,
                //and their white colors
                white, white, white, white, white, white, white, white));

            this.indexed = false;
            // Do this so we won't need to define "this.indices".
        }
    };


//-------------------------------------------------------------------------------------------------------------
//MAIN SCENE CLASS

window.Chess_Scene = window.classes.Chess_Scene =
    class Chess_Scene extends Scene_Component {
        constructor(context, control_box) {
            // The scene begins by requesting the camera, shapes, and materials it will need.
            super(context, control_box);
            // First, include a secondary Scene that provides movement controls:
            if (!context.globals.has_controls)
                context.register_scene_component(new Movement_Controls(context, control_box.parentElement.insertCell()));

            const r = context.width / context.height;
            context.globals.graphics_state.camera_transform = Mat4.translation([3, -10, -30]);  // Locate the camera here (inverted matrix).
            context.globals.graphics_state.projection_transform = Mat4.perspective(Math.PI / 4, r, .1, 1000);

            const shapes = {
                'box': new Cube(),
                'ball': new Subdivision_Sphere(4),
                'nextwire': new Next_Outline(),
                'wire': new Outline(),
                'horse': new HorsePrism()
            };
            this.submit_shapes(context, shapes);

            // Make some Material objects available to you:
            this.board = context.get_instance(Phong_Shader).material(Color.of(.9, .5, .9, 1), {
                ambient: .4,
                diffusivity: .4,
                specularity: 0.2
            });

            //make wood Material to try
            this.wood_mat = context.get_instance(Phong_Shader).material(Color.of(0,0,0,1), {
                    ambient: 0.4, texture: context.get_instance( "./assets/lightwood.png", true )});
            this.out_mat = context.get_instance(Basic_Shader).material();
            this.plastic = this.board.override({ambient: 1, specularity: .6});
            this.walls = context.get_instance(Phong_Shader).material(Color.of(0,0,0,1), {
                    ambient: 0.4, texture: context.get_instance( "./assets/stone_wall.png", true )});

            //added more lights
            this.lights = [new Light(Vec.of(0, 5, 5, 1), Color.of(1, 1, 1, 1), 100000), 
                           new Light(Vec.of(-2, 72, -2, 1), Color.of(1, 1, 1, 1), 100000),
                           new Light(Vec.of(-5, 5, 0, 1), Color.of(1, 1, 1, 1), 100000)];


            //define colors
            //board colors
            this.woodcolor = Color.of(0.85,0.556,0.35,1);
            this.whitecolor = Color.of(1,1,1,1);
            this.blackcolor = Color.of(0,0,0,1);
            this.purple = Color.of(240, 0, 255, 1);
            //piece colors
            this.piece_color_black = Color.of(0.5,0.5,0.5,1);
            this.piece_color_white = Color.of(234/255,246/255,249/255,1);

            //add boolean for which colors the board is
            this.wood = true;
            
            //variables for camera view
            this.topview = Vec.of(-2,36,-2);
            this.beginview = Vec.of(-2, 24.42, 22.69);
            //mirrored vectors must change since origin is offset
            this.top_mirrored = Vec.of(-4,36,-4);
            this.begin_mirrored = Vec.of(-3, 24.42, -26.69);
            //buttons for camera view
            this.top = false;
            this.lookaround = false;
            this.rotate = false;

            //add toggle bits for buttons
            this.selected = false;
            this.playing = false;

            //chess game variables
            //z "rows" of teams
            this.black_pawn_z = 2;
            this.black_z = 4;
            this.white_pawn_z = -8;
            this.white_z = -10;

            //x positions of all the pieces
            this.rook_x = -10;   this.rook2_x = 4;
            this.knight_x = -8;  this.knight2_x = 2;
            this.bish_x = -6;    this.bish2_x = 0;
            this.queen_x = -4;
            this.king_x = -2;
            this.max = 4;
            this.min = -10;
            //current position
            this.curr_x = 0;
            this.curr_z = 0;
            
            //move booleans
            this.whites_move = true;
            this.blacks_move = false;

            //chess game - initialize to empty board
            this.gameboard = [['_', '_', '_', '_', '_', '_', '_', '_'],
                              ['_', '_', '_', '_', '_', '_', '_', '_'],
                              ['_', '_', '_', '_', '_', '_', '_', '_'],
                              ['_', '_', '_', '_', '_', '_', '_', '_'],
                              ['_', '_', '_', '_', '_', '_', '_', '_'],
                              ['_', '_', '_', '_', '_', '_', '_', '_'],
                              ['_', '_', '_', '_', '_', '_', '_', '_'],
                              ['_', '_', '_', '_', '_', '_', '_', '_']];


            // VARIABLES TO HELP WITH MOUSE PICKING
            this.mousedown = false;

            // States of clicking; either nothing selected (false), or a piece is selected (true)
            this.clickstate = false;
            this.clickable_moves = [];  // This is populated by the next_moves_XXX functions to move pieces

            // Each "clickable area" is defined as (x, y) of bottom left corner of square,
            // then width and height of the square for easy checking
            this.clickable_areas = [
                // Bottom row, left to right
                [307, 414, 52, 36],   // x,y, width, height
                [359, 414, 52, 36],
                [411, 414, 52, 36],
                [464, 414, 52, 36],
                [515, 414, 52, 36],
                [567, 414, 52, 36],
                [619, 414, 52, 36],
                [671, 414, 52, 36],
                // row 2, left to right
                [319, 374, 47, 33],   // (x,y), width, height
                [369, 374, 47, 33],
                [418, 374, 47, 33],
                [467, 374, 47, 33],
                [516, 374, 47, 33],
                [566, 374, 47, 33],
                [616, 374, 47, 33],
                [665, 374, 47, 33],
                // row 3, left to right
                [334, 337, 45, 28],   // (x,y), width, height
                [382, 337, 45, 28],
                [427, 337, 45, 28],
                [472, 337, 45, 28],
                [518, 337, 45, 28],
                [565, 337, 45, 28],
                [612, 337, 45, 28],
                [659, 337, 45, 28],
                // row 4, left to right
                [343, 308, 44, 27],   // (x,y), width, height
                [386, 308, 44, 27],
                [432, 308, 44, 27],
                [476, 308, 44, 27],
                [520, 308, 44, 27],
                [564, 308, 44, 27],
                [609, 308, 44, 27],
                [654, 308, 44, 27],
                // row 5, left to right
                [350, 279, 43, 26],   // (x,y), width, height
                [393, 279, 43, 26],
                [435, 279, 43, 26],
                [478, 279, 43, 26],
                [520, 279, 43, 26],
                [563, 279, 43, 26],
                [606, 279, 43, 26],
                [649, 279, 43, 26],
                // row 6, left to right
                [359, 252, 40, 24],   // (x,y), width, height
                [400, 252, 40, 24],
                [441, 252, 40, 24],
                [481, 252, 40, 24],
                [522, 252, 40, 24],
                [562, 252, 40, 24],
                [603, 252, 40, 24],
                [645, 252, 40, 24],
                // row 7, left to right
                [367, 227, 38, 21],   // (x,y), width, height
                [406, 227, 38, 21],
                [444, 227, 38, 21],
                [483, 227, 38, 21],
                [522, 227, 38, 21],
                [561, 227, 38, 21],
                [600, 227, 38, 21],
                [640, 227, 38, 21],
                // row 8, left to right
                [372, 205, 37, 20],   // (x,y), width, height
                [410, 205, 37, 20],
                [448, 205, 37, 20],
                [485, 205, 37, 20],
                [523, 205, 37, 20],
                [561, 205, 37, 20],
                [599, 205, 37, 20],
                [636, 205, 37, 20],
    
            ];
        }



//-------------------------------------------------------------------------------------------------------------
//BUTTONS / CONTROL PANEL

        make_control_panel()
        // Draw the scene's buttons, setup their actions and keyboard shortcuts, and monitor live measurements.
        {
            this.key_triggered_button("Change Board", ["c"], () => {
                 this.wood = !this.wood;
            });
            this.key_triggered_button("Top View", ["t"], () => {
                 this.top = !this.top;
            });
            this.key_triggered_button("Lookaround", ["l"], () => {
                 this.lookaround = !this.lookaround;
            });
            this.new_line();
            this.key_triggered_button("Rotate", ["r"], () => {
                 this.rotate = !this.rotate;
            });
            this.key_triggered_button("Select Piece", ["s"], () => {
                 this.selected = !this.selected;
            });
            this.key_triggered_button("Playing", ["p"], () => {
                 this.playing = !this.playing;
            });
            this.new_line();
            this.key_triggered_button("Pawn", ["0"], () => {
                 if (this.playing) {
                        this.curr_z = -4;
                        this.curr_x = -4;
                 } else {
                        this.curr_x = this.knight_x;
                        this.curr_z = this.black_pawn_z;
                 }
            });
            this.key_triggered_button("Rook", ["v"], () => {
                 this.curr_z = -10;
                 this.curr_x = this.white_z;
            });
            this.key_triggered_button("Bishop", ["b"], () => {
                 this.curr_z = -2;
                 this.curr_x = -2;
            });
            this.key_triggered_button("King", ["k"], () => {
                 this.curr_z = this.black_z;
                 this.curr_x = -6;
            });
            this.new_line();
            this.key_triggered_button("Knight", ["z"], () => {
                 this.curr_z = 0;
                 this.curr_x = this.bish_x;
            });
            this.key_triggered_button("Queen", ["q"], () => {
                 this.curr_z = this.white_z;
                 this.curr_x = this.queen_x;
            });
            this.key_triggered_button("Move", ["m"], () => {
                var ip_x = 1;
                var ip_y = 1;
                var fp_x = 3;
                var fp_y = 1;
                /*
                if(initial_pos_input == "b1"){
                        ip_x = 1;
                        ip_y = 1;
                }
                if(final_pos_input == "b3"){
                        fp_x = 1;
                        fp_y = 3;
                }
                */
                console.log(ip_x);
                console.log(fp_x);
                this.gameboard[fp_x][fp_y] = this.gameboard[ip_x][ip_y];
                //this.gameboard[final_[final_pos[1]] = 'p-w';
                this.gameboard[ip_x][ip_y] = '_';   
            });
        }


        get_ex()
        {
            //FLIP BETWEEN RESET GAME AND MID GAME
            this.playing = !this.playing;
                 if (this.playing) {
                        this.gameboard =
                             [['r-w',   '_',   '_', 'q-w',   '_', 'r-w', 'a-w',   '_'],
                              [  '_',   '_',   '_', 'p-w', 'b-w', 'p-w', 'p-w', 'p-w'],
                              [  '_',   '_', 'p-w',   '_', 'p-w', 'k-w',   '_',   '_'],
                              [  '_',   '_',   '_', 'p-b',   '_',   '_',   '_',   '_'],
                              [  '_', 'k-w', 'p-b',   '_', 'b-w', 'p-b',   '_',   '_'],
                              [  '_',   '_', 'k-b',   '_',   '_',   '_',   '_',   '_'],
                              ['p-b', 'p-b',   '_', 'q-b', 'b-b',   '_', 'p-b', 'p-b'],
                              [ '_',   '_',  'a-b', 'r-b',   '_',  '_',    '_', 'r-b']];
                        this.curr_z = this.white_z;
                        this.curr_x = this.rook_x;
                 } else {
                        this.gameboard =
                             [['r-w', 'k-w', 'b-w', 'q-w',  'a-w', 'b-w', 'k-w', 'r-w'],
                              ['p-w', 'p-w', 'p-w', 'p-w',  'p-w', 'p-w', 'p-w', 'p-w'],
                              [  '_',   '_',   '_',   '_',    '_',   '_',   '_',   '_'],
                              [  '_',   '_',   '_',   '_',    '_',   '_',   '_',   '_'],
                              [  '_',   '_',   '_',   '_',    '_',   '_',   '_',   '_'],
                              [  '_',   '_',   '_',   '_',    '_',   '_',   '_',   '_'],
                              ['p-b', 'p-b', 'p-b', 'p-b',  'p-b', 'p-b', 'p-b', 'p-b'],
                              ['r-b', 'k-b', 'b-b', 'q-b',  'a-b', 'b-b', 'k-b', 'r-b']];
                        this.curr_z = this.black_pawn_z;
                        this.curr_x = this.knight_x;
                 }
        }


//-------------------------------------------------------------------------------------------------------------
//DRAWING SHAPES FUNCTIONS

        draw_box(graphics_state, model_transform, i) {
            // TODO:  Helper function for requirement 3 (see hint).
            //        This should make changes to the model_transform matrix, draw the next box, and return the newest model_transform.
            let color = Color.of(0,1,0,1);
            if (this.wood) {
                if (i % 2 == 0) {
                    color = this.blackcolor;
                    //this.shapes.box.draw(graphics_state, model_transform, this.board.override({color: color}));
                } else {
                    color = this.woodcolor;
                    //this.shapes.box.draw(graphics_state, model_transform, this.wood_mat);
                }
                //this.shapes.box.draw(graphics_state, model_transform, this.wood_mat);
            } else {
                if (i % 2 == 0) {
                    color = this.blackcolor;
                } else {
                    color = this.whitecolor;
                }
                //this.shapes.box.draw(graphics_state, model_transform, this.board.override({color: color}));
            }
            
            this.shapes.box.draw(graphics_state, model_transform, this.board.override({color: color}));

            return model_transform;
        }

        draw_edge(graphics_state, model_transform) {
            // TODO:  Helper function for requirement 3 (see hint).
            //        This should make changes to the model_transform matrix, draw the next box, and return the newest model_transform.
            let color = Color.of(0,1,0,1);
            if (this.wood) {
                color = this.woodcolor;
            } else {
                color = this.whitecolor;
            }
            
            this.shapes.box.draw(graphics_state, model_transform, this.board.override({color: color}));
            
            return model_transform;
        }


        draw_board(graphics_state, model_transform){
            
            //draw the playing board

            // Start offset by 12 so board is kinda centered
            model_transform = model_transform.times(Mat4.translation([-10, 2, -10]));

            // BOARD
            for(let i = 0; i < 8; i++) {
                for (let j=0; j < 8; j++) {
                    // Scale down by half
                    model_transform = model_transform.times(Mat4.scale(Vec.of( 1, 0.5, 1 )))
                    // Draw
                   // console.log(graphics_state.projection_transform.times(graphics_state.camera_transform).times(model_transform));
                    this.draw_box(graphics_state, model_transform, i+j);
                    // Scale back by 2 so next square isn't messed up
                    model_transform = model_transform.times(Mat4.scale(Vec.of( 1, 2, 1 )))
                    model_transform = model_transform.times(Mat4.translation([2, 0, 0]));
                }
                model_transform = model_transform.times(Mat4.translation([-16, 0, 2]));
            }

            //draw first edge of board and its corner

            //get to the outside edge
            model_transform = Mat4.identity();
            model_transform = model_transform.times(Mat4.translation([-12, 2, -10]));
            //draw edges of board
            for(let i = 0; i < 8; i++) {
                    //get to the correct edge
                    let temp = model_transform;
                    //scale it to the correct border size
                    //scale down from 2x2x2 to 0.2x1x2
                    model_transform = model_transform.times(Mat4.scale(Vec.of( 0.1, 0.5, 1 )));
                    //put it up against wall
                    model_transform = model_transform.times(Mat4.translation([9, 0, 0]));
                    //draw box
                    this.draw_edge(graphics_state, model_transform);
                    
                    // Scale back by 2 so next square isn't messed up
                    model_transform = temp.times(Mat4.translation([0, 0, 2]));
                
            }
            //draw corner
            model_transform = Mat4.identity();
            model_transform = model_transform.times(Mat4.translation([-12, 2, -12]));
            //scale it to the correct border size
            //scale down from 2x2x2 to 0.2x1x2
            model_transform = model_transform.times(Mat4.scale(Vec.of( 0.1, 0.5, 0.1 )));
            //put it up against wall
            model_transform = model_transform.times(Mat4.translation([9, 0, 9]));
            //draw box
            this.draw_edge(graphics_state, model_transform);


            //draw second edge of board and its corner

            //get to the outside edge
            model_transform = Mat4.identity();
            model_transform = model_transform.times(Mat4.translation([-10, 2, -12]));
            //draw edges
            for(let i = 0; i < 8; i++) {
                    //get to the correct edge
                    let temp = model_transform;
                    //scale it to the correct border size
                    //scale down from 2x2x2 to 2x1x0.2
                    model_transform = model_transform.times(Mat4.scale(Vec.of( 1, 0.5, 0.1 )));
                    //put it up against wall
                    model_transform = model_transform.times(Mat4.translation([0, 0, 9]));
                    //draw box
                    this.draw_edge(graphics_state, model_transform);
                    
                    // Scale back by 2 so next square isn't messed up
                    model_transform = temp.times(Mat4.translation([2, 0, 0]));
                
            }
            //draw corner
            model_transform = Mat4.identity();
            model_transform = model_transform.times(Mat4.translation([5, 2, -12]));
            //scale it to the correct border size
            //scale down from 2x2x2 to 0.2x1x2
            model_transform = model_transform.times(Mat4.scale(Vec.of( 0.1, 0.5, 0.1 )));
            //put it up against wall
            model_transform = model_transform.times(Mat4.translation([1, 0, 9]));
            //draw box
            this.draw_edge(graphics_state, model_transform);


            //draw third edge of board and its corner

            //get to the outside edge
            model_transform = Mat4.identity();
            model_transform = model_transform.times(Mat4.translation([-10, 2, 6]));
            //draw edges
            for(let i = 0; i < 8; i++) {
                    //get to the correct edge
                    let temp = model_transform;
                    //scale it to the correct border size
                    //scale down from 2x2x2 to 2x1x0.2
                    model_transform = model_transform.times(Mat4.scale(Vec.of( 1, 0.5, 0.1 )));
                    //put it up against wall
                    model_transform = model_transform.times(Mat4.translation([0, 0, -9]));
                    //draw box
                    this.draw_edge(graphics_state, model_transform);
                    
                    // Scale back by 2 so next square isn't messed up
                    model_transform = temp.times(Mat4.translation([2, 0, 0]));
                
            }
            //draw corner
            model_transform = Mat4.identity();
            model_transform = model_transform.times(Mat4.translation([5, 2, 5]));
            //scale it to the correct border size
            //scale down from 2x2x2 to 0.2x1x2
            model_transform = model_transform.times(Mat4.scale(Vec.of( 0.1, 0.5, 0.1 )));
            //put it up against wall
            model_transform = model_transform.times(Mat4.translation([1, 0, 1]));
            //draw box
            this.draw_edge(graphics_state, model_transform);

            //draw fourth edge of board and its corner

            //get to the outside edge
            model_transform = Mat4.identity();
            model_transform = model_transform.times(Mat4.translation([6, 2, -10]));
            //draw edges
            for(let i = 0; i < 8; i++) {
                    //get to the correct edge
                    let temp = model_transform;
                    //scale it to the correct border size
                    //scale down from 2x2x2 to 2x1x0.2
                    model_transform = model_transform.times(Mat4.scale(Vec.of( 0.1, 0.5, 1 )));
                    //put it up against wall
                    model_transform = model_transform.times(Mat4.translation([-9, 0, 0]));
                    //draw box
                    this.draw_edge(graphics_state, model_transform);
                    
                    // Scale back by 2 so next square isn't messed up
                    model_transform = temp.times(Mat4.translation([0, 0, 2]));
                
            }
            //draw corner
            model_transform = Mat4.identity();
            model_transform = model_transform.times(Mat4.translation([-12, 2, 5]));
            //scale it to the correct border size
            //scale down from 2x2x2 to 0.2x1x2
            model_transform = model_transform.times(Mat4.scale(Vec.of( 0.1, 0.5, 0.1 )));
            //put it up against wall
            model_transform = model_transform.times(Mat4.translation([9, 0, 1]));
            //draw box
            this.draw_edge(graphics_state, model_transform);
        }

//---------------------------------------------------------------------------------------------------------------
//CAMERA VIEW FUNCTIONS

        handle_view(graphics_state) {
            //top view
            //if a button has been pushed
            if (this.lookaround){
                //do nothing so user can look around
            }
            else if(this.top) {
                //invert the matrix that is the "top" view
                //eye = this.topview
                //poi = center of board
                //top = far edge of board
                if (this.rotate){
                    //rotate camera angle to mirror last one
                    // poi and eye change to -4,y,-4 since center of board offset
                    // flip top vector
                    var desired = Mat4.look_at(this.top_mirrored, Vec.of(-4,2,-4), Vec.of(0,2,6));
                    //map inverted matrix to camera
                    desired = desired.map((x, i) => Vec.from( graphics_state.camera_transform[i]).mix(x, .05));
                    //set equal to camera transformation
                    graphics_state.camera_transform = desired;
                } else {
                    var desired = Mat4.look_at(this.topview, Vec.of(-2,2,-2), Vec.of(0,2,-10));
                    //map inverted matrix to camera
                    desired = desired.map((x, i) => Vec.from( graphics_state.camera_transform[i]).mix(x, .05));
                    //set equal to camera transformation
                    graphics_state.camera_transform = desired;
                }
            } 
            else {
                //invert the matrix that is the "top" view
                //eye = this.beginview
                //poi = center of board
                //top = far edge of board
                if (this.rotate){
                    //rotate camera angle to mirror last one
                    //poi change to -4,y,-4 since center of board offset
                    //mirror eye, mirror top
                    var desired = Mat4.look_at(this.begin_mirrored, Vec.of(-4,2,-4), Vec.of(0,2,6.2));
                    //map inverted matrix to camera
                    desired = desired.map((x, i) => Vec.from( graphics_state.camera_transform[i]).mix(x, .05));
                    //set equal to camera transformation
                    graphics_state.camera_transform = desired;
                } else {
                    var desired = Mat4.look_at(this.beginview, Vec.of(-2,2,-2), Vec.of(0,2,-10));
                    //map inverted matrix to camera
                    desired = desired.map((x, i) => Vec.from( graphics_state.camera_transform[i]).mix(x, .05));
                    //set equal to camera transformation
                    graphics_state.camera_transform = desired;
                }
            }       
        }


//-------------------------------------------------------------------------------------------------------------
//SAMPLE ANGLE FUNCTION

        //returns an angle forming a sinusodial function
        //returns 0 - 0.04*pi
        angle(t){
            var factor = 0.02*Math.PI;
            this.curr_angle = factor + factor*Math.sin((Math.PI*6)*t);
            return this.curr_angle;
        }


//-------------------------------------------------------------------------------------------------------------
//DRAWING CHESS PIECES FUNCTIONS

//make all pieces plastic

        //draw pawn
        draw_pawn(graphics_state, model_transform, side){
            //create base with flattened sphere - draw at center of square
            let base = model_transform.times(Mat4.scale(Vec.of(0.65, 0.3, 0.65)));
            base = base.times(Mat4.translation([0, -2, 0]));

            let ring = model_transform.times(Mat4.scale(Vec.of(0.5, 0.1, 0.5)));
            ring = ring.times(Mat4.translation([0, 0.5, 0]));

            //create body of pawn 
            let mid = model_transform.times(Mat4.scale(Vec.of( 0.25, 0.5, 0.25)));
            mid = mid.times(Mat4.translation([0,0.25,0]));

            let top = model_transform.times(Mat4.scale(Vec.of( 0.35, 0.35, 0.35)));
            top = top.times(Mat4.translation([0,1.5,0]));

            if (side == "w"){
                this.shapes.ball.draw(graphics_state, base, this.board.override({color: this.piece_color_white}));
                this.shapes.ball.draw(graphics_state, ring, this.board.override({color: this.piece_color_white}));
                this.shapes.ball.draw(graphics_state, mid, this.board.override({color: this.piece_color_white}));
                this.shapes.ball.draw(graphics_state, top, this.board.override({color: this.piece_color_white}));
            } else {
                this.shapes.ball.draw(graphics_state, base, this.board.override({color: this.piece_color_black}));
                this.shapes.ball.draw(graphics_state, ring, this.board.override({color: this.piece_color_black}));
                this.shapes.ball.draw(graphics_state, mid, this.board.override({color: this.piece_color_black}));
                this.shapes.ball.draw(graphics_state, top, this.board.override({color: this.piece_color_black}));
            }
        }

        //draw rook
        draw_rook(graphics_state, model_transform, side){
            //make a base
            let base = model_transform.times(Mat4.scale(Vec.of(0.65, 0.3, 0.65)));
            base = base.times(Mat4.translation([0, -2, 0]));

            let basering = model_transform.times(Mat4.scale(Vec.of(0.55, 0.25, 0.55)));
            basering = basering.times(Mat4.translation([0, -1, 0]));

            let mid = model_transform.times(Mat4.scale(Vec.of( 0.35, 0.75, 0.35)));
            mid = mid.times(Mat4.translation([0,0,0]));

            let midring = model_transform.times(Mat4.scale(Vec.of( 0.5, .25, 0.5)));
            midring = midring.times(Mat4.translation([0,2,0]));

            let edge1 = model_transform.times(Mat4.scale(Vec.of( 0.23, .45, 0.05)));
            let edge2 = edge1;
            let edge3 = model_transform.times(Mat4.scale(Vec.of( 0.05, .45, 0.23)));;
            let edge4 = edge3;

            edge1 = edge1.times(Mat4.translation([0, 2.5, 7.6]));
            edge2 = edge2.times(Mat4.translation([0, 2.5, -7.6]));
            edge3 = edge3.times(Mat4.translation([7.6, 2.5, 0]));
            edge4 = edge4.times(Mat4.translation([-7.6, 2.5, 0]));

            if (side == "w"){
                this.shapes.ball.draw(graphics_state, base, this.board.override({color: this.piece_color_white}));
                this.shapes.ball.draw(graphics_state, basering, this.board.override({color: this.piece_color_white}));
                this.shapes.ball.draw(graphics_state, mid, this.board.override({color: this.piece_color_white}));
                this.shapes.ball.draw(graphics_state, midring, this.board.override({color: this.piece_color_white}));
                midring = midring.times(Mat4.translation([0,0.75,0]));
                this.shapes.ball.draw(graphics_state, midring, this.board.override({color: this.piece_color_white}));
                midring = midring.times(Mat4.translation([0,0.75,0]));
                this.shapes.ball.draw(graphics_state, midring, this.board.override({color: this.piece_color_white}));
                midring = midring.times(Mat4.translation([0,0.75,0]));
                this.shapes.ball.draw(graphics_state, midring, this.board.override({color: this.piece_color_white}));
                this.shapes.box.draw(graphics_state, edge1, this.board.override({color: this.piece_color_white}));
                this.shapes.box.draw(graphics_state, edge2, this.board.override({color: this.piece_color_white}));
                this.shapes.box.draw(graphics_state, edge3, this.board.override({color: this.piece_color_white}));
                this.shapes.box.draw(graphics_state, edge4, this.board.override({color: this.piece_color_white}));
            } else {
                this.shapes.ball.draw(graphics_state, base, this.board.override({color: this.piece_color_black}));
                this.shapes.ball.draw(graphics_state, basering, this.board.override({color: this.piece_color_black}));
                this.shapes.ball.draw(graphics_state, mid, this.board.override({color: this.piece_color_black}));
                this.shapes.ball.draw(graphics_state, midring, this.board.override({color: this.piece_color_black}));
                midring = midring.times(Mat4.translation([0,0.75,0]));
                this.shapes.ball.draw(graphics_state, midring, this.board.override({color: this.piece_color_black}));
                midring = midring.times(Mat4.translation([0,0.75,0]));
                this.shapes.ball.draw(graphics_state, midring, this.board.override({color: this.piece_color_black}));
                midring = midring.times(Mat4.translation([0,0.75,0]));
                this.shapes.ball.draw(graphics_state, midring, this.board.override({color: this.piece_color_black}));
                this.shapes.box.draw(graphics_state, edge1, this.board.override({color: this.piece_color_black}));
                this.shapes.box.draw(graphics_state, edge2, this.board.override({color: this.piece_color_black}));
                this.shapes.box.draw(graphics_state, edge3, this.board.override({color: this.piece_color_black}));
                this.shapes.box.draw(graphics_state, edge4, this.board.override({color: this.piece_color_black}));
            }    
        }


        //draw bishop
        draw_bishop(graphics_state, model_transform, side){
            //make a base
            let base = model_transform.times(Mat4.scale(Vec.of(0.65, 0.3, 0.65)));
            base = base.times(Mat4.translation([0, -2, 0]));

            let basering = model_transform.times(Mat4.scale(Vec.of(0.55, 0.25, 0.55)));
            basering = basering.times(Mat4.translation([0, -1, 0]));

            let mid = model_transform.times(Mat4.scale(Vec.of( 0.35, 0.75, 0.35)));
            mid = mid.times(Mat4.translation([0,0,0]));

            let midring = model_transform.times(Mat4.scale(Vec.of( 0.45, .2, 0.45)));
            midring = midring.times(Mat4.translation([0,2.55,0]));

            let top = model_transform.times(Mat4.scale(Vec.of( 0.35, .7, 0.35)));
            top = top.times(Mat4.translation([0,1.7,0]));

            let ball = model_transform.times(Mat4.scale(Vec.of( 0.15, .15, 0.15)));
            ball = ball.times(Mat4.translation([0,13,0]));

            if (side == "w"){
                this.shapes.ball.draw(graphics_state, base, this.board.override({color: this.piece_color_white}));
                this.shapes.ball.draw(graphics_state, basering, this.board.override({color: this.piece_color_white}));
                this.shapes.ball.draw(graphics_state, mid, this.board.override({color: this.piece_color_white}));
                this.shapes.ball.draw(graphics_state, midring, this.board.override({color: this.piece_color_white}));
                this.shapes.ball.draw(graphics_state, top, this.board.override({color: this.piece_color_white}));
                this.shapes.ball.draw(graphics_state, ball, this.board.override({color: this.piece_color_white}));
            } else {
                this.shapes.ball.draw(graphics_state, base, this.board.override({color: this.piece_color_black}));
                this.shapes.ball.draw(graphics_state, basering, this.board.override({color: this.piece_color_black}));
                this.shapes.ball.draw(graphics_state, mid, this.board.override({color: this.piece_color_black}));
                this.shapes.ball.draw(graphics_state, midring, this.board.override({color: this.piece_color_black}));
                this.shapes.ball.draw(graphics_state, top, this.board.override({color: this.piece_color_black}));
                this.shapes.ball.draw(graphics_state, ball, this.board.override({color: this.piece_color_black}));
            }
        }


        //draw knight
        draw_knight(graphics_state, model_transform, side){
            //make a base
            
            let base = model_transform.times(Mat4.scale(Vec.of(0.65, 0.3, 0.65)));
            base = base.times(Mat4.translation([0, -2, 0]));

            let basering = model_transform.times(Mat4.scale(Vec.of(0.55, 0.25, 0.55)));
            basering = basering.times(Mat4.translation([0, -1, 0]));

            let mid = model_transform.times(Mat4.scale(Vec.of( 0.35, 0.75, 0.35)));
            mid = mid.times(Mat4.translation([0,0,0]));

            let midring = model_transform.times(Mat4.scale(Vec.of( 0.5, .25, 0.5)));
            midring = midring.times(Mat4.translation([0,2,0]));

            let horse_body = model_transform.times(Mat4.scale(Vec.of( 0.4, .5, 0.37)));
            horse_body = horse_body.times(Mat4.translation([0,2.5,-0.2]));

            if (side == "w"){
                this.shapes.ball.draw(graphics_state, base, this.board.override({color: this.piece_color_white}));
                this.shapes.ball.draw(graphics_state, basering, this.board.override({color: this.piece_color_white}));
                this.shapes.ball.draw(graphics_state, mid, this.board.override({color: this.piece_color_white}));
                //make thick ring
                this.shapes.ball.draw(graphics_state, midring, this.board.override({color: this.piece_color_white}));
                midring = midring.times(Mat4.translation([0,0.6,0]));
                this.shapes.ball.draw(graphics_state, midring, this.board.override({color: this.piece_color_white}));
                this.shapes.horse.draw(graphics_state, horse_body, this.board.override({color: this.piece_color_white}));
            } else {
                this.shapes.ball.draw(graphics_state, base, this.board.override({color: this.piece_color_black}));
                this.shapes.ball.draw(graphics_state, basering, this.board.override({color: this.piece_color_black}));
                this.shapes.ball.draw(graphics_state, mid, this.board.override({color: this.piece_color_black}));
                this.shapes.ball.draw(graphics_state, midring, this.board.override({color: this.piece_color_black}));
                midring = midring.times(Mat4.translation([0,0.6,0]));
                this.shapes.ball.draw(graphics_state, midring, this.board.override({color: this.piece_color_black}));
                this.shapes.horse.draw(graphics_state, horse_body, this.board.override({color: this.piece_color_black}));
            }    
            
        }


        //draw queen
        draw_queen(graphics_state, model_transform, side){
                //make a base
                let base = model_transform.times(Mat4.scale(Vec.of(0.65, 0.3, 0.65)));
                base = base.times(Mat4.translation([0, -2, 0]));

                let basering = model_transform.times(Mat4.scale(Vec.of(0.55, 0.25, 0.55)));
                basering = basering.times(Mat4.translation([0, -1, 0]));

                let mid = model_transform.times(Mat4.scale(Vec.of( 0.35, 0.75, 0.35)));
                mid = mid.times(Mat4.translation([0,0,0]));

                let midring = model_transform.times(Mat4.scale(Vec.of( 0.45, .25, 0.45)));
                midring = midring.times(Mat4.translation([0,4.5,0]));

                let belt = model_transform.times(Mat4.scale(Vec.of( 0.45, .2, 0.45)));
                belt = belt.times(Mat4.translation([0,2.55,0]));

                let head = model_transform.times(Mat4.scale(Vec.of( 0.33, 0.25, 0.33)));
                head = head.times(Mat4.translation([0,7.5,0]));

                let ball = model_transform.times(Mat4.scale(Vec.of( 0.15, .15, 0.15)));
                ball = ball.times(Mat4.translation([0,14.75,0]));

                if (side == "w"){
                        this.shapes.ball.draw(graphics_state, base, this.board.override({color: this.piece_color_white}));
                        this.shapes.ball.draw(graphics_state, basering, this.board.override({color: this.piece_color_white}));
                        this.shapes.ball.draw(graphics_state, mid, this.board.override({color: this.piece_color_white}));
                        this.shapes.ball.draw(graphics_state, midring, this.board.override({color: this.piece_color_white}));
                        this.shapes.ball.draw(graphics_state, belt, this.board.override({color: this.piece_color_white}));

                        //make thicker ring
                        midring = midring.times(Mat4.translation([0,0.6,0]));
                        this.shapes.ball.draw(graphics_state, midring, this.board.override({color: this.piece_color_white}));
                        midring = midring.times(Mat4.translation([0,0.6,0]));
                        this.shapes.ball.draw(graphics_state, midring, this.board.override({color: this.piece_color_white}));

                        //make second body
                        mid = mid.times(Mat4.translation([0,1.5,0]));
                        this.shapes.ball.draw(graphics_state, mid, this.board.override({color: this.piece_color_white}));

                        //top of queen
                        this.shapes.ball.draw(graphics_state, head, this.board.override({color: this.piece_color_white}));
                        this.shapes.ball.draw(graphics_state, ball, this.board.override({color: this.piece_color_white}));
                } else {
                        this.shapes.ball.draw(graphics_state, base, this.board.override({color: this.piece_color_black}));
                        this.shapes.ball.draw(graphics_state, basering, this.board.override({color: this.piece_color_black}));
                        this.shapes.ball.draw(graphics_state, mid, this.board.override({color: this.piece_color_black}));
                        this.shapes.ball.draw(graphics_state, midring, this.board.override({color: this.piece_color_black}));
                        this.shapes.ball.draw(graphics_state, belt, this.board.override({color: this.piece_color_black}));

                        //make thicker ring
                        midring = midring.times(Mat4.translation([0,0.6,0]));
                        this.shapes.ball.draw(graphics_state, midring, this.board.override({color: this.piece_color_black}));
                        midring = midring.times(Mat4.translation([0,0.6,0]));
                        this.shapes.ball.draw(graphics_state, midring, this.board.override({color: this.piece_color_black}));
                        
                        //make second body
                        mid = mid.times(Mat4.translation([0,1.5,0]));
                        this.shapes.ball.draw(graphics_state, mid, this.board.override({color: this.piece_color_black}));

                        //top of queen
                        this.shapes.ball.draw(graphics_state, head, this.board.override({color: this.piece_color_black}));
                        this.shapes.ball.draw(graphics_state, ball, this.board.override({color: this.piece_color_black}));
                }
        }


        //draw king
        draw_king(graphics_state, model_transform, side){
            //make a base
            let base = model_transform.times(Mat4.scale(Vec.of(0.65, 0.3, 0.65)));
            base = base.times(Mat4.translation([0, -2, 0]));

            let basering = model_transform.times(Mat4.scale(Vec.of(0.55, 0.25, 0.55)));
            basering = basering.times(Mat4.translation([0, -1, 0]));

            let mid = model_transform.times(Mat4.scale(Vec.of( 0.35, 0.75, 0.35)));
            mid = mid.times(Mat4.translation([0,0,0]));

            let midring = model_transform.times(Mat4.scale(Vec.of( 0.5, .25, 0.5)));
            midring = midring.times(Mat4.translation([0,2,0]));

            if (side == "w"){
                this.shapes.ball.draw(graphics_state, base, this.board.override({color: this.piece_color_white}));
                this.shapes.ball.draw(graphics_state, basering, this.board.override({color: this.piece_color_white}));
                this.shapes.ball.draw(graphics_state, mid, this.board.override({color: this.piece_color_white}));
                //make thick ring
                this.shapes.ball.draw(graphics_state, midring, this.board.override({color: this.piece_color_white}));
                midring = midring.times(Mat4.translation([0,0.6,0]));
                this.shapes.ball.draw(graphics_state, midring, this.board.override({color: this.piece_color_white}));
                midring = midring.times(Mat4.translation([0,0.6,0]));
                this.shapes.ball.draw(graphics_state, midring, this.board.override({color: this.piece_color_white}));
                midring = midring.times(Mat4.translation([0,0.6,0]));
                this.shapes.ball.draw(graphics_state, midring, this.board.override({color: this.piece_color_white}));
                //make second body
                mid = mid.times(Mat4.translation([0,1.5,0]));
                this.shapes.ball.draw(graphics_state, mid, this.board.override({color: this.piece_color_white}));
                //another thick ring
                midring = midring.times(Mat4.translation([0,3.0,0]));
                midring = midring.times(Mat4.scale([0.75,1,0.75]));
                this.shapes.ball.draw(graphics_state, midring, this.board.override({color: this.piece_color_white}));
                //draw cross at the top of the last ring
                let edge1 = midring.times(Mat4.scale([0.65, 0.2, 0.2]));
                edge1 = edge1.times(Mat4.translation([0,10,0]));
                this.shapes.box.draw(graphics_state, edge1, this.board.override({color: this.piece_color_white}));
                let edge2 = midring.times(Mat4.scale([0.2, 1.5, 0.2]));
                edge2 = edge2.times(Mat4.translation([0,1,0]));
                this.shapes.box.draw(graphics_state, edge2, this.board.override({color: this.piece_color_white}));
            } else {
                this.shapes.ball.draw(graphics_state, base, this.board.override({color: this.piece_color_black}));
                this.shapes.ball.draw(graphics_state, basering, this.board.override({color: this.piece_color_black}));
                this.shapes.ball.draw(graphics_state, mid, this.board.override({color: this.piece_color_black}));
                this.shapes.ball.draw(graphics_state, midring, this.board.override({color: this.piece_color_black}));
                midring = midring.times(Mat4.translation([0,0.6,0]));
                this.shapes.ball.draw(graphics_state, midring, this.board.override({color: this.piece_color_black}));
                midring = midring.times(Mat4.translation([0,0.6,0]));
                this.shapes.ball.draw(graphics_state, midring, this.board.override({color: this.piece_color_black}));
                midring = midring.times(Mat4.translation([0,0.6,0]));
                this.shapes.ball.draw(graphics_state, midring, this.board.override({color: this.piece_color_black}));
                //make second body
                mid = mid.times(Mat4.translation([0,1.5,0]));
                this.shapes.ball.draw(graphics_state, mid, this.board.override({color: this.piece_color_black}));
                //another thick ring
                midring = midring.times(Mat4.translation([0,3.0,0]));
                midring = midring.times(Mat4.scale([0.75,1,0.75]));
                this.shapes.ball.draw(graphics_state, midring, this.board.override({color: this.piece_color_black}));
                //draw cross at the top of the last ring
                let edge1 = midring.times(Mat4.scale([0.65, 0.2, 0.2]));
                edge1 = edge1.times(Mat4.translation([0,10,0]));
                this.shapes.box.draw(graphics_state, edge1, this.board.override({color: this.piece_color_black}));
                let edge2 = midring.times(Mat4.scale([0.2, 1.5, 0.2]));
                edge2 = edge2.times(Mat4.translation([0,1,0]));
                this.shapes.box.draw(graphics_state, edge2, this.board.override({color: this.piece_color_black}));
            }    
        }


//-------------------------------------------------------------------------------------------------------------
//PLAYING GAME FUNCTIONS

        //returns a translation matrix to 3D point (x,y,z)
        pos_to_Mat(x, y, z)
        {
            return Mat4.identity().times(Mat4.translation([x,y,z]));
        }

        //sets up chess board with all pieces on both sides
        initialize_game(graphics_state){

            //define position constants
            let y = 3;

            //initialize game board
            this.gameboard = [['r-w', 'k-w', 'B-w', 'q-w',  'a-w', 'B-w', 'k-w', 'r-w'],
                              ['p-w', 'p-w', 'p-w', 'p-w',  'p-w', 'p-w', 'p-w', 'p-w'],
                              [  '_',   '_',   '_',   '_',    '_',   '_',   '_',   '_'],
                              [  '_',   '_',   '_',   '_',    '_',   '_',   '_',   '_'],
                              [  '_',   '_',   '_',   '_',    '_',   '_',   '_',   '_'],
                              [  '_',   '_',   '_',   '_',    '_',   '_',   '_',   '_'],
                              ['p-b', 'p-b', 'p-b', 'p-b',  'p-b', 'p-b', 'p-b', 'p-b'],
                              ['r-b', 'k-b', 'B-b', 'q-b',  'a-b', 'B-b', 'k-b', 'r-b']];


                                    //PAWNS
            //initialize black pawns
            //let pawn_pos = Mat4.identity().times(Mat4.translation([-10,y,this.black_pawn_z]));
            let pawn_pos = this.pos_to_Mat(-10,y,this.black_pawn_z);
            for (let i = 0; i < 8; i++){
                this.draw_pawn(graphics_state, pawn_pos, "b");
                pawn_pos = pawn_pos.times(Mat4.translation([2,0,0]));
            }

            //initialize white pawns
            pawn_pos = this.pos_to_Mat(-10,y,this.white_pawn_z);
            for (let i = 0; i < 8; i++){
                this.draw_pawn(graphics_state, pawn_pos, "w");
                pawn_pos = pawn_pos.times(Mat4.translation([2,0,0]));
            }

                                    //ROOKS
            //initialize black rooks
            let rook_pos = this.pos_to_Mat(this.rook_x,y,this.black_z);
            this.draw_rook(graphics_state, rook_pos, "b");
            rook_pos = this.pos_to_Mat(this.rook2_x,y,this.black_z);
            this.draw_rook(graphics_state, rook_pos, "b");

            //initialize white rooks
            rook_pos = this.pos_to_Mat(this.rook_x,y,this.white_z);
            this.draw_rook(graphics_state, rook_pos, "w");
            rook_pos = this.pos_to_Mat(this.rook2_x,y,this.white_z);
            this.draw_rook(graphics_state, rook_pos, "w");
            

                                    //KNIGHTS
            //initialize black knights
            let knight_pos = this.pos_to_Mat(this.knight_x,y,this.black_z);
            this.draw_knight(graphics_state, knight_pos, "b");
            knight_pos = this.pos_to_Mat(this.knight2_x,y,this.black_z);
            this.draw_knight(graphics_state, knight_pos, "b");

            //initialize white knights
            knight_pos = this.pos_to_Mat(this.knight_x,y,this.white_z);
            this.draw_knight(graphics_state, knight_pos, "w");
            knight_pos = this.pos_to_Mat(this.knight2_x,y,this.white_z);
            this.draw_knight(graphics_state, knight_pos, "w");


                                    //BISHOPS
            //initialize black bishops
            let bish_pos = this.pos_to_Mat(this.bish_x,y,this.black_z);
            this.draw_bishop(graphics_state, bish_pos, "b");
            bish_pos = this.pos_to_Mat(this.bish2_x,y,this.black_z);
            this.draw_bishop(graphics_state, bish_pos, "b");

            //initialize white bishops
            bish_pos = this.pos_to_Mat(this.bish_x,y,this.white_z);
            this.draw_bishop(graphics_state, bish_pos, "w");
            bish_pos = this.pos_to_Mat(this.bish2_x,y,this.white_z);
            this.draw_bishop(graphics_state, bish_pos, "w");


                                    //QUEENS
            //initialize black queen
            let queen_pos = this.pos_to_Mat(this.queen_x,y,this.black_z);
            this.draw_queen(graphics_state, queen_pos, "b");

            //initialize white queen
            queen_pos = this.pos_to_Mat(this.queen_x,y,this.white_z);
            this.draw_queen(graphics_state, queen_pos, "w");


                                    //KINGS
            //initialize black king
            let king_pos = this.pos_to_Mat(this.king_x,y,this.black_z);
            this.draw_king(graphics_state, king_pos, "b");

            //initialize white king
            king_pos = this.pos_to_Mat(this.king_x,y,this.white_z);
            this.draw_king(graphics_state, king_pos, "w");
            
        }


        display_state(graphics_state)
        {
             //define y
             let y = 3;

             //loop through gameboard and display the pieces
             for (let x = this.min; x <= this.max; x = x + 2){
                  for (let z = this.min; z <= this.max; z = z + 2){
                     let curr = this.get_piece(x, z);
                     if (curr[0] == '_'){
                             //nothing - empty space
                     } else {
                             //get the color of piece
                             let c = curr[2];
                             let pos = this.pos_to_Mat(x, y, z);
                             if (curr[0] == 'p'){
                                //pawn
                                this.draw_pawn(graphics_state, pos, c);
                             } else if (curr[0] == 'r'){
                                //rook
                                this.draw_rook(graphics_state, pos, c);
                             } else if (curr[0] == 'k'){
                                //knight
                                this.draw_knight(graphics_state, pos, c);
                             } else if (curr[0] == 'B'){
                                //bishop
                                this.draw_bishop(graphics_state, pos, c);
                             } else if (curr[0] == 'q'){
                                //queen
                                this.draw_queen(graphics_state, pos, c);
                             } else {
                                //king
                                this.draw_king(graphics_state, pos, c);
                             }
                   }
             }}
        }

        //play(graphics_state){}


//---------------------------------------------------------------------------------------------------------------
//NEXT MOVES FUNCTIONS


        //tranlates between [x,y,z] in graphics_state to this.gameboard positions
        translate(x, z)
        {
             //-10 => 0
             //4 => 7
             let posarr = [(x + 10)/2, (z + 10)/2];
             return posarr;
        }

        //returns the value in gameboard at x, z graphics position 
        get_piece(x, z)
        {
                let board_coord = this.translate(x, z);
                return this.gameboard[board_coord[1]][board_coord[0]];
        }
        edit_piece(x, z, entry)
        {
                let board_coord = this.translate(x, z);
                this.gameboard[board_coord[1]][board_coord[0]] = entry;
        }
        get_color(x,z){
                let board_coord = this.translate(x, z);
                console.log(this.gameboard[board_coord[1]][board_coord[0]]);
                var piece_string = this.gameboard[board_coord[1]][board_coord[0]];
                if(piece_string.includes("b")){
                        console.log("FUCK YOU JAKE");
                        return "B";
                }
                else if(piece_string.includes("w")){
                        return "W";
                }
                else return "N";
        }

        //checks that an x,z position is on the chess board
        valid_pos(x, z)
        {
                let x_check = 0;
                let z_check = 0;
                //check x bounds
                if ((x >= -10) && (x <= 4)){
                        x_check = 1;
                }
                //check z bounds
                if ((z >= -10) && (z <= 4)){
                        z_check = 1;
                }
                //return true or false
                if ((x_check == 1) && (z_check == 1)){
                        return true;
                } else {
                        return false;
                }

        }

        next_moves_pawns(graphics_state, curr_piece){
            this.clickable_moves = [];
                //check if white or black
                    if (curr_piece[2] == 'w'){
                        //white - check pieces_z + 1
                        if (this.curr_z != this.max) {
                            //check locs right in front of pawn
                            let next1 = this.get_piece(this.curr_x, this.curr_z + 2);
                            if (next1 == '_'){
                                    //empty
                                    this.light_box(graphics_state, this.curr_x, this.curr_z + 2, "next");
                                    // move is possible, let everyone know
                                    this.clickable_moves.push([this.curr_x, this.curr_z + 2]);
                                    //check the next space
                                    // if (this.curr_z != 2) {
                                    if (this.curr_z == -8) {
                                        let next2 = this.get_piece(this.curr_x, this.curr_z + 4);
                                        if (next2 == '_') {
                                                //empty
                                                this.light_box(graphics_state, this.curr_x, this.curr_z + 4, "next");
                                                // move is possible, let everyone know
                                                this.clickable_moves.push([this.curr_x, this.curr_z + 4]);
                                        }
                                    }
                            }
                            //check locs diagonal of pawn for enemy pieces
                            if (this.curr_x != this.max){
                                let diag1 = this.get_piece(this.curr_x + 2, this.curr_z + 2);
                                if (diag1[2] == 'b') {
                                         //enemy
                                         this.light_box(graphics_state, this.curr_x + 2, this.curr_z + 2, "next");
                                         // move is possible, let everyone know
                                        this.clickable_moves.push([this.curr_x + 2, this.curr_z + 2]);
                                 }
                            }
                            if (this.curr_x != this.min){
                                let diag2 = this.get_piece(this.curr_x - 2, this.curr_z + 2);
                                if (diag2[2] == 'b') {
                                         //enemy
                                         this.light_box(graphics_state, this.curr_x - 2, this.curr_z + 2, "next");
                                         // move is possible, let everyone know
                                        this.clickable_moves.push([this.curr_x - 2, this.curr_z + 2]);
                                 }
                            }

                        }
                    } else {
                        //black - check pieces_z - 1
                        if (this.curr_z != this.min) {
                            //check locs right in front of pawn
                            let next1 = this.get_piece(this.curr_x, this.curr_z - 2);
                            if (next1 == '_'){
                                    //empty
                                    this.light_box(graphics_state, this.curr_x, this.curr_z - 2, "next");
                                    // move is possible, let everyone know
                                    this.clickable_moves.push([this.curr_x, this.curr_z - 2]);
                                    //check the next space
                                    if (this.curr_z == 2) {
                                        let next2 = this.get_piece(this.curr_x, this.curr_z - 4);
                                        if (next2 == '_') {
                                                //empty
                                                this.light_box(graphics_state, this.curr_x, this.curr_z - 4, "next");
                                                // move is possible, let everyone know
                                                this.clickable_moves.push([this.curr_x, this.curr_z - 4]);
                                        }
                                    }
                            }
                            //check locs diagonal of pawn for enemy pieces
                            if (this.curr_x != this.max){
                                let diag1 = this.get_piece(this.curr_x + 2, this.curr_z - 2);
                                if (diag1[2] == 'w') {
                                         //enemy
                                         this.light_box(graphics_state, this.curr_x + 2, this.curr_z - 2, "next");
                                         // move is possible, let everyone know
                                        this.clickable_moves.push([this.curr_x + 2, this.curr_z - 2]);
                                 }
                            }
                            if (this.curr_x != this.min){
                                let diag2 = this.get_piece(this.curr_x - 2, this.curr_z - 2);
                                if (diag2[2] == 'w') {
                                         //enemy
                                         this.light_box(graphics_state, this.curr_x - 2, this.curr_z - 2, "next");
                                         // move is possible, let everyone know
                                        this.clickable_moves.push([this.curr_x - 2, this.curr_z - 2]);
                                 }
                            }

                        }

                    }
        }


        next_moves_rooks(graphics_state, curr_piece){
            this.clickable_moves = [];
                //check if white or black
                if (curr_piece[2] == 'w'){
                        //white
                        //loop in 4 directions - stop at edges or other pieces
                        //if piece is white, stop one before.  else include black piece

                        let stop = 0;
                        let startx = this.curr_x;
                        let startz = this.curr_z;

                        //+z
                        for (let z = startz + 2; z < 6; z = z + 2){
                                //check if a piece has been reached
                                if (stop == 1){
                                        z = 6;
                                } else {
                                        //check if new position is valid
                                        if (this.valid_pos(startx, z)){
                                                let pos = this.get_piece(startx, z);
                                                if (pos == '_'){
                                                        //empty - light up box
                                                        this.light_box(graphics_state, startx, z, "next");
                                                        this.clickable_moves.push([startx, z]);
                                                } else if (pos[2] == 'b'){
                                                        //enemy piece - light up box and stop
                                                        stop = 1;
                                                        this.light_box(graphics_state, startx, z, "next");
                                                        this.clickable_moves.push([startx, z]);
                                                } else if (pos[2] == 'w'){
                                                        //friendly piece - don't light box and stop
                                                        stop = 1;
                                                }
                                        } else {
                                                //else stop
                                                stop = 1;
                                        }
                                }
                        }

                        //-z
                        stop = 0;
                        for (let z = startz - 2; z > -12; z = z - 2){
                                //check if a piece has been reached
                                if (stop == 1){
                                        z = -12;
                                } else {
                                        //check if new position is valid
                                        if (this.valid_pos(startx, z)){
                                                let pos = this.get_piece(startx, z);
                                                if (pos == '_'){
                                                        //empty - light up box
                                                        this.light_box(graphics_state, startx, z, "next");
                                                        this.clickable_moves.push([startx, z]);
                                                } else if (pos[2] == 'b'){
                                                        //enemy piece - light up box and stop
                                                        stop = 1;
                                                        this.light_box(graphics_state, startx, z, "next");
                                                        this.clickable_moves.push([startx, z]);
                                                } else if (pos[2] == 'w'){
                                                        //friendly piece - don't light box and stop
                                                        stop = 1;
                                                }
                                        } else {
                                                //else stop
                                                stop = 1;
                                        }
                                }
                        }

                        //+x
                        stop = 0;
                        for (let x = startx + 2; x < 6; x = x + 2){
                                //check if a piece has been reached
                                if (stop == 1){
                                        x = 6;
                                } else {
                                        //check if new position is valid
                                        if (this.valid_pos(x, startz)){
                                                let pos = this.get_piece(x, startz);
                                                if (pos == '_'){
                                                        //empty - light up box
                                                        this.light_box(graphics_state, x, startz, "next");
                                                        this.clickable_moves.push([x, startz]);
                                                } else if (pos[2] == 'b'){
                                                        //enemy piece - light up box and stop
                                                        stop = 1;
                                                        this.light_box(graphics_state, x, startz, "next");
                                                        this.clickable_moves.push([x, startz]);
                                                } else if (pos[2] == 'w'){
                                                        //friendly piece - don't light box and stop
                                                        stop = 1;
                                                }
                                        } else {
                                                //else stop
                                                stop = 1;
                                        }
                                }
                        }

                        //-x
                        stop = 0;
                        for (let x = startx - 2; x > -12; x = x - 2){
                                //check if a piece has been reached
                                if (stop == 1){
                                        x = -12;
                                } else {
                                        //check if new position is valid
                                        if (this.valid_pos(x, startz)){
                                                let pos = this.get_piece(x, startz);
                                                if (pos == '_'){
                                                        //empty - light up box
                                                        this.light_box(graphics_state, x, startz, "next");
                                                        this.clickable_moves.push([x, startz]);
                                                } else if (pos[2] == 'b'){
                                                        //enemy piece - light up box and stop
                                                        stop = 1;
                                                        this.light_box(graphics_state, x, startz, "next");
                                                        this.clickable_moves.push([x, startz]);
                                                } else if (pos[2] == 'w'){
                                                        //friendly piece - don't light box and stop
                                                        stop = 1;
                                                }
                                        } else {
                                                //else stop
                                                stop = 1;
                                        }
                                }
                        }

                } else {
                        //black
                        //loop in 4 directions - stop at edges or other pieces
                        //if piece is black, stop one before.  else include white piece

                        let stop = 0;
                        let startx = this.curr_x;
                        let startz = this.curr_z;

                        //+z
                        for (let z = startz + 2; z < 6; z = z + 2){
                                //check if a piece has been reached
                                if (stop == 1){
                                        z = 6;
                                } else {
                                        //check if new position is valid
                                        if (this.valid_pos(startx, z)){
                                                let pos = this.get_piece(startx, z);
                                                if (pos == '_'){
                                                        //empty - light up box
                                                        this.light_box(graphics_state, startx, z, "next");
                                                        this.clickable_moves.push([startx, z]);
                                                } else if (pos[2] == 'w'){
                                                        //enemy piece - light up box and stop
                                                        stop = 1;
                                                        this.light_box(graphics_state, startx, z, "next");
                                                        this.clickable_moves.push([startx, z]);
                                                } else if (pos[2] == 'b'){
                                                        //friendly piece - don't light box and stop
                                                        stop = 1;
                                                }
                                        } else {
                                                //else stop
                                                stop = 1;
                                        }
                                }
                        }

                        //-z
                        stop = 0;
                        for (let z = startz - 2; z > -12; z = z - 2){
                                //check if a piece has been reached
                                if (stop == 1){
                                        z = -12;
                                } else {
                                        //check if new position is valid
                                        if (this.valid_pos(startx, z)){
                                                let pos = this.get_piece(startx, z);
                                                if (pos == '_'){
                                                        //empty - light up box
                                                        this.light_box(graphics_state, startx, z, "next");
                                                        this.clickable_moves.push([startx, z]);
                                                } else if (pos[2] == 'w'){
                                                        //enemy piece - light up box and stop
                                                        stop = 1;
                                                        this.light_box(graphics_state, startx, z, "next");
                                                        this.clickable_moves.push([startx, z]);
                                                } else if (pos[2] == 'b'){
                                                        //friendly piece - don't light box and stop
                                                        stop = 1;
                                                }
                                        } else {
                                                //else stop
                                                stop = 1;
                                        }
                                }
                        }

                        //+x
                        stop = 0;
                        for (let x = startx + 2; x < 6; x = x + 2){
                                //check if a piece has been reached
                                if (stop == 1){
                                        x = 6;
                                } else {
                                        //check if new position is valid
                                        if (this.valid_pos(x, startz)){
                                                let pos = this.get_piece(x, startz);
                                                if (pos == '_'){
                                                        //empty - light up box
                                                        this.light_box(graphics_state, x, startz, "next");
                                                        this.clickable_moves.push([x, startz]);
                                                } else if (pos[2] == 'w'){
                                                        //enemy piece - light up box and stop
                                                        stop = 1;
                                                        this.light_box(graphics_state, x, startz, "next");
                                                        this.clickable_moves.push([x, startz]);
                                                } else if (pos[2] == 'b'){
                                                        //friendly piece - don't light box and stop
                                                        stop = 1;
                                                }
                                        } else {
                                                //else stop
                                                stop = 1;
                                        }
                                }
                        }

                        //-x
                        stop = 0;
                        for (let x = startx - 2; x > -12; x = x - 2){
                                //check if a piece has been reached
                                if (stop == 1){
                                        x = -12;
                                } else {
                                        //check if new position is valid
                                        if (this.valid_pos(x, startz)){
                                                let pos = this.get_piece(x, startz);
                                                if (pos == '_'){
                                                        //empty - light up box
                                                        this.light_box(graphics_state, x, startz, "next");
                                                        this.clickable_moves.push([x, startz]);
                                                } else if (pos[2] == 'w'){
                                                        //enemy piece - light up box and stop
                                                        stop = 1;
                                                        this.light_box(graphics_state, x, startz, "next");
                                                        this.clickable_moves.push([x, startz]);
                                                } else if (pos[2] == 'b'){
                                                        //friendly piece - don't light box and stop
                                                        stop = 1;
                                                }
                                        } else {
                                                //else stop
                                                stop = 1;
                                        }
                                }
                        }

                }
        }


        next_moves_knights(graphics_state, curr_piece){
                //check if white or black
                if (curr_piece[2] == 'w'){
                        //white - only have to check 8 spots

                        let x = this.curr_x;
                        let z = this.curr_z;

                        //+xz
                        if (this.valid_pos(x+2, z+4)){
                                //get the piece
                                let pos = this.get_piece(x+2, z+4);
                                //check if white, black, or empty
                                if (pos == '_'){
                                      //empty - light up box
                                      this.light_box(graphics_state, x+2, z+4, "next");
                                      this.clickable_moves.push([x+2, z+4]);
                                } else if (pos[2] == 'b'){
                                      //enemy piece - light up box and stop
                                      this.light_box(graphics_state, x+2, z+4, "next");
                                      this.clickable_moves.push([x+2, z+4]);
                                }
                        }
                        if (this.valid_pos(x+4, z+2)){
                                //get the piece
                                let pos = this.get_piece(x+4, z+2);
                                //check if white, black, or empty
                                if (pos == '_'){
                                      //empty - light up box
                                      this.light_box(graphics_state, x+4, z+2, "next");
                                      this.clickable_moves.push([x+4, z+2]);
                                } else if (pos[2] == 'b'){
                                      //enemy piece - light up box and stop
                                      this.light_box(graphics_state, x+4, z+2, "next");
                                      this.clickable_moves.push([x+4, z+2]);
                                }
                        }

                        //-xz
                        if (this.valid_pos(x-2, z-4)){
                                //get the piece
                                let pos = this.get_piece(x-2, z-4);
                                //check if white, black, or empty
                                if (pos == '_'){
                                      //empty - light up box
                                      this.light_box(graphics_state, x-2, z-4, "next");
                                      this.clickable_moves.push([x-2, z-4]);
                                } else if (pos[2] == 'b'){
                                      //enemy piece - light up box and stop
                                      this.light_box(graphics_state, x-2, z-4, "next");
                                      this.clickable_moves.push([x-2, z-4]);
                                }
                        }
                        if (this.valid_pos(x-4, z-2)){
                                //get the piece
                                let pos = this.get_piece(x-4, z-2);
                                //check if white, black, or empty
                                if (pos == '_'){
                                      //empty - light up box
                                      this.light_box(graphics_state, x-4, z-2, "next");
                                      this.clickable_moves.push([x-4, z-2]);
                                } else if (pos[2] == 'b'){
                                      //enemy piece - light up box and stop
                                      this.light_box(graphics_state, x-4, z-2, "next");
                                      this.clickable_moves.push([x-4, z-2]);
                                }
                        }


                        //+x-z
                        if (this.valid_pos(x+2, z-4)){
                                //get the piece
                                let pos = this.get_piece(x+2, z-4);
                                //check if white, black, or empty
                                if (pos == '_'){
                                      //empty - light up box
                                      this.light_box(graphics_state, x+2, z-4, "next");
                                      this.clickable_moves.push([x+2, z-4]);
                                } else if (pos[2] == 'b'){
                                      //enemy piece - light up box and stop
                                      this.light_box(graphics_state, x+2, z-4, "next");
                                      this.clickable_moves.push([x+2, z-4]);
                                }
                        }
                        if (this.valid_pos(x+4, z-2)){
                                //get the piece
                                let pos = this.get_piece(x+4, z-2);
                                //check if white, black, or empty
                                if (pos == '_'){
                                      //empty - light up box
                                      this.light_box(graphics_state, x+4, z-2, "next");
                                      this.clickable_moves.push([x+4, z-2]);
                                } else if (pos[2] == 'b'){
                                      //enemy piece - light up box and stop
                                      this.light_box(graphics_state, x+4, z-2, "next");
                                      this.clickable_moves.push([x+4, z-2]);
                                }
                        }


                        //-x+z
                        if (this.valid_pos(x-2, z+4)){
                                //get the piece
                                let pos = this.get_piece(x-2, z+4);
                                //check if white, black, or empty
                                if (pos == '_'){
                                      //empty - light up box
                                      this.light_box(graphics_state, x-2, z+4, "next");
                                      this.clickable_moves.push([x-2, z+4]);
                                } else if (pos[2] == 'b'){
                                      //enemy piece - light up box and stop
                                      this.light_box(graphics_state, x-2, z+4, "next");
                                      this.clickable_moves.push([x-2, z+4]);
                                }
                        }
                        if (this.valid_pos(x-4, z+2)){
                                //get the piece
                                let pos = this.get_piece(x-4, z+2);
                                //check if white, black, or empty
                                if (pos == '_'){
                                      //empty - light up box
                                      this.light_box(graphics_state, x-4, z+2, "next");
                                      this.clickable_moves.push([x-4, z+2]);
                                } else if (pos[2] == 'b'){
                                      //enemy piece - light up box and stop
                                      this.light_box(graphics_state, x-4, z+2, "next");
                                      this.clickable_moves.push([x-4, z+2]);
                                }
                        }

                } else {
                        //black
                        let x = this.curr_x;
                        let z = this.curr_z;

                        //+xz
                        if (this.valid_pos(x+2, z+4)){
                                //get the piece
                                let pos = this.get_piece(x+2, z+4);
                                //check if white, black, or empty
                                if (pos == '_'){
                                      //empty - light up box
                                      this.light_box(graphics_state, x+2, z+4, "next");
                                      this.clickable_moves.push([x+2, z+4]);
                                } else if (pos[2] == 'w'){
                                      //enemy piece - light up box and stop
                                      this.light_box(graphics_state, x+2, z+4, "next");
                                      this.clickable_moves.push([x+2, z+4]);
                                }
                        }
                        if (this.valid_pos(x+4, z+2)){
                                //get the piece
                                let pos = this.get_piece(x+4, z+2);
                                //check if white, black, or empty
                                if (pos == '_'){
                                      //empty - light up box
                                      this.light_box(graphics_state, x+4, z+2, "next");
                                      this.clickable_moves.push([x+4, z+2]);
                                } else if (pos[2] == 'w'){
                                      //enemy piece - light up box and stop
                                      this.light_box(graphics_state, x+4, z+2, "next");
                                      this.clickable_moves.push([x+4, z+2]);
                                }
                        }

                        //-xz
                        if (this.valid_pos(x-2, z-4)){
                                //get the piece
                                let pos = this.get_piece(x-2, z-4);
                                //check if white, black, or empty
                                if (pos == '_'){
                                      //empty - light up box
                                      this.light_box(graphics_state, x-2, z-4, "next");
                                      this.clickable_moves.push([x-2, z-4]);
                                } else if (pos[2] == 'w'){
                                      //enemy piece - light up box and stop
                                      this.light_box(graphics_state, x-2, z-4, "next");
                                      this.clickable_moves.push([x-2, z-4]);
                                }
                        }
                        if (this.valid_pos(x-4, z-2)){
                                //get the piece
                                let pos = this.get_piece(x-4, z-2);
                                //check if white, black, or empty
                                if (pos == '_'){
                                      //empty - light up box
                                      this.light_box(graphics_state, x-4, z-2, "next");
                                      this.clickable_moves.push([x-4, z-2]);
                                } else if (pos[2] == 'w'){
                                      //enemy piece - light up box and stop
                                      this.light_box(graphics_state, x-4, z-2, "next");
                                      this.clickable_moves.push([x-4, z-2]);
                                }
                        }


                        //+x-z
                        if (this.valid_pos(x+2, z-4)){
                                //get the piece
                                let pos = this.get_piece(x+2, z-4);
                                //check if white, black, or empty
                                if (pos == '_'){
                                      //empty - light up box
                                      this.light_box(graphics_state, x+2, z-4, "next");
                                      this.clickable_moves.push([x+2, z-4]);
                                } else if (pos[2] == 'w'){
                                      //enemy piece - light up box and stop
                                      this.light_box(graphics_state, x+2, z-4, "next");
                                      this.clickable_moves.push([x+2, z-4]);
                                }
                        }
                        if (this.valid_pos(x+4, z-2)){
                                //get the piece
                                let pos = this.get_piece(x+4, z-2);
                                //check if white, black, or empty
                                if (pos == '_'){
                                      //empty - light up box
                                      this.light_box(graphics_state, x+4, z-2, "next");
                                      this.clickable_moves.push([x+4, z-2]);
                                } else if (pos[2] == 'w'){
                                      //enemy piece - light up box and stop
                                      this.light_box(graphics_state, x+4, z-2, "next");
                                      this.clickable_moves.push([x+4, z-2]);
                                }
                        }


                        //-x+z
                        if (this.valid_pos(x-2, z+4)){
                                //get the piece
                                let pos = this.get_piece(x-2, z+4);
                                //check if white, black, or empty
                                if (pos == '_'){
                                      //empty - light up box
                                      this.light_box(graphics_state, x-2, z+4, "next");
                                      this.clickable_moves.push([x-2, z+4]);
                                } else if (pos[2] == 'w'){
                                      //enemy piece - light up box and stop
                                      this.light_box(graphics_state, x-2, z+4, "next");
                                      this.clickable_moves.push([x-2, z+4]);
                                }
                        }
                        if (this.valid_pos(x-4, z+2)){
                                //get the piece
                                let pos = this.get_piece(x-4, z+2);
                                //check if white, black, or empty
                                if (pos == '_'){
                                      //empty - light up box
                                      this.light_box(graphics_state, x-4, z+2, "next");
                                      this.clickable_moves.push([x-4, z+2]);
                                } else if (pos[2] == 'w'){
                                      //enemy piece - light up box and stop
                                      this.light_box(graphics_state, x-4, z+2, "next");
                                      this.clickable_moves.push([x-4, z+2]);
                                }
                        }
                }
        }        

        next_moves_bishops(graphics_state, curr_piece){
                //check if white or black
                if (curr_piece[2] == 'w'){
                        //white
                        //loop in 4 directions - stop at edges or other pieces
                        //if piece is white, stop one before.  else include black piece

                        let stop = 0;
                        let startx = this.curr_x;
                        let startz = this.curr_z;

                        //+xz
                        let x = startx + 2;
                        for (let z = startz + 2; z < 6; z = z + 2){
                                //check if a piece has been reached
                                if (stop == 1){
                                        z = 6;
                                } else {
                                        //check if new position is valid
                                        if (this.valid_pos(x, z)){
                                                let pos = this.get_piece(x, z);
                                                if (pos == '_'){
                                                        //empty - light up box
                                                        this.light_box(graphics_state, x, z, "next");
                                                        this.clickable_moves.push([x, z]);
                                                } else if (pos[2] == 'b'){
                                                        //enemy piece - light up box and stop
                                                        stop = 1;
                                                        this.light_box(graphics_state, x, z, "next");
                                                        this.clickable_moves.push([x, z]);
                                                } else if (pos[2] == 'w'){
                                                        //friendly piece - don't light box and stop
                                                        stop = 1;
                                                }
                                        } else {
                                                //else stop
                                                stop = 1;
                                        }
                                        //increment x
                                        x = x + 2;
                                }
                        }


                        //-xz
                        stop = 0;
                        x = startx - 2;
                        for (let z = startz - 2; z > -12; z = z - 2){
                                //check if a piece has been reached
                                if (stop == 1){
                                        z = -12;
                                } else {
                                        //check if new position is valid
                                        if (this.valid_pos(x, z)){
                                                let pos = this.get_piece(x, z);
                                                if (pos == '_'){
                                                        //empty - light up box
                                                        this.light_box(graphics_state, x, z, "next");
                                                        this.clickable_moves.push([x, z]);
                                                } else if (pos[2] == 'b'){
                                                        //enemy piece - light up box and stop
                                                        stop = 1;
                                                        this.light_box(graphics_state, x, z, "next");
                                                        this.clickable_moves.push([x, z]);
                                                } else if (pos[2] == 'w'){
                                                        //friendly piece - don't light box and stop
                                                        stop = 1;
                                                }
                                        } else {
                                                //else stop
                                                stop = 1;
                                        }
                                        //increment x
                                        x = x - 2;
                                }
                        }

                        //+x-z
                        stop = 0;
                        let z = startz - 2;
                        for (x = startx + 2; x < 6; x = x + 2){
                                //check if a piece has been reached
                                if (stop == 1){
                                        x = 6;
                                } else {
                                        //check if new position is valid
                                        if (this.valid_pos(x, z)){
                                                let pos = this.get_piece(x, z);
                                                if (pos == '_'){
                                                        //empty - light up box
                                                        this.light_box(graphics_state, x, z, "next");
                                                        this.clickable_moves.push([x, z]);
                                                } else if (pos[2] == 'b'){
                                                        //enemy piece - light up box and stop
                                                        stop = 1;
                                                        this.light_box(graphics_state, x, z, "next");
                                                        this.clickable_moves.push([x, z]);
                                                } else if (pos[2] == 'w'){
                                                        //friendly piece - don't light box and stop
                                                        stop = 1;
                                                }
                                        } else {
                                                //else stop
                                                stop = 1;
                                        }
                                        //increment z
                                        z = z - 2;
                                }
                        }

                        //-x+z
                        stop = 0;
                        z = startz + 2;
                        for (x = startx - 2; x > -12; x = x - 2){
                                //check if a piece has been reached
                                if (stop == 1){
                                        x = -12;
                                } else {
                                        //check if new position is valid
                                        if (this.valid_pos(x, z)){
                                                let pos = this.get_piece(x, z);
                                                if (pos == '_'){
                                                        //empty - light up box
                                                        this.light_box(graphics_state, x, z, "next");
                                                        this.clickable_moves.push([x, z]);
                                                } else if (pos[2] == 'b'){
                                                        //enemy piece - light up box and stop
                                                        stop = 1;
                                                        this.light_box(graphics_state, x, z, "next");
                                                        this.clickable_moves.push([x, z]);
                                                } else if (pos[2] == 'w'){
                                                        //friendly piece - don't light box and stop
                                                        stop = 1;
                                                }
                                        } else {
                                                //else stop
                                                stop = 1;
                                        }
                                        //increment z
                                        z = z + 2;
                                }
                        }

                } else {
                        //black
                        //loop in 4 directions - stop at edges or other pieces
                        //if piece is white, stop one before.  else include black piece

                        let stop = 0;
                        let startx = this.curr_x;
                        let startz = this.curr_z;

                        //+xz
                        let x = startx + 2;
                        for (let z = startz + 2; z < 6; z = z + 2){
                                //check if a piece has been reached
                                if (stop == 1){
                                        z = 6;
                                } else {
                                        //check if new position is valid
                                        if (this.valid_pos(x, z)){
                                                let pos = this.get_piece(x, z);
                                                if (pos == '_'){
                                                        //empty - light up box
                                                        this.light_box(graphics_state, x, z, "next");
                                                        this.clickable_moves.push([x, z]);
                                                } else if (pos[2] == 'w'){
                                                        //enemy piece - light up box and stop
                                                        stop = 1;
                                                        this.light_box(graphics_state, x, z, "next");
                                                        this.clickable_moves.push([x, z]);
                                                } else if (pos[2] == 'b'){
                                                        //friendly piece - don't light box and stop
                                                        stop = 1;
                                                }
                                        } else {
                                                //else stop
                                                stop = 1;
                                        }
                                        //increment x
                                        x = x + 2;
                                }
                        }


                        //-xz
                        stop = 0;
                        x = startx - 2;
                        for (let z = startz - 2; z > -12; z = z - 2){
                                //check if a piece has been reached
                                if (stop == 1){
                                        z = -12;
                                } else {
                                        //check if new position is valid
                                        if (this.valid_pos(x, z)){
                                                let pos = this.get_piece(x, z);
                                                if (pos == '_'){
                                                        //empty - light up box
                                                        this.light_box(graphics_state, x, z, "next");
                                                        this.clickable_moves.push([x, z]);
                                                } else if (pos[2] == 'w'){
                                                        //enemy piece - light up box and stop
                                                        stop = 1;
                                                        this.light_box(graphics_state, x, z, "next");
                                                        this.clickable_moves.push([x, z]);
                                                } else if (pos[2] == 'b'){
                                                        //friendly piece - don't light box and stop
                                                        stop = 1;
                                                }
                                        } else {
                                                //else stop
                                                stop = 1;
                                        }
                                        //increment x
                                        x = x - 2;
                                }
                        }

                        //+x-z
                        stop = 0;
                        let z = startz - 2;
                        for (x = startx + 2; x < 6; x = x + 2){
                                //check if a piece has been reached
                                if (stop == 1){
                                        x = 6;
                                } else {
                                        //check if new position is valid
                                        if (this.valid_pos(x, z)){
                                                let pos = this.get_piece(x, z);
                                                if (pos == '_'){
                                                        //empty - light up box
                                                        this.light_box(graphics_state, x, z, "next");
                                                        this.clickable_moves.push([x, z]);
                                                } else if (pos[2] == 'w'){
                                                        //enemy piece - light up box and stop
                                                        stop = 1;
                                                        this.light_box(graphics_state, x, z, "next");
                                                        this.clickable_moves.push([x, z]);
                                                } else if (pos[2] == 'b'){
                                                        //friendly piece - don't light box and stop
                                                        stop = 1;
                                                }
                                        } else {
                                                //else stop
                                                stop = 1;
                                        }
                                        //increment z
                                        z = z - 2;
                                }
                        }

                        //-x+z
                        stop = 0;
                        z = startz + 2;
                        for (x = startx - 2; x > -12; x = x - 2){
                                //check if a piece has been reached
                                if (stop == 1){
                                        x = -12;
                                } else {
                                        //check if new position is valid
                                        if (this.valid_pos(x, z)){
                                                let pos = this.get_piece(x, z);
                                                if (pos == '_'){
                                                        //empty - light up box
                                                        this.light_box(graphics_state, x, z, "next");
                                                        this.clickable_moves.push([x, z]);
                                                } else if (pos[2] == 'w'){
                                                        //enemy piece - light up box and stop
                                                        stop = 1;
                                                        this.light_box(graphics_state, x, z, "next");
                                                        this.clickable_moves.push([x, z]);
                                                } else if (pos[2] == 'b'){
                                                        //friendly piece - don't light box and stop
                                                        stop = 1;
                                                }
                                        } else {
                                                //else stop
                                                stop = 1;
                                        }
                                        //increment z
                                        z = z + 2;
                                }
                        }



                }
        }

        next_moves_queens(graphics_state, curr_piece){
                //utilize bishop and rook next moves functions
                this.next_moves_rooks(graphics_state, curr_piece);
                this.next_moves_bishops(graphics_state, curr_piece);
        }

        next_moves_kings(graphics_state, curr_piece){
                //check if white or black
                if (curr_piece[2] == 'w'){
                        //white
                        let x = this.curr_x;
                        let z = this.curr_z;

                        //check all the pieces directly around the king
                        for (let i = -2; i < 4; i = i + 2){
                                for (let j = -2; j < 4; j = j + 2){
                                        if ((i != 0) || (j != 0)){
                                                if (this.valid_pos(x+i, z+j)){
                                                        //get the piece
                                                        let pos = this.get_piece(x+i, z+j);
                                                        //check if white, black, or empty
                                                        if (pos == '_'){
                                                                //empty - light up box
                                                                this.light_box(graphics_state, x+i, z+j, "next");
                                                                this.clickable_moves.push([x+i, z+j]);
                                                        } else if (pos[2] == 'b'){
                                                                //enemy piece - light up box and stop
                                                                this.light_box(graphics_state, x+i, z+j, "next");
                                                                this.clickable_moves.push([x+i, z+j]);
                                                        }
                                                }
                                        }
                                }
                        }
                } else {
                        //black
                        let x = this.curr_x;
                        let z = this.curr_z;

                        //check all the pieces directly around the king
                        for (let i = -2; i < 4; i = i + 2){
                                for (let j = -2; j < 4; j = j + 2){
                                        if ((i != 0) || (j != 0)){
                                                if (this.valid_pos(x+i, z+j)){
                                                        //get the piece
                                                        let pos = this.get_piece(x+i, z+j);
                                                        //check if white, black, or empty
                                                        if (pos == '_'){
                                                                //empty - light up box
                                                                this.light_box(graphics_state, x+i, z+j, "next");
                                                                this.clickable_moves.push([x+i, z+j]);
                                                        } else if (pos[2] == 'w'){
                                                                //enemy piece - light up box and stop
                                                                this.light_box(graphics_state, x+i, z+j, "next");
                                                                this.clickable_moves.push([x+i, z+j]);
                                                        }
                                                }
                                        }
                                }
                        }
                }
        }



        //tester function to try out wireframes
        // When a piece is clicked, it will call this and pass the location (on the grid) of the selected piece
        // Coord is an int between 0-63, signifying where on the board it is (0 = bottom left, 7 bottom right, 63 top right)
        next_moves(graphics_state){

            //light up current piece
            this.light_box(graphics_state, this.curr_x, this.curr_z, "curr");

            //check possible next moves of the current position only
            //console.log(this.curr_x, this.curr_z);
            let curr_piece = this.get_piece(this.curr_x, this.curr_z);
            
            if (curr_piece == '_'){
                    //empty space, no next moves
            } else if (curr_piece[0] == 'p'){
                    //pawn
                    this.next_moves_pawns(graphics_state, curr_piece);
            } else if (curr_piece[0] == 'r'){
                    //rook
                    this.next_moves_rooks(graphics_state, curr_piece);
            } else if (curr_piece[0] == 'k'){
                    //knight 
                    this.next_moves_knights(graphics_state, curr_piece);
            } else if (curr_piece[0] == 'b'){
                    //bishop
                    this.next_moves_bishops(graphics_state, curr_piece);
            } else if (curr_piece[0] == 'q'){
                    //queen
                    this.next_moves_queens(graphics_state, curr_piece);
            } else {
                    //king
                    this.next_moves_kings(graphics_state, curr_piece);
            }
        }

        //lights up wireframe of postential piece moves
        light_box(graphics_state, x, z, color){
            //get time
            const t = graphics_state.animation_time / 1000, dt = graphics_state.animation_delta_time / 1000;

            //get to right positions
            let y = 1.6;
            let model_transform = Mat4.identity().times(Mat4.translation([x,y,z]));

            //draw another inside
            let temp = model_transform.times(Mat4.scale(Vec.of( 0.875, 1.07, 0.875)));

            //draw another inside
            let temp2 = model_transform.times(Mat4.scale(Vec.of( 0.75, 1.15, 0.75)));

            if (color == "curr") {
                    //draw wireframe
                    this.shapes.wire.draw(graphics_state, model_transform, this.out_mat, "LINES");
                    this.shapes.wire.draw(graphics_state, temp, this.out_mat, "LINES");
                    //this.shapes.wire.draw(graphics_state, temp2, this.out_mat, "LINES");
            } else if (color == "next") {
                    //draw wireframe
                    this.shapes.nextwire.draw(graphics_state, model_transform, this.out_mat, "LINES");
                    this.shapes.nextwire.draw(graphics_state, temp, this.out_mat, "LINES");
                    //this.shapes.nextwire.draw(graphics_state, temp2, this.out_mat, "LINES");

                    //draw oscillating circle
                    let newMat = Mat4.identity().times(Mat4.translation([x,y,z]));
                    //oscillate radius and scale
                    let radius = 0.3 + 0.05 * Math.sin(.8 * Math.PI * t);
                    newMat = newMat.times(Mat4.translation([0, 1.15, 0]));
                    newMat = newMat.times(Mat4.scale([radius, 0.05, radius]));
                    //draw ball
                    this.shapes.box.draw(graphics_state, newMat, this.board.override({color: Color.of(111, 0, 0, 1)}))
                        
            }
        }


//------------------------------------------------------------------------------------------------------------
//DRAW CASTLE FUNCTIONS

        draw_castle(graphics_state){
            //draw a box with stone wall texture on it
                
            let model_transform = Mat4.identity().times(Mat4.translation([0,7,0]));

            //this.shapes.box.draw(graphics_state, model_transform, this.board);            


        }



//-------------------------------------------------------------------------------------------------------------
//DISPLAY FUNCTION

        display(graphics_state) {
           // const mouse_position = (e, rect = canvas.getBoundingClientRect()) =>
               // Vec.of(e.clientX - (rect.left + rect.right) / 2, e.clientY - (rect.bottom + rect.top) / 2);
            document.addEventListener("mousedown", e => {
                if(!this.mousedown) {
                    this.mousedown = true;
                    // No piece is selected yet
                    e.preventDefault();
                    let x = e.offsetX;
                    let y = e.offsetY;

                    // clickable looks like [[(x,y), w, h], ...]
                    for (let i = 0; i < this.clickable_areas.length; i++) {
                        // for each clickable area, check if mouse x and y is within x+width and y+height
                        //console.log(this.clickable_areas[i]);
                        let clickable_x = this.clickable_areas[i][0];
                        let clickable_y = this.clickable_areas[i][1];
                        let width = this.clickable_areas[i][2];
                        let height = this.clickable_areas[i][3];
                        if (x > clickable_x && x < clickable_x + width && y < clickable_y && y > clickable_y - height) {
                            // Get column, row
                            let cur_x = i % 8;
                            let cur_z = 7 - Math.floor(i / 8); 
                            
                            // No piece selected atm... pick one
                            if(this.clickstate == false) {
                                // translate to 3d space
                                this.curr_x = (cur_x * 2) - 10; // cur_x ranges from 0 to 7, curr_x is -10 to 4, left is -10
                                this.curr_z = (cur_z * 2) - 10;
                                console.log(this.curr_x, this.curr_z);
                                let curr_piece = this.get_piece(this.curr_x, this.curr_z);
                                // only select pieces
                                if (curr_piece != '_') {
                                    this.selected = true;
                                    this.clickstate = true;
                                }
                                break;
                            } else {
                                // We're in "move the piece mode", so look at clickable_moves NOT clickable_areas
                                // clickable moves = [[-10,-10], etc. ...] (in 3d coords)
                                var valid_move = false;
                                
                                this.clickable_moves = this.clickable_moves.sort().filter(function(item, pos, ary) {
                                    return !pos || item != ary[pos - 1];
                                });
                                //console.log("There are this many moves: " + this.clickable_moves.length);
                                for (let i = 0; i < this.clickable_moves.length; i++) {
                                    // Check if clicked tile is in the piece's line of sight
                                    if ((cur_x * 2) - 10 == this.clickable_moves[i][0] && (cur_z * 2) - 10 == this.clickable_moves[i][1]) {
                                        valid_move = true;
                                        //console.log("valid move!");
                                        //console.log(this.gameboard[cur_z][cur_x]);
                                        //console.log(cur_z,cur_x)
                                        //console.log(this.gameboard[this.curr_z][this.curr_x]);
                                        //console.log(this.curr_z, this.curr_x);
                                        var my_piece = this.get_piece(this.curr_x,this.curr_z);
                                        var my_color = this.get_color(this.curr_x,this.curr_z);
                                        console.log(my_color);
                                        console.log(this.blacks_move);
                                        console.log(this.whites_move);
                                        if((my_color == "B" && this.blacks_move ) || (my_color == "W" && this.whites_move)){
                                                console.log(my_piece);
                                                this.gameboard[cur_z][cur_x] = my_piece;
                                                console.log(this.gameboard[cur_z][cur_x]);
                                                this.display_state(graphics_state);
                                                this.edit_piece(this.curr_x, this.curr_z, '_');
                                                this.selected = false;
                                                this.blacks_move = !this.blacks_move;
                                                this.whites_move = !this.whites_move;
                                        }
                                    
                                        //console.log(this.gameboard[this.curr_x][this.curr_z]);
                                        //this.gameboard[cur_z][cur_x] = this.gameboard[this.curr_x][this.curr_z];
                                        //this.gameboard[this.curr_x][this.curr_z] = '_';
                                        break;
                                    }
                                }
                                if(!valid_move) {
                                    this.selected = false;
                                    this.clickstate = false;
                                }
                            }
                        }
                    }   
                }
            });

            document.addEventListener("mouseup", e => {
                this.mousedown = false;
            });

            graphics_state.lights = this.lights;        // Use the lights stored in this.lights.

            let model_transform = Mat4.identity();

            //create the scene

            this.draw_castle(graphics_state);

            // Draw chess board and set the camera
            
            this.draw_board(graphics_state, model_transform);
            
            this.handle_view(graphics_state);

            // Play the chess game
            
            if (this.playing) {
                //if playing, display the current state of this.gameboard
                this.display_state(graphics_state);
            } else {
                //else start from the beginning of the game and reset this.gameboard
                this.initialize_game(graphics_state);
            }

            if (this.selected){
                var my_color = this.get_color(this.curr_x, this.curr_z);
                if((my_color == "B" && this.blacks_move ) || (my_color == "W" && this.whites_move)){
                        this.next_moves(graphics_state);
                        this.display_state(graphics_state);
                }
            } else {
                // Clear the clickable_moves array, since no piece is selected
                this.clickable_moves = [];
                this.display_state(graphics_state);
            }

            //this.play_game(graphics_state);
        }
    };



//--------------------------------------------------------------------------------------------------------------------------------