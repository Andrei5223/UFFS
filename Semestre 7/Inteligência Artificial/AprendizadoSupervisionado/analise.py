# Trabalho de Aprendizagem Supervisionada
# Classificação de desempenho estudantil com Árvores de Decisão e Redes Neurais

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OrdinalEncoder
from sklearn.impute import SimpleImputer
from sklearn.tree import DecisionTreeClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import accuracy_score, ConfusionMatrixDisplay, classification_report
import matplotlib.pyplot as plt

# 1. Carregamento do dataset
df = pd.read_csv("Student_performance_data _.csv")

# 2. Análise inicial
def resumo_inicial(df):
    print("Amostras:", df.shape[0])
    print("Atributos:", df.shape[1])
    print("Tipos de atributos:\n", df.dtypes)
    print("\nResumo estatístico dos atributos numéricos:")
    print(df.describe())

resumo_inicial(df)

# 3. Limpeza dos dados
# Remove colunas irrelevantes para o modelo (ID)
df.drop(columns=["StudentID"], inplace=True)

# 4. Tratamento de dados ausentes
imputer = SimpleImputer(strategy="most_frequent")
df_imputed = pd.DataFrame(imputer.fit_transform(df), columns=df.columns)

# 5. Codificação de atributos categóricos
cat_cols = ["Gender", "Ethnicity", "ParentalEducation", "Tutoring",
            "ParentalSupport", "Extracurricular", "Sports", "Music", "Volunteering"]
ord_enc = OrdinalEncoder()
df_imputed[cat_cols] = ord_enc.fit_transform(df_imputed[cat_cols])

# 6. Padronização dos dados para RNA
X = df_imputed.drop("GradeClass", axis=1)
y = df_imputed["GradeClass"].astype(int)

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# 7. Divisão dos dados
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, train_size=0.7, random_state=42)

# 8. Treinamento dos modelos
## Árvore de Decisão
dt = DecisionTreeClassifier(max_depth=6, random_state=42)
dt.fit(X_train, y_train)
dt_preds = dt.predict(X_test)

## Rede Neural (MLP)
mlp = MLPClassifier(hidden_layer_sizes=(64, 32), max_iter=300, random_state=42)
mlp.fit(X_train, y_train)
mlp_preds = mlp.predict(X_test)

# 9. Avaliação dos modelos
def avaliar_modelo(nome, y_true, y_pred):
    print(f"\nModelo: {nome}")
    print("Acurácia:", accuracy_score(y_true, y_pred))
    print("Relatório de classificação:")
    print(classification_report(y_true, y_pred))
    ConfusionMatrixDisplay.from_predictions(y_true, y_pred)
    plt.title(f"Matriz de confusão - {nome}")
    plt.show()

avaliar_modelo("Árvore de Decisão", y_test, dt_preds)
avaliar_modelo("Rede Neural (MLP)", y_test, mlp_preds)
