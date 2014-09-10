'use strict';

var meanMedianMode = function(){
  this.report = {
    mean: '',
    median: '',
    mode: ''
  };
};

module.exports = meanMedianMode;

meanMedianMode.prototype.go = function(series){
  var v = this.getNumericValues(series);
  this.modeOf(v);
  this.meanOf(v);
  this.medianOf(v);
  return this.report;
};

// mode
meanMedianMode.prototype.modeOf = function(v){
  var counts = v.map(function(item, index, arr){
    var count = 0;
    for (var k = 0; k < arr.length; k++) {
      if(arr[k] === item) count++;
    }
    return count;
  });

  var highest = 0;
  for (var i = 0; i < counts.length; i++) {
    // update highest value
    if(counts[i] > highest) highest = counts[i];
  }

  var modes = [];
  for (var j = 0; j < counts.length; j++) {
    // push value of high counts, but only once
    if(counts[j] === highest){
      if( modes.indexOf(v[j]) === -1 )  modes.push(v[j]);
    }
  }

  this.report.mode = (modes.length > 1) ? modes : modes[0];
};

// mean
meanMedianMode.prototype.meanOf = function(v){
  var sum = v.reduce(function(prev, curr, index, arr){
    return prev + curr;
  });
  this.report.mean = sum / v.length;
};

// median
meanMedianMode.prototype.medianOf = function(values){
  var length = values.length;
  if( length % 2 === 0){
    // take an average of the two median values
    this.report.median = (values[length/2 - 1] + values[length/2]) / 2;
  }else{
    // get the median value
    this.report.median = values[ Math.ceil(length / 2) ];
  }
};

// return array of numbers, given process.argv[]
meanMedianMode.prototype.getNumericValues = function(series){
  var values = series.split(',');
  values = values.map(function(val){
    return Number(val);
  });
  return values;
};

