module.exports = {
  extends: "stylelint-config-standard-scss",
  plugins: [
    "stylelint-scss"
  ],
  rules: {
    "no-empty-source": null,
    "selector-class-pattern": null,
    "scss/dollar-variable-pattern": null,
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "scss/selector-no-redundant-nesting-selector": true
  }
}