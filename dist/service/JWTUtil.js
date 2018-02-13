"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base64 = require("base-64");
const utf8 = require("utf8");
const forge = require("node-forge");
// import {  } from "module";
class JWTUtil {
    constructor(serverKeys, clientKeys) {
        this.serverKeys = serverKeys;
        this.clientKeys = clientKeys;
    }
    createAccessToken() {
        return "";
    }
    createIATToken() {
        return "";
    }
    createCoreIAMAccessToken() {
        return "";
    }
    /**
   * Signs JWT using the alg field in the jwtHeader (jwtHeader.alg)
   * and if alg is RS256 threats clientCredential as a private key in
   * PEM format other wise assumes SH256 and threats as shared secret
   * Using client credential calculates the signature and returns the
   * JWT in base64 format with signature appended to the end
   *
   * @param {*} jwtHeader
   * @param {*} jwtPayload
   * @param {*} clientCredential
   */
    signJWT(jwtHeader, jwtPayload, clientCredential) {
        const base64JwtHeader = base64.encode(utf8.encode(JSON.stringify(jwtHeader)));
        const base64JwtBody = base64.encode(utf8.encode(JSON.stringify(jwtPayload)));
        const signContent = base64JwtHeader + "." + base64JwtBody;
        const md = forge.md.sha256.create();
        md.update(signContent);
        let signature;
        if (jwtHeader.alg == "RS256") {
            const privateKey = forge.pki.privateKeyFromPem(clientCredential);
            signature = privateKey.sign(md);
        }
        else {
            // HMAC
            const hmac = forge.hmac.create();
            hmac.start('', clientCredential);
            hmac.update(signContent);
            signature = utf8.encode(md.digest().bytes());
        }
        // return signed JWT in base64 format
        return signContent + "." + base64.encode(signature);
    }
}
exports.JWTUtil = JWTUtil;
//# sourceMappingURL=D:/Projects/MindSphereTS/dist/*/service/JWTUtil.js.map