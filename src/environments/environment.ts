// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyC_r1-CQBoCTc6T19Wv5r1X0o678FU-Dcs",
    authDomain: "chantlisv-dev.firebaseapp.com",
    databaseURL: "https://chantlisv-dev.firebaseio.com",
    projectId: "chantlisv-dev",
    storageBucket: "chantlisv-dev.appspot.com",
    messagingSenderId: "214874254840"
  }
  // firebase: {
  //   apiKey: "AIzaSyBUqASXpt7K1hP6j8zFLvxDkV-GjHipYik",
  //   authDomain: "chantlisv-ac47b.firebaseapp.com",
  //   databaseURL: "https://chantlisv-ac47b.firebaseio.com",
  //   projectId: "chantlisv-ac47b",
  //   storageBucket: "chantlisv-ac47b.appspot.com",
  //   messagingSenderId: "1045416652982"
  // }
};
