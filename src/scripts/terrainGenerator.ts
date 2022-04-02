import _ from 'lodash';

import PoissonDiskSampling from 'poisson-disk-sampling';
import { combineNoise } from '@/scripts/perlin';
import Platform from '@/components/Platform';

function generateTerrain(scene: Phaser.Scene) {
  const [min_x, max_x] = [-1000, 1000];
  const [min_y, max_y] = [-1000, 1000];

  const w = 750;
  const h = 200;
  const s = 25;

  const r = 1 / 3;

  let p = new PoissonDiskSampling({
    shape: [1, 1],
    minDistance: r,
    tries: 10
  });
  let points = p.fill();

  points.forEach((p) => {
    let x = p[0] * (max_x - min_x) + min_x;
    let y = p[1] * (max_y - min_y) + min_y;

    const ny = Math.ceil(h / s);
    const nx = Math.ceil(w / s);

    const noise_t = combineNoise(h, h / 2, 8, 2, nx).pos.map((v) =>
      Math.floor(v)
    );
    const noise_r = combineNoise(w, w / 2, 8, 2, ny).pos.map((v) =>
      Math.floor(v)
    );
    const noise_b = combineNoise(h, h / 8, 8, 2, nx).pos.map((v) =>
      Math.floor(v)
    );
    const noise_l = combineNoise(w, w / 2, 8, 2, ny).pos.map((v) =>
      Math.floor(v)
    );
    const min_noise_t: any = _.min(noise_t);
    const min_noise_r: any = _.min(noise_r);
    const min_noise_b: any = _.min(noise_b);
    const min_noise_l: any = _.min(noise_l);

    const vertices_t = _.range(0, nx - 1).map((i) => ({
      x: (i * w) / nx,
      y: 0 - (noise_t[i] - min_noise_t)
    }));
    const vertices_r = _.range(0, ny - 1).map((i) => ({
      x: w + (noise_r[i] - min_noise_r),
      y: (i * h) / ny
    }));
    const vertices_b = _.range(nx - 1, 0).map((i) => ({
      x: (i * w) / nx,
      y: h + (noise_b[i] - min_noise_b)
    }));
    const vertices_l = _.range(ny - 1, 0).map((i) => ({
      x: 0 - (noise_l[i] - min_noise_l),
      y: (i * h) / ny
    }));

    const vertices: { x: number; y: number }[] = _.flatten([
      vertices_t,
      vertices_r,
      vertices_b,
      vertices_l
    ]);

    const platform = new Platform(scene, x, y, vertices, 0x0000ff, 0.5);
  });
}

export default generateTerrain;