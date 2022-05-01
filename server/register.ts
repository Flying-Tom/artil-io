import jsdom from 'global-jsdom';

console.log(jsdom);

jsdom(
  '<!DOCTYPE html><html><head></head><body><div id="phaser-container"></div></body></html>',
  {
    // To run the scripts in the html file
    // runScripts: 'dangerously',
    // Also load supported external resources
    resources: 'usable',
    // So requestAnimationFrame events fire
    pretendToBeVisual: true
  }
);
