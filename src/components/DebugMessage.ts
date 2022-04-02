import Tank from './Tank';

export default class debugMessage extends Phaser.GameObjects.Text {
  public player: Tank;

  constructor(scene: Phaser.Scene, player: Tank, x: number, y: number) {
    super(scene, x, y, '', {
      fontSize: '18px',
      padding: { x: 10, y: 5 },
      backgroundColor: '#000000'
    });

    scene.add.existing(this);

    this.player = player;
    this.setScrollFactor(0);
    this.setText(this.getDebugMessage());
  }

  getDebugMessage() {
    return `
      x: ${Math.round(this.player.x)}, y: ${Math.round(this.player.y)}
      HP: ${this.player.player_data.HP}
      XP: ${this.player.player_data.XP}
      `;
  }

  update(time: number, delta: number) {
    this.setText(this.getDebugMessage());
  }
}