class Sword extends Weapon {
    constructor(weaponXPos) {
        super();
        this.height = 5;
        this.width = 40;
        this.weaponDamage = 15;
    }

    getDamage() { return this.weaponDamage; }

    dealDamage(weaponXPos, obj) {
        if (obj instanceof GameObject) {
            if (this.isColliding(weaponXPos, obj)) {
                return obj.takeDamage(this.weaponDamage);
            }
        }
        return -1;
    }

    isColliding(weaponXPos, other) {
        const thisRight = weaponXPos + (this.width / 2);
        const thisLeft = weaponXPos - (this.width / 2);
        const otherRight = other.getXPos() + (other.getWidth() / 2);
        const otherLeft = other.getXPos() - (other.getWidth() / 2);

        return thisRight >= otherLeft && thisLeft <= otherRight;
    }
}