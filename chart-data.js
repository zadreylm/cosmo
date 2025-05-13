let maps = {};
let markers = {};
let charts = {};

const boxes = [
  { id: '5c4eee5235809500190463cc', containerId: 'box1' },
  { id: '6059ff56b0d28d001c13917b', containerId: 'box2' }
];

async function fetchAndRenderAll() {
  for (const box of boxes) {
    await fetchAndRenderBox(box.id, box.containerId);
  }
}

async function fetchAndRenderBox(boxId, containerId) {
  const res = await fetch(`https://api.opensensemap.org/boxes/${boxId}`);
  const data = await res.json();
  renderBox(data, containerId);
}

function renderBox(data, containerId) {
  const lat = data.loc[0].geometry.coordinates[1];
  const lng = data.loc[0].geometry.coordinates[0];
  const name = data.name;

  const sensors = data.sensors
    .filter(s => s.lastMeasurement && s.lastMeasurement.value)
    .map(s => ({
      title: s.title,
      value: parseFloat(s.lastMeasurement.value),
      unit: s.unit
    }));

  const container = document.getElementById(containerId);

  // Only inject HTML the first time
  if (!maps[containerId]) {
    container.innerHTML = `
      <div class="card mb-4">
        <div class="card-header bg-primary text-white">
          <h5>${name}</h5>
        </div>
        <div class="card-body"><div id="map-${containerId}" style="height: 300px;"></div></div>
      </div>

      <div class="card mb-4">
        <div class="card-header bg-success text-white">Sensor Data</div>
        <div class="card-body"><canvas id="chart-${containerId}"></canvas></div>
      </div>
    `;

    maps[containerId] = L.map(`map-${containerId}`).setView([lat, lng], 14);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(maps[containerId]);
    markers[containerId] = L.marker([lat, lng]).addTo(maps[containerId]);
  } else {
    maps[containerId].setView([lat, lng]);
    markers[containerId].setLatLng([lat, lng]);
  }

  // Update chart
  const ctx = document.getElementById(`chart-${containerId}`).getContext("2d");
  if (charts[containerId]) charts[containerId].destroy();
  charts[containerId] = new Chart(ctx, {
    type: "bar",
    data: {
      labels: sensors.map(s => s.title),
      datasets: [{
        label: "Sensor Values",
        data: sensors.map(s => s.value),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      }],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Values' }
        }
      }
    }
  });
}

fetchAndRenderAll();
setInterval(fetchAndRenderAll, 10000);
