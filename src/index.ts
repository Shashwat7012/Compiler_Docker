import bodyParser from "body-parser";
import express, { Express } from "express";

import bullBoardAdapter from "./config/bullBoaredConfig";
import serverConfig from "./config/serverConfig";
import runCpp from "./containers/runCpp";
// import runJava from "./containers/runJavaDocker";
// import runPython from "./containers/runPythonDocker";
import apiRouter from "./routes";
import SampleWorker from "./workers/SampleWorker";



const app: Express = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/api', apiRouter);
app.use('/ui', bullBoardAdapter.getRouter());

app.listen(serverConfig.PORT, () => {
  console.log(`Server started at *:${serverConfig.PORT}`);

  console.log(`BullBoard dashboard running on: http://localhost:${serverConfig.PORT}/ui`);

  SampleWorker('SampleQueue');

  //python
  
//   const code = `
// x = input()
// y = input()
// print("value of x is ",x)
// print("value of y is ",y)

//   `;


//   const inputCase = `100
//   200`;
//   runPython(code,inputCase);


  // java

//   const code = `
//   import java.util.*;

// public class Main {
//     public static void main(String[] args) {
//         Scanner scn = new Scanner(System.in);
//         int input = scn.nextInt();
//         System.out.println("Input value given by user: " + input);

//         for (int i = 0; i < input; i++) {
//             System.out.println(i);
//         }

//         scn.close(); 
//     }
// }


//   `;

//   const inputCase = `10`;

//   runJava(code,inputCase);



// c++

const userCode = `
  
    class Solution {
      public:
      vector<int> permute() {
          vector<int> v;
          v.push_back(10);
          return v;
      }
    };
  `;

  const code = `
  #include<iostream>
  #include<vector>
  #include<stdio.h>
  using namespace std;
  
  ${userCode}

  int main() {

    Solution s;
    vector<int> result = s.permute();
    for(int x : result) {
      cout<<x<<" ";
    }
    cout<<endl;
    return 0;
  }
  `;

const inputCase = `10`;





  runCpp(code,inputCase);



});