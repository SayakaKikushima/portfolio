/**
 * Cloudflare Pages 用 Basic認証ミドルウェア
 *
 * 置き場所：リポジトリ直下の functions/_middleware.js
 *
 * Cloudflare の管理画面で設定する環境変数：
 *   BASIC_USER      … ユーザー名（必須）
 *   BASIC_PASS      … パスワード（必須・「暗号化」にチェック推奨）
 *   PROTECTED_PATHS … 鍵をかけるパス（任意）
 *                     空欄 → サイト全体に鍵
 *                     例 "/works/private,/clients" → その配下だけに鍵
 */

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);

  // 鍵をかける範囲の判定
  const protectedPaths = (env.PROTECTED_PATHS || "")
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);

  const needsAuth =
    protectedPaths.length === 0 ||
    protectedPaths.some((p) => url.pathname === p || url.pathname.startsWith(p.endsWith("/") ? p : p + "/"));

  if (!needsAuth) return next();

  // 環境変数が未設定なら、誤って全公開にならないようブロック
  if (!env.BASIC_USER || !env.BASIC_PASS) {
    return new Response("認証の設定がまだ完了していません。", { status: 500 });
  }

  const header = request.headers.get("Authorization") || "";
  if (header.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6));
      const sep = decoded.indexOf(":");
      const user = decoded.slice(0, sep);
      const pass = decoded.slice(sep + 1);
      if (safeEqual(user, env.BASIC_USER) && safeEqual(pass, env.BASIC_PASS)) {
        const res = await next();
        // 認証ページを検索エンジンやキャッシュに残さない
        const headers = new Headers(res.headers);
        headers.set("X-Robots-Tag", "noindex, nofollow");
        headers.set("Cache-Control", "private, no-store");
        return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
      }
    } catch (_) {
      // 不正なヘッダーは下の401へ
    }
  }

  return new Response("認証が必要です。", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Portfolio", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });
}

// 文字列を一定時間で比較（タイミング攻撃対策）
function safeEqual(a, b) {
  const enc = new TextEncoder();
  const x = enc.encode(a);
  const y = enc.encode(b);
  let diff = x.length ^ y.length;
  const len = Math.max(x.length, y.length);
  for (let i = 0; i < len; i++) diff |= (x[i] || 0) ^ (y[i] || 0);
  return diff === 0;
}
