window.Assignment_Three_Scene = window.classes.Assignment_Three_Scene =
class Assignment_Three_Scene extends Scene_Component
  { constructor( context, control_box )     // The scene begins by requesting the camera, shapes, and materials it will need.
      { super(   context, control_box );    // First, include a secondary Scene that provides movement controls:
        if( !context.globals.has_controls   ) 
          context.register_scene_component( new Movement_Controls( context, control_box.parentElement.insertCell() ) ); 

        context.globals.graphics_state.camera_transform = Mat4.look_at( Vec.of( 0,10,20 ), Vec.of( 0,0,0 ), Vec.of( 0,1,0 ) );
        this.initial_camera_location = Mat4.inverse( context.globals.graphics_state.camera_transform );

        const r = context.width/context.height;
        context.globals.graphics_state.projection_transform = Mat4.perspective( Math.PI/4, r, .1, 1000 );

        const shapes = { torus:  new Torus( 15, 15 ),
                         torus2: new ( Torus.prototype.make_flat_shaded_version() )( 20, 20 ),
                         //add four spheres with varying subdivisions per the spec
                         //planet 1
                         sphere_1: new ( Subdivision_Sphere.prototype.make_flat_shaded_version())(2),
                         //planet 2
                         sphere_2: new Subdivision_Sphere(3),
                         //Sun, planet 3, and planet 4
                         sphere_34sun: new Subdivision_Sphere(4),
                         //planet 4 moon
                         sphere_5: new ( Subdivision_Sphere.prototype.make_flat_shaded_version())(1)
 
                                // TODO:  Fill in as many additional shape instances as needed in this key/value table.
                                //        (Requirement 1)
                       }
        this.submit_shapes( context, shapes );
                                     
                                     // Make some Material objects available to you:
        this.materials =
          { test:     context.get_instance( Phong_Shader ).material( Color.of( 1,1,0,1 ), { ambient:.2 } ),
            ring:     context.get_instance( Ring_Shader  ).material(),
            //sun, max ambient, color defaults orange
            sun:      context.get_instance( Phong_Shader ).material( Color.of( 1 ,0, 1 ,1 ), { ambient: 1 } ),
            //all planets ambient of 0
            //planet 1, color ice-gray, diffuse only
            planet1:  context.get_instance( Phong_Shader ).material( Color.of( 221/255, 238/255, 245/255, 1), {ambient: 0}, {diffusivity: 1}, {specularity: 0}, {smoothness: 0}),
            //planet 2, color swampy green-blue, max specular, low diffuse, default smooth shading.  (override if t == odd)
            planet2:  context.get_instance( Phong_Shader ).material( Color.of( 2/255, 50/255, 10/255, 1), {ambient: 0}, {diffusivity: .2}, {specularity: 1}),
            //planet 3, color muddy brown-orange, max diffuse and specular, 
            planet3:  context.get_instance( Phong_Shader ).material( Color.of( 231/255, 162/255, 93/255, 1), {ambient: 0}, {diffusivity: 1}, {specularity: 1}),
            //planet 4, color soft light blue, smooth phong, high specular
            planet4:  context.get_instance( Phong_Shader ).material( Color.of( 5/255, 50/255, 125/255, 1), {ambient: 0}, {specularity: 0.8}, {smoothness: 1}),
            //moon, any texture works, color dark green
            moon:     context.get_instance( Phong_Shader ).material( Color.of( 10/255, 30/255, 5/255, 1), {ambient: 0})

                                // TODO:  Fill in as many additional material objects as needed in this key/value table.
                                //        (Requirement 1)
          }

        this.lights = [ new Light( Vec.of( 5,-10,5,1 ), Color.of( 0, 1, 1, 1 ), 1000 ) ];
      }
    make_control_panel()            // Draw the scene's buttons, setup their actions and keyboard shortcuts, and monitor live measurements.
      { this.key_triggered_button( "View solar system",  [ "0" ], () => this.attached = () => this.initial_camera_location );
        this.new_line();
        this.key_triggered_button( "Attach to planet 1", [ "1" ], () => this.attached = () => this.planet_1 );
        this.key_triggered_button( "Attach to planet 2", [ "2" ], () => this.attached = () => this.planet_2 ); this.new_line();
        this.key_triggered_button( "Attach to planet 3", [ "3" ], () => this.attached = () => this.planet_3 );
        this.key_triggered_button( "Attach to planet 4", [ "4" ], () => this.attached = () => this.planet_4 ); this.new_line();
        this.key_triggered_button( "Attach to planet 5", [ "5" ], () => this.attached = () => this.planet_5 );
        this.key_triggered_button( "Attach to moon",     [ "m" ], () => this.attached = () => this.moon     );
      }
    draw_planets( graphics_state, t)
      {
        //create matrix to transform planets
        let model_transform = Mat4.identity();


        //Create and shape the sun
        //------------------------
        //get sun radius
        //5 second period, oscillates between size 1 and 3
        let rad_sun = 2 + Math.sin(.4 * Math.PI * t);
        model_transform = model_transform.times(Mat4.scale([rad_sun, rad_sun, rad_sun]));
        //create oscillating sun color
        //let color_sun = Color.of(.5 + .5 * Math.sin(.4 * Math.PI * t), 0, .5 -.5 * Math.sin(.4 * Math.PI * t), 1);
        let color_sun = Color.of((0.75 - .25*(2 - rad_sun)), //0.25,
                                 (0.10 + .10*(2 - rad_sun)),
                                 (0.65 + .35*(2 - rad_sun)), 1);
        //draw sun at origin
        this.shapes.sphere_34sun.draw(graphics_state, model_transform, this.materials.sun.override({color: color_sun}));
        //align scene lights to match sun color and size
        this.lights = [new Light(Vec.of(0,0,0,1), color_sun, 10**rad_sun)];
    



        //Create and shape planet1
        //------------------------
        //reset matrix
        model_transform = Mat4.identity();
        //make it orbit the sun radius 5 away from sun, at quickest orbit .9*t
        model_transform = model_transform.times( Mat4.translation([5 * Math.sin(.9 * t), 0, 5 * Math.cos(.9 * t)]));
        //draw the planet
        this.shapes.sphere_1.draw(graphics_state, model_transform, this.materials.planet1);
        //save matrix for camera placement
        this.planet_1 = model_transform;




        //Create and shape planet2
        //------------------------
        //reset matrix
        model_transform = Mat4.identity();
        //make it orbit the sun radius 8, slower orbit 
        model_transform = model_transform.times( Mat4.translation([8 * Math.sin(.6 * t), 0, 8 * Math.cos(.6 * t)]));
        //check if we need to override smoothness
        let curr = Math.floor(t%2);
        //dont override
        if (curr == 0)
          {
            //draw the planet
            this.shapes.sphere_2.draw(graphics_state, model_transform, this.materials.planet2);
          }
        //override
        else
          {
            //draw the planet
            this.shapes.sphere_2.draw(graphics_state, model_transform, this.materials.planet2.override({gourad: 1}));
          }
        //save matrix for camera placement
        this.planet_2 = model_transform;




        //Create and shape planet3
        //------------------------
        //reset matrix
        model_transform = Mat4.identity();
        //make it orbit the sun radius 11, slower orbit 
        model_transform = model_transform.times( Mat4.translation([11 * Math.sin(.45 * t), 0, 11 * Math.cos(.45 * t)]));
        //save matrix for camera placement - at planet center
        this.planet_3 = model_transform;
        //make the planet rotate on an x and y axis
        model_transform = model_transform.times( Mat4.rotation( 1, Vec.of(.2,.2,.2)))
                                       .times( Mat4.rotation( .4 * t, Vec.of(Math.sin(.2*t), Math.cos(.2*t), 0)));
        //draw the planet
        this.shapes.sphere_34sun.draw(graphics_state, model_transform, this.materials.planet3);
        //squash the torus2 into a ring
        model_transform = model_transform.times( Mat4.scale([0.8, 0.8, .01]));
        //add ring to the planet, give it same material
        this.shapes.torus2.draw(graphics_state, model_transform, this.materials.planet3);




        //Create and shape planet4
        //------------------------
        //reset matrix
        model_transform = Mat4.identity();
        //make it orbit the sun at radius 14, slower orbit
        model_transform = model_transform.times( Mat4.translation([14 * Math.sin(.3 * t), 0, 14 * Math.cos(.3 * t)]));
        //draw the planet4
        this.shapes.sphere_34sun.draw( graphics_state, model_transform, this.materials.planet4 );
        //save matrix for camera placement
        this.planet_4 = model_transform;




        //Create and shape moon around planet 4
        //---------------------
        //don't reset matrix because we want to keep it centered around planet4
        //update matrix to rotate around planet, radius 1.5
        model_transform = model_transform.times( Mat4.translation([2 * Math.sin(t), 0, 2 * Math.cos(t)]));
        //draw the moon
        this.shapes.sphere_5.draw(graphics_state, model_transform, this.materials.moon);
        //save matrix for camera placement
        this.moon = model_transform;


      }
    display( graphics_state )
      { graphics_state.lights = this.lights;        // Use the lights stored in this.lights.
        const t = graphics_state.animation_time / 1000, dt = graphics_state.animation_delta_time / 1000;
        
        //draw the solar system
        this.draw_planets(graphics_state, t);
        
        //handle camera angles (planet attachments)
        //if a button has been pushed
        if(this.attached) {
          //make a matrix "desired" that is 5 units away from the planet perspective
          var desired = Mat4.inverse(this.attached().times(Mat4.translation([0,0,5])));
          //invert the matrix
          desired = desired.map((x, i) => Vec.from( graphics_state.camera_transform[i]).mix(x, .1));
          //set equal to camera transformation
          graphics_state.camera_transform = desired;
        }


        // TODO:  Fill in matrix operations and drawing code to draw the solar system scene (Requirements 2 and 3)


        //this.shapes.torus2.draw( graphics_state, Mat4.identity(), this.materials.test );

      }
  }


//ASSIGNMENT FOUR DEPENDENCIES
//-------------------------------------------------------------------------------------------------------------------------------






//--------------------------------------------------------------------------------------------------------------------------------
//ASSIGNMENT ONE


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


window.Transforms_Sandbox = window.classes.Transforms_Sandbox =
    class Transforms_Sandbox extends Tutorial_Animation {
        display(graphics_state)
        // This subclass of some other Scene overrides the display() function.  By only
        // exposing that one function, which draws everything, this creates a very small code
        // sandbox for editing a simple scene, and for experimenting with matrix transforms.
        {
            let model_transform = Mat4.identity();
            // Variable model_transform will be a temporary matrix that helps us draw most shapes.
            // It starts over as the identity every single frame - coordinate axes at the origin.
            graphics_state.lights = this.lights;
            // Use the lights stored in this.lights.

            /**********************************
             Start coding down here!!!!
             // From here on down it's just some example shapes drawn for you -- freely replace them
             // with your own!  Notice the usage of the functions translation(), scale(), and rotation()
             // to generate matrices, and the functions times(), which generates products of matrices.
             **********************************/

            const blue = Color.of(0, 0, 1, 1), yellow = Color.of(1, 1, 0, 1);
            model_transform = model_transform.times(Mat4.translation([0, 3, 20]));
            this.shapes.box.draw(graphics_state, model_transform, this.plastic.override({color: yellow}));
            // Draw the top box.

            const t = this.t = graphics_state.animation_time / 1000;
            // Find how much time has passed in seconds, and use that to place shapes.

            model_transform = model_transform.times(Mat4.translation([0, -2, 0]));
            // Tweak our coordinate system downward for the next shape.

            this.shapes.ball.draw(graphics_state, model_transform, this.plastic.override({color: blue}));
            // Draw the ball.

            if (!this.hover)    //  The first line below won't execute if the button on the page has been toggled:
                model_transform = model_transform.times(Mat4.rotation(t, Vec.of(0, 1, 0)));
            // Spin our coordinate frame as a function of time.

            model_transform = model_transform.times(Mat4.rotation(1, Vec.of(0, 0, 1)))  // Rotate another axis by a constant value.
                .times(Mat4.scale([1, 2, 1]))      // Stretch the coordinate frame.
                .times(Mat4.translation([0, -1.5, 0]));     // Translate down enough for the two volumes to miss.
            this.shapes.box.draw(graphics_state, model_transform, this.plastic.override({color: yellow}));   // Draw the bottom box.
        }
    };


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

window.Cube_Single_Strip = window.classes.Cube_Single_Strip =
    class Cube_Single_Strip extends Shape {
        constructor() {
            super("positions", "normals");
            // TODO (Extra credit part I)
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
           
        }
    };

window.Assignment_Two_Scene = window.classes.Assignment_Two_Scene =
    class Assignment_Two_Scene extends Scene_Component {
        constructor(context, control_box) {
            // The scene begins by requesting the camera, shapes, and materials it will need.
            super(context, control_box);
            // First, include a secondary Scene that provides movement controls:
            if (!context.globals.has_controls)
                context.register_scene_component(new Movement_Controls(context, control_box.parentElement.insertCell()));

            const r = context.width / context.height;
            context.globals.graphics_state.camera_transform = Mat4.translation([5, -10, -30]);  // Locate the camera here (inverted matrix).
            context.globals.graphics_state.projection_transform = Mat4.perspective(Math.PI / 4, r, .1, 1000);

            const shapes = {
                'box': new Cube(),
                'strip': new Cube_Single_Strip(),
                'outline': new Cube_Outline()
            };
            // At the beginning of our program, load one of each of these shape
            // definitions onto the GPU.  NOTE:  Only do this ONCE per shape
            // design.  Once you've told the GPU what the design of a cube is,
            // it would be redundant to tell it again.  You should just re-use
            // the one called "box" more than once in display() to draw
            // multiple cubes.  Don't define more than one blueprint for the
            // same thing here.
            this.submit_shapes(context, shapes);

            // Make some Material objects available to you:
            this.clay = context.get_instance(Phong_Shader).material(Color.of(.9, .5, .9, 1), {
                ambient: .4,
                diffusivity: .4
            });
            this.white = context.get_instance(Basic_Shader).material();
            this.plastic = this.clay.override({specularity: .6});

            this.lights = [new Light(Vec.of(0, 5, 5, 1), Color.of(1, .4, 1, 1), 100000)];


            //define colors
            this.teal = Color.of(0, 0.5, 0.5, 1);
            this.emerald = Color.of(.314, .784, .471, 1);
            this.purple = Color.of(0.5, 0, 0.5, 1);
            this.ruby = Color.of(0.8, 0, 0.34, 1);
            this.gold = Color.of(1, 0.9, 0, 1);
            this.grey = Color.of(0.9, 0.9, 0.9, 3);
            //this.random1 = Color.of(0.24, 0.6, 0.3, 1);
            //this.random2 = Color.of(0.65, 0.9, 0.2, 1);
            //this.random3 = Color.of(0.4, 0.91, 0, 3);

            this.colors_temp = [this.teal, this.gold, this.purple, this.grey, this.ruby, this.emerald];
                                //this.random1, this.random2, this.random3];
            this.colors = [this.teal, this.gold, this.purple, this.grey, this.ruby, this.emerald];

            this.next_color = 0;
            this.set_colors();
            this.curr_angle = 0;

            //add toggle bits for buttons
            this.out = false;
            this.still = false;
        }

        set_colors() {
            // TODO:  Create a class member variable to store your cube's colors.
            //change colors every time the thing is selected
            this.next_color = this.next_color + 1;
            for (var j = 0; j < 6; j++){
                this.colors[j] = this.colors_temp[(this.next_color + j) % 6];
            }
        }

        make_control_panel()
        // Draw the scene's buttons, setup their actions and keyboard shortcuts, and monitor live measurements.
        {
            this.key_triggered_button("Change Colors", ["c"], this.set_colors);
            // Add a button for controlling the scene.
            this.key_triggered_button("Outline", ["o"], () => {
                // TODO:  Requirement 5b:  Set a flag here that will toggle your outline on and off
                this.out = !this.out;
            });
            this.key_triggered_button("Sit still", ["m"], () => {
                // TODO:  Requirement 3d:  Set a flag here that will toggle your swaying motion on and off.
                this.still = !this.still;
            });
        }

        draw_box(graphics_state, model_transform, i) {
            // TODO:  Helper function for requirement 3 (see hint).
            //        This should make changes to the model_transform matrix, draw the next box, and return the newest model_transform.
            let color = Color.of(0,1,0,1);
            if (i % 2 == 0) {
                color = Color.of(0,0,0,1);
            } else {
                color = Color.of(1,1,1,1);
            }
            
            this.shapes.box.draw(graphics_state, model_transform, this.plastic.override({color: color}));
            
            return model_transform;
        }

        draw_outline(graphics_state, model_transform){
            this.shapes.outline.draw(graphics_state, model_transform, this.white, "LINES");
        }

        //returns an angle forming a sinusodial function
        //returns 0 - 0.04*pi
        angle(t){
            var factor = 0.02*Math.PI;
            this.curr_angle = factor + factor*Math.sin((Math.PI*6)*t);
            return this.curr_angle;
        }

        display(graphics_state) {
            graphics_state.lights = this.lights;        // Use the lights stored in this.lights.

            let model_transform = Mat4.identity();

            // TODO:  Draw your entire scene here.  Use this.draw_box( graphics_state, model_transform ) to call your helper.

            // Start offset by 12 so board is kinda centered
            model_transform = model_transform.times(Mat4.translation([-10, 0, -10]));

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

        }
    };



//--------------------------------------------------------------------------------------------------------------------------------





// Extra credit begins here (See TODO comments below):

window.Ring_Shader = window.classes.Ring_Shader =
class Ring_Shader extends Shader              // Subclasses of Shader each store and manage a complete GPU program.
{ material() { return { shader: this } }      // Materials here are minimal, without any settings.
  map_attribute_name_to_buffer_name( name )       // The shader will pull single entries out of the vertex arrays, by their data fields'
    {                                             // names.  Map those names onto the arrays we'll pull them from.  This determines
                                                  // which kinds of Shapes this Shader is compatible with.  Thanks to this function, 
                                                  // Vertex buffers in the GPU can get their pointers matched up with pointers to 
                                                  // attribute names in the GPU.  Shapes and Shaders can still be compatible even
                                                  // if some vertex data feilds are unused. 
      return { object_space_pos: "positions" }[ name ];      // Use a simple lookup table.
    }
    // Define how to synchronize our JavaScript's variables to the GPU's:
  update_GPU( g_state, model_transform, material, gpu = this.g_addrs, gl = this.gl )
      { const proj_camera = g_state.projection_transform.times( g_state.camera_transform );
                                                                                        // Send our matrices to the shader programs:
        gl.uniformMatrix4fv( gpu.model_transform_loc,             false, Mat.flatten_2D_to_1D( model_transform.transposed() ) );
        gl.uniformMatrix4fv( gpu.projection_camera_transform_loc, false, Mat.flatten_2D_to_1D(     proj_camera.transposed() ) );
      }
  shared_glsl_code()            // ********* SHARED CODE, INCLUDED IN BOTH SHADERS *********
    { return `precision mediump float;
              varying vec4 position;
              varying vec4 center;
      `;
    }
  vertex_glsl_code()           // ********* VERTEX SHADER *********
    { return `
        attribute vec3 object_space_pos;
        uniform mat4 model_transform;
        uniform mat4 projection_camera_transform;

        void main()
        { 
        }`;           // TODO:  Complete the main function of the vertex shader (Extra Credit Part II).
    }
  fragment_glsl_code()           // ********* FRAGMENT SHADER *********
    { return `
        void main()
        { 
        }`;           // TODO:  Complete the main function of the fragment shader (Extra Credit Part II).
    }
}

window.Grid_Sphere = window.classes.Grid_Sphere =
class Grid_Sphere extends Shape           // With lattitude / longitude divisions; this means singularities are at 
  { constructor( rows, columns, texture_range )             // the mesh's top and bottom.  Subdivision_Sphere is a better alternative.
      { super( "positions", "normals", "texture_coords" );
        

                      // TODO:  Complete the specification of a sphere with lattitude and longitude lines
                      //        (Extra Credit Part III)
      } }