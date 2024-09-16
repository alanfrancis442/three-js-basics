uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform vec2 uFrequency;
uniform float uTime;

attribute vec3 position;
attribute float aRandom;
attribute vec2 uv;

varying vec2 vUv;
varying float vElevation;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(modelPosition.x * uFrequency.x + uTime) * 0.1;
    elevation+= sin(modelPosition.y * uFrequency.y + uTime) * 0.1;
    modelPosition.z += elevation;
    modelPosition.x -= .5;
    modelPosition.y += .5;
    // modelPosition.z += sin(modelPosition.y * uFrequency.y + uTime) * 0.2;
    // modelPosition.z += sin(modelPosition.x * uFrequency.x + uTime) * 0.15;
    // modelPosition.z += aRandom;
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    vUv = uv;
    vElevation = elevation;
}