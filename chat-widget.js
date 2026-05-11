/* =========================================================
   Faperia — chat-widget.js
   AI chat widget. Self-contained IIFE, no build step.
   Posts to a Cloudflare Worker that proxies the Claude API.
   ========================================================= */

(function () {
  'use strict';

  /* ---------------- Configuration ---------------- */
  // Replace with your deployed Worker URL after `wrangler deploy`.
  // Form: https://faperia-chat.<your-account>.workers.dev
  var API_BASE = 'https://faperia-chat.nikita-zakaidze.workers.dev';

  var STORAGE_NOTICE_KEY = 'fp-chat-notice-dismissed';
  var SESSION_KEY = 'fp-chat-session-id';
  var MAX_INPUT_CHARS = 2000;

  /* ---------------- Strings (it/en) ---------------- */
  var STR = {
    'fab.aria':         { it: 'Apri la chat con l’assistente Faperia', en: 'Open the Faperia assistant chat' },
    'title':            { it: 'Assistente Faperia',       en: 'Faperia Assistant' },
    'subtitle.online':  { it: 'Online ora',               en: 'Online now' },
    'close.aria':       { it: 'Chiudi la chat',           en: 'Close chat' },
    'disclaimer.text':  {
      it: 'Stai parlando con un assistente AI. Le risposte possono contenere errori. Non inserire dati sensibili.',
      en: 'You are chatting with an AI assistant. Responses may contain errors. Do not share sensitive data.'
    },
    'disclaimer.dismiss.aria': { it: 'Chiudi avviso', en: 'Dismiss notice' },
    'greet.body':       {
      it: 'Ciao, sono l’assistente di Faperia. Posso raccontarti come funziona l’audit, le tre offerte, e rispondere alle tue domande sull’automazione per la tua azienda.',
      en: 'Hi, I’m the Faperia assistant. I can walk you through how the audit works, the three offers, and answer your questions about automation for your business.'
    },
    'greet.suggest':    { it: 'Prova a chiedermi:', en: 'Try asking:' },
    'chip.1':           { it: 'Quanto costa l’audit?',         en: 'How much does the audit cost?' },
    'chip.2':           { it: 'Come si svolge un progetto?',         en: 'How does a project unfold?' },
    'chip.3':           { it: 'Le offerte includono cosa?',           en: 'What’s included in the offers?' },
    'input.placeholder':{ it: 'Scrivi un messaggio…',           en: 'Type a message…' },
    'send.aria':        { it: 'Invia messaggio',                     en: 'Send message' },
    'footer.note':      { it: 'Assistente AI · può sbagliare', en: 'AI assistant · may make mistakes' },
    'error.network':    { it: 'Connessione interrotta. Riprova fra qualche istante.', en: 'Connection lost. Try again in a moment.' },
    'error.rate':       { it: 'Stai inviando troppi messaggi. Riprova fra qualche minuto.', en: 'Too many messages. Please try again in a few minutes.' },
    'error.generic':    { it: 'Qualcosa è andato storto. Riprova.', en: 'Something went wrong. Please try again.' }
  };

  function lang() {
    return document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'it';
  }
  function t(key) {
    var entry = STR[key];
    if (!entry) return '';
    return entry[lang()] || entry.it || '';
  }

  /* ---------------- Session id ---------------- */
  function getSessionId() {
    try {
      var existing = sessionStorage.getItem(SESSION_KEY);
      if (existing) return existing;
      var id = 'fp-' + Math.random().toString(36).slice(2, 10) + '-' + Date.now().toString(36);
      sessionStorage.setItem(SESSION_KEY, id);
      return id;
    } catch (e) {
      return 'fp-' + Math.random().toString(36).slice(2, 10);
    }
  }

  /* ---------------- State ---------------- */
  var state = {
    open: false,
    sending: false,
    messages: [],            // [{role:'user'|'assistant', content:string}]
    sessionId: getSessionId(),
    greetingShown: false,
    abortController: null
  };

  /* ---------------- DOM ---------------- */
  var els = {};

  function buildDom() {
    var root = document.createElement('div');
    root.className = 'fp-chat';
    root.setAttribute('data-state', 'closed');
    root.innerHTML = ''
      + '<button class="fp-chat-fab" type="button" aria-label="" aria-haspopup="dialog" aria-expanded="false">'
      +   '<svg viewBox="0 0 24 24" aria-hidden="true">'
      +     '<path d="M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 0 1-3.7-.7L3 21l1.6-4.3A7.9 7.9 0 0 1 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>'
      +     '<circle cx="9" cy="12" r="0.9" fill="currentColor" stroke="none"/>'
      +     '<circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none"/>'
      +     '<circle cx="15" cy="12" r="0.9" fill="currentColor" stroke="none"/>'
      +   '</svg>'
      + '</button>'
      + '<section class="fp-chat-panel" role="dialog" aria-modal="false" aria-labelledby="fp-chat-title" hidden>'
      +   '<header class="fp-chat-header">'
      +     '<div class="fp-chat-avatar" aria-hidden="true">F</div>'
      +     '<div class="fp-chat-title-block">'
      +       '<div class="fp-chat-title" id="fp-chat-title"></div>'
      +       '<div class="fp-chat-subtitle"></div>'
      +     '</div>'
      +     '<button class="fp-chat-close" type="button" aria-label="">×</button>'
      +   '</header>'
      +   '<div class="fp-chat-disclaimer-banner" hidden>'
      +     '<div class="fp-chat-disclaimer-text"></div>'
      +     '<button class="fp-chat-disclaimer-dismiss" type="button" aria-label="">×</button>'
      +   '</div>'
      +   '<ol class="fp-chat-msgs" aria-live="polite" aria-atomic="false"></ol>'
      +   '<form class="fp-chat-input" autocomplete="off">'
      +     '<textarea rows="1" maxlength="' + MAX_INPUT_CHARS + '" aria-label=""></textarea>'
      +     '<button class="fp-chat-send" type="submit" aria-label="" disabled>'
      +       '<svg viewBox="0 0 24 24" aria-hidden="true">'
      +         '<path d="M5 12h14M13 6l6 6-6 6"/>'
      +       '</svg>'
      +     '</button>'
      +   '</form>'
      +   '<p class="fp-chat-footer-note"></p>'
      + '</section>';

    document.body.appendChild(root);

    els.root          = root;
    els.fab           = root.querySelector('.fp-chat-fab');
    els.panel         = root.querySelector('.fp-chat-panel');
    els.title         = root.querySelector('.fp-chat-title');
    els.subtitle      = root.querySelector('.fp-chat-subtitle');
    els.closeBtn      = root.querySelector('.fp-chat-close');
    els.discBanner    = root.querySelector('.fp-chat-disclaimer-banner');
    els.discText      = root.querySelector('.fp-chat-disclaimer-text');
    els.discDismiss   = root.querySelector('.fp-chat-disclaimer-dismiss');
    els.msgs          = root.querySelector('.fp-chat-msgs');
    els.form          = root.querySelector('.fp-chat-input');
    els.textarea      = root.querySelector('.fp-chat-input textarea');
    els.sendBtn       = root.querySelector('.fp-chat-send');
    els.footerNote    = root.querySelector('.fp-chat-footer-note');
  }

  function applyStrings() {
    if (!els.root) return;
    els.fab.setAttribute('aria-label', t('fab.aria'));
    els.title.textContent = t('title');
    els.subtitle.textContent = t('subtitle.online');
    els.closeBtn.setAttribute('aria-label', t('close.aria'));
    els.discText.textContent = t('disclaimer.text');
    els.discDismiss.setAttribute('aria-label', t('disclaimer.dismiss.aria'));
    els.textarea.setAttribute('placeholder', t('input.placeholder'));
    els.textarea.setAttribute('aria-label', t('input.placeholder'));
    els.sendBtn.setAttribute('aria-label', t('send.aria'));
    els.footerNote.textContent = t('footer.note');

    // Refresh greeting text if greeting message is the only message
    if (state.messages.length === 0 && state.greetingShown) {
      renderGreeting();
    }
  }

  /* ---------------- Disclaimer ---------------- */
  function showDisclaimerIfNeeded() {
    var dismissed = false;
    try { dismissed = localStorage.getItem(STORAGE_NOTICE_KEY) === '1'; } catch (e) {}
    if (!dismissed) els.discBanner.hidden = false;
  }
  function dismissDisclaimer() {
    els.discBanner.hidden = true;
    try { localStorage.setItem(STORAGE_NOTICE_KEY, '1'); } catch (e) {}
  }

  /* ---------------- Open / close ---------------- */
  function openChat() {
    if (state.open) return;
    state.open = true;
    els.root.setAttribute('data-state', 'open');
    els.panel.hidden = false;
    els.fab.setAttribute('aria-expanded', 'true');
    showDisclaimerIfNeeded();
    if (!state.greetingShown) renderGreeting();
    // Focus the input after the panel transition (focus on mobile would open keyboard immediately, allow only on >=768)
    if (window.matchMedia('(min-width: 768px)').matches) {
      setTimeout(function () { els.textarea && els.textarea.focus(); }, 280);
    }
  }
  function closeChat() {
    if (!state.open) return;
    state.open = false;
    els.root.setAttribute('data-state', 'closed');
    els.fab.setAttribute('aria-expanded', 'false');
    // Hide panel after the CSS transition completes so it leaves the tab order
    setTimeout(function () {
      if (!state.open) els.panel.hidden = true;
    }, 260);
    // Abort any in-flight request
    if (state.abortController) {
      try { state.abortController.abort(); } catch (e) {}
      state.abortController = null;
    }
    els.fab.focus();
  }

  /* ---------------- Message rendering ---------------- */
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Lightweight inline formatting: **bold** -> <strong>, autolink URLs and mailto.
  function formatAssistantText(text) {
    var safe = escapeHtml(text);
    safe = safe.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    safe = safe.replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g, function (_, lead, url) {
      return lead + '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + url + '</a>';
    });
    safe = safe.replace(/(^|[\s(])([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g, function (_, lead, email) {
      return lead + '<a href="mailto:' + email + '">' + email + '</a>';
    });
    return safe;
  }

  function appendMessageEl(role, opts) {
    opts = opts || {};
    var li = document.createElement('li');
    li.className = 'fp-chat-msg';
    li.setAttribute('data-role', role);
    if (opts.error) li.classList.add('fp-chat-msg-error');

    var bubble = document.createElement('div');
    bubble.className = 'fp-chat-bubble';
    li.appendChild(bubble);

    els.msgs.appendChild(li);
    scrollToBottom();
    return { li: li, bubble: bubble };
  }

  function appendTyping() {
    var li = document.createElement('li');
    li.className = 'fp-chat-msg';
    li.setAttribute('data-role', 'assistant');
    li.setAttribute('data-typing', '1');
    li.innerHTML = '<div class="fp-chat-bubble"><span class="fp-chat-typing"><span></span><span></span><span></span></span></div>';
    els.msgs.appendChild(li);
    scrollToBottom();
    return li;
  }

  function scrollToBottom() {
    // requestAnimationFrame so DOM has flushed
    requestAnimationFrame(function () {
      els.msgs.scrollTop = els.msgs.scrollHeight;
    });
  }

  function renderGreeting() {
    state.greetingShown = true;
    // Clear any prior greeting elements
    Array.prototype.slice.call(els.msgs.querySelectorAll('[data-greeting]')).forEach(function (n) { n.remove(); });

    var li = document.createElement('li');
    li.className = 'fp-chat-msg';
    li.setAttribute('data-role', 'assistant');
    li.setAttribute('data-greeting', '1');
    li.innerHTML = ''
      + '<div class="fp-chat-bubble">' + escapeHtml(t('greet.body')) + '</div>'
      + '<div class="fp-chat-bubble" style="margin-top:8px;background:transparent;border:0;padding:4px 0 0;color:var(--muted);font-size:0.82rem;">' + escapeHtml(t('greet.suggest')) + '</div>'
      + '<div class="fp-chat-suggestions">'
      +   '<button class="fp-chat-chip" type="button" data-chip="chip.1">' + escapeHtml(t('chip.1')) + '</button>'
      +   '<button class="fp-chat-chip" type="button" data-chip="chip.2">' + escapeHtml(t('chip.2')) + '</button>'
      +   '<button class="fp-chat-chip" type="button" data-chip="chip.3">' + escapeHtml(t('chip.3')) + '</button>'
      + '</div>';
    els.msgs.appendChild(li);

    li.querySelectorAll('.fp-chat-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        var key = chip.getAttribute('data-chip');
        var text = t(key);
        if (text) {
          els.textarea.value = text;
          autoGrowTextarea();
          updateSendButton();
          submitMessage();
        }
      });
    });
  }

  /* ---------------- Send / receive ---------------- */
  function autoGrowTextarea() {
    els.textarea.style.height = 'auto';
    var max = 140;
    els.textarea.style.height = Math.min(els.textarea.scrollHeight, max) + 'px';
  }
  function updateSendButton() {
    var has = els.textarea.value.trim().length > 0;
    els.sendBtn.disabled = !has || state.sending;
  }

  async function submitMessage() {
    var text = els.textarea.value.trim();
    if (!text || state.sending) return;

    state.sending = true;
    els.textarea.disabled = true;
    updateSendButton();

    // Push user message
    state.messages.push({ role: 'user', content: text });
    var userBubble = appendMessageEl('user');
    userBubble.bubble.textContent = text;

    // Clear input
    els.textarea.value = '';
    autoGrowTextarea();

    // Remove greeting suggestions after first user turn (keep greeting text)
    var suggestions = els.msgs.querySelectorAll('.fp-chat-suggestions');
    suggestions.forEach(function (s) { s.remove(); });

    // Typing indicator while we wait for first token
    var typingEl = appendTyping();
    var assistantSlot = null;
    var assistantText = '';

    // Streaming fetch
    state.abortController = ('AbortController' in window) ? new AbortController() : null;

    try {
      var resp = await fetch(API_BASE + '/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'accept': 'text/event-stream' },
        body: JSON.stringify({
          sessionId: state.sessionId,
          lang: lang(),
          page: location.pathname,
          messages: state.messages
        }),
        signal: state.abortController ? state.abortController.signal : undefined
      });

      if (resp.status === 429) {
        typingEl.remove();
        var rl = appendMessageEl('assistant', { error: true });
        rl.bubble.textContent = t('error.rate');
        finishTurn();
        return;
      }
      if (!resp.ok || !resp.body) {
        typingEl.remove();
        var err = appendMessageEl('assistant', { error: true });
        err.bubble.textContent = t('error.generic');
        finishTurn();
        return;
      }

      var reader = resp.body.getReader();
      var decoder = new TextDecoder('utf-8');
      var buffer = '';

      // Read loop
      while (true) {
        var chunk = await reader.read();
        if (chunk.done) break;
        buffer += decoder.decode(chunk.value, { stream: true });

        // SSE frames separated by blank lines
        var frames = buffer.split('\n\n');
        buffer = frames.pop(); // last partial frame stays in buffer

        for (var i = 0; i < frames.length; i++) {
          var frame = frames[i];
          if (!frame) continue;
          var delta = parseSseFrame(frame);
          if (delta == null) continue;
          if (delta.error) {
            // Worker-level error event
            typingEl.remove();
            if (assistantSlot) assistantSlot.li.remove();
            var er = appendMessageEl('assistant', { error: true });
            er.bubble.textContent = delta.error || t('error.generic');
            finishTurn();
            return;
          }
          if (typeof delta.text === 'string' && delta.text.length) {
            if (!assistantSlot) {
              // Replace typing indicator with the assistant bubble on first token
              typingEl.remove();
              assistantSlot = appendMessageEl('assistant');
            }
            assistantText += delta.text;
            assistantSlot.bubble.innerHTML = formatAssistantText(assistantText);
            scrollToBottom();
          }
        }
      }

      if (!assistantSlot) {
        typingEl.remove();
        var nothing = appendMessageEl('assistant', { error: true });
        nothing.bubble.textContent = t('error.generic');
      } else {
        state.messages.push({ role: 'assistant', content: assistantText });
      }
    } catch (err) {
      if (err && err.name === 'AbortError') {
        // User closed the chat mid-stream — silent
        try { typingEl.remove(); } catch (e) {}
      } else {
        try { typingEl.remove(); } catch (e) {}
        var ne = appendMessageEl('assistant', { error: true });
        ne.bubble.textContent = t('error.network');
      }
    }

    finishTurn();
  }

  function finishTurn() {
    state.sending = false;
    state.abortController = null;
    els.textarea.disabled = false;
    updateSendButton();
    if (state.open && window.matchMedia('(min-width: 768px)').matches) {
      els.textarea.focus();
    }
  }

  // Parse one SSE frame (multi-line "event:" / "data:" pairs)
  function parseSseFrame(frame) {
    var eventName = 'message';
    var dataLines = [];
    var lines = frame.split('\n');
    for (var i = 0; i < lines.length; i++) {
      var ln = lines[i];
      if (!ln || ln.charAt(0) === ':') continue;
      if (ln.indexOf('event:') === 0) {
        eventName = ln.slice(6).trim();
      } else if (ln.indexOf('data:') === 0) {
        dataLines.push(ln.slice(5).replace(/^ /, ''));
      }
    }
    if (!dataLines.length) return null;
    var raw = dataLines.join('\n');
    if (raw === '[DONE]') return null;

    var json;
    try { json = JSON.parse(raw); } catch (e) { return null; }

    // The Worker relays Anthropic-shaped events. We care about content_block_delta with text_delta.
    if (eventName === 'content_block_delta' && json.delta && json.delta.type === 'text_delta') {
      return { text: json.delta.text || '' };
    }
    // The Worker may also send a custom error event
    if (eventName === 'error') {
      return { error: (json && (json.message || json.error)) || '' };
    }
    return null;
  }

  /* ---------------- Mobile keyboard handling ---------------- */
  function attachVisualViewport() {
    if (!window.visualViewport) return;
    var vv = window.visualViewport;
    function adjust() {
      if (!state.open) return;
      // On mobile fullscreen, shrink panel to viewport height so input stays visible above keyboard
      if (window.matchMedia('(max-width: 768px)').matches) {
        els.panel.style.height = vv.height + 'px';
      } else {
        els.panel.style.height = '';
      }
    }
    vv.addEventListener('resize', adjust);
    vv.addEventListener('scroll', adjust);
  }

  /* ---------------- Wire events ---------------- */
  function wire() {
    els.fab.addEventListener('click', openChat);
    els.closeBtn.addEventListener('click', closeChat);
    els.discDismiss.addEventListener('click', dismissDisclaimer);

    els.textarea.addEventListener('input', function () {
      autoGrowTextarea();
      updateSendButton();
    });
    els.textarea.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submitMessage();
      }
    });
    els.form.addEventListener('submit', function (e) {
      e.preventDefault();
      submitMessage();
    });

    // Esc closes
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && state.open) closeChat();
    });

    // Observe language changes (driven by existing script.js setting <html lang>)
    var mo = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        if (mutations[i].type === 'attributes' && mutations[i].attributeName === 'lang') {
          applyStrings();
          break;
        }
      }
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

    attachVisualViewport();
  }

  /* ---------------- Boot ---------------- */
  function boot() {
    buildDom();
    applyStrings();
    wire();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
