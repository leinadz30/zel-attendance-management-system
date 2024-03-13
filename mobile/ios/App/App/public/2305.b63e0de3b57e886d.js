"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[2305],{2305:(w,u,c)=>{c.r(u),c.d(u,{super_tab:()=>p,super_tabs:()=>m,super_tabs_container:()=>x});var o=c(5861),s=c(2372),a=c(8333);let p=(()=>{class h{constructor(e){(0,s.r)(this,e)}componentDidLoad(){this.checkIonContent()}componentDidUpdate(){this.checkIonContent()}checkIonContent(){if("boolean"!=typeof this.noScroll){const e=this.el.querySelector("ion-content");e&&e.parentElement===this.el&&(this.noScroll=!0)}}getRootScrollableEl(){var e=this;return(0,o.Z)(function*(){if(!e.noScroll&&e.el.scrollHeight>e.el.clientHeight)return e.el;const t=e.el.querySelector("ion-content");return t?t.getScrollElement():e.noScroll?null:e.el})()}render(){return(0,s.h)("slot",null)}get el(){return(0,s.g)(this)}}return h.style=":host{height:var(--super-tab-height, 100%);position:relative;display:block;overflow-x:hidden;overflow-y:auto;contain:size style;z-index:1;-ms-flex-negative:0;flex-shrink:0;-ms-flex-positive:0;flex-grow:0;width:var(--super-tab-width, 100vw);-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0);-webkit-box-sizing:border-box;box-sizing:border-box;-ms-flex-order:-1;order:-1;-webkit-user-select:none;-webkit-touch-callout:none;-webkit-text-size-adjust:none;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);-webkit-font-smoothing:antialiased}:host[noScroll]{overflow-y:hidden}ion-nav,ion-content{height:100%;max-height:100%;position:absolute}ion-nav>.ion-page,ion-content>.ion-page{position:absolute}",h})(),m=(()=>{class h{constructor(e){(0,s.r)(this,e),this.activeTabIndex=0,this._config=a.D,this.initAttempts=0,this.initPromise=new Promise(t=>{this.initPromiseResolve=t}),this.tabChange=(0,s.c)(this,"tabChange",7)}setConfig(e){var t=this;return(0,o.Z)(function*(){t._config=Object.assign(Object.assign({},a.D),e)})()}propagateConfig(){this.container&&(this.container.config=this._config),this.toolbar&&(this.toolbar.config=this._config)}selectTab(e,t=!0,i=!0){var n=this;return(0,o.Z)(function*(){n.debug("selectTab",e,t),yield n.initPromise;const r=n.activeTabIndex;n.container&&(yield n.container.setActiveTabIndex(e,!0,t)),n.toolbar&&(yield n.toolbar.setActiveTab(e,!0,t)),i&&n.emitTabChangeEvent(e,r),n.activeTabIndex=r})()}onConfigChange(e){var t=this;return(0,o.Z)(function*(){yield t.setConfig(e)})()}onWindowResize(){this.debug("onWindowResize"),this.toolbar&&this.toolbar.setSelectedTab(this.activeTabIndex),this.container.reindexTabs()}componentWillLoad(){var e=this;return(0,o.Z)(function*(){e.config&&(yield e.setConfig(e.config))})()}componentDidLoad(){this.debug("componentDidLoad"),this.indexChildren(),this.container&&this.container.setActiveTabIndex(this.activeTabIndex,!0,!1),this.toolbar&&this.toolbar.setActiveTab(this.activeTabIndex,!0,!1),this.el.shadowRoot.addEventListener("slotchange",this.onSlotchange.bind(this)),requestAnimationFrame(()=>{this.initComponent()})}initComponent(){if(!this.container){if(++this.initAttempts<=1e3)return void requestAnimationFrame(()=>{this.initComponent()});this.debug("container still doesn't exists after 1000 frames")}this.container&&this.container.setActiveTabIndex(this.activeTabIndex,!0,!1),this.toolbar&&this.toolbar.setActiveTab(this.activeTabIndex,!0),this.propagateConfig(),this.setupEventListeners(),this.initPromiseResolve()}setupEventListeners(){var e=this;return(0,o.Z)(function*(){e.container?(yield e.container.componentOnReady(),e.el.addEventListener("selectedTabIndexChange",e.onContainerSelectedTabChange.bind(e)),e.el.addEventListener("activeTabIndexChange",e.onContainerActiveTabChange.bind(e))):e.debug("setupEventListeners: container does not exist"),e.toolbar?(yield e.toolbar.componentOnReady(),e.el.addEventListener("buttonClick",e.onToolbarButtonClick.bind(e))):e.debug("setupEventListeners: toolbar does not exist")})()}onContainerSelectedTabChange(e){var t=this;return(0,o.Z)(function*(){t.debug("onContainerSelectedTabChange called with: ",e),t.toolbar&&(yield t.toolbar.setSelectedTab(e.detail))})()}emitTabChangeEvent(e,t){"number"!=typeof e||e<0||(("number"!=typeof t||t<0)&&(t=this.activeTabIndex),this.tabChange.emit({changed:e!==t,index:e}))}onContainerActiveTabChange(e){this.debug("onContainerActiveTabChange",e);const t=e.detail;this.emitTabChangeEvent(t),this.activeTabIndex=t,this.toolbar&&this.toolbar.setActiveTab(t,!0,!0)}onToolbarButtonClick(e){this.debug("onToolbarButtonClick",e);const{index:t}=e.detail;this.container&&this.container.setActiveTabIndex(t,!0,!0),this.emitTabChangeEvent(t),this.activeTabIndex=t}indexChildren(){this.debug("indexChildren");const e=this.el.querySelector("super-tabs-container"),t=this.el.querySelector("super-tabs-toolbar");e&&this.container!==e&&(this.container=e),t&&this.toolbar!==t&&(this.toolbar=t),this.propagateConfig()}onSlotchange(){var e=this;return(0,o.Z)(function*(){e.indexChildren(),e.selectTab(e.activeTabIndex,!0,!1)})()}debug(...e){(0,a.d)(this._config,"tabs",e)}render(){return(0,s.h)(s.H,null,(0,s.h)("slot",{name:"top"}),(0,s.h)("slot",null),(0,s.h)("slot",{name:"bottom"}))}get el(){return(0,s.g)(this)}static get watchers(){return{config:["onConfigChange"]}}}return h.style=":host{height:100%;max-height:100%;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;overflow:hidden;z-index:1;position:relative;contain:layout size style;-ms-flex-order:-1;order:-1;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-touch-callout:none;-webkit-text-size-adjust:none;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);-webkit-font-smoothing:antialiased;-ms-touch-action:none;touch-action:none;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;padding:0}",h})(),x=(()=>{class h{constructor(e){(0,s.r)(this,e),this.swipeEnabled=!0,this.autoScrollTop=!1,this.tabs=[],this.isDragging=!1,this.leftThreshold=0,this.rightThreshold=0,this.scrollWidth=0,this.width=0,this.activeTabIndexChange=(0,s.c)(this,"activeTabIndexChange",7),this.selectedTabIndexChange=(0,s.c)(this,"selectedTabIndexChange",7),this.queue=(0,s.d)(this,"queue")}componentDidLoad(){var e=this;return(0,o.Z)(function*(){e.debug("componentDidLoad"),e.updateWidth(),yield e.indexTabs(),e.slot=e.el.shadowRoot.querySelector("slot"),e.slot.addEventListener("slotchange",e.onSlotChange.bind(e))})()}onSlotChange(){var e=this;return(0,o.Z)(function*(){e.debug("onSlotChange",e.tabs.length),e.updateWidth(),e.indexTabs()})()}componentDidRender(){var e=this;return(0,o.Z)(function*(){e.updateWidth()})()}reindexTabs(){var e=this;return(0,o.Z)(function*(){e.updateWidth(),yield e.indexTabs()})()}moveContainerByIndex(e,t){const i=this.indexToPosition(e);return 0===i&&e>0?Promise.resolve():this.moveContainer(i,t)}moveContainer(e,t){return t?(0,a.s)(this.el,e,0,this.config.nativeSmoothScroll,this.config.transitionDuration):this.el.scroll(e,0),Promise.resolve()}setActiveTabIndex(e,t=!0,i=!0){var n=this;return(0,o.Z)(function*(){if(n.debug("setActiveTabIndex",e),n._activeTabIndex===e){if(!n.autoScrollTop)return;n.scrollToTop()}t&&n.moveContainerByIndex(e,i),n.updateActiveTabIndex(e,!1)})()}scrollToTop(){var e=this;return(0,o.Z)(function*(){if(void 0===e._activeTabIndex||void 0===e.tabs)return void e.debug("scrollToTop","activeTabIndex or tabs was undefined",e._activeTabIndex,e.tabs);const t=e.tabs[e._activeTabIndex];if(!t)return void e.debug("Current active tab was undefined in scrollToTop");const i=yield t.getRootScrollableEl();i?(0,a.s)(i,0,0,e.config.nativeSmoothScroll,e.config.transitionDuration):e.debug("scrollToTop","couldnt find a scrollable element")})()}updateActiveTabIndex(e,t=!0){this.debug("updateActiveTabIndex",e,t,this._activeTabIndex),this._activeTabIndex=e,t&&this.activeTabIndexChange.emit(this._activeTabIndex)}updateSelectedTabIndex(e){e!==this._selectedTabIndex&&(this._selectedTabIndex=e,this.selectedTabIndexChange.emit(this._selectedTabIndex))}onTouchStart(e){var t=this;return(0,o.Z)(function*(){if(!t.swipeEnabled)return;if(t.config.avoidElements){let r=!1,l=e.target;if(l)do{if("function"==typeof l.getAttribute&&l.getAttribute("avoid-super-tabs"))return;l=l.parentElement}while(l&&!r)}const i=(0,a.p)(e);t.updateWidth(),i.x<t.leftThreshold||i.x>t.width-t.rightThreshold||(t.config.shortSwipeDuration>0&&(t.initialTimestamp=(0,a.a)()),t.initialCoords=i,t.lastPosX=i.x)})()}onClick(e){var t=this;return(0,o.Z)(function*(){t.isDragging&&(e.stopImmediatePropagation(),e.preventDefault())})()}onTouchMove(e){var t=this;return(0,o.Z)(function*(){if(!t.swipeEnabled||!t.initialCoords||"number"!=typeof t.lastPosX)return;const i=(0,a.p)(e);if(!t.isDragging){if(!(0,a.c)(i,t.initialCoords,t.config))return void(Math.abs(i.y-t.initialCoords.y)>100&&(t.initialCoords=void 0,t.lastPosX=void 0));t.isDragging=!0}t.config.allowElementScroll||e.stopImmediatePropagation();const n=t.lastPosX-i.x;if(0===n)return;const r=Math.max(0,Math.min(t.scrollWidth-t.width,t.el.scrollLeft+n));if(Math.floor(r)===Math.floor(t.el.scrollLeft))return;const l=Math.round(100*t.positionToIndex(r))/100;t.updateSelectedTabIndex(l),t.lastPosX=i.x,t.el.scroll(r,0)})()}onTouchEnd(e){var t=this;return(0,o.Z)(function*(){if(!t.swipeEnabled||!t.isDragging)return;const i=(0,a.p)(e),n=(0,a.a)()-t.initialTimestamp,r=t.config.shortSwipeDuration>0&&n<=t.config.shortSwipeDuration,l=i.x-t.initialCoords.x;let d=t.calcSelectedTab();const C=Math.round(d);r&&C===t._activeTabIndex&&(d+=l>0?-1:1),d=t.normalizeSelectedTab(d),t.updateActiveTabIndex(d),t.moveContainerByIndex(d,!0),t.isDragging=!1,t.initialCoords=void 0,t.lastPosX=void 0})()}updateWidth(){const e=this.el.getBoundingClientRect();this.width=Math.round(1e4*e.width)/1e4}indexTabs(){var e=this;return(0,o.Z)(function*(){if(0===e.width)return void requestAnimationFrame(()=>{e.updateWidth(),e.indexTabs()});const t=Array.from(e.el.querySelectorAll("super-tab"));if(e.scrollWidth=e.width*t.length,e.debug("indexTab",e.scrollWidth,e.width),yield Promise.all(t.map(i=>i.componentOnReady())),e.tabs=t,e.ready&&"number"==typeof e._activeTabIndex&&e.moveContainerByIndex(e._activeTabIndex,!0),e.config)switch(e.config.sideMenu){case"both":e.rightThreshold=e.leftThreshold=e.config.sideMenuThreshold||0;break;case"left":e.leftThreshold=e.config.sideMenuThreshold||0;break;case"right":e.rightThreshold=e.config.sideMenuThreshold||0}void 0!==e._activeTabIndex&&e.moveContainerByIndex(e._activeTabIndex,!1).then(()=>{e.ready=!0})})()}calcSelectedTab(){const e=Math.max(0,Math.min(this.scrollWidth-this.width,this.el.scrollLeft));return this.positionToIndex(e)}positionToIndex(e){return e/this.width}indexToPosition(e){return Math.round(e*this.width*1e4)/1e4}normalizeSelectedTab(e){const t=Math.max(0,Math.min(this.scrollWidth-this.width,this.indexToPosition(e)));return Math.round(t/this.width)}debug(...e){(0,a.d)(this.config,"container",e)}render(){return(0,s.h)("slot",null)}get el(){return(0,s.g)(this)}}return h.style=":host{display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap;min-width:100%;-ms-flex:1 1 auto;flex:1 1 auto;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;width:var(--super-tab-width, 100vw);height:var(--super-tab-height, 100%);overflow:hidden;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0);-ms-touch-action:pan-y;touch-action:pan-y;-moz-user-select:none;-ms-user-select:none;user-select:none;will-change:scroll-position;-ms-flex-order:-1;order:-1;-webkit-user-select:none;-webkit-touch-callout:none;-webkit-text-size-adjust:none;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);-webkit-font-smoothing:antialiased}",h})()}}]);