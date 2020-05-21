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
                [-1, -1, -1], [1, -1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, -1], [-1, 1, -1], [1, 1, 1], [-1, 1, 1],
                [-1, -1, -1], [-1, -1, 1], [-1, 1, -1], [-1, 1, 1], [1, -1, 1], [1, -1, -1], [1, 1, 1], [1, 1, -1],
                [-1, -1, 1], [1, -1, 1], [-1, 1, 1], [1, 1, 1], [1, -1, -1], [-1, -1, -1], [1, 1, -1], [-1, 1, -1]));
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
                'ball': new Subdivision_Sphere(4)
            };
            this.submit_shapes(context, shapes);

            // Make some Material objects available to you:
            this.board = context.get_instance(Phong_Shader).material(Color.of(.9, .5, .9, 1), {
                ambient: .4,
                diffusivity: .4,
                specularity: 0.2
            });
            this.plastic = this.board.override({ambient: 1, specularity: .6});
            this.lights = [new Light(Vec.of(0, 5, 5, 1), Color.of(1, .4, 1, 1), 100000)];


            //define colors
            //board colors
            this.woodcolor = Color.of(0.85,0.556,0.35,1);
            this.whitecolor = Color.of(1,1,1,1);
            this.blackcolor = Color.of(0,0,0,1);
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
            this.key_triggered_button("Rotate", ["r"], () => {
                 this.rotate = !this.rotate;
            });
            this.key_triggered_button("Reset Game", ["g"], this.initialize_game);
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
                } else {
                    color = this.woodcolor;
                }
            } else {
                if (i % 2 == 0) {
                    color = this.blackcolor;
                } else {
                    color = this.whitecolor;
                }
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



        }


        //draw bishop
        draw_bishop(graphics_state, model_transform, side){



        }


        //draw knight
        draw_knight(graphics_state, model_transform, side){



        }


        //draw queen
        draw_queen(graphics_state, model_transform, side){



        }


        //draw king
        draw_king(graphics_state, model_transform, side){



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



//-------------------------------------------------------------------------------------------------------------
//DISPLAY FUNCTION

        display(graphics_state) {

            graphics_state.lights = this.lights;        // Use the lights stored in this.lights.

            let model_transform = Mat4.identity();

            // Draw chess board and set the camera
            
            this.draw_board(graphics_state, model_transform);
            
            this.handle_view(graphics_state);

            // Play the chess game

            this.initialize_game(graphics_state);

            //this.play_game(graphics_state);
        }
    };



//--------------------------------------------------------------------------------------------------------------------------------