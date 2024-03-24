import "dotenv/config";
import KJUR from "jsrsasign";

export function GenerateToken(req, res, next) {
  try {
    let signature = "";
    const iat = Math.round(new Date().getTime / 1000);
    const exp = iat + 60 * 60 * 2;

    const oHeader = { alg: "HS256", typ: "jwt" };

    const { topic, password, sessionKey, userIdentity } = req.body;
    const sdkKey = process.env.SDK_KEY;
    const sdkSecret = process.env.SDK_SECRET;

    const oPayload = {
      app_key: sdkKey,
      iat,
      exp,
      tpc: topic,
      pwd: password,
      user_identity: userIdentity,
      session_key: sessionKey,
      role_type: roleType,
    };

    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);
    signature = KJUR.jws.jws.sign("HS256", sHeader, sPayload, sdkSecret);

    res.locals.signature = signature;
    return next();
  } catch (error) {
    return next({ error });
  }
}
