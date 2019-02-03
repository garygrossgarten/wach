"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const billy_core_1 = require("@fivethree/billy-core");
const application_1 = require("./generated/application");
let Wach = class Wach extends application_1.Application {
    enable(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const enabled = yield this.isEnabled();
            if (!enabled) {
                const status = yield this.getStatus();
                yield this.writeJSON(context.app.appDir + '/config.json', status);
                yield this.exec('sudo pmset -a sleep 0');
                yield this.exec('sudo pmset -a hibernatemode 0');
                yield this.exec('sudo pmset -a disablesleep 1');
                this.print('your mac will be wide awake! ☕');
            }
            else {
                this.print('already enabled');
            }
        });
    }
    disable(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const enabled = yield this.isEnabled();
            if (enabled) {
                const status = yield this.parseJSON(context.app.appDir + '/config.json');
                yield this.exec('sudo pmset -a sleep 1');
                const hibernate = status.hibernatemode | 3;
                yield this.exec('sudo pmset -a hibernatemode ' + hibernate);
                yield this.exec('sudo pmset -a disablesleep 0');
                this.print('turned off sleep prevention - your mac can rest now! 🛏');
            }
            else {
                this.print('sleep prevention is not active at the moment');
            }
        });
    }
    report() {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.getStatus();
            this.print(JSON.stringify(status, null, 4).replace(/[{}]/g, ''));
        });
    }
    isEnabled() {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.getStatus();
            return status.sleep && status.sleep === '0'
                && status.hibernatemode && status.hibernatemode === '0';
        });
    }
    getStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            const sleep = yield this.exec(`pmset -g`);
            const array = sleep.stdout
                .substring(sleep.stdout.lastIndexOf(':') + 1, sleep.stdout.length)
                .replace(/ *\([^)]*\) */g, '')
                .replace(/(?:\n)/g, '')
                .split(' ')
                .filter(e => e !== '');
            const json = {};
            for (let i = 0; i < array.length; i += 2) {
                json[array[i]] = array[i + 1];
            }
            return json;
        });
    }
};
__decorate([
    billy_core_1.Lane('prevent your mac from going to sleep! ☕'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Wach.prototype, "enable", null);
__decorate([
    billy_core_1.Lane('disable sleep prevention!💤'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Wach.prototype, "disable", null);
__decorate([
    billy_core_1.Lane('get report of power management settings. 🔋'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Wach.prototype, "report", null);
Wach = __decorate([
    billy_core_1.App()
], Wach);
exports.Wach = Wach;
