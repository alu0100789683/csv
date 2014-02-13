function processFiles(files) {
var file = files[0];

var reader = new FileReader();

reader.onload = function (e) {
var output = document.getElementById("original");
output.value = e.target.result;
};
reader.readAsText(file);
}