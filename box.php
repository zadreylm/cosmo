<!-- box.php -->
<?php
$apiUrl = "https://api.opensensemap.org/boxes/5c4eee5235809500190463cc";
$response = file_get_contents($apiUrl);
$data = json_decode($response, true);

if (!$data) {
    echo "<div class='alert alert-danger'>Unable to fetch data.</div>";
    return;
}

$lat = $data['loc'][0]['geometry']['coordinates'][1];
$lng = $data['loc'][0]['geometry']['coordinates'][0];
$name = htmlspecialchars($data['name']);

echo "<div class='card mb-4'>
        <div class='card-header bg-primary text-white'>
            <h5>$name</h5>
        </div>
        <div class='card-body'>
            <div id='map'></div>
        </div>
      </div>";

// Prepare chart data
$chartData = [];
foreach ($data['sensors'] as $sensor) {
    $title = $sensor['title'];
    $value = $sensor['lastMeasurement']['value'] ?? null;
    $unit = $sensor['unit'] ?? '';
    if ($value !== null) {
        $chartData[] = [
            'title' => $title,
            'value' => $value,
            'unit' => $unit
        ];
    }
}

// Embed chart data as JavaScript
echo "<script>
    const chartSensors = " . json_encode($chartData) . ";
    const mapLat = $lat;
    const mapLng = $lng;
</script>";

// Chart canvas
echo "<div class='card mb-4'>
        <div class='card-header bg-success text-white'>Sensor Data</div>
        <div class='card-body'>
            <canvas id='sensorChart'></canvas>
        </div>
      </div>";
?>
