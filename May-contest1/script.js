
let arr = [
    { id: 1, name: "john", age: "18", marks: 80 },
    { id: 2, name: "jack", age: "20", marks: 85 },
    { id: 3, name: "karen", age: "19", marks: 35 },
  ];
  
  function PrintStudentswithMap() {
    //Write your code here , just console.log
    arr.map(function (student){
       if(student.marks>50){
        console.log(student.marks);
       }
    })
  }
  
  function PrintStudentsbyForEach() {
    //Write your code here , just console.log
    arr.forEach((student)=>{
      if(student.marks>50){
        console.log(student.marks);
      }
    })
  }
  
  function addData() {
    //Write your code here, just console.log
    let student= { id: 4, name: "susan", age: "20", marks: 45 };
    arr.push(student);
    console.log(arr);
  }
  
  function removeFailedStudent() {
    //Write your code here, just console.log
    arr=arr.filter(function(student){
       if(student.marks>50){
           return student;
       }
    })
   console.log(arr);
  }
  
  function concatenateArray() {
    //Write your code here, just console.log
    let secondArr=[
      {id:101, name:"Kalvin", age:"20", marks:60},
      {id:115, name:"James", age:"21", marks:47},
      {id:123, name:"Rocky", age:"19", marks:76},
    ]
     // let studentArr=arr.concat(secondArr);
     // console.log(studentArr);
    arr=arr.concat(secondArr);
    console.log(arr);
  }