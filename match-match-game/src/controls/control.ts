export const render = function (
  rootEl: HTMLElement,
  childEl: HTMLElement[],
  content = '',
  i: string[] = [],
  s: string[] = [],
): void {
  if (content === '')
    if (i === []) rootEl.append(...childEl);
    else {
      rootEl.append(...childEl);
      for (let e = 0; e < i.length; e++) childEl[0].setAttribute(i[e], s[e]);
    }
  else if (i === []) {
    rootEl.append(...childEl);
    childEl[0].innerHTML = content;
  } else {
    rootEl.append(...childEl);
    childEl[0].innerHTML = content;
    for (let e = 0; e < i.length; e++) childEl[0].setAttribute(i[e], s[e]);
  }
};
