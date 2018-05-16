"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const CLIENTS_COLLECTION = 'Clients';
const MILESTONE_COLLECTION = 'Milestones';
exports.onDeleteUser = functions.auth.user().onDelete(event => {
  const uid = event.uid;
  const clientRef = admin.firestore().doc(`${CLIENTS_COLLECTION}/${uid}`);
  // Delete milestones from client
  admin.firestore().collection(MILESTONE_COLLECTION)
    .where('clientUid', '==', uid)
    .get()
    .then(querySnapshot => {
      // Check if client has milestones
      if (querySnapshot.size > 0) {
        console.log('Starting to delete milestones');
        querySnapshot.docs.forEach(milestone => {
          milestone.ref.delete();
        });
        console.log('Deleted all milestones for client!');
      } else {
        console.log('Could not find milestones... :(');
      }
    })
    .catch(() => {
      console.log('Error getting milestones');
    });
  // Deletes the client in the collection.
  clientRef.get().then(doc => {
    if (doc.exists) {
      clientRef.delete().then(() => {
        console.log('DELETED USER ID: ', uid);
      });
    }
    else {
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
//# sourceMappingURL=index.js.map
