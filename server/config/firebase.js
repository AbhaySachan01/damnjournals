import admin from 'firebase-admin';
import { readFile } from 'fs/promises';

// Read JSON file in ES Modules
// const serviceAccount = JSON.parse(
//   await readFile(new URL('./serviceAccountKey.json', import.meta.url))
// );

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

export default admin;