import { useEffect, useState } from "react";
import SimulateRealTimeData from "./SimulateRealTimeData";

// Create an interface of the object's data type for the sensor's data.
interface MyDataType {
    sensorId: string;
    timestamp: string;
    airQuality: number;
    temperature: number;
    humidity: number;
}

const Dashboard = () => {
    // Create a few state variables.
    // data is used to hold the full list of sensor data that is accumulated over time while
    // dataToDisplay is used to hold the currently filtered, sorted, and/or paginated data for display.
    const [data, setData] = useState<MyDataType[]>([]);
    const [dataToDisplay, setDataToDisplay] = useState<MyDataType[]>([]);
    const [sortOrder, setSortOrder] = useState("Timestamp");
    const [humidityLowerBound, setHumidityLowerBound] = useState("");
    const [humidityUpperBound, setHumidityUpperBound] = useState("");
    const [temperatureLowerBound, setTemperatureLowerBound] = useState("");
    const [temperatureUpperBound, setTemperatureUpperBound] = useState("");
    const [airQualityLowerBound, setAirQualityLowerBound] = useState("");
    const [airQualityUpperBound, setAirQualityUpperBound] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // Simulate incoming sensor data every second and append it to the current data.
    useEffect(() => {
        const stopSimulation = SimulateRealTimeData(
            100,
            1000,
            (updates: MyDataType[]) => {
                setData((data) => [...updates, ...data]);
                setTotalPages(totalPages + 10);
            }
        );
        return () => stopSimulation();
    }, [totalPages]);

    useEffect(() => {
        // Create a filter function for humidity
        function filterByHumidity(obj: MyDataType) {
            // We first check to make sure that the user inputs a valid input (a number)
            // so that it does not mess up the data that is shown. We then return whether
            // or not <obj>.humidity is within the upper and lower bounds of the humidity.
            if (!humidityLowerBound) {
                if (Number.isNaN(Number(humidityUpperBound))) {
                    setHumidityUpperBound("");
                } else {
                    return obj.humidity <= Number(humidityUpperBound);
                }
            } else if (!humidityUpperBound) {
                if (Number.isNaN(Number(humidityLowerBound))) {
                    setHumidityLowerBound("");
                } else {
                    return obj.humidity >= Number(humidityLowerBound);
                }
            } else {
                if (Number.isNaN(Number(humidityLowerBound))) {
                    setHumidityLowerBound("");
                }

                if (Number.isNaN(Number(humidityUpperBound))) {
                    setHumidityUpperBound("");
                }

                if (
                    Number(humidityLowerBound) <= obj.humidity &&
                    obj.humidity <= Number(humidityUpperBound)
                ) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        // Create a filter function for temperature
        function filterByTemperature(obj: MyDataType) {
            // We first check to make sure that the user inputs a valid input (a number)
            // so that it does not mess up the data that is shown. We then return whether
            // or not <obj>.temperature is within the upper and lower bounds of the temperature.
            if (!temperatureLowerBound) {
                if (Number.isNaN(Number(temperatureUpperBound))) {
                    setTemperatureUpperBound("");
                } else {
                    return obj.temperature <= Number(temperatureUpperBound);
                }
            } else if (!temperatureUpperBound) {
                if (Number.isNaN(Number(temperatureLowerBound))) {
                    setTemperatureLowerBound("");
                } else {
                    return obj.temperature >= Number(temperatureLowerBound);
                }
            } else {
                if (Number.isNaN(Number(temperatureLowerBound))) {
                    setTemperatureLowerBound("");
                }

                if (Number.isNaN(Number(temperatureUpperBound))) {
                    setTemperatureUpperBound("");
                }

                if (
                    Number(temperatureLowerBound) <= obj.temperature &&
                    obj.temperature <= Number(temperatureUpperBound)
                ) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        // Create a filter function for air quality
        function filterByAirQuality(obj: MyDataType) {
            // We first check to make sure that the user inputs a valid input (a number)
            // so that it does not mess up the data that is shown. We then return whether
            // or not <obj>.temperature is within the upper and lower bounds of the temperature.
            if (!airQualityLowerBound) {
                if (Number.isNaN(Number(airQualityUpperBound))) {
                    setAirQualityUpperBound("");
                } else {
                    return obj.airQuality <= Number(airQualityUpperBound);
                }
            } else if (!airQualityUpperBound) {
                if (Number.isNaN(Number(airQualityLowerBound))) {
                    setAirQualityLowerBound("");
                } else {
                    return obj.airQuality >= Number(airQualityLowerBound);
                }
            } else {
                if (Number.isNaN(Number(airQualityLowerBound))) {
                    setAirQualityLowerBound("");
                }

                if (Number.isNaN(Number(airQualityUpperBound))) {
                    setAirQualityUpperBound("");
                }

                if (
                    Number(airQualityLowerBound) <= obj.airQuality &&
                    obj.airQuality <= Number(airQualityUpperBound)
                ) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        // We sort the data based on the selected sort order from the user.
        let newData = [...data];
        if (sortOrder === "Humidity: Ascending") {
            newData.sort((a, b) => a.humidity - b.humidity);
        } else if (sortOrder === "Humidity: Descending") {
            newData.sort((a, b) => b.humidity - a.humidity);
        } else if (sortOrder === "Temperature: Ascending") {
            newData.sort((a, b) => a.temperature - b.temperature);
        } else if (sortOrder === "Temperature: Descending") {
            newData.sort((a, b) => b.temperature - a.temperature);
        } else if (sortOrder === "Air Quality: Ascending") {
            newData.sort((a, b) => a.airQuality - b.airQuality);
        } else if (sortOrder === "Air Quality: Descending") {
            newData.sort((a, b) => b.airQuality - a.airQuality);
        }

        // We filter the data based on the applied filters by the user.
        const humidityFilterNotActive =
            !humidityLowerBound && !humidityUpperBound;
        const temperatureFilterNotActive =
            !temperatureLowerBound && !temperatureUpperBound;
        const airQualityFilterNotActive =
            !airQualityLowerBound && !airQualityUpperBound;

        if (!humidityFilterNotActive) {
            newData = newData.filter(filterByHumidity);
        }

        if (!temperatureFilterNotActive) {
            newData = newData.filter(filterByTemperature);
        }

        if (!airQualityFilterNotActive) {
            newData = newData.filter(filterByAirQuality);
        }

        const sensorsPerPage = 10;
        const lastIndex = sensorsPerPage * currentPage;
        const firstIndex = lastIndex - sensorsPerPage;
        setDataToDisplay(newData.slice(firstIndex, lastIndex));
    }, [
        data,
        sortOrder,
        humidityLowerBound,
        humidityUpperBound,
        temperatureLowerBound,
        temperatureUpperBound,
        airQualityLowerBound,
        airQualityUpperBound,
        currentPage,
    ]);

    return (
        <div className="huge-container">
            <label htmlFor="filtering">Filters: </label>
            <form>
                <input
                    placeholder="Humidity Lower Bound (30%)"
                    value={humidityLowerBound}
                    onChange={(event) => {
                        setHumidityLowerBound(event.target.value);
                    }}
                />
                <input
                    placeholder="Humidity Upper Bound (90%)"
                    value={humidityUpperBound}
                    onChange={(event) => {
                        setHumidityUpperBound(event.target.value);
                    }}
                />
                <input
                    placeholder="Temperature Lower Bound (10°C)"
                    value={temperatureLowerBound}
                    onChange={(event) => {
                        setTemperatureLowerBound(event.target.value);
                    }}
                />
                <input
                    placeholder="Temperature Upper Bound (40°C)"
                    value={temperatureUpperBound}
                    onChange={(event) => {
                        setTemperatureUpperBound(event.target.value);
                    }}
                />
                <input
                    placeholder="Air Quality Lower Bound (0 AQI)"
                    value={airQualityLowerBound}
                    onChange={(event) => {
                        setAirQualityLowerBound(event.target.value);
                    }}
                />
                <input
                    placeholder="Air Quality Upper Bound (200 AQI)"
                    value={airQualityUpperBound}
                    onChange={(event) => {
                        setAirQualityUpperBound(event.target.value);
                    }}
                />
            </form>
            <button
                onClick={() => {
                    setHumidityLowerBound("");
                    setHumidityUpperBound("");
                    setTemperatureLowerBound("");
                    setTemperatureUpperBound("");
                    setAirQualityLowerBound("");
                    setAirQualityUpperBound("");
                }}
            >
                Clear All Filters
            </button>
            <div className="container">
                <div className="container-1">
                    <label htmlFor="sorting">Sort By: </label>
                    <select
                        name="Sort By"
                        id="sorting"
                        onChange={(event) => {
                            if (event.target.value === "Timestamp") {
                                setSortOrder("Timestamp");
                            } else if (
                                event.target.value === "Humidity: Ascending"
                            ) {
                                setSortOrder("Humidity: Ascending");
                            } else if (
                                event.target.value === "Humidity: Descending"
                            ) {
                                setSortOrder("Humidity: Descending");
                            } else if (
                                event.target.value === "Temperature: Ascending"
                            ) {
                                setSortOrder("Temperature: Ascending");
                            } else if (
                                event.target.value === "Temperature: Descending"
                            ) {
                                setSortOrder("Temperature: Descending");
                            } else if (
                                event.target.value === "Air Quality: Ascending"
                            ) {
                                setSortOrder("Air Quality: Ascending");
                            } else {
                                setSortOrder("Air Quality: Descending");
                            }
                        }}
                    >
                        <option value="Timestamp">Timestamp</option>
                        <option value="Humidity: Ascending">
                            Humidity: Ascending
                        </option>
                        <option value="Humidity: Descending">
                            Humidity: Descending
                        </option>
                        <option value="Temperature: Ascending">
                            Temperature: Ascending
                        </option>
                        <option value="Temperature: Descending">
                            Temperature: Descending
                        </option>
                        <option value="Air Quality: Ascending">
                            Air Quality: Ascending
                        </option>
                        <option value="Air Quality: Descending">
                            Air Quality: Descending
                        </option>
                    </select>
                </div>
                <div className="container-2">
                    <table>
                        <thead>
                            <tr>
                                <th>Sensor ID</th>
                                <th>Timestamp</th>
                                <th>Humidity</th>
                                <th>Temperature</th>
                                <th>Air Quality</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataToDisplay.map((item) => (
                                <tr>
                                    <td>{item.sensorId}</td>
                                    <td>{item.timestamp}</td>
                                    <td>{item.humidity}</td>
                                    <td>{item.temperature}</td>
                                    <td>{item.airQuality}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <nav>
                    <button
                        onClick={() => {
                            if (currentPage == 1) {
                                return;
                            } else {
                                setCurrentPage(currentPage - 1);
                            }
                        }}
                    >
                        &lt;
                    </button>
                    <input
                        className="page-display"
                        value={currentPage}
                        onChange={(e) => {
                            if (e.target.value === "") {
                                setCurrentPage(0);
                            } else {
                                const num = Number(e.target.value);
                                if (!Number.isNaN(num) && num > 0) {
                                    setCurrentPage(num);
                                }
                            }
                        }}
                    />

                    <button onClick={() => setCurrentPage(currentPage + 1)}>
                        &gt;
                    </button>
                    <p>Total Pages: {totalPages}</p>
                </nav>
            </div>
        </div>
    );
};

export default Dashboard;
