precision mediump float;

varying vec2 vUv;

float smoothy(float edge0, float edge1, float x) {
        float t = clamp((x - 0.3)/ (0.7-0.3), 0.0, 1.0);
    float strength = t * t * (3.0 -2.0 * t);
    return strength;
}

void main() 
{
    //1. 그라데이션
    // float x = vUv.x;
    // float y = vUv.y;

    // float col = x;
    
    // gl_FragColor = vec4(col,col,col, 1.0);
    

    //2. 대각선 만들기
    // float x = vUv.x;    
    // float y = vUv.y;

    // vec3 col = vec3(x);
    // vec3 green = vec3(0.0, 1.0, 0.0 );

    // if ( y<= x + 0.005 && y + 0.005 >= x) {
    //     col = green;
    // }

    // gl_FragColor = vec4(col, 1.0);

    //3. 곡선 만들기
    // float x = vUv.x;    
    // float y = vUv.y;

    // vec3 col = vec3(x);
    // vec3 green = vec3(0.0, 1.0, 0.0 );

    // if (x*x <= y && x*x >= y -0.005) {
    //     col = green;
    // }

    // gl_FragColor = vec4(col, 1.0);
    

    //4. 그래프 + 그라데이션
    // float x = vUv.x * 2.0;    
    // float y = vUv.y;

    // vec3 col = vec3(x);
    // vec3 green = vec3(0.0, 1.0, 0.0 );

    // if (x*x <= y && x*x >= y -0.005) {
    //     col = green;
    // }

    // gl_FragColor = vec4(col, 1.0);


    //5. step
    // float x = vUv.x;    
    // float y = vUv.y;

    // vec3 green = vec3(0.0, 1.0, 0.0 );

    // float strength = step(0.5, x);

    // if (strength == 0.0) {
    //     discard;
    // }

    // vec3 col = vec3(strength);

    // gl_FragColor = vec4(col, 1.0);


    //6. min, max
    // float x = vUv.x;    
    // float y = vUv.y;

    // vec3 green = vec3(0.0, 1.0, 0.0 );

    // float strength = max(0.5, x);

    // vec3 col = vec3(strength);

    // gl_FragColor = vec4(col, 1.0);

    //7. clamp
    // float x = vUv.x;    
    // float y = vUv.y;

    // vec3 green = vec3(0.0, 1.0, 0.0 );

    // float strength = clamp(x, 0.3, 0.7);

    // vec3 col = vec3(strength);

    // gl_FragColor = vec4(col, 1.0);

    //8. smoothy 함수 제작, smoothstep 함수의 원리이다.
    // float x = vUv.x;    
    // float y = vUv.y;

    // float strength = smoothy(0.3, 0.7, x);

    // vec3 green = vec3(0.0, 1.0, 0.0 );


    

    // vec3 col = vec3(strength);

    // gl_FragColor = vec4(col, 1.0);

    //9. mix
    float x = vUv.x;    
    float y = vUv.y;

    vec3 green = vec3(0.0, 1.0, 0.0 );
    vec3 blue = vec3(0.0, 0.0, 1.0);

    vec3 col = mix(green, blue, 1.0);

    gl_FragColor = vec4(col, 1.0);

    //pow 제곱 pow(x, 2.0)
    //sqrt 제곱근 sqrt(x)
    //mod 나머지값 mod(4.0, 2.0) 4/2  나머지
    //fract 소숫점 이하 값 만환 fract(3.4) = 0.4
    //sin, cos 파형 만들기
    //abs 절대값 양수 반환
    //distance 두 정점의 거리 반환 
    //length 벡터의 길이를 반환 



}