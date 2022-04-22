const { spawn } = require('child_process');
const path = require('path');

const child = spawn("java -jar ../src/services/swagger/swagger-codegen-cli.jar generate -i http://localhost:5088/swagger/v1/swagger.json -l typescript-axios -o ../src/services/swagger/api");

var scriptOutput = "";

// use child.stdout.setEncoding('utf8'); if you want text chunks
child.stdout.on('data', (data) => {
    // data from standard output is here as buffers
    console.log(data.toString());
    
    data=data.toString();
    scriptOutput+=data;
});

child.stderr.on('data', function(data) {
    //Here is where the error output goes

    console.log('stderr: ' + data);

    data=data.toString();
    scriptOutput+=data;
});

child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});