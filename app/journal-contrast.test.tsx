// @vitest-environment jsdom

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Home from './page';

function installSiteStyles() {
  const style = document.createElement('style');
  const baseCss = readFileSync(resolve(process.cwd(), 'app/globals.css'), 'utf8').replace('@import "tailwindcss";', '');
  const refinedCss = readFileSync(resolve(process.cwd(), 'app/refined.css'), 'utf8');

  style.textContent = `${baseCss}\n${refinedCss}`;
  document.head.append(style);
}

describe('journal card contrast', () => {
  it('renders the X card copy in dark ink on its light background', () => {
    installSiteStyles();
    const { container } = render(<Home />);
    const card = container.querySelector<HTMLElement>('.journal-card--x');
    const summary = card?.querySelector<HTMLElement>('p');

    expect(card).not.toBeNull();
    expect(summary).not.toBeNull();
    expect(getComputedStyle(card!).color).toBe('rgb(40, 27, 34)');
    expect(getComputedStyle(summary!).color).toBe('rgb(40, 27, 34)');
  });
});
