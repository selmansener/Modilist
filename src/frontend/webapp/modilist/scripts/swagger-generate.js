const { spawn } = require('child_process');
const path = require('path');

const child = spawn("java", ["-jar", 
"src/services/swagger/swagger-codegen-cli.jar",
"generate", "-i", "http://localhost:5088/swagger/v1/swagger.json", "-l", "typescript-axios", "-o", path.resolve(__dirname, "../src/services/swagger/api")], {
    env: process.env,
    shell: false,
    stdio: 'inherit'
});