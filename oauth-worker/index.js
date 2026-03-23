/**
 * GitHub OAuth 回调服务 — 给 Decap CMS 用
 * 部署到 Cloudflare Workers（免费）
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // CORS 头
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
    // ===== 配置 =====
    // 这两个值在 Cloudflare Workers 环境变量里设置
    const CLIENT_ID = env.GITHUB_CLIENT_ID;
    const CLIENT_SECRET = env.GITHUB_CLIENT_SECRET;
    
    // ===== 路由 =====
    
    // 1. 开始授权 — CMS 会跳到这里
    if (url.pathname === '/auth') {
      const provider = url.searchParams.get('provider');
      if (provider !== 'github') {
        return new Response('不支持的 provider', { status: 400 });
      }
      
      const scope = url.searchParams.get('scope') || 'repo,user';
      const state = url.searchParams.get('state') || '';
      
      const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
      githubAuthUrl.searchParams.set('client_id', CLIENT_ID);
      githubAuthUrl.searchParams.set('redirect_uri', url.origin + '/callback');
      githubAuthUrl.searchParams.set('scope', scope);
      githubAuthUrl.searchParams.set('state', state);
      
      return Response.redirect(githubAuthUrl.toString(), 302);
    }
    
    // 2. GitHub 回调 — 拿 code 换 token
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) {
        return new Response('缺少 code 参数', { status: 400 });
      }
      
      // 用 code 换 access_token
      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code: code,
        }),
      });
      
      const tokenData = await tokenRes.json();
      
      if (tokenData.error) {
        return new Response(`授权失败: ${tokenData.error_description}`, { status: 400 });
      }
      
      // 返回 token 给 CMS（通过 postMessage）
      const html = `<!DOCTYPE html>
<html>
<head><title>授权成功</title></head>
<body>
<script>
  (function() {
    function receiveMessage(e) {
      window.opener.postMessage(
        'authorization:github:success:${JSON.stringify({ token: tokenData.access_token, provider: 'github' })}',
        e.origin
      );
      window.removeEventListener('message', receiveMessage, false);
    }
    window.addEventListener('message', receiveMessage, false);
    window.opener.postMessage('authorizing:github', '*');
  })();
</script>
<p>授权成功，正在关闭窗口...</p>
</body>
</html>`;
      
      return new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }
    
    // 3. 健康检查
    return new Response('OK - GitHub OAuth Service for Decap CMS', {
      headers: corsHeaders,
    });
  },
};
