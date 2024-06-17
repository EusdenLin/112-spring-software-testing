module.exports = function(config) {
  config.set({
    mutator: "javascript",
    packageManager: "npm",
    reporters: ["clear-text", "progress"],
    testRunner: "command",
    transpilers: [],
    coverageAnalysis: "all"
  });
};
