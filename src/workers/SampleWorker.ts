import { Job, Worker } from "bullmq";

import redisConnection from "../config/reddisConfig";
import SampleJob from "../jobs/SampleJob";


export default function SampleWorker(queueName:string){
    new Worker(
        queueName,
        async(job: Job)=>{

            
            // processing
            if(job.name === "SampleJob"){
                const sampleJobInstance = new SampleJob(job.data); // payload :- job.data


                sampleJobInstance.handle(job);

                return true;
            }
        },
        {
            connection : redisConnection
        }
    );
}