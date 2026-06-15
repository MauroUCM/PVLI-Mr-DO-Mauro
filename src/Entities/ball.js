const BALL_SPEED = 200;

export default class Ball extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, dir){
        super(scene, x, y, 'ball')        
        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt)

    }

    // Direcciones: NE = 0, SE = 1, SW = 2, NW = 3
    setDirection(dir){
        switch(dir){
            case 0:
                this.body.setVelocity(BALL_SPEED, -BALL_SPEED);
            break;
            case 1:
                this.body.setVelocity(BALL_SPEED, BALL_SPEED);
            break;
            case 2:
                this.body.setVelocity(-BALL_SPEED, BALL_SPEED);
            break;
            case 3:
                this.body.setVelocity(BALL_SPEED, -BALL_SPEED);
            break;
        }
    }

    // up = 0, down = 1, right = 2, left = 3
    ballBounce(side){
        switch(side){
            case 0:
                this.body.setVelocity(BALL_SPEED, -BALL_SPEED);
            break;
            case 1:
                this.body.setVelocity(BALL_SPEED, BALL_SPEED);
            break;
            case 2:
                this.body.setVelocity(-BALL_SPEED, BALL_SPEED);
            break;
            case 3:
                this.body.setVelocity(BALL_SPEED, -BALL_SPEED);
            break;
        }


    }

    ballWallBounce(wall){

    }

}