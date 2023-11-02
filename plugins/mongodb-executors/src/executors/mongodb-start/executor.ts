import { ExecutorContext } from '@nx/devkit';
import { exec } from 'child_process';

import * as path from 'path';
interface MongodbStartExecutorSchema {
  dockerComposeFilePath?: string;
}
export default async function mongodbStartExecutor(
  options: MongodbStartExecutorSchema,
  context: ExecutorContext
) {
  return new Promise<{ success: boolean }>((resolve, reject) => {
    const dockerComposeFilePath = path.resolve(options.dockerComposeFilePath ?? './apps/api-app/docker/docker-compose.yml');

    console.log(`Running docker-compose up using file: ${dockerComposeFilePath}`);
    const dockerProcess = exec(
      `docker-compose -f ${dockerComposeFilePath} up -d`,  // Added '-d' flag for detached mode
      (error, stdout, stderr) => {
        let errorMessage = '';
        let info;
        if (error) {
          errorMessage += `Error: ${error.message}\n`;
        }
        if (stderr) {
          // Check if stderr contains "is up-to-date"
          if (!stderr.includes('is up-to-date')) {
            errorMessage += `Unexpected Error: ${stderr}\n`;
          } else {
            // catch the info message
            info = stderr;
            console.log(stderr);  // Log stderr if "is up-to-date" is found
          }
        }

        if (errorMessage) {
          reject({ success: false });
        } else {
          if (info) {
            stdout = info;
          }
          console.log(`Output: ${stdout}`);
          resolve({ success: true });
        }
      }
    );
  });
}
