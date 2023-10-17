Sproxels.prototype.Sprite = function(parent, props) {
  // properties
  this.cfg = parent.cfg;
  this.props = props;
  this.cluster = null;
  this.voxels = [];
  // methods
  this.init = function() {
    // create the sprite container
    this.cluster = document.createElement('div');
    this.cluster.setAttribute('class', 'sproxel-sprite');
    // add the sprite elements
    this.voxels = props.geometry.slice().reverse().map((slice, z) =>
      slice.map((row, y) =>
        row.map((col, x) =>
          this.addVoxel(x, y, z, col)
        )
      )
    );
    // apply the transormation
    this.redraw();
    // add the cluster to the plane
    this.cfg.plane.appendChild(this.cluster);
  };
  this.redraw = function() {
    // calculate the grid position
    var gridX = props.position[0] * props.size;
    var gridY = props.position[1] * props.size;
    var gridZ = props.position[2] * props.size;
    // update the transformation
    var transformation = [];
    transformation.push('translate3d(' + gridX + 'px, ' + gridY + 'px, ' + gridZ + 'px)');
    transformation.push('rotate3d(1, 0, 0, ' + props.rotation[0] + 'deg)');
    transformation.push('rotate3d(0, 1, 0, ' + props.rotation[1] + 'deg)');
    transformation.push('rotate3d(0, 0, 1, ' + props.rotation[2] + 'deg)');
    this.cluster.style.transform = transformation.join(' ');
  };
  this.addVoxel = function(x, y, z, c) {
    // don't render transparent elements
    if (c === 0) return null;
    // calculate the grid position
    var gridX = x * props.size;
    var gridY = y * props.size;
    var gridZ = z * props.size;
    // create the element
    var voxel = document.createElement('div');
    voxel.setAttribute('class', 'sproxel-element sproxel-palette-' + c);
    voxel.style.transform = 'translate3d(' + gridX + 'px, ' + gridY + 'px, ' + gridZ + 'px)';
    voxel.innerHTML = '<div class="sproxel-wall sproxel-top"></div><div class="sproxel-wall sproxel-bottom"></div><div class="sproxel-wall sproxel-front"></div><div class="sproxel-wall sproxel-back"></div><div class="sproxel-wall sproxel-left"></div><div class="sproxel-wall sproxel-right"></div>';
    // add the element to the cluster
    this.cluster.appendChild(voxel);
    return voxel;
  };
  // events
  this.init();
};
