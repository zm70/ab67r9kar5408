module.exports = {
    preset: "react-native",
    setupFilesAfterEnv: [
        "<rootDir>/setupTests.js"
    ],
    "setupFiles": [
        "<rootDir>/jest-setup.js"
    ],
    moduleNameMapper: {
        "^React$": "<rootDir>/node_modules/react"
    },
    "transformIgnorePatterns": [
        "<rootDir>/(node_modules)/(?!react-native|react-navigation|bugsnag-react-native)"
    ],
    "testMatch": ["<rootDir>/Tests/**/*.js?(x)", "**/?(*.)(spec|test).js?(x)"],

    "transform": {
        "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
    },
    bail: true,
    verbose: true,
    automock: false,
    cacheDirectory: "<rootDir>/.jest-cache"

};