var AIML=(()=>{var S=class{constructor(e,t){this.apiUrl=e.replace(/\/$/,""),this.apiKey=t,this._abortController=null}async captureLead(e,t,i){if(!(await fetch(`${this.apiUrl}/v1/leads`,{method:"POST",headers:{"Content-Type":"application/json","X-Api-Key":this.apiKey},body:JSON.stringify({websiteId:e,email:t,question:i,visitorId:null})})).ok)throw new Error("lead capture failed")}abort(){this._abortController&&(this._abortController.abort(),this._abortController=null)}async send(e,t,i,r,a){this.abort(),this._abortController=new AbortController;let{signal:n}=this._abortController,s=JSON.stringify({message:e,conversationId:i,visitorId:r,history:t.slice(-6)}),o;try{o=await fetch(`${this.apiUrl}/v1/chat`,{method:"POST",headers:{"Content-Type":"application/json","X-Api-Key":this.apiKey},body:s,signal:n})}catch(u){if(u.name==="AbortError")return;a.onError("network");return}if(o.status===401){a.onError("auth");return}if(o.status===402){a.onError("quota");return}if(o.status===429){let u=o.headers.get("Retry-After")||"60";a.onError("rateLimit",u);return}if(o.status===404){a.onError("noContent");return}if(!o.ok){a.onError("server");return}let p=o.body.getReader(),b=new TextDecoder,h="";try{for(;;){let{done:u,value:E}=await p.read();if(u)break;h+=b.decode(E,{stream:!0});let y=h.split(`
`);h=y.pop();for(let d of y){if(!d.startsWith("data: "))continue;let c=d.slice(6).trim();if(c==="[DONE]"){a.onDone();return}try{let x=JSON.parse(c);x.token!==void 0&&a.onToken(x.token),x.citations&&a.onCitations(x.citations)}catch{}}}}catch(u){u.name!=="AbortError"&&a.onError("stream")}}};var T=`:host {
  --aiml-primary: #2563eb;
  --aiml-primary-dark: #1d4ed8;
  --aiml-bg: #ffffff;
  --aiml-surface: #f8fafc;
  --aiml-border: #e2e8f0;
  --aiml-text: #0f172a;
  --aiml-text-muted: #64748b;
  --aiml-radius: 12px;
  --aiml-shadow: 0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.08);
  --aiml-font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --aiml-z: 2147483647;
  all: initial;
  font-family: var(--aiml-font);
  font-size: 14px;
  line-height: 1.5;
  color: var(--aiml-text);
}

*, *::before, *::after { box-sizing: border-box; }

/* Trigger button */
.aiml-trigger {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--aiml-primary);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(37,99,235,0.4);
  transition: transform 0.2s, box-shadow 0.2s;
  z-index: var(--aiml-z);
  color: #fff;
  outline: none;
}
.aiml-trigger:hover { transform: scale(1.08); box-shadow: 0 6px 24px rgba(37,99,235,0.5); }
.aiml-trigger:focus-visible { outline: 3px solid var(--aiml-primary); outline-offset: 3px; }
.aiml-trigger[aria-expanded="true"] .aiml-icon-open { display: none; }
.aiml-trigger[aria-expanded="false"] .aiml-icon-close { display: none; }

/* Chat window */
.aiml-window {
  position: fixed;
  bottom: 96px;
  right: 24px;
  width: 380px;
  max-width: calc(100vw - 48px);
  height: 560px;
  max-height: calc(100vh - 120px);
  background: var(--aiml-bg);
  border: 1px solid var(--aiml-border);
  border-radius: var(--aiml-radius);
  box-shadow: var(--aiml-shadow);
  display: flex;
  flex-direction: column;
  z-index: var(--aiml-z);
  overflow: hidden;
  transform-origin: bottom right;
  transition: opacity 0.2s, transform 0.2s;
}
.aiml-window.aiml-hidden {
  opacity: 0;
  transform: scale(0.95) translateY(8px);
  pointer-events: none;
}
.aiml-window.aiml-left { right: auto; left: 24px; transform-origin: bottom left; }
.aiml-trigger.aiml-left { right: auto; left: 24px; }

/* Header */
.aiml-header {
  padding: 14px 16px;
  background: var(--aiml-primary);
  color: #fff;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
.aiml-avatar {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: rgba(255,255,255,0.25);
  display: flex; align-items: center; justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
}
.aiml-header-info { flex: 1; min-width: 0; }
.aiml-header-title { font-weight: 600; font-size: 14px; }
.aiml-header-subtitle { font-size: 11px; opacity: 0.85; }
.aiml-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.05em;
  background: rgba(255,255,255,0.2);
  border-radius: 4px;
  padding: 2px 6px;
  text-transform: uppercase;
  flex-shrink: 0;
}
.aiml-close-btn {
  background: none; border: none; color: rgba(255,255,255,0.8);
  cursor: pointer; padding: 4px; border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.15s, color 0.15s;
  flex-shrink: 0;
}
.aiml-close-btn:hover { background: rgba(255,255,255,0.15); color: #fff; }
.aiml-close-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.6); }

/* Messages */
.aiml-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  scroll-behavior: smooth;
}
.aiml-messages::-webkit-scrollbar { width: 4px; }
.aiml-messages::-webkit-scrollbar-thumb { background: var(--aiml-border); border-radius: 2px; }

.aiml-msg {
  display: flex;
  gap: 8px;
  max-width: 88%;
  animation: aiml-fade-in 0.2s ease;
}
@keyframes aiml-fade-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
.aiml-msg-user { align-self: flex-end; flex-direction: row-reverse; }
.aiml-msg-bubble {
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.5;
  word-break: break-word;
}
.aiml-msg-user .aiml-msg-bubble {
  background: var(--aiml-primary);
  color: #fff;
  border-bottom-right-radius: 4px;
}
.aiml-msg-bot .aiml-msg-bubble {
  background: var(--aiml-surface);
  color: var(--aiml-text);
  border: 1px solid var(--aiml-border);
  border-bottom-left-radius: 4px;
}

/* Markdown in bot bubbles */
.aiml-msg-bubble code {
  background: rgba(0,0,0,0.07);
  border-radius: 4px;
  padding: 1px 5px;
  font-size: 12px;
  font-family: 'Menlo', 'Consolas', monospace;
}
.aiml-msg-bubble pre {
  background: rgba(0,0,0,0.07);
  border-radius: 8px;
  padding: 10px 12px;
  overflow-x: auto;
  margin: 6px 0;
}
.aiml-msg-bubble pre code { background: none; padding: 0; }
.aiml-msg-bubble strong { font-weight: 600; }
.aiml-msg-bubble em { font-style: italic; }
.aiml-msg-bubble a { color: var(--aiml-primary); text-decoration: underline; }
.aiml-msg-user .aiml-msg-bubble a { color: rgba(255,255,255,0.9); }
.aiml-msg-bubble ul, .aiml-msg-bubble ol { padding-left: 18px; margin: 4px 0; }
.aiml-msg-bubble li { margin: 2px 0; }
.aiml-msg-bubble p { margin: 4px 0; }
.aiml-msg-bubble p:first-child { margin-top: 0; }
.aiml-msg-bubble p:last-child { margin-bottom: 0; }

/* Citations */
.aiml-citations {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--aiml-border);
  font-size: 12px;
  color: var(--aiml-text-muted);
}
.aiml-citations-title { font-weight: 600; margin-bottom: 4px; }
.aiml-citation-link {
  display: block;
  color: var(--aiml-primary);
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 1px 0;
}
.aiml-citation-link:hover { text-decoration: underline; }

/* Typing indicator */
.aiml-typing { display: flex; gap: 4px; padding: 10px 14px; align-items: center; }
.aiml-typing span {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: var(--aiml-text-muted);
  animation: aiml-bounce 1.2s ease infinite;
}
.aiml-typing span:nth-child(2) { animation-delay: 0.2s; }
.aiml-typing span:nth-child(3) { animation-delay: 0.4s; }
@keyframes aiml-bounce { 0%,60%,100% { transform: translateY(0); } 30% { transform: translateY(-6px); } }

/* Input area */
.aiml-input-area {
  padding: 12px;
  border-top: 1px solid var(--aiml-border);
  display: flex;
  gap: 8px;
  align-items: flex-end;
  flex-shrink: 0;
  background: var(--aiml-bg);
}
.aiml-input {
  flex: 1;
  border: 1px solid var(--aiml-border);
  border-radius: 20px;
  padding: 9px 14px;
  font-size: 14px;
  font-family: var(--aiml-font);
  color: var(--aiml-text);
  background: var(--aiml-surface);
  resize: none;
  max-height: 120px;
  min-height: 38px;
  outline: none;
  transition: border-color 0.15s;
  line-height: 1.4;
}
.aiml-input::placeholder { color: var(--aiml-text-muted); }
.aiml-input:focus { border-color: var(--aiml-primary); background: var(--aiml-bg); }
.aiml-send-btn {
  width: 38px; height: 38px;
  border-radius: 50%;
  background: var(--aiml-primary);
  border: none;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: #fff;
  flex-shrink: 0;
  transition: background 0.15s, transform 0.15s;
}
.aiml-send-btn:hover { background: var(--aiml-primary-dark); }
.aiml-send-btn:focus-visible { outline: 3px solid var(--aiml-primary); outline-offset: 2px; }
.aiml-send-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

/* Footer / branding */
.aiml-footer {
  padding: 6px 12px;
  text-align: center;
  border-top: 1px solid var(--aiml-border);
  flex-shrink: 0;
}
.aiml-badge {
  font-size: 11px;
  color: var(--aiml-text-muted);
  text-decoration: none;
}
.aiml-badge:hover { color: var(--aiml-primary); }
.aiml-footer.aiml-no-brand { display: none; }

/* Error / status messages */
.aiml-status {
  text-align: center;
  padding: 8px 12px;
  font-size: 12px;
  border-radius: 8px;
  margin: 0 8px;
}
.aiml-status-error { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
.aiml-status-info { background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; }
.aiml-status-warn { background: #fffbeb; color: #d97706; border: 1px solid #fde68a; }

/* Lead capture form */
.aiml-lead-form { padding: 12px; background: #f8fafc; border-radius: 12px; margin: 4px 0; }
.aiml-lead-text { font-size: 13px; color: var(--aiml-text-muted); margin-bottom: 8px; }
.aiml-lead-row { display: flex; gap: 8px; }
.aiml-lead-email {
  flex: 1; padding: 8px 10px; border: 1px solid var(--aiml-border);
  border-radius: 8px; font-size: 13px; background: var(--aiml-bg); color: var(--aiml-text);
  outline: none;
}
.aiml-lead-email:focus { border-color: var(--aiml-primary); }
.aiml-lead-submit {
  padding: 8px 14px; background: var(--aiml-primary); color: #fff;
  border: none; border-radius: 8px; font-size: 13px; cursor: pointer; white-space: nowrap;
}
.aiml-lead-submit:hover { opacity: 0.9; }
.aiml-lead-submit:disabled { opacity: 0.5; cursor: not-allowed; }
.aiml-lead-error { font-size: 12px; color: #dc2626; margin-top: 4px; }
.aiml-lead-success { font-size: 13px; color: #16a34a; margin-top: 4px; font-weight: 500; }
.aiml-hidden { display: none !important; }

/* Welcome / empty state */
.aiml-welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 32px 16px 16px;
  flex: 1;
}
.aiml-welcome-icon {
  font-size: 32px;
  margin-bottom: 12px;
  opacity: 0.85;
}
.aiml-welcome-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--aiml-text);
  margin: 0 0 6px;
}
.aiml-welcome-sub {
  font-size: 13px;
  color: var(--aiml-text-muted);
  margin: 0 0 16px;
  line-height: 1.5;
}
.aiml-suggested {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  max-width: 320px;
}
.aiml-suggested-btn {
  text-align: left;
  padding: 10px 13px;
  background: var(--aiml-bg);
  border: 1px solid var(--aiml-border);
  border-radius: 10px;
  font-size: 13px;
  color: var(--aiml-text);
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
  font-family: var(--aiml-font);
  line-height: 1.4;
}
.aiml-suggested-btn:hover {
  border-color: var(--aiml-primary);
  background: var(--aiml-surface);
}
.aiml-suggested-btn:focus-visible {
  outline: 2px solid var(--aiml-primary);
  outline-offset: 1px;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :host([data-theme="auto"]), :host([data-theme="dark"]) {
    --aiml-bg: #1e293b;
    --aiml-surface: #0f172a;
    --aiml-border: #334155;
    --aiml-text: #f1f5f9;
    --aiml-text-muted: #94a3b8;
    --aiml-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3);
  }
}
:host([data-theme="dark"]) {
  --aiml-bg: #1e293b;
  --aiml-surface: #0f172a;
  --aiml-border: #334155;
  --aiml-text: #f1f5f9;
  --aiml-text-muted: #94a3b8;
}
`;function L(l){if(!l)return"";let e=N(l);e=e.replace(/```(\w*)\n([\s\S]*?)```/g,(s,o,p)=>`<pre><code>${p.trimEnd()}</code></pre>`),e=e.replace(/`([^`]+)`/g,"<code>$1</code>"),e=e.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>"),e=e.replace(/__(.+?)__/g,"<strong>$1</strong>"),e=e.replace(/\*([^*\n]+)\*/g,"<em>$1</em>"),e=e.replace(/_([^_\n]+)_/g,"<em>$1</em>"),e=e.replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');let t=e.split(`
`),i=[],r=!1,a=!1;for(let s=0;s<t.length;s++){let o=t[s],p=o.match(/^(#{1,3}) (.+)/);if(p){n();let u=Math.min(p[1].length+2,6);i.push(`<h${u}>${p[2]}</h${u}>`);continue}let b=o.match(/^[-*] (.+)/);if(b){r||(i.push("<ul>"),r=!0),i.push(`<li>${b[1]}</li>`);continue}let h=o.match(/^\d+\. (.+)/);if(h){a||(i.push("<ol>"),a=!0),i.push(`<li>${h[1]}</li>`);continue}n(),o.trim()===""?i.push(""):i.push(`<p>${o}</p>`)}n();function n(){r&&(i.push("</ul>"),r=!1),a&&(i.push("</ol>"),a=!1)}return i.join(`
`).replace(/<\/p>\n<p>/g,"<br>").replace(/\n{2,}/g,`
`)}function N(l){return l.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}var v={chat:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',close:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',send:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',bot:"\u{1F916}"},A=class{constructor(e){this.config=e,this.host=null,this.shadow=null,this.isOpen=!1,this._streaming=!1,this._streamingEl=null,this._streamBuffer=""}mount(){this.host=document.createElement("div"),this.host.setAttribute("id","aiml-widget-host"),this.host.setAttribute("data-theme",this.config.theme||"auto"),document.body.appendChild(this.host),this.shadow=this.host.attachShadow({mode:"open"});let e=document.createElement("style");e.textContent=T,this.shadow.appendChild(e),this.config.primaryColor&&(e.textContent+=`:host { --aiml-primary: ${this.config.primaryColor}; }`),this.shadow.appendChild(this._buildTrigger()),this.shadow.appendChild(this._buildWindow()),this._bindEvents(),this._focusTrap()}_buildTrigger(){let e=document.createElement("button");return e.className=`aiml-trigger${this.config.position==="left"?" aiml-left":""}`,e.setAttribute("aria-label","Open AI chat assistant"),e.setAttribute("aria-expanded","false"),e.setAttribute("aria-controls","aiml-chat-window"),e.innerHTML=`
      <span class="aiml-icon-open" aria-hidden="true">${v.chat}</span>
      <span class="aiml-icon-close" aria-hidden="true">${v.close}</span>`,e}_buildWindow(){let e=document.createElement("div");return e.className=`aiml-window aiml-hidden${this.config.position==="left"?" aiml-left":""}`,e.setAttribute("id","aiml-chat-window"),e.setAttribute("role","dialog"),e.setAttribute("aria-label","AI Chat Assistant"),e.setAttribute("aria-modal","false"),e.innerHTML=`
      <div class="aiml-header">
        <div class="aiml-avatar" aria-hidden="true">${v.bot}</div>
        <div class="aiml-header-info">
          <div class="aiml-header-title">${w(this.config.title||"AI Assistant")}</div>
          <div class="aiml-header-subtitle">${w(this.config.subtitle||"Ask me anything")}</div>
        </div>
        <span class="aiml-label" title="Powered by AI">AI</span>
        <button class="aiml-close-btn" aria-label="Close chat">
          ${v.close}
        </button>
      </div>
      <div class="aiml-messages" role="log" aria-live="polite" aria-label="Chat messages"></div>
      <div class="aiml-input-area">
        <textarea
          class="aiml-input"
          placeholder="${w(this.config.placeholder||"Ask a question\u2026")}"
          rows="1"
          aria-label="Chat message input"
          aria-multiline="true"
        ></textarea>
        <button class="aiml-send-btn" aria-label="Send message" disabled>
          ${v.send}
        </button>
      </div>
      <div class="aiml-footer${this.config.showBranding===!1?" aiml-no-brand":""}">
        <a class="aiml-badge" href="https://aiml.chat?ref=widget" target="_blank" rel="noopener noreferrer" tabindex="${this.config.showBranding===!1?"-1":"0"}">
          Powered by aiml.chat
        </a>
      </div>`,e}_bindEvents(){let e=this.shadow,t=e.querySelector(".aiml-trigger"),i=e.querySelector(".aiml-close-btn"),r=e.querySelector(".aiml-input"),a=e.querySelector(".aiml-send-btn");t.addEventListener("click",()=>this.toggle()),i.addEventListener("click",()=>this.close()),r.addEventListener("input",()=>{a.disabled=!r.value.trim(),r.style.height="auto",r.style.height=Math.min(r.scrollHeight,120)+"px"}),r.addEventListener("keydown",s=>{s.key==="Enter"&&!s.shiftKey&&(s.preventDefault(),a.disabled||this._emitSend(r.value.trim()))}),a.addEventListener("click",()=>{a.disabled||this._emitSend(r.value.trim())}),e.addEventListener("keydown",s=>{s.key==="Escape"&&this.isOpen&&this.close()}),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{this.config.theme==="auto"&&this.host.setAttribute("data-theme","auto")})}_focusTrap(){let e=this.shadow;e.addEventListener("keydown",t=>{if(t.key!=="Tab"||!this.isOpen)return;let i=[...e.querySelectorAll('button:not([disabled]), textarea, a[href], [tabindex]:not([tabindex="-1"])')].filter(n=>!n.closest(".aiml-window.aiml-hidden"));if(!i.length)return;let r=i[0],a=i[i.length-1];t.shiftKey&&document.activeElement===r?(t.preventDefault(),a.focus()):!t.shiftKey&&document.activeElement===a&&(t.preventDefault(),r.focus())})}_emitSend(e){if(!e||this._streaming)return;let t=new CustomEvent("aiml:send",{detail:{text:e},bubbles:!0});this.host.dispatchEvent(t)}open(){if(this.isOpen)return;this.isOpen=!0;let e=this.shadow.querySelector(".aiml-window"),t=this.shadow.querySelector(".aiml-trigger");e.classList.remove("aiml-hidden"),t.setAttribute("aria-expanded","true"),t.setAttribute("aria-label","Close AI chat assistant"),setTimeout(()=>this.shadow.querySelector(".aiml-input")?.focus(),100),this.config.onOpen&&this.config.onOpen()}close(){if(!this.isOpen)return;this.isOpen=!1;let e=this.shadow.querySelector(".aiml-window"),t=this.shadow.querySelector(".aiml-trigger");e.classList.add("aiml-hidden"),t.setAttribute("aria-expanded","false"),t.setAttribute("aria-label","Open AI chat assistant"),t.focus(),this.config.onClose&&this.config.onClose()}toggle(){this.isOpen?this.close():this.open()}appendUserMessage(e){let t=this.shadow.querySelector(".aiml-messages"),i=document.createElement("div");return i.className="aiml-msg aiml-msg-user",i.setAttribute("role","article"),i.setAttribute("aria-label","You"),i.innerHTML=`<div class="aiml-msg-bubble">${_(e)}</div>`,t.appendChild(i),this._scrollToBottom(),i}startBotMessage(){let e=this.shadow.querySelector(".aiml-messages");this._streaming=!0,this._streamBuffer="";let t=document.createElement("div");t.className="aiml-msg aiml-msg-bot aiml-typing-indicator",t.setAttribute("aria-label","AI is typing"),t.innerHTML='<div class="aiml-msg-bubble"><div class="aiml-typing"><span></span><span></span><span></span></div></div>',e.appendChild(t),this._scrollToBottom(),this._streamingEl=null,this._typingEl=t;let i=this.shadow.querySelector(".aiml-input"),r=this.shadow.querySelector(".aiml-send-btn");return i.disabled=!0,r.disabled=!0,{typing:t}}appendToken(e){if(this._streaming){if(this._streamBuffer+=e,this._typingEl){this._typingEl.remove(),this._typingEl=null;let t=this.shadow.querySelector(".aiml-messages"),i=document.createElement("div");i.className="aiml-msg aiml-msg-bot",i.setAttribute("role","article"),i.setAttribute("aria-label","AI Assistant"),i.innerHTML='<div class="aiml-msg-bubble"></div>',t.appendChild(i),this._streamingEl=i.querySelector(".aiml-msg-bubble")}this._streamingEl&&(this._streamingEl.innerHTML=L(this._streamBuffer),this._scrollToBottom())}}finishBotMessage(e){if(this._streaming=!1,this._typingEl&&(this._typingEl.remove(),this._typingEl=null),this._streamingEl&&e?.length){let r=document.createElement("div");r.className="aiml-citations",r.innerHTML='<div class="aiml-citations-title">Sources</div>'+e.map(a=>`<a class="aiml-citation-link" href="${w(a.sourceUrl)}" target="_blank" rel="noopener noreferrer" title="${w(a.title||a.sourceUrl)}">${_(a.title||a.sourceUrl)}</a>`).join(""),this._streamingEl.appendChild(r)}this._streamingEl=null,this._scrollToBottom();let t=this.shadow.querySelector(".aiml-input");t.disabled=!1,t.value="",t.style.height="",t.focus();let i=this.shadow.querySelector(".aiml-send-btn");i.disabled=!0}showStatus(e,t){let i=this.shadow.querySelector(".aiml-messages"),r=i.querySelector(".aiml-status");r&&r.remove();let a=document.createElement("div");if(a.className=`aiml-status aiml-status-${e}`,a.setAttribute("role","alert"),a.textContent=t,i.appendChild(a),this._scrollToBottom(),e==="error"||e==="warn"){this._streaming=!1,this._typingEl&&(this._typingEl.remove(),this._typingEl=null);let n=this.shadow.querySelector(".aiml-input");n.disabled=!1;let s=this.shadow.querySelector(".aiml-send-btn");s.disabled=!n.value.trim()}}showGreeting(e){if(!e)return;let t=this.shadow.querySelector(".aiml-messages"),i=document.createElement("div");i.className="aiml-msg aiml-msg-bot",i.setAttribute("role","article"),i.setAttribute("aria-label","AI Assistant"),i.innerHTML=`<div class="aiml-msg-bubble">${L(e)}</div>`,t.appendChild(i)}showWelcomeState(e,t){let i=this.shadow.querySelector(".aiml-messages"),r=i.querySelector(".aiml-welcome");r&&r.remove();let a=document.createElement("div");a.className="aiml-welcome";let n=e||"Ask me anything",s=Array.isArray(t)?t.slice(0,4):[];a.innerHTML=`
      <div class="aiml-welcome-icon" aria-hidden="true">\u2728</div>
      <p class="aiml-welcome-title">${_(n)}</p>
      <p class="aiml-welcome-sub">I answer from this site's content \u2014 with cited sources.</p>
      ${s.length?`<div class="aiml-suggested" role="list">${s.map(o=>`<button class="aiml-suggested-btn" type="button" role="listitem">${_(o)}</button>`).join("")}</div>`:""}`,a.querySelectorAll(".aiml-suggested-btn").forEach(o=>{o.addEventListener("click",()=>{a.remove(),this._emitSend(o.textContent)})}),i.appendChild(a),this._scrollToBottom()}hideWelcomeState(){let t=this.shadow.querySelector(".aiml-messages").querySelector(".aiml-welcome");t&&t.remove()}showLeadCaptureForm(e,t){let i=this.shadow.querySelector(".aiml-messages"),r=document.createElement("div");r.className="aiml-lead-form",r.setAttribute("role","form"),r.innerHTML=`
      <p class="aiml-lead-text">I couldn't find an answer. Leave your email and we'll get back to you.</p>
      <div class="aiml-lead-row">
        <input class="aiml-lead-email" type="email" placeholder="your@email.com" aria-label="Your email address" />
        <button class="aiml-lead-submit" type="button">Notify me</button>
      </div>
      <p class="aiml-lead-error aiml-hidden" role="alert">Please enter a valid email.</p>
      <p class="aiml-lead-success aiml-hidden" role="status">Thanks! We'll be in touch.</p>`;let a=r.querySelector(".aiml-lead-email"),n=r.querySelector(".aiml-lead-submit"),s=r.querySelector(".aiml-lead-error"),o=r.querySelector(".aiml-lead-success");n.addEventListener("click",async()=>{let p=a.value.trim();if(!p||!p.includes("@")){s.classList.remove("aiml-hidden");return}s.classList.add("aiml-hidden"),n.disabled=!0;try{await t(p,e),a.classList.add("aiml-hidden"),n.classList.add("aiml-hidden"),o.classList.remove("aiml-hidden")}catch{n.disabled=!1,s.textContent="Failed to submit. Please try again.",s.classList.remove("aiml-hidden")}}),i.appendChild(r),this._scrollToBottom(),setTimeout(()=>a.focus(),50)}_scrollToBottom(){let e=this.shadow.querySelector(".aiml-messages");e&&(e.scrollTop=e.scrollHeight)}};function _(l){return String(l).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function w(l){return String(l||"").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}(function(){"use strict";if(window.__aimlWidgetLoaded)return;window.__aimlWidgetLoaded=!0;let l=document.currentScript||document.querySelector("script[data-api-key]");if(!l){console.warn("[AIML] No script tag found with data-api-key attribute.");return}let e=l.getAttribute("data-api-key"),t=l.getAttribute("data-website-id"),i=l.getAttribute("data-api-url")||"https://api.aiml.chat",r=l.getAttribute("data-position")||"right",a=l.getAttribute("data-theme")||"auto",n=l.getAttribute("data-primary-color")||null,s=l.getAttribute("data-suggested-questions"),o=s?s.split("|").map(d=>d.trim()).filter(Boolean):null;if(!e){console.warn("[AIML] Missing data-api-key on script tag.");return}let p=`aiml_session_${t||"default"}`;function b(){try{let d=sessionStorage.getItem(p);return d?JSON.parse(d):{conversationId:null,history:[],visitorId:u()}}catch{return{conversationId:null,history:[],visitorId:u()}}}function h(d){try{sessionStorage.setItem(p,JSON.stringify(d))}catch{}}function u(){return"v-"+Math.random().toString(36).slice(2)+Date.now().toString(36)}async function E(){try{let d=await fetch(`${i}/v1/widgets/${encodeURIComponent(e)}/config`,{headers:{"X-Api-Key":e}});if(d.ok)return await d.json()}catch{}return{}}async function y(){let d=await E(),c=b(),x=o??d.suggestedQuestions??[],C={position:r,theme:a,primaryColor:n,title:d.title||"AI Assistant",subtitle:d.subtitle||"Ask me anything",placeholder:d.placeholder||"Ask a question\u2026",greeting:d.greeting||null,showBranding:d.showBranding!==!1,suggestedQuestions:x},m=new A(C),$=new S(i,e);if(m.mount(),c.history.length===0){let q=m.open.bind(m),g=!1;m.open=function(){q(),g||(g=!0,m.showWelcomeState(C.greeting,C.suggestedQuestions))}}m.host.addEventListener("aiml:send",async q=>{let g=q.detail.text;m.hideWelcomeState(),c.history.push({role:"user",content:g}),h(c),m.appendUserMessage(g),m.startBotMessage();let k="";await $.send(g,c.history.slice(0,-1),c.conversationId,c.visitorId,{onToken(f){k+=f,m.appendToken(f)},onCitations(f){m.finishBotMessage(f),c.history.push({role:"assistant",content:k}),h(c)},onDone(){k&&(m.finishBotMessage([]),c.history.push({role:"assistant",content:k}),h(c))},onError(f,M){if(f==="noContent"&&t){m.showLeadCaptureForm(g,async(B,z)=>{await $.captureLead(t,B,z)});return}let I={auth:"Authentication failed. Please check your API key.",quota:"Monthly message quota reached. Please upgrade your plan.",rateLimit:`Too many requests. Please wait ${M||60} seconds.`,noContent:"No answer found. Please contact us directly.",network:"Connection error. Please check your network and try again.",stream:"Stream interrupted. Please try again.",server:"Server error. Please try again later."};m.showStatus("error",I[f]||"Something went wrong. Please try again.")}})}),window.AIML={open:()=>m.open(),close:()=>m.close(),toggle:()=>m.toggle(),clearHistory:()=>{c.history=[],c.conversationId=null,h(c)}}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",y):y()})();})();
