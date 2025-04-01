import sys
import json
import pandas as pd
import numpy as np
import pickle

# Load pre-trained model and encoders
model = pickle.load(open('machineLearning/real_estate_model.pkl', 'rb'))
label_encoder_city = pickle.load(open('machineLearning/label_encoder_city.pkl', 'rb'))
label_encoder_property_type = pickle.load(open('machineLearning/label_encoder_property_type.pkl', 'rb'))

# Load input data
input_data = json.loads(sys.argv[1])

# Prepare the input data
input_df = pd.DataFrame([input_data])

# Encode categorical features
input_df['city'] = label_encoder_city.transform(input_df['city'])
input_df['property_type'] = label_encoder_property_type.transform(input_df['property_type'])

# Feature engineering (same as during training)
city_avg_price_per_m2 = pickle.load(open('machineLearning/city_avg_price_per_m2.pkl', 'rb'))
input_df['city_avg_price_per_m2'] = input_df['city'].replace(city_avg_price_per_m2)
input_df['bedrooms_per_m2'] = input_df['bedrooms'] / input_df['square_meter']
input_df['bathrooms_per_m2'] = input_df['bathrooms'] / input_df['square_meter']

# Prepare the features (same as during training)
features = ['city', 'square_meter', 'property_type', 'bedrooms', 'bathrooms', 'living_rooms', 'balconies', 'parking_spaces', 'city_avg_price_per_m2', 'bedrooms_per_m2', 'bathrooms_per_m2']
input_data_processed = input_df[features]

# Make the prediction
predicted_log_price = model.predict(input_data_processed)
predicted_price = np.exp(predicted_log_price)  # Convert from log scale to actual price

# Calculate fair pricing margin (10% margin as per your original logic)
margin = 0.1
actual_price = input_data['price']  # Assuming the 'price' field is included in input_data

# Define price status function (underpriced, fairly priced, overpriced)
def get_price_status(actual_price, predicted_price, margin):
    margin_price = predicted_price * margin
    if actual_price < (predicted_price - margin_price):
        return 1  # Underpriced
    elif actual_price > (predicted_price + margin_price):
        return -1  # Overpriced
    else:
        return 0  # Fairly priced

# Get price status
price_status = get_price_status(actual_price, predicted_price[0], margin)

# Prepare the response as JSON
response = {
    'predicted_price': predicted_price[0],
    'price_status': "Underpriced" if price_status == 1 else "Overpriced" if price_status == -1 else "Fairly Priced"
}

# Output the response as a JSON string
print(json.dumps(response))
