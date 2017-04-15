module.exports = {
    "env": {
        "shared-node-browser": true,
        "es6": true
    },
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "no-console": 0,
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double", {
                "allowTemplateLiterals": true
            }
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};