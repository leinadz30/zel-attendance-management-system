"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8580],{8580:(x,v,o)=>{o.r(v),o.d(v,{LoginPageModule:()=>m});var s=o(9544),l=o(6895),h=o(4006),e=o(603),d=o(9773),y=o(7414),g=o(4650);const b=[{path:"",component:y.X}];class a{static \u0275fac=function(f){return new(f||a)};static \u0275mod=g.oAB({type:a});static \u0275inj=g.cJS({imports:[d.Bz.forChild(b),d.Bz]})}class m{static \u0275fac=function(f){return new(f||m)};static \u0275mod=g.oAB({type:m});static \u0275inj=g.cJS({imports:[l.ez,h.u5,h.UX,e.Pc,a,s.q]})}},7414:(x,v,o)=>{o.d(v,{X:()=>S});var s=o(5861),l=o(4006),h=o(5838),e=o(4650),d=o(9773),y=o(263),g=o(3185),b=o(1169),a=o(603),m=o(3746);class p{loadingController;loading;isShowing=!1;constructor(t){this.loadingController=t}presentLoader(t){var i=this;return(0,s.Z)(function*(){if(!i.isShowing)return i.loading=yield i.loadingController.create({message:t,spinner:"circles"}),i.isShowing=!0,yield i.loading.present();i.isShowing=!0,i.loading.message=t})()}dismissLoader(){var t=this;return(0,s.Z)(function*(){t.loading&&t.isShowing&&(t.isShowing=!1,yield t.loading.dismiss())})()}static \u0275fac=function(i){return new(i||p)(e.LFG(a.HT))};static \u0275prov=e.Yz7({token:p,factory:p.\u0275fac,providedIn:"root"})}var Z=o(9709),f=o(9103),F=o(7559),U=o(7956),C=o(6257),Y=o(7392),A=o(9549),J=o(4144);const P=["signUpStepper"];class S{formBuilder;router;route;authService;userFirebaseTokenService;userOneSignalSubscriptionService;alertController;storageService;loaderService;appconfig;fcmService;modalCtrl;animationService;pageLoaderService;signUpStepper;isSubmitting=!1;loginForm;enableBackToHome=!1;currentDeviceModel;constructor(t,i,r,n,u,c,T,L,N,w,z,I,O,B){this.formBuilder=t,this.router=i,this.route=r,this.authService=n,this.userFirebaseTokenService=u,this.userOneSignalSubscriptionService=c,this.alertController=T,this.storageService=L,this.loaderService=N,this.appconfig=w,this.fcmService=z,this.modalCtrl=I,this.animationService=O,this.pageLoaderService=B,h.A.getInfo().then(G=>{this.currentDeviceModel=G.model})}get formData(){return this.loginForm.value}ngOnInit(){this.loginForm=this.formBuilder.group({userName:[null,[l.kI.required]],password:[null,l.kI.required]})}onFormSubmit(){var t=this;return(0,s.Z)(function*(){if(t.loginForm.valid)try{const i=t.formData;t.isSubmitting=!0,yield t.pageLoaderService.open("Signing in please wait..."),t.authService.login(i).subscribe(function(){var r=(0,s.Z)(function*(n){if(n.success){t.storageService.saveTotalUnreadNotif(n.data?.totalUnreadNotif);const u=n.data;u.userProfilePic=n.data.user.userProfilePic?.file?.url,t.storageService.saveLoginUser(u);const c=t.storageService.getOneSignalSubscriptionId();c&&""!==c&&null!==c&&!c?.toString().includes("null")?yield t.userOneSignalSubscriptionService.create({userId:n.data.user?.userId,subscriptionId:c}).toPromise().catch(function(){var T=(0,s.Z)(function*(L){yield t.pageLoaderService.close(),t.isSubmitting=!1,yield t.presentAlert({header:"Try again!",message:Array.isArray(n.message)?n.message[0]:n.message,buttons:["OK"]})});return function(L){return T.apply(this,arguments)}}()).finally(()=>{setTimeout((0,s.Z)(function*(){yield t.pageLoaderService.close(),t.isSubmitting=!1,window.location.href="/home"}),2e3)}):setTimeout((0,s.Z)(function*(){yield t.pageLoaderService.close(),t.isSubmitting=!1,window.location.href="/home"}),2e3)}else yield t.pageLoaderService.close(),t.isSubmitting=!1,yield t.presentAlert({header:"Try again!",message:Array.isArray(n.message)?n.message[0]:n.message,buttons:["OK"]})});return function(n){return r.apply(this,arguments)}}(),function(){var r=(0,s.Z)(function*(n){console.log(n),t.isSubmitting=!1,yield t.pageLoaderService.close(),yield t.presentAlert({header:"Try again!",subHeader:"",message:Array.isArray(n.message)?n.message[0]:n.message,buttons:["OK"]})});return function(n){return r.apply(this,arguments)}}())}catch(i){console.log(i),yield t.pageLoaderService.close(),t.isSubmitting=!1,yield t.presentAlert({header:"Try again!",subHeader:"",message:Array.isArray(i.message)?i.message[0]:i.message,buttons:["OK"]})}})()}onCreateAccount(){var t=this;return(0,s.Z)(function*(){const i=yield t.modalCtrl.getTop();i?i.dismiss({register:!0}):t.router.navigate(["landing-page"],{state:{data:{register:!0}}})})()}getLastLogin(){const t=localStorage.getItem("lastLogin");return t&&""!==t?JSON.parse(t):null}close(){var t=this;return(0,s.Z)(function*(){const i=yield t.modalCtrl.getTop();i?i.dismiss(null):t.router.navigate(["landing-page"],{replaceUrl:!0})})()}presentAlert(t){var i=this;return(0,s.Z)(function*(){yield(yield i.alertController.create(t)).present()})()}static \u0275fac=function(i){return new(i||S)(e.Y36(l.qu),e.Y36(d.F0),e.Y36(d.gz),e.Y36(y.e),e.Y36(g.Y),e.Y36(b.F),e.Y36(a.Br),e.Y36(m.V),e.Y36(p),e.Y36(Z._),e.Y36(f.E),e.Y36(a.IN),e.Y36(F.Y),e.Y36(U.p))};static \u0275cmp=e.Xpm({type:S,selectors:[["app-login"]],viewQuery:function(i,r){if(1&i&&e.Gf(P,5),2&i){let n;e.iGM(n=e.CRH())&&(r.signUpStepper=n.first)}},decls:37,vars:7,consts:[["no-border","","no-shadow","","mode","md"],["mode","md"],["slot","start"],[3,"click"],["name","chevron-back","color","primary",2,"font-size","2em!important"],[1,"ion-text-center"],["slot","end",2,"width","48px"],[1,"login"],["animationDuration","200",3,"linear"],["logInStepper",""],[3,"stepControl"],[1,"form-container","center"],[1,"form-header"],[1,"title"],[1,"desc"],[3,"formGroup","ngSubmit"],[3,"disabled"],[1,"form-field-group"],["appearance","outline"],["matInput","","type","text","placeholder","ex: 09123456789","formControlName","userName","autocapitalize","none","oninput","this.value = this.value.replace(/[^0-9]/g, '')"],["matInput","","type","password","placeholder","Password","formControlName","password"],["password",""],["matSuffix","",1,"icon-right",2,"cursor","pointer",3,"click"],[1,"form-footer"],["shape","round","size","large",3,"disabled","click"],["shape","round","size","large","fill","outline",3,"disabled","click"]],template:function(i,r){if(1&i){const n=e.EpF();e.TgZ(0,"ion-header",0)(1,"ion-toolbar",1)(2,"ion-buttons",2)(3,"ion-button",3),e.NdJ("click",function(){return r.close()}),e._UZ(4,"ion-icon",4),e.qZA()(),e._UZ(5,"ion-title",5)(6,"div",6),e.qZA()(),e.TgZ(7,"ion-content",7)(8,"mat-stepper",8,9)(10,"mat-step",10)(11,"div",11)(12,"div",12)(13,"h1",13),e._uU(14,"Welcome!"),e.qZA(),e.TgZ(15,"h3",14),e._uU(16,"Please sign in to continue"),e.qZA()(),e.TgZ(17,"form",15),e.NdJ("ngSubmit",function(){return r.onFormSubmit()}),e.TgZ(18,"fieldset",16)(19,"div",17)(20,"mat-form-field",18)(21,"mat-label"),e._uU(22,"Mobile number"),e.qZA(),e._UZ(23,"input",19),e.qZA()(),e.TgZ(24,"div",17)(25,"mat-form-field",18)(26,"mat-label"),e._uU(27,"Password"),e.qZA(),e._UZ(28,"input",20,21),e.TgZ(30,"mat-icon",22),e.NdJ("click",function(){e.CHM(n);const c=e.MAs(29);return e.KtG(c.type="password"===c.type?"text":"password")}),e._uU(31),e.qZA()()()()(),e.TgZ(32,"div",23)(33,"ion-button",24),e.NdJ("click",function(){return r.onFormSubmit()}),e._uU(34,"Log in"),e.qZA(),e.TgZ(35,"ion-button",25),e.NdJ("click",function(){return r.onCreateAccount()}),e._uU(36,"Create account"),e.qZA()()()()()()}if(2&i){const n=e.MAs(29);e.xp6(8),e.Q6J("linear",!1),e.xp6(2),e.Q6J("stepControl",r.loginForm),e.xp6(7),e.Q6J("formGroup",r.loginForm),e.xp6(1),e.Q6J("disabled",r.isSubmitting),e.xp6(13),e.Oqu("password"===n.type?"visibility":"visibility_off"),e.xp6(2),e.Q6J("disabled",r.isSubmitting),e.xp6(2),e.Q6J("disabled",r.isSubmitting)}},dependencies:[l._Y,l.Fj,l.JJ,l.JL,l.sg,l.u,a.YG,a.Sm,a.W2,a.Gu,a.gu,a.wd,a.sr,C.C0,C.Vq,Y.Hw,A.KE,A.hX,A.R9,J.Nt],styles:["ion-header[_ngcontent-%COMP%]:after{background-image:none}  .login mat-stepper{padding:0 40px;height:100%!important;display:flex!important;flex-direction:column;justify-content:center}  .login mat-stepper .mat-horizontal-stepper-header-container{display:none!important}  .login mat-stepper .mat-horizontal-content-container{padding:0!important}  .login mat-stepper .form-container .form-header{display:flex;width:100%;flex-direction:column}  .login mat-stepper .form-container .form-header .title{font-size:2em;font-weight:900}  .login mat-stepper .form-container .form-header .desc{font-size:1.4em}  .login mat-stepper .form-container form{flex-grow:0!important;width:100%}  .login mat-stepper .form-container .form-footer{display:flex;flex-direction:column;width:100%;align-items:center;row-gap:10px}  .login mat-stepper .form-container .form-footer ion-button{height:50px;flex-grow:1;font-size:18px;width:100%}"]})}}}]);