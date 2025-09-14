# 🌾 Agrinova - Smart Agriculture IoT Platform

**Built with ❤️ by Team The_Debuggers**

Agrinova is a full-stack, modular smart farming ecosystem that integrates **IoT hardware**, **machine learning models**, and a **responsive web dashboard** to enable precision agriculture. From soil nutrient detection to real-time climate monitoring and ML-based crop recommendations — it's all-in-one.


PLANTVILLAGE dataset for crop disease detection : https://www.kaggle.com/datasets/mohitsingh1804/plantvillage

Crop Production dataset : https://www.kaggle.com/datasets/nikhilmahajan29/crop-production-statistics-india

NPK values dataset for crop recommendation : https://www.kaggle.com/datasets/atharvaingle/crop-recommendation-dataset


## 📌 Key Highlights

- 🌱 Real-time **Soil & Environmental Monitoring**
- 📊 Live data visualization via a modern web interface
- 🧠 **ML-driven insights** for smart farming
- ☁️ Seamless **cloud connectivity** via MongoDB Atlas
- 🧩 Modular hardware for plug-and-play sensors

---

## 🧑‍💻 Tech Stack

### 🔷 Frontend

| Technology   | Description                              |
|--------------|------------------------------------------|
| **React.js** | Component-based frontend library         |
| **TypeScript** | Strongly typed JavaScript              |
| **Tailwind CSS** | Utility-first CSS for design         |

---

### 🟩 Backend

| Technology     | Role / Usage                                      |
|----------------|---------------------------------------------------|
| **Node.js**    | Server-side runtime                               |
| **Express.js** | REST API creation                                 |
| **MongoDB**    | NoSQL Database                                    |
| **MongoDB Atlas** | Cloud-hosted database                         |
| **Flask**      | Python-based ML endpoints                         |
| **FastAPI**    | High-performance async Python backend for ML APIs |

---

### 🤖 Machine Learning

| Library / Framework   | Usage                                          |
|------------------------|-----------------------------------------------|
| **TensorFlow**         | Deep learning models                          |
| **Scikit-learn**       | Classification, regression, preprocessing     |
| **Python**             | Core ML scripting and API integration         |

---

### 🔗 API Integration

| API         | Purpose                          |
|-------------|----------------------------------|
| **Gemini**  | AI-based knowledge/insight generation (optional feature) |

---

## 🔧 Hardware Tech Stack

### 🧠 Central Processing & Connectivity

| Component          | Details                                                                 |
|--------------------|-------------------------------------------------------------------------|
| **Microcontroller** | ESP32-WROOM-32 Dev Kit V1                                               |
| **Processor**       | Dual-core Xtensa LX6 32-bit                                             |
| **Connectivity**    | Integrated 2.4 GHz Wi-Fi (802.11 b/g/n)                                 |
| **Language**        | Programmed in **C++**                                                   |

---

### 🌱 Sensor Suite & Protocols

| Sensor Type                | Sensor Name                            | Parameters                              | Interface           |
|----------------------------|----------------------------------------|------------------------------------------|---------------------|
| **Soil Multiparameter**    | JXBS-3001-TR                           | Soil pH, EC, Temperature                 | RS485 (Modbus via MAX485) |
| **Macronutrient Sensor**   | RS485 NPK Sensor (3-Prong)             | Nitrogen, Phosphorus, Potassium (NPK)   | RS485 Modbus        |
| **Air Conditions**         | DHT22 / AM2302                         | Air Temperature, Humidity               | 1-Wire Digital       |
| **Soil Moisture Sensor**   | Capacitive Soil Moisture Sensor v1.2   | Volumetric Water Content                | Analog              |

---

### 📟 Local Display & Interface

| Component             | Description                                      |
|------------------------|--------------------------------------------------|
| **OLED Display**       | SSD1306 - 0.96 inch, 128x64 pixels, I2C Interface |

---

### ⚡ Power Management

| Component                     | Description                                             |
|-------------------------------|---------------------------------------------------------|
| **Power Architecture**        | Dual 12V DC input with dedicated voltage regulators     |
| **Voltage Regulators**        | LM2596 (5V), AMS1117 (3.3V)                             |
| **Distribution Board**        | Custom-built board for clean, isolated power delivery   |

---

### 🔩 Assembly & Structure

| Component         | Description                                   |
|-------------------|-----------------------------------------------|
| **Main Board**     | Perfboard with soldered connections           |
| **Connectors**     | Screw terminals, Dupont connectors            |
| **Enclosure**      | Custom protective case for field deployment  |


## 👥 Team Agrinova
 Debashmita 
 Sayanika
 Suraj
 Sayantan
 Debarghya
 
