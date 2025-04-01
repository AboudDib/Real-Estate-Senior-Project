const { exec } = require('child_process');

class MlService {
    static async getPrediction(inputData) {
        return new Promise((resolve, reject) => {
            const dataString = JSON.stringify(inputData);

            // Escape the data string to prevent issues with quotes
            const escapedDataString = dataString.replace(/"/g, '\\"');

            exec(`python ./machineLearning/predict.py "${escapedDataString}"`, (error, stdout, stderr) => {
                if (error) {
                    reject(`Error executing Python script: ${error.message}`);
                }
                if (stderr) {
                    reject(`stderr: ${stderr}`);
                }

                try {
                    const result = JSON.parse(stdout);
                    resolve(result);  // Return both predicted price and status
                } catch (parseError) {
                    reject(`Error parsing Python script output: ${parseError.message}`);
                }
            });
        });
    }
}

module.exports = MlService;
