
import Cookies from 'https://cdn.jsdelivr.net/npm/js-cookie@rc/dist/js.cookie.min.mjs';

let user = new (class {
    cookieAllow;
    constructor() {
        if (Cookies.get("cookieAllow") == undefined) {
            this.cookieAllow = false;
        } else {
            this.cookieAllow = true;
            Cookies.set("cookieAllow", true);
        }
    }
    // cookieの使用許可確認
    getCookieAllow() {
        if (this.cookieAllow) {
            return true;
        } else {
            let c = window.confirm("ブラウザのcookieの使用を許可してよろしいですか？");
            if (c) {
                this.cookieAllow = true;
                Cookies.set("cookieAllow", true);
                return true;
            } else {
                return false;
            }
        }
    }
    setProperty(p, value) {
        // cookieの使用許可確認
        let c = this.getCookieAllow();
        if (c) {
            //Cookies.remove(p, { "expires": 180 });
            Cookies.set(p, value);
            return true;
        }
        return false;
    }
    getProperty(p) {
        // cookieの使用許可確認
        if (this.cookieAllow) {
            return Cookies.get(p);
        }
        return null;
    }
    getAll() {
        // cookieの使用許可確認
        if (!this.getCookieAllow()) {
            return null;
        }
        return Cookies.get();
    }
})();

export { user };