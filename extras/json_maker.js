const fs = require("fs");
const path = require("path");

const inputFolderPath = "input";

function scanFiles(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const savePath = filePath + ".scan"
    
    if (fs.lstatSync(filePath).isDirectory()) {
      // If this is a folder, then go inside it
      scanFiles(filePath);
    } else {
      const contents = fs.readFileSync(filePath, "utf8");
      // Exclude .scan files
      if (!filePath.includes("scan")){
        if (filePath.includes("methods")) {
          const data = contents
          const lines = data.split("\n");
          for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            // For some reason theres a lot of leading whitespace, so we remove it
            line = line.trim();
            // list of filters
            if (line.startsWith("this")) {
              if (!line.includes("(")){
                if (!line.includes("<")){
                  if (!line.includes("this. =")){
                    // Build .scan file line by line
                    saveLine = line + "\n"
                    fs.appendFileSync(savePath, saveLine)
                  }
                }
              }
            }
          }
          console.log(`Created ${savePath}`)
        }
      }
    }
  }
}

function makeJsonFiles(dir){
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const savePath = filePath + ".json"

    if (fs.lstatSync(filePath).isDirectory()) {
      // If this is a folder, then go inside it
      makeJsonFiles(filePath);
    } else {
      const contents = fs.readFileSync(filePath, "utf8");

      //Exclude .json files
      if (!filePath.includes("json")){
        // Only include .scan files
        if (filePath.includes("scan")) {
          const scanContents = contents;

          // Split the contents into lines
          const lines = scanContents.split("\n");
            
          // Iterate over the lines and perform modifications
          for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            
            // Replace ' = ' with ':'
            line = line.replace(" = ", '":"');
            
            // Remove 'this.' from the beginning of each line
            line = line.replace("this.", "");

            // Add quotes at the beginning and end of each line
            saveLine = "\"" + line + "\",\n"

            // Any time a quote is directly after another quote, replace it with just one quote
            saveLineFinal = saveLine.replaceAll("\"\"", "\"")

            // If the line is only a single quote after all this, don't write it
            if (saveLineFinal == "\",\n"){
              break;
            }

            // Save .json file line by line
            fs.appendFileSync(savePath, saveLineFinal)
          }
        
          // Now let's add some final touches to the json file
          let data = fs.readFileSync(savePath)
        
          // Add "{" at the beginning of the file
          const modifiedData = '{' + data.slice(0);
        
          // Replace the last character with "}"
          const lastIndex = modifiedData.length - 2;
          const finalData = modifiedData.slice(0, lastIndex) + '}';
        
          // Write the modified data back to the file
          fs.writeFileSync(savePath,finalData)
          console.log(`Created ${savePath}`)
        };
      }
    }
  }
}

function moveJson(folderPath) {
  const items = fs.readdirSync(folderPath);

  items.forEach(item => {
    const itemPath = path.join(folderPath, item);
    const isDirectory = fs.statSync(itemPath).isDirectory();
    if (isDirectory) {
      // If the item is a directory, recursively scan it
      moveJson(itemPath);
    } else {
      // If the item is a file, check if it's a JSON file
      if (path.extname(item) === '.json') {
        // Get the relative path of the source file
        const relativeFilePath = path.relative(inputFolderPath, itemPath);
        // Construct the destination path
        const destinationFilePath = path.join("json", relativeFilePath);
        console.log(destinationFilePath)

        // Create the destination folder (if necessary) before copying the file
        const destinationFolder = path.dirname(destinationFilePath);
        if (!fs.existsSync(destinationFolder)) {
          fs.mkdirSync(destinationFolder, { recursive: true });
        }

        // Copy the JSON file to the destination folder
        fs.copyFileSync(itemPath, destinationFilePath);
        console.log(`Copied ${item} to ${destinationFilePath}`);
      }

    }
  });
}

function moveScans(folderPath) {
  const items = fs.readdirSync(folderPath);

  items.forEach(item => {
    const itemPath = path.join(folderPath, item);
    const isDirectory = fs.statSync(itemPath).isDirectory();

    if (isDirectory) {
      // If the item is a directory, recursively scan it
      moveScans(itemPath);
    } else {
      // If the item is a file, check if it's a scan file
      if (path.extname(item) === '.scan') {
        // Get the relative path of the source file
        const relativeFilePath = path.relative(inputFolderPath, itemPath);
        // Construct the destination path
        const destinationFilePath = path.join("scan", relativeFilePath);

        // Create the destination folder (if necessary) before copying the file
        const destinationFolder = path.dirname(destinationFilePath);
        if (!fs.existsSync(destinationFolder)) {
          fs.mkdirSync(destinationFolder, { recursive: true });
        }

        // Copy the scan file to the destination folder
        fs.copyFileSync(itemPath, destinationFilePath);
        console.log(`Copied ${item} to ${destinationFilePath}`);
      }
    }  
  });
}

function deleteFilesWithExtensions(folderPath, extensions) {
  const items = fs.readdirSync(folderPath);

  items.forEach(item => {
    const itemPath = path.join(folderPath, item);
    const isDirectory = fs.statSync(itemPath).isDirectory();

    if (isDirectory) {
      // If the item is a directory, recursively delete files in it
      deleteFilesWithExtensions(itemPath, extensions);
    } else {
      // If the item is a file, check if it has the specified extensions
      const fileExtension = path.extname(item);
      if (extensions.includes(fileExtension)) {
        // Delete the file
        fs.unlinkSync(itemPath);
        console.log(`Deleted ${itemPath}`);
      }
    }
  });
}

function makeCSFiles(dir){
    const files = fs.readdirSync(dir);
  
    for (const file of files) {
      const filePath = path.join(dir, file);
      const savePath = filePath + ".cs"
  
      if (fs.lstatSync(filePath).isDirectory()) {
        // If this is a folder, then go inside it
        makeJsonFiles(filePath);
      } else {
        const contents = fs.readFileSync(filePath, "utf8");
  
        //Exclude .cs files
        if (!filePath.includes("cs")){
          // Only include .scan files
          if (filePath.includes("scan")) {
            //const input = contents;

            const input = contents.replace(/this\./g, '');
            
            const template = `[JsonProperty("REPLACE_ME")]\npublic TYPE REPLACE_ME { get; set; }`;
            
            const lines = input.trim().split('\n');
            const output = lines.map(line => {
              const parts = line.split('=').map(part => part.trim());
              if (parts.length === 2) {
                const [variableName, variableType] = parts;
                const replacedType = variableType === '"string"' || !/^\w+$/.test(variableType) ? 'bool' : variableType.replace(/\d+$/, '');
                const replacedTemplate = template
                  .replace(/REPLACE_ME/g, variableName)
                  .replace(/TYPE/g, replacedType);
                return replacedTemplate;
              } else {
                return line;
              }
            }).join('\n\n');
            
            console.log(output);
            

            // Write the modified data back to the file
            fs.writeFileSync(savePath,output)
            console.log(`Created ${savePath}`)
          };
        }
      }
    }
}

function moveCS(folderPath) {
  const items = fs.readdirSync(folderPath);

  items.forEach(item => {
    const itemPath = path.join(folderPath, item);
    const isDirectory = fs.statSync(itemPath).isDirectory();
    if (isDirectory) {
      // If the item is a directory, recursively scan it
      moveJson(itemPath);
    } else {
      // If the item is a file, check if it's a JSON file
      if (path.extname(item) === '.cs') {
        // Get the relative path of the source file
        const relativeFilePath = path.relative(inputFolderPath, itemPath);
        // Construct the destination path
        const destinationFilePath = path.join("cs", relativeFilePath);
        console.log(destinationFilePath)

        // Create the destination folder (if necessary) before copying the file
        const destinationFolder = path.dirname(destinationFilePath);
        if (!fs.existsSync(destinationFolder)) {
          fs.mkdirSync(destinationFolder, { recursive: true });
        }

        // Copy the JSON file to the destination folder
        fs.copyFileSync(itemPath, destinationFilePath);
        console.log(`Copied ${item} to ${destinationFilePath}`);
      }

    }
  });
}



// ensure the directories exist before doing anything else
if (!fs.existsSync("json")) {
  fs.mkdirSync("json");
}

if (!fs.existsSync("scan")) {
  fs.mkdirSync("scan");
}

if (!fs.existsSync("cs")) {
  fs.mkdirSync("cs");
}

// Clean the input directory before doing anything
console.log("Pre-Cleaning input directory")
const extensionsToDelete = ['.scan', '.json', 'cs'];
deleteFilesWithExtensions(inputFolderPath, extensionsToDelete);
console.log("Done cleaning input directory")

// Now let's actually do stuff!
console.log("Creating scan files...")
scanFiles(inputFolderPath);
console.log("Done creating scan files")
console.log()

console.log("Moving scan files...")
moveScans(inputFolderPath)
console.log("Done moving scan files")
console.log()

console.log("Creating JSON files...")
makeJsonFiles(inputFolderPath);
console.log("Done Creating JSON files")
console.log()

console.log("Moving JSON files...")
moveJson(inputFolderPath);
console.log("Done moving JSON files")
console.log()

console.log("Creating CS files...")
makeCSFiles(inputFolderPath);
console.log("Done Creating CS files")
console.log()

console.log("Moving CS files...")
moveCS(inputFolderPath);
console.log("Done moving CS files")
console.log()

// Clean the input directory afterwards
console.log("Cleaning input directory...")
deleteFilesWithExtensions(inputFolderPath, extensionsToDelete);
console.log("Done cleaning input directoy")
console.log()

console.log("DONE!")