class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    preload(){
        //load img/title sprite
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
    }

    create(){
        //place title sprite
        this.starfield = this.add.titleSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        console.log(this);

        //white rectangle borders
        this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);


        //green UI background
        this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0, 0);

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width / 2, 435, 'rocket').setScale(0.5, 0.5).setOrigin(0, 0);

        //add spaceship(x3)
        this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width , 260, 'spaceship', 0, 10).setOrigin(0, 0);
        //define keyboard keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }

    update(){
        //scroll starfield
        this.starfield.tilePositionX -= 4;

        //update Rocket
        this.p1Rocket.update();

        //update spaceship
        this.ship01.update();
        this.ship02.update();
        this.ship03.update();

        //check rocket-ship collision per frame
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            console.log("ship 01 has been eliminated");
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            console.log("ship 02 has been eliminated");
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            console.log("ship 03 has been eliminated");
        }
    }

    //update rocket-ship collision
    checkCollision(rocket, ship) {
        //simple AABB checking
        if(rocket.x < ship.x + ship.width &&
           rocket.x + rocket.width > ship.x &&
           rocket.y < ship.y + ship.height &&
           rocket.height + rocket.y > ship.y){
            return true;
        }
        else{
            return false;
        }
                
    }
}