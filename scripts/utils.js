/**
 * Parses key-value parameters from a block's DOM structure.
 * Each row in the block is expected to have two cells: a key and a value.
 * Only rows whose DOM key matches a value in `paramKeys` are included.
 *
 * @param {Object.<string, string>} paramKeys - Map of programmatic param names to their DOM key strings
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

export function emptyBlock(block) {
  block.replaceChildren();
}
