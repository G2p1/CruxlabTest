import {useState, ChangeEvent} from 'react';
import './App.css'

function App() {
const [numberOfRightPassword, setNumber] = useState(0);

function checkRightPassword(file:Blob){

  //Variables for manipulate data
  let data:string;
  let splitedData:string[];
  let fileR:FileReader = new FileReader;

  //function with run when we read our file data
  fileR.onload = function(file){
    
    let rightPassCounter:number = 0;

    //splitting our text data to lines
    data=file.target.result.toString();
    splitedData = data.split('\n');

    splitedData.forEach(element => {
      
      let min, max:number;
      let neededSybolCounter:number = 0;

      //split lines to needed elements
      let row:string[] = element.split(' ');

      //find min and max number of symbols with need to be in password
      let beetween:string[] = row[1].split('-');
      beetween[1] = beetween[1].slice(0, beetween.length-1);

      min = Number(beetween[0]);
      max = Number(beetween[1]);


      //loop where we count symbols
      for(let i:number = 0; i < row[2].length; i++){

        if(row[2][i]===row[0]){

          neededSybolCounter++;

        }

      }
      
      //check is it correct password and update right password counter
      if(neededSybolCounter >= min && neededSybolCounter <= max){

        rightPassCounter++;

      }

    });

    //set answer
    setNumber(rightPassCounter);
  }
  //check that file exist than read
  if(file){
    fileR.readAsText(file);
  }
}


  return (
    <div className='container'>
      <input className='fileInput'
             type='file' 
             accept='.txt' 
             onChange={(e:ChangeEvent<HTMLInputElement>)=>checkRightPassword(e.target.files[0])}
      >
      </input>

      {
        numberOfRightPassword===0 ? <div className='result'>No right password yet</div> : <div className='result'>There are {numberOfRightPassword} right passwords</div>
      }
      
    </div>
  )
}

export default App
