// CARTESIAN SYSTEM CREATOR v1.0 - SOLAR SYSTEM
// (C) 2017-10 JAKMAT

var CartesianCoords = {
	
	id: 0, // Unique ID for astronomical objects
	name : '', // Name of astronomical objects
	coordX : null, // CoordX of topleftmost angle of astronomical object 	
	coordY : null, // CoordY of topleftmost angle of astronomical object
	midX : null, // CoordX of midpoint of astronomical object
	midY : null, // CoordX of midpoint of astronomical object
	width : null, // Width of astronomical object
	height : null, // Height of astronomical object
	color : '', // Color of astronomical object
	astroObjects : [], // Array for astronomical objects
	orbit : 0, // Unique ID for orbit trail markers
	index : 30, // Index of scale
	density : 0.01, // Index of orbit trail markers density
	thickness : 1, // Index of orbit trail markers thickness
			
	// Generates random color
	generateRandomColor : function() {
		var hex = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'A', 'B', 'C', 'D', 'E', 'F'];
		var rgb = '#';
		for (i=0; i<6; i++) {
			var random = (Math.floor((Math.random() * 16) + 1))-1;
			rgb += hex[random];
		}
		return rgb;	
	},
	
	// Fills document.body with a gray background color
	fillBodyWithColor : function(color) {
		if (color != undefined) {
			document.body.style.backgroundColor = color;
		} else {
			document.body.style.backgroundColor = this.generateRandomColor();
		}
		document.body.style.margin = '0';
		document.body.style.color = 'white';
	},

	// Astronomical object constructor
	newAstroObject : function(name, au, sizeX, sizeY, color, coordX, coordY) {
		this.name = name;		
		this.au = au;
		this.midX = coordX + (sizeX/4);
		this.midY = coordY + (sizeY/4);
		this.sizeX = sizeX;
		this.sizeY = sizeY;
		this.color = color;
		CartesianCoords.id++;	
		this.id = CartesianCoords.id;	
		var tempArr = [];
		var r = this.au * CartesianCoords.index;
		if ((coordX === (undefined)) || (coordY === (undefined))) {
			for (i=0; i<(2*Math.PI); i+=0.1) {
				var midX = Sun.midX;
				var midY = Sun.midY;
				var x = ((r * Math.cos(i)) + midX);
				var y = ((r * Math.sin(i)) + midY);
				var xy = {
					orbitX : x,
					orbitY : y
				};				
				tempArr.push(xy);				
			}
			var random = (Math.floor((Math.random() * tempArr.length) + 1))-1;
			x = tempArr[random].orbitX;
			y = tempArr[random].orbitY;
			delete tempArr;			
			this.coordX = (x - (this.sizeX/4));
			this.coordY = (y - (this.sizeY/4));			
		} else {
			this.coordX = coordX;
			this.coordY = coordY;
		}		
	},

	// Adds the astronomical object to spheres
	addToSpheres : function(astroObject, parentSpace) {
		if (parentSpace === undefined) {
			parentSpace = document.body;
		}
		var newObject = document.createElement('div');	
		newObject.id = 'obj' + astroObject.id;		
		newObject.style.backgroundColor = astroObject.color;
		newObject.style.left = astroObject.coordX-(astroObject.sizeX/4) + 'px';
		newObject.style.top = astroObject.coordY-(astroObject.sizeX/4) + 'px';
		newObject.style.width = astroObject.sizeX + 'px';
		newObject.style.height = astroObject.sizeY + 'px';
		newObject.style.borderRadius = (astroObject.sizeX/2) + 'px';
		newObject.style.cssFloat = 'left';
		newObject.style.position = 'absolute';		
		parentSpace.appendChild(newObject);
		console.log('Added ' + astroObject.name + ' to spheres:');
		console.log('X = ' + newObject.style.left);
		console.log('Y = ' + newObject.style.top);
		console.log('---------------------------');
	},

	// Draws orbit marks with given density and thickness
	drawOrbit : function(Sun, Planet, density, thickness) {	
		var midX = Sun.midX;
		var midY = Sun.midY;
		if (density === undefined) {
			density = CartesianCoords.density;
		}
		if (thickness === undefined) {
			thickness = CartesianCoords.thickness;
		}
		var r = Planet.au * CartesianCoords.index;		
		for (i=0; i<(2*Math.PI); i+=density) {
			var x = r*Math.cos(i) + midX;
			var y = r*Math.sin(i) + midY;
			CartesianCoords.orbit++;			
			orbitId = CartesianCoords.orbit;	
			var newOrbit = document.createElement('div');	
			newOrbit.id = 'orbit' + orbitId;	
			newOrbit.style.width = thickness + 'px';
			newOrbit.style.height = thickness + 'px';
			newOrbit.style.left = (x - (thickness/2)) + 'px';
			newOrbit.style.top = (y - (thickness/2)) + 'px';
			newOrbit.style.borderRadius = '1px';
			newOrbit.style.backgroundColor = '#F0F0F0';
			newOrbit.style.position = 'absolute';
			Universe.space.appendChild(newOrbit);
		}
	}
}

console.clear();
// Create virtual cosmos
var Universe = Object.create(CartesianCoords);
Universe.space = document.body;
var SolarSystem = Object.create(Universe);
var Planet = Object.create(SolarSystem);
var Star = Object.create(SolarSystem);
SolarSystem.fillBodyWithColor('black');
SolarSystem.astroObjects = [];

// Create Sun and planets
var Sun = Object.create(Star);
Sun.newAstroObject('Sun',0,8,8,'yellow',700,300);
SolarSystem.astroObjects.push(Sun);

var Mercury = Object.create(Planet);
Mercury.newAstroObject('Mercury',0.39,2,2,'white');
SolarSystem.astroObjects.push(Mercury);

var Venus = Object.create(Planet);
Venus.newAstroObject('Venus',0.72,6,6,'yellow');
SolarSystem.astroObjects.push(Venus);

var Earth = Object.create(Planet);
Earth.newAstroObject('Earth',1,6,6,'lightblue');
SolarSystem.astroObjects.push(Earth);

var Mars = Object.create(Planet);
Mars.newAstroObject('Mars',1.52,4,4,'red');
SolarSystem.astroObjects.push(Mars);

var Jupiter = Object.create(Planet);
Jupiter.newAstroObject('Jupiter',15,15,'yellow');
SolarSystem.astroObjects.push(Jupiter);

var Saturn = Object.create(Planet);
Saturn.newAstroObject('Saturn',9.58,14,14,'orange');
SolarSystem.astroObjects.push(Saturn);

var Uranus = Object.create(Planet);
Uranus.newAstroObject('Uranus',19.23,10,10,'green');
SolarSystem.astroObjects.push(Uranus);

var Neptune = Object.create(Planet);
Neptune.newAstroObject('Neptune',30.10,10,10,'blue');
SolarSystem.astroObjects.push(Neptune);

// Add Sun and planets
for (i=0; i<SolarSystem.astroObjects.length; i++) {
	CartesianCoords.addToSpheres(SolarSystem.astroObjects[i]);
}

// Draw orbits
CartesianCoords.drawOrbit(Sun, Mercury);
CartesianCoords.drawOrbit(Sun, Venus);
CartesianCoords.drawOrbit(Sun, Earth);
CartesianCoords.drawOrbit(Sun, Mars);
CartesianCoords.drawOrbit(Sun, Jupiter);
CartesianCoords.drawOrbit(Sun, Saturn);
CartesianCoords.drawOrbit(Sun, Uranus);
CartesianCoords.drawOrbit(Sun, Neptune);

// Reloads page onclick
function refresh() {
	location.reload();
}