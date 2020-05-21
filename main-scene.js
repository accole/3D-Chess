//--------------------------------------------------------------------------------------------------------------------------------
//CHESS PROJECT



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


            /*
            const pieces = {
                'pawn': new Pawn(),
                'rook': new Rook(),
                'bishop': new Bishop(),
                'knight': new Knight(),
                'queen': new Queen(),
                'king': new King()
            };
            */

            // Make some Material objects available to you:
            this.board = context.get_instance(Phong_Shader).material(Color.of(.9, .5, .9, 1), {
                ambient: .4,
                diffusivity: .4,
                specularity: 0.2
            });
            this.plastic = this.board.override({ambient: 1, specularity: .6});
            this.lights = [new Light(Vec.of(0, 5, 5, 1), Color.of(1, .4, 1, 1), 100000)];


            //define colors
            this.woodcolor = Color.of(0.85,0.556,0.35,1);
            this.whitecolor = Color.of(1,1,1,1);
            this.blackcolor = Color.of(0,0,0,1);

            //add boolean for which colors the board is
            this.wood = true;
            
            //variables for camera view
            this.topview = Vec.of(-2,36,-2);
            this.beginview = Vec.of(-2, 24.42, 22.69);
            //mirrored vectors must change since origin is offset
            this.top_mirrored = Vec.of(-4,36,-4);
            this.begin_mirrored = Vec.of(-3, 24.42, -26.69);
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
        draw_pawn(graphics_state, model_transform){



        }

        //draw rook
        draw_rook(graphics_state, model_transform){



        }


        //draw bishop
        draw_bishop(graphics_state, model_transform){



        }


        //draw knight
        draw_knight(graphics_state, model_transform){



        }


        //draw queen
        draw_queen(graphics_state, model_transform){



        }


        //draw king
        draw_king(graphics_state, model_transform){



        }


//-------------------------------------------------------------------------------------------------------------
//PLAYING GAME FUNCTIONS

        //sets up chess board with all pieces on both sides
        initialize_game(graphics_state){
            //filler until further developed
            let model_transform = Mat4.identity();
            model_transform = model_transform.times(Mat4.translation([-12, 6, -12]));
            this.shapes.ball.draw(graphics_state, model_transform, this.board.override({color: this.whitecolor}));
        }



//-------------------------------------------------------------------------------------------------------------
//DISPLAY FUNCTION

        display(graphics_state) {
            graphics_state.lights = this.lights;        // Use the lights stored in this.lights.

            let model_transform = Mat4.identity();

            // TODO:  Draw your entire scene here.  Use this.draw_box( graphics_state, model_transform ) to call your helper.
            
            this.draw_board(graphics_state, model_transform);
            
            this.handle_view(graphics_state);

            this.initialize_game(graphics_state);

            //this.play_game(graphics_state);
        }
    };



//--------------------------------------------------------------------------------------------------------------------------------