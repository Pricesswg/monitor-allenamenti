function t(t,e,i,r){var s,o=arguments.length,a=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var n=t.length-1;n>=0;n--)(s=t[n])&&(a=(o<3?s(a):o>3?s(e,i,a):s(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),s=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new o(i,t,r)},n=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,r))(e)})(t):t,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:v}=Object,g=globalThis,u=g.trustedTypes,m=u?u.emptyScript:"",x=g.reactiveElementPolyfillSupport,b=(t,e)=>t,f={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},_=(t,e)=>!l(t,e),k={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:_};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=k){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);void 0!==r&&d(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:s}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const o=r?.call(this);s?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??k}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=v(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...p(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,r)=>{if(i)t.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of r){const r=document.createElement("style"),s=e.litNonce;void 0!==s&&r.setAttribute("nonce",s),r.textContent=i.cssText,t.appendChild(r)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(void 0!==r&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=i.getPropertyOptions(r),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:f;this._$Em=r;const o=s.fromAttribute(e,t.type);this[r]=o??this._$Ej?.get(r)??o,this._$Em=null}}requestUpdate(t,e,i,r=!1,s){if(void 0!==t){const o=this.constructor;if(!1===r&&(s=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??_)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:s},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==s||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,i,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[b("elementProperties")]=new Map,y[b("finalized")]=new Map,x?.({ReactiveElement:y}),(g.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,w=t=>t,C=$.trustedTypes,A=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,z="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+M,P=`<${S}>`,E=document,H=()=>E.createComment(""),I=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,O="[ \t\n\f\r]",B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,N=/>/g,R=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,U=/"/g,L=/^(?:script|style|textarea|title)$/i,V=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),W=V(1),F=V(2),q=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),K=new WeakMap,Z=E.createTreeWalker(E,129);function J(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const X=(t,e)=>{const i=t.length-1,r=[];let s,o=2===e?"<svg>":3===e?"<math>":"",a=B;for(let e=0;e<i;e++){const i=t[e];let n,l,d=-1,c=0;for(;c<i.length&&(a.lastIndex=c,l=a.exec(i),null!==l);)c=a.lastIndex,a===B?"!--"===l[1]?a=j:void 0!==l[1]?a=N:void 0!==l[2]?(L.test(l[2])&&(s=RegExp("</"+l[2],"g")),a=R):void 0!==l[3]&&(a=R):a===R?">"===l[0]?(a=s??B,d=-1):void 0===l[1]?d=-2:(d=a.lastIndex-l[2].length,n=l[1],a=void 0===l[3]?R:'"'===l[3]?U:D):a===U||a===D?a=R:a===j||a===N?a=B:(a=R,s=void 0);const p=a===R&&t[e+1].startsWith("/>")?" ":"";o+=a===B?i+P:d>=0?(r.push(n),i.slice(0,d)+z+i.slice(d)+M+p):i+M+(-2===d?e:p)}return[J(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class Y{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let s=0,o=0;const a=t.length-1,n=this.parts,[l,d]=X(t,e);if(this.el=Y.createElement(l,i),Z.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=Z.nextNode())&&n.length<a;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(z)){const e=d[o++],i=r.getAttribute(t).split(M),a=/([.?@])?(.*)/.exec(e);n.push({type:1,index:s,name:a[2],strings:i,ctor:"."===a[1]?rt:"?"===a[1]?st:"@"===a[1]?ot:it}),r.removeAttribute(t)}else t.startsWith(M)&&(n.push({type:6,index:s}),r.removeAttribute(t));if(L.test(r.tagName)){const t=r.textContent.split(M),e=t.length-1;if(e>0){r.textContent=C?C.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],H()),Z.nextNode(),n.push({type:2,index:++s});r.append(t[e],H())}}}else if(8===r.nodeType)if(r.data===S)n.push({type:2,index:s});else{let t=-1;for(;-1!==(t=r.data.indexOf(M,t+1));)n.push({type:7,index:s}),t+=M.length-1}s++}}static createElement(t,e){const i=E.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,r){if(e===q)return e;let s=void 0!==r?i._$Co?.[r]:i._$Cl;const o=I(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),void 0===o?s=void 0:(s=new o(t),s._$AT(t,i,r)),void 0!==r?(i._$Co??=[])[r]=s:i._$Cl=s),void 0!==s&&(e=Q(t,s._$AS(t,e.values),s,r)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??E).importNode(e,!0);Z.currentNode=r;let s=Z.nextNode(),o=0,a=0,n=i[0];for(;void 0!==n;){if(o===n.index){let e;2===n.type?e=new et(s,s.nextSibling,this,t):1===n.type?e=new n.ctor(s,n.name,n.strings,this,t):6===n.type&&(e=new at(s,this,t)),this._$AV.push(e),n=i[++a]}o!==n?.index&&(s=Z.nextNode(),o++)}return Z.currentNode=E,r}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),I(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==G&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(E.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new tt(r,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=K.get(t.strings);return void 0===e&&K.set(t.strings,e=new Y(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const s of t)r===e.length?e.push(i=new et(this.O(H()),this.O(H()),this,this.options)):i=e[r],i._$AI(s),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,s){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(t,e=this,i,r){const s=this.strings;let o=!1;if(void 0===s)t=Q(this,t,e,0),o=!I(t)||t!==this._$AH&&t!==q,o&&(this._$AH=t);else{const r=t;let a,n;for(t=s[0],a=0;a<s.length-1;a++)n=Q(this,r[i+a],e,a),n===q&&(n=this._$AH[a]),o||=!I(n)||n!==this._$AH[a],n===G?t=G:t!==G&&(t+=(n??"")+s[a+1]),this._$AH[a]=n}o&&!r&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class rt extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}class st extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==G)}}class ot extends it{constructor(t,e,i,r,s){super(t,e,i,r,s),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??G)===q)return;const i=this._$AH,r=t===G&&i!==G||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==G&&(i===G||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class at{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const nt=$.litHtmlPolyfillSupport;nt?.(Y,et),($.litHtmlVersions??=[]).push("3.3.3");const lt=globalThis;class dt extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const r=i?.renderBefore??e;let s=r._$litPart$;if(void 0===s){const t=i?.renderBefore??null;r._$litPart$=s=new et(e.insertBefore(H(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}dt._$litElement$=!0,dt.finalized=!0,lt.litElementHydrateSupport?.({LitElement:dt});const ct=lt.litElementPolyfillSupport;ct?.({LitElement:dt}),(lt.litElementVersions??=[]).push("4.2.2");const pt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:_},vt=(t=ht,e,i)=>{const{kind:r,metadata:s}=i;let o=globalThis.litPropertyMetadata.get(s);if(void 0===o&&globalThis.litPropertyMetadata.set(s,o=new Map),"setter"===r&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===r){const{name:r}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(r,s,t,!0,i)},init(e){return void 0!==e&&this.C(r,void 0,t,e),e}}}if("setter"===r){const{name:r}=i;return function(i){const s=this[r];e.call(this,i),this.requestUpdate(r,s,t,!0,i)}}throw Error("Unsupported decorator location: "+r)};function gt(t){return(e,i)=>"object"==typeof i?vt(t,e,i):((t,e,i)=>{const r=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),r?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return gt({...t,state:!0,attribute:!1})}const mt=a`
  :host {
    display: block;
    height: 100%;
    box-sizing: border-box;
  }
  :host([panel-mode]) {
    padding-top: var(--monitor-panel-offset, var(--header-height, 56px));
  }
  :host {
    --font-sans: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: "JetBrains Mono", ui-monospace, Menlo, monospace;

    --bg: var(--ha-card-background, var(--card-background-color, var(--primary-background-color, oklch(0.985 0.004 85))));
    --bg-soft: var(--secondary-background-color, var(--primary-background-color, oklch(0.965 0.005 85)));
    --bg-sunken: var(--primary-background-color, var(--secondary-background-color, oklch(0.945 0.006 85)));
    --surface: var(--ha-card-background, var(--card-background-color, #ffffff));
    --border: var(--divider-color, oklch(0.90 0.006 85));
    --border-soft: var(--divider-color, oklch(0.93 0.005 85));
    --text: var(--primary-text-color, oklch(0.22 0.012 85));
    --text-soft: var(--secondary-text-color, oklch(0.42 0.012 85));
    --text-muted: var(--disabled-text-color, var(--secondary-text-color, oklch(0.60 0.010 85)));

    --accent: var(--accent-color, oklch(0.55 0.15 265));
    --accent-soft: oklch(0.93 0.04 265);
    --accent-ink: oklch(0.35 0.15 265);

    --ok: var(--success-color, oklch(0.65 0.14 155));
    --ok-soft: oklch(0.93 0.04 155);
    --warn: var(--warning-color, oklch(0.72 0.15 65));
    --warn-soft: oklch(0.95 0.04 65);
    --danger: var(--error-color, oklch(0.60 0.18 25));
    --danger-soft: oklch(0.95 0.04 25);
    --info: var(--info-color, oklch(0.60 0.13 230));

    --xp: oklch(0.72 0.15 65);
    --xp-soft: oklch(0.95 0.04 65);
    --xp-ink: oklch(0.48 0.15 65);
    --streak: oklch(0.62 0.20 30);
    --streak-soft: oklch(0.95 0.04 30);

    --r-sm: 6px;
    --r-md: 10px;
    --r-lg: 16px;
    --r-xl: 22px;
    --r-pill: 999px;

    --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.06);
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
    --shadow-md: 0 4px 14px rgba(0, 0, 0, 0.10), 0 2px 4px rgba(0, 0, 0, 0.06);

    --density-pad: 16px;
    --density-gap: 16px;

    font-family: var(--font-sans);
    font-size: 14px;
    line-height: 1.45;
    color: var(--text);
    -webkit-font-smoothing: antialiased;
  }

  :host([density="compact"]) {
    --density-pad: 10px;
    --density-gap: 10px;
  }
`,xt=a`
  :host { display: block; }
  * { box-sizing: border-box; }
  button, input, select, textarea { font: inherit; color: inherit; }
  button { cursor: pointer; background: none; border: none; padding: 0; }
  .mono { font-family: var(--font-mono); font-feature-settings: "tnum" 1; }

  /* App shell */
  .app {
    display: grid;
    grid-template-columns: auto 1fr;
    min-height: 600px;
    height: 100%;
    background: var(--bg);
    border-radius: var(--r-lg);
    overflow: hidden;
    border: 1px solid var(--border);
    position: relative;
    isolation: isolate;
    clip-path: inset(0 round var(--r-lg));
  }

  .sidebar {
    width: 220px;
    background: var(--bg-soft);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    padding: 24px 14px 18px;
    gap: 4px;
    min-height: 0;
    overflow-y: auto;
    position: relative;
    z-index: 30;
    transition: width 180ms ease;
  }
  .sidebar[data-mode="mini"] {
    width: 64px;
    padding: 18px 8px 14px;
    align-items: center;
  }
  .sidebar[data-mode="drawer"] {
    position: absolute;
    top: 0; left: 0; bottom: 0;
    width: 220px;
    box-shadow: 0 0 30px rgba(0,0,0,0.18);
  }
  .sidebar-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.32);
    z-index: 25;
    backdrop-filter: blur(2px);
  }
  .sidebar__hamburger {
    display: flex; align-items: center; justify-content: center;
    width: 40px; height: 40px; margin-bottom: 6px;
    border-radius: var(--r-md);
    color: var(--text-soft);
    transition: background 120ms, color 120ms;
  }
  .sidebar__hamburger:hover { background: var(--bg-sunken); color: var(--text); }
  .sidebar[data-mode="mini"] .sidebar__hamburger { align-self: center; }

  .sidebar__brand {
    display: flex; align-items: center; gap: 10px;
    padding: 6px 8px 18px;
    border-bottom: 1px solid var(--border-soft);
    margin-bottom: 10px;
  }
  .sidebar[data-mode="mini"] .sidebar__brand {
    padding: 6px 0 14px;
    border-bottom: 1px solid var(--border-soft);
    margin-bottom: 8px;
    width: 100%; justify-content: center;
  }
  .sidebar[data-mode="mini"] .nav-item {
    width: 40px; height: 40px;
    padding: 0;
    justify-content: center;
    gap: 0;
  }
  .sidebar__brand-mark {
    width: 30px; height: 30px; border-radius: 9px;
    background: linear-gradient(135deg, var(--accent), var(--xp));
    display: grid; place-items: center; color: white;
    font-weight: 700; font-size: 13px;
    box-shadow: var(--shadow-sm);
  }
  .sidebar__brand-name { font-weight: 600; letter-spacing: -0.01em; font-size: 15px; }
  .sidebar__brand-sub { color: var(--text-muted); font-size: 11px; font-family: var(--font-mono); margin-top: 2px; }

  .nav-section { padding: 14px 8px 6px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); font-weight: 600; }

  .nav-item {
    display: flex; align-items: center; gap: 10px;
    width: 100%; padding: 9px 10px;
    border-radius: var(--r-md);
    color: var(--text-soft); font-size: 13.5px; font-weight: 500;
    text-align: left;
    transition: background 120ms, color 120ms;
  }
  .nav-item:hover { background: var(--bg-sunken); color: var(--text); }
  .nav-item[data-active="true"] {
    background: var(--accent-soft); color: var(--accent-ink); font-weight: 600;
  }
  .nav-item svg { width: 16px; height: 16px; flex: none; }

  .sidebar__footer { margin-top: auto; display: flex; flex-direction: column; gap: 6px; padding-top: 12px; border-top: 1px solid var(--border-soft); }

  /* Content */
  .content { overflow: auto; min-height: 0; position: relative; }
  .content__inner { padding: 28px 36px 60px; max-width: 1400px; margin: 0 auto; }

  .topbar {
    position: sticky; top: 0; z-index: 20;
    display: flex; align-items: center; gap: 14px;
    padding: 14px 36px;
    background: color-mix(in srgb, var(--bg) 86%, transparent);
    backdrop-filter: saturate(1.2) blur(10px);
    border-bottom: 1px solid var(--border-soft);
  }
  .topbar__title { font-size: 18px; font-weight: 600; letter-spacing: -0.015em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .topbar__crumbs { color: var(--text-muted); font-size: 12.5px; font-family: var(--font-mono); }
  .topbar__spacer { flex: 1; }
  .topbar__pill {
    display: flex; align-items: center; gap: 8px;
    font-family: var(--font-mono); font-size: 13px; color: var(--text-soft);
    background: var(--bg-sunken); padding: 6px 10px; border-radius: var(--r-md);
    border: 1px solid var(--border-soft);
  }
  .topbar__dot { width: 7px; height: 7px; border-radius: 50%; background: var(--ok); box-shadow: 0 0 0 4px color-mix(in srgb, var(--ok) 25%, transparent); }

  .page-title { font-size: 26px; font-weight: 700; letter-spacing: -0.02em; margin: 0 0 4px; }
  .page-sub { color: var(--text-muted); font-size: 14px; margin: 0 0 22px; }

  /* Card */
  .card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--r-lg); padding: var(--density-pad);
    box-shadow: var(--shadow-xs);
    min-width: 0;
  }
  .card--ghost { background: var(--bg-soft); }
  .card__header { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
  .card__title { font-weight: 600; font-size: 15px; letter-spacing: -0.01em; margin: 0; }
  .card__sub { color: var(--text-muted); font-size: 12.5px; margin: 2px 0 0; }

  /* KPI */
  .kpi { padding: 16px; border-radius: var(--r-lg); background: var(--surface); border: 1px solid var(--border); }
  .kpi__label { font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); font-weight: 600; }
  .kpi__value { font-size: 28px; font-weight: 700; letter-spacing: -0.03em; font-family: var(--font-mono); margin-top: 6px; }
  .kpi__delta { font-size: 12px; color: var(--text-muted); margin-top: 4px; }

  /* Button */
  .btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 8px 14px; border-radius: var(--r-md);
    border: 1px solid var(--border); background: var(--surface);
    font-size: 13px; font-weight: 500; color: var(--text);
    transition: background 120ms, border-color 120ms, transform 60ms;
  }
  .btn:hover { background: var(--bg-soft); }
  .btn:active { transform: translateY(1px); }
  .btn--primary { background: var(--accent); color: white; border-color: transparent; box-shadow: var(--shadow-sm); }
  .btn--primary:hover { background: color-mix(in srgb, var(--accent) 90%, black); }
  .btn--ghost { border-color: transparent; background: transparent; color: var(--text-soft); }
  .btn--ghost:hover { background: var(--bg-sunken); color: var(--text); }
  .btn--sm { padding: 5px 10px; font-size: 12px; }
  .btn svg { width: 16px; height: 16px; }

  /* Chip */
  .chip {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 3px 9px; border-radius: var(--r-pill);
    background: var(--bg-sunken); border: 1px solid var(--border-soft);
    color: var(--text-soft); font-size: 11.5px; font-weight: 500;
  }
  .chip--accent { background: var(--accent-soft); color: var(--accent-ink); border-color: transparent; }
  .chip--ok { background: color-mix(in srgb, var(--ok) 15%, transparent); color: var(--ok); border-color: transparent; }
  .chip--warn { background: var(--warn-soft); color: var(--warn); border-color: transparent; }
  .chip--danger { background: var(--danger-soft); color: var(--danger); border-color: transparent; }
  .chip--xp { background: var(--xp-soft); color: var(--xp-ink); border-color: transparent; }
  .chip__dot { width: 7px; height: 7px; border-radius: 50%; background: currentColor; }

  .tag {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 11px; font-family: var(--font-mono); color: var(--text-muted);
    padding: 2px 6px; border-radius: 5px; background: var(--bg-sunken);
  }

  /* Progress bar */
  .progress { height: 6px; border-radius: 3px; background: var(--bg-sunken); overflow: hidden; }
  .progress__fill { height: 100%; border-radius: 3px; transition: width 300ms; }
  .progress--accent .progress__fill { background: var(--accent); }
  .progress--ok .progress__fill { background: var(--ok); }
  .progress--xp .progress__fill { background: var(--xp); }
  .progress--danger .progress__fill { background: var(--danger); }

  /* XP bar — segmented */
  .xp-bar { display: flex; gap: 3px; }
  .xp-bar__seg {
    flex: 1; height: 8px; border-radius: 2px;
    background: var(--bg-sunken); transition: background 200ms;
  }
  .xp-bar__seg--filled { background: var(--accent); }

  /* Ring */
  .ring-wrap { display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .ring-label { font-size: 11px; color: var(--text-muted); font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }
  .ring-value { font-family: var(--font-mono); font-size: 14px; font-weight: 600; }

  /* Stat row */
  .stat-row {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 12px; border-radius: var(--r-md);
    transition: background 120ms;
  }
  .stat-row:hover { background: var(--bg-sunken); }
  .stat-row__icon {
    width: 36px; height: 36px; border-radius: 10px;
    background: var(--bg-sunken); display: grid; place-items: center;
    color: var(--text-soft); border: 1px solid var(--border-soft);
    flex-shrink: 0;
  }
  .stat-row__icon svg { width: 17px; height: 17px; }
  .stat-row__main { flex: 1; min-width: 0; }
  .stat-row__name { font-weight: 500; font-size: 13.5px; }
  .stat-row__meta { font-size: 11.5px; color: var(--text-muted); font-family: var(--font-mono); }
  .stat-row__value { font-family: var(--font-mono); font-size: 14px; font-weight: 600; }

  /* Quest card */
  .quest-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--r-lg); padding: 18px;
    display: flex; flex-direction: column; gap: 12px;
    transition: border-color 120ms;
  }
  .quest-card:hover { border-color: color-mix(in srgb, var(--accent) 40%, var(--border)); }
  .quest-card__header { display: flex; align-items: center; gap: 10px; }
  .quest-card__title { font-weight: 600; font-size: 14px; flex: 1; }

  /* Boss */
  .boss-banner {
    background: linear-gradient(135deg, color-mix(in srgb, var(--danger) 12%, var(--surface)), var(--surface));
    border: 1px solid var(--border);
    border-radius: var(--r-lg); padding: 20px;
  }
  .boss-banner__title { font-size: 18px; font-weight: 700; letter-spacing: -0.02em; }
  .boss-banner__sub { color: var(--text-muted); font-size: 12.5px; font-family: var(--font-mono); margin-top: 4px; }

  /* Heatmap */
  .heatmap { display: grid; gap: 4px; }
  .heatmap__cell {
    aspect-ratio: 1; border-radius: 4px;
    background: var(--bg-sunken); border: 1px solid var(--border-soft);
    transition: background 120ms;
  }

  /* Switch */
  .switch { position: relative; display: inline-block; width: 36px; height: 20px; cursor: pointer; }
  .switch input { display: none; }
  .switch__track {
    position: absolute; inset: 0; background: var(--border); border-radius: 999px;
    transition: background 150ms;
  }
  .switch__thumb {
    position: absolute; top: 2px; left: 2px; width: 16px; height: 16px;
    background: white; border-radius: 50%;
    transition: transform 180ms cubic-bezier(.2,.8,.2,1);
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  }
  .switch input:checked ~ .switch__track { background: var(--accent); }
  .switch input:checked ~ .switch__thumb { transform: translateX(16px); }

  /* Segmented */
  .segmented {
    display: inline-flex; padding: 3px;
    background: var(--bg-sunken); border: 1px solid var(--border-soft);
    border-radius: var(--r-md); gap: 2px;
  }
  .segmented button {
    padding: 6px 12px; border-radius: 7px; color: var(--text-soft);
    font-size: 12.5px; font-weight: 500;
    transition: background 120ms, color 120ms;
  }
  .segmented button[data-active="true"] {
    background: var(--surface); color: var(--text); box-shadow: var(--shadow-xs);
  }

  .divider { height: 1px; background: var(--border-soft); margin: 16px 0; border: 0; }

  /* Grid */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--density-gap); }
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--density-gap); }
  .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--density-gap); }
  .grid-auto { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--density-gap); }

  /* Sparkline */
  .sparkline { display: block; }
  .sparkline polyline { fill: none; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }

  /* Utility */
  .row { display: flex; align-items: center; gap: 10px; }
  .col { display: flex; flex-direction: column; gap: 10px; }
  .sp-between { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
  .text-mute { color: var(--text-muted); }
  .text-soft { color: var(--text-soft); }
  .text-sm { font-size: 12.5px; }
  .text-xs { font-size: 11.5px; }
  .fw-600 { font-weight: 600; }
  .fw-700 { font-weight: 700; }
  .truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  /* Workout set table */
  .set-table { width: 100%; border-collapse: separate; border-spacing: 0; }
  .set-table th {
    font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em;
    color: var(--text-muted); font-weight: 600; text-align: left;
    padding: 6px 10px; border-bottom: 1px solid var(--border-soft);
  }
  .set-table td {
    padding: 8px 10px; font-family: var(--font-mono); font-size: 13px;
    border-bottom: 1px solid var(--border-soft);
  }
  .set-table tr[data-active="true"] td { color: var(--accent); font-weight: 600; }
  .set-table tr[data-done="true"] td { color: var(--text-muted); }

  /* Tile pick (intensity selector) */
  .tile-pick {
    padding: 14px; border-radius: var(--r-lg); border: 1px solid var(--border);
    background: var(--surface); cursor: pointer;
    display: flex; flex-direction: column; gap: 8px;
    transition: border-color 120ms, background 120ms; text-align: left; width: 100%;
  }
  .tile-pick:hover { border-color: color-mix(in srgb, var(--accent) 30%, var(--border)); }
  .tile-pick[data-selected="true"] { border-color: var(--accent); background: color-mix(in srgb, var(--accent-soft) 60%, var(--surface)); }
  .tile-pick__name { font-weight: 600; font-size: 13.5px; }
  .tile-pick__desc { color: var(--text-muted); font-size: 12px; }

  /* Color dot picker */
  .color-dot {
    width: 22px; height: 22px; border-radius: 50%; border: 2px solid transparent;
    cursor: pointer; transition: border-color 120ms, transform 120ms;
    padding: 0; outline: none;
  }
  .color-dot:hover { transform: scale(1.15); }
  .color-dot--active { border-color: var(--text); transform: scale(1.15); box-shadow: 0 0 0 2px var(--surface); }

  /* Settings input */
  .settings-input {
    font-family: var(--font-mono); font-size: 12px; padding: 5px 8px;
    border: 1px solid var(--border); border-radius: var(--r-sm);
    background: var(--bg-sunken); color: var(--text); flex: 1; max-width: 260px;
    outline: none; transition: border-color 120ms;
  }
  .settings-input:focus { border-color: var(--accent); }
  .settings-input::placeholder { color: var(--text-muted); }

  /* Skill bar */
  .skill-bar { display: flex; align-items: center; gap: 12px; }
  .skill-bar__label { font-size: 13px; font-weight: 500; min-width: 90px; }
  .skill-bar__track { flex: 1; height: 8px; border-radius: 4px; background: var(--bg-sunken); overflow: hidden; }
  .skill-bar__fill { height: 100%; border-radius: 4px; background: var(--accent); transition: width 300ms; }
  .skill-bar__value { font-family: var(--font-mono); font-size: 12px; color: var(--text-soft); min-width: 30px; text-align: right; }

  @media (max-width: 900px) {
    .grid-2, .grid-3 { grid-template-columns: 1fr; }
    .content__inner { padding: 18px 16px 40px; }
    .topbar { padding: 12px 16px; }
    .topbar__crumbs { display: none; }
  }

  @media (max-width: 600px) {
    .content__inner { padding: 14px 10px 30px; }
    .topbar { padding: 10px 12px; gap: 8px; }
    .topbar__title { font-size: 14px; }
    .page-title { font-size: 22px !important; }
    .card { padding: 12px !important; }
    .kpi { padding: 12px; }
    .kpi__value { font-size: 22px; }
    .grid-auto { grid-template-columns: 1fr !important; }
    .grid-4 { grid-template-columns: 1fr 1fr; }
  }
`;function bt(t,e=16,i=1.6){const r=e,s=i;switch(t){case"dashboard":return F`<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>`;case"dumbbell":return F`<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 6.5h11M6 12h12"/><rect x="2" y="8" width="4" height="8" rx="1"/><rect x="18" y="8" width="4" height="8" rx="1"/><rect x="5" y="6" width="2" height="12" rx="0.5"/><rect x="17" y="6" width="2" height="12" rx="0.5"/></svg>`;case"scale":return F`<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><circle cx="12" cy="12" r="4"/><path d="M12 8v4l2.5 1.5"/></svg>`;case"calendar":return F`<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>`;case"user":return F`<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>`;case"target":return F`<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>`;case"chart":return F`<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20h18"/><path d="M5 20V10l4-3 4 5 4-7 4 4v11"/></svg>`;case"sliders":return F`<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></svg>`;case"settings":return F`<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>`;case"sword":return F`<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 17.5 3 6V3h3l11.5 11.5"/><path d="M13 19l6-6M16 16l4 4M9 5l1-1"/></svg>`;case"flame":return F`<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c1 4 5 6 5 11a5 5 0 0 1-10 0c0-5 4-7 5-11z"/><path d="M12 18a2 2 0 0 1-2-2c0-2 2-3 2-5 0 2 2 3 2 5a2 2 0 0 1-2 2z"/></svg>`;case"trophy":return F`<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V4h12v5a6 6 0 0 1-12 0z"/><path d="M6 6H3v3a3 3 0 0 0 3 3M18 6h3v3a3 3 0 0 1-3 3M9 19h6M12 15v4M8 21h8"/></svg>`;case"heart":return F`<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21C12 21 3 14 3 8.5a4.5 4.5 0 0 1 9-1 4.5 4.5 0 0 1 9 1C21 14 12 21 12 21z"/></svg>`;case"bolt":return F`<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"><path d="M13 3 4 14h7l-1 7 9-11h-7z"/></svg>`;case"shield":return F`<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4 7v5c0 5 3.5 8 8 10 4.5-2 8-5 8-10V7z"/></svg>`;case"medal":return F`<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="15" r="5"/><path d="M8.2 13 6 3h3l3 4 3-4h3l-2.2 10"/></svg>`;case"run":return F`<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="4" r="2"/><path d="M6 20l3-7 2 2 4-4 2 6"/><path d="M9 13l-3-3 5-2"/></svg>`;case"check":return F`<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4L19 7"/></svg>`;case"close":return F`<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6 6 18"/></svg>`;case"menu":return F`<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`;case"chevron-right":return F`<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>`;case"info":return F`<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v5h1"/></svg>`;case"clock":return F`<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`;case"plus":return F`<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>`;case"play":return F`<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v16l14-8z" fill="currentColor" stroke="none"/></svg>`;case"pause":return F`<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="5" width="4" height="14" fill="currentColor" stroke="none"/><rect x="14" y="5" width="4" height="14" fill="currentColor" stroke="none"/></svg>`;case"weight":return F`<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2"/><path d="M5 21h14l-2-14H7z"/></svg>`;case"droplet":return F`<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11z"/></svg>`;case"trending-up":return F`<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>`;case"trending-down":return F`<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"><path d="M23 18l-9.5-9.5-5 5L1 6"/><path d="M17 18h6v-6"/></svg>`;default:return F`<svg width="${r}" height="${r}" viewBox="0 0 24 24"></svg>`}}const ft="monitor_allenamenti";function _t(t,e){const i=`sensor.${ft}_${e}`;return t.states[i]?.state??""}function kt(t,e=0){const i="string"==typeof t?parseFloat(t):t;return isNaN(i)?"—":i.toLocaleString("it-IT",{minimumFractionDigits:e,maximumFractionDigits:e})}function yt(t,e=""){return`${t>0?"+":""}${kt(t,1)}${e?" "+e:""}`}function $t(t,e,i){if(t.length<2)return"";const r=Math.min(...t),s=Math.max(...t)-r||1,o=e/(t.length-1);return t.map((t,e)=>{const a=i-(t-r)/s*i;return`${0===e?"M":"L"}${(e*o).toFixed(1)},${a.toFixed(1)}`}).join(" ")}const wt=[{date:"Oggi",type:"Pesi",duration:52,calories:320,extra:"4.200 kg vol"},{date:"Ieri",type:"Corsa",duration:35,calories:380,extra:"5,2 km"},{date:"12 mag",type:"Pesi",duration:48,calories:290,extra:"3.800 kg vol"},{date:"11 mag",type:"Cammino",duration:45,calories:210,extra:"4,1 km"},{date:"10 mag",type:"HIIT",duration:25,calories:350,extra:""}],Ct=[80.1,79.8,79.6,79.4,79.2,79,78.8,78.9,78.7,78.6,78.5,78.4];let At=class extends dt{render(){const t=this.card.hass,e=_t(t,"peso")||(t.states["sensor.weight"]?.state??"78,4"),i=_t(t,"allenamenti_mese")||"14",r=_t(t,"punti")||"2.840",s=_t(t,"streak")||"12",o=$t(Ct,160,36);return W`
      <div class="col" style="gap:22px">

        <!-- Header -->
        <div>
          <h1 class="page-title">Panoramica</h1>
          <p class="page-sub">${function(){const t=new Date;return`${["Domenica","Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato"][t.getDay()]} ${t.getDate()} ${["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"][t.getMonth()]} ${t.getFullYear()}`}()}</p>
        </div>

        <!-- KPI row -->
        <div class="grid-4">
          <div class="kpi">
            <div class="kpi__label">Peso</div>
            <div class="kpi__value">${e}<span class="text-mute" style="font-size:14px;margin-left:4px">kg</span></div>
            <div class="kpi__delta" style="color:var(--ok)">${yt(-.6,"in 7g")}</div>
          </div>
          <div class="kpi">
            <div class="kpi__label">Allenamenti</div>
            <div class="kpi__value">${i}</div>
            <div class="kpi__delta">questo mese</div>
          </div>
          <div class="kpi">
            <div class="kpi__label">Punti</div>
            <div class="kpi__value">${r}</div>
            <div class="kpi__delta">totali</div>
          </div>
          <div class="kpi">
            <div class="kpi__label">Streak</div>
            <div class="kpi__value" style="color:var(--streak)">${s}<span class="text-mute" style="font-size:14px;margin-left:4px">giorni</span></div>
            <div class="kpi__delta">consecutivi</div>
          </div>
        </div>

        <!-- Ultimi allenamenti -->
        <div>
          <h2 style="margin:0 0 12px;font-size:16px;font-weight:600">Ultimi allenamenti</h2>
          <div class="card">
            ${wt.map(t=>W`
                <div class="stat-row">
                  <div class="stat-row__icon">
                    ${bt(function(t){switch(t){case"Pesi":default:return"dumbbell";case"Corsa":return"run";case"Cammino":return"heart";case"HIIT":return"flame"}}(t.type),17)}
                  </div>
                  <div class="stat-row__main">
                    <div class="stat-row__name">${t.type}</div>
                    <div class="stat-row__meta">${t.date}</div>
                  </div>
                  <div style="text-align:right">
                    <div class="stat-row__value">${t.duration} min</div>
                    <div class="stat-row__meta">${kt(t.calories)} kcal${t.extra?` · ${t.extra}`:""}</div>
                  </div>
                </div>
              `)}
          </div>
        </div>

        <!-- Peso sparkline -->
        <div>
          <h2 style="margin:0 0 12px;font-size:16px;font-weight:600">Peso</h2>
          <div class="kpi" style="display:flex;align-items:center;gap:20px;max-width:420px">
            <div style="flex:1">
              <div class="kpi__label">Peso attuale</div>
              <div class="kpi__value">${e}<span class="text-mute" style="font-size:14px;margin-left:4px">kg</span></div>
              <div class="kpi__delta" style="color:var(--ok)">${yt(-.6,"in 7g")}</div>
            </div>
            <svg class="sparkline" width="${160}" height="${36}" viewBox="0 0 ${160} ${36}">
              <polyline points="${o}" stroke="var(--accent)"/>
            </svg>
          </div>
        </div>

        <!-- Azioni -->
        <div class="row" style="flex-wrap:wrap;gap:10px">
          <button class="btn btn--primary" @click=${()=>this.card.navigate("workouts")}>
            ${bt("dumbbell",14)} Registra allenamento
          </button>
          <button class="btn btn--ghost" @click=${()=>this.card.navigate("body")}>
            ${bt("scale",14)} Vedi composizione
          </button>
        </div>

      </div>
    `}};At.styles=xt,t([gt({attribute:!1,hasChanged:()=>!0})],At.prototype,"card",void 0),At=t([pt("monitor-overview")],At);const zt=[{date:"2026-05-15",dateShort:"Gio 15 mag",type:"Pesi",duration:52,calories:320,metric:"4.200 kg",points:40},{date:"2026-05-14",dateShort:"Mer 14 mag",type:"Corsa",duration:35,calories:380,metric:"5,2 km",points:30},{date:"2026-05-13",dateShort:"Mar 13 mag",type:"Pesi",duration:48,calories:290,metric:"3.800 kg",points:40},{date:"2026-05-12",dateShort:"Lun 12 mag",type:"Cammino",duration:45,calories:210,metric:"4,1 km",points:20},{date:"2026-05-11",dateShort:"Dom 11 mag",type:"HIIT",duration:25,calories:350,metric:"Zona 4",points:35},{date:"2026-05-10",dateShort:"Sab 10 mag",type:"Pesi",duration:55,calories:340,metric:"4.500 kg",points:40},{date:"2026-05-09",dateShort:"Ven 9 mag",type:"Corsa",duration:40,calories:410,metric:"6,1 km",points:30},{date:"2026-05-08",dateShort:"Gio 8 mag",type:"Pesi",duration:50,calories:310,metric:"4.100 kg",points:40},{date:"2026-05-06",dateShort:"Mar 6 mag",type:"Corsa",duration:30,calories:320,metric:"4,8 km",points:30},{date:"2026-05-05",dateShort:"Lun 5 mag",type:"Pesi",duration:45,calories:280,metric:"3.600 kg",points:40}],Mt=[{key:"all",label:"Tutti"},{key:"Pesi",label:"Pesi"},{key:"Corsa",label:"Corsa"},{key:"Cammino",label:"Cammino"},{key:"HIIT",label:"HIIT"}];let St=class extends dt{constructor(){super(...arguments),this._filter="all"}get _filteredWorkouts(){return"all"===this._filter?zt:zt.filter(t=>t.type===this._filter)}render(){const t=this._filteredWorkouts;return W`
      <div class="col" style="gap:22px">

        <!-- Header -->
        <div class="sp-between" style="flex-wrap:wrap;gap:12px">
          <div>
            <h1 class="page-title">Allenamenti</h1>
            <p class="page-sub">Importati da Apple Health</p>
          </div>
          <button class="btn btn--primary" @click=${()=>console.log("[monitor] Registra manualmente")}>
            ${bt("plus",14)} Registra manualmente
          </button>
        </div>

        <!-- Filter segmented control -->
        <div class="segmented">
          ${Mt.map(t=>W`
              <button
                data-active="${this._filter===t.key}"
                @click=${()=>{this._filter=t.key}}
              >${t.label}</button>
            `)}
        </div>

        <!-- Stats summary -->
        <div class="grid-3">
          <div class="kpi">
            <div class="kpi__label">Totale sessioni</div>
            <div class="kpi__value">147</div>
          </div>
          <div class="kpi">
            <div class="kpi__label">Volume totale</div>
            <div class="kpi__value">184<span class="text-mute" style="font-size:14px;margin-left:4px">t</span></div>
          </div>
          <div class="kpi">
            <div class="kpi__label">Distanza totale</div>
            <div class="kpi__value">412<span class="text-mute" style="font-size:14px;margin-left:4px">km</span></div>
          </div>
        </div>

        <!-- Registro -->
        <div>
          <h2 style="margin:0 0 12px;font-size:16px;font-weight:600">Registro</h2>
          <div class="col" style="gap:12px">
            ${t.map(t=>this._renderWorkoutCard(t))}
            ${0===t.length?W`<div class="card card--ghost" style="text-align:center;padding:28px;color:var(--text-muted)">
                  Nessun allenamento con questo filtro
                </div>`:""}
          </div>
        </div>

      </div>
    `}_renderWorkoutCard(t){return W`
      <div class="card">
        <!-- Header row -->
        <div class="sp-between" style="margin-bottom:10px">
          <div class="row">
            ${bt(function(t){switch(t){case"Pesi":default:return"dumbbell";case"Corsa":return"run";case"Cammino":return"heart";case"HIIT":return"flame"}}(t.type),16)}
            <span class="chip ${function(t){switch(t){case"Pesi":return"chip--accent";case"Corsa":return"chip--ok";case"Cammino":return"chip--warn";case"HIIT":return"chip--danger";default:return""}}(t.type)}">${t.type}</span>
            <span class="text-sm fw-600">${t.dateShort}</span>
          </div>
          <div class="row">
            <span class="tag">Apple Health</span>
            <span class="chip chip--accent">+${t.points} pt</span>
          </div>
        </div>
        <!-- Stats row -->
        <div class="row" style="gap:16px">
          <span class="mono text-sm">${bt("clock",13)} ${t.duration} min</span>
          <span class="mono text-sm">${bt("flame",13)} ${kt(t.calories)} kcal</span>
          <span class="mono text-sm">${t.metric}</span>
        </div>
      </div>
    `}};St.styles=xt,t([gt({attribute:!1,hasChanged:()=>!0})],St.prototype,"card",void 0),t([ut()],St.prototype,"_filter",void 0),St=t([pt("monitor-workouts")],St);const Pt=["7G","30G","3M","6M","1A"],Et=[80.2,79.8,79.9,79.5,79.1,79.3,78.9,78.7,79,78.6,78.8,78.4,78.5,78.2,78.4,78.1,78.3,78,78.2,77.9,78.1,77.8,78,77.7,77.9,78.1,78,77.8,78.2,78.4];let Ht=class extends dt{constructor(){super(...arguments),this._range="30G"}render(){const t=this.card.hass,e=parseFloat(_t(t,"peso")||t.states["sensor.weight"]?.state||"78.4"),i=parseFloat(t.states["sensor.fat_ratio"]?.state||"18.2"),r=parseFloat(t.states["sensor.muscle_mass_kg"]?.state||"35.1"),s=parseFloat(t.states["sensor.body_water"]?.state||"55.8"),o=parseFloat(t.states["sensor.bone_mass_kg"]?.state||"3.4"),a=parseFloat(t.states["sensor.bmi"]?.state||"24.1"),n=140,l=$t(Et,460,n),d=[{label:"Peso",value:`${kt(e,1)} kg`,delta:yt(-2,"in 30g"),iconName:"weight"},{label:"Grasso",value:`${kt(i,1)}%`,delta:yt(-.8,"in 30g"),iconName:"flame"},{label:"Muscolo",value:`${kt(r,1)} kg`,delta:yt(.3,"in 30g"),iconName:"dumbbell"},{label:"Acqua",value:`${kt(s,1)}%`,delta:yt(.5,"in 30g"),iconName:"droplet"},{label:"Ossa",value:`${kt(o,1)} kg`,delta:"stabile",iconName:"shield"},{label:"HR Riposo",value:"58 bpm",delta:yt(-2,"in 30g"),iconName:"heart"},{label:"Età Vasc.",value:"32 anni",delta:yt(-1,"in 6m"),iconName:"trending-down"},{label:"BMI",value:kt(a,1),delta:yt(-.6,"in 30g"),iconName:"chart"}];return W`
      <div class="col" style="gap:22px">

        <!-- Header -->
        <div>
          <h1 class="page-title">Composizione</h1>
          <p class="page-sub">${kt(e,1)} kg · ${yt(-2)} kg in 30 giorni</p>
        </div>

        <!-- Time range segmented -->
        <div class="segmented">
          ${Pt.map(t=>W`
            <button data-active="${this._range===t}"
              @click=${()=>{this._range=t}}>
              ${t}
            </button>
          `)}
        </div>

        <!-- Sparkline chart -->
        <div class="card" style="padding:20px">
          <div class="card__header">
            <h3 class="card__title">Andamento peso</h3>
            <span class="chip chip--accent">${this._range}</span>
          </div>
          <svg class="sparkline" viewBox="0 0 ${460} ${n}" width="100%" height="200"
            preserveAspectRatio="none" style="display:block">
            <defs>
              <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.15"/>
                <stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <path d="${l} L${460},${n} L0,${n} Z" fill="url(#wg)"/>
            <polyline points="${l.replace(/[ML]/g,"")}" stroke="var(--accent)"/>
          </svg>
        </div>

        <!-- KPI grid 4x2 -->
        <div class="grid-4" style="grid-template-columns:repeat(4, 1fr)">
          ${d.map(t=>W`
            <div class="kpi">
              <div class="kpi__label" style="display:flex;align-items:center;gap:5px">
                ${bt(t.iconName,12)} ${t.label}
              </div>
              <div class="kpi__value" style="font-size:22px">${t.value}</div>
              <div class="kpi__delta">${t.delta}</div>
            </div>
          `)}
        </div>

        <!-- Previsione -->
        <div class="card">
          <div class="card__header">
            <div style="color:var(--accent)">${bt("target",18)}</div>
            <div>
              <h3 class="card__title">Previsione</h3>
              <div class="card__sub">Basata sul trend ${this._range}</div>
            </div>
          </div>
          <div class="row" style="gap:24px;padding:8px 0">
            <div>
              <div class="text-mute text-xs" style="margin-bottom:4px">Peso previsto (90g)</div>
              <div class="mono fw-700" style="font-size:22px">${kt(76.8,1)} kg</div>
            </div>
            <div>
              <div class="text-mute text-xs" style="margin-bottom:4px">Intervallo</div>
              <div class="mono fw-600" style="font-size:15px;color:var(--text-soft)">${kt(75.8,1)} – ${kt(77.8,1)} kg</div>
            </div>
            <div>
              <div class="text-mute text-xs" style="margin-bottom:4px">Obiettivo</div>
              <div class="mono fw-600" style="font-size:15px;color:var(--ok)">${kt(75,1)} kg</div>
            </div>
          </div>
        </div>

      </div>
    `}};Ht.styles=xt,t([gt({attribute:!1,hasChanged:()=>!0})],Ht.prototype,"card",void 0),t([ut()],Ht.prototype,"_range",void 0),Ht=t([pt("monitor-body")],Ht);const It=["var(--bg-sunken)","color-mix(in srgb, var(--accent) 25%, var(--bg-sunken))","color-mix(in srgb, var(--accent) 50%, var(--bg-sunken))","color-mix(in srgb, var(--accent) 75%, var(--bg-sunken))","var(--accent)"];let Tt=class extends dt{render(){const t=this.card.hass,e=parseInt(_t(t,"streak")||"12",10),i=new Date,r=i.toLocaleDateString("it-IT",{month:"long",year:"numeric"}),s=function(t,e){const i=new Date(t,e,1),r=new Date(t,e+1,0).getDate(),s=(i.getDay()+6)%7,o=[];let a=[];for(let t=0;t<s;t++)a.push({day:0,intensity:-1});for(let t=1;t<=r;t++){const e=t%3==0?0:t%7==0?4:t%5==0?3:t%2==0?2:1;a.push({day:t,intensity:t>(new Date).getDate()?-1:e}),7===a.length&&(o.push(a),a=[])}if(a.length>0){for(;a.length<7;)a.push({day:0,intensity:-1});o.push(a)}return o}(i.getFullYear(),i.getMonth());return W`
      <div class="col" style="gap:22px">

        <!-- Header -->
        <div>
          <h1 class="page-title">Calendario</h1>
          <p class="page-sub">Streak: ${e} giorni · Best: ${23}</p>
        </div>

        <!-- Summary card with streak ring -->
        <div class="card">
          <div class="row" style="gap:24px;flex-wrap:wrap;align-items:flex-start">
            <div class="ring-wrap" style="flex-shrink:0">
              ${function(t,e){const i=Math.min(1,t/e),r=2*Math.PI*40;return F`
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="${40}" fill="none" stroke="var(--bg-sunken)" stroke-width="8"/>
      <circle cx="50" cy="50" r="${40}" fill="none" stroke="var(--streak)" stroke-width="8"
        stroke-dasharray="${r*i} ${r}" stroke-linecap="round"
        transform="rotate(-90 50 50)"/>
      <text x="50" y="46" text-anchor="middle" fill="var(--streak)" font-family="var(--font-mono)"
        font-size="22" font-weight="700">${t}</text>
      <text x="50" y="62" text-anchor="middle" fill="var(--text-muted)" font-size="10"
        font-weight="500">giorni</text>
    </svg>`}(e,23)}
            </div>
            <div class="grid-2" style="flex:1;min-width:200px;gap:14px">
              <div>
                <div class="text-mute text-xs" style="margin-bottom:2px">Sessioni</div>
                <div class="mono fw-700" style="font-size:20px">${18}</div>
              </div>
              <div>
                <div class="text-mute text-xs" style="margin-bottom:2px">Riposi</div>
                <div class="mono fw-700" style="font-size:20px">${4}</div>
              </div>
              <div>
                <div class="text-mute text-xs" style="margin-bottom:2px">Volume</div>
                <div class="mono fw-700" style="font-size:20px">${kt(28400)} kg</div>
              </div>
              <div>
                <div class="text-mute text-xs" style="margin-bottom:2px">Distanza</div>
                <div class="mono fw-700" style="font-size:20px">${kt(32.5,1)} km</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Monthly calendar -->
        <div class="card">
          <div class="card__header">
            <h3 class="card__title" style="text-transform:capitalize">${r}</h3>
          </div>
          <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px">
            <!-- Day headers -->
            ${["Lun","Mar","Mer","Gio","Ven","Sab","Dom"].map(t=>W`
              <div style="text-align:center;font-size:11px;color:var(--text-muted);font-weight:600;padding-bottom:6px">${t}</div>
            `)}
            <!-- Day cells -->
            ${s.flatMap(t=>t.map(t=>{if(0===t.day)return W`<div></div>`;const e=t.intensity>=0?It[t.intensity]:"var(--bg-soft)",r=t.day===i.getDate();return W`
                <div class="heatmap__cell" style="
                  background:${e};
                  display:flex;align-items:center;justify-content:center;
                  font-family:var(--font-mono);font-size:11px;font-weight:500;
                  color:${t.intensity>=3?"white":"var(--text-soft)"};
                  ${r?"box-shadow:inset 0 0 0 2px var(--accent);border-color:var(--accent)":""}
                ">${t.day}</div>`}))}
          </div>
          <!-- Legend -->
          <div class="row" style="margin-top:14px;gap:6px;justify-content:flex-end">
            <span class="text-xs text-mute">Meno</span>
            ${It.map(t=>W`
              <div style="width:14px;height:14px;border-radius:3px;background:${t};border:1px solid var(--border-soft)"></div>
            `)}
            <span class="text-xs text-mute">Più</span>
          </div>
        </div>

        <!-- Prossimo allenamento -->
        <div class="card">
          <div class="card__header">
            <div style="color:var(--accent)">${bt("calendar",18)}</div>
            <div>
              <h3 class="card__title">Prossimo allenamento</h3>
              <div class="card__sub">Domani · Upper Body</div>
            </div>
          </div>
          <div class="row" style="gap:8px">
            <span class="chip">${bt("dumbbell",11)} Pesi</span>
            <span class="chip">${bt("clock",11)} ~60 min</span>
            <span class="chip chip--xp">${bt("bolt",11)} ~120 XP</span>
          </div>
        </div>

      </div>
    `}};Tt.styles=xt,t([gt({attribute:!1,hasChanged:()=>!0})],Tt.prototype,"card",void 0),Tt=t([pt("monitor-calendar")],Tt);const Ot=[{exercise:"Stacco",icon:"dumbbell",value:"120 kg",delta:"+5 kg",deltaPositive:!0,sparkData:[95,100,105,105,110,112,115,120]},{exercise:"Squat",icon:"dumbbell",value:"95 kg",delta:"+5 kg",deltaPositive:!0,sparkData:[70,75,80,82,85,88,90,95]},{exercise:"Panca",icon:"dumbbell",value:"65 kg",delta:"0 kg · 42g",deltaPositive:!1,sparkData:[55,58,60,62,63,64,65,65]},{exercise:"5km",icon:"run",value:"24:18",delta:"-0:32",deltaPositive:!0,sparkData:[28,27.5,27,26,25.5,25,24.8,24.3]}],Bt=[{label:"Pesi",pct:48,color:"var(--accent)"},{label:"Corsa",pct:28,color:"var(--ok)"},{label:"Cammino",pct:14,color:"var(--warn)"},{label:"HIIT",pct:10,color:"var(--danger)"}],jt=[[82,3200],[81.5,3400],[81,3100],[80.5,3600],[80,3500],[79.5,3800],[79,3700],[78.5,4e3],[78,3900],[77.8,4200],[80.2,3300],[79.8,3450],[79.2,3650],[78.8,3850],[78.2,4100]];let Nt=class extends dt{render(){return W`
      <h1 class="page-title">Statistiche</h1>
      <p class="page-sub">Analisi, record personali, predizioni</p>

      <div class="grid-2" style="margin-bottom:24px">
        ${this._renderCorrelation()}
        ${this._renderPrediction()}
      </div>

      <!-- PR section -->
      <h2 class="card__title" style="margin-bottom:14px">Record personali</h2>
      <div class="card" style="margin-bottom:24px">
        ${Ot.map(t=>this._renderPRRow(t))}
      </div>

      <!-- Distribution -->
      <h2 class="card__title" style="margin-bottom:14px">Distribuzione 30g</h2>
      <div class="card">
        ${Bt.map(t=>this._renderDistBar(t))}
      </div>
    `}_renderCorrelation(){const t=30,e=140,i=jt.map(t=>t[0]),r=jt.map(t=>t[1]),s=Math.min(...i),o=Math.max(...i),a=Math.min(...r),n=Math.max(...r),l=e=>t+(e-s)/(o-s)*220,d=t=>170-(t-a)/(n-a)*e,c=l(o),p=d(a),h=l(s),v=d(n);return W`
      <div class="card">
        <div class="card__header">
          <div style="flex:1">
            <h3 class="card__title">Correlazione inversa</h3>
            <div class="card__sub">Peso corporeo vs Volume allenamento</div>
          </div>
          <span class="chip chip--ok">FORTE</span>
        </div>

        <div class="sp-between" style="margin-bottom:10px">
          <span class="text-sm text-soft">Coefficiente r</span>
          <span class="mono fw-700" style="font-size:22px;color:var(--ok)">-0.74</span>
        </div>

        <svg viewBox="0 0 ${280} ${200}" width="100%" style="display:block;max-height:200px">
          <!-- axes -->
          <line x1="${t}" y1="${t}" x2="${t}" y2="${170}" stroke="var(--border)" stroke-width="1"/>
          <line x1="${t}" y1="${170}" x2="${250}" y2="${170}" stroke="var(--border)" stroke-width="1"/>
          <!-- axis labels -->
          <text x="${140}" y="${196}" text-anchor="middle" fill="var(--text-muted)" font-size="10" font-family="var(--font-mono)">Peso (kg)</text>
          <text x="8" y="${100}" text-anchor="middle" fill="var(--text-muted)" font-size="10" font-family="var(--font-mono)" transform="rotate(-90 8 ${100})">Volume (kg)</text>
          <!-- dots -->
          ${jt.map(([t,e])=>F`
            <circle cx="${l(t)}" cy="${d(e)}" r="4" fill="var(--accent)" opacity="0.7"/>
          `)}
          <!-- regression -->
          <line x1="${c}" y1="${p}" x2="${h}" y2="${v}" stroke="var(--danger)" stroke-width="1.5" stroke-dasharray="5 3" opacity="0.6"/>
        </svg>
      </div>
    `}_renderPrediction(){return W`
      <div class="card">
        <div class="card__header">
          <h3 class="card__title">Predizione</h3>
        </div>
        <div style="text-align:center;padding:12px 0">
          <div class="text-xs text-mute" style="text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px">Target peso</div>
          <div class="mono" style="font-size:36px;font-weight:700;letter-spacing:-0.03em">77.8 <span class="text-sm fw-600" style="font-size:14px">kg</span></div>
          <div class="text-sm text-soft" style="margin-top:6px">Intervallo di confidenza: <span class="mono">76.9 &ndash; 78.7 kg</span> &plusmn;30g</div>
        </div>
        <hr class="divider" />
        <p class="text-sm text-soft" style="line-height:1.6;margin:0">
          Al ritmo attuale, con un deficit medio di 300 kcal/die e 4 sessioni settimanali, il target di 77.8 kg
          viene raggiunto entro circa 6 settimane. Il modello tiene conto della variazione idrica giornaliera.
        </p>
      </div>
    `}_renderPRRow(t){const e=$t(t.sparkData,60,20);return W`
      <div class="stat-row">
        <div class="stat-row__icon">${bt(t.icon,17)}</div>
        <div class="stat-row__main">
          <div class="stat-row__name">${t.exercise}</div>
        </div>
        <svg class="sparkline" width="60" height="20" viewBox="0 0 60 20" style="margin-right:8px">
          <polyline points="${e}" stroke="${t.deltaPositive?"var(--ok)":"var(--text-muted)"}"/>
        </svg>
        <span class="stat-row__value">${t.value}</span>
        <span class="chip ${t.deltaPositive?"chip--ok":""}" style="margin-left:6px">${t.delta}</span>
      </div>
    `}_renderDistBar(t){return W`
      <div class="skill-bar" style="margin-bottom:8px">
        <span class="skill-bar__label">${t.label}</span>
        <div class="skill-bar__track">
          <div class="skill-bar__fill" style="width:${t.pct}%;background:${t.color}"></div>
        </div>
        <span class="skill-bar__value">${t.pct}%</span>
      </div>
    `}};Nt.styles=xt,t([gt({attribute:!1,hasChanged:()=>!0})],Nt.prototype,"card",void 0),Nt=t([pt("monitor-stats")],Nt);const Rt=[{name:"Blu",chip:"chip--accent",hex:"#4a6cf7"},{name:"Verde",chip:"chip--ok",hex:"#2dbc6e"},{name:"Arancio",chip:"chip--warn",hex:"#d4930d"},{name:"Rosso",chip:"chip--danger",hex:"#d94040"},{name:"Viola",chip:"chip--xp",hex:"#9060e8"}],Dt=[{key:"pesi",label:"Pesi",points:40,iconName:"dumbbell",colors:Rt,defaultColor:"chip--accent"},{key:"corsa",label:"Corsa",points:30,iconName:"run",colors:Rt,defaultColor:"chip--ok"},{key:"cammino",label:"Cammino",points:20,iconName:"heart",colors:Rt,defaultColor:"chip--warn"},{key:"hiit",label:"HIIT",points:35,iconName:"flame",colors:Rt,defaultColor:"chip--danger"}],Ut=[{key:"peso",label:"Peso",entity:"sensor.withings_peso"},{key:"altezza",label:"Altezza",entity:"sensor.withings_altezza"},{key:"obiettivo_peso",label:"Obiettivo peso",entity:"sensor.withings_obiettivo_di_peso"},{key:"passi",label:"Passi oggi",entity:"sensor.withings_passi_oggi"},{key:"calorie_attive",label:"Calorie attive",entity:"sensor.withings_calorie_attive_bruciate_oggi"},{key:"calorie_totali",label:"Calorie totali",entity:"sensor.withings_calorie_totali_bruciate_oggi"},{key:"distanza",label:"Distanza oggi",entity:"sensor.withings_distanza_percorsa_oggi"},{key:"attivita_intensa",label:"Attività intensa",entity:"sensor.withings_attivita_intensa_oggi"},{key:"attivita_moderata",label:"Attività moderata",entity:"sensor.withings_attivita_moderata_oggi"},{key:"attivita_leggera",label:"Attività leggera",entity:"sensor.withings_attivita_leggera_oggi"},{key:"tempo_attivita",label:"Tempo attività",entity:"sensor.withings_tempo_di_attivita_oggi"},{key:"elevazione",label:"Elevazione oggi",entity:"sensor.withings_variazione_dell_elevazione_oggi"}];let Lt=class extends dt{constructor(){super(...arguments),this._importPath="/config/esporta.zip",this._importStatus="idle",this._importMessage=""}get hass(){return this.card.hass}render(){return W`
      <div class="col" style="gap:22px">

        <!-- Header -->
        <div>
          <h1 class="page-title">Impostazioni</h1>
          <p class="page-sub">Configurazione</p>
        </div>

        <!-- Workout types & colors -->
        ${this._renderWorkoutTypes()}

        <!-- Withings -->
        ${this._renderWithings()}

        <!-- Import -->
        ${this._renderImport()}

      </div>
    `}_renderWorkoutTypes(){return W`
      <div>
        <h2 style="margin:0 0 12px;font-size:16px;font-weight:600">Tipi di allenamento</h2>
        <div class="card">
          <p class="text-soft text-sm" style="margin:0 0 14px">
            Ogni allenamento importato assegna punti in base al tipo di attività. Scegli il colore per ogni tipo.
          </p>
          <div class="col" style="gap:10px">
            ${Dt.map(t=>W`
                <div class="card card--ghost" style="padding:12px 14px">
                  <div class="sp-between" style="margin-bottom:8px">
                    <div style="display:flex;align-items:center;gap:8px">
                      <div class="stat-row__icon" style="width:28px;height:28px">
                        ${bt(t.iconName,14)}
                      </div>
                      <span class="fw-600">${t.label}</span>
                    </div>
                    <span class="mono fw-600">${t.points} pt</span>
                  </div>
                  <div style="display:flex;gap:6px;flex-wrap:wrap">
                    ${t.colors.map(e=>W`
                        <button class="color-dot${e.chip===t.defaultColor?" color-dot--active":""}"
                          style="background:${e.hex}"
                          title="${e.name}">
                        </button>
                      `)}
                  </div>
                </div>
              `)}
          </div>
        </div>
      </div>
    `}_renderWithings(){return W`
      <div>
        <h2 style="margin:0 0 12px;font-size:16px;font-weight:600">Withings</h2>
        <div class="card">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px">
            <div class="stat-row__icon" style="background:var(--accent-soft);color:var(--accent-ink)">
              ${bt("scale",17)}
            </div>
            <div>
              <div class="fw-600">Sensori collegati</div>
              <p class="text-soft text-sm" style="margin:2px 0 0">
                Entità importate dall'integrazione Withings.
              </p>
            </div>
          </div>
          <div class="col" style="gap:4px">
            ${Ut.map(t=>{const e=this.hass?.states?.[t.entity],i=e?.state,r=e?.attributes?.unit_of_measurement||"",s=i&&"unknown"!==i&&"unavailable"!==i;return W`
                  <div class="sp-between" style="align-items:center;padding:6px 0;border-bottom:1px solid var(--border)">
                    <span class="text-sm fw-500" style="min-width:130px">${t.label}</span>
                    <div style="display:flex;align-items:center;gap:6px">
                      <span class="mono text-sm">${s?`${parseFloat(i).toLocaleString("it-IT")} ${r}`:"—"}</span>
                      <span class="chip__dot" style="width:6px;height:6px;border-radius:50%;background:${s?"var(--ok)":"var(--text-muted)"}"></span>
                    </div>
                  </div>
                `})}
          </div>
        </div>
      </div>
    `}_renderImport(){const t="loading"===this._importStatus;return W`
      <div>
        <h2 style="margin:0 0 12px;font-size:16px;font-weight:600">Importazione Apple Health</h2>
        <div class="card">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px">
            <div class="stat-row__icon" style="background:var(--accent-soft);color:var(--accent-ink)">
              ${bt("heart",17)}
            </div>
            <div>
              <div class="fw-600">Importa da file</div>
              <p class="text-soft text-sm" style="margin:2px 0 0">
                Esporta i dati da Apple Health (.xml o .zip) e caricali in <code style="font-family:var(--font-mono);font-size:11px;background:var(--muted);padding:2px 5px;border-radius:4px">/config/</code> di HA
              </p>
            </div>
          </div>
          <div style="display:flex;gap:8px;align-items:center">
            <input class="settings-input" type="text" style="max-width:none;flex:1"
              .value=${this._importPath}
              @input=${t=>{this._importPath=t.target.value}}
              placeholder="/config/esporta.zip"
            />
            <button class="btn btn--primary" style="white-space:nowrap;min-width:90px"
              ?disabled=${t}
              @click=${this._handleImport}>
              ${t?"Importo...":"Importa"}
            </button>
          </div>
          ${this._importMessage?W`
            <div style="margin-top:10px;padding:8px 12px;border-radius:var(--r-sm);font-size:13px;
              background:${"error"===this._importStatus?"var(--danger-soft)":"var(--ok-soft)"};
              color:${"error"===this._importStatus?"var(--danger)":"var(--ok)"}">
              ${this._importMessage}
            </div>
          `:G}
          <p class="text-soft text-sm" style="margin:14px 0 0;line-height:1.6">
            Puoi anche importare singoli allenamenti tramite il servizio
            <code style="font-family:var(--font-mono);font-size:11px;background:var(--muted);padding:2px 5px;border-radius:4px">monitor_allenamenti.log_workout</code>
            da Shortcut iOS o automazione HA.
          </p>
        </div>
      </div>
    `}async _handleImport(){if(this._importPath.trim()){this._importStatus="loading",this._importMessage="";try{await(t=this.hass,e="import_apple_health",i={file_path:this._importPath.trim()},t.callService(ft,e,i)),this._importStatus="done",this._importMessage="Importazione completata. Controlla gli allenamenti."}catch(t){this._importStatus="error",this._importMessage=t?.message||"Errore durante l'importazione."}var t,e,i}}};Lt.styles=xt,t([gt({attribute:!1,hasChanged:()=>!0})],Lt.prototype,"card",void 0),t([ut()],Lt.prototype,"_importPath",void 0),t([ut()],Lt.prototype,"_importStatus",void 0),t([ut()],Lt.prototype,"_importMessage",void 0),Lt=t([pt("monitor-settings")],Lt);const Vt={overview:["Panoramica","monitor / panoramica"],workouts:["Allenamenti","monitor / allenamenti"],body:["Composizione","monitor / composizione"],calendar:["Calendario","monitor / calendario"],stats:["Statistiche","monitor / statistiche"],settings:["Impostazioni","monitor / impostazioni"]};let Wt=class extends dt{constructor(){super(...arguments),this._screen="overview",this._mobile=!1,this._drawerOpen=!1,this._desktopCollapsed=!1,this._screenInitialised=!1}setConfig(t){this.config=t||{},t?.default_screen&&!this._screenInitialised&&(this._screen=t.default_screen,this._screenInitialised=!0),void 0!==t?.collapse_sidebar&&(this._desktopCollapsed=!!t.collapse_sidebar),this.isConnected&&this._checkPanelMode()}static getStubConfig(){return{type:"custom:monitor-allenamenti-card"}}navigate(t){this._screen=t,this._mobile&&(this._drawerOpen=!1)}_checkPanelMode(){if(!this.isConnected)return;const t=this.config?.panel_mode;let e;if(!0===t)e=!0;else if(!1===t)e=!1;else{const t=this.getBoundingClientRect();e=t.top<30&&t.height>200}this.hasAttribute("panel-mode")!==e&&this.toggleAttribute("panel-mode",e);const i=this.config?.panel_offset;"number"==typeof i&&i>=0?this.style.setProperty("--monitor-panel-offset",`${i}px`):this.style.removeProperty("--monitor-panel-offset")}connectedCallback(){super.connectedCallback(),this._checkPanelMode(),setTimeout(()=>this._checkPanelMode(),50),setTimeout(()=>this._checkPanelMode(),250),this._resizeObserver=new ResizeObserver(t=>{this._checkPanelMode();for(const e of t){const t=this.config?.mobile_threshold??700;this._mobile=t>0&&e.contentRect.width<t}}),this._resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect()}firstUpdated(){this._checkPanelMode()}render(){const[t,e]=Vt[this._screen]||Vt.overview,i=this._mobile&&this._drawerOpen;let r;r=this._mobile?i?"drawer":"mini":this._desktopCollapsed?"mini":"full";const s=_t(this.hass,"punti")||"0",o=_t(this.hass,"streak")||"0";return W`
      <div class="app">
        ${this._renderSidebar(r)}
        ${i?W`<div class="sidebar-backdrop" @click=${()=>{this._drawerOpen=!1}}></div>`:G}
        <main class="content">
          ${this._renderTopbar(t,e,s,o)}
          <div class="content__inner">
            ${this._renderScreen()}
          </div>
        </main>
      </div>
    `}_renderSidebar(t){const e="mini"===t;return W`
      <aside class="sidebar" data-mode="${t}">
        <button class="sidebar__hamburger"
          @click=${()=>{this._mobile?this._drawerOpen=!this._drawerOpen:this._desktopCollapsed=!this._desktopCollapsed}}>
          ${bt(e?"menu":"close",18)}
        </button>
        <div class="sidebar__brand">
          <div class="sidebar__brand-mark">${bt("dumbbell",16)}</div>
          ${e?G:W`<div>
                <div class="sidebar__brand-name">Monitor</div>
                <div class="sidebar__brand-sub">v${"1.0.0"}</div>
              </div>`}
        </div>
        ${e?G:W`<div class="nav-section">Tracking</div>`}
        ${[{key:"overview",label:"Panoramica",iconName:"dashboard"},{key:"workouts",label:"Allenamenti",iconName:"dumbbell"},{key:"body",label:"Composizione",iconName:"scale"},{key:"calendar",label:"Calendario",iconName:"calendar"},{key:"stats",label:"Statistiche",iconName:"chart"}].map(t=>W`
            <button class="nav-item" data-active="${this._screen===t.key}"
              title="${e?t.label:""}" @click=${()=>this.navigate(t.key)}>
              ${bt(t.iconName,16)} ${e?G:W`<span>${t.label}</span>`}
            </button>
          `)}
        <div class="sidebar__footer">
          <button class="nav-item" data-active="${"settings"===this._screen}"
            title="${e?"Impostazioni":""}" @click=${()=>this.navigate("settings")}>
            ${bt("settings",16)} ${e?G:W`<span>Impostazioni</span>`}
          </button>
        </div>
      </aside>
    `}_renderTopbar(t,e,i,r){return W`
      <div class="topbar">
        <div>
          <div class="topbar__title">${t}</div>
          <div class="topbar__crumbs">${e}</div>
        </div>
        <div class="topbar__spacer"></div>
        <div class="topbar__pill">
          ${bt("trending-up",13)}
          <span>${i} pt</span>
        </div>
        <div class="topbar__pill">
          <span class="topbar__dot"></span>
          <span>Streak ${r}g</span>
        </div>
      </div>
    `}_renderScreen(){switch(this._screen){case"overview":default:return W`<monitor-overview .card=${this}></monitor-overview>`;case"workouts":return W`<monitor-workouts .card=${this}></monitor-workouts>`;case"body":return W`<monitor-body .card=${this}></monitor-body>`;case"calendar":return W`<monitor-calendar .card=${this}></monitor-calendar>`;case"stats":return W`<monitor-stats .card=${this}></monitor-stats>`;case"settings":return W`<monitor-settings .card=${this}></monitor-settings>`}}};Wt.styles=[mt,xt],t([gt({attribute:!1})],Wt.prototype,"hass",void 0),t([gt({attribute:!1})],Wt.prototype,"config",void 0),t([ut()],Wt.prototype,"_screen",void 0),t([ut()],Wt.prototype,"_mobile",void 0),t([ut()],Wt.prototype,"_drawerOpen",void 0),t([ut()],Wt.prototype,"_desktopCollapsed",void 0),Wt=t([pt("monitor-allenamenti-card")],Wt),window.customCards=window.customCards||[],window.customCards.push({type:"monitor-allenamenti-card",name:"Monitor Allenamenti",description:"Tracker peso e allenamenti con statistiche",preview:!0});export{Wt as MonitorAllenamentiCard};
