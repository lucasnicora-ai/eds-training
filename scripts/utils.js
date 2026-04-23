/**
 * Parses key-value parameters from a block's DOM structure.
 * Each row in the block is expected to have two cells: a key and a value.
 * Only rows whose DOM key matches a value in `paramKeys` are included.
 *
 * @param {Object.<string, string>} paramKeys - Map of programmatic param names to their DOM
 * key strings
 * @param {HTMLElement} block - The block DOM element to parse
 * @returns {Object.<string, string>} Parsed parameters keyed by their programmatic names
 */
export function parseBlockParams(paramKeys, block) {
  const domKeyToParam = Object.fromEntries(
    Object.entries(paramKeys).map(([param, domKey]) => [domKey.toLowerCase(), param]),
  );
  return [...block.children].reduce((params, row) => {
    const [keyEl, valueEl] = row.children;
    if (keyEl && valueEl) {
      const domKey = keyEl.textContent.trim().toLowerCase();
      const param = domKeyToParam[domKey];
      if (param) params[param] = valueEl.textContent.trim();
    }
    return params;
  }, {});
}

/**
 * Removes all children from a block element.
 * @param {HTMLElement} block - The block element to empty
 */
export function emptyBlock(block) {
  block.replaceChildren();
}

/**
 * Finds the first paragraph element in `main` whose text contains the given key.
 * @param {HTMLElement} main - The container element to search within
 * @param {string} key - The text to search for
 * @returns {HTMLElement|null} The matching paragraph element, or null if not found
 */
export function getElementByTechnicalKey(main, key) {
  const p = [...main.querySelectorAll('p')].find((element) => element.innerText.includes(`${key}`));
  return p || null;
}

/**
 * Removes the given key string from the element's inner text.
 * @param {HTMLElement} element - The element to modify
 * @param {string} key - The text to remove
 */
export function removeTechnicalKeyFromElement(element, key) {
  element.innerText = element.innerText.replace(key, '').trim();
}
