/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018-present Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const _ = require('lodash');
const tinycolor = require('tinycolor2');
const {props: TOKENS} = require('bpk-tokens/tokens/base.raw.json');

const COLOR_PROPS = [
  'color',
  'backgroundColor',
];

const COLORS = _.filter(TOKENS, { category: 'colors' })
  .map(({ name, value }) => ({ name: _.camelCase(name), value }));

module.exports = context => ({
  meta: {
    fixable: 'code',
  },
  Property: (node) => {
    const { key, value } = node;

    if (COLOR_PROPS.includes(key.name) && value.type === 'Literal') {
      const color = tinycolor(value.value);

      const expectedToken = _.find(COLORS, { value: color.toRgbString() });

      if (expectedToken) {
        context.report({
          node,
          message: `Use the following Backpack token instead: ${expectedToken.name}`,
          fix: fixer => fixer.replaceText(value, expectedToken.name),
        });
      }
    }
  },
});
