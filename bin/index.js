#!/usr/bin/env node
const safkat = require("../lib/safkat");

//Swap this for your school's URL, default is KKTavastia
const URL = "https://www.jamix.fi/ruokalistat/?anro=97111&k=1&mt=2";
safkat.start(URL);