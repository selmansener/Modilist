const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const searchLine = 'const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers[\'Content-Type\'] === \'application/json\';';
const replaceLine = 'const needsSerialization = (typeof body !== "string") || (localVarRequestOptions.headers && localVarRequestOptions.headers[\'Content-Type\'] === \'application/json\');';
const lineToRemove = "import { ModelObject } from './model-object';";
const valueLine = "value?: ModelObject | null;";
const replaceValueLine = "value?: any | null;";

const fixStrictCheckIssue = (fileName, content) => {
    console.log(`Fixing file: ${fileName}`);

    if (content.indexOf(searchLine) == -1) {
        return content;
    }

    return content.replaceAll(searchLine, replaceLine).replaceAll(lineToRemove, "").replaceAll(valueLine, replaceValueLine);
}

const child = spawn("java", ["-jar",
    "src/services/swagger/swagger-codegen-cli.jar",
    "generate", "-i", "http://localhost:5088/swagger/v1/swagger.json", "-l", "typescript-axios", "-o", path.resolve(__dirname, "../src/services/swagger/api")], {
    env: process.env,
    shell: false,
    stdio: 'inherit'
}).on("exit", (code) => {
    if (code != 0) {
        console.error(`Swagger gen exited with code: ${code}`);

        return;
    }

    console.log("\x1b[32m", "Swagger gen completed. Fixing strict null checks.");
    console.log("\x1b[0m");

    const basePath = path.resolve(__dirname, "../src/services/swagger/api/apis/");

    const fileNames = fs.readdirSync(basePath);

    fileNames.forEach(file => {
        const filePath = path.resolve(basePath, file);

        const content = fs.readFileSync(filePath, {
            encoding: 'utf-8'
        });

        const fixedContent = fixStrictCheckIssue(file, content);

        fs.writeFileSync(filePath, fixedContent, {
            encoding: 'utf-8'
        });

        console.log("\x1b[32m", `${file} fixed.`);
        console.log("\x1b[0m");
    });
    
    console.log("Fixing filter file.");
    console.log("\x1b[0m");

    const filterFilePath = path.resolve(__dirname, "../src/services/swagger/api/models/filter.ts");

    const filterFileContent = fs.readFileSync(filterFilePath, {
        encoding: 'utf-8'
    });

    const fixedFilterFileContent = filterFileContent.replaceAll(lineToRemove, "").replaceAll(valueLine, replaceValueLine);

    fs.writeFileSync(filterFilePath, fixedFilterFileContent, {
        encoding: 'utf-8'
    });

    console.log("\x1b[32m", `Filter file fixed.`);
    console.log("\x1b[0m");
});