/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer"
import fs from "fs"
import qr from "qr-image"

inquirer.prompt([
    {
        name: "url",
        message: "Enter url = ",
        type: "input"
    }
]).then(function(answer){
    //console.log(answer.url);
    const text = answer.url;
 
    var qr_svg = qr.image(text);
    qr_svg.pipe(fs.createWriteStream('QRimg.png'));
     
    var svg_string = qr.imageSync('I love QR!', { type: 'svg' });
    fs.writeFile("qr-url.txt", text, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      });
})
.catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });