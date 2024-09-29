// import Docker from "dockerode";

// import { TestCases } from "../types/testCases";
import { PYTHON_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";



// creating of docker container
async function runPython(code: string, inputTestCase: string ) {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawLogBuffer: Buffer[] =  [];

    console.log("Initializing a new python docker conatiner");

    // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ['python3', '-c', code, 'stty -echo']);// to run python code in terminal python3 -c "code", stty -echo :- when we run the code in docker then normally it will not come that why we use stty -echo :- 
//     1. What Does stty -echo Do?
//  When you cast stty -echo, you’re essentially telling your terminal: “Hey, buddy, keep your mouth shut!” 🤐
// Specifically, it turns off the echoing behavior. Normally, when you type something into the terminal, it dutifully echoes it back to you. But with -echo, it becomes all secretive—no more echoing of your keystrokes.
//     2. Why Would You Use It?
// Imagine you’re typing a super-secret password (like “abracadabra” or “open sesame”). You wouldn’t want it to show up on the screen, right? That’s where -echo comes in handy.
// It’s often used in scenarios where you want to input sensitive information (passwords, PINs, incantations to summon ancient daemons) without leaving traces on the screen.

// for starting/ booting the python docker container or correcponding docker container

const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > test.py && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | python3 test.py`;
        console.log(runCommand);
        // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ['python3', '-c', code, 'stty -echo']); 
        const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
            '/bin/sh', 
            '-c',
            runCommand
        ]);
await pythonDockerContainer.start();

console.log("Started the docker container");

const loggerStream = await pythonDockerContainer.logs({
    stdout: true,
    stderr: true,
    timestamps: false,
    follow: true // whether the logs are streamed or retuned as a string

});

//Attach events on the stream objects to start and stop reading
loggerStream.on('data', (chunk)=>{
    rawLogBuffer.push(chunk);
});

await new Promise((res)=>{
    loggerStream.on('end', ()=>{
        console.log(rawLogBuffer);
        const completeBuffer = Buffer.concat(rawLogBuffer); //all the chunks can concatinate one by one
        const decodedStream = decodeDockerStream(completeBuffer);
        console.log(decodedStream);
        console.log(decodedStream.stdout);
        res(decodedStream);
    });
});

await pythonDockerContainer.remove();


return pythonDockerContainer;
}



export default runPython;