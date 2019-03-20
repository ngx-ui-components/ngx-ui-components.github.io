(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./projects/ngx-ui-components/src/lib/cookie-consent/config.model.ts":
/*!***************************************************************************!*\
  !*** ./projects/ngx-ui-components/src/lib/cookie-consent/config.model.ts ***!
  \***************************************************************************/
/*! exports provided: USER_COOKIE_LAW_CONSENT_CONFIG, COOKIE_LAW_CONSENT_CONFIG, cookieLawConsentOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "USER_COOKIE_LAW_CONSENT_CONFIG", function() { return USER_COOKIE_LAW_CONSENT_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COOKIE_LAW_CONSENT_CONFIG", function() { return COOKIE_LAW_CONSENT_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cookieLawConsentOptions", function() { return cookieLawConsentOptions; });
/* harmony import */ var _shared_cookie_config_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/cookie-config.model */ "./projects/ngx-ui-components/src/lib/shared/cookie-config.model.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var USER_COOKIE_LAW_CONSENT_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('Cookie Law Consent Config Default');
var COOKIE_LAW_CONSENT_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('Cookie Law Consent Config');
var cookieLawConsentOptions = {
    cookie: new _shared_cookie_config_model__WEBPACK_IMPORTED_MODULE_0__["CookieOptions"](),
    position: 'bottom',
    dismissOnScroll: false,
    allowOnDismiss: true,
    autoOpen: true,
    acceptButton: true,
    declineButton: true,
    // tslint:disable-next-line: max-line-length
    askConsentText: "We use cookies to improve your experience on our site. To find out more, read our cookie policy. By clicking \"I accept\" on this banner, or using our site, you consent to the use of cookies unless you have disabled them.",
    doNotTrackText: "The feature called Do Not Track is enabled on your browser. You're not being tracked !",
    acceptButtonText: 'I accept',
    declineButtonText: 'I decline',
};


/***/ }),

/***/ "./projects/ngx-ui-components/src/lib/cookie-consent/cookie-consent.service.ts":
/*!*************************************************************************************!*\
  !*** ./projects/ngx-ui-components/src/lib/cookie-consent/cookie-consent.service.ts ***!
  \*************************************************************************************/
/*! exports provided: CookieConsentService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CookieConsentService", function() { return CookieConsentService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_cookie_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/cookie.service */ "./projects/ngx-ui-components/src/lib/shared/cookie.service.ts");
/* harmony import */ var _config_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config.model */ "./projects/ngx-ui-components/src/lib/cookie-consent/config.model.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _shared_browser_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/browser.service */ "./projects/ngx-ui-components/src/lib/shared/browser.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _google_analytics_ga_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../google-analytics/ga.service */ "./projects/ngx-ui-components/src/lib/google-analytics/ga.service.ts");
/* harmony import */ var _google_analytics_google_analytics_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../google-analytics/google-analytics.module */ "./projects/ngx-ui-components/src/lib/google-analytics/google-analytics.module.ts");
/* harmony import */ var _shared_scroll_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../shared/scroll.service */ "./projects/ngx-ui-components/src/lib/shared/scroll.service.ts");










var CookieConsentService = /** @class */ (function () {
    function CookieConsentService(cookieLawConsentConfig, cookieService, browserService, scrollService, gaService) {
        this.cookieLawConsentConfig = cookieLawConsentConfig;
        this.cookieService = cookieService;
        this.browserService = browserService;
        this.scrollService = scrollService;
        this.gaService = gaService;
        this.popupOpenSubject = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](null);
        this.statusChangeSubject = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.denyChoiceSubject = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.acceptCookieSubject = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.dismissChoiceSubject = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.popupOpen$ = this.popupOpenSubject.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["filter"])(function (type) { return type !== null; }));
        this.statusChange$ = this.statusChangeSubject.asObservable();
        this.denyChoice$ = this.denyChoiceSubject.asObservable();
        this.acceptCookie$ = this.acceptCookieSubject.asObservable();
        this.dismissChoice$ = this.dismissChoiceSubject.asObservable();
        this.init();
    }
    CookieConsentService.prototype.init = function () {
        var cookieLawConsent = this.cookieService.get(this.cookieLawConsentConfig.cookie.name);
        if (!cookieLawConsent) {
            if (this.browserService.hasDoNotTrack()) {
                this.doNotTrackerHandler();
            }
            else if (this.browserService.acceptToTrack()) {
                this.allowTrackingHandler();
            }
            else {
                // We call GA with `anonymizeIp`option
                this.gaService.callGABeforeConsent();
                this.popupOpenSubject.next("askConsent" /* askConsent */);
            }
        }
        else {
            if (cookieLawConsent === "Allow" /* Allow */) {
                this.allowTrackingHandler();
            }
            else if (cookieLawConsent === "Deny" /* Deny */) {
                this.denyTrackingHandler();
            }
            else {
                this.dismissTrackingHandler();
            }
        }
    };
    CookieConsentService.prototype.doNotTrackerHandler = function () {
        var _this = this;
        // We call GA with `anonymizeIp`option
        this.gaService.callGABeforeConsent();
        this.popupOpenSubject.next("hasDoNotTrack" /* hasDoNotTrack */);
        this.deny();
        this.scrollService.scrollEvent$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["debounceTime"])(1000))
            .subscribe(function () {
            _this.statusChangeSubject.next("Deny" /* Deny */);
        });
    };
    CookieConsentService.prototype.allowTrackingHandler = function () {
        this.acceptCookieSubject.next();
        if (this.gaService) {
            this.gaService.startGoogleAnalytics();
        }
    };
    CookieConsentService.prototype.denyTrackingHandler = function () {
        // We call GA with `anonymizeIp`option
        this.gaService.callGABeforeConsent();
        this.denyChoiceSubject.next();
        if (this.gaService) {
            this.gaService.deleteAnalyticsCookies();
        }
    };
    CookieConsentService.prototype.dismissTrackingHandler = function () {
        this.dismissChoiceSubject.next();
        if (this.gaService) {
            if (this.cookieLawConsentConfig.allowOnDismiss) {
                this.gaService.startGoogleAnalytics();
            }
            else {
                this.gaService.deleteAnalyticsCookies();
                this.gaService.callGABeforeConsent();
            }
        }
    };
    CookieConsentService.prototype.accept = function () {
        this.cookieService.set(this.cookieLawConsentConfig.cookie.name, "Allow" /* Allow */);
        if (this.gaService) {
            this.gaService.startGoogleAnalytics();
        }
        this.statusChangeSubject.next("Allow" /* Allow */);
    };
    CookieConsentService.prototype.deny = function () {
        this.cookieService.set(this.cookieLawConsentConfig.cookie.name, "Deny" /* Deny */);
        if (this.gaService) {
            this.gaService.deleteAnalyticsCookies();
        }
        this.statusChangeSubject.next("Deny" /* Deny */);
    };
    CookieConsentService.prototype.dismiss = function () {
        this.cookieService.set(this.cookieLawConsentConfig.cookie.name, "Dismiss" /* Dismiss */);
        if (this.gaService) {
            if (this.cookieLawConsentConfig.allowOnDismiss) {
                this.gaService.startGoogleAnalytics();
            }
            else {
                this.gaService.deleteAnalyticsCookies();
            }
            this.statusChangeSubject.next("Dismiss" /* Dismiss */);
        }
    };
    CookieConsentService.prototype.isAccepted = function () {
        return this.cookieService.get(this.cookieLawConsentConfig.cookie.name) === "Allow" /* Allow */.toString();
    };
    CookieConsentService.prototype.isDismiss = function () {
        return this.cookieService.get(this.cookieLawConsentConfig.cookie.name) === "Dismiss" /* Dismiss */.toString();
    };
    CookieConsentService.prototype.isDeny = function () {
        return this.cookieService.get(this.cookieLawConsentConfig.cookie.name) === "Deny" /* Deny */.toString();
    };
    CookieConsentService.prototype.isPresent = function () {
        return this.cookieService.check(this.cookieLawConsentConfig.cookie.name);
    };
    CookieConsentService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: _google_analytics_google_analytics_module__WEBPACK_IMPORTED_MODULE_8__["GoogleAnalyticsModule"],
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_config_model__WEBPACK_IMPORTED_MODULE_3__["COOKIE_LAW_CONSENT_CONFIG"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"])()),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object, _shared_cookie_service__WEBPACK_IMPORTED_MODULE_2__["CookieService"],
            _shared_browser_service__WEBPACK_IMPORTED_MODULE_5__["BrowserService"],
            _shared_scroll_service__WEBPACK_IMPORTED_MODULE_9__["ScrollService"],
            _google_analytics_ga_service__WEBPACK_IMPORTED_MODULE_7__["GaService"]])
    ], CookieConsentService);
    return CookieConsentService;
}());



/***/ }),

/***/ "./projects/ngx-ui-components/src/lib/cookie-consent/cookie-law-consent.module.ts":
/*!****************************************************************************************!*\
  !*** ./projects/ngx-ui-components/src/lib/cookie-consent/cookie-law-consent.module.ts ***!
  \****************************************************************************************/
/*! exports provided: mergeConfig, CookieLawConsentModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeConfig", function() { return mergeConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CookieLawConsentModule", function() { return CookieLawConsentModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _cookie_law_consent_cookie_law_consent_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cookie-law-consent/cookie-law-consent.component */ "./projects/ngx-ui-components/src/lib/cookie-consent/cookie-law-consent/cookie-law-consent.component.ts");
/* harmony import */ var _cookie_consent_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cookie-consent.service */ "./projects/ngx-ui-components/src/lib/cookie-consent/cookie-consent.service.ts");
/* harmony import */ var _config_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./config.model */ "./projects/ngx-ui-components/src/lib/cookie-consent/config.model.ts");
/* harmony import */ var _shared_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/utils */ "./projects/ngx-ui-components/src/lib/shared/utils.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/shared.module */ "./projects/ngx-ui-components/src/lib/shared/shared.module.ts");
/* harmony import */ var _google_analytics_google_analytics_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../google-analytics/google-analytics.module */ "./projects/ngx-ui-components/src/lib/google-analytics/google-analytics.module.ts");









var ngxDeclarations = [_cookie_law_consent_cookie_law_consent_component__WEBPACK_IMPORTED_MODULE_3__["CookieLawConsentComponent"]];
function mergeConfig(config) {
    if (config === null || typeof config === 'undefined') {
        config = {};
    }
    return Object(_shared_utils__WEBPACK_IMPORTED_MODULE_6__["mergeDeep"])(_config_model__WEBPACK_IMPORTED_MODULE_5__["cookieLawConsentOptions"], config);
}
var CookieLawConsentModule = /** @class */ (function () {
    function CookieLawConsentModule() {
    }
    CookieLawConsentModule_1 = CookieLawConsentModule;
    CookieLawConsentModule.forRoot = function (config) {
        return {
            ngModule: CookieLawConsentModule_1,
            providers: [
                { provide: _config_model__WEBPACK_IMPORTED_MODULE_5__["USER_COOKIE_LAW_CONSENT_CONFIG"], useValue: config },
                { provide: _config_model__WEBPACK_IMPORTED_MODULE_5__["COOKIE_LAW_CONSENT_CONFIG"], useFactory: mergeConfig, deps: [_config_model__WEBPACK_IMPORTED_MODULE_5__["USER_COOKIE_LAW_CONSENT_CONFIG"]] },
                _cookie_consent_service__WEBPACK_IMPORTED_MODULE_4__["CookieConsentService"],
            ],
        };
    };
    var CookieLawConsentModule_1;
    CookieLawConsentModule = CookieLawConsentModule_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: ngxDeclarations.slice(),
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"], _google_analytics_google_analytics_module__WEBPACK_IMPORTED_MODULE_8__["GoogleAnalyticsModule"].forChild()],
            exports: ngxDeclarations.slice(),
        })
    ], CookieLawConsentModule);
    return CookieLawConsentModule;
}());



/***/ }),

/***/ "./projects/ngx-ui-components/src/lib/cookie-consent/cookie-law-consent/cookie-law-consent.component.css":
/*!***************************************************************************************************************!*\
  !*** ./projects/ngx-ui-components/src/lib/cookie-consent/cookie-law-consent/cookie-law-consent.component.css ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".cookie-law-consent {\n  position: fixed;\n  right: 0;\n  left: 0;\n  color: white;\n  font-size: 14px;\n  border: none;\n  background: #333;\n  z-index: 999998;\n  text-align: left;\n  display: inline-flex;\n}\n\n.cookie-law-consent-message {\n  padding: 15px;\n  width: 100%;\n}\n\n.cookie-law-consent-button {\n  border: none;\n  background: rgb(22, 136, 225);\n  color: rgb(255, 255, 255);\n  display: block;\n  cursor: pointer;\n  font-size: 12px;\n  padding: 5px 10px;\n  margin: 10px 10px;\n}\n\n.bloc-button {\n  display: inline-flex;\n  white-space: nowrap;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzL25neC11aS1jb21wb25lbnRzL3NyYy9saWIvY29va2llLWNvbnNlbnQvY29va2llLWxhdy1jb25zZW50L2Nvb2tpZS1sYXctY29uc2VudC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZUFBZTtFQUNmLFFBQVE7RUFDUixPQUFPO0VBQ1AsWUFBWTtFQUNaLGVBQWU7RUFDZixZQUFZO0VBQ1osZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFlBQVk7RUFDWiw2QkFBNkI7RUFDN0IseUJBQXlCO0VBQ3pCLGNBQWM7RUFDZCxlQUFlO0VBQ2YsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxvQkFBb0I7RUFDcEIsbUJBQW1CO0FBQ3JCIiwiZmlsZSI6InByb2plY3RzL25neC11aS1jb21wb25lbnRzL3NyYy9saWIvY29va2llLWNvbnNlbnQvY29va2llLWxhdy1jb25zZW50L2Nvb2tpZS1sYXctY29uc2VudC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvb2tpZS1sYXctY29uc2VudCB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgcmlnaHQ6IDA7XG4gIGxlZnQ6IDA7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBib3JkZXI6IG5vbmU7XG4gIGJhY2tncm91bmQ6ICMzMzM7XG4gIHotaW5kZXg6IDk5OTk5ODtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG59XG5cbi5jb29raWUtbGF3LWNvbnNlbnQtbWVzc2FnZSB7XG4gIHBhZGRpbmc6IDE1cHg7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uY29va2llLWxhdy1jb25zZW50LWJ1dHRvbiB7XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZDogcmdiKDIyLCAxMzYsIDIyNSk7XG4gIGNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgcGFkZGluZzogNXB4IDEwcHg7XG4gIG1hcmdpbjogMTBweCAxMHB4O1xufVxuXG4uYmxvYy1idXR0b24ge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./projects/ngx-ui-components/src/lib/cookie-consent/cookie-law-consent/cookie-law-consent.component.html":
/*!****************************************************************************************************************!*\
  !*** ./projects/ngx-ui-components/src/lib/cookie-consent/cookie-law-consent/cookie-law-consent.component.html ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container *ngIf=\"opened\">\n  <div #cookielawconsent class=\"cookie-law-consent\">\n    <div class=\"cookie-law-consent-message\">\n      <span *ngIf=\"typeMessage === 'askConsent'\">{{ cookieLawConsentConfig.askConsentText }}</span>\n      <span *ngIf=\"typeMessage === 'hasDoNotTrack'\">{{ cookieLawConsentConfig.doNotTrackText }}</span>\n    </div>\n\n    <div\n      *ngIf=\"typeMessage === 'askConsent' && (cookieLawConsentConfig.acceptButton || cookieLawConsentConfig.declineButton)\"\n      class=\"bloc-button\"\n    >\n      <button *ngIf=\"cookieLawConsentConfig.acceptButton\" class=\"cookie-law-consent-button\" (click)=\"cookieConsentService.accept()\">\n        <span>{{ cookieLawConsentConfig.acceptButtonText }}</span>\n      </button>\n      <button *ngIf=\"cookieLawConsentConfig.declineButton\" class=\"cookie-law-consent-button\" (click)=\"cookieConsentService.deny()\">\n        <span>{{ cookieLawConsentConfig.declineButtonText }}</span>\n      </button>\n    </div>\n  </div>\n</ng-container>\n"

/***/ }),

/***/ "./projects/ngx-ui-components/src/lib/cookie-consent/cookie-law-consent/cookie-law-consent.component.ts":
/*!**************************************************************************************************************!*\
  !*** ./projects/ngx-ui-components/src/lib/cookie-consent/cookie-law-consent/cookie-law-consent.component.ts ***!
  \**************************************************************************************************************/
/*! exports provided: CookieLawConsentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CookieLawConsentComponent", function() { return CookieLawConsentComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _config_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config.model */ "./projects/ngx-ui-components/src/lib/cookie-consent/config.model.ts");
/* harmony import */ var _cookie_consent_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../cookie-consent.service */ "./projects/ngx-ui-components/src/lib/cookie-consent/cookie-consent.service.ts");
/* harmony import */ var _shared_scroll_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/scroll.service */ "./projects/ngx-ui-components/src/lib/shared/scroll.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");






var CookieLawConsentComponent = /** @class */ (function () {
    function CookieLawConsentComponent(renderer, cookieConsentService, scrollService, cookieLawConsentConfig) {
        this.renderer = renderer;
        this.cookieConsentService = cookieConsentService;
        this.scrollService = scrollService;
        this.cookieLawConsentConfig = cookieLawConsentConfig;
        this.opened = false;
    }
    CookieLawConsentComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Handle dismiss when the scroll event
        if (this.cookieLawConsentConfig.dismissOnScroll) {
            this.scrollService.scrollEvent$
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["debounceTime"])(1000), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["filter"])(function () { return !_this.cookieConsentService.isPresent(); }))
                .subscribe(function () {
                _this.cookieConsentService.dismiss();
            });
        }
        // Handle autoOpen of the banner
        if (this.cookieLawConsentConfig.autoOpen) {
            this.cookieConsentService.popupOpen$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1)).subscribe(function (typeMessage) {
                _this.typeMessage = typeMessage;
                _this.opened = true;
            });
        }
        else {
            this.cookieConsentService.popupOpen$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1)).subscribe(function (typeMessage) {
                _this.typeMessage = typeMessage;
            });
        }
        // Close the banner when the status change
        this.cookieConsentService.statusChange$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1)).subscribe(function (status) { return (_this.opened = false); });
    };
    CookieLawConsentComponent.prototype.ngAfterViewInit = function () {
        if (this.cookieLawConsent) {
            this.renderer.setStyle(this.cookieLawConsent.nativeElement, this.cookieLawConsentConfig.position, '0');
        }
    };
    CookieLawConsentComponent.prototype.ngOnDestroy = function () { };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], CookieLawConsentComponent.prototype, "opened", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('cookielawconsent'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], CookieLawConsentComponent.prototype, "cookieLawConsent", void 0);
    CookieLawConsentComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'ngx-ui-cookie-law-consent',
            template: __webpack_require__(/*! ./cookie-law-consent.component.html */ "./projects/ngx-ui-components/src/lib/cookie-consent/cookie-law-consent/cookie-law-consent.component.html"),
            styles: [__webpack_require__(/*! ./cookie-law-consent.component.css */ "./projects/ngx-ui-components/src/lib/cookie-consent/cookie-law-consent/cookie-law-consent.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_config_model__WEBPACK_IMPORTED_MODULE_2__["COOKIE_LAW_CONSENT_CONFIG"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"],
            _cookie_consent_service__WEBPACK_IMPORTED_MODULE_3__["CookieConsentService"],
            _shared_scroll_service__WEBPACK_IMPORTED_MODULE_4__["ScrollService"], Object])
    ], CookieLawConsentComponent);
    return CookieLawConsentComponent;
}());



/***/ }),

/***/ "./projects/ngx-ui-components/src/lib/google-analytics/ga.service.ts":
/*!***************************************************************************!*\
  !*** ./projects/ngx-ui-components/src/lib/google-analytics/ga.service.ts ***!
  \***************************************************************************/
/*! exports provided: GaService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GaService", function() { return GaService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_window__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/window */ "./projects/ngx-ui-components/src/lib/shared/window.ts");
/* harmony import */ var _google_analytics_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./google-analytics.module */ "./projects/ngx-ui-components/src/lib/google-analytics/google-analytics.module.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_cookie_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/cookie.service */ "./projects/ngx-ui-components/src/lib/shared/cookie.service.ts");







// see https://github.com/angular/angular/issues/20351#issuecomment-344009887
/** @dynamic */
var GaService = /** @class */ (function () {
    function GaService(window, document, gaProperty, platformId, cookieService) {
        this.window = window;
        this.document = document;
        this.gaProperty = gaProperty;
        this.platformId = platformId;
        this.cookieService = cookieService;
    }
    GaService.prototype.sendPage = function (url) {
        if (url === this.previousUrl) {
            return;
        }
        this.previousUrl = url;
        this.ga('set', 'page', '/' + url);
        this.ga('send', 'pageview');
    };
    GaService.prototype.setPage = function (url) {
        this.ga('set', 'page', '/' + url);
    };
    GaService.prototype.sendPageView = function () {
        this.ga('send', 'pageview');
    };
    GaService.prototype.sendEvent = function (source, action, label, value) {
        this.ga('send', 'event', source, action, label, value);
    };
    GaService.prototype.ga = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // tslint:disable-next-line: no-string-literal
        var gaFn = this.window['ga'];
        if (gaFn) {
            gaFn.apply(void 0, args);
        }
    };
    GaService.prototype.startGoogleAnalytics = function () {
        if (!Object(_angular_common__WEBPACK_IMPORTED_MODULE_4__["isPlatformBrowser"])(this.platformId)) {
            return;
        }
        /* tslint:disable:no-string-literal */
        /* tslint:disable: only-arrow-functions */
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            (i[r] =
                i[r] ||
                    function () {
                        (i[r].q = i[r].q || []).push(arguments);
                    }),
                // tslint:disable-next-line: no-angle-bracket-type-assertion
                (i[r].l = 1 * new Date());
            (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m);
        })(this.window, this.document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
        this.window['ga']('create', this.gaProperty, 'auto');
        /* tslint:enable:no-string-literal */
        /* tslint:enable: only-arrow-functions */
    };
    GaService.prototype.callGABeforeConsent = function () {
        if (!Object(_angular_common__WEBPACK_IMPORTED_MODULE_4__["isPlatformBrowser"])(this.platformId)) {
            return;
        }
        /* tslint:disable:no-string-literal */
        /* tslint:disable: only-arrow-functions */
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            (i[r] =
                i[r] ||
                    function () {
                        (i[r].q = i[r].q || []).push(arguments);
                    }),
                // tslint:disable-next-line: no-angle-bracket-type-assertion
                (i[r].l = 1 * new Date());
            (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m);
        })(this.window, this.document, 'script', 'https://www.google-analytics.com/analytics.js', '__gaTracker');
        this.window['__gaTracker']('create', this.gaProperty, { storage: 'none', clientId: '0' });
        this.window['__gaTracker']('set', 'anonymizeIp', true);
        // tslint:disable-next-line: object-literal-key-quotes
        this.window['__gaTracker']('send', 'pageview');
        /* tslint:enable:no-string-literal */
        /* tslint:enable: only-arrow-functions */
    };
    // Efface tous les types de cookies utilisés par Google Analytics
    GaService.prototype.deleteAnalyticsCookies = function () {
        var cookieNames = ['__utma', '__utmb', '__utmc', '__utmz', '_ga', '_gat'];
        for (var _i = 0, cookieNames_1 = cookieNames; _i < cookieNames_1.length; _i++) {
            var cookie = cookieNames_1[_i];
            this.cookieService.deleteCookie(cookie);
        }
    };
    GaService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: _google_analytics_module__WEBPACK_IMPORTED_MODULE_3__["GoogleAnalyticsModule"],
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_shared_window__WEBPACK_IMPORTED_MODULE_2__["WindowToken"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_common__WEBPACK_IMPORTED_MODULE_4__["DOCUMENT"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_google_analytics_module__WEBPACK_IMPORTED_MODULE_3__["GA_PROPERTY"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_1__["PLATFORM_ID"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Window,
            Document, String, _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"],
            _shared_cookie_service__WEBPACK_IMPORTED_MODULE_5__["CookieService"]])
    ], GaService);
    return GaService;
}());



/***/ }),

/***/ "./projects/ngx-ui-components/src/lib/google-analytics/google-analytics.module.ts":
/*!****************************************************************************************!*\
  !*** ./projects/ngx-ui-components/src/lib/google-analytics/google-analytics.module.ts ***!
  \****************************************************************************************/
/*! exports provided: GA_PROPERTY, GaService, GoogleAnalyticsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GA_PROPERTY", function() { return GA_PROPERTY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoogleAnalyticsModule", function() { return GoogleAnalyticsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/shared.module */ "./projects/ngx-ui-components/src/lib/shared/shared.module.ts");
/* harmony import */ var _ga_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ga.service */ "./projects/ngx-ui-components/src/lib/google-analytics/ga.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GaService", function() { return _ga_service__WEBPACK_IMPORTED_MODULE_4__["GaService"]; });





var GA_PROPERTY = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('Ga property');

var GoogleAnalyticsModule = /** @class */ (function () {
    function GoogleAnalyticsModule() {
    }
    GoogleAnalyticsModule_1 = GoogleAnalyticsModule;
    GoogleAnalyticsModule.forRoot = function (gaProperty) {
        return {
            ngModule: GoogleAnalyticsModule_1,
            providers: [{ provide: GA_PROPERTY, useValue: gaProperty }],
        };
    };
    GoogleAnalyticsModule.forChild = function () {
        return {
            ngModule: GoogleAnalyticsModule_1,
            providers: [{ provide: GA_PROPERTY, useValue: null }],
        };
    };
    var GoogleAnalyticsModule_1;
    GoogleAnalyticsModule = GoogleAnalyticsModule_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [],
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__["SharedModule"]],
        })
    ], GoogleAnalyticsModule);
    return GoogleAnalyticsModule;
}());



/***/ }),

/***/ "./projects/ngx-ui-components/src/lib/reading-progress-bar/reading-progress-bar.directive.ts":
/*!***************************************************************************************************!*\
  !*** ./projects/ngx-ui-components/src/lib/reading-progress-bar/reading-progress-bar.directive.ts ***!
  \***************************************************************************************************/
/*! exports provided: ReadingProgressBarDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReadingProgressBarDirective", function() { return ReadingProgressBarDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_scroll_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/scroll.service */ "./projects/ngx-ui-components/src/lib/shared/scroll.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");






// see https://github.com/angular/angular/issues/20351#issuecomment-344009887
/** @dynamic */
var ReadingProgressBarDirective = /** @class */ (function () {
    function ReadingProgressBarDirective(renderer, el, scrollService, viewportScroller, document) {
        this.renderer = renderer;
        this.el = el;
        this.scrollService = scrollService;
        this.viewportScroller = viewportScroller;
        this.document = document;
        this.unsubscribe$ = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
    }
    ReadingProgressBarDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.renderer.setStyle(this.el.nativeElement, 'width', '0%');
        this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden');
        this.scrollService.scrollEvent$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this.unsubscribe$)).subscribe(function () { return _this.computeWidth(); });
        this.scrollService.resizeEvent$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this.unsubscribe$)).subscribe(function () { return _this.computeWidth(); });
    };
    ReadingProgressBarDirective.prototype.computeWidth = function () {
        var heightMax = this.document.body.clientHeight;
        var currentScrollPosition = this.viewportScroller.getScrollPosition();
        var ratioCurrentHeight = Math.round((currentScrollPosition[1] / (heightMax - window.innerHeight)) * 100);
        this.renderer.setStyle(this.el.nativeElement, 'width', ratioCurrentHeight + '%');
    };
    ReadingProgressBarDirective.prototype.ngOnDestroy = function () {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    };
    ReadingProgressBarDirective = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({
            selector: '[ngxUiReadingProgressBar]',
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_common__WEBPACK_IMPORTED_MODULE_3__["DOCUMENT"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"],
            _shared_scroll_service__WEBPACK_IMPORTED_MODULE_2__["ScrollService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_3__["ViewportScroller"],
            Document])
    ], ReadingProgressBarDirective);
    return ReadingProgressBarDirective;
}());



/***/ }),

/***/ "./projects/ngx-ui-components/src/lib/reading-progress-bar/reading-progress-bar.module.ts":
/*!************************************************************************************************!*\
  !*** ./projects/ngx-ui-components/src/lib/reading-progress-bar/reading-progress-bar.module.ts ***!
  \************************************************************************************************/
/*! exports provided: ReadingProgressBarModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReadingProgressBarModule", function() { return ReadingProgressBarModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _reading_progress_bar_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reading-progress-bar.directive */ "./projects/ngx-ui-components/src/lib/reading-progress-bar/reading-progress-bar.directive.ts");




var ngxDeclarations = [_reading_progress_bar_directive__WEBPACK_IMPORTED_MODULE_3__["ReadingProgressBarDirective"]];
var ReadingProgressBarModule = /** @class */ (function () {
    function ReadingProgressBarModule() {
    }
    ReadingProgressBarModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: ngxDeclarations.slice(),
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]],
            exports: ngxDeclarations.slice(),
        })
    ], ReadingProgressBarModule);
    return ReadingProgressBarModule;
}());



/***/ }),

/***/ "./projects/ngx-ui-components/src/lib/shared/browser.service.ts":
/*!**********************************************************************!*\
  !*** ./projects/ngx-ui-components/src/lib/shared/browser.service.ts ***!
  \**********************************************************************/
/*! exports provided: BrowserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrowserService", function() { return BrowserService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared.module */ "./projects/ngx-ui-components/src/lib/shared/shared.module.ts");




var BrowserService = /** @class */ (function () {
    function BrowserService(platformId) {
        this.platformId = platformId;
    }
    // Grap IE version, -1 if it's not IE browser or null if we are not in a browser
    BrowserService.prototype.getInternetExplorerVersion = function () {
        if (!Object(_angular_common__WEBPACK_IMPORTED_MODULE_2__["isPlatformBrowser"])(this.platformId)) {
            return;
        }
        var rv = -1;
        if (navigator.appName === 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re = new RegExp('MSIE ([0-9]{1,}[.0-9]{0,})');
            if (re.exec(ua) != null) {
                rv = parseFloat(RegExp.$1);
            }
        }
        else if (navigator.appName === 'Netscape') {
            var ua = navigator.userAgent;
            var re = new RegExp('Trident/.*rv:([0-9]{1,}[.0-9]{0,})');
            if (re.exec(ua) != null) {
                rv = parseFloat(RegExp.$1);
            }
        }
        return rv;
    };
    // The user doesn't want to be tracked
    BrowserService.prototype.hasDoNotTrack = function () {
        if (!Object(_angular_common__WEBPACK_IMPORTED_MODULE_2__["isPlatformBrowser"])(this.platformId)) {
            return;
        }
        if ((navigator.doNotTrack && (navigator.doNotTrack === 'yes' || navigator.doNotTrack === '1')) ||
            // tslint:disable-next-line: no-string-literal
            (navigator['msDoNotTrack'] && navigator['msDoNotTrack'] === '1')) {
            return true;
        }
        else {
            return false;
        }
    };
    // the consent is obtained
    BrowserService.prototype.acceptToTrack = function () {
        if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_2__["isPlatformBrowser"])(this.platformId)) {
            return navigator.doNotTrack && (navigator.doNotTrack === 'no' || navigator.doNotTrack === '0');
        }
    };
    BrowserService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: _shared_module__WEBPACK_IMPORTED_MODULE_3__["SharedModule"],
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_1__["PLATFORM_ID"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]])
    ], BrowserService);
    return BrowserService;
}());



/***/ }),

/***/ "./projects/ngx-ui-components/src/lib/shared/cookie-config.model.ts":
/*!**************************************************************************!*\
  !*** ./projects/ngx-ui-components/src/lib/shared/cookie-config.model.ts ***!
  \**************************************************************************/
/*! exports provided: CookieOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CookieOptions", function() { return CookieOptions; });
var CookieOptions = /** @class */ (function () {
    function CookieOptions() {
        // Name of the cookie that keeps track of users choice
        // Default: 'cookielawconsent'
        this.name = 'cookielawconsent';
        // URL path that the cookie 'name' belongs to. The cookie can only be read at this location
        // Default: '/'
        this.path = '/';
        // The cookies expire date, specified in days (specify -1 for no expiry)
        // Default: 365
        this.expires = 365;
        // If true the cookie will be created with the secure flag. Secure cookies will only be transmitted via HTTPS.
        this.secure = false;
    }
    return CookieOptions;
}());



/***/ }),

/***/ "./projects/ngx-ui-components/src/lib/shared/cookie.service.ts":
/*!*********************************************************************!*\
  !*** ./projects/ngx-ui-components/src/lib/shared/cookie.service.ts ***!
  \*********************************************************************/
/*! exports provided: CookieService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CookieService", function() { return CookieService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared.module */ "./projects/ngx-ui-components/src/lib/shared/shared.module.ts");

// Extract of https://github.com/7leads/ngx-cookie-service



var CookieService = /** @class */ (function () {
    function CookieService(document, platformId) {
        this.document = document;
        this.platformId = platformId;
    }
    CookieService.prototype.check = function (name) {
        if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_2__["isPlatformBrowser"])(this.platformId)) {
            name = encodeURIComponent(name);
            var regExp = this.getCookieRegExp(name);
            var exists = regExp.test(this.document.cookie);
            return exists;
        }
    };
    /**
     * @param key Cookie name
     * @returns the cookie value as string
     */
    CookieService.prototype.get = function (name) {
        if (this.check(name)) {
            name = encodeURIComponent(name);
            var regExp = this.getCookieRegExp(name);
            var result = regExp.exec(this.document.cookie);
            return decodeURIComponent(result[1]);
        }
        else {
            return '';
        }
    };
    CookieService.prototype.set = function (name, value, expires, path, domain, secure, sameSite) {
        if (!Object(_angular_common__WEBPACK_IMPORTED_MODULE_2__["isPlatformBrowser"])(this.platformId)) {
            return;
        }
        var cookieString = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';';
        if (expires) {
            if (typeof expires === 'number') {
                var dateExpires = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);
                cookieString += 'expires=' + dateExpires.toUTCString() + ';';
            }
            else {
                cookieString += 'expires=' + expires.toUTCString() + ';';
            }
        }
        if (path) {
            cookieString += 'path=' + path + ';';
        }
        if (domain) {
            cookieString += 'domain=' + domain + ';';
        }
        if (secure) {
            cookieString += 'secure;';
        }
        if (sameSite) {
            cookieString += 'sameSite=' + sameSite + ';';
        }
        this.document.cookie = cookieString;
    };
    CookieService.prototype.deleteCookie = function (name, path, domain) {
        if (!Object(_angular_common__WEBPACK_IMPORTED_MODULE_2__["isPlatformBrowser"])(this.platformId)) {
            return;
        }
        this.set(name, '', new Date('Thu, 01-Jan-1970 00:00:01 GMT'), path, domain);
    };
    /**
     * @param name Cookie name
     * @returns RegExp for retrieving a value
     */
    CookieService.prototype.getCookieRegExp = function (name) {
        var escapedName = name.replace(/([\[\]\{\}\(\)\|\=\;\+\?\,\.\*\^\$])/gi, '\\$1');
        return new RegExp('(?:^' + escapedName + '|;\\s*' + escapedName + ')=(.*?)(?:;|$)', 'g');
    };
    CookieService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: _shared_module__WEBPACK_IMPORTED_MODULE_3__["SharedModule"],
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"])), tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_1__["PLATFORM_ID"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object, _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]])
    ], CookieService);
    return CookieService;
}());



/***/ }),

/***/ "./projects/ngx-ui-components/src/lib/shared/scroll.service.ts":
/*!*********************************************************************!*\
  !*** ./projects/ngx-ui-components/src/lib/shared/scroll.service.ts ***!
  \*********************************************************************/
/*! exports provided: ScrollService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollService", function() { return ScrollService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shared.module */ "./projects/ngx-ui-components/src/lib/shared/shared.module.ts");





var ScrollService = /** @class */ (function () {
    function ScrollService(viewportScroller) {
        this.viewportScroller = viewportScroller;
        this.scrollEvent$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(window, 'scroll');
        this.resizeEvent$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(window, 'resize');
    }
    ScrollService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: _shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_2__["ViewportScroller"]])
    ], ScrollService);
    return ScrollService;
}());



/***/ }),

/***/ "./projects/ngx-ui-components/src/lib/shared/shared.module.ts":
/*!********************************************************************!*\
  !*** ./projects/ngx-ui-components/src/lib/shared/shared.module.ts ***!
  \********************************************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _window__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./window */ "./projects/ngx-ui-components/src/lib/shared/window.ts");




var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [],
            providers: [{ provide: _window__WEBPACK_IMPORTED_MODULE_3__["WindowToken"], useFactory: _window__WEBPACK_IMPORTED_MODULE_3__["windowProvider"] }],
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]],
        })
    ], SharedModule);
    return SharedModule;
}());



/***/ }),

/***/ "./projects/ngx-ui-components/src/lib/shared/utils.ts":
/*!************************************************************!*\
  !*** ./projects/ngx-ui-components/src/lib/shared/utils.ts ***!
  \************************************************************/
/*! exports provided: isObject, mergeDeep */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeDeep", function() { return mergeDeep; });
/**
 * @description check whether it's an object.
 * @param object to be verified
 * @returns true if it's an object
 */
function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}
/**
 * @description deep merge function.
 * @param target object
 * @param ...sources to be mergeds
 */
function mergeDeep(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    var _a, _b;
    if (!sources.length) {
        return target;
    }
    var source = sources.shift();
    if (isObject(target) && isObject(source)) {
        for (var key in source) {
            if (isObject(source[key])) {
                if (!target[key]) {
                    Object.assign(target, (_a = {}, _a[key] = {}, _a));
                }
                mergeDeep(target[key], source[key]);
            }
            else {
                Object.assign(target, (_b = {}, _b[key] = source[key], _b));
            }
        }
    }
    return mergeDeep.apply(void 0, [target].concat(sources));
}


/***/ }),

/***/ "./projects/ngx-ui-components/src/lib/shared/window.ts":
/*!*************************************************************!*\
  !*** ./projects/ngx-ui-components/src/lib/shared/window.ts ***!
  \*************************************************************/
/*! exports provided: WindowToken, windowProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WindowToken", function() { return WindowToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "windowProvider", function() { return windowProvider; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");

var WindowToken = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('Window');
function windowProvider() {
    return window;
}


/***/ }),

/***/ "./projects/ngx-ui-components/src/public-api.ts":
/*!******************************************************!*\
  !*** ./projects/ngx-ui-components/src/public-api.ts ***!
  \******************************************************/
/*! exports provided: mergeConfig, CookieLawConsentModule, GA_PROPERTY, GaService, GoogleAnalyticsModule, ReadingProgressBarModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_cookie_consent_cookie_law_consent_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/cookie-consent/cookie-law-consent.module */ "./projects/ngx-ui-components/src/lib/cookie-consent/cookie-law-consent.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeConfig", function() { return _lib_cookie_consent_cookie_law_consent_module__WEBPACK_IMPORTED_MODULE_0__["mergeConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CookieLawConsentModule", function() { return _lib_cookie_consent_cookie_law_consent_module__WEBPACK_IMPORTED_MODULE_0__["CookieLawConsentModule"]; });

/* harmony import */ var _lib_google_analytics_google_analytics_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/google-analytics/google-analytics.module */ "./projects/ngx-ui-components/src/lib/google-analytics/google-analytics.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GA_PROPERTY", function() { return _lib_google_analytics_google_analytics_module__WEBPACK_IMPORTED_MODULE_1__["GA_PROPERTY"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GaService", function() { return _lib_google_analytics_google_analytics_module__WEBPACK_IMPORTED_MODULE_1__["GaService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GoogleAnalyticsModule", function() { return _lib_google_analytics_google_analytics_module__WEBPACK_IMPORTED_MODULE_1__["GoogleAnalyticsModule"]; });

/* harmony import */ var _lib_reading_progress_bar_reading_progress_bar_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/reading-progress-bar/reading-progress-bar.module */ "./projects/ngx-ui-components/src/lib/reading-progress-bar/reading-progress-bar.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReadingProgressBarModule", function() { return _lib_reading_progress_bar_reading_progress_bar_module__WEBPACK_IMPORTED_MODULE_2__["ReadingProgressBarModule"]; });

/*
 * Public API Surface of ngx-ui-components
 */





/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-menu></app-menu>\n<div class=\"progression\" ngxUiReadingProgressBar></div>\n<router-outlet></router-outlet>\n<ngx-ui-cookie-law-consent></ngx-ui-cookie-law-consent>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".progression {\n  margin: 0;\n  padding: 0;\n  top: 0;\n  height: 4px;\n  position: fixed;\n  display: block;\n  width: 0%;\n  z-index: 12;\n  background: #e9573f; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy93aWxsaWFtL3ZzY1Byb2plY3RzL25neC11aS1jb21wb25lbnRzL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsU0FBUztFQUNULFVBQVU7RUFDVixNQUFNO0VBQ04sV0FBVztFQUNYLGVBQWU7RUFDZixjQUFjO0VBQ2QsU0FBUztFQUNULFdBQVc7RUFDWCxtQkFBbUIsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wcm9ncmVzc2lvbiB7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbiAgdG9wOiAwO1xuICBoZWlnaHQ6IDRweDtcbiAgcG9zaXRpb246IGZpeGVkO1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDAlO1xuICB6LWluZGV4OiAxMjtcbiAgYmFja2dyb3VuZDogI2U5NTczZjtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var projects_ngx_ui_components_src_public_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! projects/ngx-ui-components/src/public-api */ "./projects/ngx-ui-components/src/public-api.ts");
/* harmony import */ var projects_ngx_ui_components_src_lib_cookie_consent_cookie_consent_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! projects/ngx-ui-components/src/lib/cookie-consent/cookie-consent.service */ "./projects/ngx-ui-components/src/lib/cookie-consent/cookie-consent.service.ts");




var AppComponent = /** @class */ (function () {
    function AppComponent(cookieConsentService, gaService) {
        this.cookieConsentService = cookieConsentService;
        this.gaService = gaService;
        this.opened = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.gaService.sendPage(document.location.pathname);
        /* this.cookieConsentService.popupOpen$.subscribe(typeMessage => {
          this.opened = true;
        }); */
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [projects_ngx_ui_components_src_lib_cookie_consent_cookie_consent_service__WEBPACK_IMPORTED_MODULE_3__["CookieConsentService"], projects_ngx_ui_components_src_public_api__WEBPACK_IMPORTED_MODULE_2__["GaService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.routing.module */ "./src/app/app.routing.module.ts");
/* harmony import */ var _menu_menu_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./menu/menu.component */ "./src/app/menu/menu.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var projects_ngx_ui_components_src_public_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! projects/ngx-ui-components/src/public-api */ "./projects/ngx-ui-components/src/public-api.ts");








var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.prototype.ngOnInit = function () {
        throw new Error('Method not implemented.');
    };
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"], _menu_menu_component__WEBPACK_IMPORTED_MODULE_5__["MenuComponent"], _home_home_component__WEBPACK_IMPORTED_MODULE_6__["HomeComponent"]],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
                projects_ngx_ui_components_src_public_api__WEBPACK_IMPORTED_MODULE_7__["CookieLawConsentModule"].forRoot(),
                projects_ngx_ui_components_src_public_api__WEBPACK_IMPORTED_MODULE_7__["GoogleAnalyticsModule"].forRoot('UA-32348844-1'),
                projects_ngx_ui_components_src_public_api__WEBPACK_IMPORTED_MODULE_7__["ReadingProgressBarModule"],
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]],
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app.routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");




var routes = [{ path: '', component: _home_home_component__WEBPACK_IMPORTED_MODULE_3__["HomeComponent"] }];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/home/home.component.html":
/*!******************************************!*\
  !*** ./src/app/home/home.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1>Top</h1>\n<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />\n<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />\n<h1>Bottom</h1>\n"

/***/ }),

/***/ "./src/app/home/home.component.scss":
/*!******************************************!*\
  !*** ./src/app/home/home.component.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2hvbWUvaG9tZS5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () { };
    HomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.scss */ "./src/app/home/home.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/menu/menu.component.html":
/*!******************************************!*\
  !*** ./src/app/menu/menu.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n  <ul>\n    <li>\n      <a [routerLink]=\"['home']\"> Home </a>\n    </li>\n  </ul>\n</div>\n"

/***/ }),

/***/ "./src/app/menu/menu.component.scss":
/*!******************************************!*\
  !*** ./src/app/menu/menu.component.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21lbnUvbWVudS5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/menu/menu.component.ts":
/*!****************************************!*\
  !*** ./src/app/menu/menu.component.ts ***!
  \****************************************/
/*! exports provided: MenuComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuComponent", function() { return MenuComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var MenuComponent = /** @class */ (function () {
    function MenuComponent() {
    }
    MenuComponent.prototype.ngOnInit = function () { };
    MenuComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-menu',
            template: __webpack_require__(/*! ./menu.component.html */ "./src/app/menu/menu.component.html"),
            styles: [__webpack_require__(/*! ./menu.component.scss */ "./src/app/menu/menu.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], MenuComponent);
    return MenuComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/william/vscProjects/ngx-ui-components/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map