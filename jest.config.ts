export default {
  testEnvironment: "node",
  testMatch: ["**/*.(test|spec).ts"],
  collectCoverage: true,
  coverageProvider: "v8",
  // Uncomment this to collect coverage only from /src folder:
  // collectCoverageFrom: ["src/**/*.(t|j)sx?"],
  moduleNameMapper: {
    "@libs/?(.*)": "<rootDir>/src/libs/$1",
    "@constants": "<rootDir>/src/constants",
    "@utils/?(.*)": "<rootDir>/src/functions/myFunction/utils/$1",
    "@types": "<rootDir>/src/functions/myFunction/types",
    "@interface": "<rootDir>/src/functions/myFunction/strategy/interface",
    "@entities/?(.*)":
      "<rootDir>/src/functions/myFunction/strategy/entities/$1",
    "@route/?(.*)":
      "<rootDir>/src/functions/myFunction/strategy/events/route/$1",
    "@service/?(.*)":
      "<rootDir>/src/functions/myFunction/strategy/events/service/$1",
    "@repository": "<rootDir>/src/functions/myFunction/repository",
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  reporters: ["default", "jest-sonar"],
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
};
