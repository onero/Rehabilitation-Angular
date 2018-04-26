// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDYaU9cnQRy6iJosMF4g2CC1SYSD6mNBFo",
    authDomain: "d4ff-rehabilitation.firebaseapp.com",
    databaseURL: "https://d4ff-rehabilitation.firebaseio.com",
    projectId: "d4ff-rehabilitation",
    storageBucket: "d4ff-rehabilitation.appspot.com",
    messagingSenderId: "1058777192969"
  },
  clientMode: true
};
