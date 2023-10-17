var Sproxels = function(cfg) {
  // properties
  this.cfg = cfg;
  this.background = null;
  this.sprites = [];
  this.animationFrame = null;
  // methods
  this.init = function() {
    // add the ground plane
    this.cfg.plane = document.createElement('div');
    this.cfg.plane.setAttribute('class', 'sproxel-plane');
    this.cfg.space.appendChild(this.cfg.plane);
    // add the background
    this.background = new this.Background(this, this.cfg.background);
    // add the sprites
    this.sprites = this.cfg.sprites.map(sprite => new this.Sprite(this, sprite));
    // start the redraw loop
    this.redraw();
  };
  this.redraw = function() {
    // update  background
    this.background.redraw();
    // update all sprites
    this.sprites.map(sprite => sprite.redraw());
  };
  this.rebuild = function() {
    // TODO: apply bitmap updates
  };
  // events
  this.init();
};
