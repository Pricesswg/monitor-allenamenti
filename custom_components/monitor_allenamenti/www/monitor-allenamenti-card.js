function t(t,e,i,s){var r,a=arguments.length,o=a<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(o=(a<3?r(o):a>3?r(e,i,o):r(e,i))||o);return a>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let a=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new a(i,t,s)},n=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:v}=Object,g=globalThis,u=g.trustedTypes,m=u?u.emptyScript:"",x=g.reactiveElementPolyfillSupport,f=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!l(t,e),k={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=k){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&d(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const a=s?.call(this);r?.call(this,e),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??k}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=v(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...p(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:_).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=s;const a=r.fromAttribute(e,t.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const a=this.constructor;if(!1===s&&(r=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??b)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==r||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[f("elementProperties")]=new Map,y[f("finalized")]=new Map,x?.({ReactiveElement:y}),(g.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,w=t=>t,z=$.trustedTypes,C=z?z.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+A,E=`<${M}>`,P=document,D=()=>P.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,B=Array.isArray,j="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,H=/>/g,I=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,R=/"/g,F=/^(?:script|style|textarea|title)$/i,L=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),V=L(1),W=L(2),q=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),Y=new WeakMap,J=P.createTreeWalker(P,129);function K(t,e){if(!B(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const X=(t,e)=>{const i=t.length-1,s=[];let r,a=2===e?"<svg>":3===e?"<math>":"",o=N;for(let e=0;e<i;e++){const i=t[e];let n,l,d=-1,c=0;for(;c<i.length&&(o.lastIndex=c,l=o.exec(i),null!==l);)c=o.lastIndex,o===N?"!--"===l[1]?o=T:void 0!==l[1]?o=H:void 0!==l[2]?(F.test(l[2])&&(r=RegExp("</"+l[2],"g")),o=I):void 0!==l[3]&&(o=I):o===I?">"===l[0]?(o=r??N,d=-1):void 0===l[1]?d=-2:(d=o.lastIndex-l[2].length,n=l[1],o=void 0===l[3]?I:'"'===l[3]?R:U):o===R||o===U?o=I:o===T||o===H?o=N:(o=I,r=void 0);const p=o===I&&t[e+1].startsWith("/>")?" ":"";a+=o===N?i+E:d>=0?(s.push(n),i.slice(0,d)+S+i.slice(d)+A+p):i+A+(-2===d?e:p)}return[K(t,a+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,a=0;const o=t.length-1,n=this.parts,[l,d]=X(t,e);if(this.el=Z.createElement(l,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=J.nextNode())&&n.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=d[a++],i=s.getAttribute(t).split(A),o=/([.?@])?(.*)/.exec(e);n.push({type:1,index:r,name:o[2],strings:i,ctor:"."===o[1]?st:"?"===o[1]?rt:"@"===o[1]?at:it}),s.removeAttribute(t)}else t.startsWith(A)&&(n.push({type:6,index:r}),s.removeAttribute(t));if(F.test(s.tagName)){const t=s.textContent.split(A),e=t.length-1;if(e>0){s.textContent=z?z.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],D()),J.nextNode(),n.push({type:2,index:++r});s.append(t[e],D())}}}else if(8===s.nodeType)if(s.data===M)n.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(A,t+1));)n.push({type:7,index:r}),t+=A.length-1}r++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,s){if(e===q)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const a=O(e)?void 0:e._$litDirective$;return r?.constructor!==a&&(r?._$AO?.(!1),void 0===a?r=void 0:(r=new a(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=Q(t,r._$AS(t,e.values),r,s)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??P).importNode(e,!0);J.currentNode=s;let r=J.nextNode(),a=0,o=0,n=i[0];for(;void 0!==n;){if(a===n.index){let e;2===n.type?e=new et(r,r.nextSibling,this,t):1===n.type?e=new n.ctor(r,n.name,n.strings,this,t):6===n.type&&(e=new ot(r,this,t)),this._$AV.push(e),n=i[++o]}a!==n?.index&&(r=J.nextNode(),a++)}return J.currentNode=P,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),O(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>B(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==G&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new tt(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new Z(t)),e}k(t){B(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new et(this.O(D()),this.O(D()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(t,e=this,i,s){const r=this.strings;let a=!1;if(void 0===r)t=Q(this,t,e,0),a=!O(t)||t!==this._$AH&&t!==q,a&&(this._$AH=t);else{const s=t;let o,n;for(t=r[0],o=0;o<r.length-1;o++)n=Q(this,s[i+o],e,o),n===q&&(n=this._$AH[o]),a||=!O(n)||n!==this._$AH[o],n===G?t=G:t!==G&&(t+=(n??"")+r[o+1]),this._$AH[o]=n}a&&!s&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}class rt extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==G)}}class at extends it{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??G)===q)return;const i=this._$AH,s=t===G&&i!==G||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==G&&(i===G||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const nt=$.litHtmlPolyfillSupport;nt?.(Z,et),($.litHtmlVersions??=[]).push("3.3.3");const lt=globalThis;class dt extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new et(e.insertBefore(D(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}dt._$litElement$=!0,dt.finalized=!0,lt.litElementHydrateSupport?.({LitElement:dt});const ct=lt.litElementPolyfillSupport;ct?.({LitElement:dt}),(lt.litElementVersions??=[]).push("4.2.2");const pt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:b},vt=(t=ht,e,i)=>{const{kind:s,metadata:r}=i;let a=globalThis.litPropertyMetadata.get(r);if(void 0===a&&globalThis.litPropertyMetadata.set(r,a=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),a.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function gt(t){return(e,i)=>"object"==typeof i?vt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return gt({...t,state:!0,attribute:!1})}const mt=o`
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
    --shadow-lg: 0 16px 40px rgba(0, 0, 0, 0.16), 0 4px 12px rgba(0, 0, 0, 0.08);

    --density-pad: 16px;
    --density-gap: 16px;
    --row-h: 56px;

    font-family: var(--font-sans);
    font-size: 14px;
    line-height: 1.45;
    color: var(--text);
    -webkit-font-smoothing: antialiased;
  }

  :host([density="compact"]) {
    --density-pad: 10px;
    --density-gap: 10px;
    --row-h: 44px;
  }
`,xt=o`
  :host { display: block; }
  * { box-sizing: border-box; }
  button, input, select, textarea { font: inherit; color: inherit; }
  button { cursor: pointer; background: none; border: none; padding: 0; }
  input, textarea, select { outline: none; }
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
    width: 244px;
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
    width: 244px;
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
    font-weight: 700; font-size: 13px; letter-spacing: -0.02em;
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
  .sidebar[data-mode="mini"] .sidebar__footer { padding-top: 10px; align-items: center; }

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
  .card--pad-lg { padding: 22px; }
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
  .btn--icon { padding: 8px; }
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
  .chip svg { width: 11px; height: 11px; }
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

  /* Input */
  .input, .select, .textarea {
    width: 100%; padding: 9px 12px; border-radius: var(--r-md);
    border: 1px solid var(--border); background: var(--surface);
    color: var(--text); font-size: 13px;
    transition: border-color 120ms, box-shadow 120ms;
  }
  .input:focus, .select:focus { border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent); }
  .field { display: flex; flex-direction: column; gap: 6px; }
  .field__label { font-size: 12px; font-weight: 500; color: var(--text-soft); }
  .field__hint { font-size: 11.5px; color: var(--text-muted); }

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
    .topbar__title { font-size: 16px; }
  }

  @media (max-width: 600px) {
    .content__inner { padding: 14px 10px 30px; }
    .topbar { padding: 10px 12px; gap: 8px; }
    .topbar__title { font-size: 14px; }
    .page-title { font-size: 22px !important; }
    .page-sub { font-size: 12px !important; }
    .card { padding: 12px !important; }
    .card--pad-lg { padding: 16px !important; }
    .kpi { padding: 12px; }
    .kpi__value { font-size: 22px; }
    .grid-auto { grid-template-columns: 1fr !important; }
    .grid-4 { grid-template-columns: 1fr 1fr; }
    .segmented button { padding: 5px 8px; font-size: 11.5px; }
    .btn { padding: 7px 10px; font-size: 12.5px; }
  }
`;function ft(t,e=16,i=1.6){const s=e,r=i;switch(t){case"dashboard":return W`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${r}" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>`;case"dumbbell":return W`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${r}" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 6.5h11M6 12h12"/><rect x="2" y="8" width="4" height="8" rx="1"/><rect x="18" y="8" width="4" height="8" rx="1"/><rect x="5" y="6" width="2" height="12" rx="0.5"/><rect x="17" y="6" width="2" height="12" rx="0.5"/></svg>`;case"scale":return W`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${r}" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><circle cx="12" cy="12" r="4"/><path d="M12 8v4l2.5 1.5"/></svg>`;case"calendar":return W`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${r}" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>`;case"user":return W`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${r}" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>`;case"target":return W`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${r}" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>`;case"chart":return W`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${r}" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20h18"/><path d="M5 20V10l4-3 4 5 4-7 4 4v11"/></svg>`;case"sliders":return W`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${r}" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></svg>`;case"settings":return W`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${r}" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>`;case"sword":return W`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${r}" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 17.5 3 6V3h3l11.5 11.5"/><path d="M13 19l6-6M16 16l4 4M9 5l1-1"/></svg>`;case"flame":return W`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${r}" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c1 4 5 6 5 11a5 5 0 0 1-10 0c0-5 4-7 5-11z"/><path d="M12 18a2 2 0 0 1-2-2c0-2 2-3 2-5 0 2 2 3 2 5a2 2 0 0 1-2 2z"/></svg>`;case"trophy":return W`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${r}" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V4h12v5a6 6 0 0 1-12 0z"/><path d="M6 6H3v3a3 3 0 0 0 3 3M18 6h3v3a3 3 0 0 1-3 3M9 19h6M12 15v4M8 21h8"/></svg>`;case"heart":return W`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${r}" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21C12 21 3 14 3 8.5a4.5 4.5 0 0 1 9-1 4.5 4.5 0 0 1 9 1C21 14 12 21 12 21z"/></svg>`;case"bolt":return W`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${r}" stroke-linecap="round" stroke-linejoin="round"><path d="M13 3 4 14h7l-1 7 9-11h-7z"/></svg>`;case"shield":return W`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${r}" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4 7v5c0 5 3.5 8 8 10 4.5-2 8-5 8-10V7z"/></svg>`;case"medal":return W`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${r}" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="15" r="5"/><path d="M8.2 13 6 3h3l3 4 3-4h3l-2.2 10"/></svg>`;case"run":return W`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${r}" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="4" r="2"/><path d="M6 20l3-7 2 2 4-4 2 6"/><path d="M9 13l-3-3 5-2"/></svg>`;case"check":return W`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${r}" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4L19 7"/></svg>`;case"close":return W`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${r}" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6 6 18"/></svg>`;case"menu":return W`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${r}" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`;case"chevron-right":return W`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${r}" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>`;case"info":return W`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${r}" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v5h1"/></svg>`;case"clock":return W`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${r}" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`;case"plus":return W`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${r}" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>`;case"play":return W`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${r}" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v16l14-8z" fill="currentColor" stroke="none"/></svg>`;case"pause":return W`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${r}" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="5" width="4" height="14" fill="currentColor" stroke="none"/><rect x="14" y="5" width="4" height="14" fill="currentColor" stroke="none"/></svg>`;case"weight":return W`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${r}" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2"/><path d="M5 21h14l-2-14H7z"/></svg>`;case"droplet":return W`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${r}" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11z"/></svg>`;case"trending-up":return W`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${r}" stroke-linecap="round" stroke-linejoin="round"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>`;case"trending-down":return W`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${r}" stroke-linecap="round" stroke-linejoin="round"><path d="M23 18l-9.5-9.5-5 5L1 6"/><path d="M17 18h6v-6"/></svg>`;case"upload":return W`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${r}" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`;default:return W`<svg width="${s}" height="${s}" viewBox="0 0 24 24"></svg>`}}function _t(t,e){const i=`sensor.monitor_allenamenti_${e}`;return t.states[i]?.state??""}function bt(t,e=0){const i="string"==typeof t?parseFloat(t):t;return isNaN(i)?"—":i.toLocaleString("it-IT",{minimumFractionDigits:e,maximumFractionDigits:e})}function kt(t,e=""){return`${t>0?"+":""}${bt(t,1)}${e?" "+e:""}`}function yt(t,e,i){if(t.length<2)return"";const s=Math.min(...t),r=Math.max(...t)-s||1,a=e/(t.length-1);return t.map((t,e)=>{const o=i-(t-s)/r*i;return`${0===e?"M":"L"}${(e*a).toFixed(1)},${o.toFixed(1)}`}).join(" ")}function $t(t,e,i){const s=Math.min(1,Math.max(0,t)),r=2*Math.PI*e;return W`
    <circle cx="50" cy="50" r="${e}" fill="none" stroke="var(--border)" stroke-width="6" opacity="0.3"/>
    <circle cx="50" cy="50" r="${e}" fill="none" stroke="${i}" stroke-width="6"
      stroke-dasharray="${r}" stroke-dashoffset="${r*(1-s)}"
      stroke-linecap="round" transform="rotate(-90 50 50)"/>
  `}let wt=class extends dt{render(){const t=this.card.hass,e=this.card.monitorState,i=t.states["sensor.withings_peso"]?.state??"—",s=e?.points_total??0,r=e?.streak??0,a=e?.workouts??[],o=new Date,n=`${o.getFullYear()}-${String(o.getMonth()+1).padStart(2,"0")}`,l=a.filter(t=>t.date?.startsWith(n)).length,d=[...a].sort((t,e)=>e.date.localeCompare(t.date)).slice(0,5),c=(e?.weight_history??[]).map(t=>t.weight),p=c.length>=2?c[c.length-1]-c[Math.max(0,c.length-8)]:0,h=c.length>=2?yt(c.slice(-14),160,36):"";return V`
      <div class="col" style="gap:22px">

        <div>
          <h1 class="page-title">Panoramica</h1>
          <p class="page-sub">${function(){const t=new Date;return`${["Domenica","Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato"][t.getDay()]} ${t.getDate()} ${["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"][t.getMonth()]} ${t.getFullYear()}`}()}</p>
        </div>

        <div class="grid-4">
          <div class="kpi">
            <div class="kpi__label">Peso</div>
            <div class="kpi__value">${i}<span class="text-mute" style="font-size:14px;margin-left:4px">kg</span></div>
            <div class="kpi__delta" style="color:${p<=0?"var(--ok)":"var(--warn)"}">${c.length>=2?kt(p,"in 7g"):"—"}</div>
          </div>
          <div class="kpi">
            <div class="kpi__label">Allenamenti</div>
            <div class="kpi__value">${l}</div>
            <div class="kpi__delta">questo mese</div>
          </div>
          <div class="kpi">
            <div class="kpi__label">Punti</div>
            <div class="kpi__value">${bt(s)}</div>
            <div class="kpi__delta">totali</div>
          </div>
          <div class="kpi">
            <div class="kpi__label">Streak</div>
            <div class="kpi__value" style="color:var(--streak)">${r}<span class="text-mute" style="font-size:14px;margin-left:4px">giorni</span></div>
            <div class="kpi__delta">consecutivi</div>
          </div>
        </div>

        <div>
          <h2 style="margin:0 0 12px;font-size:16px;font-weight:600">Ultimi allenamenti</h2>
          <div class="card">
            ${0===d.length?V`<div style="padding:16px;color:var(--text-muted);text-align:center">Nessun allenamento registrato</div>`:d.map(t=>V`
                <div class="stat-row">
                  <div class="stat-row__icon">${ft(function(t){switch(t){case"pesi":default:return"dumbbell";case"corsa":return"run";case"cammino":return"heart";case"hiit":return"flame";case"nuoto":return"droplet"}}(t.type),17)}</div>
                  <div class="stat-row__main">
                    <div class="stat-row__name">${function(t){switch(t){case"pesi":return"Pesi";case"corsa":return"Corsa";case"cammino":return"Cammino";case"hiit":return"HIIT";case"nuoto":return"Nuoto";default:return t}}(t.type)}</div>
                    <div class="stat-row__meta">${function(t){try{const e=new Date(t),i=new Date,s=new Date;return s.setDate(s.getDate()-1),e.toDateString()===i.toDateString()?"Oggi":e.toDateString()===s.toDateString()?"Ieri":e.toLocaleDateString("it-IT",{day:"numeric",month:"short"})}catch{return t}}(t.date)}</div>
                  </div>
                  <div style="text-align:right">
                    <div class="stat-row__value">${bt(t.duration_min)} min</div>
                    <div class="stat-row__meta">${bt(t.calories)} kcal${t.distance_km?` · ${bt(t.distance_km,1)} km`:""}${t.volume_kg?` · ${bt(t.volume_kg)} kg`:""}</div>
                  </div>
                </div>
              `)}
          </div>
        </div>

        ${this._renderHealthCards(e)}

        ${h?V`
          <div>
            <h2 style="margin:0 0 12px;font-size:16px;font-weight:600">Peso</h2>
            <div class="kpi" style="display:flex;align-items:center;gap:20px;max-width:420px">
              <div style="flex:1">
                <div class="kpi__label">Peso attuale</div>
                <div class="kpi__value">${i}<span class="text-mute" style="font-size:14px;margin-left:4px">kg</span></div>
                <div class="kpi__delta" style="color:${p<=0?"var(--ok)":"var(--warn)"}">${kt(p,"in 7g")}</div>
              </div>
              <svg class="sparkline" width="${160}" height="${36}" viewBox="0 0 ${160} ${36}">
                <polyline points="${h}" stroke="var(--accent)"/>
              </svg>
            </div>
          </div>
        `:""}

        <div class="row" style="flex-wrap:wrap;gap:10px">
          <button class="btn btn--primary" @click=${()=>this.card.navigate("workouts")}>
            ${ft("dumbbell",14)} Allenamenti
          </button>
          <button class="btn btn--ghost" @click=${()=>this.card.navigate("body")}>
            ${ft("scale",14)} Composizione
          </button>
        </div>

      </div>
    `}_renderHealthCards(t){const e=(t?.activity_summaries??[]).slice(-1)[0],i=(t?.sleep_history??[]).slice(-1)[0],s=(t?.resting_hr??[]).slice(-1)[0],r=(t?.vo2max??[]).slice(-1)[0],a=(t?.hrv_daily??[]).slice(-1)[0];return e||i||s?V`
      <div class="grid-2" style="gap:14px">

        ${e?V`
          <div class="card" style="padding:16px">
            <div class="sp-between" style="margin-bottom:12px">
              <span class="fw-600 text-sm">Attività oggi</span>
              <span class="text-mute text-xs">${e.date}</span>
            </div>
            <div style="display:flex;align-items:center;gap:16px">
              <svg width="80" height="80" viewBox="0 0 100 100">
                ${$t(e.active_energy/(e.active_energy_goal||1),44,"var(--danger)")}
                ${$t(e.exercise_min/(e.exercise_goal||1),35,"var(--ok)")}
                ${$t(e.stand_hours/(e.stand_goal||1),26,"var(--accent)")}
              </svg>
              <div class="col" style="gap:6px;flex:1">
                <div class="sp-between">
                  <span class="text-xs" style="color:var(--danger)">Movimento</span>
                  <span class="mono text-xs fw-600">${bt(e.active_energy)}/${bt(e.active_energy_goal)} kcal</span>
                </div>
                <div class="sp-between">
                  <span class="text-xs" style="color:var(--ok)">Esercizio</span>
                  <span class="mono text-xs fw-600">${bt(e.exercise_min)}/${bt(e.exercise_goal)} min</span>
                </div>
                <div class="sp-between">
                  <span class="text-xs" style="color:var(--accent)">In piedi</span>
                  <span class="mono text-xs fw-600">${bt(e.stand_hours)}/${bt(e.stand_goal)} h</span>
                </div>
              </div>
            </div>
          </div>
        `:""}

        ${i?V`
          <div class="card" style="padding:16px">
            <div class="sp-between" style="margin-bottom:12px">
              <span class="fw-600 text-sm">Sonno</span>
              <span class="text-mute text-xs">${i.date}</span>
            </div>
            <div class="mono fw-700" style="font-size:22px;margin-bottom:10px">
              ${Math.floor(i.total_min/60)}h ${i.total_min%60}m
            </div>
            <div style="display:flex;gap:4px;height:8px;border-radius:4px;overflow:hidden;margin-bottom:10px">
              <div style="flex:${i.deep_min};background:var(--accent)" title="Deep ${i.deep_min}m"></div>
              <div style="flex:${i.core_min};background:var(--ok)" title="Core ${i.core_min}m"></div>
              <div style="flex:${i.rem_min};background:var(--warn)" title="REM ${i.rem_min}m"></div>
              <div style="flex:${i.awake_min||1};background:var(--border)" title="Sveglio ${i.awake_min}m"></div>
            </div>
            <div style="display:flex;gap:10px;flex-wrap:wrap">
              <span class="text-xs"><span style="color:var(--accent)">●</span> Deep ${i.deep_min}m</span>
              <span class="text-xs"><span style="color:var(--ok)">●</span> Core ${i.core_min}m</span>
              <span class="text-xs"><span style="color:var(--warn)">●</span> REM ${i.rem_min}m</span>
            </div>
          </div>
        `:""}

      </div>

      ${s||r||a?V`
        <div class="grid-${[s,r,a].filter(Boolean).length}" style="gap:14px">
          ${s?V`
            <div class="kpi">
              <div class="kpi__label">FC riposo</div>
              <div class="kpi__value" style="color:var(--danger)">${s.bpm}<span class="text-mute" style="font-size:14px;margin-left:4px">bpm</span></div>
              <div class="kpi__delta">${s.date}</div>
            </div>
          `:""}
          ${r?V`
            <div class="kpi">
              <div class="kpi__label">VO₂ Max</div>
              <div class="kpi__value" style="color:var(--ok)">${bt(r.value,1)}</div>
              <div class="kpi__delta">mL/min·kg</div>
            </div>
          `:""}
          ${a?V`
            <div class="kpi">
              <div class="kpi__label">HRV</div>
              <div class="kpi__value" style="color:var(--accent)">${bt(a.value_ms,0)}<span class="text-mute" style="font-size:14px;margin-left:4px">ms</span></div>
              <div class="kpi__delta">${a.date}</div>
            </div>
          `:""}
        </div>
      `:""}
    `:""}};wt.styles=xt,t([gt({attribute:!1,hasChanged:()=>!0})],wt.prototype,"card",void 0),wt=t([pt("monitor-overview")],wt);const zt=[{key:"all",label:"Tutti"},{key:"pesi",label:"Pesi"},{key:"corsa",label:"Corsa"},{key:"cammino",label:"Cammino"},{key:"hiit",label:"HIIT"}];let Ct=class extends dt{constructor(){super(...arguments),this._filter="all"}get _workouts(){const t=[...this.card.monitorState?.workouts??[]].sort((t,e)=>e.date.localeCompare(t.date));return"all"===this._filter?t:t.filter(t=>t.type===this._filter)}render(){const t=this._workouts,e=this.card.monitorState?.workouts??[],i=e.length,s=e.reduce((t,e)=>t+(e.volume_kg||0),0),r=e.reduce((t,e)=>t+(e.distance_km||0),0);return V`
      <div class="col" style="gap:22px">

        <div class="sp-between" style="flex-wrap:wrap;gap:12px">
          <div>
            <h1 class="page-title">Allenamenti</h1>
            <p class="page-sub">${i} sessioni registrate</p>
          </div>
        </div>

        <div class="segmented">
          ${zt.map(t=>V`
            <button data-active="${this._filter===t.key}"
              @click=${()=>{this._filter=t.key}}>
              ${t.label}
            </button>
          `)}
        </div>

        <div class="grid-3">
          <div class="kpi">
            <div class="kpi__label">Sessioni</div>
            <div class="kpi__value">${i}</div>
          </div>
          <div class="kpi">
            <div class="kpi__label">Volume totale</div>
            <div class="kpi__value">${s>=1e3?bt(s/1e3,1):bt(s)}<span class="text-mute" style="font-size:14px;margin-left:4px">${s>=1e3?"t":"kg"}</span></div>
          </div>
          <div class="kpi">
            <div class="kpi__label">Distanza totale</div>
            <div class="kpi__value">${bt(r,1)}<span class="text-mute" style="font-size:14px;margin-left:4px">km</span></div>
          </div>
        </div>

        <div>
          <h2 style="margin:0 0 12px;font-size:16px;font-weight:600">Registro</h2>
          <div class="col" style="gap:12px">
            ${0===t.length?V`<div class="card card--ghost" style="text-align:center;padding:28px;color:var(--text-muted)">
                  Nessun allenamento${"all"!==this._filter?" con questo filtro":" registrato"}
                </div>`:t.slice(0,30).map(t=>this._renderWorkoutCard(t))}
          </div>
        </div>

      </div>
    `}_renderWorkoutCard(t){return V`
      <div class="card">
        <div class="sp-between" style="margin-bottom:10px">
          <div class="row">
            ${ft(function(t){switch(t){case"pesi":default:return"dumbbell";case"corsa":return"run";case"cammino":return"heart";case"hiit":return"flame"}}(t.type),16)}
            <span class="chip ${function(t){switch(t){case"pesi":return"chip--accent";case"corsa":return"chip--ok";case"cammino":return"chip--warn";case"hiit":return"chip--danger";default:return""}}(t.type)}">${function(t){switch(t){case"pesi":return"Pesi";case"corsa":return"Corsa";case"cammino":return"Cammino";case"hiit":return"HIIT";default:return t}}(t.type)}</span>
            <span class="text-sm fw-600">${function(t){try{const e=new Date(t),i=["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic"];return`${["Dom","Lun","Mar","Mer","Gio","Ven","Sab"][e.getDay()]} ${e.getDate()} ${i[e.getMonth()]}`}catch{return t}}(t.date)}</span>
          </div>
          <div class="row">
            <span class="tag">${t.source||"manuale"}</span>
            <span class="chip chip--accent">+${t.points} pt</span>
          </div>
        </div>
        <div class="row" style="gap:16px">
          <span class="mono text-sm">${ft("clock",13)} ${bt(t.duration_min)} min</span>
          <span class="mono text-sm">${ft("flame",13)} ${bt(t.calories)} kcal</span>
          ${t.distance_km?V`<span class="mono text-sm">${bt(t.distance_km,1)} km</span>`:""}
          ${t.volume_kg?V`<span class="mono text-sm">${bt(t.volume_kg)} kg vol</span>`:""}
        </div>
      </div>
    `}};Ct.styles=xt,t([gt({attribute:!1,hasChanged:()=>!0})],Ct.prototype,"card",void 0),t([ut()],Ct.prototype,"_filter",void 0),Ct=t([pt("monitor-workouts")],Ct);const St=["7G","30G","3M","6M","1A"];function At(t,e){const i=t.states[e];return i&&"unknown"!==i.state&&"unavailable"!==i.state?i.state:null}let Mt=class extends dt{constructor(){super(...arguments),this._range="30G"}render(){const t=this.card.hass,e=parseFloat(At(t,"sensor.withings_peso")||"0"),i=parseFloat(At(t,"sensor.withings_altezza")||"0"),s=parseFloat(At(t,"sensor.withings_obiettivo_di_peso")||"0"),r=parseFloat(At(t,"sensor.withings_passi_oggi")||"0"),a=parseFloat(At(t,"sensor.withings_calorie_attive_bruciate_oggi")||"0"),o=parseFloat(At(t,"sensor.withings_calorie_totali_bruciate_oggi")||"0"),n=parseFloat(At(t,"sensor.withings_distanza_percorsa_oggi")||"0"),l=parseFloat(At(t,"sensor.withings_attivita_intensa_oggi")||"0"),d=parseFloat(At(t,"sensor.withings_attivita_moderata_oggi")||"0"),c=parseFloat(At(t,"sensor.withings_attivita_leggera_oggi")||"0"),p=parseFloat(At(t,"sensor.withings_variazione_dell_elevazione_oggi")||"0"),h=i>0?e/(i*i):0,v=e-s,g=n/1e3,u=this.card.monitorState?.weight_history??[],m=function(t){switch(t){case"7G":return 7;case"30G":return 30;case"3M":return 90;case"6M":return 180;case"1A":return 365}}(this._range),x=new Date;x.setDate(x.getDate()-m);const f=x.toISOString().slice(0,10),_=u.filter(t=>t.date>=f),b=_.map(t=>t.weight),k=140,y=b.length>=2?yt(b,460,k):"";return V`
      <div class="col" style="gap:22px">

        <div>
          <h1 class="page-title">Composizione</h1>
          <p class="page-sub">${bt(e,1)} kg · obiettivo ${bt(s,0)} kg (${kt(v,"kg")})</p>
        </div>

        <div class="segmented">
          ${St.map(t=>V`
            <button data-active="${this._range===t}"
              @click=${()=>{this._range=t}}>
              ${t}
            </button>
          `)}
        </div>

        <!-- Weight chart -->
        <div class="card" style="padding:20px">
          <div class="card__header">
            <h3 class="card__title">Andamento peso</h3>
            <span class="chip chip--accent">${this._range}</span>
            ${b.length>=2?V`
              <span class="chip" style="margin-left:auto">
                ${kt(b[b.length-1]-b[0],"kg")}
              </span>
            `:""}
          </div>
          ${y?V`
            <svg class="sparkline" viewBox="0 0 ${460} ${k}" width="100%" height="200"
              preserveAspectRatio="none" style="display:block">
              <defs>
                <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.15"/>
                  <stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/>
                </linearGradient>
              </defs>
              <path d="${y} L${460},${k} L0,${k} Z" fill="url(#wg)"/>
              <polyline points="${y.replace(/[ML]/g,"")}" stroke="var(--accent)"/>
            </svg>
          `:V`
            <div style="height:200px;display:grid;place-items:center;color:var(--text-muted)">
              Nessun dato peso per questo periodo
            </div>
          `}
        </div>

        <!-- Peso & BMI -->
        <div class="grid-4" style="grid-template-columns:repeat(4, 1fr)">
          <div class="kpi">
            <div class="kpi__label" style="display:flex;align-items:center;gap:5px">
              ${ft("weight",12)} Peso
            </div>
            <div class="kpi__value" style="font-size:22px">${bt(e,1)} kg</div>
            <div class="kpi__delta">attuale</div>
          </div>
          <div class="kpi">
            <div class="kpi__label" style="display:flex;align-items:center;gap:5px">
              ${ft("target",12)} Obiettivo
            </div>
            <div class="kpi__value" style="font-size:22px">${bt(s,0)} kg</div>
            <div class="kpi__delta" style="color:${v>0?"var(--warn)":"var(--ok)"}">${kt(v,"kg")}</div>
          </div>
          <div class="kpi">
            <div class="kpi__label" style="display:flex;align-items:center;gap:5px">
              ${ft("chart",12)} BMI
            </div>
            <div class="kpi__value" style="font-size:22px">${bt(h,1)}</div>
            <div class="kpi__delta">${i>0?`${bt(100*i,0)} cm`:"—"}</div>
          </div>
          <div class="kpi">
            <div class="kpi__label" style="display:flex;align-items:center;gap:5px">
              ${ft("trending-down",12)} Da obiettivo
            </div>
            <div class="kpi__value" style="font-size:22px;color:${v>0?"var(--warn)":"var(--ok)"}">${bt(Math.abs(v),1)} kg</div>
            <div class="kpi__delta">${v>0?"da perdere":"raggiunto"}</div>
          </div>
        </div>

        <!-- Attività giornaliera -->
        <div>
          <h2 style="margin:0 0 12px;font-size:16px;font-weight:600">Attività oggi</h2>
          <div class="grid-4" style="grid-template-columns:repeat(4, 1fr)">
            <div class="kpi">
              <div class="kpi__label" style="display:flex;align-items:center;gap:5px">
                ${ft("run",12)} Passi
              </div>
              <div class="kpi__value" style="font-size:22px">${bt(r,0)}</div>
            </div>
            <div class="kpi">
              <div class="kpi__label" style="display:flex;align-items:center;gap:5px">
                ${ft("flame",12)} Cal. attive
              </div>
              <div class="kpi__value" style="font-size:22px">${bt(a,0)}</div>
              <div class="kpi__delta">${bt(o,0)} totali</div>
            </div>
            <div class="kpi">
              <div class="kpi__label" style="display:flex;align-items:center;gap:5px">
                ${ft("heart",12)} Distanza
              </div>
              <div class="kpi__value" style="font-size:22px">${bt(g,1)} km</div>
              <div class="kpi__delta">${bt(p,0)} m dislivello</div>
            </div>
            <div class="kpi">
              <div class="kpi__label" style="display:flex;align-items:center;gap:5px">
                ${ft("clock",12)} Attività
              </div>
              <div class="kpi__value" style="font-size:22px">${bt(l+d,0)} min</div>
              <div class="kpi__delta">${bt(c,0)} min leggera</div>
            </div>
          </div>
        </div>

        <!-- Salute cardiaca -->
        ${this._renderCardioHealth()}

      </div>
    `}_renderCardioHealth(){const t=this.card.monitorState,e=t?.resting_hr??[],i=t?.vo2max??[],s=t?.hrv_daily??[];if(0===e.length&&0===i.length&&0===s.length)return"";const r=200,a=40,o=e.slice(-30).map(t=>t.bpm),n=o.length>=2?yt(o,r,a):"",l=e.length>0?e[e.length-1].bpm:0,d=i.map(t=>t.value),c=d.length>=2?yt(d,r,a):"",p=i.length>0?i[i.length-1].value:0,h=s.slice(-30).map(t=>t.value_ms),v=h.length>=2?yt(h,r,a):"",g=s.length>0?s[s.length-1].value_ms:0;return V`
      <div>
        <h2 style="margin:0 0 12px;font-size:16px;font-weight:600">Salute cardiaca</h2>
        <div class="grid-2" style="grid-template-columns:1fr 1fr;gap:14px">

          ${n?V`
            <div class="card" style="padding:16px">
              <div class="sp-between" style="margin-bottom:8px">
                <span class="fw-600 text-sm">FC riposo</span>
                <span class="mono fw-700" style="font-size:20px;color:var(--danger)">${l} <span class="text-mute" style="font-size:12px">bpm</span></span>
              </div>
              <svg class="sparkline" width="100%" height="${a}" viewBox="0 0 ${r} ${a}" preserveAspectRatio="none">
                <polyline points="${n.replace(/[ML]/g,"")}" stroke="var(--danger)"/>
              </svg>
              <div class="text-mute text-xs" style="margin-top:4px">Ultimi 30 giorni</div>
            </div>
          `:""}

          ${c?V`
            <div class="card" style="padding:16px">
              <div class="sp-between" style="margin-bottom:8px">
                <span class="fw-600 text-sm">VO₂ Max</span>
                <span class="mono fw-700" style="font-size:20px;color:var(--ok)">${bt(p,1)} <span class="text-mute" style="font-size:12px">mL/min·kg</span></span>
              </div>
              <svg class="sparkline" width="100%" height="${a}" viewBox="0 0 ${r} ${a}" preserveAspectRatio="none">
                <polyline points="${c.replace(/[ML]/g,"")}" stroke="var(--ok)"/>
              </svg>
              <div class="text-mute text-xs" style="margin-top:4px">Trend storico</div>
            </div>
          `:""}

          ${v?V`
            <div class="card" style="padding:16px">
              <div class="sp-between" style="margin-bottom:8px">
                <span class="fw-600 text-sm">HRV</span>
                <span class="mono fw-700" style="font-size:20px;color:var(--accent)">${bt(g,0)} <span class="text-mute" style="font-size:12px">ms</span></span>
              </div>
              <svg class="sparkline" width="100%" height="${a}" viewBox="0 0 ${r} ${a}" preserveAspectRatio="none">
                <polyline points="${v.replace(/[ML]/g,"")}" stroke="var(--accent)"/>
              </svg>
              <div class="text-mute text-xs" style="margin-top:4px">Ultimi 30 giorni</div>
            </div>
          `:""}

        </div>
      </div>
    `}};Mt.styles=xt,t([gt({attribute:!1,hasChanged:()=>!0})],Mt.prototype,"card",void 0),t([ut()],Mt.prototype,"_range",void 0),Mt=t([pt("monitor-body")],Mt);const Et=["var(--bg-sunken)","color-mix(in srgb, var(--accent) 25%, var(--bg-sunken))","color-mix(in srgb, var(--accent) 50%, var(--bg-sunken))","color-mix(in srgb, var(--accent) 75%, var(--bg-sunken))","var(--accent)"];let Pt=class extends dt{render(){const t=this.card.monitorState,e=t?.workouts??[],i=t?.streak??0,s=t?.streak_best??0,r=new Date,a=`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}`,o=e.filter(t=>t.date?.startsWith(a)),n=o.length,l=o.reduce((t,e)=>t+(e.volume_kg||0),0),d=o.reduce((t,e)=>t+(e.distance_km||0),0),c=new Date(r.getFullYear(),r.getMonth()+1,0).getDate(),p=new Set(o.map(t=>{try{return new Date(t.date).getDate()}catch{return 0}})),h=Math.min(r.getDate(),c)-p.size,v=new Map;for(const t of o)try{const e=new Date(t.date).getDate();v.set(e,(v.get(e)||0)+1)}catch{}const g=r.toLocaleDateString("it-IT",{month:"long",year:"numeric"}),u=function(t,e,i){const s=new Date(t,e,1),r=new Date(t,e+1,0).getDate(),a=(s.getDay()+6)%7,o=(new Date).getDate(),n=(new Date).getMonth()===e&&(new Date).getFullYear()===t,l=[];let d=[];for(let t=0;t<a;t++)d.push({day:0,intensity:-1});for(let t=1;t<=r;t++){if(n&&t>o)d.push({day:t,intensity:-1});else{const e=i.get(t)||0,s=0===e?0:1===e?1:2===e?2:3===e?3:4;d.push({day:t,intensity:s})}7===d.length&&(l.push(d),d=[])}if(d.length>0){for(;d.length<7;)d.push({day:0,intensity:-1});l.push(d)}return l}(r.getFullYear(),r.getMonth(),v);return V`
      <div class="col" style="gap:22px">

        <div>
          <h1 class="page-title">Calendario</h1>
          <p class="page-sub">Streak: ${i} giorni · Best: ${s}</p>
        </div>

        <div class="card">
          <div class="row" style="gap:24px;flex-wrap:wrap;align-items:flex-start">
            <div class="ring-wrap" style="flex-shrink:0">
              ${function(t,e){const i=e>0?Math.min(1,t/e):0,s=2*Math.PI*40;return W`
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="${40}" fill="none" stroke="var(--bg-sunken)" stroke-width="8"/>
      <circle cx="50" cy="50" r="${40}" fill="none" stroke="var(--streak)" stroke-width="8"
        stroke-dasharray="${s*i} ${s}" stroke-linecap="round"
        transform="rotate(-90 50 50)"/>
      <text x="50" y="46" text-anchor="middle" fill="var(--streak)" font-family="var(--font-mono)"
        font-size="22" font-weight="700">${t}</text>
      <text x="50" y="62" text-anchor="middle" fill="var(--text-muted)" font-size="10"
        font-weight="500">giorni</text>
    </svg>`}(i,s)}
            </div>
            <div class="grid-2" style="flex:1;min-width:200px;gap:14px">
              <div>
                <div class="text-mute text-xs" style="margin-bottom:2px">Sessioni</div>
                <div class="mono fw-700" style="font-size:20px">${n}</div>
              </div>
              <div>
                <div class="text-mute text-xs" style="margin-bottom:2px">Riposi</div>
                <div class="mono fw-700" style="font-size:20px">${Math.max(0,h)}</div>
              </div>
              <div>
                <div class="text-mute text-xs" style="margin-bottom:2px">Volume</div>
                <div class="mono fw-700" style="font-size:20px">${bt(l)} kg</div>
              </div>
              <div>
                <div class="text-mute text-xs" style="margin-bottom:2px">Distanza</div>
                <div class="mono fw-700" style="font-size:20px">${bt(d,1)} km</div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card__header">
            <h3 class="card__title" style="text-transform:capitalize">${g}</h3>
          </div>
          <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px">
            ${["Lun","Mar","Mer","Gio","Ven","Sab","Dom"].map(t=>V`
              <div style="text-align:center;font-size:11px;color:var(--text-muted);font-weight:600;padding-bottom:6px">${t}</div>
            `)}
            ${u.flatMap(t=>t.map(t=>{if(0===t.day)return V`<div></div>`;const e=t.intensity>=0?Et[t.intensity]:"var(--bg-soft)",i=t.day===r.getDate();return V`
                <div class="heatmap__cell" style="
                  background:${e};
                  display:flex;align-items:center;justify-content:center;
                  font-family:var(--font-mono);font-size:11px;font-weight:500;
                  color:${t.intensity>=3?"white":"var(--text-soft)"};
                  ${i?"box-shadow:inset 0 0 0 2px var(--accent);border-color:var(--accent)":""}
                ">${t.day}</div>`}))}
          </div>
          <div class="row" style="margin-top:14px;gap:6px;justify-content:flex-end">
            <span class="text-xs text-mute">Meno</span>
            ${Et.map(t=>V`
              <div style="width:14px;height:14px;border-radius:3px;background:${t};border:1px solid var(--border-soft)"></div>
            `)}
            <span class="text-xs text-mute">Più</span>
          </div>
        </div>

      </div>
    `}};Pt.styles=xt,t([gt({attribute:!1,hasChanged:()=>!0})],Pt.prototype,"card",void 0),Pt=t([pt("monitor-calendar")],Pt);const Dt={pesi:"Pesi",corsa:"Corsa",cammino:"Cammino",hiit:"HIIT",nuoto:"Nuoto"},Ot={pesi:"var(--accent)",corsa:"var(--ok)",cammino:"var(--warn)",hiit:"var(--danger)",nuoto:"var(--xp)"};let Bt=class extends dt{render(){const t=this.card.monitorState,e=t?.workouts??[],i=t?.weight_history??[],s=function(t){const e=[];for(const[i,s]of Object.entries(t)){const t=i.split("_"),r=t[0],a=t.slice(1).join("_");let o=Dt[r]||r,n="";switch(a){case"duration_min":o+=" durata",n=" min";break;case"calories":o+=" calorie",n=" kcal";break;case"distance_km":o+=" distanza",n=" km";break;case"volume_kg":o+=" volume",n=" kg";break;default:o+=` ${a}`}e.push({label:o,iconName:"corsa"===r?"run":"cammino"===r?"heart":"hiit"===r?"flame":"dumbbell",value:`${bt(s,"distance_km"===a?1:0)}${n}`,key:i})}return e}(t?.personal_records??{});return V`
      <h1 class="page-title">Statistiche</h1>
      <p class="page-sub">Analisi, record personali, distribuzione</p>

      <div class="grid-2" style="margin-bottom:24px">
        ${this._renderCorrelation(e,i)}
        ${this._renderSummary(e)}
      </div>

      <h2 class="card__title" style="margin-bottom:14px">Record personali</h2>
      <div class="card" style="margin-bottom:24px">
        ${0===s.length?V`<div style="padding:16px;color:var(--text-muted);text-align:center">Nessun record registrato</div>`:s.map(t=>V`
            <div class="stat-row">
              <div class="stat-row__icon">${ft(t.iconName,17)}</div>
              <div class="stat-row__main">
                <div class="stat-row__name">${t.label}</div>
              </div>
              <span class="stat-row__value">${t.value}</span>
            </div>
          `)}
      </div>

      <h2 class="card__title" style="margin-bottom:14px">Distribuzione 30g</h2>
      <div class="card">
        ${this._renderDistribution(e)}
      </div>
    `}_renderCorrelation(t,e){const i=t.filter(t=>t.volume_kg&&t.volume_kg>0).slice(-20);if(i.length<3||e.length<3)return V`
        <div class="card">
          <div class="card__header">
            <h3 class="card__title">Correlazione</h3>
          </div>
          <div style="padding:20px;text-align:center;color:var(--text-muted)">
            Servono più dati per calcolare la correlazione peso/volume
          </div>
        </div>
      `;const s=30,r=140,a=[];for(const t of i){const i=t.date.slice(0,10),s=e.find(t=>t.date===i);s&&a.push([s.weight,t.volume_kg])}if(a.length<3)return V`
        <div class="card">
          <div class="card__header"><h3 class="card__title">Correlazione</h3></div>
          <div style="padding:20px;text-align:center;color:var(--text-muted)">Dati insufficienti</div>
        </div>
      `;const o=a.map(t=>t[0]),n=a.map(t=>t[1]),l=Math.min(...o),d=Math.max(...o),c=Math.min(...n),p=Math.max(...n),h=d-l||1,v=p-c||1,g=t=>s+(t-l)/h*220,u=t=>170-(t-c)/v*r,m=a.length,x=o.reduce((t,e)=>t+e,0)/m,f=n.reduce((t,e)=>t+e,0)/m;let _=0,b=0,k=0;for(const[t,e]of a)_+=(t-x)*(e-f),b+=(t-x)**2,k+=(e-f)**2;const y=b>0&&k>0?_/Math.sqrt(b*k):0,$=Math.abs(y)>.6?"FORTE":Math.abs(y)>.3?"MODERATA":"DEBOLE",w=b>0?_/b:0,z=f-w*x,C=g(l),S=u(w*l+z),A=g(d),M=u(w*d+z);return V`
      <div class="card">
        <div class="card__header">
          <div style="flex:1">
            <h3 class="card__title">Correlazione</h3>
            <div class="card__sub">Peso corporeo vs Volume allenamento</div>
          </div>
          <span class="chip chip--ok">${$}</span>
        </div>
        <div class="sp-between" style="margin-bottom:10px">
          <span class="text-sm text-soft">Coefficiente r</span>
          <span class="mono fw-700" style="font-size:22px;color:${y<0?"var(--ok)":"var(--warn)"}">${y.toFixed(2)}</span>
        </div>
        <svg viewBox="0 0 ${280} ${200}" width="100%" style="display:block;max-height:200px">
          <line x1="${s}" y1="${s}" x2="${s}" y2="${170}" stroke="var(--border)" stroke-width="1"/>
          <line x1="${s}" y1="${170}" x2="${250}" y2="${170}" stroke="var(--border)" stroke-width="1"/>
          <text x="${140}" y="${196}" text-anchor="middle" fill="var(--text-muted)" font-size="10" font-family="var(--font-mono)">Peso (kg)</text>
          <text x="8" y="${100}" text-anchor="middle" fill="var(--text-muted)" font-size="10" font-family="var(--font-mono)" transform="rotate(-90 8 ${100})">Volume (kg)</text>
          ${a.map(([t,e])=>W`
            <circle cx="${g(t)}" cy="${u(e)}" r="4" fill="var(--accent)" opacity="0.7"/>
          `)}
          <line x1="${C}" y1="${S}" x2="${A}" y2="${M}" stroke="var(--danger)" stroke-width="1.5" stroke-dasharray="5 3" opacity="0.6"/>
        </svg>
      </div>
    `}_renderSummary(t){const e=t.reduce((t,e)=>t+(e.calories||0),0),i=t.reduce((t,e)=>t+(e.duration_min||0),0),s=t.length>0?i/t.length:0,r=t.length>0?e/t.length:0;return V`
      <div class="card">
        <div class="card__header">
          <h3 class="card__title">Riepilogo</h3>
        </div>
        <div class="grid-2" style="gap:14px">
          <div>
            <div class="text-mute text-xs" style="margin-bottom:2px">Sessioni totali</div>
            <div class="mono fw-700" style="font-size:20px">${t.length}</div>
          </div>
          <div>
            <div class="text-mute text-xs" style="margin-bottom:2px">Calorie bruciate</div>
            <div class="mono fw-700" style="font-size:20px">${bt(e)}</div>
          </div>
          <div>
            <div class="text-mute text-xs" style="margin-bottom:2px">Durata media</div>
            <div class="mono fw-700" style="font-size:20px">${bt(s,0)} min</div>
          </div>
          <div>
            <div class="text-mute text-xs" style="margin-bottom:2px">Calorie medie</div>
            <div class="mono fw-700" style="font-size:20px">${bt(r,0)} kcal</div>
          </div>
        </div>
      </div>
    `}_renderDistribution(t){const e=new Date;e.setDate(e.getDate()-30);const i=e.toISOString().slice(0,10),s=t.filter(t=>t.date>=i),r=s.length||1,a={};for(const t of s)a[t.type]=(a[t.type]||0)+1;const o=Object.entries(a).sort((t,e)=>e[1]-t[1]);return 0===o.length?V`<div style="padding:16px;color:var(--text-muted);text-align:center">Nessun dato negli ultimi 30 giorni</div>`:o.map(([t,e])=>{const i=Math.round(e/r*100);return V`
        <div class="skill-bar" style="margin-bottom:8px">
          <span class="skill-bar__label">${Dt[t]||t}</span>
          <div class="skill-bar__track">
            <div class="skill-bar__fill" style="width:${i}%;background:${Ot[t]||"var(--accent)"}"></div>
          </div>
          <span class="skill-bar__value">${i}%</span>
        </div>
      `})}};Bt.styles=xt,t([gt({attribute:!1,hasChanged:()=>!0})],Bt.prototype,"card",void 0),Bt=t([pt("monitor-stats")],Bt);const jt=[{name:"Blu",chip:"chip--accent",hex:"#4a6cf7"},{name:"Verde",chip:"chip--ok",hex:"#2dbc6e"},{name:"Arancio",chip:"chip--warn",hex:"#d4930d"},{name:"Rosso",chip:"chip--danger",hex:"#d94040"},{name:"Viola",chip:"chip--xp",hex:"#9060e8"}],Nt=[{key:"pesi",label:"Pesi",points:40,iconName:"dumbbell",colors:jt,defaultColor:"chip--accent"},{key:"corsa",label:"Corsa",points:30,iconName:"run",colors:jt,defaultColor:"chip--ok"},{key:"cammino",label:"Cammino",points:20,iconName:"heart",colors:jt,defaultColor:"chip--warn"},{key:"hiit",label:"HIIT",points:35,iconName:"flame",colors:jt,defaultColor:"chip--danger"},{key:"nuoto",label:"Nuoto",points:35,iconName:"droplet",colors:jt,defaultColor:"chip--xp"}],Tt=[{key:"peso",label:"Peso",entity:"sensor.withings_peso"},{key:"altezza",label:"Altezza",entity:"sensor.withings_altezza"},{key:"obiettivo_peso",label:"Obiettivo peso",entity:"sensor.withings_obiettivo_di_peso"},{key:"passi",label:"Passi oggi",entity:"sensor.withings_passi_oggi"},{key:"calorie_attive",label:"Calorie attive",entity:"sensor.withings_calorie_attive_bruciate_oggi"},{key:"calorie_totali",label:"Calorie totali",entity:"sensor.withings_calorie_totali_bruciate_oggi"},{key:"distanza",label:"Distanza oggi",entity:"sensor.withings_distanza_percorsa_oggi"},{key:"attivita_intensa",label:"Attività intensa",entity:"sensor.withings_attivita_intensa_oggi"},{key:"attivita_moderata",label:"Attività moderata",entity:"sensor.withings_attivita_moderata_oggi"},{key:"attivita_leggera",label:"Attività leggera",entity:"sensor.withings_attivita_leggera_oggi"},{key:"tempo_attivita",label:"Tempo attività",entity:"sensor.withings_tempo_di_attivita_oggi"},{key:"elevazione",label:"Elevazione oggi",entity:"sensor.withings_variazione_dell_elevazione_oggi"}];let Ht=class extends dt{constructor(){super(...arguments),this._importStatus="idle",this._importMessage="",this._importFileName="",this._selectedFile=null}get hass(){return this.card.hass}render(){return V`
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
    `}_renderWorkoutTypes(){return V`
      <div>
        <h2 style="margin:0 0 12px;font-size:16px;font-weight:600">Tipi di allenamento</h2>
        <div class="card">
          <p class="text-soft text-sm" style="margin:0 0 14px">
            Ogni allenamento importato assegna punti in base al tipo di attività. Scegli il colore per ogni tipo.
          </p>
          <div class="col" style="gap:10px">
            ${Nt.map(t=>V`
                <div class="card card--ghost" style="padding:12px 14px">
                  <div class="sp-between" style="margin-bottom:8px">
                    <div style="display:flex;align-items:center;gap:8px">
                      <div class="stat-row__icon" style="width:28px;height:28px">
                        ${ft(t.iconName,14)}
                      </div>
                      <span class="fw-600">${t.label}</span>
                    </div>
                    <span class="mono fw-600">${t.points} pt</span>
                  </div>
                  <div style="display:flex;gap:6px;flex-wrap:wrap">
                    ${t.colors.map(e=>V`
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
    `}_renderWithings(){return V`
      <div>
        <h2 style="margin:0 0 12px;font-size:16px;font-weight:600">Withings</h2>
        <div class="card">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px">
            <div class="stat-row__icon" style="background:var(--accent-soft);color:var(--accent-ink)">
              ${ft("scale",17)}
            </div>
            <div>
              <div class="fw-600">Sensori collegati</div>
              <p class="text-soft text-sm" style="margin:2px 0 0">
                Entità importate dall'integrazione Withings.
              </p>
            </div>
          </div>
          <div class="col" style="gap:4px">
            ${Tt.map(t=>{const e=this.hass?.states?.[t.entity],i=e?.state,s=e?.attributes?.unit_of_measurement||"",r=i&&"unknown"!==i&&"unavailable"!==i;return V`
                  <div class="sp-between" style="align-items:center;padding:6px 0;border-bottom:1px solid var(--border)">
                    <span class="text-sm fw-500" style="min-width:130px">${t.label}</span>
                    <div style="display:flex;align-items:center;gap:6px">
                      <span class="mono text-sm">${r?`${parseFloat(i).toLocaleString("it-IT")} ${s}`:"—"}</span>
                      <span class="chip__dot" style="width:6px;height:6px;border-radius:50%;background:${r?"var(--ok)":"var(--text-muted)"}"></span>
                    </div>
                  </div>
                `})}
          </div>
        </div>
      </div>
    `}_renderImport(){const t="loading"===this._importStatus;return V`
      <div>
        <h2 style="margin:0 0 12px;font-size:16px;font-weight:600">Importazione Apple Health</h2>
        <div class="card">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px">
            <div class="stat-row__icon" style="background:var(--accent-soft);color:var(--accent-ink)">
              ${ft("heart",17)}
            </div>
            <div>
              <div class="fw-600">Importa da file</div>
              <p class="text-soft text-sm" style="margin:2px 0 0">
                Esporta i dati da Apple Health (.xml o .zip) e caricali direttamente dal browser.
              </p>
            </div>
          </div>
          <div style="display:flex;gap:8px;align-items:center">
            <label class="btn btn--ghost" style="cursor:pointer;flex:1;text-align:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
              ${ft("upload",14)}
              <span style="margin-left:6px">${this._importFileName||"Scegli file .zip o .xml"}</span>
              <input type="file" accept=".zip,.xml" style="display:none"
                @change=${this._handleFileSelect} />
            </label>
            <button class="btn btn--primary" style="white-space:nowrap;min-width:90px"
              ?disabled=${t||!this._importFileName}
              @click=${this._handleImport}>
              ${t?"Importo...":"Importa"}
            </button>
          </div>
          ${this._importMessage?V`
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
    `}_handleFileSelect(t){const e=t.target,i=e.files?.[0];i&&(this._selectedFile=i,this._importFileName=i.name,this._importStatus="idle",this._importMessage="")}async _handleImport(){if(this._selectedFile){this._importStatus="loading",this._importMessage="";try{const t=new FormData;t.append("file",this._selectedFile);const e=this.hass.auth?.data?.access_token,i={};e&&(i.Authorization=`Bearer ${e}`);const s=await fetch("/api/monitor_allenamenti/upload",{method:"POST",headers:i,body:t}),r=await s.json();if(!s.ok)throw new Error(r.error||`HTTP ${s.status}`);this._importStatus="done";const a=[];r.workouts>0&&a.push(`${r.workouts} allenamenti`),r.activity_summaries>0&&a.push(`${r.activity_summaries} giorni attività`),r.sleep_history>0&&a.push(`${r.sleep_history} notti sonno`),r.resting_hr>0&&a.push(`${r.resting_hr} FC riposo`),r.vo2max>0&&a.push(`${r.vo2max} VO2Max`),r.hrv_daily>0&&a.push(`${r.hrv_daily} HRV`),this._importMessage=a.length>0?`Importati: ${a.join(", ")}.`:"Nessun dato nuovo (tutti duplicati).",this._selectedFile=null,this._importFileName=""}catch(t){this._importStatus="error",this._importMessage=t?.message||"Errore durante l'importazione."}}}};Ht.styles=xt,t([gt({attribute:!1,hasChanged:()=>!0})],Ht.prototype,"card",void 0),t([ut()],Ht.prototype,"_importStatus",void 0),t([ut()],Ht.prototype,"_importMessage",void 0),t([ut()],Ht.prototype,"_importFileName",void 0),Ht=t([pt("monitor-settings")],Ht);const It=[{value:"overview",label:"Panoramica"},{value:"workouts",label:"Allenamenti"},{value:"body",label:"Composizione"},{value:"calendar",label:"Calendario"},{value:"stats",label:"Statistiche"},{value:"settings",label:"Impostazioni"}];let Ut=class extends dt{setConfig(t){this._config=t}_fire(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}render(){return this._config?V`
      <div class="field">
        <label class="field__label">Schermata iniziale</label>
        <select
          .value=${this._config.default_screen||"overview"}
          @change=${t=>{this._fire({...this._config,default_screen:t.target.value})}}>
          ${It.map(t=>V`<option value=${t.value}>${t.label}</option>`)}
        </select>
      </div>

      <div class="field">
        <div class="row">
          <label class="switch">
            <input type="checkbox"
              .checked=${!!this._config.collapse_sidebar}
              @change=${t=>{this._fire({...this._config,collapse_sidebar:t.target.checked})}} />
            <span class="switch__track"></span>
            <span class="switch__thumb"></span>
          </label>
          <span>Sidebar compressa</span>
        </div>
        <div class="hint">Mostra solo le icone nella barra laterale</div>
      </div>

      <div class="field">
        <label class="field__label">Soglia mobile (px)</label>
        <input type="number"
          .value=${String(this._config.mobile_threshold??700)}
          @change=${t=>{this._fire({...this._config,mobile_threshold:parseInt(t.target.value,10)||700})}} />
        <div class="hint">Sotto questa larghezza la sidebar diventa un drawer</div>
      </div>
    `:V``}};Ut.styles=o`
    :host {
      display: block;
      font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 14px;
      color: var(--primary-text-color);
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 16px;
    }
    .field__label {
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    select, input {
      width: 100%;
      padding: 9px 12px;
      border-radius: 10px;
      border: 1px solid var(--divider-color);
      background: var(--ha-card-background, var(--card-background-color, #fff));
      color: var(--primary-text-color);
      font: inherit;
      font-size: 13px;
      outline: none;
      transition: border-color 120ms;
    }
    select:focus, input:focus {
      border-color: var(--accent-color, #4a6cf7);
    }
    .row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .switch {
      position: relative;
      display: inline-block;
      width: 36px;
      height: 20px;
      cursor: pointer;
    }
    .switch input { display: none; }
    .switch__track {
      position: absolute; inset: 0;
      background: var(--divider-color);
      border-radius: 999px;
      transition: background 150ms;
    }
    .switch__thumb {
      position: absolute; top: 2px; left: 2px;
      width: 16px; height: 16px;
      background: white; border-radius: 50%;
      transition: transform 180ms cubic-bezier(.2,.8,.2,1);
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }
    .switch input:checked ~ .switch__track {
      background: var(--accent-color, #4a6cf7);
    }
    .switch input:checked ~ .switch__thumb {
      transform: translateX(16px);
    }
    .hint {
      font-size: 11.5px;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }
  `,t([gt({attribute:!1})],Ut.prototype,"hass",void 0),t([gt({attribute:!1})],Ut.prototype,"_config",void 0),Ut=t([pt("monitor-allenamenti-card-editor")],Ut);const Rt={overview:["Panoramica","monitor / panoramica"],workouts:["Allenamenti","monitor / allenamenti"],body:["Composizione","monitor / composizione"],calendar:["Calendario","monitor / calendario"],stats:["Statistiche","monitor / statistiche"],settings:["Impostazioni","monitor / impostazioni"]};let Ft=class extends dt{constructor(){super(...arguments),this._screen="overview",this._mobile=!1,this._drawerOpen=!1,this._desktopCollapsed=!1,this.monitorState=null,this._screenInitialised=!1,this._stateFetched=!1}setConfig(t){this.config=t||{},t?.default_screen&&!this._screenInitialised&&(this._screen=t.default_screen,this._screenInitialised=!0),void 0!==t?.collapse_sidebar&&(this._desktopCollapsed=!!t.collapse_sidebar),this.isConnected&&this._checkPanelMode()}static getConfigElement(){return document.createElement("monitor-allenamenti-card-editor")}static getStubConfig(){return{type:"custom:monitor-allenamenti-card"}}navigate(t){this._screen=t,this._mobile&&(this._drawerOpen=!1)}_checkPanelMode(){if(!this.isConnected)return;const t=this.config?.panel_mode;let e;if(!0===t)e=!0;else if(!1===t)e=!1;else{const t=this.getBoundingClientRect();e=t.top<30&&t.height>200}this.hasAttribute("panel-mode")!==e&&this.toggleAttribute("panel-mode",e);const i=this.config?.panel_offset;"number"==typeof i&&i>=0?this.style.setProperty("--monitor-panel-offset",`${i}px`):this.style.removeProperty("--monitor-panel-offset")}connectedCallback(){super.connectedCallback(),this._checkPanelMode(),setTimeout(()=>this._checkPanelMode(),50),setTimeout(()=>this._checkPanelMode(),250),this._resizeObserver=new ResizeObserver(t=>{this._checkPanelMode();for(const e of t){const t=this.config?.mobile_threshold??700;this._mobile=t>0&&e.contentRect.width<t}}),this._resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect(),this._eventUnsub?.(),this._eventUnsub=void 0}firstUpdated(){this._checkPanelMode(),this._fetchState()}async _fetchState(){if(this.hass?.callWS)try{this.monitorState=await this.hass.callWS({type:"monitor_allenamenti/get_state"}),this._stateFetched=!0}catch{this._stateFetched||(this.monitorState=null)}}updated(t){super.updated(t),t.has("hass")&&!this._stateFetched&&this._fetchState(),t.has("hass")&&this.hass&&!this._eventUnsub&&this.hass.connection.subscribeEvents(()=>this._fetchState(),"monitor_allenamenti.workout_logged").then(t=>{this._eventUnsub=t})}render(){const[t,e]=Rt[this._screen]||Rt.overview,i=this._mobile&&this._drawerOpen;let s;s=this._mobile?i?"drawer":"mini":this._desktopCollapsed?"mini":"full";const r=_t(this.hass,"punti")||"0",a=_t(this.hass,"streak")||"0";return V`
      <div class="app">
        ${this._renderSidebar(s)}
        ${i?V`<div class="sidebar-backdrop" @click=${()=>{this._drawerOpen=!1}}></div>`:G}
        <main class="content">
          ${this._renderTopbar(t,e,r,a)}
          <div class="content__inner">
            ${this._renderScreen()}
          </div>
        </main>
      </div>
    `}_renderSidebar(t){const e="mini"===t;return V`
      <aside class="sidebar" data-mode="${t}">
        <button class="sidebar__hamburger"
          @click=${()=>{this._mobile?this._drawerOpen=!this._drawerOpen:this._desktopCollapsed=!this._desktopCollapsed}}>
          ${ft(e?"menu":"close",18)}
        </button>
        <div class="sidebar__brand">
          <div class="sidebar__brand-mark">${ft("dumbbell",16)}</div>
          ${e?G:V`<div>
                <div class="sidebar__brand-name">Monitor</div>
                <div class="sidebar__brand-sub">v${"1.4.0"}</div>
              </div>`}
        </div>
        ${e?G:V`<div class="nav-section">Tracking</div>`}
        ${[{key:"overview",label:"Panoramica",iconName:"dashboard"},{key:"workouts",label:"Allenamenti",iconName:"dumbbell"},{key:"body",label:"Composizione",iconName:"scale"},{key:"calendar",label:"Calendario",iconName:"calendar"},{key:"stats",label:"Statistiche",iconName:"chart"}].map(t=>V`
            <button class="nav-item" data-active="${this._screen===t.key}"
              title="${e?t.label:""}" @click=${()=>this.navigate(t.key)}>
              ${ft(t.iconName,16)} ${e?G:V`<span>${t.label}</span>`}
            </button>
          `)}
        <div class="sidebar__footer">
          <button class="nav-item" data-active="${"settings"===this._screen}"
            title="${e?"Impostazioni":""}" @click=${()=>this.navigate("settings")}>
            ${ft("settings",16)} ${e?G:V`<span>Impostazioni</span>`}
          </button>
        </div>
      </aside>
    `}_renderTopbar(t,e,i,s){return V`
      <div class="topbar">
        <div>
          <div class="topbar__title">${t}</div>
          <div class="topbar__crumbs">${e}</div>
        </div>
        <div class="topbar__spacer"></div>
        <div class="topbar__pill">
          ${ft("trending-up",13)}
          <span>${i} pt</span>
        </div>
        <div class="topbar__pill">
          <span class="topbar__dot"></span>
          <span>Streak ${s}g</span>
        </div>
      </div>
    `}_renderScreen(){switch(this._screen){case"overview":default:return V`<monitor-overview .card=${this}></monitor-overview>`;case"workouts":return V`<monitor-workouts .card=${this}></monitor-workouts>`;case"body":return V`<monitor-body .card=${this}></monitor-body>`;case"calendar":return V`<monitor-calendar .card=${this}></monitor-calendar>`;case"stats":return V`<monitor-stats .card=${this}></monitor-stats>`;case"settings":return V`<monitor-settings .card=${this}></monitor-settings>`}}};Ft.styles=[mt,xt],t([gt({attribute:!1})],Ft.prototype,"hass",void 0),t([gt({attribute:!1})],Ft.prototype,"config",void 0),t([ut()],Ft.prototype,"_screen",void 0),t([ut()],Ft.prototype,"_mobile",void 0),t([ut()],Ft.prototype,"_drawerOpen",void 0),t([ut()],Ft.prototype,"_desktopCollapsed",void 0),t([ut()],Ft.prototype,"monitorState",void 0),Ft=t([pt("monitor-allenamenti-card")],Ft),window.customCards=window.customCards||[],window.customCards.push({type:"monitor-allenamenti-card",name:"Monitor Allenamenti",description:"Tracker peso e allenamenti con statistiche",preview:!0});export{Ft as MonitorAllenamentiCard};
