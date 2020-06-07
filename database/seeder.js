// var faker = require("faker");
//const db = require("./index.js");

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "worldStats",
});

connection.connect(function (err) {
  if (err) {
    return "error: " + err.message;
  }

  let createCountries = `create table if not exists countries(
                        countryId INT NOT NULL UNIQUE AUTO_INCREMENT,
                        Name VARCHAR (50) NOT NULL,
                        Code VARCHAR (3) NOT NULL,
                        PRIMARY KEY (countryId)
                      );`;

  connection.query(createCountries, function (err, results, fields) {
    if (err) {
      return err.message;
    }
    console.log(
      results,
      "these are the createCountries table creation results"
    );
    console.log(fields, "these are the createCountries table creation fields");
  });

  //   let createAreas = `create table if not exists areas(
  //                       areaId INT NOT NULL UNIQUE AUTO_INCREMENT,
  //                       areaName VARCHAR (70) NOT NULL,
  //                       PRIMARY KEY (areaId)
  //                     );`;

  //   connection.query(createAreas, function (err, results, fields) {
  //     if (err) {
  //       console.log(err.message);
  //     }
  //   });

  //   let createNurses = `create table if not exists nurses(
  //     nurseId INT NOT NULL UNIQUE AUTO_INCREMENT,
  //     lastName VARCHAR (50) NOT NULL,
  //     firstName VARCHAR (50) NOT NULL,
  //     PRIMARY KEY (nurseId)
  //   );`;

  //   connection.query(createNurses, function (err, results, fields) {
  //     if (err) {
  //       console.log(err.message);
  //     }
  //   });

  //   let createDoctors = `create table if not exists doctors(
  //                         doctorId INT NOT NULL UNIQUE AUTO_INCREMENT,
  //                         lastName VARCHAR (50) NOT NULL,
  //                         firstName VARCHAR (50) NOT NULL,
  //                         areaId INT,
  //                         FOREIGN KEY (areaId)
  //                             REFERENCES areas(areaId),
  //                         PRIMARY KEY (doctorId)
  //                       );`;

  //   connection.query(createDoctors, function (err, results, fields) {
  //     if (err) {
  //       console.log(err.message);
  //     }
  //   });

  //   let createRecords = `create table if not exists records(
  //     recordId INT NOT NULL UNIQUE AUTO_INCREMENT,
  //     patientId INT NOT NULL,
  //     doctorId INT NOT NULL,
  //     description VARCHAR (500) NOT NULL,
  //     FOREIGN KEY (patientId)
  //         REFERENCES patients(patientId),
  //     FOREIGN KEY (doctorId)
  //         REFERENCES doctors(doctorId),
  //     PRIMARY KEY (recordId)
  //   );`;

  //   connection.query(createRecords, function (err, results, fields) {
  //     if (err) {
  //       console.log(err.message);
  //     }
  //   });

  //   let createBeds = `create table if not exists beds(
  //                       bedId INT NOT NULL UNIQUE AUTO_INCREMENT,
  //                       bedNumber INT (3) NOT NULL,
  //                       areaId INT,
  //                       patientId INT NOT NULL,
  //                       LOS VARCHAR (5),
  //                       doctorId INT,
  //                       results VARCHAR (100),
  //                       FOREIGN KEY (doctorId)
  //                          REFERENCES doctors(doctorId),
  //                       FOREIGN KEY (areaId)
  //                          REFERENCES areas(areaId),
  //                       FOREIGN KEY (patientId)
  //                          REFERENCES patients(patientId),
  //                       PRIMARY KEY (bedId)
  //   );`;

  //   connection.query(createBeds, function (err, results, fields) {
  //     if (err) {
  //       console.log(err.message);
  //     }
  //   });

  //   let createResults = `create table if not exists results(
  //                         resultId INT NOT NULL UNIQUE AUTO_INCREMENT,
  //                         studyType VARCHAR (10) NOT NULL,
  //                         PRIMARY KEY (resultId)
  // );`;

  //   connection.query(createResults, function (err, results, fields) {
  //     if (err) {
  //       console.log(err.message);
  //     }
  //   });

  const insertManyCountries = function (countries, cb = () => {}) {
    let queryString = "INSERT INTO countries (Code, Name) VALUES ";
    let values = countries.map(
      (country) => `("${country.Code}", "${country.Name}")`
    );
    queryString = queryString.concat(values.join(", "), ";");
    connection.query(queryString, cb);
  };

  insertManyCountries(countriesWithCodes);

  connection.end(function (err) {
    if (err) {
      return err.message;
    }
  });
});

// var patients = [
//   {
//     lastName: "Morio",
//     firstName: "Nubio",
//     age: 32,
//     sex: "m"
//   },
//   {
//     lastName: "Korez",
//     firstName: "Ratalante",
//     age: 43,
//     sex: "m"
//   },
//   {
//     lastName: "Rocatagliatta",
//     firstName: "Lucho",
//     age: 26,
//     sex: "m"
//   }
// ];

// var seedPatients = function() {
//   let patients = [];
//   let randomGender = function() {
//     let number = Math.floor(Math.random() * 5) + 5;
//     if (number % 2 === 0) {
//       return "m";
//     } else {
//       return "f";
//     }
//   };
//   for (let i = 0; i < 300; i++) {
//     patients.push({
//       firstName: faker.name.firstName(),
//       lastName: faker.name.lastName(),
//       age: Math.floor(Math.random() * 51) + 15,
//       sex: randomGender()
//     });
//   }

//   db.insertManyPatients(patients, err => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("succesfully seeded");
//       return;
//     }
//   });
// };

// var seedNurses = function() {
//   let nurses = [];
//   for (let i = 0; i < 50; i++) {
//     nurses.push({
//       firstName: faker.name.firstName(),
//       lastName: faker.name.lastName()
//     });
//   }

//   db.insertManyNurses(nurses, err => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("succesfully seeded");
//       return;
//     }
//   });
// };

// var seedDoctors = function() {
//   let doctors = [];
//   for (let i = 0; i < 50; i++) {
//     doctors.push({
//       firstName: faker.name.firstName(),
//       lastName: faker.name.lastName(),
//       areaId: Math.floor(Math.random() * 5) + 1
//     });
//   }

//   db.insertManyDoctors(doctors, err => {
//     if (err) {
//       console.log(err);
//       return;
//     } else {
//       console.log("succesfully seeded");
//       return;
//     }
//   });
// };

// var seedResults = function() {
//   let results = [
//     { studyType: "Parac" },
//     { studyType: "Bchem" },
//     { studyType: "CK" },
//     { studyType: "Umicr" },
//     { studyType: "CT" },
//     { studyType: "Amy" },
//     { studyType: "FBE" },
//     { studyType: "Trop" },
//     { studyType: "XRay" },
//     { studyType: "Trop" },
//     { studyType: "bhCG" },
//     { studyType: "Bgrou" },
//     { studyType: "Coag" },
//     { studyType: "INR" },
//     { studyType: "BGas" },
//     { studyType: "etOH" },
//     { studyType: "Ddim" }
//   ];

//   db.insertManyResults(results, err => {
//     if (err) {
//       console.log(err);
//       return;
//     } else {
//       console.log("succesfully seeded");
//       return;
//     }
//   });
// };

// var seedRecords = function() {
//   let records = [];
//   for (let i = 0; i < 490; i++) {
//     records.push({
//       patientId: Math.floor(Math.random() * 300) + 1,
//       doctorId: Math.floor(Math.random() * 50) + 1,
//       description: faker.lorem.paragraph()
//     });
//   }

//   db.insertManyRecords(records, err => {
//     if (err) {
//       console.log(err);
//       return;
//     } else {
//       console.log("succesfully seeded");
//       return;
//     }
//   });
// };

// var seedBeds = function() {
//   let beds = [];
//   resultsRandomizer = function() {
//     let results = [
//       { studyType: "Parac" },
//       { studyType: "Bchem" },
//       { studyType: "CK" },
//       { studyType: "Umicr" },
//       { studyType: "CT" },
//       { studyType: "Amy" },
//       { studyType: "FBE" },
//       { studyType: "Trop" },
//       { studyType: "XRay" },
//       { studyType: "Trop" },
//       { studyType: "bhCG" },
//       { studyType: "Bgrou" },
//       { studyType: "Coag" },
//       { studyType: "INR" },
//       { studyType: "BGas" },
//       { studyType: "etOH" },
//       { studyType: "Ddim" }
//     ];
//     let resultString = "";

//     let times = Math.floor(Math.random() * 8) + 3;
//     for (let i = 0; i < times; i++) {
//       let result = Math.floor(Math.random() * 17);
//       let study = results[result].studyType;
//       resultString = `${resultString.concat(study)},`;
//     }
//     return resultString;
//   };

//   randomTime = () => {
//     hrs = Math.round(Math.random() * 23);
//     mins = Math.round(Math.random() * 60);
//     var hFormat = hrs < 10 ? "0" : "";
//     var mFormat = mins < 10 ? "0" : "";
//     return String(hFormat + hrs + ":" + mFormat + mins + " ");
//   };

//   for (let j = 1; j < 6; j++) {
//     for (let i = 1; i < 26; i++) {
//       beds.push({
//         bedNumber: i,
//         areaId: j,
//         patientId: Math.floor(Math.random() * 300) + 1,
//         LOS: randomTime(),
//         doctorId: Math.floor(Math.random() * 50) + 1,
//         results: resultsRandomizer()
//       });
//     }
//   }
//   db.insertManyBeds(beds, err => {
//     if (err) {
//       console.log(err);
//       return;
//     } else {
//       console.log("succesfully seeded");
//       return;
//     }
//   });
// };

// //seedPatients();
// // seedDoctors();
// // seedNurses();
// // seedResults();
// // seedRecords();
// seedBeds();

const countriesWithCodes = [
  { Code: "AF", Name: "Afghanistan" },
  { Code: "AX", Name: "\u00c5land Islands" },
  { Code: "AL", Name: "Albania" },
  { Code: "DZ", Name: "Algeria" },
  { Code: "AS", Name: "American Samoa" },
  { Code: "AD", Name: "Andorra" },
  { Code: "AO", Name: "Angola" },
  { Code: "AI", Name: "Anguilla" },
  { Code: "AQ", Name: "Antarctica" },
  { Code: "AG", Name: "Antigua and Barbuda" },
  { Code: "AR", Name: "Argentina" },
  { Code: "AM", Name: "Armenia" },
  { Code: "AW", Name: "Aruba" },
  { Code: "AU", Name: "Australia" },
  { Code: "AT", Name: "Austria" },
  { Code: "AZ", Name: "Azerbaijan" },
  { Code: "BS", Name: "Bahamas" },
  { Code: "BH", Name: "Bahrain" },
  { Code: "BD", Name: "Bangladesh" },
  { Code: "BB", Name: "Barbados" },
  { Code: "BY", Name: "Belarus" },
  { Code: "BE", Name: "Belgium" },
  { Code: "BZ", Name: "Belize" },
  { Code: "BJ", Name: "Benin" },
  { Code: "BM", Name: "Bermuda" },
  { Code: "BT", Name: "Bhutan" },
  { Code: "BO", Name: "Bolivia, Plurinational State of" },
  { Code: "BQ", Name: "Bonaire, Sint Eustatius and Saba" },
  { Code: "BA", Name: "Bosnia and Herzegovina" },
  { Code: "BW", Name: "Botswana" },
  { Code: "BV", Name: "Bouvet Island" },
  { Code: "BR", Name: "Brazil" },
  { Code: "IO", Name: "British Indian Ocean Territory" },
  { Code: "BN", Name: "Brunei Darussalam" },
  { Code: "BG", Name: "Bulgaria" },
  { Code: "BF", Name: "Burkina Faso" },
  { Code: "BI", Name: "Burundi" },
  { Code: "KH", Name: "Cambodia" },
  { Code: "CM", Name: "Cameroon" },
  { Code: "CA", Name: "Canada" },
  { Code: "CV", Name: "Cape Verde" },
  { Code: "KY", Name: "Cayman Islands" },
  { Code: "CF", Name: "Central African Republic" },
  { Code: "TD", Name: "Chad" },
  { Code: "CL", Name: "Chile" },
  { Code: "CN", Name: "China" },
  { Code: "CX", Name: "Christmas Island" },
  { Code: "CC", Name: "Cocos (Keeling) Islands" },
  { Code: "CO", Name: "Colombia" },
  { Code: "KM", Name: "Comoros" },
  { Code: "CG", Name: "Congo" },
  { Code: "CD", Name: "Congo, the Democratic Republic of the" },
  { Code: "CK", Name: "Cook Islands" },
  { Code: "CR", Name: "Costa Rica" },
  { Code: "CI", Name: "C\u00f4te d'Ivoire" },
  { Code: "HR", Name: "Croatia" },
  { Code: "CU", Name: "Cuba" },
  { Code: "CW", Name: "Cura\u00e7ao" },
  { Code: "CY", Name: "Cyprus" },
  { Code: "CZ", Name: "Czech Republic" },
  { Code: "DK", Name: "Denmark" },
  { Code: "DJ", Name: "Djibouti" },
  { Code: "DM", Name: "Dominica" },
  { Code: "DO", Name: "Dominican Republic" },
  { Code: "EC", Name: "Ecuador" },
  { Code: "EG", Name: "Egypt" },
  { Code: "SV", Name: "El Salvador" },
  { Code: "GQ", Name: "Equatorial Guinea" },
  { Code: "ER", Name: "Eritrea" },
  { Code: "EE", Name: "Estonia" },
  { Code: "ET", Name: "Ethiopia" },
  { Code: "FK", Name: "Falkland Islands (Malvinas)" },
  { Code: "FO", Name: "Faroe Islands" },
  { Code: "FJ", Name: "Fiji" },
  { Code: "FI", Name: "Finland" },
  { Code: "FR", Name: "France" },
  { Code: "GF", Name: "French Guiana" },
  { Code: "PF", Name: "French Polynesia" },
  { Code: "TF", Name: "French Southern Territories" },
  { Code: "GA", Name: "Gabon" },
  { Code: "GM", Name: "Gambia" },
  { Code: "GE", Name: "Georgia" },
  { Code: "DE", Name: "Germany" },
  { Code: "GH", Name: "Ghana" },
  { Code: "GI", Name: "Gibraltar" },
  { Code: "GR", Name: "Greece" },
  { Code: "GL", Name: "Greenland" },
  { Code: "GD", Name: "Grenada" },
  { Code: "GP", Name: "Guadeloupe" },
  { Code: "GU", Name: "Guam" },
  { Code: "GT", Name: "Guatemala" },
  { Code: "GG", Name: "Guernsey" },
  { Code: "GN", Name: "Guinea" },
  { Code: "GW", Name: "Guinea-Bissau" },
  { Code: "GY", Name: "Guyana" },
  { Code: "HT", Name: "Haiti" },
  { Code: "HM", Name: "Heard Island and McDonald Islands" },
  { Code: "VA", Name: "Holy See (Vatican City State)" },
  { Code: "HN", Name: "Honduras" },
  { Code: "HK", Name: "Hong Kong" },
  { Code: "HU", Name: "Hungary" },
  { Code: "IS", Name: "Iceland" },
  { Code: "IN", Name: "India" },
  { Code: "ID", Name: "Indonesia" },
  { Code: "IR", Name: "Iran, Islamic Republic of" },
  { Code: "IQ", Name: "Iraq" },
  { Code: "IE", Name: "Ireland" },
  { Code: "IM", Name: "Isle of Man" },
  { Code: "IL", Name: "Israel" },
  { Code: "IT", Name: "Italy" },
  { Code: "JM", Name: "Jamaica" },
  { Code: "JP", Name: "Japan" },
  { Code: "JE", Name: "Jersey" },
  { Code: "JO", Name: "Jordan" },
  { Code: "KZ", Name: "Kazakhstan" },
  { Code: "KE", Name: "Kenya" },
  { Code: "KI", Name: "Kiribati" },
  { Code: "KP", Name: "Korea, Democratic People's Republic of" },
  { Code: "KR", Name: "Korea, Republic of" },
  { Code: "KW", Name: "Kuwait" },
  { Code: "KG", Name: "Kyrgyzstan" },
  { Code: "LA", Name: "Lao People's Democratic Republic" },
  { Code: "LV", Name: "Latvia" },
  { Code: "LB", Name: "Lebanon" },
  { Code: "LS", Name: "Lesotho" },
  { Code: "LR", Name: "Liberia" },
  { Code: "LY", Name: "Libya" },
  { Code: "LI", Name: "Liechtenstein" },
  { Code: "LT", Name: "Lithuania" },
  { Code: "LU", Name: "Luxembourg" },
  { Code: "MO", Name: "Macao" },
  { Code: "MK", Name: "Macedonia, the Former Yugoslav Republic of" },
  { Code: "MG", Name: "Madagascar" },
  { Code: "MW", Name: "Malawi" },
  { Code: "MY", Name: "Malaysia" },
  { Code: "MV", Name: "Maldives" },
  { Code: "ML", Name: "Mali" },
  { Code: "MT", Name: "Malta" },
  { Code: "MH", Name: "Marshall Islands" },
  { Code: "MQ", Name: "Martinique" },
  { Code: "MR", Name: "Mauritania" },
  { Code: "MU", Name: "Mauritius" },
  { Code: "YT", Name: "Mayotte" },
  { Code: "MX", Name: "Mexico" },
  { Code: "FM", Name: "Micronesia, Federated States of" },
  { Code: "MD", Name: "Moldova, Republic of" },
  { Code: "MC", Name: "Monaco" },
  { Code: "MN", Name: "Mongolia" },
  { Code: "ME", Name: "Montenegro" },
  { Code: "MS", Name: "Montserrat" },
  { Code: "MA", Name: "Morocco" },
  { Code: "MZ", Name: "Mozambique" },
  { Code: "MM", Name: "Myanmar" },
  { Code: "NA", Name: "Namibia" },
  { Code: "NR", Name: "Nauru" },
  { Code: "NP", Name: "Nepal" },
  { Code: "NL", Name: "Netherlands" },
  { Code: "NC", Name: "New Caledonia" },
  { Code: "NZ", Name: "New Zealand" },
  { Code: "NI", Name: "Nicaragua" },
  { Code: "NE", Name: "Niger" },
  { Code: "NG", Name: "Nigeria" },
  { Code: "NU", Name: "Niue" },
  { Code: "NF", Name: "Norfolk Island" },
  { Code: "MP", Name: "Northern Mariana Islands" },
  { Code: "NO", Name: "Norway" },
  { Code: "OM", Name: "Oman" },
  { Code: "PK", Name: "Pakistan" },
  { Code: "PW", Name: "Palau" },
  { Code: "PS", Name: "Palestine, State of" },
  { Code: "PA", Name: "Panama" },
  { Code: "PG", Name: "Papua New Guinea" },
  { Code: "PY", Name: "Paraguay" },
  { Code: "PE", Name: "Peru" },
  { Code: "PH", Name: "Philippines" },
  { Code: "PN", Name: "Pitcairn" },
  { Code: "PL", Name: "Poland" },
  { Code: "PT", Name: "Portugal" },
  { Code: "PR", Name: "Puerto Rico" },
  { Code: "QA", Name: "Qatar" },
  { Code: "RE", Name: "R\u00e9union" },
  { Code: "RO", Name: "Romania" },
  { Code: "RU", Name: "Russian Federation" },
  { Code: "RW", Name: "Rwanda" },
  { Code: "BL", Name: "Saint Barth\u00e9lemy" },
  { Code: "SH", Name: "Saint Helena, Ascension and Tristan da Cunha" },
  { Code: "KN", Name: "Saint Kitts and Nevis" },
  { Code: "LC", Name: "Saint Lucia" },
  { Code: "MF", Name: "Saint Martin (French part)" },
  { Code: "PM", Name: "Saint Pierre and Miquelon" },
  { Code: "VC", Name: "Saint Vincent and the Grenadines" },
  { Code: "WS", Name: "Samoa" },
  { Code: "SM", Name: "San Marino" },
  { Code: "ST", Name: "Sao Tome and Principe" },
  { Code: "SA", Name: "Saudi Arabia" },
  { Code: "SN", Name: "Senegal" },
  { Code: "RS", Name: "Serbia" },
  { Code: "SC", Name: "Seychelles" },
  { Code: "SL", Name: "Sierra Leone" },
  { Code: "SG", Name: "Singapore" },
  { Code: "SX", Name: "Sint Maarten (Dutch part)" },
  { Code: "SK", Name: "Slovakia" },
  { Code: "SI", Name: "Slovenia" },
  { Code: "SB", Name: "Solomon Islands" },
  { Code: "SO", Name: "Somalia" },
  { Code: "ZA", Name: "South Africa" },
  { Code: "GS", Name: "South Georgia and the South Sandwich Islands" },
  { Code: "SS", Name: "South Sudan" },
  { Code: "ES", Name: "Spain" },
  { Code: "LK", Name: "Sri Lanka" },
  { Code: "SD", Name: "Sudan" },
  { Code: "SR", Name: "Suriname" },
  { Code: "SJ", Name: "Svalbard and Jan Mayen" },
  { Code: "SZ", Name: "Swaziland" },
  { Code: "SE", Name: "Sweden" },
  { Code: "CH", Name: "Switzerland" },
  { Code: "SY", Name: "Syrian Arab Republic" },
  { Code: "TW", Name: "Taiwan, Province of China" },
  { Code: "TJ", Name: "Tajikistan" },
  { Code: "TZ", Name: "Tanzania, United Republic of" },
  { Code: "TH", Name: "Thailand" },
  { Code: "TL", Name: "Timor-Leste" },
  { Code: "TG", Name: "Togo" },
  { Code: "TK", Name: "Tokelau" },
  { Code: "TO", Name: "Tonga" },
  { Code: "TT", Name: "Trinidad and Tobago" },
  { Code: "TN", Name: "Tunisia" },
  { Code: "TR", Name: "Turkey" },
  { Code: "TM", Name: "Turkmenistan" },
  { Code: "TC", Name: "Turks and Caicos Islands" },
  { Code: "TV", Name: "Tuvalu" },
  { Code: "UG", Name: "Uganda" },
  { Code: "UA", Name: "Ukraine" },
  { Code: "AE", Name: "United Arab Emirates" },
  { Code: "GB", Name: "United Kingdom" },
  { Code: "US", Name: "United States" },
  { Code: "UM", Name: "United States Minor Outlying Islands" },
  { Code: "UY", Name: "Uruguay" },
  { Code: "UZ", Name: "Uzbekistan" },
  { Code: "VU", Name: "Vanuatu" },
  { Code: "VE", Name: "Venezuela, Bolivarian Republic of" },
  { Code: "VN", Name: "Viet Nam" },
  { Code: "VG", Name: "Virgin Islands, British" },
  { Code: "VI", Name: "Virgin Islands, U.S." },
  { Code: "WF", Name: "Wallis and Futuna" },
  { Code: "EH", Name: "Western Sahara" },
  { Code: "YE", Name: "Yemen" },
  { Code: "ZM", Name: "Zambia" },
  { Code: "ZW", Name: "Zimbabwe" },
];
