<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SenseBox Dashboard – Multiple Countries</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
  <style>
    #map-box1, #map-box2 {
      height: 300px;
      width: 100%;
      border-radius: 8px;
    }
  </style>
</head>
<body>

<?php include 'menu.php'; ?>

<div class="container mt-4">
  <h3>SenseBox 1 (Germany)</h3>
  <div id="box1"></div>

  <hr>

  <h3>SenseBox 2 (Another Country)</h3>
  <div id="box2"></div>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<script src="chart-data.js"></script>
</body>
</html>
