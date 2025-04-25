import matplotlib.pyplot as plt  # Added to replace seaborn for heatmap visualization
import pandas as pd
import seaborn as sns
from sklearn.preprocessing import MinMaxScaler

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.

if __name__ == '__main__':
    # Reading a CSV file using pandas
    csv_file_path = './healthcare-dataset-stroke-data.csv'
    data = pd.read_csv(csv_file_path)

    # Retain only Residence_type and ever_married as numeric/boolean
    data['Residence_type'] = data['Residence_type'].map({'Urban': 1, 'Rural': 0})
    data['ever_married'] = data['ever_married'].map({'Yes': 1, 'No': 0})

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

    # Compute the correlation matrix
    correlation_matrix = data.corr()

    print("\n===== CORRELATION MATRIX =====")
    print(correlation_matrix)

    # Visualize the correlation matrix as a heatmap using seaborn
    print("\n===== CORRELATION MATRIX HEATMAP =====")
    plt.figure(figsize=(12, 10))  # Adjust the figure size as necessary
    sns.heatmap(correlation_matrix, annot=True, fmt=".2f", cmap="coolwarm", cbar=True,
                xticklabels=correlation_matrix.columns, yticklabels=correlation_matrix.columns)
    plt.xticks(rotation=90)
    plt.yticks(rotation=0)
    plt.show()
