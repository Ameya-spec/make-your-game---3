
const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Render= Matter.Render
const MouseConstraint= Matter.MouseConstraint
const Mouse = Matter.Mouse
const Composites = Matter.Composites
const Body = Matter.Body
const Common = Matter.Common
const Vector = Matter.Vector

function preload()
{
	
}

function setup() {
	createCanvas(0,0);
	engine = Engine.create();
	world = engine.world;
	render = Render.create({
	  element: document.body,
	  engine: engine,
	options: {
		  width: 500,
		  height: 600,
		  pixelRatio: 1,
		  background: "#ffff80",
		  wireframeBackground: 'black',
		  hasBounds: false,
		  
		  enabled: true,
		  wireframes:false,
		  showSleeping: false,
		  showDebug: false,
		  showBroadphase: false,
		  showBounds: true,
		  showVelocity: true,
		  showCollisions: false,
		  showSeparations: false,
		  showAxes: false,
		  showPositions: false,
		  showAngleIndicator: false,
		  showIds: false,
		  showShadows: false,
		  showVertexNumbers: false,
		  showConvexHulls: false,
		  showInternalEdges: false,
		  showMousePosition: false
	  }});
	  Render.run(render);
	  Engine.run(engine);

	  var group = Body.nextGroup(true);
	  var stack = Composites.stack(250,255,1,6,0,0,function(x,y){
	return Bodies.rectangle(x,y,30,30)
	  })
	 var catapult = Bodies.rectangle(400,520,320,20,{collisionFilter:{group:group}}) ;

	 World.add(world, [
        stack,
        catapult,
        Bodies.rectangle(400, 600, 800, 50.5, { isStatic: true, render: { fillStyle: '#060a19' } }),
        Bodies.rectangle(250, 555, 20, 50, { isStatic: true, render: { fillStyle: '#060a19' } }),
        Bodies.rectangle(400, 535, 20, 80, { isStatic: true, collisionFilter: { group: group }, render: { fillStyle: '#060a19' } }),
        Bodies.circle(560, 100, 50, { density: 0.005 }),
        Constraint.create({ 
            bodyA: catapult, 
            pointB: Vector.clone(catapult.position),
            stiffness: 1,
            length: 0
        })
    ]);
	var mouse = Mouse.create(render.canvas),
	mouseConstraint = MouseConstraint.create(engine,{
	mouse:mouse,
	constraint:{
	stiffness:0.2,
	render:{
	visible:false
	}
	}
	})

	World.add(world,mouseConstraint);

	render.mouse = mouse
	Render.lookAt(render,{
		min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
	})
	return {
        engine: engine,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
          
        }
    };
};

 

function draw() {

}



