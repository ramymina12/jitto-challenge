export const SimulateRealTimeData = (
    sensorCount: number,
    interval: number,
    onUpdate: Function
) => {
    const generateMetrics = (sensorId: string) => ({
        sensorId: sensorId,
        timestamp: new Date().toISOString(),
        airQuality: +(Math.random() * 200).toFixed(2), // 0-200 AQI (Good to Moderate)
        temperature: +(10 + Math.random() * 30).toFixed(2), // 10-40°C
        humidity: +(30 + Math.random() * 60).toFixed(2), // 30-90% RH
    });

    const intervalId = setInterval(() => {
        const updates = Array.from({ length: sensorCount }, (_, i) =>
            generateMetrics(`Sensor-${i + 1}`)
        );
        onUpdate(updates);
    }, interval);

    return () => clearInterval(intervalId);
};
export default SimulateRealTimeData;
