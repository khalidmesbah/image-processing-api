"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resize_1 = __importDefault(require("../utilities/resize"));
const path_1 = __importDefault(require("path"));
const resized_images = [];
const isResized = (image, width, height) => {
    for (let i = 0; i < resized_images.length; i++)
        if (resized_images[i] === `${image.slice(0, -4)}_${width}_${height}.jpg`)
            return true;
    return false;
};
const router = express_1.default.Router();
let image, width, height;
router.get("/resize", (req, res) => {
    image = req.query.image || "";
    width = parseInt(req.query.width);
    height = parseInt(req.query.height);
    if (isResized(image, width, height)) {
        res.sendFile(path_1.default.join(__dirname, `../../public/resized_images/${image.slice(0, -4)}_${width}_${height}.jpg`));
    }
    else {
        resized_images.push(`${image.slice(0, -4)}_${width}_${height}.jpg`);
        const sendImage = () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, resize_1.default)(image, width, height).then((e) => __awaiter(void 0, void 0, void 0, function* () {
                res.sendFile(path_1.default.join(__dirname, `../../public/resized_images/${e.image}_${e.width}_${e.height}.jpg`));
            }));
        });
        sendImage();
    }
});
exports.default = router;
