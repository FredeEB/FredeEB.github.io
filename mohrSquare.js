class mohrSquare {

  constructor(x, y, def, scl, sub) {
    this.x = x;
    this.y = y;

    //side subdevision
    this.def = def;

    //side length
    this.scl = scl;

    //has make() been run
    this.made = false;

    //for calculating the inner squares
    this.coords = [];
    this.sub = sub;
    this.modfactor = 3.5;
  }

  calcActive(a, b, c, d) {
    return a + b * c + d * (this.scl - b * c * 2) / this.def
  }
  // a = koordinaten, b = k, c = mod[i], d = +scl|!+scl
  calcPassive(a, b, c) {

    return a + b * c
  }

  //makes the coordinates of the mohr square
  make() {
    //used for randomizing normal axis
    let mod = []
    //outer for loop defines the number of inner squares
    for (var i = 0; i < this.sub * 4; i++) {
      mod[i] = 1.5 + random(this.modfactor);
    }
    //inner for loop defines the coordinates of each point on the perimeter of each square and their inner squares
    for (let k = 0; k < this.sub; k++) {
      this.coords[k] = [];
      let j = 0;

      //makes the top side
      for (let i = 0; i <= this.def; i++) {
        this.coords[k][j] = new p5.Vector(this.calcActive(this.x,mod[i],k,i), this.calcPassive(this.y,mod[i],k));
        j++;
      }

      //makes the right side
      for (let i = 1; i <= this.def; i++) {
        this.coords[k][j] = new p5.Vector(this.calcPassive(this.x,mod[i],k,1)+this.scl/2, this.calcActive(this.y,mod[i],k,i));
        j++;
      }

      //makes the bottom
      for (let i = this.def - 1; i >= 0; i--) {
        this.coords[k][j] = new p5.Vector(this.calcActive(this.x,mod[i],k,i), this.calcPassive(this.y,mod[i],k)+this.scl/2);
        j++;
      }

      //makes the left side
      for (let i = this.def - 1; i >= 1; i--) {
        this.coords[k][j] = new p5.Vector(this.calcPassive(this.x,mod[i],k), this.calcActive(this.y,mod[i],k,i));
        j++;
      }
    }
    this.made = true;
  }

  display() {
    stroke(0);
    fill(0, 0, 0, 0)
    //if make() hasn't been run, run it
    if (!this.made) {
      this.make();
    }
    //outer for loop displays each square and their inner square
    for (var j = 0; j < this.coords.length; j++) {
      //inner for loop displays each point on the indivisual squares
      beginShape();
      for (let i = 0; i < this.coords[0].length; i++) {
        vertex(this.coords[j][i].x, this.coords[j][i].y);
      }
      if (j == this.coords.length - 1) {
        fill(0)
      }
      endShape(CLOSE);
    }
  }
  update() {
    this.display()
  }
}
