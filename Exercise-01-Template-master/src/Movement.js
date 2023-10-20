class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene');
    }

    preload() {
        this.load.spritesheet('character', './assets/spritesheets/Character_002.png', {
            frameWidth: 48
        });
    }

    create() {
        this.cameras.main.setBackgroundColor(0x000000);
        this.player = this.physics.add.sprite(width / 2, height / 2, 'character', 1).setScale(2);
        this.player.body.setCollideWorldBounds(true);
        this.player.body.setSize(32,32).setOffset(8,16);
        this.PLAYER_VELOCITY = 350;

        cursors = this.input.keyboard.createCursorKeys();
        this.anims.create({
            key: "idle-down",
            framerate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 1,
                end: 1
            })
        });
        this.anims.create({
            key: "idle-up",
            framerate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 10,
                end: 10
            })
        });
        this.anims.create({
            key: "idle-left",
            framerate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 4,
                end: 4
            })
        });
        this.anims.create({
            key: "idle-right",
            framerate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 7,
                end: 7
            })
        });

        this.anims.create({
            key: "walk-down",
            framerate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 0,
                end: 2
            })
        });
        this.anims.create({
            key: "walk-up",
            framerate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 9,
                end: 11
            })
        });
        this.anims.create({
            key: "walk-left",
            framerate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 3,
                end: 5
            })
        });
        this.anims.create({
            key: "walk-right",
            framerate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 6,
                end: 8
            })
        });
        //let playerDirection = 'down';
        //this.player.play("walk-down");
        //console.log('now in movement scene 👍');
    }

    update() {
        let playerVector = new Phaser.Math.Vector2(0, 0);
        //let playerDirection = 'down';

        if(cursors.left.isDown){
            //this.player.x -= this.PLAYER_VELOCITY;
            playerVector.x = -1;
            playerDirection = 'left';
        } else if(cursors.right.isDown){
           // this.player.x += this.PLAYER_VELOCITY;
            playerVector.x = 1;
            playerDirection = 'right';
        }

        if(cursors.up.isDown){
            //this.player.y -= this.PLAYER_VELOCITY;
            playerVector.y = -1;
            playerDirection = 'up';
        } else if(cursors.down.isDown){
            playerVector.y = 1;
            playerDirection = 'down';
            //this.player.y += this.PLAYER_VELOCITY;
        }
        playerVector.normalize();
        this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY*playerVector.y);
        let playerMovement;
        playerVector.length() ? playerMovement = 'walk' : playerMovement = 'idle';
        this.player.play(playerMovement + '-' + playerDirection, true);
        // this.player.x += playerVector.x * this.PLAYER_VELOCITY;
        // this.player.y += playerVector.y * this.PLAYER_VELOCITY;
    }
}