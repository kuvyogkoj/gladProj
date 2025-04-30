class GladiatorTestOne extends GameObject {
    constructor(xPos, yPos) {
        super(xPos, yPos);

        this.weapon = new Sword(xPos);
        this.target = null;

        this.scaler = 3; // scale up sprite size
        this.frameWidth = 32; // correct frame size
        this.frameHeight = 32;
        this.currentFrame = 0;
        // Helps counts frames
        this.spriteSheetArray = [
            5, // IDLE 
            8, // WALKING
            7, // HIT
        ];
        this.spriteCurrFrame = 0;
        this.totalFrames = 6; // Assume 6 frames for walking (for now)
        this.currentRow = 0; // 0 = idle, 1 = walking, 2 = attack, etc
        this.frameTimer = 0;
        this.frameInterval = 150; // speed of animation (ms between frames)

        this.spriteSheet1 = new Image();
        this.spriteSheet2 = new Image();
        this.spriteSheet1.src = 'images/Gladiator-Sprite Sheet.png';
        this.spriteSheet2.src = 'images/Gladiator-Sprite Sheet-Left.png';

        this.frameStartT = Date.now();
    }

    getWeapon() {
        return this.weapon;
    }

    hit() {
        if (!this.target) return false;
        const facingRight = this.getXPos() < this.target.getXPos();
        
        const collidingAddition = facingRight ? this.width / 2 : -this.width / 2;
        const weaponX = this.getXPos() + collidingAddition;

        if (this.weapon.isColliding(weaponX, this.target)) {
            this.weapon.dealDamage(weaponX, this.target);
            return true;
        }
        return false;
    }

    setRow(rowNum, bool){
        this.currentRow = rowNum;
        this.spriteCurrFrame = this.currentRow;
        this.facingRightTwo = bool;
    }

    draw(ctx) {
        
        // Load the image path first into a vairable then load the variable
        if(this.facingRightTwo) this.spriteSheet = this.spriteSheet1;
        else this.spriteSheet = this.spriteSheet2;

        ctx.drawImage(
            this.spriteSheet,
            this.currentFrame * this.frameWidth, // Source X
            this.currentRow * this.frameHeight,  // Source Y (choose animation row)
            this.frameWidth, this.frameHeight,   // Source width/height
            this.getXPos() - (this.frameWidth * this.scaler) / 2,
            this.getYPos() - (this.frameHeight * this.scaler) / 2,
            this.frameWidth * this.scaler,
            this.frameHeight * this.scaler
        );
    }

    update() {
        const currentTime = Date.now(); // Get the current time in milliseconds
        const elapsedTime = currentTime - this.frameStartT; // Calculate the time difference since the last frame update

        // Create a choose from spriteSheetArray
        if (elapsedTime >= this.frameInterval) {
            this.frameStartT = currentTime; // Reset the time
            this.currentFrame = (this.currentFrame + 1) % this.spriteSheetArray[this.spriteCurrFrame]; // Move to the next frame (loop back to 0)
        }
        
    }
    

    setTarget(obj) { this.target = obj; }

    getSwordDmg() { return this.weapon.getDamage(); }
}
