# Live Greenhouse Sensor Dashboard

A React + TypeScript application that visualizes live data from greenhouse sensors. It provides interactive features such as filtering, sorting, and pagination, allowing user to monitor air quality, temperature, and humidity in an efficient manner.

## Features

-   **Real-Time Data:** Displays incoming sensor data live using a simulated stream.
-   **Sorting:** Users can sort data by timestamp (most recent first), humidity, temperature, and air quality, both in descending and ascending order.
-   **Filtering:** User can set lower and upper bounds to filter data by temperature, humidity, and air quality.
-   **Pagination:** Data is paginated, 10 sensors per page, and updates dynamically as new data arrives.
-   **Graceful Error Handling:** Invalid user inputs (non-numeric values for filtering and page number) are cleared automatically to maintain data integrity.
-   **Responsive Design:** Works flawlessly on both desktop and mobile devices.

## Project Structure

 - Dashboard.tsx **_(Main Dashboard Component)_**
 - SimulateRealTimeData.tsx **_(Simulates live sensor data feed)_**
 - app.css
 - main.tsx

## Performance Analysis

**Efficient State Management**

-   `data`: full stream of sensor readings
-   `dataToDisplay`: filtered/sorted/paginated data to show to the user
    This decoupling ensures that heavy operations like filtering and sorting don't block new updates.

**Smart Filtering**

-   Each filter checks for valid input and clears bad entries right away.
-   Filters run sequentially in a memoized useEffect that is triggered only when its dependencies change.

**Memory Usage**

-   Memory grows over time as sensor data accumulates.
-   Memory growth is expected for real-time data storage.
-   UI remains responsive due to efficient pagination and rendering.

**Update Speed**

-   Each update handles 100 new records of sensor data per second.
-   Dashboard maintains smooth performance without UI lag.
