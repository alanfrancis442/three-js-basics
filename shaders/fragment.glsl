precision mediump float;
uniform sampler2D uTexture;

varying vec2 vUv;
varying float vElevation;

void main(){
        vec4 texturecolor = texture2D(uTexture, vUv);
        texturecolor.rgb += vElevation;
        // gl_FragColor = vec4(1.0,0.0,0.0,1.0);
        gl_FragColor = texturecolor;
}