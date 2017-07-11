function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

class spaceShip {
	constructor(hull,firepower,accuracy) {
		this.hull = hull
		this.firepower = firepower
		this.accuracy = accuracy
	}
	attack() {
		if(Math.random() < this.accuracy) {
			return true;
		}
		else {
			return false;
		}
	}
	repair() {
		if(this.repairKits > 0) {
			this.repairKits--
			this.hull+=6
			console.log("%c You've repaired six hull points!", "font-size: 20px; color:purple")
		}
		else {
			console.log("%c No Repair Kits", "color:red")
		}
	}
}

class alienFactory {
	constructor(race) {
		this.race = race
		this.ships = []
	}
	generateShip(){
		if(this.race === "Romulan") {
			this.accuracy = getRandomArbitrary(.7,.9)
			this.firepower = getRandomInt(2,4)
			this.hull = getRandomInt(3,7)
			const newShip = new spaceShip(this.hull, this.firepower,this.accuracy);
			this.ships.push(newShip);
			return newShip;
		}
		else if(this.race === "Klingon") {
			this.accuracy = getRandomArbitrary(.4,.6)
			this.firepower = getRandomInt(3,5)
			this.hull = getRandomInt(6,9)
			const newShip = new spaceShip(this.hull, this.firepower,this.accuracy);
			this.ships.push(newShip);
			return newShip;
		}
	}
}


const player = new spaceShip(20,5,.7)
player.repairKits = 0;
let aliens = null
let species = ""
const start = (race) => {
	species = race;
	const Factory = new alienFactory(race)
	for(i=0; i<8; i++) {
		Factory.generateShip()
	}
	aliens = Factory.ships
	console.log("%c SPACEBATTLE", "font-size:40px; color:purple; font-weight:bold; text-align: center")
	nextTurn()
}

const nextTurn = () => {
	if (aliens.length === 0) {
		console.log("%c You win!", "font-size:40px; color: green")
		window.location.replace("win.html")
		return
	}
	let nextShip = aliens.shift()
	console.log("You:", player)
	console.log(species + ":", nextShip)
	let move = prompt("Would you like to attack or retreat?", "Attack | Repair | Retreat")
	while(move !== "Attack" && move !== "Repair" && move !== "Retreat" && move != null) {
		move = prompt("Try again!", "Attack | Repair | Retreat")
	}
	console.log(move)
	while(move==="Repair") {
		player.repair()	
		move = prompt("Now what?", "Attack | Repair | Retreat")
	}
	while(move !== "Attack" && move !== "Repair" && move !== "Retreat" && move != null) {
		move = prompt("Try again!", "Attack | Repair | Retreat")
	}
	if(move==="Attack") {
		while(player.hull > 0 && nextShip.hull > 0) {
			if(player.attack()) {
				nextShip.hull-=player.firepower
				console.log("%c Player hits!",'color: green')
			}
			else {
				console.log("%c Player misses!", 'color: red')
			}
			if(nextShip.hull > 0) {
				if(nextShip.attack()) {
					player.hull-=nextShip.firepower
					console.log("%c Alien hits!", 'color: red')
				}
				else {
					console.log("%c Alien misses!", 'color: green')
				}
			}
			if(player.hull <=0) {
				console.log("%c You lose", "font-size:40px; color: red")
				window.location.replace("lose.html")
				return
			}

		}
		console.log("%c The Alien Ship is Destroyed!", "font-size: 20px; color:green")
		if(Math.random()<.3) {
			player.repairKits++
			console.log("%c You found a repair kit!", "font-size: 20px; color:green")
		}
		nextTurn()
	}
	else {
		console.log("%c You lose!", "font-size:40px; color: red")
		window.location.replace("lose.html")
		return
	}
}