import { config } from "./config";
import { Firestore } from '@google-cloud/firestore';


console.log(config.firestoreProjectID)
export default new Firestore({
  projectId: config.firestoreProjectID, 
});
