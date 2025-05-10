function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function highlightMatches(
  text: string,
  pattern: string,
  flags: string
): { html: string; count: number } {
  if (text.length === 0 || pattern.trim() === "") return { html: "", count: 0 };

  try {
    const reg = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
    let match;
    let lastIndex = 0;
    let result = "";
    let count = 0;

    if (!flags.includes("g") && (match = reg.exec(text)) !== null) {
      result = `<mark class="bg-blue-200">${escapeHtml(match[0])}</mark>`;
      count = 1;
      return { html: result, count };
    }

    while ((match = reg.exec(text)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      result += escapeHtml(text.slice(lastIndex, start));
      const highlightClass = count % 2 === 0 ? "bg-blue-200" : "bg-blue-300";
      result += `<mark class="${highlightClass}">${escapeHtml(
        match[0]
      )}</mark>`;
      lastIndex = end;
      count++;
      if (match[0].length === 0) reg.lastIndex++;
    }

    result += escapeHtml(text.slice(lastIndex));
    return { html: result, count };
  } catch (e) {
    return { html: escapeHtml(text), count: 0 };
  }
}
