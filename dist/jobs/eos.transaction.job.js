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
const common_1 = require("@nestjs/common");
const nest_schedule_1 = require("nest-schedule");
let EosTransactionJob = class EosTransactionJob extends nest_schedule_1.NestSchedule {
    cronJob() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('executing cron job');
        });
    }
    onceJob() {
        console.log('executing once job');
    }
    intervalJob() {
        console.log('executing interval job');
        return true;
    }
};
__decorate([
    nest_schedule_1.Cron('0 0 2 * *', {
        startTime: new Date(),
        endTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EosTransactionJob.prototype, "cronJob", null);
__decorate([
    nest_schedule_1.Timeout(5000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EosTransactionJob.prototype, "onceJob", null);
__decorate([
    nest_schedule_1.Interval(2000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EosTransactionJob.prototype, "intervalJob", null);
EosTransactionJob = __decorate([
    common_1.Injectable()
], EosTransactionJob);
exports.EosTransactionJob = EosTransactionJob;
//# sourceMappingURL=eos.transaction.job.js.map