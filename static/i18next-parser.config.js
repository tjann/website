/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Configuration for i18next-parser. See https://github.com/i18next/i18next-parser
 * NOTE: run i18next-parser from the root of the repo
 */
module.exports = {
  locales: ["en", "es"],

  output: "server/locales/$LOCALE/$NAMESPACE.json",
  input: "js/place/*.{ts,tsx}",
  verbose: true,
  customValueTemplate: {
    message: "${defaultValue}",
    description: "${description}", // t('my-key', {maxLength: 150})
  },

  sort: true, // Whether or not to sort the catalog
  indentation: 2, // Indentation of the catalog files
  keepRemoved: false, // Keep keys from the catalog that are no longer in code
  createOldCatalogs: true, // Save the \_old files

  // Similar to plurals, can provide e.g. gender context to Person.
  // For now, assume we do not use this.
  // https://www.i18next.com/translation-function/context#context
  contextSeparator: false,
  // Used for multi-level keys. For now, assume we only have flat keys.
  keySeparator: false,
  // Namespace separator used in your translation keys
  namespaceSeparator: ":",
};
