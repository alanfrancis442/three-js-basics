uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform vec2 uFrequency;
uniform float uTime;

attribute vec3 position;
attribute float aRandom;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.x -= .5;
    modelPosition.y += .5;
    modelPosition.z += sin(modelPosition.y * uFrequency.y + uTime) * 0.2;
    modelPosition.z += sin(modelPosition.x * uFrequency.x + uTime) * 0.1;
    // modelPosition.z += aRandom;
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}