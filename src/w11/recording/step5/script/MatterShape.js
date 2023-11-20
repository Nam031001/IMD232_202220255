class MatterShape {
  constructor(x, y, verticles, options) {
    this.body = Bodies.fromVertices(x, y, verticles, options);
    Composite.add(matterEngine.world, this.body);
    // console.log(this.body);
  }

  display() {
    // 1. 엔진에 등록된 물체의 버텍스들 가져오기
    // 2. beginShape, endShape로 안에 버텍스 찍기
    beginShape();
    this.body.vertices.forEach((each) => {
      vertex(each.x, each.y);
    });
    endShape(CLOSE);
  }

  isDead() {
    return this.body.position.y > height + 100;
  }

  remove() {
    Composite.remove(matterEngine.world, this.body);
  }
}
