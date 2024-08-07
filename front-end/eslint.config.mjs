import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

const config = [
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReactConfig,
    {
        root: true,
        env: {
            browser: true,
            es2021: true,
        },
        parser: "@typescript-eslint/parser",
        plugins: ["@typescript-eslint", "prettier"],
        extends: [
            "eslint:recommended",
            "plugin:@typescript-eslint/eslint-recommended",
            "plugin:@typescript-eslint/recommended",
            "prettier",
        ],
        rules: {
            "prettier/prettier": [
                "error",
                {
                    printWidth: 80,
                    trailingComma: "es5",
                    semi: true,
                    jsxSingleQuote: true,
                    singleQuote: true,
                    useTabs: true,
                    endOfLine: "auto",
                    "max-len": ["error", { code: 80 }],
                    importOrder: [
                        "^react(.*)$",
                        "<THIRD_PARTY_MODULES>",
                        "./types",
                        "^[.](?!.*.(scss|css)$).*$",
                        "(.*).(scss|css)$",
                    ],
                    importOrderSeparation: true,
                    importOrderSortSpecifiers: true,
                },
            ],

            "@typescript-eslint/no-namespace": "off",
            "no-duplicate-imports": "error",
        },
    },
];

export default config;
