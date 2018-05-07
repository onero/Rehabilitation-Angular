"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
exports.onDeleteUser = functions.auth.user().onDelete(event => {
    const uid = event.uid;
    console.log(uid);
});
//# sourceMappingURL=index.js.map