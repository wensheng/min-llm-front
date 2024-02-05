module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "settings": {
      "react": {
        "version": "detect",
      },
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": ["tsconfig.json"]
    },
    "plugins": [
      "react"
    ],
    "rules": {
      "semi": "off",
      "@typescript-eslint/semi": "off",
      "comma-dangle": "off",
      "@typescript-eslint/comma-dangle": "off"
    }
}
