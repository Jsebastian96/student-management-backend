const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Middleware
app.use(express.json());
app.use(cors());

// Importar rutas
const studentRoutes = require('./routes/students');
const subjectRoutes = require('./routes/subjects');
const courseRoutes = require('./routes/courses');
const enrollmentRoutes = require('./routes/enrollments');

// Usar rutas
app.use('/api/estudiantes', studentRoutes);
app.use('/api/asignaturas', subjectRoutes);
app.use('/api/materias', courseRoutes); 
app.use('/api/inscripciones', enrollmentRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
