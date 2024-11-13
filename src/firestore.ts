import { config } from "./config";
import { Firestore } from '@google-cloud/firestore';

export default new Firestore({
  projectId: config.firestoreProjectID, 
});
