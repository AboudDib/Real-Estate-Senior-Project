const MlService = require('../services/mlService');

class MlController {
    static async predict(req, res) {
        const inputData = req.body;

        try {
            // Get the prediction result from the MlService
            const result = await MlService.getPrediction(inputData);
            
            // Send back the full result (both predicted price and price status)
            res.json(result); 
        } catch (error) {
            console.error(`Prediction error: ${error}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = MlController;
