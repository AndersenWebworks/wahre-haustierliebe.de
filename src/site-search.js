    /* Volltextsuche: Der Index (assets/search-index.json) entsteht beim Build und wird erst geladen,
       wenn jemand die Suche öffnet oder ins Suchfeld tippt. Es gibt keine Aufrufe zu Dritten. */
    var siteSearchState = { data: null, loading: null, lists: [] };

    var SEARCH_FOLD = { 'ä': 'a', 'ö': 'o', 'ü': 'u', 'ß': 's', 'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'å': 'a', 'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e', 'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i', 'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ù': 'u', 'ú': 'u', 'û': 'u', 'ç': 'c', 'ñ': 'n' };

    function foldSearchText(value) {
      /* Kleinschreibung und Umlaute; jedes Zeichen bleibt ein Zeichen, damit Fundstellen zum Originaltext passen */
      return String(value || '').replace(/[^a-z0-9 ]/g, function(ch) {
        var lower = ch.toLowerCase();
        if (lower.length !== 1) return ch;
        return SEARCH_FOLD[lower] || lower;
      });
    }

    function normalizeSearchValue(value) {
      return foldSearchText(value).replace(/\s+/g, ' ').trim();
    }

    function searchTokenVariants(token) {
      var variants = [token];
      var digraph = token.replace(/ae/g, 'a').replace(/oe/g, 'o').replace(/ue/g, 'u').replace(/ss/g, 's');
      if (digraph !== token) variants.push(digraph);
      if (token.length >= 5) {
        var stem = token.replace(/(en|e|n|s)$/, '');
        if (stem.length >= 4 && variants.indexOf(stem) === -1) { variants.push(stem); variants.stem = stem; }
      }
      return variants;
    }

    function searchQueryTokens(normalized) {
      var parts = normalized.split(/[^a-z0-9]+/).filter(Boolean);
      var tokens = parts.filter(function(part) { return part.length >= 2; });
      if (!tokens.length) tokens = parts;
      return tokens.slice(0, 6).map(function(token) { return { text: token, variants: searchTokenVariants(token) }; });
    }

    function searchStemPart(part) {
      return part.length > 4 ? part.replace(/(en|e|n|s)$/, '') : part;
    }

    function searchTokenFromText(text) {
      return { text: text, variants: searchTokenVariants(text) };
    }

    function searchAnyPageHas(pages, token) {
      for (var i = 0; i < pages.length; i++) if (searchFindIn(pages[i].fall, token)) return true;
      return false;
    }

    function searchExpandCompounds(tokens, pages) {
      /* Findet sich ein langes Wort nirgends, wird es als Zusammensetzung aus zwei Wörtern gesucht (hundekosten = hund + kosten). */
      var result = [];
      tokens.forEach(function(token) {
        if (token.text.length < 8 || searchAnyPageHas(pages, token)) { result.push(token); return; }
        var best = null;
        for (var cut = 3; cut <= token.text.length - 3; cut++) {
          var left = searchTokenFromText(searchStemPart(token.text.slice(0, cut)));
          var right = searchTokenFromText(token.text.slice(cut));
          var together = 0;
          for (var i = 0; i < pages.length; i++) {
            if (searchFindIn(pages[i].fall, left) && searchFindIn(pages[i].fall, right)) together++;
          }
          if (together && (!best || together > best.together)) best = { left: left, right: right, together: together };
        }
        if (best) { result.push(best.left, best.right); } else { result.push(token); }
      });
      return result;
    }

    function searchFindIn(haystack, token) {
      /* beste Fundstelle { pos, len, start } (Wortanfang bevorzugt) oder null */
      var best = null;
      for (var i = 0; i < token.variants.length; i++) {
        var needle = token.variants[i];
        var from = 0;
        var pos;
        while ((pos = haystack.indexOf(needle, from)) !== -1) {
          var start = pos === 0 || !/[a-z0-9]/.test(haystack.charAt(pos - 1));
          if (token.variants.stem === needle && !start) { from = pos + 1; continue; }
          if (!best || (start && !best.start)) best = { pos: pos, len: needle.length, start: start };
          if (start) return best;
          from = pos + 1;
        }
      }
      return best;
    }

    function searchCountIn(haystack, token, cap) {
      var hit = searchFindIn(haystack, token);
      if (!hit) return 0;
      var needle = haystack.substr(hit.pos, hit.len);
      var count = 0;
      var from = 0;
      while (count < cap && (from = haystack.indexOf(needle, from)) !== -1) { count++; from += needle.length; }
      return count;
    }

    function prepareSearchIndex(raw) {
      var pages = (raw.p || []).map(function(entry) {
        var sections = (entry.s || []).map(function(section) {
          return { h: section[0], x: section[1], fh: foldSearchText(section[0]), fx: foldSearchText(section[1]) };
        });
        return {
          id: entry.i, title: entry.t, description: entry.d || '',
          ft: foldSearchText(entry.t), fd: foldSearchText(entry.d || ''),
          fheads: sections.map(function(s) { return s.fh; }).join(' | '),
          sections: sections
        };
      });
      pages.forEach(function(page) {
        page.fall = page.ft + ' ' + page.fd + ' ' + page.fheads + ' ' + page.sections.map(function(s) { return s.fx; }).join(' ');
      });
      var glossary = (raw.g || []).map(function(entry) {
        return {
          key: entry[0], title: entry[1], summary: entry[2],
          ft: foldSearchText(entry[1]), fb: foldSearchText(entry[2] + ' ' + (entry[3] || ''))
        };
      });
      return { pages: pages, glossary: glossary };
    }

    function fallbackSearchIndex() {
      var entries = Array.isArray(window.staticSiteSearchIndex) ? window.staticSiteSearchIndex : [];
      return prepareSearchIndex({ p: entries.map(function(e) { return { i: e.id, t: e.title, d: e.description, s: [] }; }), g: [] });
    }

    function loadSiteSearchIndex() {
      if (siteSearchState.data) return Promise.resolve(siteSearchState.data);
      if (siteSearchState.loading) return siteSearchState.loading;
      var version = typeof staticSearchIndexVersion === 'string' ? staticSearchIndexVersion : '';
      siteSearchState.loading = fetch(assetUrl('assets/search-index.json') + (version ? '?v=' + version : ''), { credentials: 'same-origin' })
        .then(function(response) {
          if (!response.ok) throw new Error('Suchindex nicht erreichbar');
          return response.json();
        })
        .then(function(raw) { siteSearchState.data = prepareSearchIndex(raw); return siteSearchState.data; })
        .catch(function() { siteSearchState.data = fallbackSearchIndex(); return siteSearchState.data; })
        .then(function(data) {
          siteSearchState.lists.forEach(function(job) {
            if (job.input.value) renderSearchResults(job.input.value, job.list, job.options);
          });
          return data;
        });
      return siteSearchState.loading;
    }

    function searchSnippet(section, tokens) {
      var text = section.x;
      var source = section.fx;
      if (!text || text.length !== source.length) return null;
      var first = null;
      tokens.forEach(function(token) {
        var hit = searchFindIn(source, token);
        if (hit && (!first || hit.pos < first.pos)) first = hit;
      });
      if (!first) {
        /* Treffer nur in der Überschrift: Anfang des Abschnitts zeigen */
        var lead = text.length > 150 ? text.slice(0, text.lastIndexOf(' ', 150)) : text;
        return lead ? { parts: [{ text: lead, mark: false }], before: false, after: lead.length < text.length } : null;
      }
      var from = Math.max(0, first.pos - 60);
      var to = Math.min(text.length, first.pos + first.len + 110);
      if (from > 0) {
        var space = text.indexOf(' ', from);
        if (space !== -1 && space < first.pos) from = space + 1;
      }
      if (to < text.length) {
        var back = text.lastIndexOf(' ', to);
        if (back > first.pos + first.len) to = back;
      }
      var marks = [];
      tokens.forEach(function(token) {
        for (var i = 0; i < token.variants.length; i++) {
          var needle = token.variants[i];
          var pos = source.indexOf(needle, from);
          if (pos !== -1 && pos < to) { marks.push([pos, Math.min(to, pos + needle.length)]); break; }
        }
      });
      marks.sort(function(a, b) { return a[0] - b[0]; });
      var parts = [];
      var cursor = from;
      marks.forEach(function(mark) {
        if (mark[0] < cursor) return;
        if (mark[0] > cursor) parts.push({ text: text.slice(cursor, mark[0]), mark: false });
        parts.push({ text: text.slice(mark[0], mark[1]), mark: true });
        cursor = mark[1];
      });
      if (cursor < to) parts.push({ text: text.slice(cursor, to), mark: false });
      return { parts: parts, before: from > 0, after: to < text.length };
    }

    function scoreSearchPage(page, tokens, phrase) {
      var score = 0;
      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        var tokenScore = 0;
        var inTitle = searchFindIn(page.ft, token);
        var inDesc = searchFindIn(page.fd, token);
        var inHeads = searchFindIn(page.fheads, token);
        if (inTitle) tokenScore += inTitle.start ? 24 : 14;
        if (inHeads) tokenScore += searchCountIn(page.fheads, token, 3) * 5 + (inHeads.start ? 3 : 0);
        if (inDesc) tokenScore += 6;
        var bodyCount = 0;
        for (var s = 0; s < page.sections.length; s++) bodyCount += searchCountIn(page.sections[s].fx, token, 4);
        tokenScore += Math.min(bodyCount, 8);
        if (!tokenScore) return null;
        score += tokenScore;
      }
      if (phrase && page.ft.indexOf(phrase) !== -1) score += 20;
      /* Abschnitt mit den meisten Suchwörtern (Überschrift zählt mehr) für Ausschnitt und Sprungziel */
      var best = null;
      var bestScore = 0;
      page.sections.forEach(function(section) {
        var sectionScore = 0;
        var matched = 0;
        tokens.forEach(function(token) {
          var inBody = searchCountIn(section.fx, token, 3);
          var inHead = searchFindIn(section.fh, token);
          if (inBody || inHead) matched++;
          sectionScore += inBody + (inHead ? 4 : 0);
        });
        sectionScore += matched * 5;
        if (phrase && section.fx.indexOf(phrase) !== -1) sectionScore += 6;
        if (sectionScore > bestScore) { bestScore = sectionScore; best = section; }
      });
      return { score: score, section: best };
    }

    function scoreSearchGlossary(entry, tokens, phrase) {
      var score = 0;
      for (var i = 0; i < tokens.length; i++) {
        var inTitle = searchFindIn(entry.ft, tokens[i]);
        var inBody = searchFindIn(entry.fb, tokens[i]);
        if (!inTitle && !inBody) return 0;
        score += inTitle ? (inTitle.start ? 30 : 18) : 4;
      }
      if (entry.ft === phrase) score += 40;
      return score;
    }

    function searchTextFragment(heading) {
      if (!heading) return '';
      return '#:~:text=' + encodeURIComponent(heading.trim().slice(0, 90)).replace(/-/g, '%2D');
    }

    function appendSearchMessage(list, text) {
      var item = document.createElement('li');
      item.className = 'site-search-empty';
      item.textContent = text;
      list.appendChild(item);
    }

    function buildSearchResultItem(result, tokens) {
      var item = document.createElement('li');
      var link = document.createElement('a');
      link.className = 'site-search-result';
      var title = document.createElement('strong');
      var detail = document.createElement('span');
      detail.className = 'site-search-snippet';
      var targetId = 'glossar';
      if (result.kind === 'glossary') {
        link.href = pageHrefFor('glossar') + '#' + result.entry.key;
        link.classList.add('is-glossary');
        title.textContent = result.entry.title;
        var kind = document.createElement('em');
        kind.className = 'site-search-kind';
        kind.textContent = 'Glossar';
        title.appendChild(document.createTextNode(' '));
        title.appendChild(kind);
        link.appendChild(title);
        detail.textContent = result.entry.summary;
      } else {
        targetId = result.page.id;
        var snippet = result.section ? searchSnippet(result.section, tokens) : null;
        link.href = pageHrefFor(result.page.id) + (snippet ? searchTextFragment(result.section.h) : '');
        title.textContent = result.page.title.replace(' - Wa(h)re Haustier(liebe)', '');
        link.appendChild(title);
        if (snippet) {
          if (result.section.h) {
            var where = document.createElement('span');
            where.className = 'site-search-where';
            where.textContent = 'Abschnitt: ' + result.section.h;
            link.appendChild(where);
          }
          if (snippet.before) detail.appendChild(document.createTextNode('… '));
          snippet.parts.forEach(function(part) {
            if (part.mark) {
              var mark = document.createElement('mark');
              mark.textContent = part.text;
              detail.appendChild(mark);
            } else {
              detail.appendChild(document.createTextNode(part.text));
            }
          });
          if (snippet.after) detail.appendChild(document.createTextNode(' …'));
        } else {
          detail.textContent = result.page.description || 'Thema öffnen';
        }
      }
      link.appendChild(detail);
      link.addEventListener('click', function(event) {
        if (document.body && document.body.dataset.staticSite === 'true') return;
        event.preventDefault();
        navigateTo(targetId);
        closeSiteSearch();
      });
      item.appendChild(link);
      return item;
    }

    function renderSearchResults(query, list, options) {
      if (!list) return;
      var normalized = normalizeSearchValue(query);
      list.textContent = '';
      if (!normalized) {
        appendSearchMessage(list, options && options.emptyText ? options.emptyText : 'Gib ein Tier, ein Thema, ein Warnsignal oder einen Fachbegriff ein.');
        return;
      }
      if (!siteSearchState.data) {
        appendSearchMessage(list, 'Suche wird geladen …');
        loadSiteSearchIndex();
        return;
      }
      var tokens = searchQueryTokens(normalized);
      if (tokens.length) tokens = searchExpandCompounds(tokens, siteSearchState.data.pages);
      if (!tokens.length) {
        appendSearchMessage(list, 'Bitte gib mindestens ein Wort ein.');
        return;
      }
      var results = [];
      siteSearchState.data.pages.forEach(function(page) {
        var hit = scoreSearchPage(page, tokens, normalized);
        if (hit) results.push({ kind: 'page', page: page, score: hit.score, section: hit.section });
      });
      siteSearchState.data.glossary.forEach(function(entry) {
        var score = scoreSearchGlossary(entry, tokens, normalized);
        if (score) results.push({ kind: 'glossary', entry: entry, score: score + 6 });
      });
      results.sort(function(a, b) {
        return b.score - a.score || (a.kind === 'glossary' ? -1 : 1);
      });
      results = results.slice(0, options && options.limit ? options.limit : 10);
      if (!results.length) {
        appendSearchMessage(list, 'Kein Treffer. Versuch es mit einer Tierart, einem kürzeren Wort oder nur einem der Suchwörter.');
        return;
      }
      results.forEach(function(result) { list.appendChild(buildSearchResultItem(result, tokens)); });
    }

    (function bindSiteSearchLoading() {
      function track(inputId, listId, options) {
        var input = document.getElementById(inputId);
        var list = document.getElementById(listId);
        if (input && list && !siteSearchState.lists.some(function(job) { return job.input === input; })) {
          siteSearchState.lists.push({ input: input, list: list, options: options });
        }
      }
      function start() {
        track('site-search-input', 'site-search-results', undefined);
        track('mobile-site-search-input', 'mobile-site-search-results', { limit: 6 });
        track('start-site-search-input', 'start-site-search-results', { limit: 6 });
        loadSiteSearchIndex();
      }
      document.addEventListener('pointerdown', function(event) {
        if (event.target && event.target.classList && event.target.classList.contains('site-search-input')) start();
      });
      document.addEventListener('input', function(event) {
        if (event.target && event.target.classList && event.target.classList.contains('site-search-input')) start();
      }, true);
      document.addEventListener('click', function(event) {
        if (event.target && event.target.closest && event.target.closest('.nav-link-search')) start();
      });
    })();
