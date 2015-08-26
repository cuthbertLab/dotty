function Tile(position, value) {
  this.x                = position.x;
  this.y                = position.y;
  this.value            = value || 2;

  this.previousPosition = null;
  this.mergedFrom       = null; // Tracks tiles that merged together
}

Tile.prototype.savePosition = function () {
  this.previousPosition = { x: this.x, y: this.y };
};

Tile.prototype.updatePosition = function (position) {
  this.x = position.x;
  this.y = position.y;
};

Tile.prototype.canMerge = function(other) {
    if (this.value == other.value) {
        return true;  // redundant w/ last statement, but clearer...
    }
    var valueRounded = Math.pow(2, Math.floor(Math.log(this.value) / Math.log(2)))
    var offOfdoubled = ((valueRounded * 2) - this.value);
    if (offOfdoubled/2.0 == other.value) {
        return true; // add dot
    }
    var valueRoundedO = Math.pow(2, Math.floor(Math.log(other.value) / Math.log(2)))
    var offOfdoubledO = ((valueRoundedO * 2) - other.value);
    if (offOfdoubledO/2 == this.value) {
        return true;  // add dot
    }
    if (this.value + other.value == valueRounded * 2) {
        return true;
    }
    if (this.value + other.value == valueRoundedO * 2) {
        return true;
    }    
    var sumOffDouble = Math.max(valueRounded, valueRoundedO) * 2 - (this.value + other.value)
    if ((Math.log(sumOffDouble) / Math.log(2)) == Math.floor(Math.log(sumOffDouble)/Math.log(2))) {
	return true; // the sum is a dotted note; like half + dotted quarter.
    }

    return false;
}

Tile.prototype.serialize = function () {
  return {
    position: {
      x: this.x,
      y: this.y
    },
    value: this.value
  };
};
