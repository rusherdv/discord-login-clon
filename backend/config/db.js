import mysql from 'mysql'

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: '3306', // Añade el puerto si no estás utilizando el predeterminado
  user: 'root',
  password: '',
  database: 'discord-clon'
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});

// Exportar el objeto de conexión
export default connection