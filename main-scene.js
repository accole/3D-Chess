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
                'cube_wire': new Cube_Outline()
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

            this.curr_x = this.rook2_x;
            this.curr_z = this.black_pawn_z;
            

            //chess game - initialize to empty board
            this.gameboard = [['_', '_', '_', '_', '_', '_', '_', '_'],
                              ['_', '_', '_', '_', '_', '_', '_', '_'],
                              ['_', '_', '_', '_', '_', '_', '_', '_'],
                              ['_', '_', '_', '_', '_', '_', '_', '_'],
                              ['_', '_', '_', '_', '_', '_', '_', '_'],
                              ['_', '_', '_', '_', '_', '_', '_', '_'],
                              ['_', '_', '_', '_', '_', '_', '_', '_'],
                              ['_', '_', '_', '_', '_', '_', '_', '_']];
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
            this.key_triggered_button("Reset Game", ["g"], this.initialize_game);
            this.key_triggered_button("Select Piece", ["s"], this.getkeys);
        }


        getkeys()
        {
            //sense for key pushes and update current piece

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

            for(let i = 0; i < 8; i++) {
                for (let j=0; j < 8; j++) {
                    // Scale down by half
                    model_transform = model_transform.times(Mat4.scale(Vec.of( 1, 0.5, 1 )))
                    // Draw
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
            //draw edges
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

            if (side == "white"){
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

            if (side == "white"){
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


            if (side == "white"){
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

                if (side == "white"){
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

            if (side == "white"){
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

        //sets up chess board with all pieces on both sides
        initialize_game(graphics_state){

            //define position constants
            let y = 3;

            //z "rows" of teams
            let black_pawn_z = 2;
            let black_z = 4;
            let white_pawn_z = -8;
            let white_z = -10;

            //x positions of all the pieces
            let rook_x = -10;    let rook2_x = 4;
            let knight_x = -8;  let knight2_x = 2;
            let bish_x = -6;    let bish2_x = 0;
            let queen_x = -4;
            let king_x = -2;

            //initialize game board
            this.gameboard = [['r-w', 'k-w', 'b-w', 'q-w', 'k-w', 'b-w', 'k-w', 'r-w'],
                              ['p-w', 'p-w', 'p-w', 'p-w', 'p-w', 'p-w', 'p-w', 'p-w'],
                              [  '_',   '_',   '_',   '_',   '_',   '_',   '_',   '_'],
                              [  '_',   '_',   '_',   '_',   '_',   '_',   '_',   '_'],
                              [  '_',   '_',   '_',   '_',   '_',   '_',   '_',   '_'],
                              [  '_',   '_',   '_',   '_',   '_',   '_',   '_',   '_'],
                              ['p-b', 'p-b', 'p-b', 'p-b', 'p-b', 'p-b', 'p-b', 'p-b'],
                              ['r-b', 'k-b', 'b-b', 'q-b', 'k-b', 'b-b', 'k-b', 'r-b']];


                                    //PAWNS
            //initialize black pawns
            let pawn_pos = Mat4.identity().times(Mat4.translation([-10,y,black_pawn_z]));
            for (let i = 0; i < 8; i++){
                this.draw_pawn(graphics_state, pawn_pos, "black");
                pawn_pos = pawn_pos.times(Mat4.translation([2,0,0]));
            }

            //initialize white pawns
            pawn_pos = Mat4.identity().times(Mat4.translation([-10,y,white_pawn_z]));
            for (let i = 0; i < 8; i++){
                this.draw_pawn(graphics_state, pawn_pos, "white");
                pawn_pos = pawn_pos.times(Mat4.translation([2,0,0]));
            }

                                    //ROOKS
            //initialize black rooks
            let rook_pos = Mat4.identity().times(Mat4.translation([rook_x,y,black_z]));
            this.draw_rook(graphics_state, rook_pos, "black");
            rook_pos = Mat4.identity().times(Mat4.translation([rook2_x,y,black_z]));
            this.draw_rook(graphics_state, rook_pos, "black");

            //initialize white rooks
            rook_pos = Mat4.identity().times(Mat4.translation([rook_x,y,white_z]));
            this.draw_rook(graphics_state, rook_pos, "white");
            rook_pos = Mat4.identity().times(Mat4.translation([rook2_x,y,white_z]));
            this.draw_rook(graphics_state, rook_pos, "white");


                                    //KNIGHTS
            //initialize black knights
            let knight_pos = Mat4.identity().times(Mat4.translation([knight_x,y,black_z]));
            this.draw_knight(graphics_state, knight_pos, "black");
            knight_pos = Mat4.identity().times(Mat4.translation([knight2_x,y,black_z]));
            this.draw_knight(graphics_state, knight_pos, "black");

            //initialize white knights
            knight_pos = Mat4.identity().times(Mat4.translation([knight_x,y,white_z]));
            this.draw_knight(graphics_state, knight_pos, "white");
            knight_pos = Mat4.identity().times(Mat4.translation([knight2_x,y,white_z]));
            this.draw_knight(graphics_state, knight_pos, "white");


                                    //BISHOPS
            //initialize black bishops
            let bish_pos = Mat4.identity().times(Mat4.translation([bish_x,y,black_z]));
            this.draw_bishop(graphics_state, bish_pos, "black");
            bish_pos = Mat4.identity().times(Mat4.translation([bish2_x,y,black_z]));
            this.draw_bishop(graphics_state, bish_pos, "black");

            //initialize white bishops
            bish_pos = Mat4.identity().times(Mat4.translation([bish_x,y,white_z]));
            this.draw_bishop(graphics_state, bish_pos, "white");
            bish_pos = Mat4.identity().times(Mat4.translation([bish2_x,y,white_z]));
            this.draw_bishop(graphics_state, bish_pos, "white");


                                    //QUEENS
            //initialize black queen
            let queen_pos = Mat4.identity().times(Mat4.translation([queen_x,y,black_z]));
            this.draw_queen(graphics_state, queen_pos, "black");

            //initialize white queen
            queen_pos = Mat4.identity().times(Mat4.translation([queen_x,y,white_z]));
            this.draw_queen(graphics_state, queen_pos, "white");


                                    //KINGS
            //initialize black king
            let king_pos = Mat4.identity().times(Mat4.translation([king_x,y,black_z]));
            this.draw_king(graphics_state, king_pos, "black");

            //initialize white king
            king_pos = Mat4.identity().times(Mat4.translation([king_x,y,white_z]));
            this.draw_king(graphics_state, king_pos, "white");
            
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
                if ((x >= -10) && (x <= 4)){
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
                //check if white or black
                    if (curr_piece[2] == 'w'){
                        //white - check pieces_z + 1
                        if (this.curr_z != 4) {
                            //check locs right in front of pawn
                            let next1 = this.get_piece(this.curr_x, this.curr_z + 2);
                            if (next1 == '_'){
                                    //empty
                                    this.light_box(graphics_state, this.curr_x, this.curr_z + 2, "next");
                                    //check the next space
                                    if (this.curr_z != 2) {
                                        let next2 = this.get_piece(this.curr_x, this.curr_z + 4);
                                        if (next2 == '_') {
                                                //empty
                                                this.light_box(graphics_state, this.curr_x, this.curr_z + 4, "next");
                                        }
                                    }
                            }
                            //check locs diagonal of pawn for enemy pieces
                            if (this.curr_x != 4){
                                let diag1 = this.get_piece(this.curr_x + 2, this.curr_z + 2);
                                if (diag1[2] == 'b') {
                                         //enemy
                                         this.light_box(graphics_state, this.curr_x + 2, this.curr_z + 2, "next");
                                 }
                            }
                            if (this.curr_x != -10){
                                let diag2 = this.get_piece(this.curr_x - 2, this.curr_z + 2);
                                if (diag2[2] == 'b') {
                                         //enemy
                                         this.light_box(graphics_state, this.curr_x - 2, this.curr_z + 2, "next");
                                 }
                            }

                        }
                    } else {
                        //black - check pieces_z - 1
                        if (this.curr_z != -10) {
                            //check locs right in front of pawn
                            let next1 = this.get_piece(this.curr_x, this.curr_z - 2);
                            if (next1 == '_'){
                                    //empty
                                    this.light_box(graphics_state, this.curr_x, this.curr_z - 2, "next");
                                    //check the next space
                                    if (this.curr_z != -8) {
                                        let next2 = this.get_piece(this.curr_x, this.curr_z - 4);
                                        if (next2 == '_') {
                                                //empty
                                                this.light_box(graphics_state, this.curr_x, this.curr_z - 4, "next");
                                        }
                                    }
                            }
                            //check locs diagonal of pawn for enemy pieces
                            if (this.curr_x != 4){
                                let diag1 = this.get_piece(this.curr_x + 2, this.curr_z - 2);
                                if (diag1[2] == 'w') {
                                         //enemy
                                         this.light_box(graphics_state, this.curr_x + 2, this.curr_z - 2, "next");
                                 }
                            }
                            if (this.curr_x != -10){
                                let diag2 = this.get_piece(this.curr_x - 2, this.curr_z - 2);
                                if (diag2[2] == 'w') {
                                         //enemy
                                         this.light_box(graphics_state, this.curr_x - 2, this.curr_z - 2, "next");
                                 }
                            }

                        }

                    }
        }


        next_moves_rooks(graphics_state, curr_piece){
                //check if white or black
                if (curr_piece[2] == 'w'){
                        //white
                } else {
                        //black
                }
        }


        next_moves_knights(graphics_state, curr_piece){
                //check if white or black
                if (curr_piece[2] == 'w'){
                        //white
                } else {
                        //black
                }
        }        

        next_moves_bishops(graphics_state, curr_piece){
                //check if white or black
                if (curr_piece[2] == 'w'){
                        //white
                } else {
                        //black
                }
        }

        next_moves_queens(graphics_state, curr_piece){
                //check if white or black
                if (curr_piece[2] == 'w'){
                        //white
                } else {
                        //black
                }
        }

        next_moves_kings(graphics_state, curr_piece){
                //check if white or black
                if (curr_piece[2] == 'w'){
                        //white
                } else {
                        //black
                }
        }

        //tester function to try out wireframes
        next_moves(graphics_state){

            //light up current piece
            this.light_box(graphics_state, this.curr_x, this.curr_z, "curr");

            //check possible next moves of the current position only
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
            } else if (curr_piece[0] == 'k'){
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

            graphics_state.lights = this.lights;        // Use the lights stored in this.lights.

            let model_transform = Mat4.identity();

            //create the scene

            this.draw_castle(graphics_state);

            // Draw chess board and set the camera
            
            this.draw_board(graphics_state, model_transform);
            
            this.handle_view(graphics_state);

            // Play the chess game

            //if (!this.playing) {
            this.initialize_game(graphics_state);
            //}

            this.next_moves(graphics_state);

            //this.play_game(graphics_state);
        }
    };



//--------------------------------------------------------------------------------------------------------------------------------