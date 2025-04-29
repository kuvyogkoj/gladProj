class GameObject {
    constructor(xPos = 0, yPos = 0) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.height = 50;
        this.width = 30;
        this.hp = 100;
    }

    getXPos() { return this.xPos; }
    getYPos() { return this.yPos; }
    setXPos(x) { this.xPos = x; }
    setYPos(y) { this.yPos = y; }
    getHeight() { return this.height; }
    getWidth() { return this.width; }
    getHp() { return this.hp; }
    
    takeDamage(damage) {
        this.hp -= damage;
        return this.hp;
    }
}