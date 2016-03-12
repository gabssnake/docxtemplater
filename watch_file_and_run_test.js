"use strict";

var fs = require("fs");
var path = require("path");
var exec = require("child_process").exec;

var lastRun = 0;
var throttleTime = 1000;
/* eslint-disable no-console */

var execTests = function () {
	exec("robo mocha", function (error, stdout, stderr) {
		if (stdout) {
			console.log("stdout: " + stdout);
		}
		if (stderr) {
			console.log("stderr: " + stderr);
		}
		if (error !== null) {
			console.log("exec error: " + error);
		}
	});
};

var onFileChange = function () {
	var now = new Date().getTime();
	if (now < lastRun + throttleTime) {
		return;
	}
	lastRun = now;

	setTimeout(execTests, 10);
};

fs.watch(path.join(__dirname, "js"), onFileChange);
fs.watch(path.join(__dirname, "js", "tests"), onFileChange);
