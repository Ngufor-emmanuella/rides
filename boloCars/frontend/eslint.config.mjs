// eslint.config.mjs
import js from "@eslint/js";
import react from "eslint-plugin-react";
import babelParser from "@babel/eslint-parser";
import next from "@next/eslint-plugin-next";

const eslintConfig = {
    files: ["**/*.js", "**/*.jsx"],
    plugins: {
        react,
        "@next/next": next,
    },
    extends: ["next/core-web-vitals"],
    rules: {
        ...(process.env.DISABLE_ESLINT === 'true' ? {
            'no-unused-vars': 'off',
            'react/react-in-jsx-scope': 'off',
        } : {
            'no-unused-vars': 'warn',
            'react/react-in-jsx-scope': 'error',
        }),
        "no-prototype-builtins": "warn",
        "no-unused-vars": "warn",
        "no-empty": "warn",
        "no-self-assign": "warn",
        "no-cond-assign": "warn",
        "no-control-regex": "warn",
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};

export default [
    {
        languageOptions: {
            parser: babelParser,
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: "module",
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...js.configs.recommended.languageOptions?.globals,
                window: "readonly",
                document: "readonly",
                navigator: "readonly",
                self: "readonly",
                global: "readonly",
                ActiveXObject: "readonly",
                URL: "readonly",
                URLSearchParams: "readonly",
                Bun: "readonly",
                Deno: "readonly",
                setTimeout: "readonly",
                console: "readonly",
                FileReader: "readonly",
                FormData: "readonly",
                Blob: "readonly",
            },
        },
    },
    js.configs.recommended,
    eslintConfig
];
