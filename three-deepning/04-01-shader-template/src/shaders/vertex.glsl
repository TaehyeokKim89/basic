    //RawShaderMaterial 사용시 값 설정 필요
    // uniform mat4 projectionMatrix;  //3D -> 2D 클립공간으로 만들어줌
    // uniform mat4 viewMatrix; //카메라의 정보
    // uniform mat4 modelMatrix; //mesh의 정보

    //ShaderMaterial을 사용하게 되면 이미 uniform 값들이 설정이 되어 있음
    uniform float uTime;

    // attribute vec3 position;
    // attribute vec2 uv;
    attribute float aRandomPosition;


    varying float vRandomPosition;
    varying vec2 vUv;

    void main() 
    {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        modelPosition.z += aRandomPosition /20.0 * sin(uTime);
        // modelPosition.z += sin(uTime + modelPosition.x) / 2.0 ;

        vRandomPosition = (aRandomPosition + 1.0) / 2.0;
        vRandomPosition /= uTime * 0.3;
        vUv = uv;
        gl_Position = projectionMatrix * viewMatrix * modelPosition;
    }