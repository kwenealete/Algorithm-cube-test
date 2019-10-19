// /** Code logic for finding the smallest number of cubes required to fill up a given box
//  * By Monya Kwene Alete
//  */

function onSubmit(){
    //Store values received from the text area
    let input = document.getElementById('textArea').value;

    //Store the input in arrays seperated by new lines
    let lineFeed = input.split('\n');
    console.log(lineFeed);
    let boxArray =[];
    let cubeArray =[];

    //Box constructor
    let Box = function(length,width, height){
      this.length = length;
      this.width = width;
      this.height = height;
    }

    //split each array elements into 2 arrays , 'boxArray' with box dimension, and 'cubeArray' with no. of cubes
    for (let i=0; i<lineFeed.length; i++){
      let elements  = lineFeed[i].split(" ");
      cubeArray.push(new Array(elements.splice(3)));
      boxArray.push(new Box(elements[0],elements[1],elements[2]));
      }

   //volume function
   let volume = (l,w,h) =>{
     return l*w*h;
   }

   //calculates powers of 2 and stores in array
   let powersOfTwo = function(arrayLength) {
     let x = arrayLength;
     let powers = [];
     for (let i=0;i<x;i++){
       let pow = Math.pow(2,i);
       powers.push(pow);
     }
     return powers;
   }
  
  /************Function to determine the smallest no.of cubes that fit in the boxes.*********/
  
   let findCubes = function(){

     //calculates volume of boxes and stores result in 'boxVolumeArray'
     let boxVolumeArray=[];
     for(let i = 0; i < boxArray.length; i++){
       let boxVol = volume(boxArray[i].length,boxArray[i].width,boxArray[i].height);
       boxVolumeArray.push(boxVol);
     }
    console.log("boxVolumeArray: "+ boxVolumeArray);
  
    //find volume of cubes ans store in 'cubeVolumeArray'
    let cubeVolumeArray=[];
    for (let i=0;i<cubeArray.length;i++){
      console.log("length of cubeArray"+"["+i+"]: "+cubeArray[i][0].length);
      let length = cubeArray[i][0].length;
      let powersArray = powersOfTwo(length);// to find the array with powers of 2 eg: powersArray= [1,2,4,8,...]
      console.log("Powers array is "+powersArray);
      console.log("Calculating vol of cubes ",cubeArray[i][0]);
      let cubeVol=[];
      for(let z=0;z<cubeArray[i][0].length;z++){
        let eachCubeVol = Math.pow(powersArray[z],3);// calculate the volume of each cube eg: powersArray[0]=1, eachCubeVol = 1*1*1
        cubeVol[z] = cubeArray[i][0][z]*eachCubeVol ;
      }
      cubeVolumeArray.push(cubeVol);
    }
  
    /***Check for conditions*****/
  
    let resultArray =[];//stores the result
    //check if Vb < Vc
    for(let i = 0; i<boxVolumeArray.length; i++){
      let cubesVolume=0;
      let result=0;
      for(let j=0;j<cubeVolumeArray[i].length;j++){ //finds the total volume of all cubes in each cubeVolume Array elements
      cubesVolume= Number(cubeVolumeArray[i][j])+cubesVolume;
      }
      let boxVolume = Number(boxVolumeArray[i]);
      if(boxVolume>cubesVolume){
        result = -1;
      }else{
        let powersArray = powersOfTwo(cubeArray[i][0].length);
        for (n=cubeArray[i][0].length-1; n>=0; n--){
          let cubeNumber = Number(cubeArray[i][0][n]);
          let boxVolume1 = boxVolume - cubeNumber*Math.pow(Number(powersArray[n]),3);
          if(boxVolume1<0){
            result =Math.floor(result+boxVolume/(Math.pow(Number(powersArray[n]),3)));
            break;
          }else if(boxVolume1>0){
            result = result + cubeNumber;
            boxVolume = boxVolume1;
          }
        }
      }
      resultArray.push(parseInt(result));
    }
      return resultArray;
   }
    document.getElementById('result').innerHTML=findCubes().join(" <br> ");//displays result on html element .
  }