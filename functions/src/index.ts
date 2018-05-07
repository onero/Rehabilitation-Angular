import * as functions from 'firebase-functions';

exports.onDeleteUser = functions.auth.user().onDelete(event => {
  const uid = event.uid;
  console.log(uid);
});
