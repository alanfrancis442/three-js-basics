varying vec2 vUv;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.x -= .5;
    modelPosition.y += .5;

    gl_Position = projectionMatrix * viewMatrix * modelPosition;
    vUv = uv;
}