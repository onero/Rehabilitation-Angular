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

// Commented out for possible future awesome reference!
// exports.onClientUpdated = functions.firestore.document('Clients/{clientid}')
//   .onUpdate(result => {
//     // const client = result.after.data() as ClientModel;
//     const lengthBefore = result.before.data().rehabilitationPlan.exerciseIds.length;
//     const lengthAfter = result.after.data().rehabilitationPlan.exerciseIds.length;
//     if (lengthAfter > lengthBefore) {
//       const user = result.after.data();
//       console.log('User data', user);
//       const msg = {
//         to: user.email,
//         from: 'noreply@d4ff-rehabilitation.firebaseapp.com',
//         subject: 'New Exercise',
//         text: `Hey ${user.fullName}. You have a new exercise!!!`,
//         html: `<strong>Hey ${user.fullName}. You have a new exercise!!!</strong>`
//       };
//       return sgMail.send(msg)
//         .then(() => {
//           console.log('Mail sent!');
//         })
//         .catch((err) => {
//           console.error('Error sending mail', err);
//         });
//     } else {
//       return Promise.resolve('Exercise removed');
//     }
//   });
