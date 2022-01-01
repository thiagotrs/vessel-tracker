"use strict";(self.webpackChunkvessel_tracker=self.webpackChunkvessel_tracker||[]).push([[631],{5631:(tt,d,s)=>{s.r(d),s.d(d,{RoutePlanModule:()=>k});var r=s(8583),t=s(639),x=s(6290),c=s(7564);let Z=(()=>{class o{constructor(){}}return o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-route-plan"]],decls:4,vars:0,consts:[[1,"my-4"],[1,"container"]],template:function(e,n){1&e&&(t._UZ(0,"app-header"),t.TgZ(1,"main",0),t.TgZ(2,"div",1),t._UZ(3,"router-outlet"),t.qZA(),t.qZA())},directives:[x.G,c.lC],encapsulation:2}),o})();var p=s(665),A=s(3778),m=s(4283),C=s(6090);const T=function(){return[]};let S=(()=>{class o{constructor(e){this.vesselService=e,this.vessels$=this.vesselService.vessels$}ngOnInit(){this.vesselService.loadVessels()}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(m.I))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-route-plan-vessels"]],decls:6,vars:4,consts:[[1,"text-center"],[3,"vessels"]],template:function(e,n){1&e&&(t.TgZ(0,"h1",0),t._uU(1,"\u{1f5fa}\ufe0f Route Planning"),t.qZA(),t.TgZ(2,"h2"),t._uU(3,"Select Vessel:"),t.qZA(),t._UZ(4,"app-vessels-list",1),t.ALo(5,"async")),2&e&&(t.xp6(4),t.Q6J("vessels",t.lcZ(5,1,n.vessels$)||t.DdM(3,T)))},directives:[C.T],pipes:[r.Ov],encapsulation:2}),o})();var _=s(5319),y=s(7709),P=s(9269),U=s(5883),R=s(153),D=s(2037),v=s(42),g=s(9463),h=s(9980),f=s(5625);function F(o,i){if(1&o&&(t.TgZ(0,"small",6),t._uU(1),t.qZA()),2&o){const e=t.oxw().$implicit;t.xp6(1),t.Oqu(e.location.point)}}function J(o,i){if(1&o){const e=t.EpF();t.TgZ(0,"app-list-item"),t.TgZ(1,"div",1),t.TgZ(2,"h5",2),t._uU(3),t.qZA(),t.TgZ(4,"button",3),t.NdJ("click",function(){const a=t.CHM(e).index;return t.oxw().remove(a)}),t._uU(5," Delete "),t.qZA(),t.qZA(),t.TgZ(6,"p",2),t._uU(7),t.qZA(),t.TgZ(8,"div",4),t._uU(9),t.qZA(),t.YNc(10,F,2,1,"small",5),t.qZA()}if(2&o){const e=i.$implicit;t.xp6(3),t.hij("\u{1f4cd} ",e.name,""),t.xp6(4),t.Oqu(e.location.city+", "+e.location.country),t.xp6(2),t.hij("Capacity: ",e.capacity,""),t.xp6(1),t.Q6J("ngIf",e.location.point)}}let O=(()=>{class o{constructor(){this.delete=new t.vpe}remove(e){this.delete.emit(e)}}return o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-ports-list"]],inputs:{ports:"ports"},outputs:{delete:"delete"},decls:2,vars:1,consts:[[4,"ngFor","ngForOf"],[1,"d-flex","w-100","justify-content-between"],[1,"mb-1"],["app-button","","color","danger","outline","","type","button",3,"click"],[1,"fw-bold","fst-italic"],["class","text-muted",4,"ngIf"],[1,"text-muted"]],template:function(e,n){1&e&&(t.TgZ(0,"app-list-group"),t.YNc(1,J,11,4,"app-list-item",0),t.qZA()),2&e&&(t.xp6(1),t.Q6J("ngForOf",n.ports))},directives:[h.q,r.sg,f.G,v.r,r.O5],encapsulation:2,changeDetection:0}),o})();var M=s(8332);function b(o,i){if(1&o&&(t.TgZ(0,"small",6),t._uU(1),t.qZA()),2&o){const e=t.oxw();t.xp6(1),t.Oqu(e.stop.port.location.point)}}let I=(()=>{class o{constructor(){}}return o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-stop"]],inputs:{stop:"stop"},decls:14,vars:8,consts:[[1,"d-flex","w-100","justify-content-between"],[1,"mb-1"],[1,"d-flex"],["app-badge","","pill","","color","success"],[1,"fw-bold","fst-italic"],["class","text-muted",4,"ngIf"],[1,"text-muted"]],template:function(e,n){1&e&&(t.TgZ(0,"app-list-group"),t.TgZ(1,"app-list-item"),t.TgZ(2,"div",0),t.TgZ(3,"h5",1),t._uU(4),t.qZA(),t.TgZ(5,"div",2),t.TgZ(6,"span",3),t._uU(7),t.ALo(8,"date"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(9,"p",1),t._uU(10),t.qZA(),t.TgZ(11,"div",4),t._uU(12),t.qZA(),t.YNc(13,b,2,1,"small",5),t.qZA(),t.qZA()),2&e&&(t.xp6(4),t.hij("\u{1f4cd} ",n.stop.port.name,""),t.xp6(3),t.Oqu(t.xi3(8,5,n.stop.dateIn,"shortDate")),t.xp6(3),t.hij(" ",n.stop.port.location.city+", "+n.stop.port.location.country," "),t.xp6(2),t.hij("Capacity: ",n.stop.port.capacity,""),t.xp6(1),t.Q6J("ngIf",n.stop.port.location.point))},directives:[h.q,f.G,g.F,r.O5],pipes:[r.uU],encapsulation:2,changeDetection:0}),o})();var Q=s(2925);function N(o,i){if(1&o&&(t.TgZ(0,"option",15),t._uU(1),t.qZA()),2&o){const e=i.$implicit,n=t.oxw(2);t.Q6J("value",e.id),t.xp6(1),t.hij(" ",n.formatLocation(e)," ")}}function L(o,i){if(1&o){const e=t.EpF();t.TgZ(0,"app-alert",16),t.NdJ("closeAlert",function(){return t.CHM(e),t.oxw(2).closeAlert()}),t.qZA()}if(2&o){const e=t.oxw(2);t.Q6J("message",e.alertMessage)}}function Y(o,i){if(1&o&&(t.ynx(0),t.TgZ(1,"h2"),t._uU(2,"\u{1f4cd} Current Stop"),t.qZA(),t._UZ(3,"app-stop",17),t.BQk()),2&o){const e=t.oxw(2);t.xp6(3),t.Q6J("stop",e.currentStop)}}function q(o,i){if(1&o){const e=t.EpF();t.ynx(0),t.TgZ(1,"app-vessel-hero",2),t.TgZ(2,"button",3),t.NdJ("click",function(){return t.CHM(e),t.oxw().save()}),t._uU(3," Save Plan "),t.qZA(),t.qZA(),t.TgZ(4,"form",null,4),t.TgZ(6,"div",5),t.TgZ(7,"select",6,7),t.TgZ(9,"option",8),t._uU(10,"Select Port"),t.qZA(),t.YNc(11,N,2,2,"option",9),t.qZA(),t.TgZ(12,"button",10),t.NdJ("click",function(){t.CHM(e);const l=t.MAs(8),a=t.MAs(5);return t.oxw().addStop(l.value),a.resetForm({port:""})}),t._uU(13," Add Route "),t.qZA(),t.qZA(),t.YNc(14,L,1,1,"app-alert",11),t.qZA(),t.YNc(15,Y,4,1,"ng-container",12),t.TgZ(16,"h2"),t._uU(17," \u{1f4cd} Next Stops "),t.TgZ(18,"span",13),t._uU(19),t.qZA(),t.qZA(),t.TgZ(20,"app-ports-list",14),t.NdJ("delete",function(l){return t.CHM(e),t.oxw().removeStop(l)}),t.qZA(),t.BQk()}if(2&o){const e=t.MAs(8),n=t.oxw();t.xp6(1),t.Q6J("vessel",n.vessel),t.xp6(1),t.Q6J("disabled",!n.isUnsaved),t.xp6(9),t.Q6J("ngForOf",n.ports),t.xp6(1),t.Q6J("disabled",e.invalid),t.xp6(2),t.Q6J("ngIf",n.alertMessage),t.xp6(1),t.Q6J("ngIf",n.currentStop),t.xp6(4),t.Oqu(n.nextStops.length),t.xp6(1),t.Q6J("ports",n.nextStops)}}function $(o,i){1&o&&(t.TgZ(0,"h2",18),t._uU(1,"Carregando"),t.qZA(),t.TgZ(2,"p",18),t._UZ(3,"app-spinner"),t.qZA())}let j=(()=>{class o{constructor(e,n,l,a){this.vesselService=e,this.portService=n,this.portalService=l,this.route=a,this.nextStops=[],this.subs=new _.w,this._modalConfirmation=new y.xQ,this.id=this.route.snapshot.paramMap.get("id")||"",this.isLoading$=this.vesselService.isLoading$}formatLocation(e){return`${e.name} (${e.location.city}, ${e.location.country})`}canDeactivate(){return!this.isUnsaved||(this.openModal(),this._modalConfirmation.asObservable())}ngOnInit(){this.vesselService.loadVesselById(this.id),this.portService.loadPorts(),this.subs.add(this.vesselService.selectedVessel$.subscribe(e=>{var n,l;this.vessel=e,this.nextStops=(null===(n=this.vessel)||void 0===n?void 0:n.nextStops.filter(a=>!(a.dateIn||a.dateOut)).map(a=>a.port))||[],this.currentStop=(null===(l=this.vessel)||void 0===l?void 0:l.nextStops.find(a=>a.dateIn||a.dateOut))||null})),this.subs.add(this.portService.ports$.subscribe(e=>{this.ports=e}))}save(){this.vesselService.editNextRoutes(this.id,this.nextStops),this.isUnsaved=!1}removeStop(e){this.nextStops=this.nextStops.filter((n,l)=>l!==e),this.isUnsaved=!0}addStop(e){var n,l;const a=this.ports.find(u=>u.id===e);a&&(null===(n=this.nextStops[this.nextStops.length-1])||void 0===n?void 0:n.id)!==e&&(this.nextStops.length>0||(null===(l=this.currentStop)||void 0===l?void 0:l.port.id)!==e)?(this.nextStops=[...this.nextStops,a],this.isUnsaved=!0):this.alertMessage="Cannot add same port as last neither than current"}closeAlert(){this.alertMessage=""}openModal(){const e=this.portalService.open(P.z);e.title="Discard changes?",e.message="There are changes unsaved.",e.denyTitle="No",e.confirmTitle="Yes",e.deny.subscribe(()=>{this._modalConfirmation.next(!1),this.portalService.close()}),e.confirm.subscribe(()=>{this._modalConfirmation.next(!0),this.portalService.close()})}ngOnDestroy(){this.subs.unsubscribe()}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(m.I),t.Y36(U.v),t.Y36(R.E),t.Y36(c.gz))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-route-plan-add"]],decls:4,vars:4,consts:[[4,"ngIf","ngIfElse"],["load",""],[3,"vessel"],["type","button","app-button","","size","large",1,"mx-1",3,"disabled","click"],["routePlanForm","ngForm"],[1,"input-group","mb-3"],["name","port","id","port","ngModel","","required","",1,"form-select","form-select-lg"],["port","ngModel"],["value","","selected","","disabled",""],[3,"value",4,"ngFor","ngForOf"],[1,"btn","btn-success",3,"disabled","click"],["type","warning",3,"message","closeAlert",4,"ngIf"],[4,"ngIf"],["app-badge","","color","secondary"],[3,"ports","delete"],[3,"value"],["type","warning",3,"message","closeAlert"],[3,"stop"],[1,"text-center"]],template:function(e,n){if(1&e&&(t.YNc(0,q,21,8,"ng-container",0),t.ALo(1,"async"),t.YNc(2,$,4,0,"ng-template",null,1,t.W1O)),2&e){const l=t.MAs(3);t.Q6J("ngIf",!1===t.lcZ(1,2,n.isLoading$))("ngIfElse",l)}},directives:[r.O5,D.z,v.r,p._Y,p.JL,p.F,p.EJ,p.JJ,p.On,p.Q7,p.YN,p.Kr,r.sg,g.F,O,M.w,I,Q.O],pipes:[r.Ov],encapsulation:2}),o})();var E=s(4865),V=s(8562),z=s(1643),X=s(2563),B=s(4584),H=s(4712),G=s(9752),w=s(2024),K=s(8721);const W=[{path:"",component:Z,children:[{path:"",component:S},{path:":id",component:j,canDeactivate:[z.a]},{path:"**",redirectTo:"/home"}]}];let k=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[[r.ez,c.Bz.forChild(W),A.O,V.g,p.u5,E.X,X.n,H.T,B.O,G.F,w.h,K.F]]}),o})()}}]);