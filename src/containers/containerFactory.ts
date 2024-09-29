import Docker from "dockerode";

async function createContainer(imageName: string, cmdExecutable: string[]) // cmdExecutable is a command that is going to execute in a docker container
{
    const docker = new Docker();

//     image - container image
//     cmd - command to be executed
//     stream - stream(s) which will be used for execution output.
//     create_options - (optional) Options used for container creation. Refer to the DockerEngine

    const container = await docker.createContainer({
        Image: imageName,  
        Cmd: cmdExecutable,
        AttachStdin: true, // standard input stream connected
        AttachStdout: true, // output stram connected
        AttachStderr: true, // for error streams
        Tty: false, 
        OpenStdin: true, // keep the input stream open to interaction is there
        

    });

    return container;
}

export default createContainer;