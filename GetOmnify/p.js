let moment = require("moment")
// let date = moment().format("DD-MM-YYYY 'dddd'")
//  date.add("1")
// console.log(date);

var a = moment().format("YYYY-MM-DD")
var b = moment().add(90, "days").format("YYYY-MM-DD")
console.log(a);
console.log(b);
// If you want an exclusive end date (half-open interval)
for (var m = moment(a); m.isBefore(b); m.add(1, 'days')) {
    if (m.format('dddd') === 'Friday')
        console.log(m.format('DD-MM-YYYY'));
}

// If you want an inclusive end date (fully-closed interval)
// for (var m = moment(a); m.diff(b, 'days') <= 0; m.add(1, 'days')) {
//     console.log(m.format('YYYY-MM-DD'));
// }