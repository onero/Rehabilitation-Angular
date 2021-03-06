import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

const CLIENTS_COLLECTION = 'Clients';
const MILESTONE_COLLECTION = 'Milestones';
const EXERCISE_COLLECTION = 'Exercises';
const ASSIGNED_EXERCISE_COLLECTION = 'AssignedExercises';

exports.onClientDeletedFromFirestore = functions.firestore.document(`${CLIENTS_COLLECTION}/{uid}`).onDelete(event => {
  const deletedClientRef = event.ref;

  console.log('Starting to delete client from Authentication. Please hold on...');
  return admin.auth().deleteUser(deletedClientRef.id)
    .then(() => {
      console.log('Deleted client from Firestore');
    });
});

exports.onExerciseDeleted = functions.firestore.document(`${EXERCISE_COLLECTION}/{uid}`).onDelete(event => {
  const deletedExerciseRef = event.ref;
  // Check Assigned Exercise collection if exercise was previously assigned to a client
  return admin.firestore().collection(ASSIGNED_EXERCISE_COLLECTION)
    .where('exerciseUid', '==', deletedExerciseRef.id)
    .get()
    .then(assignedExerciseQuery => {
      // If we find any clients with the exercise assigned
      if (assignedExerciseQuery.size > 0) {
        console.log(`Found ${assignedExerciseQuery.size} clients with updated exercise assigned, updating clients rehabilitation plan!`);
        // For each found AssignedExercise document
        assignedExerciseQuery.docs.forEach(assignedExerciseSnapshot => {
          const assignedExercise = assignedExerciseSnapshot.data();

          // Load client old list of exercises
          admin.firestore()
            .collection(CLIENTS_COLLECTION)
            .where('uid', '==', assignedExercise.clientUid)
            .get()
            .then(clientQuery => {
              const clientWithExercise = clientQuery.docs[0].data();
              // Update list of exercises, so deleted isn't in list
              const clientExercises = clientWithExercise.rehabilitationPlan.exercises
                .filter(exercise => exercise.uid !== deletedExerciseRef.id);

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
          assignedExerciseSnapshot.ref.delete();
        });
      } else {
        console.log('Exercise was not assigned to any clients. No update needed');
      }
    });
});

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
                  videoUrl: updatedExercise.videoUrl,
                  imgUrl: updatedExercise.imgUrl
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


exports.onUserDeletedFromAuthentication = functions.auth.user().onDelete(event => {
  const uid = event.uid;
  // Delete milestones from client
  console.log('Checking for milestones for deleted user');
  return admin.firestore().collection(MILESTONE_COLLECTION)
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
