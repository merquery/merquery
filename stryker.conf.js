module.exports = function(config) {
  config.set({
    mutator: "typescript",
    packageManager: "npm",
    reporters: ["html", "clear-text", "progress", "dashboard"],
    testRunner: "jest",
    transpilers: [],
    testFramwork: "jest",
    coverageAnalysis: "off",
    tsconfigFile: "tsconfig.json",
    mutate: ["src/**/*.ts", "!src/testutil/TestSchema.ts"],
    logLevel: "trace",
    maxConcurrentTestRunners: 6
  });
};
