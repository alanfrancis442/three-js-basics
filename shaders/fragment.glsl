varying vec2 vUv;
precision mediump float;
void main(){
        // vec4 texturecolor = texture2D(uTexture, vUv);
        // float strenght  = 1.0-vUv.y;
        // float strenght  = vUv.y*8.0;
        // float strenght  = sin(vUv.y*8.0*360.0);
        // float strenght  = mod(vUv.y*8.0,1.0);
        // float strenght  = mod(vUv.y*10.0,1.0);
        // strenght = step(0.8,strenght);
        // float strenght  = mod(vUv.x*10.0,1.0);
        // strenght = step(0.8,strenght);
        float strenght = step(0.8,mod(vUv.x*10.0,1.0));
        strenght+=step(0.8,mod(vUv.y*10.0,1.0));
        gl_FragColor = vec4(strenght,strenght, strenght, 1.0);
}