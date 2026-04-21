import { parseBlockParams, emptyBlock } from '../../scripts/utils.js';

const PARAM_KEYS = {
  type: 'Type',
  title: 'Title',
  subtitle: 'Subtitle',
  successMessage: 'Success Message',
};

function submitFeedback(value, block, params) {
  alert(`Feedback submitted: ${value}`);

  block.innerHTML = `<p class="feedback-success">${params.successMessage}</p>`;
}

function renderFeedback(block, params) {
  const { title, subtitle, type } = params;

  if (title) {
    const h2 = document.createElement('h2');
    h2.className = 'feedback-title';
    h2.textContent = title;
    block.append(h2);
  }

  if (subtitle) {
    const p = document.createElement('p');
    p.className = 'feedback-subtitle';
    p.textContent = subtitle;
    block.append(p);
  }

  if (type === 'Numbers') {
    const ul = document.createElement('ul');
    ul.className = 'feedback-list';
    for (let i = 1; i <= 5; i += 1) {
      const li = document.createElement('li');
      li.className = 'feedback-item';
      const button = document.createElement('button');
      button.className = 'feedback-button';
      button.textContent = i;
      li.append(button);
      ul.append(li);
    }
    block.append(ul);
  }
}

function addEventListeners(block, params) {
  block.addEventListener('click', (e) => {
    if (e.target.classList.contains('feedback-button')) {
      submitFeedback(e.target.textContent, block, params);
    }
  });
}

export default function decorate(block) {
  const params = parseBlockParams(PARAM_KEYS, block);
  emptyBlock(block);

  renderFeedback(block, params);
  addEventListeners(block, params);
}
