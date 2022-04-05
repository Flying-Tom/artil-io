import Global from '@/global';
import BaseTank from '@/components/Tank/BaseTank';
import Game from '@/scenes/Game';

export default class Bullet extends Phaser.GameObjects.Container {
  // body: Phaser.Physics.Matter.Sritpe;
  parent: BaseTank;
  scene: Phaser.Scene;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    velocity_x: number,
    velocity_y: number,
    parent: BaseTank
  ) {
    super(scene);
    this.scene = scene;
    this.parent = parent;
    Game.scene.add.existing(this);
    this.drawObject();
    const body = this.body as MatterJS.BodyType;
    Game.scene.matter.body.setPosition(body, { x: x, y: y });
    Game.scene.matter.body.setVelocity(body, { x: velocity_x, y: velocity_y });
    body.collisionFilter.category = Global.CATEGORY_PROJECTILE;
    body.collisionFilter.mask =
      Global.CATEGORY_TERRAIN | Global.CATEGORY_TANK | Global.CATEGORY_POINT;
    // Collision event
    body.onCollideCallback = (pair: MatterJS.IPair) => {
      this.destroy();
      // Remove this bullet from parent
      if (this.parent != null) {
        this.parent.data.values.bullets =
          this.parent.data.values.bullets.filter((v: any) => {
            return v != this;
          });
      }
    };
  }

  drawObject() {
    const r = 5;
    const texture = this.scene.add.circle(0, 0, r, 0xffffff);
    this.add(texture);
    const body = this.scene.matter.add.circle(0, 0, r);
    body.label = 'Bullet';
    return this.scene.matter.add.gameObject(this, body);
  }

  handleCollision(target: MatterJS.BodyType): void {
    // Deal damage, destroy terrain, etc.
  }
}
