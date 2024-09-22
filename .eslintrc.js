module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        "next/core-web-vitals",
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    overrides: [
        {
            env: {
                node: true
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script"
            }
        }
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["@typescript-eslint", "react"],
    rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "react/jsx-pascal-case": 0,
        "no-restricted-imports": "warn",
        "jsx-a11y/anchor-is-valid": "off",
        "jsx-a11y/alt-text": 0,
        "array-callback-return": "off",
        "react/prop-types": 0,
        "no-prototype-builtins": "off",
        "react/display-name": "off",
        "react/no-unescaped-entities": "off",
        "react/no-unknown-property": ["off"],
        "react/react-in-jsx-scope": "off",
        "react/jsx-uses-react": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "off",
        "@typescript-eslint/no-unused-vars": "error",
        "no-unused-vars": "off",
        "no-unsafe-optional-chaining": "off",
        "import/no-anonymous-default-export": [
            "error",
            {
                allowArray: true,
                allowArrowFunction: true,
                allowAnonymousClass: true,
                allowAnonymousFunction: true,
                allowCallExpression: true, // The true value here is for backward compatibility
                allowLiteral: true,
                allowObject: true
            }
        ]
    },
    settings: {
        react: {
            version: "detect"
        }
    }
};
