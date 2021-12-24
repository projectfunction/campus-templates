import { readdirSync, readFileSync, existsSync, writeFileSync } from "fs";
import { join } from "path";

function parseInventory(){
    const inventoryFile = readFileSync("./inventory.ctemplate.json", {encoding:"utf-8"});
    return JSON.parse(inventoryFile);
}

function walkFolderForFiles(folderPath){
    const filepaths = [];
    const entries = readdirSync(folderPath, { withFileTypes: true });

    entries.forEach(entry => {
        const path = join(folderPath, entry.name);
        if (entry.isFile){
           filepaths.push(path);
        }
        else{
            filepaths.push(...walkFolderForFiles(path))
        }
    });

    return filepaths;
}

const inventory = parseInventory();
const index = {
    lastGenerated: new Date(),
    version: inventory.version ?? "unknown",
    templates: {}
};

Object.keys(inventory.include ?? {}).forEach(templateFolderName => {
    const templateFolderPath = join("./templates", templateFolderName);
    
    if (!existsSync( templateFolderPath )) throw new Error(`Missing template folder '${templateFolderName}'`);
    
    const filesInTemplateFolder = walkFolderForFiles(templateFolderPath);

    if (filesInTemplateFolder.length === 0) throw new Error(`Files missing in template '${templateFolderName}'`);

    index.templates[templateFolderName] = {
        name: inventory.include[templateFolderName],
        files: filesInTemplateFolder
    }
});

writeFileSync("./index.ctemplate.json", JSON.stringify(index, null, '\t'), {encoding:"utf-8"});