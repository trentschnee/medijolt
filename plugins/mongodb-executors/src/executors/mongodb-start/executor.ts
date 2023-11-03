import { exec } from 'child_process';
import * as path from 'path';

interface MongodbStartExecutorSchema {
  dockerComposeFilePath?: string;
}

export default async function mongodbStartExecutor(
  options: MongodbStartExecutorSchema
) {
  return new Promise<{ success: boolean }>((resolve, reject) => {
    const dockerComposeFilePath = path.resolve(
      options.dockerComposeFilePath ?? './apps/api-app/docker/docker-compose.yml'
    );

    console.log(`Status: INITIALIZING | File: ${dockerComposeFilePath}`);
    exec(
      `docker-compose -f ${dockerComposeFilePath} up -d`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          reject({ success: false });
          return;
        }

        if (isUnexpectedError(stderr)) {
          console.error(`Status: ERROR | Unexpected Error: ${stderr.toString()}`);
          reject({ success: false });
          return;
        }
        console.log(`Status: RUNNING | File: ${dockerComposeFilePath}`);
        resolve({ success: true });
      }
    );
  });
}

function isUnexpectedError(stderr: string): boolean {
  const nonErrorStrings = [
    "Creating",
    "Created",
    "Starting",
    "Started",
    "is up-to-date", "Running"
  ];

  return nonErrorStrings.every(substring => !stderr.includes(substring));
}
