"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[4477],{4477:(o,i,t)=>{t.r(i),t.d(i,{AppWeb:()=>u});var n=t(5861),s=t(7423);class u extends s.Uw{constructor(){super(),this.handleVisibilityChange=()=>{const e={isActive:!0!==document.hidden};this.notifyListeners("appStateChange",e),document.hidden?this.notifyListeners("pause",null):this.notifyListeners("resume",null)},document.addEventListener("visibilitychange",this.handleVisibilityChange,!1)}exitApp(){throw this.unimplemented("Not implemented on web.")}getInfo(){var e=this;return(0,n.Z)(function*(){throw e.unimplemented("Not implemented on web.")})()}getLaunchUrl(){return(0,n.Z)(function*(){return{url:""}})()}getState(){return(0,n.Z)(function*(){return{isActive:!0!==document.hidden}})()}minimizeApp(){var e=this;return(0,n.Z)(function*(){throw e.unimplemented("Not implemented on web.")})()}}}}]);