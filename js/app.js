/** Code logic for finding the smallest number of cubes required to fill up a given box
 * By Monya Kwene Alete
 */

 //to execute the function click on the 'Submit' button

 function onSubmit() {
     //store values entered by user
     let input = document.getElementById('textArea').value;

     //Store input in arrays seperated by new line
     let inputFeed = input.split('\n');
     console.log(inputFeed);
     let boxArray = [];
     let cubeArray = [];

     //Box constructor
     let Box = (length, width, height) =>{
         this.length = length;
         this.width = width;
         this.height = height;
     }

     //split every array elements into 2 arrays, 'boxArray' being the box dimension, and  'cubeArray' being the number of cubes
     for(let i = 0; i<inputFeed.length; i++) {
         let elements = inputFeed[i].split(" ");
         cubeArray.push(new Array(elements.split(3)));
         boxArray.push(new Box(elements[0], elements[1], elements[2]));
     }

     //function to calculate volume
     let volume = function(l,w,h) {
         return l*w*h;
     };

     //calculate powers of 2 and store result in an array
     let powersOfTwo = function(arrayLength) {
         let x = arrayLength;
         let powers = [];
         for(let i=0; i < x; i++) {
             let pow = Math.pow(2, i);
             powers.push(pow);
         }
         return powers;
     }

     /**** function to calculate the smallest number of cubes needed to fill the boxes ****/

     let findCubes = function() {

        //calculate volume of boxes and store in an array
        let boxVolumeArray = [];
        for(let i = 0; i < boxArray.length; i++) {
            let boxVol = volume(boxArray[i].length, boxArray[i].width, boxArray[i].height);
            boxVolumeArray.push(boxVol);
        }

        console.log('boxVolumeArray: ' + boxVolumeArray );

        //Calculate volume of cubes and store in an array
        let cubeVolumeArray = [];
        for (let i = 0; i<cubeArray; i++) {
            let length = cubeArray[i][0].length;
            let powersArray = powersOfTwo(length); //calculates array with powers of 2 e.g powersArray = [1, 2, 4, ...]

            let cubeVol = [];
            for (let a = 0; a < cubeArray[i][0].length; a++) {
                let eachcubeVol = Math.pow(powersArray[a], 3); //calcuates volume of each cube e.g powersArray[0] = 1, eachCubeVol = 1*1*1
                cubeVol[a] = cubeArray[i][0][a] * eachcubeVol;                
            }

            cubeVolumeArray.push(cubeVol);
        }

        /***Checking for conditions ***/

        let resultArray = []; //stores the result

        //comparing volume of box (Vb) and volume of cubes(Vc)
        for (let i = 0; i < boxVolumeArray.length; i++) {
            let cubesVolume = 0;
            let result = 0;

            for (let j = 0; j < cubeVolumeArray[i].length; j++) { //calculates total volume of all cubes in every cubeVolumeArray elements
                cubesVolume = Number(cubeVolumeArray[i][j]) + cubesVolume;
            }

            let boxVolume = Number(boxVolumeArray[i]);
            if (boxVolume > cubesVolume) {
                result = -1;
            } else {
                let powersArray = powersOfTwo(cubeArray[i][0].length);
                for (n = cubeArray[i][0].length; n >= 0; n--) {
                    let cubeNumber = Number(cubeArray[i][0][n]);
                    let boxVolume1 = boxVolume - cubeNumber * Math.pow(Number(powersArray[n]), 3);
                    if (boxVolume1 < 0) {
                        result = Math.floor(result + boxVolume/(Math.pow(Number(powersArray[n]), 3)));
                        break;
                    } else if(boxVolume1 > 0) {
                        result = result + cubeNumber;
                        boxVolume = boxVolume1;
                    }
                }
            }
            resultArray.push(parseInt(result));
            
        }
                
        return resultArray;
        
        
        
     }
     //Dislay results
     document.getElementById('result').innerHTML = findCubes().join(" <br> ");
     
 }