"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const CLIENTS_COLLECTION = 'Clients';
exports.onDeleteUser = functions.auth.user().onDelete(event => {
    const uid = event.uid;
    const clientRef = admin.firestore().doc(`${CLIENTS_COLLECTION}/${uid}`);
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
//# sourceMappingURL=index.js.map