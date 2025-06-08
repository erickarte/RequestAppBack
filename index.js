const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


let requests = [];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// rota de get para listar requests
app.get('/requests', (req, res) => {
  res.json(requests);
});

// rota para post de requests
app.post('/requests', upload.single('photo'), (req, res) => {
  console.log('Recebido POST /requests:', req.body);
  const { name, description, latitude, longitude } = req.body;
  const photo = req.file ? req.file.path : null;

const newRequest = {
    id: Date.now(),
    name,
    description,
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    photo
  };
  requests.push(newRequest);
  console.log('Nova reclamação adicionada:', newRequest);

  res.json(newRequest);
});

app.listen(3000, () => console.log('Backend listening on port 3000'));