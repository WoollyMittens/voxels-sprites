Sproxels.prototype.Background = function(parent, props) {
  // properties
  this.cfg = parent.cfg;
  this.props = props;
  this.cluster = null;
  this.segments = [];
  this.voxels = [];
  // methods
  this.init = function() {
    // calculate the grid position
    var gridX = props.position[0] * props.size;
    var gridY = props.position[1] * props.size;
    var gridZ = props.position[2] * props.size;
    // create the map container
    this.cluster = document.createElement('div');
    this.cluster.setAttribute('class', 'sproxel-background');
    this.cluster.style.transform = 'translate3d(0, 0, 0)';
    this.cluster.style.transform = 'translate3d(' + gridX + 'px, ' + gridY + 'px, ' + gridZ + 'px)';
    // add the map elements
    this.segments = props.geometry.map((row, y) => this.addRow(row, y));
    // add the cluster to the plane
    this.cfg.plane.appendChild(this.cluster);
  };
  this.redraw = function() {
    // adjust the background position
    var gridX = props.position[0] * props.size;
    var gridY = props.position[1] * props.size;
    var gridZ = props.position[2] * props.size;
    this.cluster.style.transform = 'translate3d(' + gridX + 'px, ' + gridY + 'px, ' + gridZ + 'px)';
    // for all rows
    props.geometry.map((row, y) => {
      // adjust the row position
      gridX = row.x * props.size;
      gridY = y * props.size;
      gridZ = row.y * props.size;
      this.segments[y].style.transform = 'translate3d(' + gridX + 'px, ' + gridY + 'px, ' + gridZ + 'px)';
      // for all cols
      row.z.map((col, x) => {
        // adjust the col palette
        this.voxels[y][x].setAttribute('class', 'sproxel-element sproxel-palette-' + col);
      });
    });
  };
  this.addRow = function(row, y) {
    // calculate the grid position
    var gridX = row.x * props.size;
    var gridY = y * props.size;
    var gridZ = row.y * props.size;
    // create the row
    var segment = document.createElement('div');
    segment.setAttribute('class', 'sproxel-segment');
    segment.style.transform = 'translate3d(' + gridX + 'px, ' + gridY + 'px, ' + gridZ + 'px)';
    // add the elements to the row
    this.voxels[y] = row.z.map((col, x) => this.addVoxel(col, x, segment));
    // add the row to the cluster
    this.cluster.appendChild(segment);
    return segment;
  },
  this.addVoxel = function(col, x, segment) {
    // calculate the grid position
    var gridX = x * props.size;
    var gridY = 0;
    var gridZ = 0;
    // create the element
    var voxel = document.createElement('div');
    voxel.setAttribute('class', 'sproxel-element sproxel-palette-' + col);
    voxel.style.transform = 'translate3d(' + gridX + 'px, ' + gridY + 'px, ' + gridZ + 'px)';
    voxel.innerHTML = '<div class="sproxel-wall sproxel-top"></div><div class="sproxel-wall sproxel-bottom"></div><div class="sproxel-wall sproxel-front"></div><div class="sproxel-wall sproxel-back"></div><div class="sproxel-wall sproxel-left"></div><div class="sproxel-wall sproxel-right"></div>';
    // add the element to the row
    segment.appendChild(voxel);
    return voxel;
  };
  // events
  this.init();
};
