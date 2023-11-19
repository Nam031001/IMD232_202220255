// fragment.glsl

uniform vec2 canvasSize;
uniform vec4 rockColour;
uniform vec4 paperColour;
uniform vec4 scissorsColour;
uniform float time;

void main() {
    vec2 uv = gl_FragCoord.xy / canvasSize;

    // Example: Create a moving pattern based on time
    float pattern = sin(uv.x * 10.0 + time / 1000.0) * cos(uv.y * 10.0 + time / 1000.0);

    // Apply rock, paper, scissors colors based on the pattern
    vec4 color = mix(rockColour, mix(paperColour, scissorsColour, pattern), pattern);

    gl_FragColor = color;
}
