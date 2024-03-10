"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9270],{9270:(_,m,t)=>{t.r(m),t.d(m,{SearchSchoolPageModule:()=>C});var g=t(6895),a=t(4006),i=t(603),l=t(9773),f=t(5861),u=t(13),P=t(5778),e=t(4650),M=t(3013),r=t(4396),c=t(7956),d=t(263),O=t(7559),y=t(3746),I=t(7392),x=t(9549),E=t(4144);function b(h,o){1&h&&e._UZ(0,"div",15)}function U(h,o){if(1&h){const n=e.EpF();e.TgZ(0,"mat-icon",16),e.NdJ("click",function(){e.CHM(n);const p=e.oxw();return e.KtG(p.searchKey.setValue(""))}),e._uU(1," close "),e.qZA()}}function A(h,o){if(1&h&&(e.TgZ(0,"ion-item",17)(1,"ion-label")(2,"h2",18)(3,"strong"),e._uU(4),e.qZA()(),e.TgZ(5,"h2",19),e._uU(6),e.qZA()(),e._UZ(7,"ion-radio",20),e.qZA()),2&h){const n=o.$implicit;e.xp6(4),e.Oqu(n.schoolName),e.xp6(2),e.Oqu(n.schoolAddress),e.xp6(1),e.Q6J("value",n.schoolId)}}function T(h,o){if(1&h){const n=e.EpF();e.TgZ(0,"ion-item",21),e.NdJ("click",function(){e.CHM(n);const p=e.oxw();return e.KtG(p.loadMore())}),e.TgZ(1,"ion-label")(2,"h2"),e._uU(3,"Load More"),e.qZA()()()}}function B(h,o){if(1&h){const n=e.EpF();e.TgZ(0,"ion-footer")(1,"ion-toolbar",22)(2,"ion-button",23),e.NdJ("click",function(){e.CHM(n);const p=e.oxw();return e.KtG(p.select())}),e._uU(3," Select "),e.qZA()()()}}class S{parentsService;schoolsService;formBuilder;alertController;pageLoaderService;authService;modalCtrl;animationService;storageService;modal;searchKey=new a.NI(null);selectedSchoolId=new a.NI(null,[a.kI.required]);currentUser;selectedSchool;activeAditionalBackdrop=!1;isSubmitting=!1;isLoading=!1;isSelectionLoading=!0;canFocus=!0;schools=[];pageIndex=0;pageSize=10;total=0;order={schoolCode:"DESC"};constructor(o,n,s,p,Z,L,J,Y,D){this.parentsService=o,this.schoolsService=n,this.formBuilder=s,this.alertController=p,this.pageLoaderService=Z,this.authService=L,this.modalCtrl=J,this.animationService=Y,this.storageService=D,this.currentUser=this.storageService.getLoginUser()}get isAuthenticated(){const o=this.storageService.getLoginUser();return o&&o?.parentCode&&o?.user&&o?.user?.userId}ngOnInit(){(!this.selectedSchool||!this.selectedSchool?.schoolId||""===this.selectedSchool?.schoolId)&&(this.isSelectionLoading=!1),this.loadSchools(),this.searchKey.valueChanges.pipe((0,u.b)(1e3),(0,P.x)()).subscribe(o=>{this.loadSchools()}),this.selectedSchool&&this.selectedSchool?.schoolId&&""!==this.selectedSchool?.schoolId&&this.selectedSchoolId.valueChanges.pipe((0,u.b)(100),(0,P.x)()).subscribe(o=>{this.canFocus&&document.querySelector("ion-item.item-radio-checked")&&(document.querySelector("ion-item.item-radio-checked").scrollIntoView(!1),this.isSelectionLoading=!1,this.canFocus=!1)})}loadSchools(){this.isLoading=!0,this.schoolsService.getByAdvanceSearch({order:this.order,columnDef:[{apiNotation:"schoolName",filter:this.searchKey.value??""}],pageIndex:this.pageIndex,pageSize:this.pageSize}).subscribe(o=>{this.isLoading=!1,this.schools=this.pageIndex>0?[...this.schools,...o.data.results]:o.data.results,this.total=o.data.total,console.log(this.schools),this.selectedSchool&&this.selectedSchool.schoolId&&(this.selectedSchoolId.setValue(this.selectedSchool.schoolId),this.schools.some(n=>n.schoolId===this.selectedSchool.schoolId)||(this.schools=[this.selectedSchool,...this.schools]))})}loadMore(){this.pageIndex=this.pageIndex+1,this.loadSchools()}select(){this.selectedSchool=this.schools.find(o=>o.schoolId===this.selectedSchoolId.value.toString()),this.modal.dismiss(this.selectedSchool,"confirm")}close(){this.modal.dismiss(null,"cancel")}presentAlert(o){var n=this;return(0,f.Z)(function*(){return yield(yield n.alertController.create(o)).present()})()}static \u0275fac=function(n){return new(n||S)(e.Y36(M.l),e.Y36(r.S),e.Y36(a.qu),e.Y36(i.Br),e.Y36(c.p),e.Y36(d.e),e.Y36(i.IN),e.Y36(O.Y),e.Y36(y.V))};static \u0275cmp=e.Xpm({type:S,selectors:[["app-search-school"]],decls:15,vars:7,consts:[["class","loader-cover",4,"ngIf"],["mode","md",1,"ion-padding"],[2,"display","flex","flex-direction","column"],[1,"search-header"],["slot","start"],[3,"click"],["name","chevron-back","color","primary",2,"font-size","2em!important"],["appearance","outline"],["matInput","","type","search","placeholder","Search School",3,"formControl","keyup.enter"],["matSuffix","",3,"click",4,"ngIf"],[1,"search-result"],[3,"formControl"],["fill","outline","lines","none",4,"ngFor","ngForOf"],["lines","none","class","load-more",3,"click",4,"ngIf"],[4,"ngIf"],[1,"loader-cover"],["matSuffix","",3,"click"],["fill","outline","lines","none"],[1,"title"],[1,"desc"],["slot","end",3,"value"],["lines","none",1,"load-more",3,"click"],["mode","md"],["mode","md","type","submit","expand","full","shape","round","size","large","color","primary",3,"click"]],template:function(n,s){1&n&&(e.YNc(0,b,1,0,"div",0),e.TgZ(1,"ion-content",1)(2,"div",2)(3,"div",3)(4,"ion-buttons",4)(5,"ion-button",5),e.NdJ("click",function(){return s.close()}),e._UZ(6,"ion-icon",6),e.qZA()(),e.TgZ(7,"mat-form-field",7)(8,"input",8),e.NdJ("keyup.enter",function(){return s.loadSchools()}),e.qZA(),e.YNc(9,U,2,0,"mat-icon",9),e.qZA()(),e.TgZ(10,"div",10)(11,"ion-radio-group",11),e.YNc(12,A,8,3,"ion-item",12),e.qZA(),e.YNc(13,T,4,0,"ion-item",13),e.qZA()()(),e.YNc(14,B,4,0,"ion-footer",14)),2&n&&(e.Q6J("ngIf",s.isSelectionLoading),e.xp6(8),e.Q6J("formControl",s.searchKey),e.xp6(1),e.Q6J("ngIf",s.searchKey.value&&""!==s.searchKey.value),e.xp6(2),e.Q6J("formControl",s.selectedSchoolId),e.xp6(1),e.Q6J("ngForOf",s.schools),e.xp6(1),e.Q6J("ngIf",s.schools.length<s.total),e.xp6(1),e.Q6J("ngIf",s.selectedSchoolId.valid))},dependencies:[g.sg,g.O5,I.Hw,x.KE,x.R9,E.Nt,i.YG,i.Sm,i.W2,i.fr,i.gu,i.Ie,i.Q$,i.B7,i.se,i.sr,i.U5,i.QI,a.Fj,a.JJ,a.oH],styles:["h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], span[_ngcontent-%COMP%], p[_ngcontent-%COMP%], label[_ngcontent-%COMP%]{margin:0}ion-header[_ngcontent-%COMP%]:after{background-image:none}.search-header[_ngcontent-%COMP%]{display:flex;flex-direction:row;position:fixed;width:100%;left:0;top:0;padding:5px 16px!important;z-index:99!important;background:#fff}.search-header[_ngcontent-%COMP%]     mat-form-field{flex-grow:1;margin-left:20px!important;margin-right:10px!important}.search-header[_ngcontent-%COMP%]     mat-form-field .mat-form-field-wrapper{padding:0!important}.search-header[_ngcontent-%COMP%]     mat-form-field .mat-form-field-flex{display:flex;flex-direction:row;align-items:center;height:50px!important}.search-header[_ngcontent-%COMP%]     mat-form-field .mat-form-field-infix{border:none!important;top:3px!important}.search-header[_ngcontent-%COMP%]     mat-form-field .mat-form-field-pefix{display:flex;flex-direction:column;align-items:center;justify-content:center}.search-header[_ngcontent-%COMP%]     mat-form-field .mat-form-field-suffix{display:flex;flex-direction:column;align-items:center;justify-content:center}.search-header[_ngcontent-%COMP%]     mat-form-field mat-icon{line-height:1;height:100%;width:100%;font-size:2rem;opacity:.7}.search-header[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]::part(native){padding:0!important}.search-result[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin-top:80px!important;box-sizing:border-box}.search-result[_ngcontent-%COMP%]   ion-radio-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;row-gap:15px!important;box-sizing:border-box}.search-result[_ngcontent-%COMP%]   ion-radio-group[_ngcontent-%COMP%]     ion-item{display:flex;flex-grow:1;width:100%}.search-result[_ngcontent-%COMP%]   ion-radio-group[_ngcontent-%COMP%]     ion-item::part(native){min-height:150px!important;border-radius:15px!important;flex-grow:1;height:100%;min-width:100%!important}.search-result[_ngcontent-%COMP%]   ion-radio-group[_ngcontent-%COMP%]     ion-item.item-radio-checked::part(native){border-color:#00acc1}.search-result[_ngcontent-%COMP%]   ion-radio-group[_ngcontent-%COMP%]     ion-item.item-radio-checked ion-label{opacity:1}.search-result[_ngcontent-%COMP%]   ion-radio-group[_ngcontent-%COMP%]     ion-item ion-label{display:flex;flex-direction:column;opacity:.7;white-space:break-spaces!important}.search-result[_ngcontent-%COMP%]   ion-radio-group[_ngcontent-%COMP%]     ion-item ion-label .title, .search-result[_ngcontent-%COMP%]   ion-radio-group[_ngcontent-%COMP%]     ion-item ion-label .desc{overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical}.search-result[_ngcontent-%COMP%]   ion-radio-group[_ngcontent-%COMP%]     ion-item ion-radio{margin:0!important;opacity:0!important}.search-result[_ngcontent-%COMP%]   .load-more[_ngcontent-%COMP%]{margin-top:20px!important}.loader-cover[_ngcontent-%COMP%]{position:fixed;left:0;top:0;width:100%;height:100%;background-color:#8f8f8f9e}ion-footer[_ngcontent-%COMP%]{display:flex}ion-footer[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]{display:flex;padding:5px 10px}ion-footer[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{height:50px;flex-grow:1;font-size:18px;width:100%;margin:0!important}"]})}const K=[{path:"",component:S}];class v{static \u0275fac=function(n){return new(n||v)};static \u0275mod=e.oAB({type:v});static \u0275inj=e.cJS({imports:[l.Bz.forChild(K),l.Bz]})}var N=t(9544);class C{static \u0275fac=function(n){return new(n||C)};static \u0275mod=e.oAB({type:C});static \u0275inj=e.cJS({imports:[g.ez,N.q,i.Pc,a.u5,a.UX,v]})}},3013:(_,m,t)=>{t.d(m,{l:()=>e});var g=t(1086),a=t(2868),i=t(7221),l=t(2340),f=t(4650),u=t(529),P=t(9709);class e{http;appconfig;constructor(r,c){this.http=r,this.appconfig=c}getByAdvanceSearch(r){return this.http.post(l.N.apiBaseUrl+this.appconfig.config.apiEndPoints.parents.getByAdvanceSearch,r).pipe((0,a.b)(c=>this.log("parents")),(0,i.K)(this.handleError("parents",[])))}getByCode(r){return this.http.get(l.N.apiBaseUrl+this.appconfig.config.apiEndPoints.parents.getByCode+r).pipe((0,a.b)(c=>this.log("parents")),(0,i.K)(this.handleError("parents",[])))}create(r){return this.http.post(l.N.apiBaseUrl+this.appconfig.config.apiEndPoints.parents.create,r).pipe((0,a.b)(c=>this.log("parents")),(0,i.K)(this.handleError("parents",[])))}updateProfile(r,c){return this.http.put(l.N.apiBaseUrl+this.appconfig.config.apiEndPoints.parents.updateProfile+r,c).pipe((0,a.b)(d=>this.log("parents")),(0,i.K)(this.handleError("parents",[])))}resetPassword(r,c){return this.http.put(l.N.apiBaseUrl+this.appconfig.config.apiEndPoints.parents.resetPassword+r,c).pipe((0,a.b)(d=>this.log("parents")),(0,i.K)(this.handleError("parents",[])))}updateProfilePicture(r,c){return this.http.put(l.N.apiBaseUrl+this.appconfig.config.apiEndPoints.parents.updateProfilePicture+r,c).pipe((0,a.b)(d=>this.log("parents")),(0,i.K)(this.handleError("parents",[])))}delete(r){return this.http.delete(l.N.apiBaseUrl+this.appconfig.config.apiEndPoints.parents.delete+r).pipe((0,a.b)(c=>this.log("parents")),(0,i.K)(this.handleError("parents",[])))}handleError(r="operation",c){return d=>(this.log(`${r} failed: ${Array.isArray(d.error.message)?d.error.message[0]:d.error.message}`),(0,g.of)(d.error))}log(r){console.log(r)}static \u0275fac=function(c){return new(c||e)(f.LFG(u.eN),f.LFG(P._))};static \u0275prov=f.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"})}}}]);