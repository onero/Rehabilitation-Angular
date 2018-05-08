import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

const CLIENTS_COLLECTION = 'Clients';

exports.onDeleteUser = functions.auth.user().onDelete(event => {
  const uid = event.uid;
  const clientRef = admin.firestore().doc(`${CLIENTS_COLLECTION}/${uid}`);

  // Deletes the client in the collection.
  clientRef.get().then(doc => {
    if (doc.exists) {
      clientRef.delete().then(() => {
        console.log('DELETED USER ID: ', uid);
      });
    } else {
      console.log('COULD NOT DELETED USER ID: ', uid);
    }
  });
});
