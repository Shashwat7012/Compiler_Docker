export const PYTHON_IMAGE =  "python:3.8-slim"; // pyhton
export const JAVA_IMAGE = 'openjdk:11-jdk-slim'; // java
export const CPP_IMAGE = 'gcc:latest'; // cpp


export const DOCKER_STREAM_HEADER_SIZE = 8; // size of header in docker stream :- by default 8 bytes
// this header include the information about the type of the stream :- output stream, header stream, length of the corresponding data