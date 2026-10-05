const fs = require('fs');
let c = fs.readFileSync('d:/Thư mục mới (5)/parago/backend/src/rides/rides.service.ts', 'utf8');
c = c.replace(/seats: data.seats,/g, 'seatsAvailable: data.seats,');
c = c.replace(/vehicleId: data.vehicleId/g, "vehicleType: 'MOTORBIKE'");
fs.writeFileSync('d:/Thư mục mới (5)/parago/backend/src/rides/rides.service.ts', c);
