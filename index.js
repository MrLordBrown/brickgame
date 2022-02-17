var config = {
    type: Phaser.AUTO,
    width: 2560,
    height: 1520,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600},
            debug: false
        }
      },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
  this.load.image('buildings1', 'assets/buildings1.png');
    this.load.image('buildings2', 'assets/buildings2.png');
      this.load.image('buildings3', 'assets/buildings3.png');
        this.load.image('buildings4', 'assets/buildings4.png');
          this.load.image('buildings5', 'assets/buildings5.png');
  this.load.image('platform','assets/platform.png');
  this.load.image('back', 'assets/background.png');
this.load.spritesheet('ryoko', 'assets/ryoko.png', {frameWidth: 64, frameHeight: 128});
this.load.spritesheet('jump','assets/jump.png', {frameWidth: 64, frameHeight:128});
}
var platforms;
var cursors;
var myTimeout;
var buildings;
function create ()
{

  cursors = this.input.keyboard.createCursorKeys();
  this.add.image(1280,760,'back');
  buildings = this.physics.add.staticGroup()
  buildings.create(300,1000,'buildings1');
  buildings.create(1000,1200,'buildings2');
  buildings.create(1250,1500,'buildings3');
  buildings.create(1750,1500, 'buildings4');
  buildings.create(2300,1500,'buildings5');

  player = this.physics.add.sprite(0,0, 'ryoko');

//  this.cameras.main.setSize(1520, 1520);

//this.cameras.main.startFollow(player);
player.setCollideWorldBounds(true);

this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('ryoko', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
});

this.anims.create({
    key: 'turn',
    frames: [ { key: 'ryoko', frame: 8 } ],
    frameRate: 20
});

this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('ryoko', { start: 4, end: 7 }),
    frameRate: 10,
    repeat: -1
});

this.anims.create({
    key: 'jumpLeft',
    frames: this.anims.generateFrameNumbers('jump', { start: 0, end: 6 }),
    frameRate: 5,
    repeat: 0
});

this.anims.create({
    key: 'jumpRight',
    frames: this.anims.generateFrameNumbers('jump', { start: 7, end: 13 }),
    frameRate: 5,
    repeat: 0
});

platforms = this.physics.add.staticGroup();
platforms.create(384, 1456, 'platform');
platforms.create(640,	1456, 'platform');
platforms.create(896,	1456, 'platform');
platforms.create(1536,	1456, 'platform');
platforms.create(1792,	1456, 'platform');
this.physics.add.collider(player, platforms);
this.physics.add.collider(player, buildings);
}

function update ()
{
  if (cursors.left.isDown)
{
      player.setVelocityX(-330);
      if (player.body.touching.down) {
        player.anims.play('left', true);
      } else {
        player.anims.play('jumpLeft', true)
      }
} else if (cursors.right.isDown) {
    player.setVelocityX(330);
      if (player.body.touching.down) {
        player.anims.play('right', true);
      } else {
        player.anims.play('jumpRight', true);

    }
  }
  else {
      player.setVelocityX(0);
      player.anims.play('turn');
    }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}
