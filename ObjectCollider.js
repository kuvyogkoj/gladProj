class ObjectCollider {
    colliderActive() {
        throw new Error("Method 'colliderActive()' must be implemented.");
    }

    isColliding(thisX, other) {
        throw new Error("Method 'isColliding()' must be implemented.");
    }
}