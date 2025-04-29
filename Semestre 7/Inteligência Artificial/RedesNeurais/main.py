import matplotlib.pyplot as plt  # Added to replace seaborn for heatmap visualization
import pandas as pd
import seaborn as sns
from sklearn.preprocessing import MinMaxScaler
from sklearn.impute import SimpleImputer
from sklearn.model_selection import train_test_split
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.optimizers import Adam

pd.set_option('display.max_columns', None)
pd.set_option('display.width', None)

if __name__ == '__main__':
    # Reading a CSV file using pandas
    csv_file_path = './healthcare-dataset-stroke-data.csv'
    data = pd.read_csv(csv_file_path)

    # Para dados numéricos (como 'bmi')
    numeric_imputer = SimpleImputer(strategy='mean')
    data['bmi'] = numeric_imputer.fit_transform(data[['bmi']])

    # Remove Unknown values for smoking_status
    data['smoking_status'] = data['smoking_status'].replace('Unknown', np.nan)
    data['smoking_status'] = data['smoking_status'].fillna(data['smoking_status'].mode()[0])

    # Para dados categóricos (como 'smoking_status')
    categorical_imputer = SimpleImputer(strategy='most_frequent')
    data['smoking_status'] = categorical_imputer.fit_transform(data[['smoking_status']]).ravel()

    # Retain only Residence_type and ever_married as numeric/boolean
    data['Residence_type'] = data['Residence_type'].map({'Urban': 1, 'Rural': 0})
    data['ever_married'] = data['ever_married'].map({'Yes': 1, 'No': 0})

    # Display unique values for categorical columns
    categorical_columns = data.select_dtypes(include=['object']).columns
    print("\n===== CATEGORICAL COLUMNS UNIQUE VALUES =====")
    for col in categorical_columns:
        print(f"{col}:", data[col].unique())
    print()

    # Convert remaining categorical variables to dummy variables
    data = pd.get_dummies(data)

    # Normalize data to range [0, 1]
    scaler = MinMaxScaler()
    data[data.columns] = scaler.fit_transform(data[data.columns])
    
    print("===== HEAD (Transformed Data) =====")
    print(data.head())

    print("\n===== INFO =====")
    print(data.info())

    print("\n===== DESCRIPTION =====")
    print(data.describe())

    # Separate features and target
    X = data.drop('stroke', axis=1)
    y = data['stroke']
    
    # Split the dataset into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("\n===== TRAINING SET SIZE =====")
    print(X_train.shape)

    # Create the model
    model = Sequential([
        Dense(64, activation='relu', input_shape=(X_train.shape[1],)),
        Dropout(0.2),
        Dense(32, activation='relu'),
        Dropout(0.2),
        Dense(16, activation='relu'),
        Dense(1, activation='sigmoid')
    ])

    # Compile the model
    model.compile(optimizer=Adam(learning_rate=0.001),
                  loss='binary_crossentropy',
                  metrics=['accuracy'])

    # Train the model
    history = model.fit(X_train, y_train,
                        epochs=50,
                        batch_size=32,
                        validation_split=0.2,
                        verbose=1)

    # Evaluate the model
    test_loss, test_accuracy = model.evaluate(X_test, y_test, verbose=0)
    print(f"\n===== MODEL EVALUATION =====")
    print(f"Test accuracy: {test_accuracy:.4f}")
    print(f"Test loss: {test_loss:.4f}")
