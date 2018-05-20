import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

const CLIENTS_COLLECTION = 'Clients';
const MILESTONE_COLLECTION = 'Milestones';
const EXERCISE_COLLECTION = 'Exercises';
const ASSIGNED_EXERCISE_COLLECTION = 'AssignedExercises';

exports.onExerciseUpdated = functions.firestore.document(`${EXERCISE_COLLECTION}/{uid}`).onUpdate(event => {
  const updatedExerciseRef = event.after.ref;

  console.log('Checking if updated exercise is assigned to any clients... Please stand by');
  // Check Assigned Exercise collection if exercise was previously assigned to a client
  return admin.firestore().collection(ASSIGNED_EXERCISE_COLLECTION)
    .where('exerciseUid', '==', updatedExerciseRef.id)
    .get()
    .then(assignedExerciseQuery => {
        // If we find any clients with the exercise assigned
        if (assignedExerciseQuery.size > 0) {
          console.log(`Found ${assignedExerciseQuery.size} clients with updated exercise assigned, updating clients rehabilitation plan!`);
          // For each found AssignedExercise document
          assignedExerciseQuery.docs.forEach(assignedExerciseSnapshot => {
            const assignedExercise = assignedExerciseSnapshot.data();
            const updatedExercise = event.after.data();

            // Load client old list of exercises
            admin.firestore()
              .collection(CLIENTS_COLLECTION)
              .where('uid', '==', assignedExercise.clientUid)
              .get()
              .then(clientQuery => {
                const clientWithExercise = clientQuery.docs[0].data();
                // Update list of exercises, so new isn't in list
                const clientExercises = clientWithExercise.rehabilitationPlan.exercises
                  .filter(exercise => exercise.uid !== updatedExercise.uid);

                // Construct partial exercise from updated exercise (only take attributes for patching client doc)
                const updatedPartialExercise = {
                  uid: updatedExercise.uid,
                  title: updatedExercise.title,
                  videoUrl: updatedExercise.videoUrl
                };

                // Add updated exercise
                clientExercises.push(updatedPartialExercise);

                // Create updated data for CLIENT_COLLECTION document
                const newClient = {
                  rehabilitationPlan: {
                    exercises: clientExercises
                  }
                };
                // Update Client document with updated exercise data
                admin.firestore()
                  .doc(`${CLIENTS_COLLECTION}/${assignedExercise.clientUid}`)
                  .set(newClient, {merge: true})
                  .then(() => console.log(`${clientWithExercise.fullName} updated!`));
              });
          });
        } else {
          console.log('Exercise was not assigned to any clients. No update needed');
        }
      }
    );
});


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
    } else {
      console.log('COULD NOT DELETED USER ID: ', uid);
    }
  });
});

// Commented out for possible future awesome reference!
// exports.onClientUpdated = functions.firestore.document('Clients/{clientid}')
//   .onUpdate(result => {
//     // const client = result.after.data() as ClientEntity;
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
