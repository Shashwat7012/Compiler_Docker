import { Queue } from "bullmq";

import redisConnection from "../config/reddisConfig";

export default new Queue('SampleQueue', {connection: redisConnection});

