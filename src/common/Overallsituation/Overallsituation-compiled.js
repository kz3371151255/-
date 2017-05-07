"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by cvtt on 2017/4/25.
 */
var Overallsituation = exports.Overallsituation = function Overallsituation(industry, region) {
    var Overallsituation = new Object();
    if (industry === undefined || region === undefined) {
        return;
    }
    if (industry == null) {
        Overallsituation.region = region.region;
    } else if (region == null) {
        Overallsituation.industryId = industry.industryId;
        Overallsituation.industryName = industry.industryName;
    }

    return Overallsituation;
};

//# sourceMappingURL=Overallsituation-compiled.js.map